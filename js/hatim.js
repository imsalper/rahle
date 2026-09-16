/**
 * Rahle (رَحْلَة) — Hatim Modülü
 * 30 Günlük Hedef Takvimi, Sesli Okuma + Eş Zamanlı Ayet Vurgulama (Karaoke) ve Hatim Duası
 */

class HatimManager {
  constructor() {
    this.storageKey = "rahle_hatim_state_v2";
    this.audio = new Audio();
    this.isPlaying = false;
    this.currentQariId = "alafasy";
    this.currentSurahId = 1; // Varsayılan Fatiha
    this.currentVerseIndex = 0;

    this.state = {
      startDate: new Date().toISOString().slice(0, 10),
      juzStatus: {}, // { 1: "completed", 2: "reading", ... }
      bookmark: { juz: 1, page: 1, note: "Fâtiha Sûresi" },
      completedCount: 0
    };

    this.init();
  }

  init() {
    this.loadState();
    this.setupAudioListeners();
  }

  loadState() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = { ...this.state, ...parsed };
      } else {
        // İlk başlangıçta 1. cüz okunuyor olarak işaretlenir
        this.state.juzStatus[1] = "reading";
        this.saveState();
      }
    } catch (e) {
      console.error("Hatim durumu yüklenemedi:", e);
    }
  }

  saveState() {
    try {
      // Tamamlanan cüz sayısını hesapla
      this.state.completedCount = Object.values(this.state.juzStatus).filter(s => s === "completed").length;
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}
  }

  // 30 Günlük Hedef Hesaplama
  calculatePlan() {
    const start = new Date(this.state.startDate);
    const today = new Date();
    // Gün farkı
    const diffTime = today.setHours(0,0,0,0) - start.setHours(0,0,0,0);
    const dayNumber = Math.max(1, Math.min(30, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1));

    const totalPages = 604;
    const completedJuz = this.state.completedCount;
    const completedPages = completedJuz * 20; // Ortalama 20 sayfa/cüz
    const progressPercent = Math.min(100, Math.round((completedJuz / 30) * 100));

    // Hedeflenen cüz (gün 1 ise 1. cüz, gün 5 ise 5. cüz)
    const expectedJuz = dayNumber;
    const isBehind = completedJuz < expectedJuz - 1;
    const behindCount = Math.max(0, expectedJuz - completedJuz);

    return {
      dayNumber,
      todayTargetJuz: dayNumber,
      todayTargetPages: `${(dayNumber - 1) * 20 + 1} – ${Math.min(604, dayNumber * 20)}`,
      completedJuz,
      completedPages,
      progressPercent,
      isBehind,
      behindCount
    };
  }

  setStartDate(dateStr) {
    this.state.startDate = dateStr;
    this.saveState();
  }

  toggleJuzStatus(juzNum) {
    const current = this.state.juzStatus[juzNum] || "unread";
    let next = "reading";
    if (current === "reading") next = "completed";
    else if (current === "completed") next = "unread";

    this.state.juzStatus[juzNum] = next;
    this.saveState();
    return next;
  }

  setBookmark(juz, page, note = "") {
    this.state.bookmark = { juz, page, note };
    this.saveState();
  }

  // ==== SESLİ OKUMA & AYET VURGULAMA (KARAOKE SİSTEMİ) ====
  setupAudioListeners() {
    this.audio.addEventListener("ended", () => {
      this.playNextVerse();
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Ses yüklenemedi:", e);
      this.isPlaying = false;
      this.updatePlayPauseButtonUI();
    });
  }

  setQari(qariId) {
    this.currentQariId = qariId;
    if (this.isPlaying) {
      this.playCurrentVerse();
    }
  }

  setSurah(surahId) {
    this.currentSurahId = parseInt(surahId, 10);
    this.currentVerseIndex = 0;
    this.stopAudio();
    this.renderKaraokeView();
  }

  playCurrentVerse() {
    const surah = KARAOKE_SURAHS[this.currentSurahId];
    if (!surah || !surah.verses[this.currentVerseIndex]) return;

    const verse = surah.verses[this.currentVerseIndex];
    const qari = QARI_LIST.find(q => q.id === this.currentQariId) || QARI_LIST[0];
    const audioUrl = `${qari.baseUrl}${verse.fileCode}`;

    this.audio.src = audioUrl;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayPauseButtonUI();
      this.highlightActiveVerse();
    }).catch(err => {
      console.warn("Otomatik oynatma kısıtlaması:", err);
      this.isPlaying = false;
      this.updatePlayPauseButtonUI();
    });
  }

  playNextVerse() {
    const surah = KARAOKE_SURAHS[this.currentSurahId];
    if (surah && this.currentVerseIndex < surah.verses.length - 1) {
      this.currentVerseIndex++;
      this.playCurrentVerse();
    } else {
      // Sûre bitti
      this.isPlaying = false;
      this.currentVerseIndex = 0;
      this.updatePlayPauseButtonUI();
      this.highlightActiveVerse();
    }
  }

  playPrevVerse() {
    if (this.currentVerseIndex > 0) {
      this.currentVerseIndex--;
      this.playCurrentVerse();
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      if (!this.audio.src || this.audio.ended) {
        this.playCurrentVerse();
      } else {
        this.audio.play();
        this.isPlaying = true;
      }
    }
    this.updatePlayPauseButtonUI();
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.updatePlayPauseButtonUI();
  }

  highlightActiveVerse() {
    // Ekranda aktif ayeti altın rengiyle vurgula ve oraya kaydır
    document.querySelectorAll(".karaoke-verse-card").forEach((card, idx) => {
      if (idx === this.currentVerseIndex) {
        card.classList.add("active-verse-highlight");
        card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        card.classList.remove("active-verse-highlight");
      }
    });
  }

  updatePlayPauseButtonUI() {
    const btn = document.getElementById("karaoke-play-pause-btn");
    if (!btn) return;
    if (this.isPlaying) {
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
        <span>Duraklat</span>
      `;
      btn.classList.add("is-playing");
    } else {
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span>Dinle & Vurgula</span>
      `;
      btn.classList.remove("is-playing");
    }
  }

  renderKaraokeView() {
    const container = document.getElementById("karaoke-verses-container");
    if (!container) return;

    const surah = KARAOKE_SURAHS[this.currentSurahId] || KARAOKE_SURAHS[1];
    container.innerHTML = surah.verses.map((verse, idx) => `
      <div class="karaoke-verse-card ${idx === this.currentVerseIndex ? 'active-verse-highlight' : ''}" data-index="${idx}">
        <div class="karaoke-verse-num">
          <span class="verse-circle">${verse.verseNumber}</span>
        </div>
        <div class="karaoke-verse-content">
          <p class="arabic-verse-text">${verse.arabic}</p>
          <p class="turkish-verse-text">${verse.turkish}</p>
        </div>
      </div>
    `).join("");

    // Ayete doğrudan tıklayarak o ayetten dinlemeye başlama
    container.querySelectorAll(".karaoke-verse-card").forEach(card => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.getAttribute("data-index"), 10);
        this.currentVerseIndex = idx;
        this.playCurrentVerse();
      });
    });
  }
}
