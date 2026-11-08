/* ==========================================================
   JB INTELLIGENT — Master Controller & Interactive Engine v3.5
   Three.js WebGL Core & 21st.dev Design System Integration
   ========================================================== */

let currentLang = localStorage.getItem("jb_lang") || "uz";
let currentCurrency = localStorage.getItem("jb_currency") || "usd";

document.addEventListener("DOMContentLoaded", () => {
  init3DCoreCanvas();
  initSoundEngine();
  initI18nAndCurrency();
  initHeroHudConsole();
  initPortfolioShowcase();
  initRoiCalculator();
  initDevCliTerminal();
  initLiveActivityFeed();
  initOrderEngine();
  initBudgetSlider();
  initFaqAccordion();
  initQuickDock();
  init21stSpotlight();
  initCounterAnimation();
});

/* ==========================================================
   1. THREE.JS 3D QUANTUM CORE & NEURAL STARFIELD (mrdoob/three.js)
   Real WebGL 3D Polyhedron, Dynamic Neon Lighting & Spring Parallax
   ========================================================== */
function init3DCoreCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  // Fallback to 2D canvas if Three.js failed to load
  if (typeof THREE === "undefined") {
    console.warn("Three.js not loaded, falling back to 2D canvas");
    initFallback2DCanvas(canvas);
    return;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 24;

  // Cyber Crystal Core Group
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  function updateCorePosition() {
    if (window.innerWidth > 991) {
      coreGroup.position.set(7.5, 3.2, 0);
      coreGroup.scale.set(1.15, 1.15, 1.15);
    } else {
      coreGroup.position.set(0, 5, -5);
      coreGroup.scale.set(0.85, 0.85, 0.85);
    }
  }
  updateCorePosition();

  // 1. Outer Wireframe Icosahedron
  const outerGeom = new THREE.IcosahedronGeometry(4.2, 1);
  const outerWireframe = new THREE.WireframeGeometry(outerGeom);
  const outerLineMat = new THREE.LineBasicMaterial({
    color: 0x00ff87,
    transparent: true,
    opacity: 0.75
  });
  const outerMesh = new THREE.LineSegments(outerWireframe, outerLineMat);
  coreGroup.add(outerMesh);

  // 2. Inner Quantum Dodecahedron Core
  const innerGeom = new THREE.DodecahedronGeometry(2.6, 0);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x050a12,
    emissive: 0x00ff87,
    emissiveIntensity: 0.35,
    roughness: 0.15,
    metalness: 0.9
  });
  const innerMesh = new THREE.Mesh(innerGeom, innerMat);
  coreGroup.add(innerMesh);

  // 3. Inner Wireframe Overlay
  const innerWireMat = new THREE.LineBasicMaterial({ color: 0x60efff, transparent: true, opacity: 0.5 });
  const innerWire = new THREE.LineSegments(new THREE.WireframeGeometry(innerGeom), innerWireMat);
  coreGroup.add(innerWire);

  // 4. Orbiting Gyroscope Torus Rings
  const ringGeom = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x60efff, transparent: true, opacity: 0.45 });
  const ring1 = new THREE.Mesh(ringGeom, ringMat);
  ring1.rotation.x = Math.PI / 3;
  coreGroup.add(ring1);

  const ring2 = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.4 }));
  ring2.rotation.y = Math.PI / 3;
  coreGroup.add(ring2);

  // 5. Deep Space Particle Constellation
  const particleCount = window.innerWidth < 768 ? 600 : 1400;
  const particleGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorEmerald = new THREE.Color(0x00ff87);
  const colorCyan = new THREE.Color(0x60efff);
  const colorPurple = new THREE.Color(0x6366f1);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 85;
    positions[i3 + 1] = (Math.random() - 0.5) * 65;
    positions[i3 + 2] = (Math.random() - 0.5) * 55;

    const chosenColor = Math.random() > 0.6 ? colorEmerald : (Math.random() > 0.5 ? colorCyan : colorPurple);
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.22,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const starfield = new THREE.Points(particleGeom, particleMat);
  scene.add(starfield);

  // 6. Dynamic Colored Lights
  const lightEmerald = new THREE.PointLight(0x00ff87, 2.5, 45);
  lightEmerald.position.set(10, 10, 10);
  scene.add(lightEmerald);

  const lightCyan = new THREE.PointLight(0x60efff, 2, 45);
  lightCyan.position.set(-10, -5, 5);
  scene.add(lightCyan);

  const ambientLight = new THREE.AmbientLight(0x070b14, 1.5);
  scene.add(ambientLight);

  // Mouse Parallax & Interaction
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    if (isDragging) {
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      coreGroup.rotation.y += deltaX * 0.008;
      coreGroup.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener("mousedown", (e) => {
    if (e.target.closest(".hero-hud-console, .hero-editorial, header, .floating-glass-dock, .project-tile, .service-feature-card, .order-studio-wrapper")) return;
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener("mouseup", () => isDragging = false);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCorePosition();
  });

  // 60 FPS Render Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Damped mouse tracking
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    if (!isDragging) {
      coreGroup.rotation.x += 0.004;
      coreGroup.rotation.y += 0.007;
      coreGroup.rotation.z = mouse.x * 0.15;
    }

    ring1.rotation.z += 0.012;
    ring2.rotation.x += 0.009;

    starfield.rotation.y = elapsedTime * 0.015;
    starfield.rotation.x = mouse.y * 0.05;

    // Orbit point lights
    lightEmerald.position.x = Math.sin(elapsedTime * 0.8) * 12;
    lightEmerald.position.z = Math.cos(elapsedTime * 0.8) * 12;

    lightCyan.position.y = Math.cos(elapsedTime * 0.6) * 10;
    lightCyan.position.x = -Math.sin(elapsedTime * 0.6) * 10;

    renderer.render(scene, camera);
  }
  animate();
}

