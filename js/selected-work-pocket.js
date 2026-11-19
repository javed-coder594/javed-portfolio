/* Reliable sequential reveal for all five Selected Work cards */
(() => {
 const scene=document.querySelector('#projects [data-work-pocket]');
 if(!scene || scene.dataset.pocketInitialized==='true') return;
 scene.dataset.pocketInitialized='true';
 const cards=Array.from(scene.querySelectorAll('.pocket-cards > [data-pocket-card]'));
 if(cards.length!==5) {
   cards.forEach(card=>{card.classList.add('is-out');card.setAttribute('aria-hidden','false');});
   return;
 }
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let index=0;
 cards.forEach(card=>{card.classList.remove('is-out');card.setAttribute('aria-hidden','true');});
 const reveal=()=>{
   if(index>=cards.length) return;
   const current=cards[index++];
   current.classList.add('is-out');
   current.setAttribute('aria-hidden','false');
   if(index<cards.length) window.setTimeout(reveal,reduced?60:1450);
 };
 const start=()=>{scene.classList.add('is-ready');reveal();};
 if(reduced){cards.forEach(card=>{card.classList.add('is-out');card.setAttribute('aria-hidden','false');});}
 else if('IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>{
     if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();start();}
   },{threshold:0.05});
   observer.observe(scene);
 } else start();
})();