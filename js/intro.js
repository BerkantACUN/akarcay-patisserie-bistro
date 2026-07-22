/* ═══════════════════════════════════════════════════════════
   Sinematik açılış + sayfalar arası geçiş

   Açılış: header'daki gerçek logo düğümü FLIP tekniğiyle ekranın
   ortasına büyütülür, parçaları sırayla kurulur, sonra kendi
   köşesine uçarak yerleşir. Tek düğüm — kopya logo yok.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const KURULUS_MS = 2750; // logo parçalarının kurulum süresi (intro.css ile eş)
  const INIS_MS = 1150; // köşeye uçuş süresi
  const OTURUM_ANAHTAR = "akarcay-acilis";

  const kok = document.documentElement;

  /* ── Açılış ── */
  function acilis() {
    const marka = AK.qs(".marka");
    const perde = AK.qs(".perde");
    if (!marka || !perde) return Promise.resolve();

    // Aynı oturumda ikinci kez tam açılış oynatma — sadece perdeyi kaldır
    const gorulduMu = sessionStorage.getItem(OTURUM_ANAHTAR) === "1";
    if (gorulduMu || AK.azHareket()) {
      kok.classList.add("acilis-bitti");
      perde.addEventListener("transitionend", () => perde.remove(), { once: true });
      setTimeout(() => perde.remove(), 1200);
      return Promise.resolve();
    }

    return new Promise((bitti) => {
      // FLIP: logonun köşedeki yerinden ekran ortasına giden dönüşümü hesapla
      const kutu = marka.getBoundingClientRect();
      const hedefGenislik = Math.min(window.innerWidth * 0.74, 620);
      const olcek = hedefGenislik / kutu.width;
      const dx = (window.innerWidth - kutu.width * olcek) / 2 - kutu.left;
      const dy = (window.innerHeight - kutu.height * olcek) / 2 - kutu.top;

      marka.style.setProperty(
        "--flip",
        `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${olcek.toFixed(3)})`
      );
      kok.classList.add("acilis-oynuyor");

      // Parçalar kurulduktan sonra logo köşeye iner
      setTimeout(() => {
        // Mevcut görsel konumu koru, ardından dönüşümü sıfırla → yumuşak uçuş
        kok.classList.add("acilis-inis");
        kok.classList.add("acilis-bitti");

        setTimeout(() => {
          kok.classList.remove("acilis-oynuyor", "acilis-inis");
          marka.style.removeProperty("--flip");
          perde.remove();
          sessionStorage.setItem(OTURUM_ANAHTAR, "1");
          bitti();
        }, INIS_MS);
      }, KURULUS_MS);
    });
  }

  /* ── Sayfalar arası geçiş ── */
  function gecisleriBagla() {
    const gecis = AK.qs(".gecis");
    if (!gecis) return;

    function perdeyiAc() {
      gecis.classList.add("aciliyor");
      setTimeout(() => gecis.classList.remove("aciliyor"), 900);
    }

    // Yeni sayfa açılırken perdeyi yukarı çek
    if (sessionStorage.getItem("akarcay-gecis") === "1") {
      sessionStorage.removeItem("akarcay-gecis");
      perdeyiAc();
    }

    /* Geri/ileri tuşuyla önbellekten (bfcache) dönüldüğünde sayfa, terk
       edildiği anki haliyle geri yüklenir — kapanmış perde ekranda kalır
       ve site donmuş görünür. pageshow bu durumu yakalayıp perdeyi kaldırır. */
    window.addEventListener("pageshow", (olay) => {
      if (!gecis.classList.contains("kapaniyor")) return;
      gecis.classList.remove("kapaniyor");
      if (olay.persisted) perdeyiAc();
    });

    AK.qsa("a[data-gecis]").forEach((baglanti) => {
      baglanti.addEventListener("click", (olay) => {
        const yeniSekme =
          olay.metaKey || olay.ctrlKey || olay.shiftKey || olay.button !== 0;
        if (yeniSekme) return;

        olay.preventDefault();
        const hedef = baglanti.href;

        if (AK.azHareket()) {
          window.location.href = hedef;
          return;
        }

        sessionStorage.setItem("akarcay-gecis", "1");
        gecis.classList.add("kapaniyor");
        setTimeout(() => {
          window.location.href = hedef;
        }, 720);

        // Gezinme herhangi bir sebeple gerçekleşmezse perde ekranda kalmasın
        setTimeout(() => {
          if (gecis.classList.contains("kapaniyor")) {
            gecis.classList.remove("kapaniyor");
            sessionStorage.removeItem("akarcay-gecis");
          }
        }, 4000);
      });
    });
  }

  window.AKAcilis = { oynat: acilis, gecisleriBagla };
})();
