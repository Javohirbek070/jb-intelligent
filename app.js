/* ==========================================================
   JB INTELLIGENT — Master Controller & Interactive Engine v3.0
   Award-Grade / Anti-Slop / Peak UX Controller
   ========================================================== */

let currentLang = localStorage.getItem("jb_lang") || "uz";
let currentCurrency = localStorage.getItem("jb_currency") || "usd";

document.addEventListener("DOMContentLoaded", () => {
  init3DCoreCanvas();
  initSoundEngine();
  initI18nAndCurrency();
  initHeroHudConsole();
  initPortfolioShowcase();
  initOrderEngine();
  initFaqAccordion();
  initQuickDock();
});

/* ==========================================================
   1. 3D MATHEMATICAL WIREFRAME & NEURAL STARFIELD CANVAS
   ========================================================== */
function init3DCoreCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // 3D Icosahedron Geometry
  const phi = (1 + Math.sqrt(5)) / 2;
  const rawVertices = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ];

  const edges = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [1, 9], [1, 8], [1, 7],
    [2, 11], [2, 10], [2, 6], [2, 4],
    [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
    [4, 9], [5, 9], [5, 11], [4, 11], [7, 8], [7, 6], [6, 8], [6, 10], [10, 11]
  ];

  let rotX = 0;
  let rotY = 0;
  let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Ambient Starfield
  const starCount = window.innerWidth < 768 ? 35 : 75;
  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    rotX += 0.003 + (mouse.y - height / 2) * 0.00001;
    rotY += 0.004 + (mouse.x - width / 2) * 0.00001;

    // Draw starfield
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0 || s.x > width) s.vx *= -1;
      if (s.y < 0 || s.y > height) s.vy *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 135, ${s.alpha})`;
      ctx.fill();

      // Connecting lines
      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dist = Math.hypot(s.x - s2.x, s.y - s2.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = `rgba(0, 255, 135, ${(1 - dist / 110) * 0.12})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // 3D Wireframe projection in background
    const coreCenterX = width > 991 ? width * 0.82 : width * 0.5;
    const coreCenterY = height * 0.28;
    const scale = Math.min(width, height) * 0.11;

    const projected = rawVertices.map(v => {
      let y1 = v[1] * Math.cos(rotX) - v[2] * Math.sin(rotX);
      let z1 = v[1] * Math.sin(rotX) + v[2] * Math.cos(rotX);

      let x2 = v[0] * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -v[0] * Math.sin(rotY) + z1 * Math.cos(rotY);

      const fov = 3.5;
      const p = fov / (fov + z2 * 0.5);
      return {
        x: coreCenterX + x2 * scale * p,
        y: coreCenterY + y1 * scale * p,
        z: z2
      };
    });

    edges.forEach(([i1, i2]) => {
      const p1 = projected[i1];
      const p2 = projected[i2];
      const avgZ = (p1.z + p2.z) / 2;
      const alpha = Math.max(0.08, Math.min(0.4, 0.22 + avgZ * 0.08));

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    projected.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#00ff87";
      ctx.shadowColor = "#00ff87";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================
   2. SOUND ENGINE v3
   ========================================================== */
let audioCtx = null;
let soundEnabled = false;

function initSoundEngine() {
  const soundBtn = document.getElementById("sound-toggle-btn");
  const quickSoundBtn = document.getElementById("dock-sound-btn");

  const savedSound = localStorage.getItem("jb_sound_enabled");
  if (savedSound === "true") {
    enableSoundUI();
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem("jb_sound_enabled", soundEnabled);
    if (soundEnabled) {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      enableSoundUI();
      playChimeSound();
      showToast("Ovoz effektlari yoqildi 🔊");
    } else {
      disableSoundUI();
      showToast("Ovoz effektlari o'chirildi 🔇");
    }
  }

  if (soundBtn) soundBtn.addEventListener("click", toggleSound);
  if (quickSoundBtn) quickSoundBtn.addEventListener("click", toggleSound);
}

function enableSoundUI() {
  soundEnabled = true;
  document.querySelectorAll(".audio-btn, #dock-sound-btn").forEach(btn => btn.classList.add("is-active"));
  const label = document.getElementById("sound-btn-text");
  if (label) label.textContent = "FX: ON";
}

function disableSoundUI() {
  soundEnabled = false;
  document.querySelectorAll(".audio-btn, #dock-sound-btn").forEach(btn => btn.classList.remove("is-active"));
  const label = document.getElementById("sound-btn-text");
  if (label) label.textContent = "FX: OFF";
}

function playClickSound(freq = 580, duration = 0.04) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.35, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playChimeSound() {
  if (!soundEnabled) return;
  [520, 680, 840].forEach((freq, i) => {
    setTimeout(() => playClickSound(freq, 0.08), i * 60);
  });
}

function playSuccessChord() {
  if (!soundEnabled) return;
  [440, 554, 659, 880].forEach((freq, i) => {
    setTimeout(() => playClickSound(freq, 0.14), i * 70);
  });
}

/* ==========================================================
   3. I18N & CURRENCY CONTROLLER
   ========================================================== */
function initI18nAndCurrency() {
  document.querySelectorAll("[data-lang-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.langBtn;
      localStorage.setItem("jb_lang", currentLang);
      document.querySelectorAll("[data-lang-btn]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      playClickSound(640);
      applyTranslations();
      recalculateOrder();
    });
  });

  const activeLangBtn = document.querySelector(`[data-lang-btn="${currentLang}"]`);
  if (activeLangBtn) activeLangBtn.classList.add("active");

  document.querySelectorAll("[data-curr-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCurrency = btn.dataset.currBtn;
      localStorage.setItem("jb_currency", currentCurrency);
      document.querySelectorAll("[data-curr-btn]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      playClickSound(700);
      recalculateOrder();
    });
  });

  const activeCurrBtn = document.querySelector(`[data-curr-btn="${currentCurrency}"]`);
  if (activeCurrBtn) activeCurrBtn.classList.add("active");

  applyTranslations();
}

