(() => {
  'use strict';
  const PROOF_ITEMS=[];
  const DEV_PROOF=false;
  const proof=document.querySelector('#proof');
  const placeholders=['[CLIENT 1: what changed]','[CLIENT 2: what changed]','[CLIENT 3: what changed]'];
  const ready=PROOF_ITEMS.length===3&&PROOF_ITEMS.every(item=>typeof item==='string'&&item.trim()&&!item.includes('[CLIENT'));
  if(ready||DEV_PROOF){
    (ready?PROOF_ITEMS:placeholders).forEach(text=>{const li=document.createElement('li');li.textContent=text;proof.querySelector('ul').append(li);});
    proof.hidden=false;
  }
  const sequence=document.querySelector('.closing-sequence');
  const human=document.querySelector('.human-section');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let frame=0;
  function paint(){
    frame=0;
    const phase=Math.max(0,Math.min(1,-human.getBoundingClientRect().top/human.offsetHeight));
    sequence.style.setProperty('--human-veil',String(reduced.matches?0:1-phase));
    sequence.style.setProperty('--human-copy',String(reduced.matches?1:Math.max(0,1-phase/.9)));
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',schedule);paint();
  document.querySelectorAll('.final-chips a').forEach(link=>link.addEventListener('click',event=>{
    if(!SCOUT_ENABLED||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    if(window.careLessScout&&typeof window.careLessScout.open==='function'){
      event.preventDefault();window.careLessScout.open({topic:link.dataset.topic});
    }
  }));
})();
