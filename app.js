/* ==========================================================
   JB INTELLIGENT — Master Controller & Interactive Engine
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initBackgroundCanvas();
  initSoundEngine();
  initPortfolioShowcase();
  initOrderEngine();
  initFaqAccordion();
});

/* ==========================================================
   1. BACKGROUND NEURAL / CONSTELLATION CANVAS
   ========================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/attraction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================
   2. SOUND SYNTHESIZER (WEB AUDIO API)
   ========================================================== */
let audioCtx = null;
let soundEnabled = false;

function initSoundEngine() {
  const soundBtn = document.getElementById("sound-toggle-btn");
  if (!soundBtn) return;

  const savedSound = localStorage.getItem("jb_sound_enabled");
  if (savedSound === "true") {
    enableSoundUI(soundBtn);
  }

  soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem("jb_sound_enabled", soundEnabled);
    if (soundEnabled) {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      enableSoundUI(soundBtn);
      playClickSound(580, 0.05);
      showToast("Ovoz effektlari yoqildi 🔊");
    } else {
      disableSoundUI(soundBtn);
      showToast("Ovoz effektlari o'chirildi 🔇");
    }
  });
}

function enableSoundUI(btn) {
  soundEnabled = true;
  btn.classList.add("is-active");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
    <span>FX: ON</span>
  `;
}

function disableSoundUI(btn) {
  soundEnabled = false;
  btn.classList.remove("is-active");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
    <span>FX: OFF</span>
  `;
}

function playClickSound(freq = 520, duration = 0.04) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio context may be restricted
  }
}

/* ==========================================================
   3. PORTFOLIO SHOWCASE RENDERING & FILTERING
   ========================================================== */
function initPortfolioShowcase() {
  const grid = document.getElementById("portfolio-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!grid || !window.PROJECTS_DATA) return;

  function renderProjects(filter = "all") {
    grid.innerHTML = "";
    const filtered = filter === "all" 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach((p) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.dataset.id = p.id;

      const techBadges = p.tech.map(t => `<span class="tech-pill">${t}</span>`).join("");
      const metricsHtml = p.metrics.map(m => `
        <div class="project-metric">
          <div class="project-metric-val">${m.value}</div>
          <div class="project-metric-lbl">${m.label}</div>
        </div>
      `).join("");

      card.innerHTML = `
        <div class="project-header-visual">
          <div class="visual-pattern"></div>
          <span class="visual-badge-top">${p.badge}</span>
          <span class="visual-date-top">${p.date}</span>
          <div class="project-symbol">
            ${getProjectIconSvg(p.category)}
          </div>
        </div>
        <div class="project-body">
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-summary">${p.summary}</p>
          
          <div class="project-metrics-row">
            ${metricsHtml}
          </div>

          <div class="project-tech-pills">
            ${techBadges}
          </div>

          <div class="project-card-actions">
            ${p.liveUrl.startsWith("http") ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-demo" onclick="playClickSound(640)">
                <span>Jonli Ko'rish</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ` : `
              <a href="${p.liveUrl}" class="btn-demo" onclick="playClickSound(640)">
                <span>Konfigurator</span>
              </a>
            `}
            <button class="btn-detail" onclick="openProjectModal('${p.id}')">
              Batafsil
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderProjects("all");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      playClickSound(480);
      renderProjects(btn.dataset.filter);
    });
  });
}