function applyTranslations() {
  const dict = I18N[currentLang] || I18N.uz;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");
  const briefInput = document.getElementById("order-client-brief");

  if (nameInput) nameInput.placeholder = dict.namePlaceholder;
  if (contactInput) contactInput.placeholder = dict.contactPlaceholder;
  if (briefInput) briefInput.placeholder = dict.briefPlaceholder;
}

function formatPrice(valInUsd) {
  if (currentCurrency === "uzs") {
    const uzs = Math.round((valInUsd * USD_TO_UZS_RATE) / 10000) * 10000;
    return `${uzs.toLocaleString("uz-UZ")} so'm`;
  }
  return `$${valInUsd.toLocaleString()}`;
}

/* ==========================================================
   4. HERO HUD CONSOLE CONTROLLER
   ========================================================== */
function initHeroHudConsole() {
  const tabs = document.querySelectorAll(".hud-tab-chip");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      playClickSound(620);
      updateHeroHudProject(tab.dataset.hudProject);
    });
  });

  updateHeroHudProject("gymos");
}

function updateHeroHudProject(projectId) {
  const p = PROJECTS_DATA.find(x => x.id === projectId) || PROJECTS_DATA[0];
  const headline = document.getElementById("hud-project-title");
  const desc = document.getElementById("hud-project-desc");
  const metricsBox = document.getElementById("hud-metrics-container");
  const demoBtn = document.getElementById("hud-btn-demo");
  const sandboxBtn = document.getElementById("hud-btn-sandbox");

  if (headline) headline.textContent = p.title;
  if (desc) desc.textContent = p.summary;

  if (metricsBox && p.metrics) {
    metricsBox.innerHTML = p.metrics.map(m => `
      <div class="hud-metric-box">
        <div class="hud-metric-val">${m.value}</div>
        <div class="hud-metric-lbl">${m.label}</div>
      </div>
    `).join("");
  }

  if (demoBtn) {
    demoBtn.href = p.liveUrl;
    demoBtn.onclick = () => playClickSound(660);
  }

  if (sandboxBtn) {
    sandboxBtn.onclick = () => openDeviceSandboxModal(p.id);
  }
}

