// Home-page bootstrap: use the same site-wide navigation, footer/blog links,
// hero enhancements, and Achievements section used across the blog pages.
// Keeping one implementation prevents the home page from drifting out of sync.
document.addEventListener('DOMContentLoaded', function () {
    const script = document.createElement('script');
    script.src = '/js/script.js';
    script.onload = function () {
        if (typeof setupHeroRedesign === 'function') setupHeroRedesign();
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
