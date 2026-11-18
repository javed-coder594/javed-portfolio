(() => {
  const boot = () => {
    const intro = document.getElementById('cinematicIntro');
    if (!intro) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('javedPortfolioIntroSeen') === '1'; } catch (_) {}
    if (reduced || alreadySeen) { intro.remove(); return; }
    document.body.classList.add('intro-active');
    const finish = () => {
      document.body.classList.remove('intro-active');
      intro.remove();
      try { sessionStorage.setItem('javedPortfolioIntroSeen', '1'); } catch (_) {}
    };
    const skip = document.getElementById('introSkip');
    if (skip) skip.addEventListener('click', finish, { once: true });
    window.setTimeout(finish, 5900);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();