(() => {
  'use strict';
  const sequence=document.querySelector('.interface-sequence'),film=document.querySelector('#film'),layout=document.querySelector('.chapter-layout'),track=document.querySelector('.chapter-track');
  const articles=[...layout.querySelectorAll('.chapter')],cells=[...layout.querySelectorAll('td[data-pillar]')],labels=[...layout.querySelectorAll('[data-pillar-label]')],ticks=[...layout.querySelectorAll('.chapter-progress i')];
  const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:767px)');
  const maps=articles.map(article=>JSON.parse(article.dataset.intensities));
  const clamp=n=>Math.max(0,Math.min(1,n));let active=-2,frame=0;
  function light(index){
    if(index===active)return;active=index;const map=maps[index]||{};
    cells.forEach(cell=>{const level=map[cell.dataset.pillar]?.[cell.dataset.service]||0;cell.firstElementChild.dataset.level=String(level);cell.setAttribute('aria-label',cell.dataset.pillar+', '+cell.dataset.service+': '+level);});
    labels.forEach(label=>label.classList.toggle('is-active',!!map[label.dataset.pillarLabel]));ticks.forEach((tick,i)=>tick.classList.toggle('active',i===index));
    articles.forEach((article,i)=>{if(i===index)article.setAttribute('aria-current','step');else article.removeAttribute('aria-current');});sequence.dataset.chapter=String(index);
  }
  function update(){
    frame=0;const r=sequence.getBoundingClientRect(),h=innerHeight,u=Math.max(0,-r.top/h);
    if(reduced.matches){
      sequence.style.removeProperty('--rise');sequence.style.removeProperty('--side');film.style.removeProperty('--handoff');
      const focus=mobile.matches?h*.67:h*.5;let nearest=-1,distance=Infinity;
      articles.forEach((article,i)=>{const q=article.getBoundingClientRect(),d=Math.abs(q.top+q.height/2-focus);if(d<distance){distance=d;nearest=i;}});light(layout.getBoundingClientRect().top<h*.7?nearest:-1);return;
    }
    const rise=clamp(u/.9),side=clamp((u-1.2));sequence.style.setProperty('--rise',String(rise));sequence.style.setProperty('--side',String(side));film.style.setProperty('--handoff',String(rise));
    const v=Math.max(0,u-2.2),step=Math.floor(v/1.1),part=v-step*1.1,pos=Math.min(3,step+clamp((part-.6)/.5));
    track.style.setProperty('--chapter-shift',(-pos*25).toFixed(4)+'%');sequence.dataset.phase=u<.9?'rising':u<1.2?'card':side<1?'handoff':'chapters';
    light(side>.999?Math.round(pos):-1);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',()=>{active=-2;schedule();});document.fonts.ready.then(schedule);
  articles.forEach((article,index)=>article.addEventListener('focusin',()=>{if(!reduced.matches)scrollTo({top:sequence.getBoundingClientRect().top+scrollY+innerHeight*(2.3+index*1.1),behavior:'instant'});}));
  layout.querySelectorAll('.chapter-offer').forEach(link=>link.addEventListener('click',event=>{if(!SCOUT_ENABLED||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const adapter=window.careLessScout;if(adapter&&typeof adapter.open==='function'){event.preventDefault();adapter.open({offerId:link.dataset.offer});}}));
  update();
})();
