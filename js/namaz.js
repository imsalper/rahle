/**
 * Rahle (رَحْلَة) — Namaz Hocası Modülü
 * Rekat rekat namaz kılınış rehberi, kadın/erkek duruş farkları, dualar ve video rehberi
 */

class NamazManager {
  constructor() {
    this.gender = "erkek"; // "erkek" veya "kadin"
    this.currentVakitId = "sabah";
    this.currentRekatIndex = 0; // 0: 1. Rekat, 1: 2. Rekat
    this.currentPartIndex = 0; // Sünnet / Farz
    this.activeDua = null;

    this.init();
  }

  init() {
    this.loadSettings();
  }

  loadSettings() {
    try {
      const g = localStorage.getItem("rahle_namaz_gender");
      if (g) this.gender = g;
    } catch (e) {}
  }

  setGender(gender) {
    this.gender = gender;
    try {
      localStorage.setItem("rahle_namaz_gender", gender);
    } catch (e) {}
    this.renderRekatGuide();
  }

  setVakit(vakitId) {
    this.currentVakitId = vakitId;
    this.currentPartIndex = 0;
    this.currentRekatIndex = 0;
    this.renderVakitInfo();
    this.renderRekatGuide();
  }

  setRekat(rekatIndex) {
    this.currentRekatIndex = rekatIndex;
    this.renderRekatGuide();
  }

  renderVakitInfo() {
    if (typeof document === "undefined") return;
    const vakit = NAMAZ_DATABASE.vakitler.find(v => v.id === this.currentVakitId) || NAMAZ_DATABASE.vakitler[0];
    const titleEl = document.getElementById("namaz-vakit-title");
    const descEl = document.getElementById("namaz-vakit-desc");
    const pillsContainer = document.getElementById("namaz-parts-pills");

    if (titleEl) titleEl.textContent = `${vakit.name} (${vakit.totalRekat} Rekat)`;
    if (descEl) descEl.textContent = vakit.description;

    if (pillsContainer) {
      pillsContainer.innerHTML = vakit.parts.map((p, idx) => `
        <button type="button" class="namaz-part-pill ${idx === this.currentPartIndex ? 'active' : ''}" data-part-index="${idx}">
          ${p.name}
        </button>
      `).join("");

      pillsContainer.querySelectorAll(".namaz-part-pill").forEach(btn => {
        btn.addEventListener("click", () => {
          this.currentPartIndex = parseInt(btn.getAttribute("data-part-index"), 10);
          this.currentRekatIndex = 0;
          this.renderVakitInfo();
          this.renderRekatGuide();
        });
      });
    }
  }

  renderRekatGuide() {
    if (typeof document === "undefined") return;
    const container = document.getElementById("namaz-rekat-steps-container");
    if (!container) return;

    const vakit = NAMAZ_DATABASE.vakitler.find(v => v.id === this.currentVakitId) || NAMAZ_DATABASE.vakitler[0];
    const currentPart = vakit.parts[this.currentPartIndex] || vakit.parts[0];
    const rekatData = NAMAZ_DATABASE.rekatAdimlari[this.currentRekatIndex] || NAMAZ_DATABASE.rekatAdimlari[0];

    // Rekat Sekmeleri
    const tabsContainer = document.getElementById("namaz-rekat-tabs");
    if (tabsContainer) {
      let tabsHtml = "";
      for (let r = 0; r < Math.min(currentPart.rekatCount, 4); r++) {
        tabsHtml += `
          <button type="button" class="rekat-tab-btn ${r === this.currentRekatIndex ? 'active' : ''}" data-rekat-idx="${r}">
            ${r + 1}. Rekat
          </button>
        `;
      }
      tabsContainer.innerHTML = tabsHtml;

      tabsContainer.querySelectorAll(".rekat-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          this.currentRekatIndex = parseInt(btn.getAttribute("data-rekat-idx"), 10);
          this.renderRekatGuide();
        });
      });
    }

    // Rekat Adımları
    container.innerHTML = rekatData.adimlar.map(adim => {
      const durusMetni = this.gender === "kadin" ? (adim.kadinDuruş || adim.aciklama || "") : (adim.erkekDuruş || adim.aciklama || "");

      let okunacaklarHtml = "";
      if (Array.isArray(adim.okunacaklar)) {
        okunacaklarHtml = `
          <div class="step-reading-box">
            <span class="step-reading-title">📖 Okunacaklar:</span>
            <ul class="step-reading-list">
              ${adim.okunacaklar.map(ok => `<li>${ok}</li>`).join("")}
            </ul>
          </div>
        `;
      }

      return `
        <div class="namaz-step-card">
          <div class="step-badge-num">${adim.adimNo}</div>
          <div class="step-content">
            <h4 class="step-name">${adim.isim}</h4>
            <p class="step-posture-text">
              <span class="gender-tag">${this.gender === 'kadin' ? 'Kadınlar İçin Duruş:' : 'Erkekler İçin Duruş:'}</span>
              ${durusMetni}
            </p>
            ${okunacaklarHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  renderDualarList() {
    if (typeof document === "undefined") return;
    const container = document.getElementById("namaz-dualar-container");
    if (!container) return;

    container.innerHTML = NAMAZ_DATABASE.dualar.map(dua => `
      <div class="dua-card" data-dua-id="${dua.id}">
        <div class="dua-header">
          <h4>${dua.name}</h4>
          <span class="dua-tag">Namaz Duası</span>
        </div>
        <p class="dua-arabic">${dua.arabic}</p>
        <div class="dua-okunus">
          <strong>Okunuşu:</strong> ${dua.okunus}
        </div>
        <div class="dua-meal">
          <strong>Meali:</strong> ${dua.meal}
        </div>
      </div>
    `).join("");
  }
}
