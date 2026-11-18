/* About section: all four cards stay visible; focus cycles every 3 seconds. */
(() => {
  const scene = document.querySelector('[data-about-orbit]');
  if (!scene) return;
  const cards = [...document.querySelectorAll('.about-orbit-card[data-orbit-card]')];
  const progress = scene.querySelector('[data-orbit-progress]');
  const count = scene.querySelector('[data-orbit-count]');
  if (cards.length !== 4) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 3000;
  let active = 0, timer = null, startedAt = 0, remaining = interval, paused = false;
  const render = () => {
    cards.forEach((card, i) => {
      const selected = i === active;
      card.classList.toggle('is-active', selected);
      card.setAttribute('aria-current', selected ? 'true' : 'false');
    });
    if (count) count.textContent = String(active + 1).padStart(2, '0');
    if (progress) progress.style.width = ((active + 1) * 25) + '%';
  };
  const stop = () => { if (timer) clearTimeout(timer); timer = null; };
  const start = () => {
    stop();
    if (paused || reduce.matches || document.hidden) return;
    startedAt = performance.now();
    timer = setTimeout(() => {
      active = (active + 1) % cards.length;
      render();
      remaining = interval;
      start();
    }, remaining);
  };
  const pause = () => {
    if (paused) return;
    paused = true;
    remaining = Math.max(0, remaining - (performance.now() - startedAt));
    stop();
  };
  const resume = () => { if (!paused) return; paused = false; start(); };
  scene.addEventListener('mouseenter', pause);
  scene.addEventListener('mouseleave', resume);
  scene.addEventListener('focusin', pause);
  scene.addEventListener('focusout', e => { if (!scene.contains(e.relatedTarget)) resume(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  reduce.addEventListener?.('change', () => { if (reduce.matches) stop(); else start(); });
  render();
  start();
})();