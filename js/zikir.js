/**
 * Rahle (رَحْلَة) — Zikirmatik Modülü
 * Dokunmatik tesbihat, haptik titreşim, Web Audio sentezleyici, 33'lük namaz döngüsü ve hedef takibi
 */

class ZikirEngine {
  constructor() {
    this.storageKey = "rahle_zikir_state_v1";
    this.customDhikrsKey = "rahle_custom_dhikrs_v1";
    this.dailyKey = "rahle_daily_counts_v1";

    this.audioCtx = null;
    this.soundEnabled = true;
    this.vibrationEnabled = true;

    // Aktif zikir ve sayaç
    this.dhikrs = [];
    this.currentDhikrIndex = 0;
    this.count = 0;
    this.target = 33;
    this.laps = 0;
    this.isNamazMode = false;
    this.namazStep = 0; // 0: Sübhanallah (33), 1: Elhamdülillah (33), 2: Allahu Ekber (33)

    this.init();
  }

  init() {
    this.loadDhikrs();
    this.loadState();
    this.setupAudio();
  }

  setupAudio() {
    // İlk kullanıcı etkileşiminde başlatılır
    if (typeof window !== "undefined") {
      const initAudio = () => {
        if (!this.audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            this.audioCtx = new AudioContextClass();
          }
        }
        if (this.audioCtx && this.audioCtx.state === "suspended") {
          this.audioCtx.resume();
        }
        window.removeEventListener("pointerdown", initAudio);
      };
      window.addEventListener("pointerdown", initAudio, { once: true });
    }
  }

  // Sentetik Yumuşak Ahşap Tesbih Tık Sesi
  playClickSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const t = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.035);

      gain.gain.setValueAtTime(0.32, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {
      // Audio fallback
    }
  }

  // Hedef Tamamlama Altın Zil / Melodik Sesi
  playTargetChime() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Huzur Akoru)
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.24, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.48);
      });
    } catch (e) {}
  }

  triggerVibration(type = "normal") {
    if (!this.vibrationEnabled || !("vibrate" in navigator)) return;
    try {
      if (type === "target") {
        navigator.vibrate([35, 50, 65]);
      } else {
        navigator.vibrate(14);
      }
    } catch (e) {}
  }

  loadDhikrs() {
    try {
      const customRaw = localStorage.getItem(this.customDhikrsKey);
      const customList = customRaw ? JSON.parse(customRaw) : [];
      this.dhikrs = [...DEFAULT_DHIKRS, ...customList];
    } catch (e) {
      this.dhikrs = [...DEFAULT_DHIKRS];
    }
  }

  saveCustomDhikr(dhikrObj) {
    try {
      const customRaw = localStorage.getItem(this.customDhikrsKey);
      const customList = customRaw ? JSON.parse(customRaw) : [];
      customList.push(dhikrObj);
      localStorage.setItem(this.customDhikrsKey, JSON.stringify(customList));
      this.loadDhikrs();
      this.selectDhikrById(dhikrObj.id);
    } catch (e) {
      console.error("Özel zikir kaydedilemedi:", e);
    }
  }

  loadState() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const state = JSON.parse(raw);
        this.currentDhikrIndex = Math.min(state.currentDhikrIndex || 0, this.dhikrs.length - 1);
        this.count = state.count || 0;
        this.target = state.target || (this.getCurrentDhikr()?.defaultTarget || 33);
        this.laps = state.laps || 0;
        this.isNamazMode = !!state.isNamazMode;
        this.namazStep = state.namazStep || 0;
        this.soundEnabled = state.soundEnabled !== false;
        this.vibrationEnabled = state.vibrationEnabled !== false;
      } else {
        this.target = this.getCurrentDhikr()?.defaultTarget || 33;
      }
    } catch (e) {
      this.target = 33;
    }
  }

  saveState() {
    try {
      const state = {
        currentDhikrIndex: this.currentDhikrIndex,
        count: this.count,
        target: this.target,
        laps: this.laps,
        isNamazMode: this.isNamazMode,
        namazStep: this.namazStep,
        soundEnabled: this.soundEnabled,
        vibrationEnabled: this.vibrationEnabled
      };
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (e) {}
  }

  getCurrentDhikr() {
    return this.dhikrs[this.currentDhikrIndex] || this.dhikrs[0];
  }

  selectDhikrById(id) {
    const idx = this.dhikrs.findIndex(d => d.id === id);
    if (idx !== -1) {
      this.currentDhikrIndex = idx;
      this.isNamazMode = false;
      this.count = 0;
      this.laps = 0;
      this.target = this.dhikrs[idx].defaultTarget || 33;
      this.saveState();
    }
  }

  startNamazMode() {
    this.isNamazMode = true;
    this.namazStep = 0;
    this.currentDhikrIndex = 0; // Sübhanallah
    this.count = 0;
    this.laps = 0;
    this.target = 33;
    this.saveState();
  }

  increment() {
    this.count++;
    this.recordDailyCount();

    const targetReached = this.target > 0 && this.count >= this.target;

    if (targetReached) {
      this.laps++;
      this.playTargetChime();
      this.triggerVibration("target");

      if (this.isNamazMode) {
        this.advanceNamazStep();
      } else {
        // Normal modda hedef tamamlandı: sıfırla ve tur artır
        this.count = 0;
      }
    } else {
      this.playClickSound();
      this.triggerVibration("normal");
    }

    this.saveState();
    return {
      count: this.count,
      target: this.target,
      laps: this.laps,
      targetReached,
      isNamazMode: this.isNamazMode
    };
  }

  advanceNamazStep() {
    // 0: Sübhanallah (33) -> 1: Elhamdülillah (33) -> 2: Allahu Ekber (33) -> 3: Tevhid
    this.namazStep = (this.namazStep + 1) % 3;
    this.count = 0;
    if (this.namazStep === 0) {
      this.currentDhikrIndex = 0; // Sübhanallah
    } else if (this.namazStep === 1) {
      this.currentDhikrIndex = 1; // Elhamdülillah
    } else if (this.namazStep === 2) {
      this.currentDhikrIndex = 2; // Allahu Ekber
    }
  }

  setTarget(newTarget) {
    this.target = parseInt(newTarget, 10) || 0;
    this.saveState();
  }

  reset() {
    this.count = 0;
    this.laps = 0;
    if (this.isNamazMode) {
      this.namazStep = 0;
      this.currentDhikrIndex = 0;
    }
    this.saveState();
  }

  recordDailyCount() {
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem(this.dailyKey);
      const data = raw ? JSON.parse(raw) : {};
      data[todayStr] = (data[todayStr] || 0) + 1;
      localStorage.setItem(this.dailyKey, JSON.stringify(data));
    } catch (e) {}
  }

  getTodayTotal() {
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem(this.dailyKey);
      const data = raw ? JSON.parse(raw) : {};
      return data[todayStr] || 0;
    } catch (e) {
      return 0;
    }
  }
}
