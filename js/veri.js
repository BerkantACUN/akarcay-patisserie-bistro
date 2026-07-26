/* ═══════════════════════════════════════════════════════════
   Canlı veri çekici — menü/içerik verisini API'den (D1) alır.
   API'ye ulaşılamazsa sayfadaki statik yedek veriyle devam eder,
   böylece site her koşulda çalışır.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  window.AKVeri = async function (yol, yedek) {
    try {
      const cevap = await fetch(yol, { cache: "no-store" });
      if (cevap.ok) {
        const veri = await cevap.json();
        if (veri && typeof veri === "object" && Object.keys(veri).length) {
          return veri;
        }
      }
    } catch (e) {
      /* çevrimdışı ya da API hatası → yedeğe düş */
    }
    return yedek;
  };
})();
