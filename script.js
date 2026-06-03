const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
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
