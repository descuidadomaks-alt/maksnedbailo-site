(() => {
  'use strict';
  const experience=document.querySelector('.chapter-experience');
  const section=document.querySelector('.chapters');
  const shared=document.querySelector('.shared-plate-stick');
  const articles=[...section.querySelectorAll('.chapter')];
  const blocks=[...shared.querySelectorAll('.plate-block')];
  const ticks=[...shared.querySelectorAll('.chapter-progress i')];
  const original=blocks.map(block=>block.dataset.ai);
  const vertical=matchMedia('(max-width:767px), (prefers-reduced-motion:reduce)');
  const native=CSS.supports('animation-timeline: view()');
  let active=-2,reading=false,frame=0,hasRead=false;
  function light(index){
    if(index===active)return;
    active=index;
    if(index<0&&!hasRead)return;
    if(index>=0)hasRead=true;
    const names=index<0?null:articles[index].dataset.blocks.split(' ');
    blocks.forEach((block,i)=>{
      block.dataset.ai=index<0?original[i]:articles[index].dataset.ai;
      block.classList.toggle('lit',!names||names.includes(block.dataset.block));
    });
    ticks.forEach((tick,i)=>tick.classList.toggle('active',i===index));
    articles.forEach((article,i)=>{if(i===index)article.setAttribute('aria-current','step');else article.removeAttribute('aria-current');});
    if(index>=0&&vertical.matches){
      const window=shared.querySelector('.plate-window');
      if(window.scrollWidth>window.clientWidth){
        const selected=blocks.filter(b=>names.includes(b.dataset.block)).map(b=>b.getBoundingClientRect());
        const origin=window.getBoundingClientRect().left-window.scrollLeft;
        const left=Math.min(...selected.map(r=>r.left))-origin,right=Math.max(...selected.map(r=>r.right))-origin;
        const target=right-left<window.clientWidth?(left+right-window.clientWidth)/2:left-24;
        window.scrollTo({left:Math.max(0,target),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
      }
    }
  }
  // CSS owns horizontal motion when supported. This coalesced fallback also
  // supplies the nearest chapter for the plate; it performs no continuous RAF.
  function update(){
    frame=0;
    const rect=section.getBoundingClientRect();
    const stacked=vertical.matches;
    section.dataset.pan=stacked?'vertical':native?'css':'js';
    let index=0;
    if(stacked){
      const focus=(shared.getBoundingClientRect().bottom+innerHeight)/2;
      reading=rect.top<focus;
      let nearest=Infinity;
      articles.forEach((article,i)=>{const r=article.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-focus);if(d<nearest){nearest=d;index=i;}});
    }else{
      const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,section.offsetHeight-innerHeight)));
      if(!native)section.style.setProperty('--chapter-progress',progress.toFixed(6));
      reading=rect.top<=1;
      index=Math.round(progress*(articles.length-1));
    }
    experience.classList.toggle('is-reading',reading);
    light(reading?index:-1);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{active=-2;schedule();},{passive:true});
  vertical.addEventListener('change',()=>{active=-2;schedule();});
  document.fonts.ready.then(schedule);
  section.querySelectorAll('.chapter-offer').forEach(link=>link.addEventListener('click',event=>{
    if(!SCOUT_ENABLED||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const adapter=window.careLessScout;
    if(adapter&&typeof adapter.open==='function'){
      event.preventDefault();
      adapter.open({offerId:link.dataset.offer});
    }
  }));
  articles.forEach((article,index)=>article.addEventListener('focusin',()=>{
    if(!vertical.matches){const top=section.getBoundingClientRect().top+scrollY;scrollTo({top:top+(section.offsetHeight-innerHeight)*index/(articles.length-1),behavior:'instant'});}
  }));
  update();
})();
