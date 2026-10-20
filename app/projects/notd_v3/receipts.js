import {validateState} from './engine.js';
export const receiptLines=po=>[...po.lines,...po.unmatchedLines||[]];
export function updateReceipt(state,data,index,input,{at=new Date().toISOString(),source='Владелец на экране поставки'}={}){
 const next=structuredClone(state),p=next.orders[index];
 if(!p)throw Error('Счёт не найден. Обновите страницу.');
 const before=JSON.stringify(p),lines=receiptLines(p);
 if(input.mode==='all')for(const l of lines)l.received=l.ordered-l.cancelled;
 else if(input.lines){if(input.lines.length!==lines.length)throw Error('Состав счёта изменился. Откройте его заново.');lines.forEach((l,i)=>{l.received=input.lines[i].received;l.cancelled=input.lines[i].cancelled;});}
 for(const l of lines)if(![l.ordered,l.received,l.cancelled].every(x=>Number.isInteger(x)&&x>=0&&x<=100000)||l.received+l.cancelled>l.ordered)throw Error('Получено и отменено не могут превышать заказанное. Укажите целые неотрицательные количества.');
 const increased=lines.some((l,i)=>l.received>receiptLines(state.orders[index])[i].received);
 if(increased&&input.stockConfirmed!==true)throw Error('Подтвердите, что полученное уже внесено в остатки CRM на дату среза.');
 p.eta=input.eta??p.eta??'';p.route=input.route??p.route??'';
 const received=lines.reduce((s,l)=>s+l.received,0),remaining=lines.reduce((s,l)=>s+l.ordered-l.received-l.cancelled,0);
 const requested=input.mode==='all'?'received':input.status||p.status;
 if(requested==='received'&&remaining)throw Error('Выберите «Получено всё» или укажите частичное получение.');
 if(requested==='cancelled'&&remaining)throw Error('Для отмены укажите отменённые количества.');
 p.status=!remaining?(received?'received':'cancelled'):received?'partial':requested==='received'?'in_transit':requested;
 if(JSON.stringify(p)!==before){p.updatedAt=at;next.receiptHistory=next.receiptHistory||[];next.receiptHistory.push({number:p.number,at,source,stockAsOf:data.meetingDate,received,remaining});if(increased){p.receivedAt=at;p.stockConfirmedAsOf=data.meetingDate;p.receiptSource=source;}if(next.cycle&&next.cycle.status!=='awaiting-data'&&lines.some((l,i)=>l.received!==receiptLines(state.orders[index])[i].received||l.cancelled!==receiptLines(state.orders[index])[i].cancelled)){const allClosed=next.orders.every(po=>po.status==='cancelled'||receiptLines(po).every(l=>l.ordered===l.received+l.cancelled));next.cycle.receiptsReviewedAsOf=allClosed?data.meetingDate:null;next.cycle.status=allClosed?'ready':'awaiting-receipts';}}
 validateState(next,data);return next;
}
