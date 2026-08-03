const texts = [
        "SEO Executive",
    "On-Page SEO Specialist",
    "Off-Page SEO Specialist",
    "Technical SEO Specialist",
    "WordPress Developer",
    "HTML • CSS • JavaScript"   
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (count === texts.length) {
        count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".typing").textContent = letter;

    if (letter.length === currentText.length) {

        setTimeout(() => {

            index = 0;
            count++;

            type();

        }, 1800);

    } else {

        setTimeout(type, 90);

    }

})();   