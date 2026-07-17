/* ═══ Akarçay — açılış: deste, paralaks, perde, mobil menü ═══ */
(function () {
  "use strict";

  var MIN_PRELOADER_MS = 900;

  function initPreloader() {
    var start = Date.now();

    function reveal() {
      var elapsed = Date.now() - start;
      var wait = Math.max(0, MIN_PRELOADER_MS - elapsed);
      window.setTimeout(function () {
        document.documentElement.classList.add("is-loaded");
      }, wait);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(reveal).catch(reveal);
    } else {
      window.setTimeout(reveal, MIN_PRELOADER_MS);
    }
  }

  function initOverlayMenu(deck) {
    var toggle = AK.qs(".menu-toggle");
    var overlay = AK.qs(".menu-overlay");
    if (!toggle || !overlay) { return; }

    function setOpen(isOpen) {
      overlay.classList.toggle("is-open", isOpen);
      overlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
      if (deck) { deck.inputEnabled = !isOpen; }
    }

    toggle.addEventListener("click", function () {
      setOpen(!overlay.classList.contains("is-open"));
    });

    AK.qsa("a", overlay).forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        setOpen(false);
      }
    });
  }

  function initSoonButtons() {
    AK.qsa("[data-soon]").forEach(function (button) {
      var wrap = button.closest(".cta-wrap");
      if (!wrap) { return; }
      var hideTimer = null;

      button.addEventListener("click", function () {
        wrap.classList.remove("show-soon");
        void wrap.offsetWidth;
        wrap.classList.add("show-soon");
        if (hideTimer) { window.clearTimeout(hideTimer); }
        hideTimer = window.setTimeout(function () {
          wrap.classList.remove("show-soon");
        }, 2200);
      });
    });
  }

  function boot() {
    var deckRoot = AK.qs("#deck");
    if (!deckRoot) { return; }

    var deck = new AK.Deck(deckRoot);
    AK.deck = deck;

    deck.jumpToHash();
    new AK.Parallax(deckRoot);

    initOverlayMenu(deck);
    initSoonButtons();
    initPreloader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
