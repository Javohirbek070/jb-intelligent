/* ==========================================================
   JB INTELLIGENT — Master Controller & Interactive Engine
   Crafted strictly to ui-ux-pro-max specifications
   Lightweight, Zero-Slop, High-Performance Production Code
   ========================================================== */

let currentLang = localStorage.getItem("jb_lang") || "uz";
let currentCurrency = localStorage.getItem("jb_currency") || "usd";
let currentTheme = localStorage.getItem("jb_theme") || "light";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initI18nAndCurrency();
  initBentoShowcase();
  initOrderEngine();
  initFaqAccordion();
});

/* ==========================================================
   1. THEME CONTROLLER (Light Default / High-Contrast Dark)
   ========================================================== */
function initTheme() {
  const html = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle-btn");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");

  function applyTheme(theme) {
    currentTheme = theme;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("jb_theme", theme);

    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    }
  }

  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }
}

/* ==========================================================
   2. I18N AND CURRENCY ENGINE
   ========================================================== */
function initI18nAndCurrency() {
  const langBtns = document.querySelectorAll("[data-lang-btn]");
  const currBtns = document.querySelectorAll("[data-curr-btn]");

  langBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.langBtn === currentLang);
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.langBtn;
      localStorage.setItem("jb_lang", currentLang);
      langBtns.forEach(b => b.classList.toggle("active", b.dataset.langBtn === currentLang));
      applyLanguage(currentLang);
      if (typeof recalculateOrder === "function") recalculateOrder();
    });
  });

  currBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.currBtn === currentCurrency);
    btn.addEventListener("click", () => {
      currentCurrency = btn.dataset.currBtn;
      localStorage.setItem("jb_currency", currentCurrency);
      currBtns.forEach(b => b.classList.toggle("active", b.dataset.currBtn === currentCurrency));
      if (typeof recalculateOrder === "function") recalculateOrder();
    });
  });

  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.uz;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");
  const briefInput = document.getElementById("order-client-brief");

  if (nameInput && dict.namePlaceholder) nameInput.placeholder = dict.namePlaceholder;
  if (contactInput && dict.contactPlaceholder) contactInput.placeholder = dict.contactPlaceholder;
  if (briefInput && dict.briefPlaceholder) briefInput.placeholder = dict.briefPlaceholder;
}

function formatPrice(usdAmount) {
  if (currentCurrency === "uzs") {
    const uzs = Math.round(usdAmount * USD_TO_UZS_RATE);
    return uzs.toLocaleString("uz-UZ") + " so'm";
  }
  return "$" + usdAmount.toLocaleString("en-US");
}

/* ==========================================================
   3. BENTO GRID PORTFOLIO SHOWCASE
   ========================================================== */
function initBentoShowcase() {
  const grid = document.getElementById("bento-projects-grid");
  const filterBtns = document.querySelectorAll("[data-filter]");
  if (!grid) return;

  function renderBentoProjects(categoryFilter = "all") {
    grid.innerHTML = "";
    const filtered = categoryFilter === "all" 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === categoryFilter);

    const dict = I18N[currentLang] || I18N.uz;

    filtered.forEach((p, idx) => {
      const card = document.createElement("article");
      card.className = "bento-card";

      // Bento column spans: Flagships take 6 columns (half width), others take 4 columns (1/3 width)
      if (categoryFilter === "all") {
        if (p.id === "gymos" || p.id === "apexcut") {
          card.classList.add("col-span-6");
        } else {
          card.classList.add("col-span-4");
        }
      } else {
        card.classList.add("col-span-6");
      }

      // Tech tags
      const techBadges = p.tech.slice(0, 4).map(t => `<span class="tech-chip">${t}</span>`).join("");

      // Metrics pills
      const metricsHtml = p.metrics.map(m => `
        <div class="metric-pill">
          <span class="metric-pill-val">${m.value}</span>
          <span class="metric-pill-lbl">${m.label}</span>
        </div>
      `).join("");

      card.innerHTML = `
        <div class="card-header-bar">
          <span class="card-category-badge">
            ${getCategoryIconSvg(p.category)}
            <span>${p.categoryLabel}</span>
          </span>
          <span class="card-date">${p.date}</span>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-summary">${p.summary}</p>

        <div class="card-metrics-row">
          ${metricsHtml}
        </div>

        <div class="card-tech-chips">
          ${techBadges}
        </div>

        <div class="card-actions-bar">
          ${p.liveUrl.startsWith("http") ? `
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex:1;">
              <span>${dict.liveDemoBtn}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : `
            <a href="#order-section" class="btn btn-primary btn-sm" style="flex:1;">
              <span>Buyurtma Qilish</span>
            </a>
          `}
          <button type="button" class="btn btn-secondary btn-sm" onclick="openProjectModal('${p.id}')">
            ${dict.detailsBtn}
          </button>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  renderBentoProjects("all");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderBentoProjects(btn.dataset.filter);
    });
  });
}

