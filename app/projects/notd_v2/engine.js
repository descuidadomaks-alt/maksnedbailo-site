// Deterministic meeting model. No language model, network or CRM writes.
const DAY = 86400000;
export const DEFAULT_PARAMS = Object.freeze({review:7,lead:14,buffer:7});
export function emptyState(){return {params:{...DEFAULT_PARAMS},rules:[],orders:[],edits:{},complete:{notd:false,biblioteka:false},notes:{},versions:[]};}
export function dayNumber(s){return Date.parse(s+'T00:00:00Z')/DAY;}
export function dateAfter(s,n){return new Date((dayNumber(s)+n)*DAY).toISOString().slice(0,10);}
export function canonical(x){if(Array.isArray(x))return '['+x.map(canonical).join(',')+']';if(x&&typeof x==='object')return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+canonical(x[k])).join(',')+'}';return JSON.stringify(x);}
export function basisKey(state){const s=canonical({params:state.params,rules:state.rules,orders:state.orders,complete:state.complete,history:Object.fromEntries(Object.entries(state.edits||{}).filter(([,v])=>v.excludeSales>0).map(([k,v])=>[k,v.excludeSales]))});let a=2166136261,b=5381;for(let i=0;i<s.length;i++){a=Math.imul(a^s.charCodeAt(i),16777619);b=Math.imul(b,33)^s.charCodeAt(i);}return (a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0');}
function relevant(rule,row,date){return rule.enabled!==false&&(!rule.from||rule.from<=date)&&(!rule.to||rule.to>=date)&&(rule.scope==='all'||rule.scope===row.brand||rule.scope===row.id||rule.scope==='category:'+row.brand+':'+row.category);}
function rank(rule){return (rule.scope?.includes(':')?(rule.scope.startsWith('category:')?2:3):rule.scope==='all'?0:1);}
function pick(rules,kind,row,date,fallback){const r=rules.filter(x=>x.kind===kind&&relevant(x,row,date)).sort((a,b)=>rank(b)-rank(a)||(b.priority||0)-(a.priority||0));if(!r.length)return {value:fallback,used:[],conflict:false};const winners=r.filter(x=>rank(x)===rank(r[0])&&(x.priority||0)===(r[0].priority||0));return {value:Number(r[0].value),used:winners.map(x=>x.id),conflict:new Set(winners.map(x=>Number(x.value))).size>1};}
export function calculate(data,state){
 const params={...DEFAULT_PARAMS,...state.params},rules=state.rules||[],key=basisKey(state),asOf=data.meetingDate;
 if(![params.review,params.lead,params.buffer].every(x=>Number.isInteger(x)&&x>=0&&x<=90)||params.review<1)throw Error('Проверьте сроки: пересмотр 1–90, доставка и запас 0–90 дней.');
 const results=data.rows.map(row=>{
  const edit=state.edits?.[row.id]||{},leadRule=pick(rules,'delivery',row,asOf,params.lead),lead=Math.ceil(leadRule.value),horizon=lead+params.review+params.buffer;
  const exclusion=Number(edit.excludeSales||0),sales=Number(row.sales28??row.recentSales28??0),rate=Math.max(0,sales-exclusion)/28;
  const unknownStock=!row.fresh||!Number.isFinite(row.available),free=unknownStock?null:row.available;
  const arrivals=[],unknownArrivals=[],warnings=[],usedRules=new Set(leadRule.used);let conflict=leadRule.conflict;
  for(const po of state.orders||[]){if(po.status==='cancelled')continue;for(const l of po.lines||[]){if(l.id!==row.id)continue;const remaining=Math.max(0,l.ordered-l.received-l.cancelled);if(!remaining)continue;const etaDays=dayNumber(po.eta)-dayNumber(asOf);if(po.confirmed&&po.eta&&Number.isFinite(etaDays)&&etaDays>=0){arrivals.push({day:etaDays,qty:remaining,po:po.number});}else unknownArrivals.push({qty:remaining,po:po.number});}}
  if(unknownStock)warnings.push('Нет свежего остатка — количество не рассчитано');
  if(!state.complete?.[row.brand])warnings.push('Не подтверждено, что учтены все закупки');
  if(unknownArrivals.length)warnings.push('Есть заказ без подтверждённой актуальной даты приезда');
  if(exclusion<0||exclusion>sales){warnings.push('Исключение из продаж больше продаж или отрицательное');conflict=true;}
  let cumulative=0,peak=0,early=0,covered=0,demand=0;
  for(let t=0;t<=horizon;t++){
   const date=dateAfter(asOf,t),d=pick(rules,'demand',row,date,1);conflict ||= d.conflict;d.used.forEach(x=>usedRules.add(x));
   // Forecast day 1 starts at the end of the snapshot date. Day 0 may contain dated commitments/arrivals.
   const extra=rules.filter(x=>x.kind==='extra'&&x.incremental===true&&relevant(x,row,date)&&x.from===date).reduce((s,x)=>{usedRules.add(x.id);return s+Number(x.value);},0);
   cumulative+=(t>0?rate*d.value:0)+extra;covered=arrivals.filter(x=>x.day<=t).reduce((s,x)=>s+x.qty,0);
   const shortage=cumulative-(free??0)-covered;
   if(t<lead)early=Math.max(early,shortage);else peak=Math.max(peak,shortage);
  }
  demand=cumulative;
  if(conflict)warnings.push('Конфликт правил — нужно выбрать одно правило или изменить приоритет');
  const suggested=unknownStock||conflict?null:Math.max(0,Math.ceil(peak-1e-8));
  const inbound=arrivals.filter(x=>x.day<=horizon).reduce((s,x)=>s+x.qty,0),later=arrivals.filter(x=>x.day>horizon).reduce((s,x)=>s+x.qty,0),undated=unknownArrivals.reduce((s,x)=>s+x.qty,0);
  if(early>0&&!unknownStock)warnings.push('Риск нехватки до приезда новой закупки: '+Math.ceil(early)+' шт.');
  const hasOverride=edit.qty!==undefined&&edit.qty!==null&&edit.qty!=='';
  const stale=hasOverride&&edit.basis!==key;
  if(stale)warnings.push('После пересчёта ручное решение нужно подтвердить заново');
  const quantity=hasOverride?Number(edit.qty):suggested;
  const accepted=hasOverride&&!stale&&!!edit.reason?.trim();
  return {id:row.id,brand:row.brand,sku:row.sku,name:row.name,fullName:row.fullName,category:row.category,sales,rate,free,reserved:row.reserved,suggested,quantity,hasOverride,accepted,stale,reason:edit.reason||'',inbound,later,undated,lead,horizon,demand,early:unknownStock?null:Math.max(0,Math.ceil(early-1e-8)),conflict,unknownStock,warnings,usedRules:[...usedRules],readyForSupplier:false};
 });
 return {asOf,basis:key,params,rows:results,summary:{candidates:results.filter(x=>x.suggested>0).length,units:results.reduce((s,x)=>s+(x.suggested||0),0),unknownStock:results.filter(x=>x.unknownStock).length,conflicts:results.filter(x=>x.conflict).length},readyForSupplier:false};
}
export function validateState(s,data){
 if(!s||typeof s!=='object'||Array.isArray(s))throw Error('Некорректное состояние');
 const ids=new Set(data.rows.map(r=>r.id));
 for(const k of ['rules','orders'])if(!Array.isArray(s[k])||s[k].length>500)throw Error('Слишком много правил или поставок');
 if(!s.edits||typeof s.edits!=='object'||Object.keys(s.edits).length>2000)throw Error('Некорректные правки');
 for(const [id,e]of Object.entries(s.edits)){if(!ids.has(id))throw Error('Неизвестный товар в правках');if(e.qty!==undefined&&e.qty!==null&&e.qty!==''&&(!Number.isInteger(Number(e.qty))||Number(e.qty)<0||Number(e.qty)>100000))throw Error('Количество должно быть целым и неотрицательным');if(!Number.isFinite(Number(e.excludeSales||0))||Number(e.excludeSales||0)<0||Number(e.excludeSales||0)>Number(data.rows.find(r=>r.id===id).sales28||0))throw Error('Исключение из продаж не может быть больше продаж');if(String(e.reason||'').length>4000)throw Error('Комментарий слишком длинный');}
 const orderIds=new Set();
 for(const p of s.orders){if(!p.number||orderIds.has(p.brand+':'+p.number))throw Error('Номер закупки должен быть уникальным внутри бренда');orderIds.add(p.brand+':'+p.number);if(!['notd','biblioteka'].includes(p.brand)||!Array.isArray(p.lines)||p.lines.length>3000)throw Error('Некорректная закупка');if(p.eta&&!/^\d{4}-\d{2}-\d{2}$/.test(p.eta))throw Error('Некорректная дата приезда');const seen=new Set();for(const l of p.lines){if(!ids.has(l.id)||!l.id.startsWith(p.brand+':')||seen.has(l.id))throw Error('Неизвестный или повторный товар в закупке');seen.add(l.id);if(![l.ordered,l.received,l.cancelled].every(x=>Number.isInteger(x)&&x>=0&&x<=100000)||l.received+l.cancelled>l.ordered)throw Error('Проверьте заказано/получено/отменено');}}
 const scopes=new Set(['all','notd','biblioteka',...ids,...data.rows.map(r=>'category:'+r.brand+':'+r.category)]);
 for(const r of s.rules){if(!scopes.has(r.scope)||!['demand','delivery','extra'].includes(r.kind)||!Number.isFinite(Number(r.value))||Number(r.value)<0||Number(r.value)>(r.kind==='demand'?10:r.kind==='delivery'?90:100000))throw Error('Некорректное правило');if(!r.reason?.trim())throw Error('Укажите причину правила');if([r.from,r.to].some(x=>x&&(!/^\d{4}-\d{2}-\d{2}$/.test(x)||!Number.isFinite(dayNumber(x)))))throw Error('Проверьте даты правила');if(r.kind==='extra'&&(!r.incremental||!r.from||!ids.has(r.scope)))throw Error('Разовый заказ: конкретный товар, дата и подтверждение отсутствия резерва');if(r.from&&r.to&&r.to<r.from)throw Error('Дата окончания раньше начала');}
 calculate(data,s);return s;
}
