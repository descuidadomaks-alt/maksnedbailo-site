import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {emptyState,calculate,validateState,acceptDecision} from '../app/projects/notd_v3/engine.js';

let checks=0;const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
const row={id:'notd:A',brand:'notd',sku:'A',name:'A',category:'Top',sales28:280,available:50,reserved:20,fresh:true},other={...row,id:'biblioteka:B',sku:'B',brand:'biblioteka'},data={meetingDate:'2026-10-16',rows:[row,other]};
let s=emptyState();const calc=(state=s)=>calculate(data,state).rows[0];eq(calc().suggested,230);eq(calc().early,80);
s.orders=[{number:'one',brand:'notd',confirmed:true,eta:'2026-10-23',lines:[{id:row.id,ordered:100,received:20,cancelled:10}]}];eq(calc().inbound,70);eq(calc().suggested,160);
s.orders[0].eta='';eq(calc().undated,70);eq(calc().suggested,230);assert.throws(()=>acceptDecision(s,data,row.id,230,''));checks++;
s=acceptDecision(s,data,row.id,230,'Подтверждаю дополнительную закупку',true);eq(calc().accepted,true);
s=emptyState();s.orders=[{number:'late',brand:'notd',confirmed:true,eta:'2026-11-12',lines:[{id:row.id,ordered:70,received:0,cancelled:0}]}];eq(calc().suggested,210);
s=emptyState();s=acceptDecision(s,data,row.id,230,'');eq(calc().accepted,true);s.complete.notd=true;s.notes.events='Только комментарий';eq(calc().accepted,true);
s.rules=[{id:'other',kind:'demand',scope:other.id,value:1.3,reason:'Другой бренд'}];eq(calc().accepted,true);s.rules.push({id:'this',kind:'demand',scope:row.id,value:1.3,reason:'Эта позиция'});eq(calc().stale,true);eq(calc().suggested,314);
s.rules.push({id:'conflict',kind:'demand',scope:row.id,value:1.5,reason:'Конфликт'});eq(calc().suggested,null);s.rules.at(-1).priority=1;eq(calc().suggested,370);
s=emptyState();const tiny={...data,rows:[{...row,sales28:1,available:0}]};eq(calculate(tiny,s).rows[0].suggested,5);s.rules=[{id:'min',kind:'minimum',scope:row.id,value:1,reason:'Исключение'}];eq(calculate(tiny,s).rows[0].suggested,1);
eq(calculate({...tiny,rows:[{...tiny.rows[0],available:1}]},emptyState()).rows[0].suggested,0);eq(calculate({...tiny,rows:[{...tiny.rows[0],sales28:6}]},emptyState()).rows[0].suggested,6);
s=emptyState();s.rules=[{id:'floor',kind:'floor',scope:row.id,value:100,reason:'Минимальный запас'}];eq(calc().suggested,260); // day21 demand210 + floor100 - free50, vs 28-day baseline230.
s.rules=[{id:'risk',kind:'risk',scope:row.id,value:100,reason:'Опциональный опт'}];eq(calc().suggested,230);eq(calc().optionalTotal,330);
s.rules=[{id:'extra',kind:'extra',scope:row.id,value:40,from:'2026-10-20',incremental:true,reason:'Не в резерве'}];eq(calc().suggested,270);s.rules[0].incremental=false;assert.throws(()=>validateState(s,data));checks++;
s=emptyState();s.rules=[{id:'inactive',kind:'active',scope:row.id,value:0,reason:'Снят'}];eq(calc().suggested,0);assert.throws(()=>acceptDecision(s,data,row.id,10,'Хочу'));checks++;
eq(calculate({...data,rows:[{...row,available:null,fresh:false}]},emptyState()).rows[0].suggested,null);
s=emptyState();s.orders=[{number:'x',brand:'notd',documentId:'same',lines:[{id:row.id,ordered:10,received:11,cancelled:0}]}];assert.throws(()=>validateState(s,data));checks++;
s.orders[0].lines[0].received=0;s.orders.push({...s.orders[0],number:'y'});assert.throws(()=>validateState(s,data));checks++;

console.log(JSON.stringify({checks,contract:"3.0.0"}));
