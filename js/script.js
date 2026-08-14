const texts = [
    "SEO Executive",
    "Technical SEO Specialist",
    "WordPress Developer",
    "On-Page SEO Specialist",
    "Off-Page SEO Specialist"
];

function startTyping() {
    const typingElement = document.querySelector(".typing");
    if (!typingElement) return;
    let count = 0;
    let index = 0;
    function type() {
        if (count === texts.length) count = 0;
        const currentText = texts[count];
        typingElement.textContent = currentText.slice(0, ++index);
        if (index === currentText.length) {
            setTimeout(() => { index = 0; count++; type(); }, 1800);
        } else setTimeout(type, 75);
    }
    type();
}

function setupMobileMenu() {
    const menu = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    if (!menu || !navbar || menu.dataset.menuReady === "true") return;
    menu.dataset.menuReady = "true";
    menu.addEventListener("click", () => {
        navbar.classList.toggle("active");
        menu.classList.toggle("active");
        menu.setAttribute("aria-expanded", navbar.classList.contains("active") ? "true" : "false");
    });
}

function setupHeroRedesign() {
    const hero = document.querySelector(".hero#home") || document.querySelector(".hero");
    if (!hero || hero.dataset.redesigned === "true") return;
    hero.dataset.redesigned = "true";
    hero.classList.add("hero-modern");
    hero.innerHTML = `
        <div class="hero-bg-image" aria-hidden="true"></div>
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-grid" aria-hidden="true"></div>
        <div class="container hero-background-container">
            <div class="hero-modern-content">
                <div class="hero-kicker"><i class="fa-solid fa-sparkles"></i> SEO & Website Growth Specialist</div>
                <h1 class="hero-title">
                    <span class="hero-name">Javed <span>Chaudhary</span></span>
                    <span class="hero-main-line">SEO <span>Specialist</span></span>
                </h1>
                <div class="hero-role-line"><span class="hero-role-label">I AM A</span><span class="typing"></span><span class="hero-cursor">|</span></div>
                <p class="hero-description">I help businesses improve search visibility, grow organic traffic, and build fast, search-friendly websites through practical SEO and modern web development.</p>
                <div class="hero-highlights">
                    <span class="hero-highlight"><i class="fa-solid fa-magnifying-glass-chart"></i> Technical SEO</span>
                    <span class="hero-highlight"><i class="fa-solid fa-arrow-trend-up"></i> On-Page SEO</span>
                    <span class="hero-highlight"><i class="fa-solid fa-link"></i> Off-Page SEO</span>
                    <span class="hero-highlight"><i class="fa-brands fa-wordpress"></i> WordPress</span>
                </div>
                <div class="hero-btns"><a href="#contact" class="btn">Hire Me</a><a href="assests/Javed_Chaudhary_CV.pdf" class="outline-btn" download>Download CV</a></div>
                <div class="hero-scroll"><i class="fa-solid fa-arrow-down"></i> Explore my work</div>
            </div>
            <div class="hero-side-badge" aria-hidden="true"><strong>SEO</strong><span>Specialist</span></div>
        </div>`;
    const modernCss = document.createElement("link");
    modernCss.rel = "stylesheet";
    modernCss.href = "css/hero-modern.css";
    document.head.appendChild(modernCss);
    const referenceCss = document.createElement("link");
    referenceCss.rel = "stylesheet";
    referenceCss.href = "css/hero-reference.css";
    document.head.appendChild(referenceCss);
}

