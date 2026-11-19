/* Brand wordmark typing reveal + refined sticky header state */
document.addEventListener('DOMContentLoaded',()=>{
 const word=document.querySelector('[data-typing-logo]');
 const typed=word?.querySelector('.brand-typed');
 const header=document.querySelector('#siteHeader');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(word&&typed){
  const text=word.getAttribute('data-text')||'Javed';
  if(reduce){typed.textContent=text}
  else{
   typed.textContent='';
   let i=0;
   const typeNext=()=>{
    if(i<text.length){typed.textContent+=text.charAt(i++);window.setTimeout(typeNext,105)}
   };
   window.setTimeout(typeNext,260);
  }
 }
 if(header){
  const update=()=>header.classList.toggle('is-scrolled',window.scrollY>24);
  update();window.addEventListener('scroll',update,{passive:true});
 }
});
