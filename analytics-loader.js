window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};

document.documentElement.dataset.analyticsReady = "true";

(() => {
  const productionHosts = new Set(["smarttrailerbuyer.com", "www.smarttrailerbuyer.com"]);

  if (!productionHosts.has(window.location.hostname)) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "/_vercel/insights/script.js";
  document.head.append(script);
})();