function initFallback2DCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  function loop() {
    ctx.clearRect(0, 0, width, height);
    requestAnimationFrame(loop);
  }
  loop();
}

/* ==========================================================
   2. 21st.dev DYNAMIC SPOTLIGHT TRACKING (Aceternity / 21st.dev)
   ========================================================== */
function init21stSpotlight() {
  const cards = document.querySelectorAll(".spotlight-card, .project-tile, .service-feature-card, .hero-hud-console, .order-quote-deck");
  cards.forEach(card => {
    card.classList.add("spotlight-card");
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* ==========================================================
   3. 21st.dev NUMBER COUNTER ANIMATION (CountUp on Scroll)
   ========================================================== */
function initCounterAnimation() {
  const telemetryElements = [
    { el: document.querySelector(".telemetry-col:nth-child(1) .telemetry-val"), target: 15, suffix: "+" },
    { el: document.querySelector(".telemetry-col:nth-child(2) .telemetry-val"), target: 99.8, suffix: "%", decimals: 1 },
    { el: document.querySelector(".telemetry-col:nth-child(3) .telemetry-val"), target: 0.38, prefix: "< ", suffix: "s", decimals: 2 },
    { el: document.querySelector(".telemetry-col:nth-child(4) .telemetry-val"), target: 96.4, suffix: "%", decimals: 1 }
  ];

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        telemetryElements.forEach(item => {
          if (!item.el) return;
          animateValue(item.el, 0, item.target, 1600, item.prefix || "", item.suffix || "", item.decimals || 0);
        });
      }
    });
  }, { threshold: 0.3 });

  const telemetryRow = document.querySelector(".telemetry-row");
  if (telemetryRow) observer.observe(telemetryRow);
}

