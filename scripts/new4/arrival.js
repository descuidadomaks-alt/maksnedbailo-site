(() => {
  'use strict';
  const root=document.documentElement,main=document.querySelector('main'),gate=document.querySelector('.loading-gate'),begin=gate.querySelector('button'),line=gate.querySelector('[role=progressbar]'),film=window.careLessFilm;
  const encounter=document.querySelector('.scout-encounter'),talk=document.querySelector('.encounter-talk'),decline=document.querySelector('.encounter-decline');
  let begun=false,ready=false,moment=false,lockY=scrollY,typing=0,idle=0,declined=false,choice=false,warmed=false,ghost=null;
  try{declined=sessionStorage.getItem('scout_declined')==='true';choice=declined;}catch{}
  const launcher=document.createElement(SCOUT_ENABLED?'button':'a');launcher.id='scout-launcher';launcher.className='scout-launcher';launcher.hidden=true;
  if(SCOUT_ENABLED){launcher.type='button';launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','scout-panel');launcher.addEventListener('click',()=>window.careLessScout?.open());}
  else {launcher.href=CL.whatsapp('Hi Maks, I would like to talk about Care Less.');launcher.target='_blank';launcher.rel='noopener noreferrer';}
  launcher.innerHTML='<span class="scout-face"><img data-src="/careless/images/05-scout.webp" width="56" height="56" alt="" loading="lazy"></span><span class="scout-tooltip" aria-hidden="true">Ask Scout</span>';document.body.append(launcher);
  function lock(){lockY=scrollY;root.setAttribute('data-scroll-locked','');}
  function unlock(){lockY=null;root.removeAttribute('data-scroll-locked');}
  function block(event){if(lockY!==null&&!event.target.closest('.scout-panel,.offer-panel'))event.preventDefault();}
  addEventListener('wheel',block,{passive:false});addEventListener('touchmove',block,{passive:false});
  addEventListener('scroll',()=>{if(lockY!==null&&Math.abs(scrollY-lockY)>1)scrollTo(0,lockY);},{passive:true});
  document.addEventListener('keydown',event=>{
    if(lockY===null||event.target.matches('input,textarea,select'))return;
    if(moment&&event.key==='Escape'){event.preventDefault();leave(true);return;}
    if(moment&&event.key==='Tab'){
      if(event.shiftKey&&document.activeElement===talk){event.preventDefault();decline.focus();}
      else if(!event.shiftKey&&document.activeElement===decline){event.preventDefault();talk.focus();}
    }
    if(/^(ArrowDown|ArrowUp|PageDown|PageUp|Home|End)$/.test(event.key)||(event.key===' '&&!event.target.closest('button,a')))event.preventDefault();
  });
  root.dataset.arrival='loading';main.inert=true;lock();
  const deadline=setTimeout(()=>finishLoading(true),8000),loader=setInterval(check,160);
  function finishLoading(timeout=false){
    if(ready)return;ready=true;clearTimeout(deadline);clearInterval(loader);if(timeout)film.lighter();
    gate.dataset.ready=timeout?'timeout':'buffered';gate.setAttribute('aria-busy','false');gate.querySelector('.gate-content>p').textContent='Ready to care less?';
    line.style.setProperty('--load','1');line.setAttribute('aria-valuenow','100');begin.hidden=false;
  }
  function check(){const buffer=film.buffer();line.style.setProperty('--load',String(Math.max(.025,buffer.progress)));line.setAttribute('aria-valuenow',String(Math.round(buffer.progress*100)));if(buffer.ready)finishLoading();}check();
  begin.addEventListener('click',()=>{
    if(begun)return;begun=true;main.inert=false;unlock();root.dataset.arrival='begun';gate.classList.add('is-closing');gate.inert=true;film.begin();CL.track('begin');CL.startAnalytics();
    const h1=document.querySelector('h1');h1.tabIndex=-1;h1.focus({preventScroll:true});setTimeout(()=>gate.hidden=true,700);
    const p=document.querySelector('.hero-type');p.classList.add('is-revealed');CL.typeLoop(p.querySelector('span'),['One team to make them happen.','For founders with more plan than hours.','Say it once. We carry the rest.','Less explaining. More happening.'],CL.motion.matches?0:1000);
    dispatchEvent(new Event('careless:begun'));update();
  });
  function warm(){if(warmed)return;warmed=true;encounter.querySelector('.encounter-background').src=encounter.querySelector('.encounter-background').dataset.src;encounter.querySelectorAll('[data-scout-art]').forEach(img=>img.setAttribute('href','/careless/images/05-scout.webp'));}
  function type(){
    clearTimeout(typing);const first="Psst. Quiet down here, isn't it?",second="Want me to ask a few questions and tell you what I'd fix first?",a=encounter.querySelector('.typed-whisper'),b=encounter.querySelector('.typed-introduction');a.textContent='';b.textContent='';let n=0;
    function next(){if(!moment)return;n++;a.textContent=first.slice(0,n);if(n>first.length)b.textContent=second.slice(0,n-first.length);if(n<first.length+second.length)typing=setTimeout(next,n===first.length?300:24);}next();
    encounter.querySelector('.scout-introduction .sr-only').textContent=second;
    idle=setTimeout(()=>{clearTimeout(typing);a.textContent=first;b.textContent='No rush. Ants are patient.';encounter.querySelector('.scout-introduction .sr-only').textContent=b.textContent;},8000);
  }
  function enter(){
    if(moment||choice||CL.motion.matches)return;warm();moment=true;film.hold(37.8);lock();root.setAttribute('data-scout-moment','');
    encounter.hidden=false;encounter.inert=false;encounter.setAttribute('aria-hidden','false');encounter.setAttribute('role','dialog');encounter.setAttribute('aria-modal','true');encounter.classList.add('is-open');
    talk.textContent=SCOUT_ENABLED?'Yes, ask away':'Say hi on WhatsApp';talk.href=SCOUT_ENABLED?'#scout-panel':CL.whatsapp("Hi Maks, want to ask me a few questions and tell me what you'd fix first?");
    talk.focus({preventScroll:true});type();
  }
  function fly(){
    ghost?.remove();const source=encounter.querySelector('.scout-actor').getBoundingClientRect(),r=launcher.getBoundingClientRect();
    const size=Math.min(source.width*.3,source.height*.32),x=source.left+source.width*.51-size/2,y=source.top+source.height*.37-size/2;
    ghost=document.createElement('div');ghost.className='scout-flight';ghost.innerHTML='<span class="scout-face"><img src="/careless/images/05-scout.webp" alt=""></span>';Object.assign(ghost.style,{left:x+'px',top:y+'px',width:size+'px',height:size+'px'});document.body.append(ghost);
    const animation=ghost.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${r.left-x}px,${r.top-y}px) scale(${56/size})`,opacity:.85}],{duration:850,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'});
    animation.finished.then(()=>{ghost?.remove();ghost=null;}).catch(()=>{});
  }
  function leave(noThanks){
    if(!moment)return;choice=true;if(noThanks){declined=true;try{sessionStorage.setItem('scout_declined','true');}catch{}}
    moment=false;clearTimeout(typing);clearTimeout(idle);root.removeAttribute('data-scout-moment');unlock();film.release();updateLauncher();if(noThanks&&!CL.motion.matches)fly();
    encounter.hidden=true;encounter.inert=true;encounter.setAttribute('aria-hidden','true');encounter.classList.remove('is-open');
    const section=document.querySelector('#film');section.tabIndex=-1;section.focus({preventScroll:true});
  }
  decline.addEventListener('click',()=>leave(true));talk.addEventListener('click',event=>{leave(false);if(SCOUT_ENABLED){event.preventDefault();window.careLessScout?.open();}});
  function updateLauncher(){
    const range=film.range(),threshold=range.start+(range.distance?range.distance*36.1/45.866667:document.querySelector('.film-stage').offsetHeight);
    const visible=begun&&scrollY>=threshold&&!moment&&scrollY<=document.documentElement.scrollHeight-innerHeight+2;
    launcher.hidden=!visible;launcher.dataset.visible=String(visible);launcher.setAttribute('aria-label',declined?'Changed your mind?':'Ask Scout');launcher.querySelector('.scout-tooltip').textContent=declined?'Changed your mind?':'Ask Scout';
    if(visible){const img=launcher.querySelector('img');if(!img.getAttribute('src'))img.src=img.dataset.src;}else window.careLessScout?.close();
  }
  let raf=0;
  function update(){
    raf=0;const range=film.range(),t=range.distance?(scrollY-range.start)/range.distance*45.866667:0;
    if(t>33&&t<42)warm();
    if(begun&&!choice&&t>=37.55&&t<=40.4)enter();
    if(!moment){encounter.hidden=true;encounter.style.display='none';}else encounter.style.removeProperty('display');
    if(t<35||t>41){ghost?.remove();ghost=null;}
    updateLauncher();
  }
  addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(update);},{passive:true});addEventListener('resize',update,{passive:true});
  CL.motion.addEventListener('change',()=>{if(CL.motion.matches){finishLoading();if(moment)leave(false);}update();});
  encounter.hidden=true;update();
})();
