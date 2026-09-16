/**
 * Rahle (رَحْلَة) — Ana Uygulama Orkestratörü
 * Sekme navigasyonu, tema yönetimi, modal kontrolleri ve servis entegrasyonu
 */

document.addEventListener("DOMContentLoaded", () => {
  // Yönetici Örnekleri
  const zikirEngine = new ZikirEngine();
  const hatimManager = new HatimManager();
  const namazManager = new NamazManager();
  const fetvaManager = new FetvaManager();

  // DOM Referansları
  const navTabs = document.querySelectorAll(".nav-tab-item");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // ==== 1. SEKME GEÇİŞİ (TAB NAVIGATION) ====
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetTabId = tab.getAttribute("data-tab");

      navTabs.forEach(t => t.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetPanel = document.getElementById(targetTabId);
      if (targetPanel) {
        targetPanel.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Sekmeye özel ilk render tetiklemeleri
      if (targetTabId === "tab-hatim") {
        renderHatimUI();
      } else if (targetTabId === "tab-namaz") {
        namazManager.renderVakitInfo();
        namazManager.renderRekatGuide();
        namazManager.renderDualarList();
      } else if (targetTabId === "tab-profil") {
        renderProfilUI();
      }
    });
  });

  // ==== 2. TEMA YÖNETİMİ (KOYU / AÇIK MOD) ====
  function initTheme() {
    const savedTheme = localStorage.getItem("rahle_theme") || "dark";
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
      if (themeToggleBtn) themeToggleBtn.innerHTML = `🌙 <span class="hide-mobile">Gece Modu</span>`;
    } else {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
      if (themeToggleBtn) themeToggleBtn.innerHTML = `☀️ <span class="hide-mobile">Açık Mod</span>`;
    }
    localStorage.setItem("rahle_theme", theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isLight = document.body.classList.contains("theme-light");
      applyTheme(isLight ? "dark" : "light");
    });
  }

  // ==== 3. ZİKİRMATİK ENTEGRASYONU ====
  const zikirBigCounter = document.getElementById("zikir-big-counter");
  const zikirCountNumber = document.getElementById("zikir-count-number");
  const zikirTargetNumber = document.getElementById("zikir-target-number");
  const zikirLapNumber = document.getElementById("zikir-lap-number");
  const zikirArabicText = document.getElementById("zikir-arabic-text");
  const zikirNameText = document.getElementById("zikir-name-text");
  const zikirMeaningText = document.getElementById("zikir-meaning-text");
  const zikirProgressRing = document.getElementById("zikir-progress-ring");
  const zikirSelectDropdown = document.getElementById("zikir-select-dropdown");
  const btnZikirReset = document.getElementById("btn-zikir-reset");
  const btnNamazMode = document.getElementById("btn-namaz-mode");
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  const vibrationToggleBtn = document.getElementById("vibration-toggle-btn");

  function updateZikirUI() {
    const cur = zikirEngine.getCurrentDhikr();
    if (!cur) return;

    if (zikirCountNumber) zikirCountNumber.textContent = zikirEngine.count;
    if (zikirTargetNumber) zikirTargetNumber.textContent = zikirEngine.target > 0 ? zikirEngine.target : "∞";
    if (zikirLapNumber) zikirLapNumber.textContent = `${zikirEngine.laps} Tur`;

    if (zikirArabicText) zikirArabicText.textContent = cur.arabic;
    if (zikirNameText) zikirNameText.textContent = cur.name;
    if (zikirMeaningText) zikirMeaningText.textContent = cur.meaning;

    // Halka İlerlemesi
    if (zikirProgressRing) {
      const circumference = 2 * Math.PI * 96; // r=96
      const ratio = zikirEngine.target > 0 ? Math.min(1, zikirEngine.count / zikirEngine.target) : 0;
      const offset = circumference - ratio * circumference;
      zikirProgressRing.style.strokeDasharray = `${circumference}`;
      zikirProgressRing.style.strokeDashoffset = `${offset}`;
    }

    // Namaz Modu Vurgusu
    if (btnNamazMode) {
      if (zikirEngine.isNamazMode) {
        btnNamazMode.classList.add("active-pulse");
        btnNamazMode.textContent = `Namaz Tesbihatı (${zikirEngine.namazStep + 1}/3)`;
      } else {
        btnNamazMode.classList.remove("active-pulse");
        btnNamazMode.textContent = "33'lük Namaz Tesbihatı";
      }
    }
  }

  function populateDhikrSelect() {
    if (!zikirSelectDropdown) return;
    zikirSelectDropdown.innerHTML = zikirEngine.dhikrs.map(d => `
      <option value="${d.id}" ${d.id === zikirEngine.getCurrentDhikr().id ? 'selected' : ''}>
        ${d.name} (${d.defaultTarget} Hedef)
      </option>
    `).join("");
  }

  if (zikirBigCounter) {
    zikirBigCounter.addEventListener("pointerdown", (e) => {
      // Mikro dokunma ripple animasyonu
      createRipple(e, zikirBigCounter);
      const res = zikirEngine.increment();
      updateZikirUI();
    });
  }

  if (zikirSelectDropdown) {
    zikirSelectDropdown.addEventListener("change", (e) => {
      zikirEngine.selectDhikrById(e.target.value);
      updateZikirUI();
    });
  }

  if (btnNamazMode) {
    btnNamazMode.addEventListener("click", () => {
      zikirEngine.startNamazMode();
      populateDhikrSelect();
      updateZikirUI();
    });
  }

  if (btnZikirReset) {
    btnZikirReset.addEventListener("click", () => {
      if (confirm("Bu zikrin sayacını sıfırlamak istiyor musunuz?")) {
        zikirEngine.reset();
        updateZikirUI();
      }
    });
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      zikirEngine.soundEnabled = !zikirEngine.soundEnabled;
      soundToggleBtn.classList.toggle("muted", !zikirEngine.soundEnabled);
      soundToggleBtn.textContent = zikirEngine.soundEnabled ? "🔊 Ses Açık" : "🔇 Ses Kapalı";
      zikirEngine.saveState();
    });
  }

  if (vibrationToggleBtn) {
    vibrationToggleBtn.addEventListener("click", () => {
      zikirEngine.vibrationEnabled = !zikirEngine.vibrationEnabled;
      vibrationToggleBtn.classList.toggle("muted", !zikirEngine.vibrationEnabled);
      vibrationToggleBtn.textContent = zikirEngine.vibrationEnabled ? "📳 Titreşim Açık" : "📴 Titreşim Kapalı";
      zikirEngine.saveState();
    });
  }

  // ==== 4. HATİM TAKİBİ & KARAOKE ENTEGRASYONU ====
  const hatimStartDateInput = document.getElementById("hatim-start-date");
  const hatimDayBadge = document.getElementById("hatim-day-badge");
  const hatimProgressBar = document.getElementById("hatim-progress-bar");
  const hatimProgressPercent = document.getElementById("hatim-progress-percent");
  const hatimTargetPagesText = document.getElementById("hatim-target-pages-text");
  const hatimAlertBox = document.getElementById("hatim-alert-box");
  const juzGridContainer = document.getElementById("juz-grid-container");

  const karaokeSurahSelect = document.getElementById("karaoke-surah-select");
  const karaokeQariSelect = document.getElementById("karaoke-qari-select");
  const karaokePlayPauseBtn = document.getElementById("karaoke-play-pause-btn");
  const btnOpenHatimDuasi = document.getElementById("btn-open-hatim-duasi");
  const hatimDuasiModal = document.getElementById("hatim-duasi-modal");
  const hatimDuasiCloseBtn = document.getElementById("hatim-duasi-close-btn");

  function renderHatimUI() {
    const plan = hatimManager.calculatePlan();

    if (hatimStartDateInput) hatimStartDateInput.value = hatimManager.state.startDate;
    if (hatimDayBadge) hatimDayBadge.textContent = `${plan.dayNumber}. Gün / 30 Gün`;
    if (hatimProgressPercent) hatimProgressPercent.textContent = `%${plan.progressPercent} Tamamlandı (${plan.completedJuz}/30 Cüz)`;
    if (hatimProgressBar) hatimProgressBar.style.width = `${plan.progressPercent}%`;
    if (hatimTargetPagesText) hatimTargetPagesText.textContent = `Bugünün Hedefi: ${plan.todayTargetJuz}. Cüz (Sayfa ${plan.todayTargetPages})`;

    if (hatimAlertBox) {
      if (plan.isBehind) {
        hatimAlertBox.classList.remove("hidden");
        hatimAlertBox.innerHTML = `⚠️ Planın ${plan.behindCount} cüz gerisindesiniz. Günlük okumanıza fazladan sayfa ekleyerek telafi edebilirsiniz.`;
      } else {
        hatimAlertBox.classList.add("hidden");
      }
    }

    renderJuzGrid();
    hatimManager.renderKaraokeView();
  }

  function renderJuzGrid() {
    if (!juzGridContainer) return;
    juzGridContainer.innerHTML = JUZ_DATABASE.map(j => {
      const status = hatimManager.state.juzStatus[j.juz] || "unread";
      const statusLabel = status === "completed" ? "✓ Tamamlandı" : status === "reading" ? "📖 Okunuyor" : "○ Okunmadı";
      const statusClass = `status-${status}`;

      return `
        <div class="juz-card ${statusClass}" data-juz="${j.juz}">
          <div class="juz-header-row">
            <span class="juz-num-badge">${j.juz}. CÜZ</span>
            <button type="button" class="juz-status-pill ${statusClass}" data-juz-btn="${j.juz}">
              ${statusLabel}
            </button>
          </div>
          <div class="juz-surah-range">${j.surahRange}</div>
          <div class="juz-page-range">Sayfa: ${j.pages} · ${j.ayahs} Âyet</div>
          <p class="juz-desc">${j.description}</p>
        </div>
      `;
    }).join("");

    juzGridContainer.querySelectorAll(".juz-status-pill").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const juzNum = parseInt(btn.getAttribute("data-juz-btn"), 10);
        hatimManager.toggleJuzStatus(juzNum);
        renderHatimUI();
      });
    });
  }

  if (hatimStartDateInput) {
    hatimStartDateInput.addEventListener("change", (e) => {
      if (e.target.value) {
        hatimManager.setStartDate(e.target.value);
        renderHatimUI();
      }
    });
  }

  if (karaokeSurahSelect) {
    karaokeSurahSelect.addEventListener("change", (e) => {
      hatimManager.setSurah(e.target.value);
    });
  }

  if (karaokeQariSelect) {
    karaokeQariSelect.addEventListener("change", (e) => {
      hatimManager.setQari(e.target.value);
    });
  }

  if (karaokePlayPauseBtn) {
    karaokePlayPauseBtn.addEventListener("click", () => {
      hatimManager.togglePlayPause();
    });
  }

  // Hatim Duası Modalı
  if (btnOpenHatimDuasi) {
    btnOpenHatimDuasi.addEventListener("click", () => {
      if (hatimDuasiModal) hatimDuasiModal.classList.remove("hidden");
    });
  }
  if (hatimDuasiCloseBtn) {
    hatimDuasiCloseBtn.addEventListener("click", () => {
      if (hatimDuasiModal) hatimDuasiModal.classList.add("hidden");
    });
  }

  // ==== 5. NAMAZ HOCASI ENTEGRASYONU ====
  const namazGenderErkek = document.getElementById("gender-erkek-btn");
  const namazGenderKadin = document.getElementById("gender-kadin-btn");
  const namazVakitButtons = document.querySelectorAll(".vakit-tab-btn");

  if (namazGenderErkek && namazGenderKadin) {
    namazGenderErkek.addEventListener("click", () => {
      namazGenderErkek.classList.add("active");
      namazGenderKadin.classList.remove("active");
      namazManager.setGender("erkek");
    });

    namazGenderKadin.addEventListener("click", () => {
      namazGenderKadin.classList.add("active");
      namazGenderErkek.classList.remove("active");
      namazManager.setGender("kadin");
    });
  }

  namazVakitButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      namazVakitButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      namazManager.setVakit(btn.getAttribute("data-vakit"));
    });
  });

  // ==== 6. 4 MEZHEPLİ FETVA ENTEGRASYONU ====
  const fetvaInput = document.getElementById("fetva-query-input");
  const fetvaSearchBtn = document.getElementById("fetva-search-btn");
  const fetvaChips = document.querySelectorAll(".fetva-chip");

  function triggerFetvaSearch(q) {
    if (!q || !q.trim()) return;
    if (fetvaInput) fetvaInput.value = q;
    const res = fetvaManager.searchFetva(q);
    if (res) {
      fetvaManager.renderResult(res);
    }
  }

  if (fetvaSearchBtn) {
    fetvaSearchBtn.addEventListener("click", () => {
      if (fetvaInput) triggerFetvaSearch(fetvaInput.value);
    });
  }

  if (fetvaInput) {
    fetvaInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        triggerFetvaSearch(fetvaInput.value);
      }
    });
  }

  fetvaChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-query") || chip.textContent;
      triggerFetvaSearch(q);
    });
  });

  // ==== 7. PROFİL & İSTATİSTİKLER ====
  function renderProfilUI() {
    const todayTotal = zikirEngine.getTodayTotal();
    const completedJuz = hatimManager.state.completedCount;
    const todayCountEl = document.getElementById("profil-today-zikir");
    const completedJuzEl = document.getElementById("profil-completed-juz");
    const dailyInspirationEl = document.getElementById("profil-daily-verse");

    if (todayCountEl) todayCountEl.textContent = `${todayTotal} Adet`;
    if (completedJuzEl) completedJuzEl.textContent = `${completedJuz} / 30 Cüz`;

    if (dailyInspirationEl) {
      const dayIndex = new Date().getDate() % DAILY_INSPIRATIONS.length;
      const insp = DAILY_INSPIRATIONS[dayIndex];
      dailyInspirationEl.innerHTML = `
        <p class="arabic-quote">"${insp.arabic}"</p>
        <p class="meal-quote">"${insp.verse}"</p>
        <span class="source-quote">— ${insp.source}</span>
      `;
    }
  }

  // Ripple animasyonu yardımcısı
  function createRipple(event, element) {
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-effect");

    const existingRipple = element.querySelector(".ripple-effect");
    if (existingRipple) existingRipple.remove();

    element.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }

  // Başlat
  initTheme();
  populateDhikrSelect();
  updateZikirUI();
  renderHatimUI();
});
