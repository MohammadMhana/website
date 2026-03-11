(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("nav--open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const chips = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll("#packagesGrid .card"));

  function setActiveChip(active) {
    chips.forEach(c => c.classList.toggle("chip--active", c === active));
  }

  function applyFilter(type) {
    cards.forEach(card => {
      const t = card.getAttribute("data-type");
      const show = (type === "all") || (t === type);
      card.style.display = show ? "" : "none";
    });
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const type = chip.getAttribute("data-filter");
      setActiveChip(chip);
      applyFilter(type);
    });
  });

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");

  const detailsMap = {
    premium: `
      <p><strong>الحزمة المميزة:</strong></p>
      <ul>
        <li>المشي أربعة مرات / ممارسة أربعة أنشطة يومياً</li>
        <li>ساحة عشب خاصة</li>
        <li>تحديثات / صور يومية</li>
        <li>مكافآت (على النحو المتفق عليه مع صاحب الحيوان الأليف)</li>
      </ul>
    `,
    classic: `
      <p><strong>الحزمة الكلاسيكية:</strong></p>
      <ul>
        <li>المشي ثلاثة مرات / ممارسة ثلاثة أنشطة يومياً</li>
        <li>حظيرة لعب داخلية</li>
        <li>منطقة للاسترخاء</li>
        <li>جلسة حلاقة وتنظيف</li>
      </ul>
    `,
    day: `
      <p><strong>حزمة اليوم:</strong></p>
      <ul>
        <li>المشي مرتين يومياً</li>
        <li>منطقة لعب خارجية</li>
        <li>مسار الرشاقة</li>
        <li>نفق الرمل</li>
      </ul>
    `
  };

  function openModal(key){
    if (!modal || !modalBody) return;
    modalBody.innerHTML = detailsMap[key] || "<p>لا توجد تفاصيل إضافية.</p>";
    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden","false");
  }

  function closeModal(){
    if (!modal) return;
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden","true");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-details]");
    if (btn) openModal(btn.getAttribute("data-details"));

    const close = e.target.closest("[data-close]");
    if (close) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

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