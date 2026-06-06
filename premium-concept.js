const revealConceptTargets = document.querySelectorAll(
  ".editor-letter, .feature-spread, .pull-quote, .issue-index, .family-fit, .buying-brief"
);
const heroImage = document.querySelector("[data-hero-image]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updatePageState = () => {
  const y = window.scrollY;
  document.body.classList.toggle("has-scrolled", y > 24);

  if (heroImage && !prefersReducedMotion) {
    const lift = Math.min(y, 520) * 0.035;
    const scale = 1.04 + Math.min(y, 520) * 0.00008;
    heroImage.style.transform = `scale(${scale}) translateY(${lift}px)`;
  }
};

updatePageState();
window.addEventListener("scroll", updatePageState, { passive: true });

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
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.1,
    }
  );

  revealConceptTargets.forEach((target) => {
    if (prefersReducedMotion) {
      target.classList.add("is-visible");
      return;
    }

    target.classList.add("reveal-concept");
    revealObserver.observe(target);
  });
}

const briefSwitcher = document.querySelector("[data-brief-switcher]");

if (briefSwitcher) {
  const choices = briefSwitcher.querySelectorAll("[data-brief-choice]");
  const title = briefSwitcher.querySelector("[data-brief-title]");
  const copy = briefSwitcher.querySelector("[data-brief-copy]");

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
