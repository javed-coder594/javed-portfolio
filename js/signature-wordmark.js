/* Pointer/touch reactive 3D signature letters */
document.addEventListener('DOMContentLoaded',()=>{
 const section=document.querySelector('.signature-wordmark');
 const heading=section?.querySelector('.signature-name');
 const letters=[...(heading?.querySelectorAll('[data-letter]')||[])];
 if(!section||!heading||!letters.length)return;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce)return;
 let raf=0,px=0,py=0;
 const reset=()=>{
  letters.forEach(el=>{el.style.setProperty('--sx','0px');el.style.setProperty('--sy','0px');el.style.setProperty('--sz','0px');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
  heading.classList.remove('is-playing');
 };
 const paint=()=>{
  raf=0;
  const rect=heading.getBoundingClientRect();
  const x=px-rect.left,y=py-rect.top;
  const centerX=rect.width/2,centerY=rect.height/2;
  letters.forEach(el=>{
   const r=el.getBoundingClientRect(),cx=r.left+r.width/2-rect.left,cy=r.top+r.height/2-rect.top;
   const dx=cx-x,dy=cy-y,dist=Math.sqrt(dx*dx+dy*dy);
   const influence=Math.max(0,1-dist/210);
   const sx=(dx/(dist||1))*influence*13;
   const sy=(dy/(dist||1))*influence*10;
   const lift=influence*17;
   const rx=-(dy/(dist||1))*influence*9;
   const ry=(dx/(dist||1))*influence*12;
   el.style.setProperty('--sx',sx.toFixed(2)+'px');
   el.style.setProperty('--sy',sy.toFixed(2)+'px');
   el.style.setProperty('--sz',lift.toFixed(2)+'px');
   el.style.setProperty('--rx',rx.toFixed(2)+'deg');
   el.style.setProperty('--ry',ry.toFixed(2)+'deg');
  });
  heading.classList.add('is-playing');
 };
 const move=e=>{px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(paint)};
 heading.addEventListener('pointermove',move,{passive:true});
 heading.addEventListener('pointerleave',reset);
 heading.addEventListener('pointerdown',e=>{px=e.clientX;py=e.clientY;paint()},{passive:true});
 heading.addEventListener('touchend',()=>window.setTimeout(reset,450),{passive:true});
});