/* ==========================================================
   5. PORTFOLIO SHOWCASE RENDERING & FILTERING
   ========================================================== */
function initPortfolioShowcase() {
  const grid = document.getElementById("portfolio-grid");
  const filterBtns = document.querySelectorAll(".filter-tab");
  if (!grid || !window.PROJECTS_DATA) return;

  function renderProjects(filter = "all") {
    grid.innerHTML = "";
    const filtered = filter === "all" 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    const dict = I18N[currentLang] || I18N.uz;

    filtered.forEach((p) => {
      const tile = document.createElement("div");
      tile.className = "project-tile";
      tile.dataset.id = p.id;

      const techBadges = p.tech.map(t => `<span class="tile-tag-pill">${t}</span>`).join("");
      const metricsHtml = p.metrics.map(m => `
        <div class="tile-metric-item">
          <div class="tile-metric-val">${m.value}</div>
          <div class="tile-metric-lbl">${m.label}</div>
        </div>
      `).join("");

      tile.innerHTML = `
        <div class="tile-visual-banner">
          <div class="tile-pattern"></div>
          <span class="tile-badge">${p.badge}</span>
          <span class="tile-date">${p.date}</span>
          <div class="tile-icon-circle">
            ${getProjectIconSvg(p.category)}
          </div>
        </div>
        <div class="tile-content-body">
          <h3 class="tile-title">${p.title}</h3>
          <p class="tile-summary">${p.summary}</p>
          
          <div class="tile-metrics-box">
            ${metricsHtml}
          </div>

          <div class="tile-tags-deck">
            ${techBadges}
          </div>

          <div class="tile-actions-row">
            ${p.liveUrl.startsWith("http") ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="tile-btn-demo" onclick="playClickSound(640)">
                <span>${dict.liveDemoBtn}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ` : `
              <a href="#order-section" class="tile-btn-demo" onclick="playClickSound(640)">
                <span>Konfigurator</span>
              </a>
            `}
            <button class="tile-btn-monitor" onclick="openDeviceSandboxModal('${p.id}')">
              <span>🖥 ${dict.sandboxBtn}</span>
            </button>
            <button class="tile-btn-details" onclick="openProjectModal('${p.id}')">
              ${dict.detailsBtn}
            </button>
          </div>
        </div>
      `;
      grid.appendChild(tile);
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
   6. DEVICE SANDBOX MODAL (LIVE MONITOR VIEWPORT)
   ========================================================== */
window.openDeviceSandboxModal = function(id) {
  playChimeSound();
  const project = PROJECTS_DATA.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-body");
  if (!modal || !modalContent) return;

  const archNodes = project.architecture ? project.architecture.map(a => `
    <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-inner); padding:10px 14px;">
      <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--emerald); font-weight:700;">${a.name}</div>
      <div style="font-size:0.85rem; color:var(--text-secondary);">${a.tech}</div>
    </div>
  `).join("") : "";

  modalContent.innerHTML = `
    <div style="margin-bottom:14px; display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <span class="tile-badge" style="position:static; display:inline-block; margin-bottom:8px;">${project.badge}</span>
        <h2 style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; line-height:1.2;">${project.title}</h2>
      </div>
      <span class="mono" style="color:var(--emerald); font-weight:700; font-size:0.9rem;">MONITOR v3.0</span>
    </div>

    <!-- Laptop Frame -->
    <div class="laptop-bezel">
      <div class="laptop-bar">
        <div class="window-dots">
          <div class="window-dot" style="background:#ef4444;"></div>
          <div class="window-dot" style="background:#eab308;"></div>
          <div class="window-dot" style="background:#00ff87;"></div>
        </div>
        <div class="laptop-url">${project.liveUrl}</div>
        <div style="font-size:0.7rem; color:var(--text-dim); font-family:var(--font-mono);">60 FPS</div>
      </div>
      ${project.liveUrl.startsWith("http") ? `
        <iframe src="${project.liveUrl}" class="laptop-screen" title="${project.title}" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
      ` : `
        <div style="height:360px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:30px; text-align:center;">
          <div style="width:60px; height:60px; border-radius:50%; background:rgba(0,255,135,0.15); color:var(--emerald); display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
            ${getProjectIconSvg(project.category)}
          </div>
          <h3 style="font-size:1.2rem; margin-bottom:8px;">${project.title}</h3>
          <p style="font-size:0.9rem; color:var(--text-secondary); max-width:440px;">${project.summary}</p>
        </div>
      `}
    </div>

    <!-- Architecture Blueprint -->
    <div style="margin-top:20px;">
      <h4 style="font-size:0.85rem; font-family:var(--font-mono); color:var(--text-dim); text-transform:uppercase; margin-bottom:10px;">Arxitektura & Muhandislik Steki:</h4>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
        ${archNodes}
      </div>
    </div>

    <div style="display:flex; gap:12px; margin-top:24px; padding-top:16px; border-top:1px solid var(--border-subtle);">
      ${project.liveUrl.startsWith("http") ? `
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary" style="flex:1;">
          <span>To'liq Ekran Rejimida Ochish</span>
        </a>
      ` : `
        <a href="#order-section" class="btn-cyber-primary" style="flex:1;" onclick="closeModals()">
          <span>Ushbu Loyihani Buyurtma Qilish</span>
        </a>
      `}
      <button class="btn-cyber-secondary" onclick="closeModals()">Yopish</button>
    </div>
  `;

  modal.classList.add("open");
};

/* ==========================================================
   7. PROJECT DETAIL SPEC MODAL
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

  const techBadges = project.tech.map(t => `<span class="tile-tag-pill">${t}</span>`).join("");

  modalContent.innerHTML = `
    <div style="margin-bottom:20px;">
      <span class="tile-badge" style="position:static; margin-bottom:10px; display:inline-block;">${project.badge}</span>
      <h2 style="font-family:var(--font-display); font-size:1.8rem; font-weight:800; margin-bottom:8px;">${project.title}</h2>
      <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.6;">${project.description}</p>
    </div>

    <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-inner); padding:18px; margin-bottom:24px;">
      <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:12px; color:var(--emerald);">Asosiy Imkoniyatlar va Yechimlar:</h4>
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
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-cyber-primary" style="flex:1;">
          <span>Jonli Saytni Ochish</span>
        </a>
      ` : `
        <a href="#order-section" class="btn-cyber-primary" style="flex:1;" onclick="closeModals()">
          <span>Buyurtma Berish</span>
        </a>
      `}
      <button class="btn-cyber-secondary" onclick="closeModals()">Yopish</button>
    </div>
  `;

  modal.classList.add("open");
};

