/* ═══════════════════════════════════════════════════════════
   Pastalar galerisi — içerikten render, süzgeç, ışık kutusu

   Kartlar AKAR_CONTENT.urunler'den üretilir; admin paneli aynı
   diziyi düzenleyince sayfa kendiliğinden güncellenir.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  function Galeri(kok) {
    this.kok = kok;
    this.urunler = (window.AKAR_CONTENT && window.AKAR_CONTENT.urunler) || [];
    this.suzgecKok = AK.qs(".suzgec");
    this.kutu = AK.qs(".isik-kutu");
    this.acikIndeks = -1;
    this.gorunur = this.urunler.slice();

    if (!kok || !this.urunler.length) return;

    this.kartlariCiz();
    this.suzgeciCiz();
    this.gozlemle();
    this.kutuyuBagla();
  }

  /* ── Kartlar ── */
  Galeri.prototype.kartlariCiz = function () {
    const parca = document.createDocumentFragment();

    this.urunler.forEach((urun, i) => {
      const kart = document.createElement("article");
      kart.className = "urun-kart";
      kart.dataset.grup = urun.grup;
      kart.dataset.indeks = String(i);
      kart.style.setProperty("--g", `${(i % 4) * 70}ms`);
      kart.tabIndex = 0;
      kart.setAttribute("role", "button");
      kart.setAttribute("aria-label", `${urun.ad} — büyük görsel`);

      kart.innerHTML =
        `<div class="urun-kart-gorsel">` +
        `<img src="assets/urun/${urun.slug}-sm.webp" alt="${urun.ad}" ` +
        `width="460" height="500" loading="lazy" decoding="async"></div>` +
        `<p class="urun-grup">${urun.grup}</p>` +
        `<h2 class="urun-ad">${urun.ad}</h2>` +
        `<p class="urun-not">${urun.not}</p>` +
        (urun.fiyat ? `<p class="urun-fiyat">${urun.fiyat}</p>` : "");

      kart.addEventListener("click", () => this.kutuyuAc(i));
      kart.addEventListener("keydown", (o) => {
        if (o.key === "Enter" || o.key === " ") {
          o.preventDefault();
          this.kutuyuAc(i);
        }
      });

      parca.appendChild(kart);
    });

    this.kok.appendChild(parca);
    this.kartlar = AK.qsa(".urun-kart", this.kok);
  };

  /* ── Süzgeç ── */
  Galeri.prototype.suzgeciCiz = function () {
    if (!this.suzgecKok) return;

    const gruplar = ["Tümü", ...new Set(this.urunler.map((u) => u.grup))];
    this.suzgecKok.innerHTML = gruplar
      .map(
        (g, i) =>
          `<button type="button" data-grup="${g}" aria-pressed="${i === 0}">${g}</button>`
      )
      .join("");

    this.suzgecKok.addEventListener("click", (o) => {
      const dugme = o.target.closest("button");
      if (!dugme) return;

      AK.qsa("button", this.suzgecKok).forEach((b) =>
        b.setAttribute("aria-pressed", String(b === dugme))
      );
      this.suz(dugme.dataset.grup);
    });
  };

  Galeri.prototype.suz = function (grup) {
    const hepsi = grup === "Tümü";
    this.gorunur = [];

    this.kartlar.forEach((kart, i) => {
      const uyuyor = hepsi || kart.dataset.grup === grup;
      kart.classList.toggle("suzuldu", !uyuyor);
      if (uyuyor) this.gorunur.push(this.urunler[i]);
    });

    // Yeniden beliren kartlar sırayla girsin
    let sira = 0;
    this.kartlar.forEach((kart) => {
      if (kart.classList.contains("suzuldu")) return;
      kart.classList.remove("gorundu");
      kart.style.setProperty("--g", `${(sira % 4) * 60}ms`);
      sira += 1;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => kart.classList.add("gorundu"))
      );
    });
  };

  /* ── Kaydırınca beliren kartlar ── */
  Galeri.prototype.gozlemle = function () {
    if (!("IntersectionObserver" in window) || AK.azHareket()) {
      this.kartlar.forEach((k) => k.classList.add("gorundu"));
      return;
    }

    const gozcu = new IntersectionObserver(
      (girisler) => {
        girisler.forEach((giris) => {
          if (!giris.isIntersecting) return;
          giris.target.classList.add("gorundu");
          gozcu.unobserve(giris.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    this.kartlar.forEach((k) => gozcu.observe(k));
  };

  /* ── Işık kutusu ── */
  Galeri.prototype.kutuyuBagla = function () {
    if (!this.kutu) return;

    AK.qs(".isik-kapat", this.kutu).addEventListener("click", () => this.kutuyuKapat());
    AK.qs(".isik-onceki", this.kutu).addEventListener("click", () => this.kaydir(-1));
    AK.qs(".isik-sonraki", this.kutu).addEventListener("click", () => this.kaydir(1));

    this.kutu.addEventListener("click", (o) => {
      if (o.target === this.kutu) this.kutuyuKapat();
    });

    window.addEventListener("keydown", (o) => {
      if (!this.kutu.classList.contains("acik")) return;
      if (o.key === "Escape") this.kutuyuKapat();
      if (o.key === "ArrowRight") this.kaydir(1);
      if (o.key === "ArrowLeft") this.kaydir(-1);
    });
  };

  Galeri.prototype.kutuyuAc = function (indeks) {
    const urun = this.urunler[indeks];
    if (!urun || !this.kutu) return;

    this.acikIndeks = indeks;
    AK.qs(".isik-icerik img", this.kutu).src = `assets/urun/${urun.slug}.webp`;
    AK.qs(".isik-icerik img", this.kutu).alt = urun.ad;
    AK.qs(".isik-ad", this.kutu).textContent = urun.ad;
    AK.qs(".isik-not", this.kutu).textContent = urun.not;

    this.kutu.classList.add("acik");
    this.kutu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    AK.qs(".isik-kapat", this.kutu).focus();
  };

  Galeri.prototype.kutuyuKapat = function () {
    this.kutu.classList.remove("acik");
    this.kutu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const kart = this.kartlar[this.acikIndeks];
    if (kart) kart.focus();
  };

  Galeri.prototype.kaydir = function (yon) {
    // Yalnızca süzgeçten geçen kartlar arasında dolaş
    const acik = this.kartlar.filter((k) => !k.classList.contains("suzuldu"));
    const siradaki = acik.findIndex(
      (k) => Number(k.dataset.indeks) === this.acikIndeks
    );
    if (siradaki < 0) return;
    const yeni = (siradaki + yon + acik.length) % acik.length;
    this.kutuyuAc(Number(acik[yeni].dataset.indeks));
  };

  window.AKGaleri = Galeri;
})();