function animateValue(obj, start, end, duration, prefix, suffix, decimals) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const current = (start + (end - start) * easeOutQuad).toFixed(decimals);
    obj.textContent = `${prefix}${current}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================
   4. WEB AUDIO SOUND ENGINE (Toggleable Cyber Haptics)
   ========================================================== */
let audioCtx = null;
let soundEnabled = false;

function initSoundEngine() {
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  const dockSoundBtn = document.getElementById("dock-sound-btn");
  const soundBtnText = document.getElementById("sound-btn-text");

  function toggleSound() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    soundEnabled = !soundEnabled;

    if (soundToggleBtn) soundToggleBtn.classList.toggle("is-active", soundEnabled);
    if (soundBtnText) soundBtnText.textContent = soundEnabled ? "FX: ON" : "FX: OFF";
    if (dockSoundBtn) dockSoundBtn.style.color = soundEnabled ? "var(--emerald)" : "inherit";

    if (soundEnabled) {
      playChimeSound();
      showToast("Ovoz effektlari yoqildi 🔊");
    } else {
      showToast("Ovoz effektlari o'chirildi 🔇");
    }
  }

  if (soundToggleBtn) soundToggleBtn.addEventListener("click", toggleSound);
  if (dockSoundBtn) dockSoundBtn.addEventListener("click", toggleSound);
}

function playClickSound(freq = 440) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

function playChimeSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.06, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  } catch (e) {}
}

function playSuccessChord() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    });
  } catch (e) {}
}

/* ==========================================================
   5. MULTILINGUAL & CURRENCY SWITCHER
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
      playClickSound(580);
      recalculateOrder();
    });
  });

  currBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.currBtn === currentCurrency);
    btn.addEventListener("click", () => {
      currentCurrency = btn.dataset.currBtn;
      localStorage.setItem("jb_currency", currentCurrency);
      currBtns.forEach(b => b.classList.toggle("active", b.dataset.currBtn === currentCurrency));
      playClickSound(620);
      recalculateOrder();
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
   6. HERO HUD CONSOLE CONTROLLER
   ========================================================== */
function initHeroHudConsole() {
  const tabs = document.querySelectorAll("[data-hud-project]");
  if (!tabs.length || !window.PROJECTS_DATA) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      playClickSound(520);
      updateHudDisplay(tab.dataset.hudProject);
    });
  });

  updateHudDisplay("gymos");
}

function updateHudDisplay(projectId) {
  const p = PROJECTS_DATA.find(x => x.id === projectId) || PROJECTS_DATA[0];
  const titleEl = document.getElementById("hud-project-title");
  const descEl = document.getElementById("hud-project-desc");
  const metricsEl = document.getElementById("hud-metrics-container");
  const demoBtn = document.getElementById("hud-btn-demo");
  const sandboxBtn = document.getElementById("hud-btn-sandbox");

  if (titleEl) titleEl.textContent = p.title;
  if (descEl) descEl.textContent = p.summary;

  if (metricsEl) {
    metricsEl.innerHTML = p.metrics.map(m => `
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
   7. 21st.dev BENTO GRID SHOWCASE & INTERACTIVE WIDGETS
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
      tile.className = "project-tile spotlight-card";
      tile.dataset.id = p.id;

      // 21st.dev Bento Spans
      if (filter === "all") {
        if (p.id === "gymos" || p.id === "apexcut") {
          tile.classList.add("bento-span-6", "border-beam-card");
        } else {
          tile.classList.add("bento-span-6");
        }
      } else {
        tile.classList.add("bento-span-6");
      }

      const techBadges = p.tech.map(t => `<span class="tile-tag-pill">${t}</span>`).join("");
      const metricsHtml = p.metrics.map(m => `
        <div class="tile-metric-item">
          <div class="tile-metric-val">${m.value}</div>
          <div class="tile-metric-lbl">${m.label}</div>
        </div>
      `).join("");

      // Specific 21st.dev interactive micro-widget for each project
      let widgetHtml = "";
      if (p.id === "gymos") {
        widgetHtml = `
          <div class="bento-widget-box" id="widget-gymos-box">
            <div class="bento-widget-header">
              <span>HARDWARE TURNSTILE IOT GATEWAY</span>
              <span class="bento-pulse-badge" id="gymos-led-badge"><span class="led"></span> ONLINE &lt; 200ms</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; color:var(--emerald); font-size:0.8rem; margin-bottom:8px;">
              <span id="gymos-token-txt">QR Token: ACTIVE</span>
              <span>Turnstile: #TK-01</span>
              <span>Members: 10,000+</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="mini-sim-trigger" onclick="runGymOsTurnstileSim(this, event)">▶ QR Turniket Tekshiruvi</button>
            </div>
          </div>
        `;
      } else if (p.id === "apexcut") {
        widgetHtml = `
          <div class="bento-widget-box" id="widget-apexcut-box">
            <div class="bento-widget-header">
              <span>WASM GENETIC NESTING ENGINE</span>
              <span class="bento-pulse-badge" style="color:#60efff; background:rgba(96,239,255,0.12);"><span class="led" style="background:#60efff; box-shadow:0 0 8px #60efff;"></span> 96.4% YIELD</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; color:#60efff; font-size:0.8rem; margin-bottom:8px;">
              <span id="apexcut-calc-txt">G-Code Gen: 0.2s</span>
              <span>DXF: READY</span>
              <span id="apexcut-yield-txt">Saved: 28%</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="mini-sim-trigger" onclick="runApexCutNestingSim(this, event)">▶ Nesting Algoritmini Ishga Tushirish</button>
            </div>
          </div>
        `;
      } else if (p.id === "lumen-roof") {
        widgetHtml = `
          <div class="bento-widget-box" id="widget-lumen-box">
            <div class="bento-widget-header">
              <span>NATURAL LIGHTING SIMULATOR</span>
              <span class="bento-pulse-badge" style="color:#eab308; background:rgba(234,179,8,0.12);"><span class="led" style="background:#eab308; box-shadow:0 0 8px #eab308;"></span> 99 SPEED</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; color:#eab308; font-size:0.8rem; margin-bottom:8px;">
              <span id="lumen-mode-txt">Rejim: 12:00 (Quyosh Nuri)</span>
              <span>3D Transforms</span>
              <span>Kafolat: 7 Yil</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="mini-sim-trigger" onclick="toggleLumenDayNight(this, event)">▶ Kun/Tun Yorug'lik Rejimi</button>
            </div>
          </div>
        `;
      } else if (p.id === "ovozli-chat") {
        widgetHtml = `
          <div class="bento-widget-box" id="widget-voice-box">
            <div class="bento-widget-header">
              <span>REAL-TIME VOICE STREAMING</span>
              <span class="bento-pulse-badge" style="color:#a855f7; background:rgba(168,85,247,0.12);"><span class="led" style="background:#a855f7; box-shadow:0 0 8px #a855f7;"></span> &lt; 450ms</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; color:#a855f7; font-size:0.8rem; margin-bottom:8px;">
              <span id="voice-status-txt">Opus 48kHz</span>
              <span>LLM Voice Agent</span>
              <span>24/7 Autonomy</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="mini-sim-trigger" onclick="playVoiceAgentAudioTest(this, event)">▶ Ovozli Agent Sintez Testi</button>
            </div>
          </div>
        `;
      }

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
          
          ${widgetHtml}

          <div class="tile-metrics-box">
            ${metricsHtml}
          </div>

          <div class="tile-tags-deck">
            ${techBadges}
          </div>

          <div class="tile-actions-row">
            ${p.liveUrl.startsWith("http") ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="tile-btn-demo btn-shimmer" onclick="playClickSound(640)">
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

    init21stSpotlight();
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
   8. DEVICE SANDBOX MODAL (LIVE MONITOR VIEWPORT)
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
      <span class="mono" style="color:var(--emerald); font-weight:700; font-size:0.9rem;">MONITOR v3.5</span>
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
   9. PROJECT DETAIL SPEC MODAL
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
   10. ORDER ENGINE: LINEAR-GRADE CONFIGURATOR
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
      
      // Sync slider
      const slider = document.getElementById("order-budget-slider");
      if (slider) {
        if (orderState.scaleMultiplier >= 1.6) slider.value = "3";
        else if (orderState.scaleMultiplier >= 1.25) slider.value = "2";
        else slider.value = "1";
        const bubble = document.getElementById("budget-slider-val");
        if (bubble) bubble.textContent = orderState.scaleName;
      }

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

/* ==========================================================
   11. 21st.dev INTERACTIVE ORDER BUDGET RANGE SLIDER
   ========================================================== */
function initBudgetSlider() {
  const slider = document.getElementById("order-budget-slider");
  const bubble = document.getElementById("budget-slider-val");
  const scaleCards = document.querySelectorAll(".tier-card");
  if (!slider) return;

  const sliderMap = {
    "1": { mult: 1.0, name: "MVP / Start", label: "$350 – $850 (Start)" },
    "2": { mult: 1.3, name: "Standart Biznes", label: "$850 – $1,800 (Pro)" },
    "3": { mult: 1.7, name: "Enterprise / Yirik", label: "$1,800 – $3,500+ (Enterprise)" }
  };

  slider.addEventListener("input", (e) => {
    const val = e.target.value;
    const data = sliderMap[val] || sliderMap["1"];
    if (bubble) bubble.textContent = data.label;

    orderState.scaleMultiplier = data.mult;
    orderState.scaleName = data.name;

    // Sync tier cards visually
    scaleCards.forEach((c, idx) => {
      if (idx + 1 === parseInt(val)) {
        c.classList.add("selected");
      } else {
        c.classList.remove("selected");
      }
    });

    playClickSound(500);
    recalculateOrder();
  });
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

  // Dynamic 21st.dev stack architecture flow generator
  if (stackNodesEl) {
    const stack = ["Client Web/App", "Cloudflare Edge", "Next.js / Node Core"];
    if (orderState.serviceId === "cad_industry") stack.push("C++ / Rust WASM");
    if (orderState.addons.has("ai_integration") || orderState.serviceId === "ai_bot") stack.push("LLM Voice Engine");
    if (orderState.addons.has("payments")) stack.push("Payment Gateway");
    if (orderState.addons.has("telegram_sync")) stack.push("Telegram Bot API");
    stack.push("Database & Logs");

    stackNodesEl.innerHTML = stack.map((node, i) => `
      <span class="flow-node-chip">${node}</span>
      ${i < stack.length - 1 ? '<span class="flow-arrow-animated">➔</span>' : ''}
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

/* ==========================================================
   12. DIRECT TELEGRAM ROUTING TO @the_javohirbek
   ========================================================== */
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
  // Strictly routes to @the_javohirbek
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
      <button class="btn-cyber-primary btn-shimmer" onclick="copyReceiptText('${encodeURIComponent(summaryText)}')">
        <span>📋 Chiptani Nusxa Olish</span>
      </button>
      <a href="https://t.me/the_javohirbek" target="_blank" rel="noopener noreferrer" class="btn-dispatch-telegram btn-shimmer" style="width:100%; text-decoration:none;">
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
    showToast("Chipta nusxa olindi! 📋");
    playClickSound(600);
  });
};

/* ==========================================================
   13. PRINTABLE COMMERCIAL QUOTATION (PDF)
   ========================================================== */
function generatePrintableQuotation() {
  playClickSound(480);
  const code = generateOrderCode();
  const printWindow = window.open("", "_blank");
  const dateStr = new Date().toLocaleDateString("uz-UZ");

  const addonsList = orderState.addonNames.length > 0 
    ? orderState.addonNames.map(a => `<li>${a}</li>`).join("")
    : "<li>Standart to'plam</li>";

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8">
      <title>Tijoriy Taklif — ${code} | JB INTELLIGENT</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 40px; color: #0a0d14; line-height: 1.6; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #00ff87; padding-bottom: 20px; margin-bottom: 30px; }
        .brand { font-size: 24px; font-weight: 800; color: #000; }
        .quote-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 30px; }
        .price-total { font-size: 28px; font-weight: 800; color: #059669; margin: 15px 0; }
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
          <div style="font-size:13px; color:#64748b;">Telegram: @the_javohirbek | jb-intelligent.vercel.app</div>
        </div>
        <div style="text-align: right;">
          <strong>Rasmiy Tijoriy Taklif</strong><br>
          Hujjat: ${code}<br>
          Sana: ${dateStr}
        </div>
      </div>

      <div class="quote-box">
        <h2 style="margin: 0 0 10px 0;">Loyiha Smetasi va Shartlari</h2>
        <div>Buyurtmachi: <strong>${orderState.name || "Mijoz"}</strong> (${orderState.contact || "Aloqa kutilmoqda"})</div>
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
            <td>Ishlab chiqish va integratsiya</td>
          </tr>
          <tr>
            <td><strong>Loyiha Ko'lami</strong></td>
            <td>${orderState.scaleName}</td>
            <td>Arxitektura va funksionallik darajasi</td>
          </tr>
          <tr>
            <td><strong>Qo'shimcha Modullar</strong></td>
            <td colspan="2">
              <ul style="margin: 0; padding-left: 20px;">
                ${addonsList}
              </ul>
            </td>
          </tr>
          <tr>
            <td><strong>Kafolat</strong></td>
            <td>12 oy (1 yil)</td>
            <td>Texnik qo'llab-quvvatlash va nosozliklarni bepul tuzatish</td>
          </tr>
          <tr>
            <td><strong>Mulkchilik</strong></td>
            <td>100% Manba Kodi</td>
            <td>Litsenziyasiz to'liq mijoz egaligiga topshiriladi</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        Ushbu taklif 14 kun davomida haqiqiydir. Tasdiqlash va ishni boshlash uchun: <strong>Telegram: @the_javohirbek</strong>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

/* ==========================================================
   14. FAQ ACCORDION ENGINE
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item-tile");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question-btn");
    const answerEl = item.querySelector(".faq-answer-block");

    if (!questionBtn || !answerEl) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      faqItems.forEach(other => {
        other.classList.remove("active");
        const otherAns = other.querySelector(".faq-answer-block");
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");
        answerEl.style.maxHeight = answerEl.scrollHeight + "px";
        playClickSound(480);
      } else {
        item.classList.remove("active");
        answerEl.style.maxHeight = null;
        playClickSound(400);
      }
    });
  });
}

/* ==========================================================
   15. FLOATING QUICK ACTION DOCK
   ========================================================== */
function initQuickDock() {
  const dockCalcBtn = document.getElementById("dock-calc-btn");
  if (dockCalcBtn) {
    dockCalcBtn.addEventListener("click", () => {
      playClickSound(520);
      const target = document.getElementById("order-section");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* ==========================================================
   16. TOAST NOTIFICATION UTILITY
   ========================================================== */
function showToast(text) {
  let toast = document.querySelector(".toast-beacon");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-beacon";
    document.body.appendChild(toast);
  }

  toast.textContent = text;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* ==========================================================
   17. AWWWARDS-TIER: DEVELOPER CLI TERMINAL (QUAKE-STYLE)
   ========================================================== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatUzs(amount) {
  return Math.round(amount).toLocaleString("uz-UZ");
}

function initDevCliTerminal() {
  const terminal = document.getElementById("terminal-drawer");
  const openBtn = document.getElementById("btn-open-terminal");
  const closeBtn = document.getElementById("btn-close-terminal");
  const outputEl = document.getElementById("terminal-output");
  const inputEl = document.getElementById("terminal-input");

  if (!terminal || !inputEl) return;

  function toggleTerminal(force) {
    const isOpen = force !== undefined ? force : !terminal.classList.contains("is-open");
    if (isOpen) {
      terminal.classList.add("is-open");
      if (typeof playClickSound === "function") playClickSound(580);
      setTimeout(() => inputEl.focus(), 80);
    } else {
      terminal.classList.remove("is-open");
      if (typeof playClickSound === "function") playClickSound(420);
    }
  }

  if (openBtn) openBtn.addEventListener("click", () => toggleTerminal(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleTerminal(false));

  // Tilde (~) or ESC key shortcut
  window.addEventListener("keydown", (e) => {
    if (e.key === "`" || e.key === "~") {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (activeTag !== "input" && activeTag !== "textarea") {
        e.preventDefault();
        toggleTerminal();
      }
    } else if (e.key === "Escape" && terminal.classList.contains("is-open")) {
      toggleTerminal(false);
    }
  });

  const history = [];
  let historyIdx = -1;

  function printLine(html) {
    if (!outputEl) return;
    outputEl.innerHTML += `\n${html}`;
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      if (history.length > 0) {
        if (historyIdx === -1) historyIdx = history.length - 1;
        else if (historyIdx > 0) historyIdx--;
        inputEl.value = history[historyIdx];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (history.length > 0 && historyIdx !== -1) {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          inputEl.value = history[historyIdx];
        } else {
          historyIdx = -1;
          inputEl.value = "";
        }
      }
      e.preventDefault();
    } else if (e.key === "Enter") {
      const rawCmd = inputEl.value.trim();
      inputEl.value = "";
      if (!rawCmd) return;

      history.push(rawCmd);
      historyIdx = -1;

      printLine(`<span style="color:var(--emerald);">visitor@jb-lab:~$</span> ${escapeHtml(rawCmd)}`);
      if (typeof playClickSound === "function") playClickSound(700);

      const parts = rawCmd.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(" ").toLowerCase();

      switch (cmd) {
        case "help":
          printLine(`
<span class="cmd-highlight">JB INTELLIGENT Terminal Buyruqlari:</span>
  <span class="cmd-highlight">help</span>           - Barcha mavjud buyruqlar ro'yxati
  <span class="cmd-highlight">projects</span>       - 8 ta ishlab chiqilgan jonli master-loyiha
  <span class="cmd-highlight">quote &lt;turi&gt;</span>   - Loyiha smetasini tezkor hisoblash (saas, cad, ai, 3d, mobile)
  <span class="cmd-highlight">benchmark</span>      - WebGL render FPS, xotira va hardware diagnostikasi
  <span class="cmd-highlight">roi</span>            - Xarajat tejash va ROI kalkulyatoriga o'tish
  <span class="cmd-highlight">contact</span>        - Bosh muhandis Javohirbek bilan Telegramda bog'lanish
  <span class="cmd-highlight">clear</span>          - Terminal ekranini tozalash
  <span class="cmd-highlight">exit</span>           - Terminal oynasini yopish
          `);
          break;

        case "projects":
          if (window.PROJECTS_DATA) {
            let out = "<span class='cmd-highlight'>SHU OYDA YARATILGAN LOYIHALAR RO'YXATI:</span>\n";
            window.PROJECTS_DATA.forEach((p, i) => {
              out += `  [${i + 1}] <strong style="color:#ffffff;">${p.title}</strong> (${p.category.toUpperCase()}) - ${p.badge}\n      URL: ${p.liveUrl}\n`;
            });
            printLine(out);
          } else {
            printLine("Loyihalar ro'yxati topilmadi.");
          }
          break;

        case "quote":
          if (!arg) {
            printLine(`
<span style="color:#f59e0b;">Foydalanish:</span> quote &lt;saas | cad | ai | web3d | mobile&gt;
Masalan: <span class="cmd-highlight">quote saas</span> yoki <span class="cmd-highlight">quote ai</span>
            `);
          } else {
            let quoteText = "";
            if (arg.includes("saas") || arg.includes("erp")) {
              quoteText = `[SaaS / ERP Config]: 14-25 kun | Multi-tenant, PostgreSQL, Redis, Real-time Dashboard | Narx: ~ $1,800 - $3,500`;
            } else if (arg.includes("cad") || arg.includes("cnc")) {
              quoteText = `[CAD / CNC Nesting Engine]: 20-35 kun | WASM Genetic Nesting, DXF import/export, G-Code generation | Narx: ~ $2,500 - $5,000`;
            } else if (arg.includes("ai") || arg.includes("bot")) {
              quoteText = `[AI Voice/Chat Agents]: 7-14 kun | LLM Fine-Tuned, Opus Audio Streaming, CRM 2-way sync | Narx: ~ $900 - $2,200`;
            } else if (arg.includes("3d") || arg.includes("web")) {
              quoteText = `[3D Cyber-Luxury Web]: 10-18 kun | Three.js WebGL Core, Awwwards SOTD Grade Interactivity | Narx: ~ $1,200 - $2,800`;
            } else {
              quoteText = `[Universal Custom Engineering]: Har qanday murakkab arxitektura va loyiha`;
            }
            printLine(`
${quoteText}
Buyurtmani tasdiqlash: <a href="https://t.me/the_javohirbek" target="_blank" style="color:var(--emerald); text-decoration:underline;">@the_javohirbek ga Telegram orqali yozish</a>
            `);
          }
          break;

        case "benchmark":
          const dpr = window.devicePixelRatio || 1;
          const cores = navigator.hardwareConcurrency || "N/A";
          const mem = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "High Performance";
          const res = `${window.innerWidth}x${window.innerHeight} (Screen: ${window.screen.width}x${window.screen.height})`;
          printLine(`
<span class="cmd-highlight">--- HARDWARE & WEBGL DIAGNOSTIKA ---</span>
[WebGL Engine]: Three.js r128 (3D Polyhedron, Neural Starfield, Torus Rings)
[Target FPS]: ~ 60.0 FPS (GPU Acceleration Active)
[Display]: ${res} @ ${dpr}x DPR
[CPU Cores]: ${cores} Threads
[Device Memory]: ~ ${mem}
[Audio API]: Web Audio Context (Sine/Sawtooth synthesis)
[Status]: Barcha tizimlar nominal va 100% tayyor.
          `);
          break;

        case "roi":
          const roiSec = document.getElementById("roi-section");
          if (roiSec) {
            roiSec.scrollIntoView({ behavior: "smooth" });
            printLine("ROI & Tejamkorlik kalkulyatoriga o'tildi.");
          }
          break;

        case "contact":
          printLine(`
<span class="cmd-highlight">BOSH MUHANDIS BILAN BOG'LANISH:</span>
Telegram: <a href="https://t.me/the_javohirbek" target="_blank" style="color:var(--emerald); font-weight:700;">@the_javohirbek</a>
Ism: Javohirbek Shavkatov (Lead Architect & Founder)
Email: the_javohirbek@gmail.com
Status: Buyurtmalar qabul qilinmoqda (2026 Q4)
          `);
          break;

        case "clear":
          outputEl.innerHTML = `JB INTELLIGENT Kiber-Laboratoriya Tizimi.\nBuyruqlar uchun <span class="cmd-highlight">'help'</span> deb yozing.`;
          break;

        case "exit":
          toggleTerminal(false);
          break;

        default:
          printLine(`Noma'lum buyruq: '${escapeHtml(rawCmd)}'. Mavjud buyruqlarni ko'rish uchun <span class="cmd-highlight">'help'</span> deb yozing.`);
          break;
      }
    }
  });
}

