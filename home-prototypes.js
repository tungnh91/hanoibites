const choices = ["quiet", "postcard", "foodhall", "micro", "minimal"];
const body = document.body;
const buttons = Array.from(document.querySelectorAll("[data-prototype-choice]"));
const cursor = document.querySelector(".prototype-cursor");

function applyPrototype(name) {
  const prototype = choices.includes(name) ? name : "quiet";
  body.dataset.prototype = prototype;
  localStorage.setItem("hanoi-home-prototype", prototype);
  buttons.forEach((button) => {
    const active = button.dataset.prototypeChoice === prototype;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => applyPrototype(button.dataset.prototypeChoice));
});

applyPrototype(localStorage.getItem("hanoi-home-prototype") || body.dataset.prototype);

window.addEventListener("mousemove", (event) => {
  body.style.setProperty("--cursor-x", `${event.clientX}px`);
  body.style.setProperty("--cursor-y", `${event.clientY}px`);
  const interactive = event.target.closest("a, button, .hero-frame, .footer-block");
  cursor?.classList.toggle("is-interactive", Boolean(interactive));
});

window.addEventListener("mouseout", (event) => {
  if (!event.relatedTarget) cursor?.classList.remove("is-interactive");
});

const heroFrame = document.querySelector(".hero-frame");
heroFrame?.addEventListener("mousemove", (event) => {
  const rect = heroFrame.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3);
  const y = ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3);
  heroFrame.style.setProperty("--hero-x", x);
  heroFrame.style.setProperty("--hero-y", y);
});

heroFrame?.addEventListener("mouseleave", () => {
  heroFrame.style.setProperty("--hero-x", "0");
  heroFrame.style.setProperty("--hero-y", "0");
});
