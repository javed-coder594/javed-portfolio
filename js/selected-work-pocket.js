/* Watch-pocket sequential card reveal */
(() => {
 const scene=document.querySelector('[data-work-pocket]');
 if(!scene)return;
 const cards=[...scene.querySelectorAll('[data-pocket-card]')];
 if(!cards.length)return;
 let active=0,timer=null;
 const show=(index)=>{
   cards.forEach((card,i)=>{card.classList.toggle('is-out',i===index);card.setAttribute('aria-hidden',i===index?'false':'true');});
   scene.dataset.active=String(index+1);
 };
 const reveal=()=>{
   scene.classList.add('is-ready');
   show(0);
   if(timer)clearInterval(timer);
   timer=setInterval(()=>{active=(active+1)%cards.length;show(active);},3600);
 };
 if('IntersectionObserver'in window){
   const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){reveal();observer.disconnect();}},{threshold:.22});
   observer.observe(scene);
 }else reveal();
 scene.addEventListener('mouseenter',()=>{if(timer)clearInterval(timer);});
 scene.addEventListener('mouseleave',()=>{if(timer)clearInterval(timer);timer=setInterval(()=>{active=(active+1)%cards.length;show(active);},3600);});
 scene.addEventListener('focusin',()=>{if(timer)clearInterval(timer);});
 scene.addEventListener('focusout',()=>{if(timer)clearInterval(timer);timer=setInterval(()=>{active=(active+1)%cards.length;show(active);},3600);});
})();
