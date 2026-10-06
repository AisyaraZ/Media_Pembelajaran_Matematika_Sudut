// Sound & Voice Engine using Web Audio API Synthesizer + Web Speech API
// Zero external mp3 dependencies required, never breaks or 404s!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmTimer = null;
    this.isBgmPlaying = false;
    this.bgmEnabled = true;
    this.sfxEnabled = true;
    this.voiceEnabled = true;
    this.masterVolume = 0.6;
    this.stepIndex = 0;
  }

  initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => { });
    }
  }

  setSettings({ bgmEnabled, sfxEnabled, voiceEnabled, volume }) {
    if (bgmEnabled !== undefined) this.bgmEnabled = bgmEnabled;
    if (sfxEnabled !== undefined) this.sfxEnabled = sfxEnabled;
    if (voiceEnabled !== undefined) this.voiceEnabled = voiceEnabled;
    if (volume !== undefined) this.masterVolume = volume;

    if (!this.bgmEnabled && this.isBgmPlaying) {
      this.stopBGM();
    } else if (this.bgmEnabled && !this.isBgmPlaying) {
      this.startBGM();
    }
  }

  // Play gentle pop for buttons
  playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15 * this.masterVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Play cheerful success chime
  playCorrect() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2 * this.masterVolume, this.ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.35);
      });
    } catch (e) { }
  }

  // Play gentle encouraging tone
  playIncorrect() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [392.00, 329.63]; // G4 -> E4
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.12);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.18 * this.masterVolume, this.ctx.currentTime + i * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.12);
        osc.stop(this.ctx.currentTime + i * 0.12 + 0.3);
      });
    } catch (e) { }
  }

  // Play triumphant fanfare for badge/finish
  playFanfare() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const melody = [
        { f: 523.25, d: 0.15 },
        { f: 523.25, d: 0.15 },
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.3 },
        { f: 783.99, d: 0.3 },
        { f: 1046.50, d: 0.6 }
      ];
      let t = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, t);

        gain.gain.setValueAtTime(0.22 * this.masterVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + item.d);
        t += item.d * 0.9;
      });
    } catch (e) { }
  }

  // Gentle procedural BGM (cheerful calm island adventure marimba)
  startBGM() {
    if (!this.bgmEnabled || this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.initCtx();

    // Pentatonic calm happy scale: C4, D4, E4, G4, A4, C5
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    const pattern = [0, 2, 3, 2, 4, 3, 2, 1, 0, 3, 4, 5, 4, 3, 2, 0];

    const playNote = () => {
      if (!this.isBgmPlaying || !this.bgmEnabled) return;
      if (this.ctx && this.ctx.state === 'running') {
        const noteIndex = pattern[this.stepIndex % pattern.length];
        this.stepIndex++;
        const freq = scale[noteIndex];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const vol = 0.045 * this.masterVolume;
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.55);
      }
      this.bgmTimer = setTimeout(playNote, 420);
    };

    playNote();
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // Natural friendly Speech Synthesis in Indonesian with natural pacing
  speak(text) {
    if (!this.voiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // cancel previous
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.92; // Natural, kid-friendly friendly tempo
      utterance.pitch = 1.05; // Bright, warm tone

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
      if (idVoice) utterance.voice = idVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable', e);
    }
  }

  stopVoice() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
