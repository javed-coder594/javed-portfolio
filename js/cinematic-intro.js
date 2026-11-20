(()=>{
 const init=()=>{
  const intro=document.getElementById('cinematicIntro');
  if(!intro||intro.dataset.initialized)return;
  intro.dataset.initialized='true';
  const timer=intro.querySelector('#introTimer strong');
  const skip=intro.querySelector('#introSkip');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const key='javedPortfolioIntroSeen';
  let remaining=5,interval=0,closed=false;
  const close=()=>{
   if(closed)return;closed=true;
   if(interval)clearInterval(interval);
   try{sessionStorage.setItem(key,'1')}catch(e){}
   intro.classList.add('is-leaving');
   document.body.classList.remove('intro-active');
   window.setTimeout(()=>{intro.hidden=true;intro.remove()},650);
  };
  let seen=false;try{seen=sessionStorage.getItem(key)==='1'}catch(e){}
  if(reduce||seen){intro.hidden=true;intro.remove();return}
  document.body.classList.add('intro-active');
  if(timer)timer.textContent=String(remaining);
  interval=window.setInterval(()=>{
   remaining=Math.max(0,remaining-1);
   if(timer)timer.textContent=String(remaining);
   if(remaining===0)close();
  },1000);
  skip?.addEventListener('click',close,{once:true});
  const onKey=e=>{if(e.key==='Escape'&&!closed){close();document.removeEventListener('keydown',onKey)}};
  document.addEventListener('keydown',onKey);
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
