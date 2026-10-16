import {fingerprint,dateAfter,ENGINE_VERSION} from './engine.js';
export function canonicalId(id,state){const seen=new Set();while(!seen.has(id)){seen.add(id);const link=(state.productLinks||[]).find(l=>l.from===id&&l.status==='confirmed');if(!link)return id;id=link.to;}throw Error('Циклическое соответствие артикулов.');}
export function coverage(data,state,result=null){
 const rows=result?.rows||data.rows,sets={active:[],replaced:[],excluded:[],missing:[]};
 for(const row of rows){const replaced=canonicalId(row.id,state)!==row.id,excluded=state.rules.some(r=>r.kind==='active'&&r.scope===row.id&&r.enabled!==false&&Number(r.value)===0&&(!r.from||r.from<=data.meetingDate)&&(!r.to||r.to>=data.meetingDate));if(replaced)sets.replaced.push(row);else if(excluded)sets.excluded.push(row);else{sets.active.push(row);if(!row.fresh||!Number.isFinite(row.available))sets.missing.push(row);}}
 const outstanding=(state.orders||[]).filter(p=>p.status!=='cancelled').reduce((s,p)=>s+p.lines.reduce((n,l)=>n+Math.max(0,l.ordered-l.received-l.cancelled),0)+(p.unmatchedLines||[]).reduce((n,l)=>n+Math.max(0,l.ordered-l.received-l.cancelled),0),0);
 return {known:rows.length,active:sets.active.length,replaced:sets.replaced.length,excluded:sets.excluded.length,missing:sets.missing.length,fresh:sets.active.length-sets.missing.length,outstanding,unmatchedInbound:(state.orders||[]).filter(p=>p.status!=='cancelled').flatMap(p=>p.unmatchedLines||[]),sets};
}
export function prepareNextCycle(data,original,{targetDate,at=new Date().toISOString()}={}){
 const state=structuredClone(original);state.engineVersion=ENGINE_VERSION;state.ownerKnowledge=state.ownerKnowledge||{};state.cycleHistory=state.cycleHistory||[];
 if(state.cycle?.status==='awaiting-data')return state;
 state.cycleHistory.push({id:state.cycle?.id||fingerprint({date:data.meetingDate,at}),closedAt:at,datasetDate:data.meetingDate,decisions:structuredClone(state.edits),label:'Предыдущая проверка'});
 for(const [id,e]of Object.entries(state.edits)){state.ownerKnowledge[id]={...state.ownerKnowledge[id],...e,capturedAt:at,sourceDate:data.meetingDate};}
 // Explicit owner corrections identify products; old requested quantities are not added together.
 for(const link of state.productLinks||[]){if(link.status==='different')continue;const from=data.rows.find(r=>r.id===link.from),to=data.rows.find(r=>r.id===link.to);if(!from||!to)continue;link.status='confirmed';link.resolvedAt=at;link.source='Явное указание актуального артикула в комментарии владельца';state.mappingMemory['sku:'+link.from]=link.to;}
 const addRule=(r)=>{if(!state.rules.some(x=>x.kind===r.kind&&x.scope===r.scope&&x.enabled!==false))state.rules.push({...r,id:'owner-'+fingerprint(r),enabled:true,priority:100,source:'Комментарий владельца',createdAt:at});};
 for(const [id,k]of Object.entries(state.ownerKnowledge)){
  const scope=canonicalId(id,state),text=k.reason||'';
  if(/вывели\s+с\s+производства|временно\s+скрыли/i.test(text))addRule({kind:'active',scope,value:0,reason:text});
  const floor=text.match(/(?:минимум|для наличия|в наличии)[\s\S]{0,45}?(\d+)\s*(?:шт|штук)/i)||text.match(/(?:для наличия|в наличии)\s+(\d+)\b/i);
  if(floor)addRule({kind:'floor',scope,value:Number(floor[1]),reason:text});
 }
 state.historicalIssues=[...(state.historicalIssues||[]),...Object.entries(state.dataIssues||{}).map(([id,issue])=>({id,...issue,sourceDate:data.meetingDate,archivedAt:at}))];state.dataIssues={};state.edits={};state.cycle={id:'cycle-'+fingerprint({at,source:data.meetingDate}),status:'awaiting-data',afterDate:data.meetingDate,targetDate:targetDate||dateAfter(data.meetingDate,3),preparedAt:at,acknowledgeUndated:true,label:'Следующая закупка'};
 return state;
}
export function validateDataset(next,previous){
 if(!next||!/^\d{4}-\d{2}-\d{2}$/.test(next.meetingDate)||!Array.isArray(next.rows)||!next.rows.length||next.rows.length>20000||new Set(next.rows.map(r=>r.id)).size!==next.rows.length)throw Error('Некорректная выгрузка CRM.');
 for(const r of next.rows){if(!r.id||!['notd','biblioteka'].includes(r.brand)||r.id!==r.brand+':'+r.sku||typeof r.name!=='string'||r.fresh&&(!Number.isFinite(r.available)||!Number.isFinite(r.sales28)||r.sourceDate!==next.meetingDate)||r.salesEnd&&r.salesEnd>next.meetingDate)throw Error('Проверьте артикулы, дату, продажи и свободные остатки выгрузки.');}
 if(previous&&next.meetingDate<previous.meetingDate)throw Error('Новый срез не может быть старше текущего.');return next;
}
