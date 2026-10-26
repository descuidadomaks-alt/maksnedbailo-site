(() => {
  'use strict';
  // No rendered UI, storage access or provider request while disabled.
  if(!SCOUT_ENABLED)return;
  // Existing public widget identifiers, not an administrative API credential.
  // Transport mirrors the provider's native widget: send, then poll its reply queue.
  const account='625cd09c-4f5a-439a-ad55-379f6e056950';
  const widget='careless-scout-staging';
  const api='https://api.mychatbot.app';
  const booking='https://zcal.co/carelessmaks/ai-map';
  const launcher=document.createElement('button');
  launcher.className='scout-launcher';launcher.type='button';
  launcher.setAttribute('aria-label','Ask Scout');launcher.setAttribute('aria-expanded','false');launcher.setAttribute('aria-controls','scout-panel');
  launcher.innerHTML='<span class="scout-face"><img data-src="/careless/images/05-scout.webp" width="56" height="56" alt="" loading="lazy"></span><span class="scout-tooltip" aria-hidden="true">Ask Scout</span>';
  const panel=document.createElement('section');panel.className='scout-panel';panel.id='scout-panel';
  panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','scout-title');panel.setAttribute('aria-hidden','true');panel.inert=true;
  panel.innerHTML='<h2 id="scout-title">Meet Scout. Tell him once.</h2><button class="scout-close" type="button" aria-label="Close Scout">×</button><div class="scout-log" role="log" aria-label="Ask Scout" aria-live="polite" aria-relevant="additions" tabindex="0"></div><form class="scout-form"><input class="scout-input" type="text" aria-label="Ask Scout" placeholder="Ask Scout" autocomplete="off" maxlength="3000" required><div class="scout-error" role="status" hidden><a href="'+booking+'">Book the call</a></div></form>';
  document.body.append(launcher,panel);
  const input=panel.querySelector('input'),form=panel.querySelector('form'),log=panel.querySelector('.scout-log'),error=panel.querySelector('.scout-error');
  let open=false,opener=null,session='',context={},timer=0,deadline=0,awaiting=false,sending=false;
  function fail(){awaiting=false;sending=false;form.setAttribute('aria-busy','false');input.disabled=false;error.hidden=false;}
  function append(text,role){
    if(typeof text!=='string'||!text.trim())return false;
    const inert=document.createElement('template');inert.innerHTML=text;
    inert.content.querySelectorAll('script,style').forEach(e=>e.remove());
    const p=document.createElement('p');p.className='scout-message';p.dataset.role=role;p.textContent=inert.content.textContent.trim();
    if(!p.textContent)return false;log.append(p);log.scrollTop=log.scrollHeight;return true;
  }
  function getSession(){
    if(session)return session;
    try{const saved=sessionStorage.getItem('careless-scout-session');if(/^[a-f0-9]{30}$/.test(saved||''))session=saved;}catch{}
    if(!session){session=[...crypto.getRandomValues(new Uint8Array(15))].map(n=>n.toString(16).padStart(2,'0')).join('');try{sessionStorage.setItem('careless-scout-session',session);}catch{}}
    return session;
  }
  async function request(path,body){
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
    try{
      const response=await fetch(api+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:account+widget},credentials:'omit',cache:'no-store',signal:controller.signal,...body?{body:JSON.stringify(body)}:{}});
      if(!response.ok)throw Error('transport');const data=await response.json();if(data.status&&Number(data.status)>=400)throw Error('provider');return data;
    }finally{clearTimeout(timeout);}
  }
  function schedule(){clearTimeout(timer);if(open&&!document.hidden&&session)timer=setTimeout(poll,awaiting?1500:5000);}
  async function poll(){
    if(!open||document.hidden||!session)return;
    try{
      const reply=await request('/sw-replies/'+account+'/'+widget+'/'+session);
      if(append(reply.message,'assistant')){awaiting=false;form.setAttribute('aria-busy','false');input.disabled=false;error.hidden=true;}
      if(awaiting&&Date.now()>deadline)fail();
    }catch{if(awaiting&&Date.now()>deadline)fail();}
    schedule();
  }
  function close(){open=false;panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');panel.inert=true;launcher.setAttribute('aria-expanded','false');clearTimeout(timer);opener?.focus({preventScroll:true});}
  function show(next={}){
    context=next;opener=document.activeElement;open=true;panel.inert=false;panel.setAttribute('aria-hidden','false');panel.classList.add('is-open');launcher.setAttribute('aria-expanded','true');error.hidden=true;
    if(next.topic)input.value=next.topic;
    else if(next.offerId){const offer=document.querySelector('.chapter-offer[data-offer="'+CSS.escape(next.offerId)+'"]');input.value=offer?offer.textContent.replace('↗','').trim():'';}
    // Resolve the visibility change before focusing, including when opened from the encounter.
    panel.getBoundingClientRect();input.focus({preventScroll:true});
    requestAnimationFrame(()=>{if(open&&document.activeElement!==input)input.focus({preventScroll:true});});schedule();
  }
  window.careLessScout={open:show,close};
  launcher.addEventListener('click',()=>open?close():show());panel.querySelector('.scout-close').addEventListener('click',close);
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();}});
  form.addEventListener('submit',async event=>{
    event.preventDefault();const text=input.value.trim();if(!text||sending||awaiting)return;
    sending=true;awaiting=true;deadline=Date.now()+45000;form.setAttribute('aria-busy','true');error.hidden=true;input.disabled=true;
    const current=getSession();
    try{
      await request('/webhook/sw-widget/'+account+'/'+widget+'/'+current,{action:'my_chat_send',widget_id:widget,session:current,payload:{message:text,wp_context:location.origin+location.pathname,...context.offerId?{offer_id:context.offerId}:{},...context.topic?{topic:context.topic}:{}}});
      append(text,'user');input.value='';sending=false;schedule();
    }catch{fail();}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else schedule();});
  const film=document.querySelector('#film'),stage=film.querySelector('.film-stage');let visibleFrame=0;
  function declined(){let noThanks=false;try{noThanks=sessionStorage.getItem('scout_declined')==='true';}catch{};if(noThanks){launcher.setAttribute('aria-label','Changed your mind?');launcher.querySelector('.scout-tooltip').textContent='Changed your mind?';}}
  addEventListener('careless:scout-declined',declined);declined();
  function reveal(){visibleFrame=0;const rect=film.getBoundingClientRect(),origin=rect.top+scrollY,distance=film.offsetHeight-stage.offsetHeight;const threshold=origin+(distance>0?distance*36.1/45.866667:stage.offsetHeight),visible=scrollY>=threshold&&scrollY>origin+1;launcher.dataset.visible=String(visible);const image=launcher.querySelector('img');if(visible&&!image.getAttribute('src'))image.src=image.dataset.src;}
  const check=()=>{if(!visibleFrame)visibleFrame=requestAnimationFrame(reveal);};addEventListener('scroll',check,{passive:true});addEventListener('resize',check,{passive:true});reveal();
})();
