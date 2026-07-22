/* ═══════════════════════════════════════════════════════════
   Fare paralaksı + vitrin eğimi

   Katmanlar imleci derinlik katsayısıyla izler (data-derinlik =
   px cinsinden gezinme yarıçapı). Tüm yazma işlemleri tek rAF
   döngüsünde toplanır; hedefe varınca döngü uyur.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const YUMUSAMA = 0.08;
  const ESIK = 0.0004;

  function Paralaks(kok) {
    this.katmanlar = AK.qsa("[data-derinlik]", kok);
    this.egimler = AK.qsa("[data-egim]", kok);
    this.hedefX = 0;
    this.hedefY = 0;
    this.x = 0;
    this.y = 0;
    this.uyuyor = true;
    this.acik = !AK.azHareket() && !AK.dokunmatik();

    if (!this.acik || !this.katmanlar.length) return;

    this.dongu = this.dongu.bind(this);
    window.addEventListener("mousemove", (o) => this.imlec(o), { passive: true });
    AK.gorunurlukte(
      () => (this.acik = false),
      () => {
        this.acik = true;
        this.uyandir();
      }
    );
  }

  Paralaks.prototype.imlec = function (olay) {
    // -0.5 … 0.5 aralığına normalize edilmiş imleç konumu
    this.hedefX = olay.clientX / window.innerWidth - 0.5;
    this.hedefY = olay.clientY / window.innerHeight - 0.5;
    this.uyandir();
  };

  Paralaks.prototype.uyandir = function () {
    if (this.uyuyor && this.acik) {
      this.uyuyor = false;
      requestAnimationFrame(this.dongu);
    }
  };

  Paralaks.prototype.dongu = function () {
    this.x = AK.lerp(this.x, this.hedefX, YUMUSAMA);
    this.y = AK.lerp(this.y, this.hedefY, YUMUSAMA);

    for (let i = 0; i < this.katmanlar.length; i += 1) {
      const el = this.katmanlar[i];
      const d = parseFloat(el.dataset.derinlik) || 0;
      el.style.translate = `${(this.x * d).toFixed(2)}px ${(this.y * d * 0.82).toFixed(2)}px`;
    }

    // Vitrin ürünü imlece doğru hafifçe eğilir — sahte derinlik
    for (let i = 0; i < this.egimler.length; i += 1) {
      this.egimler[i].style.transform =
        `perspective(900px) rotateY(${(this.x * 13).toFixed(2)}deg) ` +
        `rotateX(${(-this.y * 9).toFixed(2)}deg)`;
    }

    const durgun =
      Math.abs(this.x - this.hedefX) < ESIK && Math.abs(this.y - this.hedefY) < ESIK;
    if (durgun || !this.acik) {
      this.uyuyor = true;
      return;
    }
    requestAnimationFrame(this.dongu);
  };

  window.AKParalaks = Paralaks;
})();
