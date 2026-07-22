/* ═══════════════════════════════════════════════════════════
   Şeker serpintisi — sahnede süzülen ince pudra taneleri

   Tek canvas, sabit sayıda tane, cihaz gücüne göre ölçeklenir.
   Sekme arka plana düşünce döngü durur.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const RENKLER = ["#E3D9C6", "#C9962F", "#D8CBB2", "#C97A5C"];
  const TABAN_SAYI = 46;

  function Serpinti(tuval) {
    if (!tuval || AK.azHareket()) return;

    this.tuval = tuval;
    this.ctx = tuval.getContext("2d", { alpha: true });
    this.taneler = [];
    this.calisiyor = true;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.olcekle();
    this.uret();

    this.cizim = this.cizim.bind(this);
    requestAnimationFrame(this.cizim);

    window.addEventListener("resize", AK.gecikmeli(() => this.olcekle(), 180));
    AK.gorunurlukte(
      () => (this.calisiyor = false),
      () => {
        if (!this.calisiyor) {
          this.calisiyor = true;
          requestAnimationFrame(this.cizim);
        }
      }
    );
  }

  Serpinti.prototype.olcekle = function () {
    const g = this.tuval.clientWidth;
    const y = this.tuval.clientHeight;
    this.tuval.width = g * this.dpr;
    this.tuval.height = y * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.g = g;
    this.y = y;
  };

  Serpinti.prototype.uret = function () {
    // Dar ekranlarda daha az tane — mobilde pil ve kare hızı korunur
    const sayi = Math.round(TABAN_SAYI * (this.g < 760 ? 0.45 : 1));
    this.taneler = Array.from({ length: sayi }, () => this.tane(true));
  };

  Serpinti.prototype.tane = function (ilk) {
    return {
      x: Math.random() * this.g,
      y: ilk ? Math.random() * this.y : this.y + 12,
      r: 0.8 + Math.random() * 2.1,
      hiz: 0.14 + Math.random() * 0.42,
      salinim: 0.4 + Math.random() * 1.1,
      faz: Math.random() * Math.PI * 2,
      saydam: 0.16 + Math.random() * 0.42,
      renk: RENKLER[(Math.random() * RENKLER.length) | 0],
    };
  };

  Serpinti.prototype.cizim = function (zaman) {
    if (!this.calisiyor) return;

    const c = this.ctx;
    c.clearRect(0, 0, this.g, this.y);

    for (let i = 0; i < this.taneler.length; i += 1) {
      const t = this.taneler[i];
      t.y -= t.hiz;
      t.faz += 0.012;
      const x = t.x + Math.sin(t.faz) * t.salinim * 8;

      if (t.y < -12) this.taneler[i] = this.tane(false);

      c.globalAlpha = t.saydam;
      c.fillStyle = t.renk;
      c.beginPath();
      c.arc(x, t.y, t.r, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;

    requestAnimationFrame(this.cizim);
  };

  window.AKSerpinti = Serpinti;
})();