function getCategoryIconSvg(cat) {
  switch (cat) {
    case "saas":
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`;
    case "cad":
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="9" y1="21" x2="9" y2="9"></line></svg>`;
    case "web3d":
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`;
    case "ai":
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M12 8V4H8"></path></svg>`;
    default:
      return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle></svg>`;
  }
}

/* ==========================================================
   4. PROJECT DETAILS MODAL
   ========================================================== */
window.openProjectModal = function(id) {
  const project = PROJECTS_DATA.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-body");
  if (!modal || !modalContent) return;

  const highlightsList = project.highlights.map(h => `
    <li style="display:flex; align-items:flex-start; gap:10px; margin-bottom:8px; font-size:0.925rem; color:var(--color-foreground);">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--color-primary); flex-shrink:0; margin-top:3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${h}</span>
    </li>
  `).join("");

  const techBadges = project.tech.map(t => `<span class="tech-chip" style="font-size:0.8125rem; padding:4px 10px;">${t}</span>`).join("");

  const archNodes = project.architecture ? project.architecture.map(a => `
    <div style="background:var(--color-card-muted); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:10px 14px;">
      <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--color-primary); font-weight:700;">${a.name}</div>
      <div style="font-size:0.875rem; color:var(--color-foreground); font-weight:500;">${a.tech}</div>
    </div>
  `).join("") : "";

  modalContent.innerHTML = `
    <div style="margin-bottom:16px;">
      <span class="card-category-badge" style="margin-bottom:8px;">${project.badge}</span>
      <h2 id="modal-project-title" style="font-size:1.6rem; font-weight:800; margin-bottom:8px; color:var(--color-foreground);">${project.title}</h2>
      <p style="font-size:0.95rem; color:var(--color-muted-foreground); line-height:1.6;">${project.description}</p>
    </div>

    <div style="background:var(--color-card-muted); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:16px; margin-bottom:20px;">
      <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:10px; color:var(--color-foreground);">Asosiy Imkoniyatlar & Yechimlar:</h4>
      <ul style="list-style:none;">
        ${highlightsList}
      </ul>
    </div>

    ${archNodes ? `
      <div style="margin-bottom:20px;">
        <h4 style="font-size:0.8125rem; font-family:var(--font-mono); color:var(--color-muted-foreground); text-transform:uppercase; margin-bottom:8px;">Texnik Arxitektura:</h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
          ${archNodes}
        </div>
      </div>
    ` : ''}

    <div style="margin-bottom:24px;">
      <h4 style="font-size:0.8125rem; font-family:var(--font-mono); color:var(--color-muted-foreground); text-transform:uppercase; margin-bottom:8px;">Texnologiyalar Steki:</h4>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${techBadges}
      </div>
    </div>

    <div style="display:flex; gap:12px; align-items:center; border-top:1px solid var(--color-border); padding-top:16px;">
      ${project.liveUrl.startsWith("http") ? `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex:1;">
          <span>Jonli Saytni Ochish</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      ` : `
        <a href="#order-section" class="btn btn-primary" style="flex:1;" onclick="closeModals()">
          <span>Ushbu Loyihani Buyurtma Qilish</span>
        </a>
      `}
      <button class="btn btn-secondary" onclick="closeModals()">Yopish</button>
    </div>
  `;

  modal.classList.add("open");
};

window.closeModals = function() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

/* ==========================================================
   5. ORDER ENGINE: LINEAR-GRADE CONFIGURATOR
   ========================================================== */
let orderState = {
  serviceId: "landing",
  scaleMultiplier: 1.0,
  scaleName: "MVP Starter",
  addons: new Set(),
  name: "",
  contact: "",
  timing: "Zudlik bilan (1-2 kun ichida)",
  brief: ""
};

function initOrderEngine() {
  const serviceOptions = document.querySelectorAll(".service-choice-card");
  const scaleCards = document.querySelectorAll(".tier-card");
  const addonRows = document.querySelectorAll(".addon-row");

  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");
  const timingSelect = document.getElementById("order-client-timing");
  const briefInput = document.getElementById("order-client-brief");

  const btnSubmitTelegram = document.getElementById("btn-submit-telegram");
  const btnSubmitSite = document.getElementById("btn-submit-site");
  const btnPrintQuote = document.getElementById("btn-print-quote");

  // Service Selection
  serviceOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      serviceOptions.forEach(s => s.classList.remove("selected"));
      opt.classList.add("selected");
      orderState.serviceId = opt.dataset.service;
      recalculateOrder();
    });
  });

  // Scale Selection
  scaleCards.forEach(card => {
    card.addEventListener("click", () => {
      scaleCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      orderState.scaleMultiplier = parseFloat(card.dataset.mult);
      orderState.scaleName = card.dataset.name;
      recalculateOrder();
    });
  });

  // Addon Toggles
  addonRows.forEach(row => {
    row.addEventListener("click", () => {
      const addonId = row.dataset.addon;
      if (orderState.addons.has(addonId)) {
        orderState.addons.delete(addonId);
        row.classList.remove("selected");
      } else {
        orderState.addons.add(addonId);
        row.classList.add("selected");
      }
      recalculateOrder();
    });
  });

  if (nameInput) nameInput.addEventListener("input", (e) => orderState.name = e.target.value.trim());
  if (contactInput) contactInput.addEventListener("input", (e) => orderState.contact = e.target.value.trim());
  if (timingSelect) timingSelect.addEventListener("change", (e) => orderState.timing = e.target.value);
  if (briefInput) briefInput.addEventListener("input", (e) => orderState.brief = e.target.value.trim());

  if (btnSubmitTelegram) btnSubmitTelegram.addEventListener("click", handleTelegramOrder);
  if (btnSubmitSite) btnSubmitSite.addEventListener("click", handleSiteOrder);
  if (btnPrintQuote) btnPrintQuote.addEventListener("click", generatePrintableQuotation);

  recalculateOrder();
}

function recalculateOrder() {
  const currentService = SERVICES_CATALOG.find(s => s.id === orderState.serviceId) || SERVICES_CATALOG[0];

  let addonPriceTotal = 0;
  let addonDaysTotal = 0;
  let addonNames = [];

  orderState.addons.forEach(aid => {
    const addon = ADDONS_CATALOG.find(a => a.id === aid);
    if (addon) {
      addonPriceTotal += addon.price;
      addonDaysTotal += addon.days;
      addonNames.push(addon.name);
    }
  });

  const baseP = currentService.basePrice;
  const baseD = currentService.baseDays;

  const calculatedMinUsd = Math.round(baseP * orderState.scaleMultiplier + addonPriceTotal);
  const calculatedMaxUsd = Math.round(calculatedMinUsd * 1.25);
  const calculatedDays = Math.round(baseD * (orderState.scaleMultiplier >= 1.4 ? 1.3 : 1.0) + addonDaysTotal);

  const dict = I18N[currentLang] || I18N.uz;

  const priceDisplay = document.getElementById("calc-price-display");
  const daysDisplay = document.getElementById("calc-days-display");
  const specService = document.getElementById("spec-service-name");
  const specScale = document.getElementById("spec-scale-name");
  const specAddons = document.getElementById("spec-addons-count");

  if (priceDisplay) {
    priceDisplay.textContent = `${formatPrice(calculatedMinUsd)} – ${formatPrice(calculatedMaxUsd)}`;
  }
  if (daysDisplay) {
    daysDisplay.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
      <span>${dict.daysPrefix} ${calculatedDays} ${dict.daysSuffix}</span>
    `;
  }
  if (specService) specService.textContent = currentService.name;
  if (specScale) specScale.textContent = orderState.scaleName;
  if (specAddons) {
    specAddons.textContent = orderState.addons.size > 0 ? `${orderState.addons.size} ta modul tanlandi` : "Standart";
  }

  orderState.calculatedMin = calculatedMinUsd;
  orderState.calculatedMax = calculatedMaxUsd;
  orderState.calculatedDays = calculatedDays;
  orderState.serviceName = currentService.name;
  orderState.addonNames = addonNames;
}

