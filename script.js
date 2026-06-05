const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const closeNavigation = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    const target = event.target;

    if (
      isOpen &&
      target instanceof Node &&
      !siteNav.contains(target) &&
      !navToggle.contains(target)
    ) {
      closeNavigation();
    }
  });
}

const buyerRouter = document.querySelector("[data-buyer-router]");

if (buyerRouter) {
  const choices = buyerRouter.querySelectorAll("[data-router-choice]");
  const title = buyerRouter.querySelector("[data-router-title]");
  const copy = buyerRouter.querySelector("[data-router-copy]");
  const link = buyerRouter.querySelector("[data-router-link]");

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      choices.forEach((option) => {
        option.classList.remove("is-selected");
        option.setAttribute("aria-pressed", "false");
      });

      choice.classList.add("is-selected");
      choice.setAttribute("aria-pressed", "true");

      if (title) title.textContent = choice.dataset.resultTitle || "";
      if (copy) copy.textContent = choice.dataset.resultCopy || "";
      if (link) {
        const nextHref = choice.dataset.resultHref || "#start";
        link.href = nextHref;
        if (nextHref.startsWith("http")) {
          link.target = "_blank";
          link.rel = "noreferrer";
        } else {
          link.removeAttribute("target");
          link.removeAttribute("rel");
        }
        link.textContent = "";
        link.append(`${choice.dataset.resultLabel || "Open next step"} `);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("viewBox", "0 0 24 24");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M5 12h14m-6-6 6 6-6 6");
        svg.append(path);
        link.append(svg);
      }
    });
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  "main > .section"
);

if (!prefersReducedMotion && "IntersectionObserver" in window) {
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
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.92) {
      return;
    }

    target.classList.add("reveal-on-scroll");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
