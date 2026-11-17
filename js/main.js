// Home-page bootstrap: keep the original hero markup while using the shared
// navigation, footer/blog links, and Achievements section across the site.
document.addEventListener('DOMContentLoaded', function () {
    const script = document.createElement('script');
    script.src = '/js/script.js';
    script.onload = function () {
        // Intentionally do not call setupHeroRedesign(): the original home hero is restored.
        if (typeof setupMobileMenu === 'function') setupMobileMenu();
        if (typeof setupAchievementsNavigation === 'function') setupAchievementsNavigation();
        if (typeof setupAchievementsSection === 'function') setupAchievementsSection();
        setupMoisezMotion();
        if (typeof startTyping === 'function') startTyping();
    };
    script.onerror = function () {
        console.error('Unable to load shared site script.');
    };
    document.head.appendChild(script);
});

function setupMoisezMotion() {
  if (document.documentElement.dataset.motionReady) return;
  document.documentElement.dataset.motionReady = 'true';
  const items = document.querySelectorAll('main section, .experience-card, .expertise-card, .project-card, .achievement-list > div');
  items.forEach((el,i) => { el.classList.add('moisez-reveal'); el.style.setProperty('--reveal-delay', `${Math.min(i % 4,3)*90}ms`); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
    items.forEach(el=>observer.observe(el));
  } else items.forEach(el=>el.classList.add('is-visible'));
  document.querySelector('.footer')?.classList.add('footer-parallax');
}
