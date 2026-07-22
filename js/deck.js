/* ═══════════════════════════════════════════════════════════
   SceneDeck — tam ekran dikey sahne destesi

   Tekerlek / dokunma / klavye / nokta gezinmesiyle tek adımlık
   geçişler. Koreografi CSS'te; burada durum makinesi ve kilit var.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const TEKER_ESIK = 34; // birikimli tekerlek eşiği (px)
  const KAYDIRMA_ESIK = 46; // dokunma kaydırma eşiği (px)
  const KILIT_MS = 1280; // geçiş boyunca girdi kilidi
  const CIKIS_MS = 680; // "cikiyor" sınıfının temizlenmesi

  function Deste(kok) {
    this.kok = kok;
    this.sahneler = AK.qsa(".sahne", kok);
    this.zeminler = AK.qsa(".zemin", kok);
    this.noktalar = AK.qsa(".noktalar [data-git]");
    this.baglantilar = AK.qsa("[data-git]");
    this.sayacSimdi = AK.qs(".sayac-simdi");
    this.sayacToplam = AK.qs(".sayac-toplam");
    this.ipucu = AK.qs(".ipucu");
    this.indeks = 0;
    this.kilitli = false;
    this.tekerToplam = 0;
    this.dokunusY = null;
    this.girdiAcik = true;
    this.az = AK.azHareket();

    if (!this.sahneler.length) return;

    if (this.sayacToplam) this.sayacToplam.textContent = AK.pad2(this.sahneler.length);
    this.girdileriBagla();
    this.durumUygula(0);
  }

  /* ── Durum: zemin, ton, noktalar, sayaç, erişilebilirlik ── */
  Deste.prototype.durumUygula = function (i) {
    const sahne = this.sahneler[i];

    this.zeminler.forEach((z, n) => z.classList.toggle("acik", n === i));

    const ton = sahne.dataset.sahneTone || "light";
    document.body.dataset.tone = ton;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", ton === "dark" ? "#71301C" : "#FFFFFF");

    this.noktalar.forEach((d, n) => {
      if (n === i) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });

    this.baglantilar.forEach((b) => {
      if (b.tagName !== "A") return;
      const hedef = parseInt(b.dataset.git, 10);
      if (hedef === i) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });

    this.sahneler.forEach((s, n) => {
      const etkin = n === i;
      s.setAttribute("aria-hidden", etkin ? "false" : "true");
      if ("inert" in s) s.inert = !etkin;
    });

    if (this.sayacSimdi) this.sayacSimdi.textContent = AK.pad2(i + 1);
    if (this.ipucu) this.ipucu.classList.toggle("gizli", i === this.sahneler.length - 1);

    if (sahne.id && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${sahne.id}`);
    }
  };

  /* ── Geçiş ── */
  Deste.prototype.git = function (hedef, yon) {
    hedef = AK.clamp(hedef, 0, this.sahneler.length - 1);
    if (hedef === this.indeks || this.kilitli) return;

    const simdiki = this.sahneler[this.indeks];
    const yeni = this.sahneler[hedef];
    const d = yon || (hedef > this.indeks ? 1 : -1);

    this.kilitli = true;
    this.kok.style.setProperty("--yon", String(d));

    simdiki.classList.remove("etkin");
    simdiki.classList.add("cikiyor");

    void yeni.offsetWidth; // yeni yön değeriyle konumlansın
    yeni.classList.add("etkin");

    this.indeks = hedef;
    this.durumUygula(hedef);

    setTimeout(() => simdiki.classList.remove("cikiyor"), this.az ? 20 : CIKIS_MS);
    setTimeout(
      () => {
        this.kilitli = false;
        this.tekerToplam = 0;
      },
      this.az ? 40 : KILIT_MS
    );
  };

  Deste.prototype.ileri = function () {
    this.git(this.indeks + 1, 1);
  };
  Deste.prototype.geri = function () {
    this.git(this.indeks - 1, -1);
  };

  /* ── Adres çubuğundaki bölüme animasyonsuz atla ── */
  Deste.prototype.adresteneAtla = function () {
    const ad = window.location.hash.replace("#", "");
    if (!ad) return;
    const hedef = this.sahneler.findIndex((s) => s.id === ad);
    if (hedef <= 0) return;

    this.sahneler[this.indeks].classList.remove("etkin");
    this.kok.classList.add("anim-yok");
    this.indeks = hedef;
    this.sahneler[hedef].classList.add("etkin");
    this.durumUygula(hedef);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => this.kok.classList.remove("anim-yok"))
    );
  };

  /* ── Girdiler ── */
  Deste.prototype.girdileriBagla = function () {
    const self = this;

    window.addEventListener(
      "wheel",
      (o) => {
        if (!self.girdiAcik) return;
        o.preventDefault();
        if (self.kilitli) return;

        self.tekerToplam += o.deltaY;
        if (self.tekerToplam > TEKER_ESIK) self.ileri();
        else if (self.tekerToplam < -TEKER_ESIK) self.geri();
      },
      { passive: false }
    );

    window.addEventListener(
      "touchstart",
      (o) => {
        if (o.touches.length === 1) self.dokunusY = o.touches[0].clientY;
      },
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      (o) => {
        if (!self.girdiAcik || self.dokunusY === null) return;
        const fark = self.dokunusY - o.changedTouches[0].clientY;
        self.dokunusY = null;
        if (Math.abs(fark) < KAYDIRMA_ESIK) return;
        if (fark > 0) self.ileri();
        else self.geri();
      },
      { passive: true }
    );

    window.addEventListener("keydown", (o) => {
      if (!self.girdiAcik) return;
      switch (o.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          o.preventDefault();
          self.ileri();
          break;
        case "ArrowUp":
        case "PageUp":
          o.preventDefault();
          self.geri();
          break;
        case "Home":
          o.preventDefault();
          self.git(0, -1);
          break;
        case "End":
          o.preventDefault();
          self.git(self.sahneler.length - 1, 1);
          break;
      }
    });

    this.baglantilar.forEach((b) => {
      b.addEventListener("click", (o) => {
        const hedef = parseInt(b.dataset.git, 10);
        if (Number.isNaN(hedef)) return;
        o.preventDefault();
        self.git(hedef);
      });
    });
  };

  window.AKDeste = Deste;
})();