/* ==========================================================
   18. INTERACTIVE ROI & SAVINGS CALCULATOR
   ========================================================== */
function initRoiCalculator() {
  const staffSlider = document.getElementById("roi-staff-slider");
  const salarySlider = document.getElementById("roi-salary-slider");
  const hoursSlider = document.getElementById("roi-hours-slider");

  const staffValEl = document.getElementById("roi-staff-val");
  const salaryValEl = document.getElementById("roi-salary-val");
  const hoursValEl = document.getElementById("roi-hours-val");

  const resultHoursEl = document.getElementById("roi-result-hours");
  const resultSavingsEl = document.getElementById("roi-result-savings");
  const resultPaybackEl = document.getElementById("roi-result-payback");
  const resultRoiEl = document.getElementById("roi-result-roi");
  const telegramBtn = document.getElementById("roi-btn-telegram");

  if (!staffSlider || !salarySlider || !hoursSlider) return;

  function updateRoi() {
    const staff = parseInt(staffSlider.value, 10);
    const salary = parseInt(salarySlider.value, 10);
    const hoursPerWeek = parseInt(hoursSlider.value, 10);

    if (staffValEl) staffValEl.textContent = `${staff} kishi`;
    if (salaryValEl) salaryValEl.textContent = `${formatUzs(salary)} UZS`;
    if (hoursValEl) hoursValEl.textContent = `${hoursPerWeek} soat / hafta`;

    // Monthly hours spent manually on routine tasks across team
    const monthlyManualHours = staff * hoursPerWeek * 4.33;
    // 75% automation yield
    const hoursSaved = Math.round(monthlyManualHours * 0.75);

    // Hourly rate per staff (assuming 176 monthly working hours)
    const hourlyRate = salary / 176;
    const monthlyMoneySaved = Math.round(hoursSaved * hourlyRate);

    // Estimated standard investment ~ 35M UZS
    const estimatedCost = 35000000;
    const paybackMonths = Math.max(0.6, (estimatedCost / (monthlyMoneySaved || 1))).toFixed(1);
    const roiMultiplier = Math.round(((monthlyMoneySaved * 12) / estimatedCost) * 100);

    if (resultHoursEl) resultHoursEl.textContent = `${hoursSaved.toLocaleString()}+ soat`;
    if (resultSavingsEl) resultSavingsEl.textContent = `${formatUzs(monthlyMoneySaved)} UZS`;
    if (resultPaybackEl) resultPaybackEl.textContent = `~ ${paybackMonths} oy`;
    if (resultRoiEl) resultRoiEl.textContent = `+${roiMultiplier}%`;

    if (telegramBtn) {
      const msg = `Assalomu alaykum Javohirbek! JB Intelligent saytidagi ROI kalkulyator orqali hisobladim:%0A- Xodimlar: ${staff} kishi%0A- O'rtacha maosh: ${formatUzs(salary)} UZS%0A- Haftalik qo'l mehnati: ${hoursPerWeek} soat%0A- Kutilayotgan oylik tejamkorlik: ${formatUzs(monthlyMoneySaved)} UZS (${hoursSaved} soat)%0ALoyihani avtomatlashtirish bo'yicha maslahat bermoqchimisiz?`;
      telegramBtn.href = `https://t.me/the_javohirbek?text=${msg}`;
    }
  }

  staffSlider.addEventListener("input", updateRoi);
  salarySlider.addEventListener("input", updateRoi);
  hoursSlider.addEventListener("input", updateRoi);

  updateRoi();
}