function setupBlogsFooter() {
    const blogCategories = [
        ["Technical SEO", "/blog/technical-seo/"],
        ["On-Page SEO", "/blog/on-page-seo/"],
        ["Off-Page SEO", "/blog/off-page-seo/"],
        ["Local SEO", "/blog/local-seo/"],
        ["WordPress SEO", "/blog/wordpress-seo/"],
        ["Web Development", "/blog/web-development/"]
    ];

    let footer = document.querySelector("footer.footer");
    if (!footer) {
        footer = document.createElement("footer");
        footer.className = "footer";
        footer.innerHTML = `<div class="container"><div class="footer-grid">
            <div class="footer-col"><a href="/" class="footer-logo"><span>J</span>aved</a><p>SEO Executive and WordPress Developer helping businesses improve online visibility, website performance, and organic growth.</p></div>
            <div class="footer-col"><h3>Quick Links</h3><ul><li><a href="/#home">Home</a></li><li><a href="/#about">About</a></li><li><a href="/#experience">Experience</a></li><li><a href="/#skills">Skills</a></li><li><a href="/#projects">Projects</a></li><li><a href="/#achievements">Achievements</a></li><li><a href="/blog/">Blog</a></li><li><a href="/#contact">Contact</a></li></ul></div>
            <div class="footer-col"><h3><a href="/blog/">Blogs</a></h3><ul></ul></div>
            <div class="footer-col"><h3>Contact</h3><ul><li><i class="fas fa-envelope"></i> javedchaudhary594@gmail.com</li><li><i class="fas fa-phone"></i> +91 8459791852</li><li><i class="fas fa-location-dot"></i> Hyderabad, India</li></ul></div>
        </div><div class="footer-bottom"><p>© 2026 <span>Javed Chaudhary</span>. All Rights Reserved.</p></div></div>`;
        document.body.appendChild(footer);
    }

    const columns = Array.from(footer.querySelectorAll(".footer-col"));
    let blogsColumn = columns.find(col => {
        const heading = col.querySelector("h3");
        return heading && /^(services|blogs)$/i.test(heading.textContent.trim());
    });
    if (!blogsColumn) {
        blogsColumn = document.createElement("div");
        blogsColumn.className = "footer-col";
        footer.querySelector(".footer-grid")?.appendChild(blogsColumn);
    }

    const heading = blogsColumn.querySelector("h3") || document.createElement("h3");
    heading.innerHTML = '<a href="/blog/" aria-label="Open Blogs page">Blogs</a>';
    if (!heading.parentElement) blogsColumn.appendChild(heading);

    const blogHeadingLink = heading.querySelector("a");
    if (blogHeadingLink) {
        blogHeadingLink.href = "/blog/";
        blogHeadingLink.style.display = "inline-block";
        blogHeadingLink.style.position = "relative";
        blogHeadingLink.style.zIndex = "10";
        blogHeadingLink.addEventListener("click", event => {
            event.preventDefault();
            window.location.assign("/blog/");
        });
    }

    let list = blogsColumn.querySelector("ul");
    if (!list) {
        list = document.createElement("ul");
        blogsColumn.appendChild(list);
    }
    list.innerHTML = blogCategories.map(([name, url]) => `<li><a href="${url}">${name}</a></li>`).join("");

    footer.querySelectorAll("a").forEach(link => {
        if (/^blogs?$/i.test(link.textContent.trim())) link.href = "/blog/";
    });
}

