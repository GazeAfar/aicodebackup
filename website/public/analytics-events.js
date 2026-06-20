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
    if (anchor.closest(".mobile-nav-panel")) return "mobile_nav";
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

  function setupMobileMenu() {
    const nav = document.querySelector(".site-header .nav");
    const navLinks = nav?.querySelector(".nav-links");

    if (!nav || !navLinks || nav.querySelector(".mobile-menu-toggle")) {
      return;
    }

    const isChinesePage = document.documentElement.lang === "zh-CN";
    const toggle = document.createElement("button");
    const panel = document.createElement("div");
    const panelLinks = document.createElement("div");

    toggle.type = "button";
    toggle.className = "mobile-menu-toggle";
    toggle.setAttribute("aria-label", isChinesePage ? "打开导航菜单" : "Open navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span><span></span><span></span>";

    panel.className = "mobile-nav-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", isChinesePage ? "移动端导航" : "Mobile navigation");

    panelLinks.className = "mobile-nav-list";
    for (const anchor of navLinks.querySelectorAll("a[href]")) {
      panelLinks.append(anchor.cloneNode(true));
    }

    panel.append(panelLinks);
    nav.append(toggle, panel);

    function setOpen(isOpen) {
      panel.hidden = !isOpen;
      nav.classList.toggle("mobile-menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen
        ? isChinesePage ? "关闭导航菜单" : "Close navigation menu"
        : isChinesePage ? "打开导航菜单" : "Open navigation menu");
    }

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(panel.hidden);
    });

    panel.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        setOpen(false);
      }
    });

    panel.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a[href]")) {
        window.setTimeout(() => setOpen(false), 0);
      }
    });

    let activeTouchPointerId = null;

    panel.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") {
        activeTouchPointerId = event.pointerId;
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (panel.hidden || !(event.target instanceof Element)) {
        return;
      }

      if (!panel.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("pointermove", (event) => {
      if (panel.hidden || event.pointerType !== "touch" || event.pointerId !== activeTouchPointerId) {
        return;
      }

      const currentTarget = document.elementFromPoint(event.clientX, event.clientY);
      if (currentTarget instanceof Element && !panel.contains(currentTarget) && !toggle.contains(currentTarget)) {
        setOpen(false);
      }
    });

    document.addEventListener("pointerup", (event) => {
      if (event.pointerId === activeTouchPointerId) {
        activeTouchPointerId = null;
      }
    });

    document.addEventListener("pointercancel", (event) => {
      if (event.pointerId === activeTouchPointerId) {
        activeTouchPointerId = null;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  setupMobileMenu();

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
