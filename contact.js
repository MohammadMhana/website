(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const todayEl = document.getElementById("today");
  if (todayEl) {
    const now = new Date();
    const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    todayEl.textContent = now.toLocaleDateString("ar", opts);
  }

  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const form = document.getElementById("contactForm");
  const success = document.getElementById("successMsg");
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const msgEl = document.getElementById("message");
  const errName = document.getElementById("errName");
  const errEmail = document.getElementById("errEmail");
  const errMessage = document.getElementById("errMessage");

  function setError(el, msg){ if(el) el.textContent = msg || ""; }
  function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (success) success.textContent = "";

      const name = (nameEl?.value || "").trim();
      const email = (emailEl?.value || "").trim();
      const message = (msgEl?.value || "").trim();

      let ok = true;

      if (!name) { setError(errName, "الرجاء إدخال الاسم."); ok = false; } else setError(errName, "");
      if (!email) { setError(errEmail, "الرجاء إدخال البريد الإلكتروني."); ok = false; }
      else if (!isEmail(email)) { setError(errEmail, "البريد غير صحيح."); ok = false; }
      else setError(errEmail, "");

      if (!message) { setError(errMessage, "الرجاء كتابة الرسالة."); ok = false; } else setError(errMessage, "");
      if (!ok) return;

      if (success) success.textContent = "تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.";
      form.reset();
    });

    form.addEventListener("reset", () => {
      setError(errName, "");
      setError(errEmail, "");
      setError(errMessage, "");
      if (success) success.textContent = "";
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