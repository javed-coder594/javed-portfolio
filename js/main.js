// Home-page bootstrap: keep the original hero markup while using the shared
// navigation, footer/blog links, and Achievements section across the site.
document.addEventListener('DOMContentLoaded', function () {
    const script = document.createElement('script');
    script.src = '/js/script.js';
    script.onload = function () {
        // Intentionally do not call setupHeroRedesign(): the original home hero is restored.
        if (typeof setupMobileMenu === 'function') setupMobileMenu();
        if (typeof setupBlogsFooter === 'function') setupBlogsFooter();
        if (typeof setupBlogArticleVisuals === 'function') setupBlogArticleVisuals();
        if (typeof setupAchievementsNavigation === 'function') setupAchievementsNavigation();
        if (typeof setupAchievementsSection === 'function') setupAchievementsSection();
        if (typeof startTyping === 'function') startTyping();
    };
    script.onerror = function () {
        console.error('Unable to load shared site script.');
    };
    document.head.appendChild(script);
});
