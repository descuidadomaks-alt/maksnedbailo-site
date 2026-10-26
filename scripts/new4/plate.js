(() => {
  'use strict';
  const card=document.querySelector('.tilt-card'),coarse=matchMedia('(pointer:coarse)');
  let x=0,y=0,tx=0,ty=0,frame=0,last=0,visible=false,drag=null;
  const clamp=n=>Math.max(-6,Math.min(6,n));
  function render(now){
    frame=0;if(!visible||document.hidden)return;
    if(CL.motion.matches)tx=ty=0;
    else if(coarse.matches&&!drag){tx=Math.sin(now/4600)*1.7;ty=Math.sin(now/6300)*2.3;}
    const ease=1-Math.exp(-Math.min(last?now-last:16.7,64)/110);last=now;x+=(tx-x)*ease;y+=(ty-y)*ease;
    card.style.setProperty('--rx',x.toFixed(3)+'deg');card.style.setProperty('--ry',y.toFixed(3)+'deg');
    card.style.setProperty('--px',(-y*1.25).toFixed(2)+'px');card.style.setProperty('--py',(x*1.25).toFixed(2)+'px');card.style.setProperty('--gx',(50+y*5)+'%');card.style.setProperty('--gy',(50-x*5)+'%');
    if(coarse.matches&&!CL.motion.matches||Math.abs(x-tx)>.005||Math.abs(y-ty)>.005)wake();
  }
  function wake(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(render);}
  card.addEventListener('pointermove',event=>{
    if(CL.motion.matches)return;if(event.pointerType==='touch'&&drag){tx=clamp((drag.y-event.clientY)/18);ty=clamp((event.clientX-drag.x)/18);wake();return;}
    if(coarse.matches)return;const r=card.getBoundingClientRect();tx=clamp(-(event.clientY-r.top-r.height/2)/(r.height/2)*6);ty=clamp((event.clientX-r.left-r.width/2)/(r.width/2)*6);wake();
  },{passive:true});
  card.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){drag={x:e.clientX,y:e.clientY};card.setPointerCapture(e.pointerId);}});
  const rest=()=>{drag=null;tx=ty=0;wake();};['pointerup','pointercancel','pointerleave'].forEach(name=>card.addEventListener(name,rest));
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;last=0;}},{threshold:.1}).observe(card);
  CL.motion.addEventListener('change',rest);document.addEventListener('visibilitychange',()=>{if(!document.hidden)wake();});
})();
