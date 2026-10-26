(() => {
  'use strict';
  const sequence=document.querySelector('.interface-sequence'),film=document.querySelector('#film'),layout=document.querySelector('.chapter-layout'),track=document.querySelector('.chapter-track');
  const articles=[...layout.querySelectorAll('.chapter')],segments=[...layout.querySelectorAll('[data-segment]')],notes=[...layout.querySelectorAll('[data-note]')],ticks=[...layout.querySelectorAll('.chapter-progress i')],maps=articles.map(a=>JSON.parse(a.dataset.work));
  const clamp=n=>Math.max(0,Math.min(1,n));let active=-2,frame=0;
  function light(index){
    if(index===active)return;active=index;const map=maps[index]||{};
    segments.forEach(node=>node.classList.toggle('lit',!!map[node.dataset.segment]));
    notes.forEach(node=>{const list=map[node.dataset.note]||[];node.classList.toggle('lit',!!list.length);const body=node.lastElementChild;body.replaceChildren();list.forEach(text=>{const p=document.createElement('p');p.textContent=text;body.append(p);});});
    document.querySelector('.pillar-notes').dataset.count=Object.keys(map).length;
    ticks.forEach((tick,i)=>tick.classList.toggle('active',i===index));articles.forEach((a,i)=>{a.inert=!CL.motion.matches&&i!==index;if(i===index)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});sequence.dataset.chapter=index;
  }
  function update(){
    frame=0;const h=document.querySelector('.interface-stage').offsetHeight,r=sequence.getBoundingClientRect(),u=Math.max(0,-r.top/h);
    if(CL.motion.matches){let index=0,best=Infinity;articles.forEach((a,i)=>{const q=a.getBoundingClientRect(),d=Math.abs(q.top+q.height/2-innerHeight*.6);if(d<best){best=d;index=i;}});light(index);return;}
    const rise=clamp(u/.9),side=clamp(u-1.2);sequence.style.setProperty('--rise',rise);sequence.style.setProperty('--side',side);film.style.setProperty('--handoff',rise);
    const v=Math.max(0,u-2.2),step=Math.floor(v/1.1),part=v-step*1.1,pos=Math.min(3,step+clamp((part-.6)/.5));
    track.style.setProperty('--chapter-shift',(-pos*25).toFixed(4)+'%');sequence.dataset.phase=u<.9?'rising':u<1.2?'card':side<1?'handoff':'chapters';light(side>.999?Math.round(pos):-1);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});CL.motion.addEventListener('change',()=>{active=-2;schedule();measure();});document.fonts.ready.then(schedule);
  let points=[],markers=[],gesture=0,direction=0,touch=null;
  function measure(){
    markers.forEach(n=>n.remove());markers=[];points=[];if(CL.motion.matches)return;
    const range=window.careLessFilm.range(),start=sequence.getBoundingClientRect().top+scrollY,h=document.querySelector('.interface-stage').offsetHeight;
    points=[0,7.9,13.5,18,28,37.8,43.8,45.833].map(t=>range.start+range.distance*t/45.866667);
    points.push(start+h*1.05,...[2.4,3.5,4.6,5.7].map(v=>start+h*v),film.getBoundingClientRect().bottom+scrollY);
    points.forEach((y,i)=>{const marker=document.createElement('span');marker.className='snap-point';marker.style.top=(y-range.start)+'px';marker.setAttribute('aria-hidden','true');marker.dataset.snap=i;film.append(marker);markers.push(marker);});
  }
  function jump(index){if(!points.length)return;scrollTo({top:points[Math.max(0,Math.min(points.length-1,index))],behavior:CL.motion.matches?'instant':'smooth'});}
  function sync(){const enabled=!CL.motion.matches&&document.documentElement.dataset.arrival==='begun'&&scrollY<points.at(-1)-2&&!document.documentElement.hasAttribute('data-scroll-locked')&&!document.documentElement.hasAttribute('data-panel-open');document.documentElement.dataset.snap=enabled?'story':'off';}
  addEventListener('scroll',sync,{passive:true});addEventListener('careless:begun',()=>{measure();sync();});addEventListener('resize',()=>{measure();sync();},{passive:true});
  new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['data-scroll-locked','data-panel-open']});
  addEventListener('wheel',event=>{
    sync();if(document.documentElement.dataset.snap!=='story'||event.target.closest('.offer-panel,.scout-panel')||event.ctrlKey||Math.abs(event.deltaY)<1)return;
    event.preventDefault();const now=performance.now(),sign=Math.sign(event.deltaY),fresh=now-gesture>220||sign!==direction;gesture=now;direction=sign;if(!fresh)return;
    let i=points.findIndex(p=>p>=scrollY-3);if(i<0)i=points.length-1;const near=Math.abs(points[i]-scrollY)<8;
    jump(sign>0?(near?i+1:i):i-1);
  },{passive:false});
  layout.addEventListener('touchstart',e=>{const p=e.touches[0];touch={x:p.clientX,y:p.clientY};},{passive:true});
  layout.addEventListener('touchend',e=>{if(!touch||CL.motion.matches)return;const p=e.changedTouches[0],dx=p.clientX-touch.x,dy=p.clientY-touch.y;touch=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)jump(9+Math.max(0,Math.min(3,active+(dx<0?1:-1))));},{passive:true});
  articles.forEach((a,i)=>a.addEventListener('focusin',()=>{if(!CL.motion.matches&&active!==i)jump(9+i);}));
  window.CL.snap={points:()=>[...points],jump};measure();update();sync();
})();