window.closeModals = function() {
  playClickSound(400);
  document.querySelectorAll(".modal-overlay-deck").forEach(m => m.classList.remove("open"));
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModals();
});

/* ==========================================================
   8. ORDER ENGINE: LINEAR-GRADE CONFIGURATOR
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
  const serviceOptions = document.querySelectorAll(".service-choice-card");
  const scaleCards = document.querySelectorAll(".tier-card");
  const addonCards = document.querySelectorAll(".addon-pill-row");
  
  const nameInput = document.getElementById("order-client-name");
  const contactInput = document.getElementById("order-client-contact");
  const timingSelect = document.getElementById("order-client-timing");
  const briefInput = document.getElementById("order-client-brief");

  const btnSubmitTelegram = document.getElementById("btn-submit-telegram");
  const btnSubmitSite = document.getElementById("btn-submit-site");
  const btnPrintQuote = document.getElementById("btn-print-quote");

  serviceOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      serviceOptions.forEach(s => s.classList.remove("selected"));
      opt.classList.add("selected");
      orderState.serviceId = opt.dataset.service;
      playClickSound(560);
      recalculateOrder();
    });
  });

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
  const calculatedDays = Math.round(baseD * (orderState.scaleMultiplier >= 1.5 ? 1.35 : 1.0) + addonDaysTotal);

  const dict = I18N[currentLang] || I18N.uz;

  const priceDisplay = document.getElementById("calc-price-display");
  const daysDisplay = document.getElementById("calc-days-display");
  const specService = document.getElementById("spec-service-name");
  const specScale = document.getElementById("spec-scale-name");
  const specAddons = document.getElementById("spec-addons-count");
  const stackNodesEl = document.getElementById("live-stack-nodes");

  if (priceDisplay) {
    priceDisplay.textContent = `${formatPrice(calculatedMinUsd)} – ${formatPrice(calculatedMaxUsd)}`;
  }
  if (daysDisplay) {
    daysDisplay.textContent = `${dict.daysPrefix} ${calculatedDays} ${dict.daysSuffix}`;
  }
  if (specService) specService.textContent = currentService.name;
  if (specScale) specScale.textContent = orderState.scaleName;
  if (specAddons) {
    specAddons.textContent = orderState.addons.size > 0 ? `${orderState.addons.size} ta tanlandi` : "Standart";
  }

  // Dynamic stack architecture generator
  if (stackNodesEl) {
    const stack = ["Client Web/App", "Cloudflare Edge", "Next.js / Node Core"];
    if (orderState.serviceId === "cad_industry") stack.push("C++ / Rust WASM");
    if (orderState.addons.has("ai_integration") || orderState.serviceId === "ai_bot") stack.push("LLM Voice Engine");
    if (orderState.addons.has("payments")) stack.push("Payment Gateway");
    if (orderState.addons.has("telegram_sync")) stack.push("Telegram Bot API");
    stack.push("Database & Logs");

    stackNodesEl.innerHTML = stack.map((node, i) => `
      <span class="stack-chip">${node}</span>
      ${i < stack.length - 1 ? '<span class="stack-arrow">➔</span>' : ''}
    `).join("");
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
  playSuccessChord();

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

  const encodedMsg = encodeURIComponent(message);
  const telegramUrl = `https://t.me/the_javohirbek?text=${encodedMsg}`;
  
  openOrderReceiptModal(code, message);
  window.open(telegramUrl, "_blank");
}

function handleSiteOrder() {
  if (!validateInputs()) return;
  playSuccessChord();

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
    <div style="text-align:center; margin-bottom:24px;">
      <div style="width:64px; height:64px; border-radius:50%; background:rgba(0,255,135,0.15); border:1px solid var(--emerald); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; color:var(--emerald);">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h2 style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; margin-bottom:6px;">Buyurtmangiz Qabul Qilindi!</h2>
      <p style="font-size:0.9rem; color:var(--text-secondary);">Mutaxassis 15 daqiqa ichida siz bilan bog'lanadi.</p>
    </div>

    <div style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:var(--radius-inner); padding:16px; margin-bottom:20px; font-family:var(--font-mono); font-size:0.85rem;">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:var(--emerald); font-weight:700;">
        <span>Chipta Kodi:</span>
        <span>${code}</span>
      </div>
      <div style="white-space:pre-wrap; color:var(--text-secondary); line-height:1.5;">${summaryText}</div>
    </div>

    <div style="display:flex; gap:12px; flex-direction:column;">
      <button class="btn-cyber-primary" onclick="copyReceiptText('${encodeURIComponent(summaryText)}')">
        <span>📋 Chiptani Nusxa Olish</span>
      </button>
      <a href="https://t.me/the_javohirbek" target="_blank" rel="noopener noreferrer" class="btn-dispatch-telegram" style="width:100%; text-decoration:none;">
        <span>Telegramda Javohirbek bilan Bog'lanish (@the_javohirbek)</span>
      </a>
      <button class="btn-cyber-secondary" onclick="closeModals()">Yopish</button>
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
   9. PRINTABLE OFFICIAL COMMERCIAL QUOTE (PDF READY)
   ========================================================== */
