/* global document, Element, navigator, window */

(() => {
  const installCommandId = "install-command";
  const trackedPackageUrl = "https://www.npmjs.com/package/aicodebackup";
  const trackedRepoUrl = "https://github.com/GazeAfar/aicodebackup";

  function baseParams(params = {}) {
    return {
      page_path: window.location.pathname,
      page_title: document.title,
      page_language: document.documentElement.lang || "unknown",
      ...params,
    };
  }

  function track(eventName, params = {}) {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", eventName, baseParams({
      transport_type: "beacon",
      ...params,
    }));
  }

  function cleanText(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function linkLocation(anchor) {
    if (anchor.closest(".hero-actions")) return "hero";
    if (anchor.closest(".nav")) return "nav";
    if (anchor.closest(".footer-main")) return "footer";
    if (anchor.closest(".resource-grid")) return "resource_grid";
    if (anchor.closest(".content-card-list")) return "guide_list";
    if (anchor.closest(".content-page")) return "content";
    return "body";
  }

  function normalizedUrl(url) {
    return url.replace(/\/$/, "");
  }

  function linkParams(anchor) {
    return {
      link_url: anchor.href || anchor.getAttribute("href") || "",
      link_text: cleanText(anchor),
      link_location: linkLocation(anchor),
    };
  }

  function trackLink(anchor) {
    const href = anchor.href || anchor.getAttribute("href") || "";
    const params = linkParams(anchor);

    if (anchor.classList.contains("language-switch")) {
      track("switch_language", {
        ...params,
        target_language: anchor.getAttribute("hreflang") || anchor.getAttribute("lang") || "unknown",
      });
    }

    if (anchor.closest(".hero-actions") && anchor.classList.contains("primary")) {
      track("click_primary_cta", {
        ...params,
        cta_name: cleanText(anchor),
        cta_target: "npm_package",
      });
    }

    if (href.startsWith(trackedPackageUrl)) {
      track("click_npm_package", params);
    }

    if (normalizedUrl(href) === trackedRepoUrl) {
      track("click_github_repo", params);
    }

    if (href.startsWith("mailto:")) {
      track("click_email_contact", {
        ...params,
        contact_method: "email",
      });
    }
  }

  async function copyInstallCommand() {
    const commandElement = document.getElementById(installCommandId);
    const commandText = cleanText(commandElement || document.body);

    if (!commandElement || !commandText) {
      return;
    }

    try {
      await navigator.clipboard?.writeText(commandText);
    } catch {
      // Tracking should still work when clipboard permissions are unavailable.
    }

    track("copy_install_command", {
      command_name: "install_alpha",
      command_text: commandText,
    });
  }

  function isInstallCommandControl(element) {
    const control = element.closest(`[data-analytics-copy="${installCommandId}"], .command-line`);
    return Boolean(control?.querySelector(`#${installCommandId}`));
  }

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (isInstallCommandControl(target)) {
      copyInstallCommand();
      return;
    }

    const anchor = target.closest("a[href]");
    if (anchor) {
      trackLink(anchor);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const target = event.target;

    if (target instanceof Element && isInstallCommandControl(target)) {
      event.preventDefault();
      copyInstallCommand();
    }
  });
})();
