(() => {
  const mark = document.querySelector("[data-signature-mark]");
  const name = mark?.querySelector(".signature-mark__name");
  if (!mark || !name) return;

  let releaseTimer;
  const setPoint = (clientX, clientY) => {
    const rect = mark.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    mark.style.setProperty("--signature-x", x + "%");
    mark.style.setProperty("--signature-y", y + "%");
  };
  const activate = (x, y) => {
    if (typeof x === "number" && typeof y === "number") setPoint(x, y);
    mark.classList.add("is-active");
    window.clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(() => mark.classList.remove("is-active"), 1450);
  };

  mark.addEventListener("pointermove", event => {
    if (event.pointerType === "mouse" || event.pointerType === "pen") setPoint(event.clientX, event.clientY);
  }, { passive: true });
  mark.addEventListener("pointerdown", event => activate(event.clientX, event.clientY), { passive: true });
  mark.addEventListener("pointerleave", () => {
    window.clearTimeout(releaseTimer);
    mark.classList.remove("is-active");
  });
  mark.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
})();