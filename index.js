(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const todayEl = document.getElementById("today");
  if (todayEl) {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    todayEl.textContent = now.toLocaleDateString("ar", options);
  }

  const noteEl = document.getElementById("welcomeNote");
  if (noteEl) noteEl.textContent = "مرحبًا! يمكنك البدء باستعراض الحزم أو التواصل معنا مباشرة.";

  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function initFontTool(){
    const MIN=0.85, MAX=1.35, STEP=0.10, KEY="lh_font_scale";
    const statusEl=document.getElementById("fontStatus");
    const buttons=[...document.querySelectorAll("[data-font]")];
    const clamp=v=>Math.max(MIN,Math.min(MAX,v));

    const apply=scale=>{
      const s=clamp(scale);
      document.documentElement.style.setProperty("--font-scale", String(s));
      localStorage.setItem(KEY, String(s));
      if(statusEl) statusEl.textContent=`حجم النص: ${Math.round(s*100)}%`;
    };

    const saved=parseFloat(localStorage.getItem(KEY) || "1");
    apply(isNaN(saved)?1:saved);

    buttons.forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const action=btn.getAttribute("data-font");
        const current=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-scale")) || 1;
        if(action==="up") apply(current+STEP);
        if(action==="down") apply(current-STEP);
        if(action==="reset") apply(1);
      });
    });
  }

  initFontTool();
})();