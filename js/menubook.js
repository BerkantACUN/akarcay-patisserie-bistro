/* ═══════════════════════════════════════════════════════════
   Menü kitabı — StPageFlip üzerine kurulu, içerikten render

   Sayfalar AKAR_CONTENT.menu'den üretilir; admin paneli sayfa
   ekleyip sildiğinde kitap kendiliğinden yeniden dizilir.
   Çevirme sesi Web Audio ile sentezlenir (AKSes).
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const EN_BOY = 0.72; // sayfa en/boy oranı
  const MASA_GENISLIK = 1180; // iki sayfalık açılımın azami genişliği

  function kacis(metin) {
    const d = document.createElement("div");
    d.textContent = metin == null ? "" : String(metin);
    return d.innerHTML;
  }

  function Kitap(kok) {
    this.kok = kok;
    this.veri = (window.AKAR_CONTENT && window.AKAR_CONTENT.menu) || null;
    this.sayacEl = AK.qs(".kitap-sayac");
    this.oncekiEl = AK.qs(".kitap-onceki");
    this.sonrakiEl = AK.qs(".kitap-sonraki");
    this.sesEl = AK.qs(".ses-dugme");

    if (!kok || !this.veri || !window.St) return;

    this.sayfalariCiz();
    this.kur();
    this.kumandayiBagla();

    // Yeniden boyutlandırma dinleyicisi bir kez bağlanır
    window.addEventListener(
      "resize",
      AK.gecikmeli(() => this.olcuyuTazele(), 240)
    );
  }

  /* ── Sayfa işaretlemesi ── */
  Kitap.prototype.kapakHtml = function (s) {
    return (
      `<div class="sayfa-ic">` +
      `<img class="kapak-muhur" src="assets/logo/akarcay-muhur.svg" width="190" height="190" alt="">` +
      `<p class="kapak-ust">${kacis(s.ustBaslik)}</p>` +
      `<span class="kapak-cizgi"></span>` +
      `<h2 class="kapak-baslik">${kacis(s.baslik)}</h2>` +
      `<p class="kapak-alt">${kacis(s.altBaslik)}</p>` +
      `</div>`
    );
  };

  Kitap.prototype.listeHtml = function (s, no) {
    const kalemler = (s.kalemler || [])
      .map(
        (k) =>
          `<li class="kalem">` +
          `<span class="kalem-ust">` +
          `<span class="kalem-ad">${kacis(k.ad)}</span>` +
          `<span class="kalem-dolgu"></span>` +
          `<span class="kalem-fiyat">${kacis(k.fiyat || "")}</span>` +
          `</span>` +
          (k.not ? `<span class="kalem-not">${kacis(k.not)}</span>` : "") +
          `</li>`
      )
      .join("");

    return (
      `<div class="sayfa-ic">` +
      `<header class="sayfa-bas-blok">` +
      `<h2 class="sayfa-baslik">${kacis(s.baslik)}</h2>` +
      (s.altBaslik ? `<p class="sayfa-altbaslik">${kacis(s.altBaslik)}</p>` : "") +
      `</header>` +
      `<ul class="kalem-liste">${kalemler}</ul>` +
      `<p class="sayfa-numara">${AK.pad2(no)}</p>` +
      `</div>`
    );
  };

  Kitap.prototype.sayfalariCiz = function () {
    const v = this.veri;
    // Kapak + içerik + arka kapak; StPageFlip çift sayfa ister
    this.sayfalar = [v.kapak, ...(v.sayfalar || []), v.arkaKapak].filter(Boolean);

    // Tek sayıysa arka kapaktan önce boş sayfa ekle ki kapak sağda kalsın
    if (this.sayfalar.length % 2 === 1) {
      this.sayfalar.splice(this.sayfalar.length - 1, 0, { tip: "bos" });
    }

    let icerikNo = 0;
    this.kok.innerHTML = this.sayfalar
      .map((s) => {
        if (s.tip === "kapak") {
          return `<div class="sayfa sayfa-kapak" data-density="hard">${this.kapakHtml(s)}</div>`;
        }
        if (s.tip === "bos") {
          return `<div class="sayfa" data-density="soft"><div class="sayfa-ic"></div></div>`;
        }
        icerikNo += 1;
        return `<div class="sayfa" data-density="soft">${this.listeHtml(s, icerikNo)}</div>`;
      })
      .join("");
  };

  /* ── StPageFlip kurulumu ── */
  Kitap.prototype.olcu = function () {
    // Başlık, kumanda ve ipucu için ayrılan dikey pay
    const CEVRE = 340;
    const tek = window.innerWidth < 900;
    const alan = this.kok.parentElement;
    const kullanilabilirEn = (alan ? alan.clientWidth : window.innerWidth) - 8;

    let sayfaYuk = AK.clamp(window.innerHeight - CEVRE, 300, 760);
    let sayfaGen = sayfaYuk * EN_BOY;

    // Genişlik taşarsa yükseklikten kıs — kitap her zaman ekrana sığar
    const enSinir = tek ? kullanilabilirEn : Math.min(kullanilabilirEn, MASA_GENISLIK) / 2;
    if (sayfaGen > enSinir) {
      sayfaGen = enSinir;
      sayfaYuk = sayfaGen / EN_BOY;
    }
    return { genislik: Math.round(sayfaGen), yukseklik: Math.round(sayfaYuk), tek };
  };

  Kitap.prototype.kur = function () {
    const o = this.olcu();

    this.flip = new window.St.PageFlip(this.kok, {
      width: o.genislik,
      height: o.yukseklik,
      size: "fixed",
      showCover: true,
      usePortrait: true,
      maxShadowOpacity: 0.42,
      mobileScrollSupport: true,
      flippingTime: AK.azHareket() ? 1 : 780,
      drawShadow: true,
      swipeDistance: 24,
    });

    this.flip.loadFromHTML(this.kok.querySelectorAll(".sayfa"));
    this.kok.classList.add("hazir");
    window.AKkitap = this; // konsoldan ve ileride admin panelinden erişim

    this.flip.on("flip", () => this.sayaciGuncelle());
    this.flip.on("changeState", (o2) => {
      // Kullanıcı sayfayı sürüklemeye başlayınca sesi çal
      if (o2.data === "flipping") AKSes.cevir(0.85);
    });

    this.sayaciGuncelle();

    this.sonOlcu = `${o.genislik}x${o.yukseklik}`;
  };

  /** Sabit boyutlu kitap yeniden ölçeklenirken kurulum tazelenir. */
  Kitap.prototype.olcuyuTazele = function () {
    const y = this.olcu();
    const imza = `${y.genislik}x${y.yukseklik}`;
    if (imza === this.sonOlcu) return;

    const sayfa = this.flip.getCurrentPageIndex();
    this.flip.destroy();
    this.kok.classList.remove("hazir");
    this.sayfalariCiz();
    this.kur();
    if (sayfa > 0) this.flip.turnToPage(sayfa);
  };

  Kitap.prototype.sayaciGuncelle = function () {
    if (!this.flip) return;
    const simdi = this.flip.getCurrentPageIndex() + 1;
    const toplam = this.flip.getPageCount();

    if (this.sayacEl) {
      this.sayacEl.textContent = `${AK.pad2(simdi)} / ${AK.pad2(toplam)}`;
    }
    if (this.oncekiEl) this.oncekiEl.disabled = simdi <= 1;
    if (this.sonrakiEl) this.sonrakiEl.disabled = simdi >= toplam;
  };

  /* ── Kumanda: düğmeler, klavye, tekerlek ── */
  Kitap.prototype.kumandayiBagla = function () {
    const self = this;

    this.oncekiEl?.addEventListener("click", () => self.flip.flipPrev());
    this.sonrakiEl?.addEventListener("click", () => self.flip.flipNext());

    window.addEventListener("keydown", (o) => {
      if (o.key === "ArrowRight" || o.key === "PageDown") {
        o.preventDefault();
        self.flip.flipNext();
      } else if (o.key === "ArrowLeft" || o.key === "PageUp") {
        o.preventDefault();
        self.flip.flipPrev();
      }
    });

    // Dikey tekerlek de sayfa çevirsin — "yukarı kaydırınca sayfa dönsün"
    let toplam = 0;
    let kilit = false;
    window.addEventListener(
      "wheel",
      (o) => {
        if (kilit) return;
        toplam += o.deltaY;
        if (Math.abs(toplam) < 42) return;

        if (toplam > 0) self.flip.flipNext();
        else self.flip.flipPrev();

        toplam = 0;
        kilit = true;
        setTimeout(() => {
          kilit = false;
        }, 820);
      },
      { passive: true }
    );

    // Ses açma/kapama
    this.sesEl?.addEventListener("click", () => {
      const acik = AKSes.degistir();
      self.sesEl.setAttribute("aria-pressed", String(acik));
      self.sesEl.setAttribute("aria-label", acik ? "Sesi kapat" : "Sesi aç");
      if (acik) AKSes.cevir(0.7);
    });
    if (this.sesEl) {
      this.sesEl.setAttribute("aria-pressed", String(AKSes.acik));
    }
  };

  window.AKKitap = Kitap;
})();
