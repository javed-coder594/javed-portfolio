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
            setTimeout(() => {
                index = 0;
                count++;
                type();
            }, 1800);
        } else {
            setTimeout(type, 75);
        }
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
                <div class="hero-kicker">
                    <i class="fa-solid fa-sparkles"></i>
                    SEO & Website Growth Specialist
                </div>

                <h1 class="hero-title">
                    <span class="hero-name">Javed <span>Chaudhary</span></span>
                    <span class="hero-main-line">SEO <span>Specialist</span></span>
                </h1>

                <div class="hero-role-line">
                    <span class="hero-role-label">I AM A</span>
                    <span class="typing"></span><span class="hero-cursor">|</span>
                </div>

                <p class="hero-description">
                    I help businesses improve search visibility, grow organic traffic,
                    and build fast, search-friendly websites through practical SEO and modern web development.
                </p>

                <div class="hero-highlights">
                    <span class="hero-highlight"><i class="fa-solid fa-magnifying-glass-chart"></i> Technical SEO</span>
                    <span class="hero-highlight"><i class="fa-solid fa-arrow-trend-up"></i> On-Page SEO</span>
                    <span class="hero-highlight"><i class="fa-solid fa-link"></i> Off-Page SEO</span>
                    <span class="hero-highlight"><i class="fa-brands fa-wordpress"></i> WordPress</span>
                </div>

                <div class="hero-btns">
                    <a href="#contact" class="btn">Hire Me</a>
                    <a href="assests/Javed_Chaudhary_CV.pdf" class="outline-btn" download>Download CV</a>
                </div>

                <div class="hero-scroll">
                    <i class="fa-solid fa-arrow-down"></i>
                    Explore my work
                </div>
            </div>

            <div class="hero-side-badge" aria-hidden="true">
                <strong>SEO</strong>
                <span>Specialist</span>
            </div>
        </div>
    `;

    const modernCss = document.createElement("link");
    modernCss.rel = "stylesheet";
    modernCss.href = "css/hero-modern.css";
    document.head.appendChild(modernCss);

    const referenceCss = document.createElement("link");
    referenceCss.rel = "stylesheet";
    referenceCss.href = "css/hero-reference.css";
    document.head.appendChild(referenceCss);
}

document.addEventListener("DOMContentLoaded", () => {
    setupHeroRedesign();
    setupMobileMenu();
    startTyping();
});
