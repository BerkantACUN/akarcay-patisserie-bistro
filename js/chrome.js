/* ═══ Sabit arayüz: özel imleç, mobil menü, sahne tonu ═══ */
(function () {
  "use strict";

  /* ── Özel imleç: yumuşak takip eden halka + sabit nokta ── */
  function imlec() {
    if (AK.dokunmatik() || AK.azHareket()) return;

    const halka = AK.qs(".imlec");
    const nokta = AK.qs(".imlec-nokta");
    if (!halka || !nokta) return;

    let hedefX = window.innerWidth / 2;
    let hedefY = window.innerHeight / 2;
    let x = hedefX;
    let y = hedefY;
    let calisiyor = true;

    window.addEventListener(
      "mousemove",
      (o) => {
        hedefX = o.clientX;
        hedefY = o.clientY;
        nokta.style.transform = `translate(${hedefX}px, ${hedefY}px)`;
        if (!halka.classList.contains("acik")) {
          halka.classList.add("acik");
          nokta.classList.add("acik");
        }
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", () => {
      halka.classList.remove("acik");
      nokta.classList.remove("acik");
    });

    // Etkileşimli öğelerin üstünde halka büyür
    const secici = "a, button, [data-egim], .yay-oge, .urun-kart";
    document.addEventListener("mouseover", (o) => {
      if (o.target.closest(secici)) halka.classList.add("buyuk");
    });
    document.addEventListener("mouseout", (o) => {
      if (o.target.closest(secici)) halka.classList.remove("buyuk");
    });

    (function dongu() {
      if (calisiyor) {
        x = AK.lerp(x, hedefX, 0.17);
        y = AK.lerp(y, hedefY, 0.17);
        halka.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
      requestAnimationFrame(dongu);
    })();

    AK.gorunurlukte(
      () => (calisiyor = false),
      () => (calisiyor = true)
    );
  }

  /* ── İmleci izleyen sahne ışığı ── */
  function hale() {
    const alan = AK.qs(".zemin-hale");
    if (!alan || AK.dokunmatik() || AK.azHareket()) return;

    const guncelle = AK.kareyeBagla((o) => {
      alan.style.setProperty("--mx", `${(o.x / window.innerWidth) * 100}%`);
      alan.style.setProperty("--my", `${(o.y / window.innerHeight) * 100}%`);
    });

    window.addEventListener(
      "mousemove",
      (o) => guncelle({ x: o.clientX, y: o.clientY }),
      { passive: true }
    );
  }

  /* ── Mobil menü ── */
  function mobilMenu(deste) {
    const dugme = AK.qs(".menu-dugme");
    const katman = AK.qs(".mobil-menu");
    if (!dugme || !katman) return;

    function ayarla(acik) {
      katman.classList.toggle("acik", acik);
      katman.setAttribute("aria-hidden", acik ? "false" : "true");
      dugme.setAttribute("aria-expanded", acik ? "true" : "false");
      dugme.setAttribute("aria-label", acik ? "Menüyü kapat" : "Menüyü aç");
      document.body.style.overflow = acik ? "hidden" : "";
      if (deste) deste.girdiAcik = !acik;
    }

    dugme.addEventListener("click", () =>
      ayarla(!katman.classList.contains("acik"))
    );
    AK.qsa("a", katman).forEach((a) =>
      a.addEventListener("click", () => ayarla(false))
    );
    window.addEventListener("keydown", (o) => {
      if (o.key === "Escape" && katman.classList.contains("acik")) ayarla(false);
    });
  }

  /* ── İçerik yerleştirme (ileride admin paneli buradan besleyecek) ── */
  function icerikYerlestir() {
    const veri = window.AKAR_CONTENT;
    if (!veri) return;
    const eslesme = {
      adres: veri.iletisim.adres,
      saatler: veri.iletisim.saatler,
      telefon: veri.iletisim.telefon,
    };
    AK.qsa("[data-slot]").forEach((el) => {
      const deger = eslesme[el.dataset.slot];
      if (deger) el.innerHTML = deger.replace(/ · | — /g, "<br>");
    });

    const ig = AK.qs('.sosyal a[aria-label="Instagram"]');
    const fb = AK.qs('.sosyal a[aria-label="Facebook"]');
    if (ig && veri.iletisim.instagram) ig.href = veri.iletisim.instagram;
    if (fb && veri.iletisim.facebook) fb.href = veri.iletisim.facebook;
  }

  window.AKArayuz = { imlec, hale, mobilMenu, icerikYerlestir };
})();
