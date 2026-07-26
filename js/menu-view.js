/* ═══════════════════════════════════════════════════════════
   Menü akışı — Kapak → Kategoriler → Detay

   Tüm içerik AKAR_MENU'den (js/menu-data.js) render edilir.
   Sayfa kaydırılmaz; görünümler arası animasyonlu geçiş yapılır.
   Kategori/detay durumu hash ile paylaşılabilir (#kategori-slug).
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* Kategori slug'una göre line-art ikon (24×24 viewBox) */
  const IKON = {
    yumurta:
      '<path d="M12 3c-3.5 0-6 4.5-6 8a6 6 0 0 0 12 0c0-3.5-2.5-8-6-8Z" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    pizza:
      '<path d="M12 3 3 8c1.5 7 5 12 9 13 4-1 7.5-6 9-13L12 3Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="10" cy="9" r="1" fill="currentColor"/><circle cx="14" cy="11" r="1" fill="currentColor"/><circle cx="11" cy="14" r="1" fill="currentColor"/>',
    et:
      '<path d="M5 10a5 5 0 0 1 9-3l4-2c1 2-.5 4-2 4l1 2a4 4 0 0 1-7 4l-3 2c-2-1-3-4-1-6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
    kase:
      '<path d="M4 11h16a8 8 0 0 1-16 0Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 8c0-1.5 1-2 1.5-3M12 7.5c0-1.5 1-2 1.5-3M16 8c0-1.5 1-2 1.5-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>',
    sandvic:
      '<path d="M4 9l8-4 8 4-8 4-8-4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M5 13c2 1 3 1.5 7 1.5S17 14 19 13M5 16c2 1 3 1.5 7 1.5S17 17 19 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>',
    yaprak:
      '<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M5 19C9 15 13 12 17 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    kek:
      '<path d="M4 20h16v-7H4v7Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M4 13c2-3 4-3 8-3s6 0 8 3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7V4M12 4l1.5 1.5M12 4 10.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    fincan:
      '<path d="M5 8h11v5a5 5 0 0 1-10 0V8Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M16 9h2a2 2 0 0 1 0 4h-2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 5c0-1 .5-1.5 1-2M11 5c0-1 .5-1.5 1-2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    bardak:
      '<path d="M7 4h10l-1.2 15.5a1 1 0 0 1-1 .9H9.2a1 1 0 0 1-1-.9L7 4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M7.4 9h9.2" stroke="currentColor" stroke-width="1.4"/><path d="M13 2l-1 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    cezve:
      '<path d="M6 9h8v4a4 4 0 0 1-8 0V9Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 10h4M6 9l1.5-2h5L14 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  };

  const IKON_ESLEME = {
    "gune-baslarken": "yumurta",
    omlet: "yumurta",
    pizzalar: "pizza",
    noodle: "kase",
    "tavuk-yemekleri": "et",
    "et-yemekleri": "et",
    makarnalar: "kase",
    tostlar: "sandvic",
    aperatifler: "sandvic",
    "soguk-sandvicler": "sandvic",
    gozlemeler: "sandvic",
    hamburgerler: "sandvic",
    krepler: "sandvic",
    salatalar: "yaprak",
    "cheesecake-pastalar": "kek",
    "waffle-tatli": "kek",
    caylar: "fincan",
    "turk-kahveleri": "cezve",
    "coffee-bar": "fincan",
    "matcha-bar": "bardak",
    "milkshake-smoothie": "bardak",
    frappe: "bardak",
    "ice-coffee-bar": "bardak",
    "vitamin-bar": "bardak",
    mocktail: "bardak",
  };

  function ikonFor(slug) {
    return IKON[IKON_ESLEME[slug] || "kase"] || IKON.kase;
  }

  function kacis(metin) {
    const d = document.createElement("div");
    d.textContent = metin == null ? "" : String(metin);
    return d.innerHTML;
  }

  function urunSayisi(kat) {
    let n = (kat.urunler || []).length + (kat.paketler || []).length;
    (kat.altGruplar || []).forEach((g) => (n += g.urunler.length));
    return n;
  }

  function MenuAkis(menu) {
    this.menu = menu;
    this.kategoriler = menu.kategoriler.filter((k) => !k.placeholder);
    this.katMap = {};
    this.kategoriler.forEach((k) => (this.katMap[k.slug] = k));
    this.aktif = "kapak";

    this.elKapak = document.getElementById("gorunum-kapak");
    this.elKategoriler = document.getElementById("gorunum-kategoriler");
    this.elDetay = document.getElementById("gorunum-detay");
    this.elGrid = document.getElementById("kat-grid");
    this.elDetayIc = document.getElementById("detay-govde");
    this.elDetayBaslik = document.getElementById("detay-bar-baslik");

    this.icindekileriCiz();
    this.olaylariBagla();
    this.buyutBagla();
    this.hashUygula(true);
  }

  /* ─────────── İçindekiler (karşılama + kategori listesi) ─────────── */
  MenuAkis.prototype.icindekileriCiz = function () {
    const ic = this.menu.icindekiler || {};

    const hg = document.getElementById("ic-hosgeldiniz");
    if (hg && ic.hosgeldiniz) {
      hg.innerHTML = ic.hosgeldiniz.map(kacis).join("<br>");
    }

    const metin = document.getElementById("ic-metin");
    if (metin && ic.paragraflar) {
      metin.innerHTML = ic.paragraflar
        .map((p) => `<p>${kacis(p)}</p>`)
        .join('<span class="ic-nokta" aria-hidden="true"><svg viewBox="0 0 40 20"><use href="#cicek-ayrac"/></svg></span>');
    }

    const alt = document.getElementById("ic-alt");
    if (alt && ic.altYazi) {
      alt.innerHTML = ic.altYazi
        .map((a) => `<span>${kacis(a)}</span>`)
        .join('<i aria-hidden="true">·</i>');
    }

    // Kategori kutuları: arka planda ilgili menü fotoğrafı + isim
    if (this.elGrid) {
      this.elGrid.innerHTML = this.kategoriler
        .map((k, i) => {
          const gorsel = this.gorselYollari(k)[0];
          return (
            `<button class="kat-kutu" type="button" data-slug="${k.slug}" style="--i:${i}">` +
            `<img class="kat-kutu-foto" src="${gorsel}" alt="" loading="lazy" decoding="async">` +
            `<span class="kat-kutu-ad">${kacis(k.ad)}</span>` +
            `</button>`
          );
        })
        .join("");
    }
  };

  /* ─────────── Detay ─────────── */
  MenuAkis.prototype.urunSatiri = function (u, sira) {
    const adet = u.adet ? `<span class="urun-adet">${kacis(u.adet)}</span>` : "";
    const rozet = u.rozet ? `<span class="urun-rozet">${kacis(u.rozet)}</span>` : "";
    const alt =
      u.aciklama || u.kalori
        ? `<div class="urun-alt">` +
          (u.aciklama ? `<span class="urun-aciklama">${kacis(u.aciklama)}</span>` : "<span class='urun-aciklama'></span>") +
          (u.kalori ? `<span class="urun-kalori">≈ ${u.kalori} kcal</span>` : "") +
          `</div>`
        : "";
    return (
      `<li class="urun-sat" style="--d:${sira * 40}ms">` +
      `<div class="urun-ust">` +
      `<span class="urun-adi">${kacis(u.ad)}</span>${adet}${rozet}` +
      `<span class="urun-dolgu"></span>` +
      `<span class="urun-fiyat">${kacis(u.fiyat || "")}</span>` +
      `</div>${alt}</li>`
    );
  };

  /* İki sayfalık (çok görselli) kategoriler */
  const IKI_SAYFA = { "tavuk-yemekleri": 2, "et-yemekleri": 2 };

  /** Kategori görsellerinin yollarını döndürür (admin verisi öncelikli). */
  MenuAkis.prototype.gorselYollari = function (kat) {
    if (kat.gorseller && kat.gorseller.length) return kat.gorseller;
    const sayfa = IKI_SAYFA[kat.slug];
    if (sayfa) {
      const out = [];
      for (let i = 1; i <= sayfa; i += 1) {
        out.push(`assets/menu/${kat.slug}-${i}.webp`);
      }
      return out;
    }
    return [`assets/menu/${kat.slug}.webp`];
  };

  /* Detay = kategorinin menü kartı fotoğraf(lar)ı. Metin verisi (ürün/fiyat)
     admin paneli için menu-data.js'te saklanır; burada görsel gösterilir. */
  MenuAkis.prototype.detayCiz = function (kat) {
    const gorseller = this.gorselYollari(kat);
    const fotolar = gorseller
      .map(
        (src, i) =>
          `<figure class="detay-foto-kutu">` +
          `<img class="detay-foto" src="${src}" ` +
          `alt="${kacis(kat.ad)} menüsü${gorseller.length > 1 ? " — sayfa " + (i + 1) : ""}" ` +
          `loading="${i === 0 ? "eager" : "lazy"}" decoding="async">` +
          `</figure>`
      )
      .join("");

    this.elDetayIc.innerHTML = `<div class="detay-fotolar">${fotolar}</div>`;
    this.elDetayBaslik.textContent = kat.ad;
    this.elDetay.querySelector(".detay-kaydir").scrollTop = 0;
  };

  /* ── Fotoğraf büyütme (lightbox) ── */
  MenuAkis.prototype.buyutBagla = function () {
    const self = this;
    this.elBuyut = document.getElementById("foto-buyut");
    if (!this.elBuyut) return;
    const img = this.elBuyut.querySelector("img");

    // Detaydaki fotoğrafa tıkla → büyüt
    this.elDetayIc.addEventListener("click", (o) => {
      const foto = o.target.closest(".detay-foto");
      if (!foto) return;
      img.src = foto.src;
      img.alt = foto.alt;
      self.elBuyut.classList.add("acik");
      self.elBuyut.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });

    const kapat = () => {
      self.elBuyut.classList.remove("acik");
      self.elBuyut.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    this.elBuyut.addEventListener("click", (o) => {
      if (o.target === self.elBuyut || o.target.closest(".foto-buyut-kapat")) kapat();
    });
    window.addEventListener("keydown", (o) => {
      if (o.key === "Escape" && self.elBuyut.classList.contains("acik")) kapat();
    });
  };

  /* ─────────── Görünüm geçişi ─────────── */
  MenuAkis.prototype.gorunumeGec = function (ad, yon) {
    if (ad === this.aktif) return;
    // Görünüm değişince açık fotoğraf büyüteci kapanır
    if (this.elBuyut && this.elBuyut.classList.contains("acik")) {
      this.elBuyut.classList.remove("acik");
      this.elBuyut.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    const harita = {
      kapak: this.elKapak,
      kategoriler: this.elKategoriler,
      detay: this.elDetay,
    };
    const eski = harita[this.aktif];
    const yeni = harita[ad];

    if (eski) {
      eski.classList.remove("etkin", "cikis-sol", "cikis-sag");
      if (yon) eski.classList.add(yon === "ileri" ? "cikis-sol" : "cikis-sag");
    }
    yeni.classList.remove("cikis-sol", "cikis-sag");
    // reflow → giriş animasyonu tetiklensin
    void yeni.offsetWidth;
    yeni.classList.add("etkin");

    this.aktif = ad;
  };

  MenuAkis.prototype.kategoriAc = function (slug, hashYaz) {
    const kat = this.katMap[slug];
    if (!kat) return;
    this.detayCiz(kat);
    this.gorunumeGec("detay", "ileri");
    if (hashYaz !== false) {
      history.replaceState(null, "", "#" + slug);
    }
  };

  MenuAkis.prototype.anaMenu = function (hashYaz) {
    this.gorunumeGec("kategoriler", "geri");
    if (hashYaz !== false) history.replaceState(null, "", "#menu");
  };

  /* ─────────── Hash ─────────── */
  MenuAkis.prototype.hashUygula = function (ilk) {
    const h = window.location.hash.replace("#", "");
    if (h && this.katMap[h]) {
      this.kategoriAc(h, false);
    } else if (h === "menu") {
      this.gorunumeGec("kategoriler");
    } else if (ilk) {
      // İlk açılış: kapak (aynı oturumda ikinci kez ise kategoriler)
      if (sessionStorage.getItem("akarcay-menu-acildi") === "1") {
        this.elKapak.classList.remove("etkin");
        this.elKategoriler.classList.add("etkin");
        this.aktif = "kategoriler";
      } else {
        this.elKapak.classList.add("etkin");
      }
    }
  };

  /* ─────────── Olaylar ─────────── */
  MenuAkis.prototype.olaylariBagla = function () {
    const self = this;

    // Kapak → kategoriler
    const kapakGir = () => {
      sessionStorage.setItem("akarcay-menu-acildi", "1");
      self.gorunumeGec("kategoriler", "ileri");
      history.replaceState(null, "", "#menu");
    };
    this.elKapak.addEventListener("click", kapakGir);
    this.elKapak.addEventListener("keydown", (o) => {
      if (o.key === "Enter" || o.key === " ") {
        o.preventDefault();
        kapakGir();
      }
    });

    // Kategori kutuları (olay delegasyonu)
    this.elGrid.addEventListener("click", (o) => {
      const kutu = o.target.closest(".kat-kutu");
      if (kutu) self.kategoriAc(kutu.dataset.slug);
    });

    // Geri düğmesi
    const geri = document.getElementById("detay-geri");
    if (geri) geri.addEventListener("click", () => self.anaMenu());

    // Klavye: Esc → geri (lightbox açıksa önce o kapanır)
    window.addEventListener("keydown", (o) => {
      if (o.key !== "Escape") return;
      if (self.elBuyut && self.elBuyut.classList.contains("acik")) return;
      if (self.aktif === "detay") self.anaMenu();
      else if (self.aktif === "kategoriler") self.gorunumeGec("kapak", "geri");
    });

    // Tarayıcı geri tuşu / hash değişimi
    window.addEventListener("hashchange", () => self.hashUygula(false));
  };

  window.AKMenuAkis = MenuAkis;
})();