function getProjectIconSvg(cat) {
  switch (cat) {
    case "saas":
      return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`;
    case "cad":
      return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`;
    case "web3d":
      return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`;
    case "ai":
      return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>`;
    default:
      return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg>`;
  }
}

/* ==========================================================
   4. PROJECT DETAIL MODAL
   ========================================================== */
window.openProjectModal = function(id) {
  playClickSound(520);
  const project = PROJECTS_DATA.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-body");
  if (!modal || !modalContent) return;

  const highlightsList = project.highlights.map(h => `
    <li style="display:flex; align-items:flex-start; gap:10px; margin-bottom:8px; font-size:0.9rem; color:var(--text-secondary);">
      <span style="color:var(--emerald); flex-shrink:0;">✔</span>
      <span>${h}</span>
    </li>
  `).join("");

  const techBadges = project.tech.map(t => `<span class="tech-pill">${t}</span>`).join("");

  modalContent.innerHTML = `
    <div style="margin-bottom:20px;">
      <span class="visual-badge-top" style="position:static; margin-bottom:10px; display:inline-block;">${project.badge}</span>
      <h2 style="font-size:1.8rem; font-weight:800; margin-bottom:8px;">${project.title}</h2>
      <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6;">${project.description}</p>
    </div>

    <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:18px; margin-bottom:24px;">
      <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:12px; color:var(--emerald-light);">Asosiy Imkoniyatlar va Yechimlar:</h4>
      <ul style="list-style:none;">
        ${highlightsList}
      </ul>
    </div>

    <div style="margin-bottom:24px;">
      <h4 style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-dim); text-transform:uppercase; margin-bottom:10px;">Texnologiyalar Steki:</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${techBadges}
      </div>
    </div>

    <div style="display:flex; gap:14px; flex-wrap:wrap; align-items:center; border-top:1px solid var(--border-subtle); padding-top:20px;">
      ${project.liveUrl.startsWith("http") ? `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex:1;">
          <span>Jonli Saytni Ochish</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      ` : `
        <a href="#order-section" class="btn-primary" style="flex:1;" onclick="closeModals()">
          <span>Ushbu Loyihaga O'xshash Buyurtma Berish</span>
        </a>
      `}
      <button class="btn-secondary" onclick="closeModals()">Yopish</button>
    </div>
  `;

  modal.classList.add("open");
};

window.closeModals = function() {
  playClickSound(400);
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

/* ==========================================================
   5. ORDER ENGINE & REAL-TIME CALCULATOR
   ========================================================== */
let orderState = {
  serviceId: "landing",
  scaleMultiplier: 1.0,
  scaleName: "MVP / Start",
  addons: new Set(),
  name: "",
  contact: "",
  timing: "Zudlik bilan (1-2 kun ichida)",
  brief: ""
};

function initOrderEngine() {
  const serviceOptions = document.querySelectorAll(".service-option-card");
  const scaleCards = document.querySelectorAll(".scale-card");
  const addonCards = document.querySelectorAll(".addon-card");
  
  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");
  const timingSelect = document.getElementById("order-client-timing");
  const briefInput = document.getElementById("order-client-brief");

  const btnSubmitTelegram = document.getElementById("btn-submit-telegram");
  const btnSubmitSite = document.getElementById("btn-submit-site");

  // Service Selection
  serviceOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      serviceOptions.forEach(s => s.classList.remove("selected"));
      opt.classList.add("selected");
      orderState.serviceId = opt.dataset.service;
      playClickSound(560);
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
      playClickSound(520);
      recalculateOrder();
    });
  });

  // Addons Selection
  addonCards.forEach(card => {
    card.addEventListener("click", () => {
      const addonId = card.dataset.addon;
      if (orderState.addons.has(addonId)) {
        orderState.addons.delete(addonId);
        card.classList.remove("selected");
        playClickSound(440);
      } else {
        orderState.addons.add(addonId);
        card.classList.add("selected");
        playClickSound(620);
      }
      recalculateOrder();
    });
  });

  // Input Listeners
  if (nameInput) nameInput.addEventListener("input", (e) => orderState.name = e.target.value.trim());
  if (contactInput) contactInput.addEventListener("input", (e) => orderState.contact = e.target.value.trim());
  if (timingSelect) timingSelect.addEventListener("change", (e) => orderState.timing = e.target.value);
  if (briefInput) briefInput.addEventListener("input", (e) => orderState.brief = e.target.value.trim());

  // Submit via Telegram
  if (btnSubmitTelegram) {
    btnSubmitTelegram.addEventListener("click", handleTelegramOrder);
  }

  // Submit via Site
  if (btnSubmitSite) {
    btnSubmitSite.addEventListener("click", handleSiteOrder);
  }

  // Initial Calculation
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

  // Calculation formula
  const calculatedMin = Math.round(baseP * orderState.scaleMultiplier + addonPriceTotal);
  const calculatedMax = Math.round(calculatedMin * 1.25);
  const calculatedDays = Math.round(baseD * (orderState.scaleMultiplier >= 1.5 ? 1.35 : 1.0) + addonDaysTotal);

  // Update DOM Elements
  const priceDisplay = document.getElementById("calc-price-display");
  const daysDisplay = document.getElementById("calc-days-display");
  const specService = document.getElementById("spec-service-name");
  const specScale = document.getElementById("spec-scale-name");
  const specAddons = document.getElementById("spec-addons-count");

  if (priceDisplay) priceDisplay.textContent = `$${calculatedMin} – $${calculatedMax}`;
  if (daysDisplay) daysDisplay.textContent = `⏱ Taxminiy muddat: ${calculatedDays} ish kuni`;
  if (specService) specService.textContent = currentService.name;
  if (specScale) specScale.textContent = orderState.scaleName;
  if (specAddons) specAddons.textContent = orderState.addons.size > 0 ? `${orderState.addons.size} ta tanlandi` : "Tanlanmagan";

  // Store computed values in state
  orderState.calculatedMin = calculatedMin;
  orderState.calculatedMax = calculatedMax;
  orderState.calculatedDays = calculatedDays;
  orderState.serviceName = currentService.name;
  orderState.addonNames = addonNames;
}

function validateInputs() {
  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");
  
  let isValid = true;
  if (!orderState.name) {
    nameInput.style.borderColor = "#ef4444";
    isValid = false;
  } else {
    nameInput.style.borderColor = "";
  }

  if (!orderState.contact) {
    contactInput.style.borderColor = "#ef4444";
    isValid = false;
  } else {
    contactInput.style.borderColor = "";
  }

  if (!isValid) {
    showToast("Iltimos, ism va aloqa ma'lumotlarini kiriting ⚠️");
    playClickSound(300);
  }
  return isValid;
}

function generateOrderCode() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `JBI-2026-${rand}`;
}

function handleTelegramOrder() {
  if (!validateInputs()) return;
  playClickSound(680);

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
💰 Smeta: $${orderState.calculatedMin} – $${orderState.calculatedMax}
⏱ Muddat: ${orderState.calculatedDays} ish kuni
⏳ Boshlash: ${orderState.timing}
📝 Loyiha tavsifi: ${briefText}
━━━━━━━━━━━━━━━━━━━━
Sayt: jb-intelligent.vercel.app`;

  saveOrderToStorage(code, message);

  const encodedMsg = encodeURIComponent(message);
  const telegramUrl = `https://t.me/javohirbro?text=${encodedMsg}`;
  
  // Show confirmation modal as well
  openOrderReceiptModal(code, message);

  // Open Telegram in new tab
  window.open(telegramUrl, "_blank");
}