function validateInputs() {
  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");

  let isValid = true;
  if (!orderState.name) {
    nameInput.style.borderColor = "#dc2626";
    nameInput.focus();
    isValid = false;
  } else {
    nameInput.style.borderColor = "";
  }

  if (!orderState.contact) {
    contactInput.style.borderColor = "#dc2626";
    if (isValid) contactInput.focus();
    isValid = false;
  } else {
    contactInput.style.borderColor = "";
  }

  if (!isValid) {
    showToast("Iltimos, ismingiz va aloqa ma'lumotingizni kiriting!");
  }
  return isValid;
}

function generateOrderCode() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `JBI-2026-${rand}`;
}

/* ==========================================================
   6. TELEGRAM ROUTING & ORDER RECEIPT MODAL
   Route directly to @the_javohirbek
   ========================================================== */
function handleTelegramOrder() {
  if (!validateInputs()) return;

  const code = generateOrderCode();
  const addonsText = orderState.addonNames.length > 0 ? orderState.addonNames.join(", ") : "Standart to'plam";
  const briefText = orderState.brief ? orderState.brief : "Konsultatsiya davomida muhokama qilinadi";

  const message = `🚀 YANGI BUYURTMA — JB INTELLIGENT
━━━━━━━━━━━━━━━━━━━━
🆔 Buyurtma Kodi: ${code}
👤 Buyurtmachi: ${orderState.name}
📞 Aloqa: ${orderState.contact}
📦 Xizmat: ${orderState.serviceName}
📊 Ko'lam: ${orderState.scaleName}
✨ Qo'shimchalar: ${addonsText}
💰 Smeta: ${formatPrice(orderState.calculatedMin)} – ${formatPrice(orderState.calculatedMax)}
⏱ Muddat: ${orderState.calculatedDays} ish kuni
⏳ Boshlash: ${orderState.timing}
📝 Loyiha tavsifi: ${briefText}
━━━━━━━━━━━━━━━━━━━━
Sayt: jb-intelligent.vercel.app`;

  saveOrderToStorage(code, message);

  // Directly routes to @the_javohirbek
  const encodedMsg = encodeURIComponent(message);
  const telegramUrl = `https://t.me/the_javohirbek?text=${encodedMsg}`;

  openOrderReceiptModal(code, message);
  window.open(telegramUrl, "_blank");
}