/* ==========================================================
   19. LIVE TELEMETRY SOCIAL PROOF STREAM
   ========================================================== */
function initLiveActivityFeed() {
  const container = document.getElementById("live-activity-stream");
  if (!container) return;

  const activities = [
    { city: "Toshkent", text: "GymOS 2 ta yangi turniket terminaliga ulandi", time: "2 daqiqa oldin", color: "var(--emerald)" },
    { city: "Samarqand", text: "ApexCut CNC 42 ta detalni 96.8% unumdorlikda nesting qildi", time: "Hozirgina", color: "var(--cyan)" },
    { city: "Buxoro", text: "Lumen Roof 3D vitrina orqali 38M so'mlik buyurtma rasmiylashtirildi", time: "5 daqiqa oldin", color: "#f59e0b" },
    { city: "Navoiy", text: "AI Telegram Bot orqali 14 ta mijozga avtonom narx taqdim etildi", time: "8 daqiqa oldin", color: "#a855f7" },
    { city: "Farg'ona", text: "Fitnes klubi uchun GymOS ERP integratsiyasi boshlandi", time: "11 daqiqa oldin", color: "var(--emerald)" },
    { city: "Andijon", text: "Shisha zavodi uchun DXF nesting algoritmi sinovdan muvaffaqiyatli o'tdi", time: "15 daqiqa oldin", color: "var(--cyan)" }
  ];

  let currentIdx = 0;

  function showNextActivity() {
    const act = activities[currentIdx];
    currentIdx = (currentIdx + 1) % activities.length;

    container.innerHTML = `
      <div class="activity-badge">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: ${act.color}; box-shadow: 0 0 8px ${act.color};"></span>
        <strong style="color: #ffffff;">${act.city}:</strong>
        <span>${act.text}</span>
        <span style="color: var(--text-dim); font-size: 0.7rem;">(${act.time})</span>
      </div>
    `;

    setTimeout(() => {
      const badge = container.querySelector(".activity-badge");
      if (badge) {
        badge.style.transition = "opacity 0.6s ease";
        badge.style.opacity = "0";
      }
    }, 7500);
  }

  showNextActivity();
  setInterval(showNextActivity, 11000);
}

