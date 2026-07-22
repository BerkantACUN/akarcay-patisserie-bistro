/* ═══════════════════════════════════════════════════════════
   Sayfa çevirme sesi — Web Audio ile sentezlenir

   Ses dosyası indirilmez: filtrelenmiş gürültü patlaması + hızla
   süpürülen bant geçiren filtre, kâğıt hışırtısını taklit eder.
   Tarayıcı kuralları gereği ses bağlamı ancak ilk kullanıcı
   etkileşiminden sonra açılır.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const ANAHTAR = "akarcay-ses";

  function Ses() {
    this.baglam = null;
    this.gurultu = null;
    this.acik = localStorage.getItem(ANAHTAR) !== "kapali";
  }

  /** Kısa bir beyaz gürültü tamponu üretir (bir kez). */
  Ses.prototype.hazirla = function () {
    if (this.baglam) return true;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    this.baglam = new AudioCtx();
    const uzunluk = Math.floor(this.baglam.sampleRate * 0.5);
    this.gurultu = this.baglam.createBuffer(1, uzunluk, this.baglam.sampleRate);
    const veri = this.gurultu.getChannelData(0);
    for (let i = 0; i < uzunluk; i += 1) {
      veri[i] = Math.random() * 2 - 1;
    }
    return true;
  };

  /**
   * Kâğıt çevirme sesi çalar.
   * @param {number} guc 0–1 arası şiddet (kısa çevirmeler daha sessiz)
   */
  Ses.prototype.cevir = function (guc) {
    if (!this.acik || !this.hazirla()) return;
    if (this.baglam.state === "suspended") this.baglam.resume();

    const c = this.baglam;
    const simdi = c.currentTime;
    const siddet = AK.clamp(guc == null ? 1 : guc, 0.2, 1);

    const kaynak = c.createBufferSource();
    kaynak.buffer = this.gurultu;
    kaynak.playbackRate.value = 0.85 + Math.random() * 0.3;

    // Bant geçiren süpürme: kâğıdın havayı yarma sesi
    const filtre = c.createBiquadFilter();
    filtre.type = "bandpass";
    filtre.Q.value = 0.9;
    filtre.frequency.setValueAtTime(760, simdi);
    filtre.frequency.exponentialRampToValueAtTime(2600, simdi + 0.09);
    filtre.frequency.exponentialRampToValueAtTime(520, simdi + 0.26);

    // Yüksek frekansları törpüle — dijital cızırtıyı önler
    const tepe = c.createBiquadFilter();
    tepe.type = "lowpass";
    tepe.frequency.value = 5200;

    const kazanc = c.createGain();
    kazanc.gain.setValueAtTime(0, simdi);
    kazanc.gain.linearRampToValueAtTime(0.13 * siddet, simdi + 0.018);
    kazanc.gain.exponentialRampToValueAtTime(0.0001, simdi + 0.3);

    kaynak.connect(filtre);
    filtre.connect(tepe);
    tepe.connect(kazanc);
    kazanc.connect(c.destination);

    kaynak.start(simdi);
    kaynak.stop(simdi + 0.34);
  };

  Ses.prototype.degistir = function () {
    this.acik = !this.acik;
    localStorage.setItem(ANAHTAR, this.acik ? "acik" : "kapali");
    return this.acik;
  };

  window.AKSes = new Ses();
})();
