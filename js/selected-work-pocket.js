/* Selected Work: sequentially pull each card from the pocket and lock it into the grid */
(() => {
 const scene=document.querySelector('#projects [data-work-pocket]');
 if(!scene || scene.dataset.pocketInitialized==='true') return;
 scene.dataset.pocketInitialized='true';
 const cards=Array.from(scene.querySelectorAll('.pocket-cards > [data-pocket-card]'));
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(cards.length!==5){
   cards.forEach(card=>{card.classList.add('is-out','is-landed');card.setAttribute('aria-hidden','false');});
   return;
 }
 let index=0;
 cards.forEach(card=>{
   card.classList.remove('is-out','is-landed');
   card.setAttribute('aria-hidden','true');
 });
 const revealNext=()=>{
   if(index>=cards.length) return;
   const card=cards[index++];
   card.classList.add('is-out');
   card.setAttribute('aria-hidden','false');
   if(reduced){
     card.classList.add('is-landed');
     revealNext();
     return;
   }
   let finished=false;
   const land=()=>{
     if(finished) return;
     finished=true;
     card.classList.add('is-landed');
   };
   card.addEventListener('animationend',land,{once:true});
   window.setTimeout(land,1750);
   if(index<cards.length) window.setTimeout(revealNext,1850);
 };
 const start=()=>{scene.classList.add('is-ready');revealNext();};
 if(reduced){
   cards.forEach(card=>{card.classList.add('is-out','is-landed');card.setAttribute('aria-hidden','false');});
 } else if('IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>{
     if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();start();}
   },{threshold:0.05});
   observer.observe(scene);
 } else start();
})();