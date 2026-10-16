import {createHash,createHmac,timingSafeEqual,randomUUID} from 'node:crypto';
import {get,put,list,head} from '@vercel/blob';
import {calculate,validateState,ENGINE_VERSION} from './engine.js';
import {migrateV2} from './patterns.js';
import {assets,meetingHTML} from './assets.js';
const BASE='/projects/notd_v3',COOKIE='eldar_review_v3';
const env=()=>process.env.VERCEL_ENV==='preview'?'preview':'production',prefix=()=>`eldar-v3/${env()}/`,oldPrefix=()=>`eldar-v2/${env()}/`;
const HEAD={'Cache-Control':'private, no-store, max-age=0','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'same-origin','X-Frame-Options':'DENY'};
const json=(o,status=200)=>Response.json(o,{status,headers:HEAD}),hash=x=>createHash('sha256').update(x).digest('hex'),equal=(a,b)=>timingSafeEqual(Buffer.from(hash(a)),Buffer.from(hash(b)));
const token=exp=>exp+'.'+createHmac('sha256',process.env.NOTD_REVIEW_PASSWORD).update('eldar-v3:'+exp).digest('hex');
function auth(req){const v=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1),exp=Number(v?.split('.')[0]);return Number.isFinite(exp)&&exp>Date.now()&&exp<Date.now()+8*86400000&&equal(v,token(exp));}
const cleanETag=e=>String(e||'').replace(/^W\//,'').replace(/^"|"$/g,'');
async function read(path,old=false){const pathname=(old?oldPrefix():prefix())+path;for(let attempt=0;attempt<3;attempt++){const r=await get(pathname,{access:'private',useCache:false});if(r?.statusCode!==200)return null;const value=await new Response(r.stream).json();if(path!=='meeting.json')return {value,etag:cleanETag(r.blob.etag)};const metadata=await head(pathname);if(cleanETag(r.blob.etag)===cleanETag(metadata.etag))return {value,etag:metadata.etag};}throw Error('Данные изменились во время чтения. Обновите страницу; локальный черновик сохранён.');}
const write=(path,value,etag)=>put(prefix()+path,JSON.stringify(value),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:!!etag,...(etag?{ifMatch:etag}:{}),cacheControlMaxAge:60});
async function docMeta(id){return await read('document-metadata/'+id+'.json')||await read('document-metadata/'+id+'.json',true);}
async function docs(){const out=new Map();for(const old of [true,false]){let cursor;do{const p=await list({prefix:(old?oldPrefix():prefix())+'document-metadata/',limit:500,cursor});for(const b of p.blobs){const r=await read(b.pathname.slice((old?oldPrefix():prefix()).length),old);if(r)out.set(r.value.id,{...r.value,archive:old?'v2':'v3'});}cursor=p.hasMore?p.cursor:undefined;if(out.size>2000)throw Error('Слишком много документов.');}while(cursor);}return [...out.values()].sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
const loginHTML=(message='')=>`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Закупки V3 · Вход</title><style>body{font:16px system-ui;background:#f5f6f2;color:#24372d;display:grid;min-height:95vh;place-items:center}main{width:min(390px,85vw);background:white;border:1px solid #d7dfd2;padding:32px;border-radius:16px}input,button{box-sizing:border-box;font:inherit;padding:13px;width:100%;margin:10px 0;border:1px solid #cbd3c7;border-radius:8px}button{background:#214f3b;color:white;cursor:pointer}p{color:#71806d;line-height:1.6}</style><main><p>NOTD + BIBLIOTEKA / V3</p><h1>Планируем закупку</h1><p>Тот же код доступа. Решения V2 остаются в архиве.</p><form action="${BASE}/login" method="post"><label>Код доступа<input name="password" type="password" autocomplete="current-password" required autofocus></label><button>Войти</button></form><p>${message}</p></main></html>`;
async function makeExcel(snapshot){
 const XLSX=await import('xlsx'),x=XLSX.default||XLSX,wb=x.utils.book_new();
 const sheets={
  'Закупка':[['Бренд','Артикул','Товар','Продажи 28д','Свободно','Поставка в срок','Заказано без даты','Расчёт V3','Решение','Подтверждено','Причина','Предупреждения'],...snapshot.result.rows.map(r=>[r.brand,r.sku,r.name,r.sales,r.free,r.inbound,r.undated,r.suggested,r.quantity,r.accepted?'Да':'Нет',r.reason,r.warnings.join(' ')])],
  'Правила':[['Версия движка',snapshot.engineVersion],['Версия правил',snapshot.result.rulebook],['Срез CRM',snapshot.datasetDate],['Пересмотр',snapshot.input.params.review],['Доставка',snapshot.input.params.lead],['Запас дней',snapshot.input.params.buffer],['Минимум заказа',snapshot.input.params.minimumOrder],[],['Тип','Область','Значение','С','До','Включено','Причина'],...snapshot.input.rules.map(r=>[r.kind,r.scope,r.value,r.from,r.to,r.enabled!==false,r.reason])],
  'Поставки':[['Номер','Бренд','Статус','Маршрут','Дата приезда','Артикул','Заказано','Получено в CRM','Отменено'],...snapshot.input.orders.flatMap(p=>p.lines.map(l=>[p.number,p.brand,p.status||'ordered',p.route||'',p.eta||'',l.id.split(':')[1],l.ordered,l.received,l.cancelled]))]
 };
 for(const [name,values]of Object.entries(sheets)){const ws=x.utils.aoa_to_sheet(values);ws['!cols']=values[0].map((_,i)=>({wch:i===2?55:i>9?65:20}));ws['!autofilter']={ref:ws['!ref']};for(const [key,cell]of Object.entries(ws)){if(!key.startsWith('!')&&cell.t==='s')delete cell.f;}x.utils.book_append_sheet(wb,ws,name);}return x.write(wb,{bookType:'xlsx',type:'buffer'});
}
export async function handle(req){
 const path=decodeURIComponent(new URL(req.url).pathname.slice(BASE.length)).replace(/\/$/,'')||'/';
 try{
  if(!process.env.NOTD_REVIEW_PASSWORD||process.env.NOTD_REVIEW_PASSWORD.length<20)return new Response('Закрытый доступ ещё настраивается.',{status:503,headers:HEAD});
  if(req.method==='POST'&&req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Откройте форму на сайте и повторите действие.'},403);
  if(path==='/login'&&req.method==='POST'){const f=await req.formData();if(!equal(String(f.get('password')||''),process.env.NOTD_REVIEW_PASSWORD)){await new Promise(r=>setTimeout(r,600));return new Response(loginHTML('Код не подошёл.'),{status:401,headers:{...HEAD,'Content-Type':'text/html;charset=utf-8'}});}return new Response(null,{status:303,headers:{...HEAD,Location:BASE,'Set-Cookie':COOKIE+'='+token(Date.now()+7*86400000)+'; Path='+BASE+'; HttpOnly; Secure; SameSite=Strict; Max-Age=604800'}});}
  if(path==='/logout')return new Response(null,{status:303,headers:{...HEAD,Location:BASE,'Set-Cookie':COOKIE+'=; Path='+BASE+'; HttpOnly; Secure; SameSite=Strict; Max-Age=0'}});
  if(!auth(req))return path.startsWith('/api/')?json({error:'Войдите в закрытый экран.'},401):new Response(loginHTML(),{headers:{...HEAD,'Content-Type':'text/html;charset=utf-8'}});
  if(req.method==='GET'&&path==='/')return new Response(meetingHTML,{headers:{...HEAD,'Content-Type':'text/html;charset=utf-8','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; img-src 'self' blob: data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"}});
  if(req.method==='GET'&&assets[path])return new Response(assets[path].body,{headers:{...HEAD,'Content-Type':assets[path].type}});
  if(path==='/api/state'&&req.method==='GET'){const [d,m,documents]=await Promise.all([read('dataset.json'),read('meeting.json'),docs()]);return json({data:d?.value||null,state:m?.value.state||null,revision:m?.etag||null,updatedAt:m?.value.updatedAt||null,documents,canMigrate:!m});}
  if(path==='/api/migrate-v2'&&req.method==='POST'){
   if(await read('meeting.json'))return json({error:'V3 уже инициализирована; повторный перенос запрещён.'},409);
   const [d,m]=await Promise.all([read('dataset.json',true),read('meeting.json',true)]);if(!d||!m)return json({error:'Не найден исходный срез V2.'},400);
   const state=migrateV2(d.value,m.value.state);validateState(state,d.value);
   await write('archives/v2-migration-'+randomUUID()+'.json',{dataset:d.value,meeting:m.value,revision:m.etag});
   if(!await read('dataset.json'))await write('dataset.json',d.value);
   const saved=await write('meeting.json',{state,updatedAt:new Date().toISOString()});return json({ok:true,revision:saved.etag,decisions:Object.keys(state.edits).length,legacyVersions:state.legacyVersions.length});
  }
  if(['/api/state','/api/recalculate'].includes(path)&&req.method==='POST'){
   if(Number(req.headers.get('content-length'))>2300000)return json({error:'Слишком большой черновик.'},413);
   const [d,m]=await Promise.all([read('dataset.json'),read('meeting.json')]);if(!d||!m)return json({error:'Сначала перенесите V2.'},400);const body=await req.json();if(body.expectedRevision!==m.etag)return json({error:'Другой экран уже сохранил изменения. Ваш черновик сохранён на этом устройстве. Скачайте его перед обновлением страницы.',conflict:true},409);
   const state=validateState(body.state,d.value);state.versions=m.value.state.versions||[];state.legacyVersions=m.value.state.legacyVersions||[];const updatedAt=new Date().toISOString();let version=null;
   if(path==='/api/recalculate'){
    const result=calculate(d.value,state),id=randomUUID(),last=state.versions.at(-1),previous=last?await read('versions/'+last.id+'.json'):null;
    const old=new Map((previous?.value.result.rows||[]).map(r=>[r.id,r]));
    const comparison=result.rows.filter(r=>!old.has(r.id)||r.suggested!==old.get(r.id).suggested||r.quantity!==old.get(r.id).quantity).map(r=>({id:r.id,name:r.name,before:old.get(r.id)?.quantity??null,after:r.quantity,suggested:r.suggested,reason:r.reason}));
    version={id,label:'V3 · версия '+(state.versions.length+1),createdAt:updatedAt,count:result.summary.candidates,units:result.summary.units,ownerUnits:result.summary.ownerUnits,accepted:result.summary.accepted,changed:comparison.length,engineVersion:ENGINE_VERSION,rulebook:result.rulebook};
    const snapshot={...version,datasetDate:d.value.meetingDate,data:d.value,input:structuredClone({...state,versions:[],legacyVersions:[]}),result,comparison};
    await write('versions/'+id+'.json',snapshot);const excel=await makeExcel(snapshot);await put(prefix()+'versions/'+id+'.xlsx',excel,{access:'private',contentType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',addRandomSuffix:false,allowOverwrite:false});state.versions=[...state.versions,version];
   }
   // Immutable recovery copy for every successful save attempt, then compare-and-swap the head.
   const backupId=randomUUID();await write('backups/'+backupId+'.json',{state,updatedAt,previousRevision:m.etag});
   const saved=await write('meeting.json',{state,updatedAt,backupId},m.etag);return json({revision:saved.etag,updatedAt,version,versions:state.versions});
  }
  if(path==='/api/documents'&&req.method==='GET')return json(await docs());
  if(path==='/api/upload'&&req.method==='POST'){
   if(Number(req.headers.get('content-length'))>4*1024*1024)return json({error:'Максимальный размер — 3,5 МБ.'},413);const f=await req.formData(),file=f.get('file');if(!file||typeof file==='string'||file.size>3.5*1024*1024)return json({error:'Проверьте файл, максимум 3,5 МБ.'},400);const ext=file.name.split('.').pop().toLowerCase();if(!['xlsx','csv','pdf'].includes(ext))return json({error:'Поддерживаются XLSX, CSV, PDF.'},400);
   const bytes=Buffer.from(await file.arrayBuffer());if(ext==='pdf'&&bytes.subarray(0,5).toString()!=='%PDF-'||ext==='xlsx'&&bytes.subarray(0,2).toString()!=='PK')return json({error:'Файл не соответствует расширению.'},400);
   const id=hash(bytes),existing=await docMeta(id);if(existing)return json({...existing.value,duplicate:true});const meta={id,filename:file.name.slice(0,240),size:file.size,ext,createdAt:new Date().toISOString()};
   await put(prefix()+'documents/'+id,bytes,{access:'private',contentType:'application/octet-stream',addRandomSuffix:false,allowOverwrite:false}).catch(e=>{if(!/already exists/i.test(e.message))throw e;});await write('document-metadata/'+id+'.json',meta).catch(async e=>{if(!await docMeta(id))throw e;});return json(meta);
  }
  if(req.method==='GET'&&/^\/api\/document\/[a-f0-9]{64}$/.test(path)){const id=path.split('/').at(-1),meta=await docMeta(id);if(!meta)return json({error:'Файл не найден.'},404);const b=await get(prefix()+'documents/'+id,{access:'private',useCache:false})||await get(oldPrefix()+'documents/'+id,{access:'private',useCache:false});if(!b)return json({error:'Файл не найден.'},404);return new Response(b.stream,{headers:{...HEAD,'Content-Type':'application/octet-stream','Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(meta.value.filename)}});}
  if(req.method==='GET'&&/^\/api\/(?:version|legacy-version)\/[a-z0-9-]{36}(?:\.xlsx)?$/.test(path)){
   const id=path.split('/').at(-1),legacy=path.includes('legacy-version');if(id.endsWith('.xlsx')){if(legacy)return json({error:'Для V2 доступен исходный JSON.'},404);const b=await get(prefix()+'versions/'+id,{access:'private',useCache:false});return b?new Response(b.stream,{headers:{...HEAD,'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Content-Disposition':'attachment; filename="Purchasing-'+id+'"'}}):json({error:'Экспорт не найден.'},404);}
   const v=await read('versions/'+id+'.json',legacy);return v?json(v.value):json({error:'Версия не найдена.'},404);
  }
  return json({error:'Не найдено.'},404);
 }catch(err){if(err.name==='BlobPreconditionFailedError'||/already exists|ETag mismatch|Precondition failed/i.test(err.message))return json({error:'Сохранённая версия изменилась. Ваш локальный черновик сохранён; не перезаписываем другой экран.',conflict:true},409);console.error('NOTD V3',err.name);return json({error:err.name?.startsWith('Blob')?'Хранилище временно недоступно. Черновик остаётся на устройстве; повторите сохранение.':err.message||'Ошибка обработки.'},400);}
}
