(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(hover: none), (pointer: coarse)');
  const scenes = [...document.querySelectorAll('.plate-scene')];

  // Reusable contract: .lit controls appearance; data-ai controls only the split.
  document.querySelectorAll('[data-plate]').forEach(plate => {
    const sync = block => {
      const raw = Number(block.getAttribute('data-ai'));
      block.style.setProperty('--ai', String(Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : .5));
    };
    plate.querySelectorAll('.plate-block').forEach(sync);
    new MutationObserver(records => records.forEach(record => sync(record.target)))
      .observe(plate, {subtree:true, attributes:true, attributeFilter:['data-ai']});
  });

  scenes.forEach(scene => {
    const card = scene.querySelector('.plate-tilt');
    let targetX = 0, targetY = 0, x = 0, y = 0;
    let visible = false, frame = 0, last = 0, entered = false;
    const clamp = value => Math.max(-6, Math.min(6, value));
    function render(now) {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) return;
      const elapsed = last ? Math.min(now-last,64) : 16.667;
      last = now;
      if (touch.matches) {
        targetX = Math.sin(now/2600)*.65;
        targetY = Math.sin(now/3200)*1.1;
      }
      const ease = 1-Math.exp(-elapsed/95);
      x += (targetX-x)*ease; y += (targetY-y)*ease;
      card.style.setProperty('--rx',x.toFixed(3)+'deg');
      card.style.setProperty('--ry',y.toFixed(3)+'deg');
      if (touch.matches || Math.abs(targetX-x)>.005 || Math.abs(targetY-y)>.005) wake();
    }
    function wake() {
      if (!frame && visible && !reduced.matches && !document.hidden) frame = requestAnimationFrame(render);
    }
    scene.addEventListener('pointermove',event => {
      if (touch.matches || event.pointerType==='touch') return;
      const r=scene.getBoundingClientRect();
      targetX=clamp(-(event.clientY-r.top-r.height/2)/(r.height/2)*6);
      targetY=clamp((event.clientX-r.left-r.width/2)/(r.width/2)*6);
      wake();
    },{passive:true});
    scene.addEventListener('pointerleave',()=>{targetX=0;targetY=0;wake();},{passive:true});
    const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;};
    const visibility=new IntersectionObserver(([entry])=>{
      visible=entry.isIntersecting;
      if(visible){
        if(!entered&&scene.hasAttribute('data-intro-plate')){
          entered=true;
          if(!scene.closest('.chapter-experience')?.classList.contains('is-reading'))
            scene.querySelectorAll('.plate-block').forEach(block=>block.classList.add('lit'));
        }
        wake();
      } else stop();
    },{threshold:.25});
    visibility.observe(scene);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else wake();});
    reduced.addEventListener('change',()=>{
      stop();
      if(reduced.matches){x=0;y=0;targetX=0;targetY=0;card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg');}
      else wake();
    });
    touch.addEventListener('change',()=>{last=0;wake();});
  });
})();
