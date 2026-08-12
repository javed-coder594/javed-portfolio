document.addEventListener('DOMContentLoaded', function () {
    const servicesHeading = Array.from(document.querySelectorAll('.footer .footer-col h3'))
        .find(function (heading) { return heading.textContent.trim().toLowerCase() === 'services'; });

    if (servicesHeading) {
        const column = servicesHeading.closest('.footer-col');
        if (column) {
            column.innerHTML = `
                <h3>Blogs</h3>
                <ul>
                    <li><a href="/blog/technical-seo/">Technical SEO</a></li>
                    <li><a href="/blog/on-page-seo/">On-Page SEO</a></li>
                    <li><a href="/blog/off-page-seo/">Off-Page SEO</a></li>
                    <li><a href="/blog/local-seo/">Local SEO</a></li>
                    <li><a href="/blog/wordpress-seo/">WordPress SEO</a></li>
                    <li><a href="/blog/web-development/">Web Development</a></li>
                </ul>`;
        }
    }

    const menu = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    if (menu && navbar) {
        menu.addEventListener('click', function () {
            navbar.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
});
