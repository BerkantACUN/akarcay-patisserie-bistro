/* ═══ Akarçay — yardımcı fonksiyonlar ═══ */
(function () {
  "use strict";

  window.AK = window.AK || {};

  AK.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };

  AK.qsa = function (selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  };

  AK.clamp = function (value, min, max) {
    return Math.min(max, Math.max(min, value));
  };

  AK.lerp = function (current, target, factor) {
    return current + (target - current) * factor;
  };

  AK.prefersReducedMotion = function () {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  AK.isTouchDevice = function () {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  };

  AK.pad2 = function (value) {
    return String(value + 1).padStart(2, "0");
  };
})();