function setupBlogArticleVisuals() {
    const article = document.querySelector(".blog-article article");
    if (!article || article.dataset.visualsReady === "true") return;
    article.dataset.visualsReady = "true";

    const path = window.location.pathname.toLowerCase();
    const visualMap = [
        { match: "/technical-seo/", image: "/assests/images/blog-technical-seo.svg", title: "Technical SEO Audit Checklist – Website Optimization", alt: "Technical SEO audit checklist visual showing website structure, crawlability and search analysis", caption: "Technical SEO audit checklist: a visual overview of crawlability, indexing and website analysis." },
        { match: "/on-page-seo/", image: "/assests/images/blog-on-page-seo.svg", title: "On-Page SEO Checklist – Page Optimization", alt: "On-page SEO checklist visual showing webpage content, headings and search optimization", caption: "On-page SEO checklist: a visual representation of page content, headings and optimization." },
        { match: "/off-page-seo/", image: "/assests/images/blog-off-page-seo.svg", title: "Link Building Strategies – Off-Page SEO", alt: "Link building strategies visual showing connected links and authority signals", caption: "Link building strategies: a visual representation of relevant connections and off-page SEO." },
        { match: "/local-seo/", image: "/assests/images/blog-local-seo.svg", title: "Local SEO – Local Search Visibility", alt: "Local SEO visual showing a business location marker and local search signals", caption: "Local SEO: a visual representation of local search, business information and location visibility." },
        { match: "/wordpress-seo/", image: "/assests/images/blog-wordpress-seo.svg", title: "WordPress SEO – Website Optimization", alt: "WordPress SEO visual showing a website interface and optimization settings", caption: "WordPress SEO: a visual representation of website structure, content and optimization." },
        { match: "/web-development/", image: "/assests/images/blog-web-development.svg", title: "SEO-Friendly Website Development – Modern Web Structure", alt: "SEO-friendly website development visual showing code, browser structure and responsive web design", caption: "SEO-friendly website development: a visual representation of code, browser structure and performance." }
    ];

    const visual = visualMap.find(item => path.includes(item.match));
    if (!visual) return;

    const existing = article.querySelector(".blog-hero");
    if (existing) existing.remove();

    const figure = document.createElement("figure");
    figure.className = "blog-hero";
    figure.innerHTML = `<img src="${visual.image}" width="1200" height="650" loading="eager" decoding="async" fetchpriority="high" title="${visual.title}" alt="${visual.alt}"><figcaption>${visual.caption}</figcaption>`;

    const firstParagraph = article.querySelector("p");
    if (firstParagraph) firstParagraph.insertAdjacentElement("afterend", figure);
    else article.prepend(figure);

    let css = document.querySelector('link[data-blog-article-css="true"]');
    if (!css) {
        css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "/css/blog-article.css";
        css.dataset.blogArticleCss = "true";
        document.head.appendChild(css);
    }

    const metaImage = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
    metaImage.setAttribute("property", "og:image");
    metaImage.setAttribute("content", new URL(visual.image, window.location.origin).href);
    if (!metaImage.parentElement) document.head.appendChild(metaImage);
}

function setupAchievementsNavigation() {
    const navLinks = document.querySelectorAll(".nav-links");
    navLinks.forEach(nav => {
        if (nav.querySelector('a[href="#achievements"], a[href="/#achievements"]')) return;
        const li = document.createElement("li");
        li.innerHTML = '<a href="/#achievements">Achievements</a>';
        const projectLink = Array.from(nav.querySelectorAll("a")).find(a => /projects/i.test(a.textContent));
        const contactLink = Array.from(nav.querySelectorAll("a")).find(a => /contact/i.test(a.textContent));
        if (contactLink && contactLink.parentElement) contactLink.parentElement.before(li);
        else if (projectLink && projectLink.parentElement) projectLink.parentElement.after(li);
        else nav.appendChild(li);
    });

    document.querySelectorAll("footer.footer").forEach(footer => {
        const quick = Array.from(footer.querySelectorAll(".footer-col")).find(col => {
            const h = col.querySelector("h3");
            return h && /quick links/i.test(h.textContent);
        });
        if (!quick) return;
        const list = quick.querySelector("ul");
        if (!list || list.querySelector('a[href="#achievements"], a[href="/#achievements"]')) return;
        const li = document.createElement("li");
        li.innerHTML = '<a href="/#achievements">Achievements</a>';
        const contact = Array.from(list.querySelectorAll("a")).find(a => /contact/i.test(a.textContent));
        if (contact && contact.parentElement) contact.parentElement.before(li);
        else list.appendChild(li);
    });
}

