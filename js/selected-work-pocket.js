/* Slow sequential pocket extraction: each card exits, lands in grid, then next starts */
(() => {
 const scene=document.querySelector('[data-work-pocket]');
 if(!scene || scene.dataset.pocketInitialized)return;
 scene.dataset.pocketInitialized='true';
 const cards=[...scene.querySelectorAll('[data-pocket-card]')];
 if(!cards.length)return;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let started=false,step=0,timer=null;
 const showNext=()=>{
   if(step>=cards.length)return;
   const card=cards[step];
   card.classList.add('is-out');
   card.setAttribute('aria-hidden','false');
   scene.dataset.active=String(step+1);
   step++;
   if(step<cards.length)timer=setTimeout(showNext,reduce?80:2200);
 };
 const begin=()=>{
   if(started)return;
   started=true;
   scene.classList.add('is-ready');
   cards.forEach(card=>{card.setAttribute('aria-hidden','true');});
   showNext();
 };
 if('IntersectionObserver'in window){
   const observer=new IntersectionObserver(entries=>{
     if(entries.some(entry=>entry.isIntersecting)){begin();observer.disconnect();}
   },{threshold:.18});
   observer.observe(scene);
 }else begin();
 window.addEventListener('pagehide',()=>{if(timer)clearTimeout(timer);},{once:true});
})();