function generatePrintableQuotation() {
  playClickSound(640);
  const code = generateOrderCode();
  const addonsText = orderState.addonNames.length > 0 ? orderState.addonNames.join(", ") : "Standart to'plam";
  const clientName = orderState.name || "Hurmatli Mijoz";
  const contact = orderState.contact || "Ko'rsatilmagan";

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8">
      <title>JB Intelligent — Rasmiy Tijoriy Taklif ${code}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111; padding: 40px; line-height: 1.6; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #00ff87; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: 800; color: #0f172a; }
        .logo span { color: #00d26a; }
        .meta { text-align: right; font-size: 14px; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
        th { background: #f8fafc; font-weight: 700; }
        .total-box { background: #f0fdf4; border: 2px solid #00d26a; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .footer { margin-top: 50px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">JB <span>INTELLIGENT</span></div>
          <div style="font-size:13px; color:#64748b;">Digital Engineering & AI Studio</div>
          <div style="font-size:13px; color:#64748b;">Telegram: @the_javohirbek | jb-intelligent.vercel.app</div>
        </div>
        <div class="meta">
          <div><strong>Hujjat №:</strong> ${code}</div>
          <div><strong>Sana:</strong> ${new Date().toLocaleDateString("uz-UZ")}</div>
          <div><strong>Mijoz:</strong> ${clientName}</div>
          <div><strong>Aloqa:</strong> ${contact}</div>
        </div>
      </div>

      <h2 style="font-size:20px; margin-bottom:10px;">TIJORIY TAKLIF VA XIZMATLAR SMETASI</h2>
      <p style="color:#475569; font-size:14px;">Ushbu hujjat JB Intelligent tomonidan mijozning talablariga muvofiq ishlab chiqiladigan dasturiy ta'minot ko'lami va hisoblangan smetasini tasdiqlaydi.</p>

      <table>
        <thead>
          <tr>
            <th>Xizmat Nomi</th>
            <th>Ko'lam / Standart</th>
            <th>Qo'shimcha Imkoniyatlar</th>
            <th>Ishlab Chiqish Muddati</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${orderState.serviceName}</strong></td>
            <td>${orderState.scaleName}</td>
            <td>${addonsText}</td>
            <td>${orderState.calculatedDays} ish kuni</td>
          </tr>
        </tbody>
      </table>

      <div class="total-box">
        <div style="font-size:14px; text-transform:uppercase; color:#047857; font-weight:700;">Hisoblangan Loyiha Smeta Qiymati:</div>
        <div style="font-size:28px; font-weight:800; color:#065f46; margin:6px 0;">${formatPrice(orderState.calculatedMin)} – ${formatPrice(orderState.calculatedMax)}</div>
        <div style="font-size:13px; color:#047857;">* 100% Manba kodi (Full Source Code), 1 yillik kafolat va server sozlash bepul taqdim etiladi.</div>
      </div>

      <div class="footer">
        <div>JB Intelligent Muhandislik Studiyasi</div>
        <div>Tasdiqlandi: Javohirbek / Bosh Muhandis</div>
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

/* ==========================================================
   10. QUICK FLOATING DOCK
   ========================================================== */
function initQuickDock() {
  const dockCalcBtn = document.getElementById("dock-calc-btn");
  if (dockCalcBtn) {
    dockCalcBtn.addEventListener("click", () => {
      playClickSound(520);
      document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* ==========================================================
   11. FAQ ACCORDION
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-card-unit");
  faqItems.forEach(item => {
    const query = item.querySelector(".faq-card-query");
    if (!query) return;
    query.addEventListener("click", () => {
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
   12. TOAST NOTIFICATION
   ========================================================== */
function showToast(msg) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast-beacon";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