function handleSiteOrder() {
  if (!validateInputs()) return;

  const code = generateOrderCode();
  const addonsText = orderState.addonNames.length > 0 ? orderState.addonNames.join(", ") : "Standart to'plam";
  const briefText = orderState.brief ? orderState.brief : "Konsultatsiya davomida muhokama qilinadi";

  const summary = `Buyurtma Kodi: ${code}
Buyurtmachi: ${orderState.name}
Aloqa: ${orderState.contact}
Xizmat: ${orderState.serviceName} (${orderState.scaleName})
Smeta: ${formatPrice(orderState.calculatedMin)} – ${formatPrice(orderState.calculatedMax)}
Muddat: ${orderState.calculatedDays} ish kuni
Qo'shimchalar: ${addonsText}
Tavsif: ${briefText}`;

  saveOrderToStorage(code, summary);
  openOrderReceiptModal(code, summary);
}

function saveOrderToStorage(code, data) {
  try {
    const list = JSON.parse(localStorage.getItem("jb_orders_history") || "[]");
    list.unshift({ code, date: new Date().toISOString(), data });
    localStorage.setItem("jb_orders_history", JSON.stringify(list));
  } catch (e) {}
}

function openOrderReceiptModal(code, summaryText) {
  const modal = document.getElementById("receipt-modal");
  const modalContent = document.getElementById("receipt-modal-body");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="text-align:center; margin-bottom:20px;">
      <div style="width:56px; height:56px; border-radius:50%; background:var(--color-success-subtle); color:var(--color-success); display:flex; align-items:center; justify-content:center; margin:0 auto 12px;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h2 style="font-size:1.5rem; font-weight:800; margin-bottom:4px; color:var(--color-foreground);">Buyurtmangiz Qabul Qilindi!</h2>
      <p style="font-size:0.875rem; color:var(--color-muted-foreground);">Buyurtma Javohirbek (@the_javohirbek) tizimiga yuborildi.</p>
    </div>

    <div style="background:var(--color-card-muted); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:16px; margin-bottom:20px; font-family:var(--font-mono); font-size:0.8125rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-weight:700; color:var(--color-primary);">
        <span>Chipta Kodi:</span>
        <span>${code}</span>
      </div>
      <div style="white-space:pre-wrap; color:var(--color-foreground); line-height:1.5;">${summaryText}</div>
    </div>

    <div style="display:flex; flex-direction:column; gap:10px;">
      <a href="https://t.me/the_javohirbek" target="_blank" rel="noopener noreferrer" class="btn btn-dispatch-telegram btn-lg" style="text-decoration:none;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
        </svg>
        <span>Telegramda Yozish (@the_javohirbek)</span>
      </a>
      <button class="btn btn-secondary" onclick="closeModals()">Yopish</button>
    </div>
  `;

  modal.classList.add("open");
}

/* ==========================================================
   7. PRINTABLE QUOTATION GENERATOR
   ========================================================== */
function generatePrintableQuotation() {
  const code = generateOrderCode();
  const printWindow = window.open("", "_blank");
  const dateStr = new Date().toLocaleDateString("uz-UZ");

  const addonsHtml = orderState.addonNames.length > 0 
    ? orderState.addonNames.map(a => `<li>${a}</li>`).join("")
    : "<li>Standart to'plam</li>";

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8">
      <title>Tijoriy Taklif — ${code} | JB INTELLIGENT</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .brand { font-size: 24px; font-weight: 800; color: #2563eb; }
        .quote-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
        .price-total { font-size: 28px; font-weight: 800; color: #2563eb; margin: 15px 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
        th { background: #f1f5f9; font-weight: 700; }
        .footer { margin-top: 50px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">JB INTELLIGENT</div>
          <div>Dasturiy Muhandislik & Sun'iy Intellekt Studiyasi</div>
          <div>Telegram: @the_javohirbek | Sayt: jb-intelligent.vercel.app</div>
        </div>
        <div style="text-align: right;">
          <strong>Rasmiy Tijoriy Taklif</strong><br>
          Hujjat: ${code}<br>
          Sana: ${dateStr}
        </div>
      </div>

      <div class="quote-box">
        <h2 style="margin: 0 0 10px 0;">Loyiha Smetasi va Shartlari</h2>
        <div>Buyurtmachi: <strong>${orderState.name || "Hurmatli Mijoz"}</strong> (${orderState.contact || "Aloqa kutilmoqda"})</div>
        <div class="price-total">Taxminiy Qiymat: ${formatPrice(orderState.calculatedMin)} – ${formatPrice(orderState.calculatedMax)}</div>
        <div>Yetkazib berish muddati: <strong>${orderState.calculatedDays} ish kuni</strong></div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Yo'nalish</th>
            <th>Parametr</th>
            <th>Tafsilot</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Asosiy Xizmat</strong></td>
            <td>${orderState.serviceName}</td>
            <td>Dasturiy yechim ishlab chiqish</td>
          </tr>
          <tr>
            <td><strong>Loyiha Ko'lami</strong></td>
            <td>${orderState.scaleName}</td>
            <td>Arxitektura va funksionallik darajasi</td>
          </tr>
          <tr>
            <td><strong>Qo'shimcha Modullar</strong></td>
            <td colspan="2">
              <ul style="margin:0; padding-left:20px;">
                ${addonsHtml}
              </ul>
            </td>
          </tr>
          <tr>
            <td><strong>Kafolat</strong></td>
            <td>12 oy (1 yil)</td>
            <td>Bepul xatoliklarni bartaraf etish va texnik ko'mak</td>
          </tr>
          <tr>
            <td><strong>Mulkchilik</strong></td>
            <td>100% Manba Kodi</td>
            <td>Litsenziyasiz to'liq mijoz egaligiga topshiriladi</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        Taklif 14 kun davomida haqiqiydir. Tasdiqlash va ishni boshlash uchun: <strong>Telegram: @the_javohirbek</strong>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

/* ==========================================================
   8. FAQ ACCORDION ENGINE
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("open");
          const otherTrigger = other.querySelector(".faq-trigger");
          const otherContent = other.querySelector(".faq-content");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      } else {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/* ==========================================================
   9. TOAST NOTIFICATIONS
   ========================================================== */
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
