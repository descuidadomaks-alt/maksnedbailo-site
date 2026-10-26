(() => {
  'use strict';
  const card=document.querySelector('.tilt-card'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),coarse=matchMedia('(pointer:coarse)');
  let x=0,y=0,tx=0,ty=0,frame=0,last=0,visible=false,drag=null,baseline=null,gyroAt=0;
  const clamp=n=>Math.max(-6,Math.min(6,n));
  function render(now){
    frame=0;if(!visible||document.hidden)return;
    if(reduced.matches){tx=Math.sin(now/7000)*.22;ty=Math.sin(now/9000)*.32;}
    const ease=1-Math.exp(-Math.min(last?now-last:16.7,64)/110);last=now;x+=(tx-x)*ease;y+=(ty-y)*ease;
    card.style.setProperty('--rx',x.toFixed(3)+'deg');card.style.setProperty('--ry',y.toFixed(3)+'deg');
    if(reduced.matches||Math.abs(x-tx)>.005||Math.abs(y-ty)>.005)wake();
  }
  function wake(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(render);}
  function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
  card.addEventListener('pointermove',event=>{
    if(reduced.matches)return;
    if(event.pointerType==='touch'&&drag){tx=clamp((drag.y-event.clientY)/18);ty=clamp((event.clientX-drag.x)/18);wake();return;}
    if(coarse.matches||event.pointerType==='touch')return;
    const r=card.getBoundingClientRect();tx=clamp(-(event.clientY-r.top-r.height/2)/(r.height/2)*6);ty=clamp((event.clientX-r.left-r.width/2)/(r.width/2)*6);wake();
  },{passive:true});
  card.addEventListener('pointerdown',event=>{if(event.pointerType==='touch'&&!reduced.matches){drag={x:event.clientX,y:event.clientY};card.setPointerCapture(event.pointerId);}});
  const rest=()=>{drag=null;if(!reduced.matches&&performance.now()-gyroAt>800){tx=0;ty=0;wake();}};
  card.addEventListener('pointerup',rest);card.addEventListener('pointercancel',rest);card.addEventListener('pointerleave',()=>{if(!coarse.matches)rest();});
  addEventListener('deviceorientation',event=>{
    if(!visible||!coarse.matches||reduced.matches||drag||!Number.isFinite(event.beta)||!Number.isFinite(event.gamma))return;
    if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'&&!window.careLessMotionAllowed)return;
    if(!baseline)baseline={beta:event.beta,gamma:event.gamma};
    const b=event.beta-baseline.beta,g=event.gamma-baseline.gamma,landscape=Math.abs(screen.orientation?.angle||0)===90;
    tx=clamp((landscape?g:-b)*.25);ty=clamp((landscape?b:g)*.25);gyroAt=performance.now();wake();
  },{passive:true});
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){baseline=null;wake();}else stop();},{threshold:.15}).observe(card);
  reduced.addEventListener('change',()=>{baseline=null;tx=ty=0;wake();});document.addEventListener('visibilitychange',()=>document.hidden?stop():wake());
})();