function setupAchievementsSection() {
    const home = document.querySelector("#home.hero, .hero#home");
    const contact = document.querySelector("#contact");
    if (!home || !contact || document.querySelector("#achievements")) return;

    const section = document.createElement("section");
    section.className = "achievements-section";
    section.id = "achievements";
    section.innerHTML = `
        <div class="container">
            <div class="section-title">
                <span class="achievements-eyebrow">Selected Performance Snapshots</span>
                <h2>SEO <span>Achievements</span></h2>
                <p>Four anonymized Google Search Console snapshots highlighting clicks, impressions and search performance.</p>
            </div>
            <div class="achievements-note">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Website identities are intentionally hidden. These are anonymized performance snapshots and are not presented as verified results for this portfolio.</span>
            </div>
            <div class="achievements-slider" aria-label="SEO performance snapshots">
                <div class="achievements-track">
                    <article class="achievement-slide is-active">
                        <div class="achievement-meta"><span>Google News</span><strong>Last 3 Months</strong></div>
                        <div class="achievement-image achievement-image-1" role="img" aria-label="Anonymized Google Search Console performance snapshot showing 1.47K clicks, 25.8K impressions and 5.7 percent CTR" title="Google Search Console performance – last 3 months"></div>
                        <div class="achievement-caption"><strong>1.47K clicks</strong><span>25.8K impressions</span><span>5.7% CTR</span></div>
                    </article>
                    <article class="achievement-slide">
                        <div class="achievement-meta"><span>Web Search</span><strong>Last 3 Months</strong></div>
                        <div class="achievement-image achievement-image-2" role="img" aria-label="Anonymized Google Search Console performance snapshot showing 4.29K clicks, 73.7K impressions, 5.8 percent CTR and 4.8 average position" title="Google Search Console web search performance – last 3 months"></div>
                        <div class="achievement-caption"><strong>4.29K clicks</strong><span>73.7K impressions</span><span>5.8% CTR</span><span>Avg. position 4.8</span></div>
                    </article>
                    <article class="achievement-slide">
                        <div class="achievement-meta"><span>Search Performance</span><strong>Last 3 Months</strong></div>
                        <div class="achievement-image achievement-image-3" role="img" aria-label="Anonymized Google Search Console performance snapshot showing 56 clicks, 7.67K impressions, 0.7 percent CTR and average position 74" title="Google Search Console search performance snapshot – last 3 months"></div>
                        <div class="achievement-caption"><strong>56 clicks</strong><span>7.67K impressions</span><span>0.7% CTR</span><span>Avg. position 74</span></div>
                    </article>
                    <article class="achievement-slide">
                        <div class="achievement-meta"><span>Google News</span><strong>Last 28 Days</strong></div>
                        <div class="achievement-image achievement-image-4" role="img" aria-label="Anonymized Google Search Console performance snapshot showing 10.5K clicks, 255K impressions and 4.1 percent CTR" title="Google Search Console performance – last 28 days"></div>
                        <div class="achievement-caption"><strong>10.5K clicks</strong><span>255K impressions</span><span>4.1% CTR</span></div>
                    </article>
                </div>
                <button class="achievement-control achievement-prev" type="button" aria-label="Previous performance snapshot"><i class="fa-solid fa-arrow-left"></i></button>
                <button class="achievement-control achievement-next" type="button" aria-label="Next performance snapshot"><i class="fa-solid fa-arrow-right"></i></button>
                <div class="achievement-dots" role="tablist" aria-label="Choose performance snapshot">
                    <button type="button" class="is-active" aria-label="Show snapshot 1"></button>
                    <button type="button" aria-label="Show snapshot 2"></button>
                    <button type="button" aria-label="Show snapshot 3"></button>
                    <button type="button" aria-label="Show snapshot 4"></button>
                </div>
            </div>
        </div>`;

    contact.before(section);

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/css/achievements.css";
    document.head.appendChild(css);

    const slides = Array.from(section.querySelectorAll(".achievement-slide"));
    const dots = Array.from(section.querySelectorAll(".achievement-dots button"));
    let index = 0;
    let timer;

    function show(next) {
        index = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === index);
            dot.setAttribute("aria-selected", i === index ? "true" : "false");
        });
    }

    function restart() {
        clearInterval(timer);
        timer = setInterval(() => show(index + 1), 5500);
    }

    section.querySelector(".achievement-prev").addEventListener("click", () => {
        show(index - 1);
        restart();
    });
    section.querySelector(".achievement-next").addEventListener("click", () => {
        show(index + 1);
        restart();
    });
    dots.forEach((dot, i) => dot.addEventListener("click", () => {
        show(i);
        restart();
    }));
    section.addEventListener("mouseenter", () => clearInterval(timer));
    section.addEventListener("mouseleave", restart);
    section.addEventListener("focusin", () => clearInterval(timer));
    section.addEventListener("focusout", restart);
    show(0);
    restart();
}

document.addEventListener("DOMContentLoaded", () => {
    setupHeroRedesign();
    setupMobileMenu();
    setupBlogsFooter();
    setupBlogArticleVisuals();
    setupAchievementsNavigation();
    setupAchievementsSection();
    startTyping();
});
