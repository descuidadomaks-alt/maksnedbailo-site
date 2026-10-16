// Pure purchasing contract: no CRM, storage, UI, or LLM dependencies.
export const ENGINE_VERSION='3.1.0';
export const DEFAULT_PARAMS=Object.freeze({review:7,lead:14,buffer:7,minimumOrder:5});
export const RULE_TYPES=Object.freeze({demand:'Сезон / спрос ×',delivery:'Срок новой доставки, дней',extra:'Подтверждённый разовый спрос, шт.',floor:'Минимальный свободный запас, шт.',minimum:'Минимум положительного заказа, шт.',risk:'Опциональный резерв под опт, шт.',active:'Закупка разрешена: 1 / запрещена: 0'});
const DAY=86400000;
export function dayNumber(s){return /^\d{4}-\d{2}-\d{2}$/.test(s||'')?Date.parse(s+'T00:00:00Z')/DAY:NaN;}
export function dateAfter(s,n){return new Date((dayNumber(s)+n)*DAY).toISOString().slice(0,10);}
export function canonical(x){if(Array.isArray(x))return '['+x.map(canonical).join(',')+']';if(x&&typeof x==='object')return '{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+canonical(x[k])).join(',')+'}';return JSON.stringify(x);}
export function fingerprint(x){const s=canonical(x);let a=2166136261,b=5381;for(let i=0;i<s.length;i++){a=Math.imul(a^s.charCodeAt(i),16777619);b=Math.imul(b,33)^s.charCodeAt(i);}return (a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0');}
export function emptyState(){return {schemaVersion:3,engineVersion:ENGINE_VERSION,params:{...DEFAULT_PARAMS},rules:[],orders:[],edits:{},complete:{notd:false,biblioteka:false},notes:{},versions:[],legacyVersions:[],mappingMemory:{},importDraft:null};}
function applies(r,row,date){return r.enabled!==false&&(!r.from||r.from<=date)&&(!r.to||r.to>=date)&&(r.scope==='all'||r.scope===row.brand||r.scope===row.id||r.scope==='category:'+row.brand+':'+row.category);}
function rank(r){return r.scope?.startsWith('category:')?2:r.scope?.includes(':')?3:r.scope==='all'?0:1;}
function pick(rules,kind,row,date,fallback){const xs=rules.filter(r=>r.kind===kind&&applies(r,row,date)).sort((a,b)=>rank(b)-rank(a)||(Number(b.priority)||0)-(Number(a.priority)||0));if(!xs.length)return {value:fallback,ids:[],conflict:false};const winners=xs.filter(r=>rank(r)===rank(xs[0])&&(Number(r.priority)||0)===(Number(xs[0].priority)||0));return {value:Number(winners[0].value),ids:winners.map(r=>r.id),conflict:new Set(winners.map(r=>Number(r.value))).size>1};}
const qty=x=>Math.max(0,Math.ceil(x-1e-8));
export function calculate(data,state){
 const p={...DEFAULT_PARAMS,...state.params},rules=state.rules||[],asOf=data.meetingDate;
 if(![p.review,p.lead,p.buffer,p.minimumOrder].every(Number.isInteger)||p.review<1||p.review>90||p.lead<0||p.lead>90||p.buffer<0||p.buffer>90||p.minimumOrder<1||p.minimumOrder>10000)throw Error('Проверьте сроки и минимальный заказ.');
 const rows=data.rows.map(row=>{
  const edit=state.edits?.[row.id]||{},sales=Number(row.sales28??row.recentSales28??0),exclude=Number(edit.excludeSales||0),rate=Math.max(0,sales-exclude)/28;
  const unknownStock=!row.fresh||!Number.isFinite(row.available),free=unknownStock?null:row.available;
  const leadRule=pick(rules,'delivery',row,asOf,p.lead),lead=Math.ceil(leadRule.value),horizon=lead+p.review+p.buffer,normalHorizon=lead+p.review;
  const minRule=pick(rules,'minimum',row,asOf,p.minimumOrder),activeRule=pick(rules,'active',row,asOf,1);
  let conflict=leadRule.conflict||minRule.conflict||activeRule.conflict;
  const used=new Set([...leadRule.ids,...minRule.ids,...activeRule.ids]),arrivals=[],unknown=[],warnings=[];
  for(const po of state.orders||[]){if(po.status==='cancelled')continue;for(const l of po.lines||[]){if(l.id!==row.id)continue;const remaining=Math.max(0,l.ordered-l.received-l.cancelled);if(!remaining)continue;const day=dayNumber(po.eta)-dayNumber(asOf);if(po.confirmed&&Number.isFinite(day)&&day>=0)arrivals.push({day,qty:remaining,number:po.number,route:po.route||''});else unknown.push({qty:remaining,number:po.number});}}
  let cumulative=0,regular=0,extraTotal=0,peak=0,basePeak=0,noInboundPeak=0,floorPeak=0,early=0,risk=0;const schedule=[];
  for(let t=0;t<=horizon;t++){
   const date=dateAfter(asOf,t),d=pick(rules,'demand',row,date,1),f=pick(rules,'floor',row,date,0),rr=pick(rules,'risk',row,date,0);
   conflict||=d.conflict||f.conflict||rr.conflict;[...d.ids,...f.ids,...rr.ids].forEach(id=>used.add(id));
   const extras=rules.filter(r=>r.kind==='extra'&&r.incremental===true&&r.from===date&&applies(r,row,date));extras.forEach(r=>used.add(r.id));
   const extra=extras.reduce((s,r)=>s+Number(r.value),0);extraTotal+=extra;regular+=t>0?rate*d.value:0;cumulative=regular+extraTotal;
   const received=arrivals.filter(a=>a.day<=t).reduce((s,a)=>s+a.qty,0),shortage=cumulative-(free??0)-received;
   if(t<lead)early=Math.max(early,shortage);else{
    peak=Math.max(peak,shortage);basePeak=Math.max(basePeak,rate*t-(free??0)-received);noInboundPeak=Math.max(noInboundPeak,cumulative-(free??0));
    // Floor protects the regular review interval, while delay buffer already protects later demand.
    // Taking max avoids blindly adding two safety allowances for the same days.
    if(t<=normalHorizon)floorPeak=Math.max(floorPeak,shortage+f.value);
    risk=Math.max(risk,rr.value);
   }
   schedule.push({date,regular:t>0?rate*d.value:0,extra,arrived:arrivals.filter(a=>a.day===t).reduce((s,a)=>s+a.qty,0),balance:unknownStock?null:(free+received-cumulative),floor:f.value});
  }
  if(exclude<0||exclude>sales)conflict=true;
  const rawNeed=qty(Math.max(peak,floorPeak)),minimum=Math.ceil(minRule.value),minimumApplied=rawNeed>0?Math.max(rawNeed,minimum):0;
  const replaced=(state.productLinks||[]).some(l=>l.from===row.id&&l.status==='confirmed'),blocked=activeRule.value===0||replaced;
  const unknownInbound=unknown.reduce((s,a)=>s+a.qty,0),afterOpen=qty(Math.max(0,rawNeed-unknownInbound));
  const quantityPlan=afterOpen>0?Math.max(afterOpen,minimum):0;
  const beforeUndated=blocked?0:unknownStock||conflict?null:minimumApplied;
  const suggested=blocked?0:unknownStock||conflict?null:quantityPlan;
  const inbound=arrivals.filter(a=>a.day<=horizon).reduce((s,a)=>s+a.qty,0),later=arrivals.filter(a=>a.day>horizon).reduce((s,a)=>s+a.qty,0),undated=unknown.reduce((s,a)=>s+a.qty,0);
  const rowBasis=fingerprint({engine:ENGINE_VERSION,date:asOf,row:{id:row.id,sales,exclude,free},lead,horizon,minimum,blocked,schedule,arrivals,unknown,risk});
  const hasOverride=edit.qty!==undefined&&edit.qty!==null&&edit.qty!=='';
  const previous=hasOverride&&edit.origin==='v2'&&!edit.reviewBasis;
  const stale=hasOverride&&!previous&&!!edit.reviewedAt&&edit.reviewBasis!==rowBasis;
  const quantity=hasOverride?Number(edit.qty):suggested;
  const accepted=hasOverride&&!previous&&!stale&&!!edit.reviewedAt;
  if(unknownStock&&!blocked)warnings.push('Нет свежего остатка: количество не рассчитываем.');
  if(!state.complete?.[row.brand])warnings.push('Полнота открытых закупок не подтверждена.');
  if(undated)warnings.push('Уже заказано '+undated+' шт. без актуальной даты: проверьте риск повторной закупки.');
  if(early>0&&!unknownStock)warnings.push('До новой доставки может не хватить '+qty(early)+' шт.');
  if(conflict)warnings.push('Конфликт правил: выберите приоритет или одно значение.');
  if(previous)warnings.push('Сохранённое решение V2: можно подтвердить одним нажатием.');
  if(stale)warnings.push('Изменились данные именно этого товара: проверьте решение.');
  if(blocked)warnings.push('Закупка запрещена правилом: позиция снята или исключена.');
  const knowledge=state.ownerKnowledge?.[row.id]||Object.entries(state.ownerKnowledge||{}).filter(([id])=>(state.productLinks||[]).some(l=>l.from===id&&l.to===row.id&&l.status==='confirmed')).map(([,v])=>v).at(-1);
  const issue=state.dataIssues?.[row.id],pendingLink=(state.productLinks||[]).some(l=>l.status==='pending'&&(l.from===row.id||l.to===row.id));if(issue&&!issue.resolved)warnings.push(issue.note);if(pendingLink)warnings.push('Есть старый / новый артикул этой позиции. Выберите одно итоговое количество в «Логика и группы».');
  return {...row,sales,rate,free,unknownStock,suggested,beforeUndated,replaced,knowledge,planningConditional:unknownInbound>0,rawNeed,quantity,hasOverride,previous,stale,accepted,reason:edit.reason||'',inbound,later,undated,lead,horizon,normalHorizon,regularDemand:regular,extraDemand:extraTotal,demand:cumulative,early:unknownStock?null:qty(early),conflict,blocked,minimum,optionalReserve:blocked?0:risk,optionalTotal:suggested===null?null:suggested+risk,rowBasis,usedRules:[...used],warnings,needsInboundCheck:undated>0,dataIssue:!!issue&&!issue.resolved,pendingLink,components:{baseline:unknownStock?null:qty(basePeak),adjusted:unknownStock?null:qty(peak),floor:unknownStock?null:qty(floorPeak),minimumAdded:suggested===null?null:Math.max(0,suggested-rawNeed),inboundReduction:unknownStock?null:qty(noInboundPeak)-qty(peak)},schedule,readyForSupplier:false};
 });
 return {asOf,engineVersion:ENGINE_VERSION,rulebook:fingerprint({params:p,rules}),params:p,rows,summary:{candidates:rows.filter(r=>r.suggested>0).length,units:rows.reduce((s,r)=>s+(r.suggested||0),0),ownerUnits:rows.reduce((s,r)=>s+(r.quantity||0),0),accepted:rows.filter(r=>r.accepted).length,previous:rows.filter(r=>r.previous).length,stale:rows.filter(r=>r.stale).length,unknownStock:rows.filter(r=>r.unknownStock).length,conflicts:rows.filter(r=>r.conflict).length,undated:rows.filter(r=>r.undated>0).length},readyForSupplier:false};
}
export function validateState(s,data){
 if(!s||s.schemaVersion!==3||!Array.isArray(s.rules)||!Array.isArray(s.orders)||s.rules.length>500||s.orders.length>500||!s.edits||typeof s.edits!=='object'||Object.keys(s.edits).length>2000)throw Error('Некорректное состояние встречи.');
 const ids=new Set(data.rows.map(r=>r.id)),scopes=new Set(['all','notd','biblioteka',...ids,...data.rows.map(r=>'category:'+r.brand+':'+r.category)]);
 const ruleIds=new Set();for(const r of s.rules){if(!r.id||ruleIds.has(r.id)||!Object.hasOwn(RULE_TYPES,r.kind)||!scopes.has(r.scope)||!Number.isFinite(Number(r.value))||Number(r.value)<0||Number(r.value)>(r.kind==='demand'?10:r.kind==='delivery'?90:r.kind==='active'?1:100000)||!r.reason?.trim())throw Error('Проверьте тип, значение, область и причину правила.');ruleIds.add(r.id);if([r.from,r.to].some(x=>x&&(!Number.isFinite(dayNumber(x))||dateAfter(x,0)!==x))||r.from&&r.to&&r.to<r.from)throw Error('Проверьте даты правила.');if(!Number.isInteger(Number(r.priority||0))||Math.abs(Number(r.priority||0))>1000)throw Error('Проверьте приоритет.');if(r.kind==='extra'&&(!r.incremental||!r.from||!ids.has(r.scope)))throw Error('Разовый заказ требует SKU, даты и подтверждения отсутствия двойного резерва.');if(['floor','minimum','risk'].includes(r.kind)&&(!Number.isInteger(Number(r.value))||r.kind==='minimum'&&Number(r.value)<1))throw Error('Количество в правиле должно быть целым.');if(r.kind==='active'&&![0,1].includes(Number(r.value)))throw Error('Разрешение закупки: 0 или 1.');}
 const nums=new Set(),docs=new Set();for(const p of s.orders){const key=p.brand+':'+p.number;if(!p.number||nums.has(key)||!['notd','biblioteka'].includes(p.brand)||!Array.isArray(p.lines)||p.lines.length>3000)throw Error('Проверьте уникальный номер и строки закупки.');nums.add(key);if(p.documentId){if(docs.has(p.documentId))throw Error('Один оригинал не может учитываться в двух закупках.');docs.add(p.documentId);}if(p.eta&&(!Number.isFinite(dayNumber(p.eta))||dateAfter(p.eta,0)!==p.eta))throw Error('Проверьте дату приезда.');const seen=new Set();for(const l of p.lines){if(!ids.has(l.id)||!l.id.startsWith(p.brand+':')||seen.has(l.id)||![l.ordered,l.received,l.cancelled].every(x=>Number.isInteger(x)&&x>=0&&x<=100000)||l.received+l.cancelled>l.ordered)throw Error('Проверьте товар, заказано, получено и отменено.');seen.add(l.id);}}
 for(const p of s.orders)for(const l of p.unmatchedLines||[]){if(!l.sourceName||![l.ordered,l.received,l.cancelled].every(x=>Number.isInteger(x)&&x>=0&&x<=100000)||l.received+l.cancelled>l.ordered)throw Error('Проверьте несопоставленные строки закупки.');}
 for(const [id,ed]of Object.entries(s.edits)){const row=data.rows.find(r=>r.id===id);if(!row)throw Error('Неизвестный SKU в решениях.');if(ed.qty!==undefined&&ed.qty!==null&&ed.qty!==''&&(!Number.isInteger(Number(ed.qty))||Number(ed.qty)<0||Number(ed.qty)>100000))throw Error('Количество должно быть целым и неотрицательным.');if(!Number.isFinite(Number(ed.excludeSales||0))||Number(ed.excludeSales||0)<0||Number(ed.excludeSales||0)>Number(row.sales28||0))throw Error('Исключение превышает исходные продажи.');if(String(ed.reason||'').length>5000)throw Error('Слишком длинный комментарий.');}
 if(JSON.stringify(s).length>2000000)throw Error('Встреча больше 2 МБ. Разделите документы.');calculate(data,s);return s;
}
export function acceptDecision(state,data,id,quantity,reason,allowUndated=false){
 const candidate=structuredClone(state),r=calculate(data,candidate).rows.find(x=>x.id===id);if(!r||r.conflict||r.unknownStock&&!r.blocked||r.dataIssue||r.pendingLink)throw Error('Сначала уточните остаток, конфликт правил, соответствие артикулов или расхождение продаж.');
 if(r.needsInboundCheck&&!allowUndated&&!state.cycle?.acknowledgeUndated)throw Error('Есть уже заказанное без даты. Для новой закупки подтвердите риск повтора в карточке.');
 if(r.blocked&&Number(quantity)>0)throw Error('Сначала измените правило запрета закупки.');
 if(Number(quantity)!==r.suggested&&!reason?.trim())throw Error('Для другого количества укажите причину.');
 candidate.edits[id]={...candidate.edits[id],qty:Number(quantity),reason:reason?.trim()||'Согласен с расчётом',origin:'v3',reviewedAt:new Date().toISOString(),allowUndated,reviewBasis:r.rowBasis};validateState(candidate,data);return candidate;
}
