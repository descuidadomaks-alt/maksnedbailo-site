const SCOUT_ENABLED = false;
(() => {
  'use strict';
  const $=s=>document.querySelector(s),motion=matchMedia('(prefers-reduced-motion:reduce)');
  const offers={'5s_test':'The 5-second test',leak_check:'The leak check',walkthrough:'The new-customer walkthrough',dependency_map:'The dependency map'};
  const whatsapp=text=>'https://wa.me/34641935207?text='+encodeURIComponent(text);
  let analytics=false;
  function track(name,detail={}){
    const event={event:name,...detail};(window.dataLayer=window.dataLayer||[]).push(event);
    dispatchEvent(new CustomEvent('careless:track',{detail:event}));
    if(navigator.doNotTrack==='1')return;
    window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments);};
    window.clarity('event',name);
  }
  function startAnalytics(){
    if(analytics||navigator.doNotTrack==='1')return;analytics=true;
    const load=()=>{const script=document.createElement('script');script.async=true;script.src='https://www.clarity.ms/tag/wley84eoj3';document.head.append(script);};
    if('requestIdleCallback'in window)requestIdleCallback(load,{timeout:3000});else setTimeout(load,1200);
  }
  function typeLoop(node,phrases,delay=0,input=false){
    let timer=0,i=0,n=0,erasing=false,active=!input;
    const write=text=>{if(input){if(!node.value)node.placeholder=text;}else node.textContent=text;};
    function tick(){
      if(motion.matches){write(phrases[0]);return;}
      if(document.hidden||!active||input&&(node===document.activeElement||node.value)){timer=setTimeout(tick,700);return;}
      const text=phrases[i];n+=erasing?-1:1;write(text.slice(0,Math.max(0,n)));
      let wait=erasing?28:46;
      if(!erasing&&n===text.length){erasing=true;wait=2000;}
      else if(erasing&&n===0){erasing=false;i=(i+1)%phrases.length;wait=350;}
      timer=setTimeout(tick,wait);
    }
    if(input)new IntersectionObserver(([entry])=>{active=entry.isIntersecting;}).observe(node);
    motion.addEventListener('change',()=>{clearTimeout(timer);n=0;erasing=false;timer=setTimeout(tick,0);});
    write(phrases[0]);if(!motion.matches){write('');timer=setTimeout(tick,delay);}
  }
  const panel=$('#offer-panel'),form=panel.querySelector('form'),status=panel.querySelector('.offer-status'),contact=$('#offer-contact');
  let opener=null,offer='',openedAt=0,key='',busy=false;
  function closeOffer(){if(panel.hidden)return;panel.hidden=true;document.documentElement.removeAttribute('data-panel-open');opener?.focus({preventScroll:true});}
  function openOffer(id){
    if(!offers[id])return;opener=document.activeElement;offer=id;key=crypto.randomUUID();openedAt=Date.now();
    $('#offer-title').textContent=offers[id];form.reset();form.hidden=false;status.textContent='';form.removeAttribute('aria-busy');
    panel.querySelector('.offer-whatsapp').href=whatsapp('Hi Maks, I would like '+offers[id]+'.');
    panel.hidden=false;document.documentElement.setAttribute('data-panel-open','');contact.focus({preventScroll:true});track('offer_open',{offer_id:id});
  }
  panel.querySelector('.panel-close').addEventListener('click',closeOffer);
  panel.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();closeOffer();}
    if(event.key==='Tab'){
      const nodes=[...panel.querySelectorAll('button,input,textarea,a')].filter(n=>n.offsetParent!==null&&!n.disabled&&n.tabIndex!==-1),first=nodes[0],last=nodes.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(busy)return;
    const value=contact.value.trim(),email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    let url=false;try{const u=new URL(/^https?:\/\//i.test(value)?value:'https://'+value);url=/^https?:$/.test(u.protocol)&&u.hostname.includes('.')&&!value.includes('@')&&!/\s/.test(value);}catch{}
    contact.setCustomValidity(email||url?'':'Enter a website URL or email.');if(!contact.reportValidity())return;
    busy=true;form.setAttribute('aria-busy','true');form.querySelector('button').disabled=true;status.textContent='';
    try{
      const response=await fetch('/api/new4-offer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({offerId:offer,contact:value,note:$('#offer-note').value.trim(),company_fax:form.elements.company_fax.value,startedAt:openedAt,key}),signal:AbortSignal.timeout(15000)});
      const result=await response.json();if(!response.ok||result.accepted!==true)throw Error('not accepted');
      form.hidden=true;status.textContent="Got it. We'll reply within an hour.";track('offer_submit',{offer_id:offer});
    }catch{status.textContent="Couldn't send. Try again or use WhatsApp.";}
    finally{busy=false;form.removeAttribute('aria-busy');form.querySelector('button').disabled=false;}
  });
  contact.addEventListener('input',()=>contact.setCustomValidity(''));
  document.querySelectorAll('[data-offer]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();openOffer(link.dataset.offer);}));
  document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link)return;if(link.href.startsWith('https://wa.me/'))track('whatsapp_click');else if(link.href.startsWith('https://zcal.co/carelessmaks/ai-map'))track('book_click');});
  $('.final-form').addEventListener('submit',event=>{
    event.preventDefault();const text=$('#care-less-input').value.trim();if(!text)return;
    if(SCOUT_ENABLED&&window.careLessScout)window.careLessScout.open({text});
    else {track('whatsapp_click');window.open(whatsapp("Hi Maks, I'd like to care less about: "+text),'_blank','noopener,noreferrer');}
  });
  typeLoop($('#care-less-input'),['explaining the same thing again…','chasing customers who went quiet…',"wondering why they didn't come back…",'being the one it all depends on…'],1000,true);
  window.CL={track,startAnalytics,whatsapp,openOffer,closeOffer,typeLoop,motion,offers};
  // Supply real content here; empty collections render no placeholders.
  const CLIENT_LOGOS=[[],[],[],[]],TESTIMONIALS=[];
  document.querySelectorAll('.chapter-clients').forEach((row,i)=>{
    CLIENT_LOGOS[i].slice(0,4).forEach(item=>{const img=new Image();img.src=item.src;img.alt=item.name;img.loading='lazy';img.height=20;row.lastElementChild.append(img);});row.hidden=!CLIENT_LOGOS[i].length;
  });
  const quotes=$('#testimonials');
  if(TESTIMONIALS.length){
    const stage=quotes.querySelector('.quote-stage'),dots=quotes.querySelector('.quote-dots');quotes.hidden=false;
    function show(i){
      const q=TESTIMONIALS[i];stage.replaceChildren();const quote=document.createElement('blockquote');quote.textContent=q.quote;const by=document.createElement('p');by.textContent=q.name+' · '+q.role+' · '+q.company;stage.append(quote,by);
      if(q.video){const play=document.createElement('button');play.className='quote-play';play.type='button';play.setAttribute('aria-label','Play testimonial from '+q.name);play.textContent='▷';play.onclick=()=>{
        const dialog=document.createElement('dialog'),video=document.createElement('video'),close=document.createElement('button');dialog.className='quote-lightbox';video.controls=true;video.preload='none';video.src=q.video;video.playsInline=true;close.textContent='×';close.setAttribute('aria-label','Close video');close.onclick=()=>dialog.close();dialog.append(close,video);document.body.append(dialog);dialog.onclose=()=>{video.pause();video.removeAttribute('src');dialog.remove();play.focus();};dialog.showModal();
      };stage.append(play);}
      [...dots.children].forEach((dot,j)=>dot.setAttribute('aria-pressed',String(j===i)));
    }
    TESTIMONIALS.forEach((q,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label','Testimonial from '+q.name);dot.onclick=()=>show(i);dots.append(dot);});show(0);
  }
})();
