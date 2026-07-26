/* ═══ Açılış: modülleri sırayla devreye alır ═══ */
(function () {
  "use strict";

  async function baslat() {
    // İçeriği (iletişim vb.) canlı veritabanından çek, yoksa statik yedek
    if (window.AKVeri) {
      window.AKAR_CONTENT = await AKVeri("/api/icerik", window.AKAR_CONTENT);
    }
    AKArayuz.icerikYerlestir();
    AKAcilis.gecisleriBagla();

    const kok = AK.qs("#deck");
    let deste = null;
    if (kok) {
      deste = new AKDeste(kok);
      window.AKdeste = deste;
      deste.adresteneAtla();
      new AKParalaks(kok);
      new AKSerpinti(AK.qs(".serpinti"));
    }

    AKArayuz.mobilMenu(deste);
    AKArayuz.imlec();
    AKArayuz.hale();

    // Açılış perdesi yazı tipleri hazır olunca kalksın — logo zıplamasın
    const hazir = document.fonts?.ready || Promise.resolve();
    hazir.catch(() => {}).finally(() => AKAcilis.oynat());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", baslat);
  } else {
    baslat();
  }
})();
