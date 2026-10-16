import {createHash,createHmac,timingSafeEqual,randomUUID} from 'node:crypto';
import {get,put,list} from '@vercel/blob';
import {emptyState,calculate,validateState} from './engine.js';
import {assets,meetingHTML} from './assets.js';
const BASE='/projects/notd_v2',COOKIE='eldar_review_v2';
const prefix=()=>process.env.VERCEL_ENV==='preview'?'eldar-v2/preview/':'eldar-v2/production/';
const headers={'Cache-Control':'private, no-store, max-age=0','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow, noarchive','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY'};
const json=(body,status=200)=>Response.json(body,{status,headers});
const hash=s=>createHash('sha256').update(s).digest('hex');
const equal=(a,b)=>timingSafeEqual(Buffer.from(hash(a)),Buffer.from(hash(b)));
function token(exp){return exp+'.'+createHmac('sha256',process.env.NOTD_REVIEW_PASSWORD).update('eldar-meeting-v2:'+exp).digest('hex');}
function authenticated(req){const value=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);if(!value)return false;const exp=Number(value.split('.')[0]);return Number.isFinite(exp)&&exp>Date.now()&&exp<Date.now()+8*86400000&&equal(value,token(exp));}
function sameOrigin(req){const origin=req.headers.get('origin');return origin===new URL(req.url).origin;}
async function read(path){const r=await get(prefix()+path,{access:'private',useCache:false});return r?.statusCode===200?{value:await new Response(r.stream).json(),etag:r.blob.etag}:null;}
async function write(path,value,etag){return put(prefix()+path,JSON.stringify(value),{access:'private',contentType:'application/json',addRandomSuffix:false,allowOverwrite:!!etag,...(etag?{ifMatch:etag}:{}),cacheControlMaxAge:60});}
async function docs(){let cursor,all=[];do{const page=await list({prefix:prefix()+'document-metadata/',limit:500,cursor});for(const b of page.blobs){const d=await read(b.pathname.slice(prefix().length));if(d)all.push(d.value);}cursor=page.hasMore?page.cursor:undefined;if(all.length>2000)throw Error('Слишком много документов для одной встречи');}while(cursor);return all.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
const loginHTML=(message='')=>`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Вход · Закупки</title><style>body{font:16px system-ui;background:#f5f6f2;color:#24372d;display:grid;min-height:95vh;place-items:center}main{width:min(390px,85vw);background:white;border:1px solid #d7dfd2;padding:32px;border-radius:16px}h1{font-size:32px}input,button{box-sizing:border-box;font:inherit;padding:13px;width:100%;margin:10px 0;border:1px solid #cbd3c7;border-radius:8px}button{background:#214f3b;color:white;cursor:pointer}p{color:#71806d;line-height:1.6}.error{color:#9d5b22}</style><main><p>NOTD + BIBLIOTEKA</p><h1>Проверяем закупку</h1><p>Закрытая рабочая встреча. Введите код доступа, полученный от Макса.</p><form action="${BASE}/login" method="post"><label>Код доступа<input name="password" type="password" autocomplete="current-password" required autofocus></label><button>Войти</button></form><p class="error">${message}</p></main></html>`;
export async function handle(req){
 const path=decodeURIComponent(new URL(req.url).pathname.slice(BASE.length)).replace(/\/$/,'')||'/';
 try{
  if(!process.env.NOTD_REVIEW_PASSWORD||process.env.NOTD_REVIEW_PASSWORD.length<20)return new Response('Закрытый доступ ещё настраивается.',{status:503,headers});
  if(req.method==='POST'&&!sameOrigin(req))return json({error:'Откройте форму на сайте и повторите действие.'},403);
  if(path==='/login'&&req.method==='POST'){
   const body=await req.formData(),password=String(body.get('password')||'');if(!equal(password,process.env.NOTD_REVIEW_PASSWORD)){await new Promise(resolve=>setTimeout(resolve,600));return new Response(loginHTML('Код не подошёл.'),{status:401,headers:{...headers,'Content-Type':'text/html;charset=utf-8'}});}
   return new Response(null,{status:303,headers:{...headers,Location:BASE,'Set-Cookie':COOKIE+'='+token(Date.now()+7*86400000)+'; Path='+BASE+'; HttpOnly; Secure; SameSite=Strict; Max-Age=604800'}});
  }
  if(path==='/logout'&&req.method==='GET')return new Response(null,{status:303,headers:{...headers,Location:BASE,'Set-Cookie':COOKIE+'=; Path='+BASE+'; HttpOnly; Secure; SameSite=Strict; Max-Age=0'}});
  if(!authenticated(req))return path.startsWith('/api/')?json({error:'Войдите в закрытый экран закупок.'},401):new Response(loginHTML(),{headers:{...headers,'Content-Type':'text/html;charset=utf-8'}});
  if(req.method==='GET'&&path==='/')return new Response(meetingHTML,{headers:{...headers,'Content-Type':'text/html;charset=utf-8','Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:; img-src 'self' blob: data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'"}});
  if(req.method==='GET'&&assets[path])return new Response(assets[path].body,{headers:{...headers,'Content-Type':assets[path].type}});
  if(path==='/api/state'&&req.method==='GET'){const [dataset,saved,documents]=await Promise.all([read('dataset.json'),read('meeting.json'),docs()]);return json({data:dataset?.value||null,state:saved?.value.state||emptyState(),revision:saved?.etag||null,documents});}
  if(path==='/api/documents'&&req.method==='GET')return json(await docs());
  if(path==='/api/dataset'&&req.method==='POST'){
   if(await read('dataset.json'))return json({error:'Срез уже загружен. Для обновления нужен отдельный проверенный импорт.'},409);
   const d=await req.json();if(!/^\d{4}-\d{2}-\d{2}$/.test(d.meetingDate)||!Array.isArray(d.rows)||d.rows.length>10000||!d.rows.length||new Set(d.rows.map(r=>r.id)).size!==d.rows.length)return json({error:'Неверный срез CRM'},400);
   if(d.rows.some(r=>!['notd','biblioteka'].includes(r.brand)||!r.id||typeof r.name!=='string'||r.fresh&&(!Number.isFinite(r.available)||!Number.isFinite(r.sales28))))return json({error:'Проверьте остатки и продажи среза'},400);
   await write('dataset.json',d);return json({ok:true,rows:d.rows.length,date:d.meetingDate});
  }
  if(['/api/state','/api/recalculate'].includes(path)&&req.method==='POST'){
   const [dataset,saved]=await Promise.all([read('dataset.json'),read('meeting.json')]);if(!dataset)return json({error:'Сначала загрузите срез CRM'},400);const body=await req.json();if(body.expectedRevision!==(saved?.etag||null))return json({error:'На другом устройстве уже сохранены изменения. Скачайте свой черновик, затем обновите страницу.'},409);
   const state=validateState(body.state,dataset.value);state.versions=saved?.value.state.versions||[];let version=null;
   if(path==='/api/recalculate'){
    const result=calculate(dataset.value,state),previous=state.versions.at(-1),previousVersion=previous?await read('versions/'+previous.id+'.json'):null,baseline=previousVersion?.value.result||calculate(dataset.value,emptyState());const old=new Map(baseline.rows.map(r=>[r.id,r.suggested]));
    const id=randomUUID(),createdAt=new Date().toISOString(),changed=result.rows.filter(r=>r.suggested!==old.get(r.id)).length;
    version={id,label:'Версия '+(state.versions.length+1),createdAt,count:result.summary.candidates,units:result.summary.units,changed,previous:previous?.id||null};
    const snapshot={...version,datasetDate:dataset.value.meetingDate,input:structuredClone({...state,versions:[]}),result,comparison:result.rows.filter(r=>r.suggested!==old.get(r.id)).map(r=>({id:r.id,name:r.name,before:old.get(r.id),after:r.suggested,reason:r.reason,warnings:r.warnings}))};
    await write('versions/'+id+'.json',snapshot);state.versions=[...state.versions,version];
   }
   const updated=await write('meeting.json',{state,updatedAt:new Date().toISOString()},saved?.etag);return json({state,revision:updated.etag,version});
  }
  if(path==='/api/upload'&&req.method==='POST'){
   if(Number(req.headers.get('content-length'))>4*1024*1024)return json({error:'Файл больше 3,5 МБ'},413);
   const form=await req.formData(),file=form.get('file');if(!file||typeof file==='string'||file.size>3.5*1024*1024)return json({error:'Проверьте файл: максимум 3,5 МБ'},400);
   const ext=file.name.split('.').pop().toLowerCase();if(!['xlsx','csv','pdf'].includes(ext))return json({error:'Поддерживаются XLSX, CSV, PDF'},400);
   const bytes=Buffer.from(await file.arrayBuffer());if(ext==='pdf'&&bytes.subarray(0,5).toString()!=='%PDF-'||ext==='xlsx'&&bytes.subarray(0,2).toString()!=='PK')return json({error:'Содержимое не соответствует типу файла'},400);
   const id=hash(bytes),existing=await read('document-metadata/'+id+'.json');if(existing)return json({...existing.value,duplicate:true});
   const createdAt=new Date().toISOString(),metadata={id,filename:file.name.slice(0,240),size:file.size,ext,createdAt};
   await put(prefix()+'documents/'+id,bytes,{access:'private',addRandomSuffix:false,allowOverwrite:false,contentType:'application/octet-stream'}).catch(err=>{if(!/already exists/i.test(err.message))throw err;});
   await write('document-metadata/'+id+'.json',metadata).catch(async err=>{if(!await read('document-metadata/'+id+'.json'))throw err;});return json(metadata);
  }
  if(req.method==='GET'&&/^\/api\/document\/[a-f0-9]{64}$/.test(path)){const id=path.split('/').at(-1),meta=await read('document-metadata/'+id+'.json');if(!meta)return json({error:'Документ не найден'},404);const blob=await get(prefix()+'documents/'+id,{access:'private',useCache:false});if(!blob)return json({error:'Файл не найден'},404);return new Response(blob.stream,{headers:{...headers,'Content-Type':'application/octet-stream','Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(meta.value.filename)}});}
  if(req.method==='GET'&&/^\/api\/version\/[a-z0-9-]{36}$/.test(path)){const v=await read('versions/'+path.split('/').at(-1)+'.json');return v?json(v.value):json({error:'Версия не найдена'},404);}
  return json({error:'Не найдено'},404);
 }catch(err){if(err.name==='BlobPreconditionFailedError'||/already exists/i.test(err.message))return json({error:'Данные уже изменились. Скачайте черновик и обновите страницу.'},409);console.error('NOTD review:',err.name);return json({error:err.name?.startsWith('Blob')?'Хранилище временно недоступно. Изменения не потеряны в открытом окне; попробуйте сохранить ещё раз.':err.message||'Ошибка обработки'},400);}
}
