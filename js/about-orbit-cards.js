/* About orbit cards: one discipline takes the spotlight every 3 seconds. */
(() => {
  const scene = document.querySelector('[data-about-orbit]');
  if (!scene) return;
  const cards = [...scene.querySelectorAll('[data-orbit-card]')];
  const progress = scene.querySelector('[data-orbit-progress]');
  const count = scene.querySelector('[data-orbit-count]');
  if (cards.length !== 4) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intervalMs = 3000;
  let active = 0;
  let timer = null;
  let startedAt = 0;
  let remaining = intervalMs;
  let raf = 0;
  let paused = false;

  const render = () => {
    cards.forEach((card, index) => {
      const selected = index === active;
      card.classList.toggle('is-active', selected);
      card.setAttribute('aria-current', selected ? 'true' : 'false');
    });
    if (count) count.textContent = String(active + 1).padStart(2, '0');
    if (progress) progress.style.width = (((active + 1) / cards.length) * 100) + '%';
  };

  const stop = () => {
    if (timer) window.clearTimeout(timer);
    if (raf) window.cancelAnimationFrame(raf);
    timer = null;
    raf = 0;
  };

  const tick = () => {
    if (paused || reducedMotion.matches || document.hidden) return;
    active = (active + 1) % cards.length;
    render();
    remaining = intervalMs;
    startedAt = performance.now();
    timer = window.setTimeout(tick, intervalMs);
  };

  const start = () => {
    stop();
    if (paused || reducedMotion.matches || document.hidden) return;
    startedAt = performance.now();
    timer = window.setTimeout(tick, remaining);
  };

  const pause = () => {
    if (paused) return;
    paused = true;
    scene.classList.add('is-paused');
    if (timer) remaining = Math.max(0, remaining - (performance.now() - startedAt));
    stop();
  };

  const resume = () => {
    if (!paused) return;
    paused = false;
    scene.classList.remove('is-paused');
    start();
  };

  scene.addEventListener('mouseenter', pause);
  scene.addEventListener('mouseleave', resume);
  scene.addEventListener('focusin', pause);
  scene.addEventListener('focusout', event => {
    if (!scene.contains(event.relatedTarget)) resume();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) stop();
    else start();
  });

  render();
  start();
})();
