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
    const leaving=-human.getBoundingClientRect().top-Math.max(0,human.offsetHeight-innerHeight);
    const phase=Math.max(0,Math.min(1,leaving/Math.min(human.offsetHeight,innerHeight)));
    sequence.style.setProperty('--human-veil',String(reduced.matches?0:1-phase));
    sequence.style.setProperty('--human-copy',String(reduced.matches?1:1-Math.max(0,Math.min(1,(phase-.5)/.5))));
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',schedule);paint();
  // Empty attributes intentionally produce only the dark poster frame.
  const slot=document.querySelector('.human-video-slot'),phone=matchMedia('(max-width:700px)');
  const wide=slot.dataset.videoWide,vertical=slot.dataset.videoVertical,pw=slot.dataset.posterWide,pv=slot.dataset.posterVertical;
  let video=null;
  if(pw||pv){const picture=document.createElement('picture');if(pv){const source=document.createElement('source');source.media='(max-width:700px)';source.srcset=pv;picture.append(source);}const poster=document.createElement('img');poster.src=pw||pv;poster.alt='';poster.loading='lazy';poster.decoding='async';picture.append(poster);slot.append(picture);}
  if(wide&&vertical&&(pw||pv)){
    let near=false;
    const choose=()=>{const source=phone.matches?vertical:wide;video.poster=phone.matches?(pv||pw):(pw||pv);if(video.getAttribute('src')!==source){video.src=source;video.load();}if(!document.hidden&&!reduced.matches&&near)video.play().catch(()=>{});};
    const activate=()=>{if(!near||reduced.matches)return;if(!video){video=document.createElement('video');video.autoplay=true;video.muted=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.setAttribute('muted','');video.setAttribute('playsinline','');for(const[src,media]of[[wide,'(min-width:701px)'],[vertical,'(max-width:700px)']]){const source=document.createElement('source');source.src=src;source.media=media;source.type='video/mp4';video.append(source);}slot.append(video);phone.addEventListener('change',()=>{if(!reduced.matches)choose();});}video.hidden=false;choose();};
    new IntersectionObserver(([entry])=>{near=entry.isIntersecting;if(near)activate();else video?.pause();},{rootMargin:'200px'}).observe(slot);
    reduced.addEventListener('change',()=>{if(video){video.hidden=reduced.matches;if(reduced.matches)video.pause();}if(!reduced.matches)activate();});
    document.addEventListener('visibilitychange',()=>document.hidden?video?.pause():activate());
  }
})();