/* ==========================================================
   20. IN-CARD MINI-SIMULATORS (BENTO CARDS INTERACTION)
   ========================================================== */
window.runGymOsTurnstileSim = function(btn, e) {
  if (e) e.stopPropagation();
  if (typeof playChimeSound === "function") playChimeSound();
  btn.textContent = "⏳ Skanerlanmoqda...";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "✓ Turniket Ochildi (#TK-01, 14ms)";
    btn.style.background = "var(--emerald)";
    btn.style.color = "#03140b";
    showToast("GymOS IoT: Turniket ochildi! QR A'zolik tasdiqlandi (Javohirbek - VIP).");

    setTimeout(() => {
      btn.textContent = "▶ QR Turniket Tekshiruvi";
      btn.style.background = "";
      btn.style.color = "";
      btn.disabled = false;
    }, 4000);
  }, 400);
};

window.runApexCutNestingSim = function(btn, e) {
  if (e) e.stopPropagation();
  if (typeof playClickSound === "function") playClickSound(800);
  btn.textContent = "⏳ WASM Genetic Hisoblanmoqda (38%)...";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "⏳ Optimallashtirilmoqda (94%)...";
    if (typeof playClickSound === "function") playClickSound(1000);
  }, 300);

  setTimeout(() => {
    if (typeof playSuccessChord === "function") playSuccessChord();
    btn.textContent = "✓ Tayyor: 96.8% Yield (G-Code Chiqarildi)";
    btn.style.background = "var(--cyan)";
    btn.style.color = "#03140b";
    showToast("ApexCut: 48 ta detal nesting qilindi, 28.4% xom-ashyo tejaldi!");

    setTimeout(() => {
      btn.textContent = "▶ Nesting Algoritmini Ishga Tushirish";
      btn.style.background = "";
      btn.style.color = "";
      btn.disabled = false;
    }, 4500);
  }, 750);
};

