(function () {
  // سنة الفوتر
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // قائمة الهاتف
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // تغيير حجم الخط
  (function () {
    const MIN = 0.85;
    const MAX = 1.35;
    const STEP = 0.10;
    const KEY = "lh_font_scale";

    const statusEl = document.getElementById("fontStatus");
    const buttons = Array.from(document.querySelectorAll("[data-font]"));

    function clamp(v) { return Math.max(MIN, Math.min(MAX, v)); }

    function applyScale(scale) {
      const s = clamp(scale);
      document.documentElement.style.setProperty("--font-scale", String(s));
      localStorage.setItem(KEY, String(s));
      if (statusEl) statusEl.textContent = `حجم النص: ${Math.round(s * 100)}%`;
    }

    const saved = parseFloat(localStorage.getItem(KEY) || "1");
    applyScale(isNaN(saved) ? 1 : saved);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-font");
        const current =
          parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-scale")) || 1;

        if (action === "up") applyScale(current + STEP);
        if (action === "down") applyScale(current - STEP);
        if (action === "reset") applyScale(1);
      });
    });
  })();

  // الوضع الليلي
  (function () {
    const KEY = "lh_theme";
    const btn = document.getElementById("themeToggle");

    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(KEY, theme);
      if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    const saved = localStorage.getItem(KEY) || "light";
    setTheme(saved);

    if (btn) {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        setTheme(current === "dark" ? "light" : "dark");
      });
    }
  })();
})();