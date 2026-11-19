/* Responsive pointer + touch-reactive 3D name lettering */
(()=>{
 const init=()=>{
  const section=document.querySelector('.signature-wordmark'),heading=section?.querySelector('.signature-name');
  const letters=[...(heading?.querySelectorAll('[data-letter]')||[])];
  if(!section||!heading||!letters.length||heading.dataset.interactionReady)return;
  heading.dataset.interactionReady='true';
  letters.forEach((el,i)=>el.style.setProperty('--i',i));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf=0,px=0,py=0,resetTimer=0;
  const reset=()=>{
   letters.forEach(el=>{el.style.setProperty('--sx','0px');el.style.setProperty('--sy','0px');el.style.setProperty('--sz','0px');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
   heading.classList.remove('is-playing');
  };
  const paint=()=>{
   raf=0;const rect=heading.getBoundingClientRect(),x=px-rect.left,y=py-rect.top;
   letters.forEach(el=>{
    const r=el.getBoundingClientRect(),cx=r.left+r.width/2-rect.left,cy=r.top+r.height/2-rect.top;
    const dx=cx-x,dy=cy-y,dist=Math.hypot(dx,dy),influence=reduce?0:Math.max(0,1-dist/260);
    const sx=dx/(dist||1)*influence*17,sy=dy/(dist||1)*influence*13,lift=influence*23;
    el.style.setProperty('--sx',sx.toFixed(1)+'px');el.style.setProperty('--sy',sy.toFixed(1)+'px');el.style.setProperty('--sz',lift.toFixed(1)+'px');
    el.style.setProperty('--rx',(-dy/(dist||1)*influence*12).toFixed(1)+'deg');el.style.setProperty('--ry',(dx/(dist||1)*influence*16).toFixed(1)+'deg');
   });
   heading.classList.add('is-playing');
  };
  const move=e=>{if(e.pointerType==='touch'&&e.buttons===0&&e.type==='pointermove')return;px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(paint)};
  const ripple=()=>{
   if(reduce)return;
   heading.classList.remove('is-rippling');void heading.offsetWidth;heading.classList.add('is-rippling');
   clearTimeout(resetTimer);resetTimer=setTimeout(()=>heading.classList.remove('is-rippling'),900);
  };
  heading.addEventListener('pointermove',move,{passive:true});
  heading.addEventListener('pointerleave',reset,{passive:true});
  heading.addEventListener('pointerdown',e=>{move(e);ripple()},{passive:true});
  heading.addEventListener('click',ripple);
  heading.addEventListener('animationend',e=>{if(e.animationName==='signaturePop')e.target.style.backgroundPosition='100% 50%'});
  heading.addEventListener('touchend',()=>{clearTimeout(resetTimer);resetTimer=setTimeout(reset,700)},{passive:true});
  reset();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
