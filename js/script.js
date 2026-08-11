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
    const hero = document.querySelector(".hero");
    const container = hero?.querySelector(".container");
    const heroText = hero?.querySelector(".hero-text");
    const heroImage = hero?.querySelector(".hero-image");

    if (!hero || !container || !heroText || !heroImage || hero.dataset.redesigned === "true") return;

    hero.dataset.redesigned = "true";
    hero.classList.add("hero-split-redesign");

    const existingParagraph = heroText.querySelector("p");
    const existingButtons = heroText.querySelector(".hero-btns");

    const title = document.createElement("div");
    title.className = "hero-word-animation";
    title.setAttribute("aria-label", "Javed Chaudhary SEO Specialist");

    ["Javed", "Chaudhary", "SEO", "Specialist"].forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "hero-word";
        span.textContent = word;
        span.style.setProperty("--word-delay", `${i * 0.22}s`);
        title.appendChild(span);
    });

    const role = document.createElement("div");
    role.className = "hero-role-line";
    role.innerHTML = '<span class="hero-role-label">SEO</span><span class="typing"></span>';

    heroText.innerHTML = "";
    heroText.appendChild(title);
    heroText.appendChild(role);
    if (existingParagraph) heroText.appendChild(existingParagraph);
    if (existingButtons) heroText.appendChild(existingButtons);

    // Move the profile image to the left side and make it fill the 50% visual panel.
    container.prepend(heroImage);

    const image = heroImage.querySelector("img");
    if (image) {
        image.alt = "Javed Chaudhary - SEO Specialist";
        image.loading = "eager";
    }
}

function injectHeroStyles() {
    if (document.getElementById("hero-redesign-styles")) return;

    const style = document.createElement("style");
    style.id = "hero-redesign-styles";
    style.textContent = `
        .hero.hero-split-redesign {
            min-height: 100vh;
            padding: 90px 0 0;
            position: relative;
        }

        .hero-split-redesign .container {
            width: 100%;
            max-width: none;
            min-height: calc(100vh - 90px);
            display: grid;
            grid-template-columns: 50% 50%;
            gap: 0;
            align-items: stretch;
        }

        .hero-split-redesign .hero-image {
            order: 1;
            min-height: calc(100vh - 90px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            padding: 50px;
            background:
                linear-gradient(135deg, rgba(13,17,23,.18), rgba(232,228,11,.10)),
                radial-gradient(circle at 35% 50%, rgba(232,228,11,.28), transparent 48%),
                linear-gradient(120deg, #0D1117 0%, #111923 55%, #182331 100%);
        }

        .hero-split-redesign .hero-image::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(13,17,23,0) 55%, #0D1117 100%);
            pointer-events: none;
        }

        .hero-split-redesign .hero-image img {
            width: min(78%, 560px);
            height: min(78vh, 680px);
            object-fit: contain;
            border: 0;
            border-radius: 0;
            box-shadow: none;
            position: relative;
            z-index: 1;
            filter: drop-shadow(0 25px 55px rgba(0,0,0,.45));
            transition: transform .6s ease;
        }

        .hero-split-redesign .hero-image img:hover {
            transform: translateY(-8px) scale(1.02);
        }

        .hero-split-redesign .hero-text {
            order: 2;
            width: 100%;
            min-height: calc(100vh - 90px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 70px clamp(35px, 6vw, 100px) 70px clamp(30px, 5vw, 80px);
            position: relative;
            z-index: 2;
        }

        .hero-split-redesign .hero-text h4,
        .hero-split-redesign .hero-text h1,
        .hero-split-redesign .hero-text h3 {
            display: none;
        }

        .hero-word-animation {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-family: 'Outfit', sans-serif;
            font-size: clamp(56px, 6.2vw, 104px);
            font-weight: 800;
            line-height: .93;
            letter-spacing: -3px;
            margin-bottom: 28px;
        }

        .hero-word {
            display: block;
            color: var(--white);
            opacity: 0;
            transform: translateY(35px) scale(.96);
            animation: heroWordReveal .8s cubic-bezier(.2,.8,.2,1) forwards;
            animation-delay: var(--word-delay);
        }

        .hero-word:nth-child(2) { color: var(--primary); }
        .hero-word:nth-child(3),
        .hero-word:nth-child(4) { color: var(--white); }

        @keyframes heroWordReveal {
            0% { opacity: 0; transform: translateY(35px) scale(.96); filter: blur(8px); }
            70% { opacity: 1; transform: translateY(-3px) scale(1.01); filter: blur(0); }
            100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .hero-role-line {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
            font-size: 24px;
            color: var(--text);
            font-weight: 600;
        }

        .hero-role-label {
            color: var(--primary);
            font-weight: 800;
        }

        .hero-role-line .typing {
            color: var(--white);
        }

        .hero-split-redesign .hero-text p {
            max-width: 650px;
            margin-bottom: 30px;
        }

        .hero-split-redesign .hero-btns {
            margin-top: 0;
        }

        @media (max-width: 991px) {
            .hero.hero-split-redesign { padding-top: 90px; }
            .hero-split-redesign .container {
                min-height: auto;
                grid-template-columns: 1fr;
            }
            .hero-split-redesign .hero-image {
                order: 1;
                min-height: 52vh;
                padding: 25px;
            }
            .hero-split-redesign .hero-image img {
                width: min(70%, 390px);
                height: 48vh;
            }
            .hero-split-redesign .hero-text {
                order: 2;
                min-height: auto;
                align-items: center;
                text-align: center;
                padding: 55px 7% 80px;
            }
            .hero-word-animation { align-items: center; font-size: clamp(48px, 9vw, 72px); }
            .hero-role-line { justify-content: center; }
            .hero-split-redesign .hero-text p { max-width: 760px; }
            .hero-split-redesign .hero-btns { justify-content: center; }
        }

        @media (max-width: 600px) {
            .hero.hero-split-redesign { padding-top: 90px; }
            .hero-split-redesign .hero-image { min-height: 42vh; padding: 15px; }
            .hero-split-redesign .hero-image img { width: 82%; height: 38vh; }
            .hero-word-animation {
                font-size: clamp(42px, 13vw, 62px);
                letter-spacing: -2px;
                line-height: .98;
            }
            .hero-role-line { font-size: 19px; }
            .hero-split-redesign .hero-text { padding: 40px 6% 65px; }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
    injectHeroStyles();
    setupHeroRedesign();
    setupMobileMenu();
    startTyping();
});