window.toggleLumenDayNight = function(btn, e) {
  if (e) e.stopPropagation();
  if (typeof playClickSound === "function") playClickSound(520);
  const isNight = btn.dataset.mode === "night";
  if (isNight) {
    btn.dataset.mode = "day";
    btn.textContent = "☀ Rejim: Kunduzgi (12:00)";
    btn.style.background = "rgba(234, 179, 8, 0.2)";
    showToast("Lumen Roof 3D: Quyosh nuri 12:00 burchagi yuklandi.");
  } else {
    btn.dataset.mode = "night";
    btn.textContent = "🌙 Rejim: Tungi (21:00)";
    btn.style.background = "rgba(96, 239, 255, 0.2)";
    showToast("Lumen Roof 3D: Kechki lyuminestsensiya rejimiga o'tildi.");
  }
};

window.playVoiceAgentAudioTest = function(btn, e) {
  if (e) e.stopPropagation();
  if (typeof playSuccessChord === "function") playSuccessChord();
  btn.textContent = "🎙 Ovoz Sintez Qilinmoqda...";
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = "✓ Opus 48kHz: 'Assalomu alaykum!'";
    btn.style.background = "#a855f7";
    btn.style.color = "#ffffff";
    showToast("AI Agent: Ovozli suhbat oqimi muvaffaqiyatli uzatildi (< 280ms).");

    setTimeout(() => {
      btn.textContent = "▶ Ovozli Agent Sintez Testi";
      btn.style.background = "";
      btn.style.color = "";
      btn.disabled = false;
    }, 4000);
  }, 600);
};
