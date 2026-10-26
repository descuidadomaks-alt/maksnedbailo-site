(() => {
  'use strict';
  const root=document.documentElement,content=document.querySelector('#page-content');
  const gate=document.querySelector('.loading-gate'),begin=gate.querySelector('button'),line=gate.querySelector('[role=progressbar]');
  const film=window.careLessFilm,section=document.querySelector('#film'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const encounter=document.querySelector('.scout-encounter'),talk=document.querySelector('.encounter-talk'),decline=document.querySelector('.encounter-decline'),keep=document.querySelector('.encounter-continue');
  const comic=document.querySelector('.scout-comic'),patience=document.querySelector('.scout-patience');
  let lockY=null,gateDone=false,begun=false,moment=false,handled=false,declined=false,loader=0,deadline=0,typing=0,idle=0,exit=0,fallback=null,comicShown=false;
  try{declined=sessionStorage.getItem('scout_declined')==='true';handled=declined;}catch{}
  function lock(){lockY=scrollY;root.setAttribute('data-scroll-locked','');}
  function unlock(){root.removeAttribute('data-scroll-locked');lockY=null;}
  function blockScroll(event){if(lockY!==null&&!event.target.closest('.scout-panel'))event.preventDefault();}
  addEventListener('wheel',blockScroll,{passive:false});addEventListener('touchmove',blockScroll,{passive:false});
  addEventListener('scroll',()=>{if(lockY!==null&&Math.abs(scrollY-lockY)>1)scrollTo(0,lockY);},{passive:true});
  document.addEventListener('keydown',event=>{
    if(lockY===null||event.target.matches('input,textarea,select,[contenteditable=true]'))return;
    if(moment&&event.key==='Escape'){event.preventDefault();leave(true);return;}
    if(moment&&event.key==='Tab'){
      const choices=[talk,decline,...keep.hidden?[]:[keep]],first=choices[0],last=choices.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
    if(/^(ArrowDown|ArrowUp|PageDown|PageUp|Home|End)$/.test(event.key)||(event.key===' '&&!event.target.closest('button,a')))event.preventDefault();
  });
  root.dataset.arrival='loading';content.inert=true;lock();
  function ready(fallbackSource=false){
    if(gateDone)return;gateDone=true;clearInterval(loader);clearTimeout(deadline);
    if(fallbackSource)film?.lighter();
    gate.dataset.ready=fallbackSource?'timeout':'buffered';gate.setAttribute('aria-busy','false');line.style.setProperty('--load','1');line.setAttribute('aria-valuenow','100');begin.hidden=false;
  }
  deadline=setTimeout(()=>ready(true),Math.max(0,8000-performance.now()));
  function checkBuffer(){const buffer=film?.buffer()||{ready:true,progress:1};line.style.setProperty('--load',String(Math.max(.025,buffer.progress)));line.setAttribute('aria-valuenow',String(Math.round(buffer.progress*100)));if(buffer.ready)ready();}
  loader=setInterval(checkBuffer,160);checkBuffer();
  begin.addEventListener('click',()=>{
    if(begun)return;
    // iOS requires this call to happen synchronously in the trusted tap handler.
    try{if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function')DeviceOrientationEvent.requestPermission().then(result=>{window.careLessMotionAllowed=result==='granted';}).catch(()=>{});}catch{}
    begun=true;content.inert=false;unlock();root.dataset.arrival='begun';gate.classList.add('is-closing');gate.inert=true;
    film?.begin();const h1=document.querySelector('.opening h1');h1.tabIndex=-1;h1.focus({preventScroll:true});
    setTimeout(()=>{gate.hidden=true;},700);
    setTimeout(()=>document.querySelector('.opening p').classList.add('is-revealed'),reduced.matches?0:2000);
  });
  function protectRest(value){[...content.children].filter(node=>node!==section).forEach(node=>{node.inert=value;});}
  function type(){
    clearTimeout(typing);const whisper=document.querySelector('.typed-whisper'),introduction=document.querySelector('.typed-introduction');
    const first="Psst. It's quiet down here.",second="I'm Scout. I ask a few questions and tell you what I'd fix first. Or we skip it.";
    if(reduced.matches){whisper.textContent=first;introduction.textContent=second;return;}
    let i=0;function next(){if(!moment)return;if(i<first.length){whisper.textContent=first.slice(0,++i);typing=setTimeout(next,i===first.length?360:27);}else{const n=i-first.length;introduction.textContent=second.slice(0,n+1);i++;if(n+1<second.length)typing=setTimeout(next,24);}}next();
  }
  function enter(){
    if(handled||moment||reduced.matches)return;handled=true;moment=true;
    film.hold(37.8);lock();root.setAttribute('data-scout-moment','');protectRest(true);
    warmScout();
    encounter.setAttribute('role','dialog');encounter.setAttribute('aria-modal','true');encounter.setAttribute('aria-hidden','false');encounter.inert=false;encounter.classList.add('is-open');
    if(SCOUT_ENABLED)talk.textContent='Talk to Scout';
    talk.focus({preventScroll:true});type();
    const started=performance.now();idle=setInterval(()=>{const elapsed=performance.now()-started;if(elapsed>=6000)patience.hidden=false;if(elapsed>=12000){keep.hidden=false;clearInterval(idle);}},200);
  }
  function leave(noThanks){
    if(!moment)return;moment=false;clearInterval(idle);clearTimeout(typing);root.removeAttribute('data-scout-moment');protectRest(false);
    if(noThanks){declined=true;try{sessionStorage.setItem('scout_declined','true');}catch{};dispatchEvent(new Event('careless:scout-declined'));}
    section.tabIndex=-1;section.focus({preventScroll:true});
    encounter.inert=true;encounter.setAttribute('aria-hidden','true');encounter.classList.remove('is-open');encounter.classList.add('is-leaving');
    unlock();film.release();
    clearTimeout(exit);exit=setTimeout(()=>encounter.classList.remove('is-leaving'),1100);updateFallback();
  }
  decline.addEventListener('click',()=>leave(true));keep.addEventListener('click',()=>leave(true));
  talk.addEventListener('click',event=>{leave(false);if(SCOUT_ENABLED&&window.careLessScout){event.preventDefault();window.careLessScout.open();}});
  function updateFallback(){
    if(SCOUT_ENABLED||!declined)return;
    if(!fallback){fallback=document.createElement('a');fallback.className='scout-launcher scout-booking';fallback.href='https://zcal.co/carelessmaks/ai-map';fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.setAttribute('aria-label','Changed your mind?');fallback.innerHTML='<span class="scout-face"><img src="/careless/images/05-scout.webp" width="56" height="56" alt="" loading="lazy"></span><span class="scout-tooltip" aria-hidden="true">Changed your mind?</span>';document.body.append(fallback);}
    fallback.dataset.visible=String(begun&&scrollY>section.offsetTop+1&&scrollY>=section.offsetTop+(section.offsetHeight-innerHeight)*.79&&!moment);
  }
  function updateComic(time){
    const show=declined&&time>=42.5&&!moment;
    if(show===comicShown)return;comicShown=show;comic.hidden=!show;section.classList.toggle('has-comic',show);
    if(show)comic.querySelectorAll('[data-src]').forEach(image=>{if(!image.getAttribute('src'))image.src=image.dataset.src;});
  }
  let warmed=false;
  function warmScout(){if(warmed)return;warmed=true;encounter.querySelector('.encounter-background').src=encounter.querySelector('.encounter-background').dataset.src;encounter.querySelectorAll('[data-scout-art]').forEach(image=>image.setAttribute('href','/careless/images/05-scout.webp'));encounter.querySelector('[data-scout-back]').setAttribute('href','/careless/images/06-hq.webp');}
  addEventListener('careless:film',event=>{const time=event.detail.time;if(time>33)warmScout();if(begun&&!handled&&time>=37.6)enter();updateComic(time);});
  let scrollFrame=0;addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateFallback();});},{passive:true});
  reduced.addEventListener('change',()=>{if(reduced.matches){ready();if(moment)leave(false);updateComic(0);}updateFallback();});
  updateFallback();
})();
