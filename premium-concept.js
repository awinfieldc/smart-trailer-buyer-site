const conceptHeader = document.querySelector("[data-concept-header]");
const revealConceptTargets = document.querySelectorAll(
  ".quiet-proof, .dream-standard, .family-fit, .only-option, .concept-final"
);

const updateHeaderState = () => {
  document.body.classList.toggle("has-scrolled", window.scrollY > 24);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    }
  );

  revealConceptTargets.forEach((target) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.classList.add("is-visible");
      return;
    }

    target.classList.add("reveal-concept");
    revealObserver.observe(target);
  });
}

const switcher = document.querySelector("[data-lifestyle-switcher]");

if (switcher) {
  const choices = switcher.querySelectorAll("[data-lifestyle-choice]");
  const title = switcher.querySelector("[data-lifestyle-title]");
  const copy = switcher.querySelector("[data-lifestyle-copy]");

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      choices.forEach((button) => {
        button.classList.remove("is-active");
        button.setAttribute("aria-pressed", "false");
      });

      choice.classList.add("is-active");
      choice.setAttribute("aria-pressed", "true");

      if (title) title.textContent = choice.dataset.title || "";
      if (copy) copy.textContent = choice.dataset.copy || "";
    });
  });
}
