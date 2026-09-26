/**
 * DHARSHINI CRACKERS – PROCEDURAL FIREWORKS AUDIO SYNTHESIZER
 * Built using the Web Audio API with zero external audio assets.
 */

class FireworksSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // Sound is default ON per user preference
  }

  public init(): void {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      if (typeof window === "undefined") return;
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.55, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  public toggle(): boolean {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.55, this.ctx.currentTime, 0.05);
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Ascending rocket whoosh sound
   */
  public playLaunch(): void {
    if (!this.ctx) this.init();
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});

    try {
      const t = this.ctx.currentTime;
      const dur = 0.75;
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(320, t);
      filter.frequency.exponentialRampToValueAtTime(1350, t + dur);
      filter.Q.setValueAtTime(3.8, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.exponentialRampToValueAtTime(0.28, t + dur * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);

      noise.start(t);
      noise.stop(t + dur);
    } catch {
      // Audio safeguard
    }
  }

  /**
   * Deep aerial burst boom with sub-bass and thunder rumble
   */
  public playBurst(intensity: number = 1.0): void {
    if (!this.ctx) this.init();
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});

    try {
      const t = this.ctx.currentTime;
      const dur = 1.3;

      // Sub-bass sine thump
      const osc = this.ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(28, t + 0.45);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.75 * intensity, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(oscGain);
      if (this.masterGain) oscGain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + dur);

      // Rumble noise
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(550, t);
      filter.frequency.exponentialRampToValueAtTime(80, t + dur);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5 * intensity, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(noiseGain);
      if (this.masterGain) noiseGain.connect(this.masterGain);

      noise.start(t);
      noise.stop(t + dur);

      // Micro crackles (authentic firecracker sparks)
      if (intensity > 0.6) {
        setTimeout(() => this.playCrackles(7), 260);
      }
    } catch {
      // Audio safeguard
    }
  }

  /**
   * Signature firecracker sparkling crackles with authentic sawtooth oscillators
   */
  public playCrackles(count: number = 6): void {
    if (!this.ctx) this.init();
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (this.isMuted || !this.ctx) return;
        try {
          const t = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(750 + Math.random() * 1200, t);

          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.09, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

          osc.connect(gain);
          if (this.masterGain) gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.05);
        } catch {
          // Audio safeguard
        }
      }, Math.random() * 320);
    }
  }

  /**
   * Sparkle alias mapping to signature crackles
   */
  public playSparkle(count: number = 6): void {
    this.playCrackles(count);
  }
}

export const soundEngine = new FireworksSoundEngine();


