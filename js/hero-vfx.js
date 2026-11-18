(() => {
  const boot = () => {
    const intro = document.getElementById('cinematicIntro');
    if (!intro) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      intro.remove();
      return;
    }

    // The intro is visible from the initial HTML paint and plays on every
    // fresh page load or refresh. Do not persist a "seen" flag in storage.
    document.body.classList.add('intro-active');

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.body.classList.remove('intro-active');
      intro.remove();
    };

    const skip = document.getElementById('introSkip');
    if (skip) skip.addEventListener('click', finish, { once: true });

    // Hold the full-screen opening for 9.2s, then fade it out over 0.8s.
    window.setTimeout(() => intro.classList.add('is-leaving'), 9200);
    window.setTimeout(finish, 8000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
