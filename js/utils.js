/* ═══ Ortak yardımcılar ═══ */
(function () {
  "use strict";

  const AK = {};

  AK.qs = (sel, scope) => (scope || document).querySelector(sel);
  AK.qsa = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));

  AK.clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  AK.lerp = (a, b, t) => a + (b - a) * t;
  AK.pad2 = (n) => String(n).padStart(2, "0");

  AK.azHareket = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  AK.dokunmatik = () =>
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /** Sık tetiklenen olayları tek kare içinde birleştirir. */
  AK.kareyeBagla = (fn) => {
    let bekliyor = false;
    let sonArg;
    return function (arg) {
      sonArg = arg;
      if (bekliyor) return;
      bekliyor = true;
      requestAnimationFrame(() => {
        bekliyor = false;
        fn(sonArg);
      });
    };
  };

  /** Belirli süre boyunca çağrı gelmezse çalıştırır. */
  AK.gecikmeli = (fn, ms) => {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  /** Sayfa görünürlüğü değişince duraklat/devam et. */
  AK.gorunurlukte = (durdur, devam) => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) durdur();
      else devam();
    });
  };

  window.AK = AK;
})();