function handleSiteOrder() {
  if (!validateInputs()) return;
  playClickSound(680);

  const code = generateOrderCode();
  const addonsText = orderState.addonNames.length > 0 ? orderState.addonNames.join(", ") : "Standart to'plam";
  const briefText = orderState.brief ? orderState.brief : "Konsultatsiya davomida muhokama qilinadi";

  const summary = `Buyurtma Kodi: ${code}
Buyurtmachi: ${orderState.name}
Aloqa: ${orderState.contact}
Xizmat: ${orderState.serviceName} (${orderState.scaleName})
Smeta: $${orderState.calculatedMin} – $${orderState.calculatedMax}
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
  } catch (e) {
    console.warn("Storage save error", e);
  }
}

function openOrderReceiptModal(code, summaryText) {
  const modal = document.getElementById("receipt-modal");
  const modalContent = document.getElementById("receipt-modal-body");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="text-align:center; margin-bottom:24px;">
      <div style="width:64px; height:64px; border-radius:50%; background:rgba(16,185,129,0.15); border:1px solid var(--emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:var(--emerald-light);">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h2 style="font-size:1.6rem; font-weight:800; margin-bottom:6px;">Buyurtmangiz Qabul Qilindi!</h2>
      <p style="font-size:0.9rem; color:var(--text-secondary);">Mutaxassis 15 daqiqa ichida siz bilan bog'lanadi.</p>
    </div>

    <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:16px; margin-bottom:20px; font-family:var(--font-mono); font-size:0.85rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:var(--emerald-light); font-weight:700;">
        <span>Chipta Kodi:</span>
        <span>${code}</span>
      </div>
      <div style="white-space:pre-wrap; color:var(--text-secondary); line-height:1.5;">${summaryText}</div>
    </div>

    <div style="display:flex; gap:12px; flex-direction:column;">
      <button class="btn-primary" onclick="copyReceiptText('${encodeURIComponent(summaryText)}')">
        <span>📋 Chiptani Nusxa Olish</span>
      </button>
      <a href="https://t.me/javohirbro" target="_blank" rel="noopener noreferrer" class="btn-order-telegram" style="width:100%; text-decoration:none;">
        <span>Telegramda Javohirbek bilan Bog'lanish</span>
      </a>
      <button class="btn-secondary" onclick="closeModals()">Yopish</button>
    </div>
  `;

  modal.classList.add("open");
}

window.copyReceiptText = function(encoded) {
  const text = decodeURIComponent(encoded);
  navigator.clipboard.writeText(text).then(() => {
    playClickSound(720);
    showToast("Buyurtma matni nusxalandi! 📋");
  });
};

/* ==========================================================
   6. FAQ ACCORDION
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach(f => f.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
        playClickSound(500);
      } else {
        playClickSound(400);
      }
    });
  });
}

/* ==========================================================
   7. TOAST NOTIFICATION
   ========================================================== */
function showToast(msg) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
