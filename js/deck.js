/* ═══ SceneDeck — tam ekran dikey sahne destesi ═══
   Tekerlek / dokunma / klavye / nokta gezinmesiyle tek adımlık sahne
   geçişleri. Geçiş koreografisi CSS'te; burada durum makinesi ve kilit var. */
(function () {
  "use strict";

  var WHEEL_THRESHOLD = 30;   // px cinsinden birikimli tekerlek eşiği
  var SWIPE_THRESHOLD = 48;   // px cinsinden dokunma kaydırma eşiği
  var LOCK_MS = 1400;         // geçiş sırasında girişlerin kilitli kaldığı süre
  var LEAVE_MS = 700;         // is-leaving sınıfının temizlenme süresi

  function Deck(root) {
    this.root = root;
    this.slides = AK.qsa(".slide", root);
    this.bgs = AK.qsa(".deck-bg", root);
    this.bullets = AK.qsa(".bullets [data-goto]");
    this.navLinks = AK.qsa("[data-goto]");
    this.counterCurrent = AK.qs(".counter-current");
    this.scrollHint = AK.qs(".scroll-hint");
    this.index = 0;
    this.isLocked = false;
    this.wheelAccum = 0;
    this.touchStartY = null;
    this.inputEnabled = true;

    if (this.slides.length === 0) { return; }

    this.reduced = AK.prefersReducedMotion();
    this.bindInputs();
    this.applyState(this.index);
  }

  /* ── Durum uygulaması: arka plan, tema, noktalar, sayaç, erişilebilirlik ── */
  Deck.prototype.applyState = function (index) {
    var slide = this.slides[index];

    this.bgs.forEach(function (bg, i) {
      bg.classList.toggle("is-visible", i === index);
    });

    if (slide.getAttribute("data-theme") === "light") {
      document.documentElement.setAttribute("data-scene-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-scene-theme");
    }

    this.bullets.forEach(function (bullet, i) {
      if (i === index) {
        bullet.setAttribute("aria-current", "true");
      } else {
        bullet.removeAttribute("aria-current");
      }
    });

    this.navLinks.forEach(function (link) {
      var target = parseInt(link.getAttribute("data-goto"), 10);
      link.classList.toggle("is-active", target === index && link.tagName === "A");
    });

    this.slides.forEach(function (s, i) {
      var isActive = i === index;
      s.setAttribute("aria-hidden", isActive ? "false" : "true");
      if ("inert" in s) { s.inert = !isActive; }
    });

    if (this.counterCurrent) { this.counterCurrent.textContent = AK.pad2(index); }

    if (this.scrollHint) {
      this.scrollHint.classList.toggle("is-hidden", index === this.slides.length - 1);
    }

    if (slide.id && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + slide.id);
    }
  };

  /* ── Sahne geçişi ── */
  Deck.prototype.goTo = function (nextIndex, direction) {
    nextIndex = AK.clamp(nextIndex, 0, this.slides.length - 1);
    if (nextIndex === this.index || this.isLocked) { return; }

    var self = this;
    var current = this.slides[this.index];
    var next = this.slides[nextIndex];
    var dir = direction || (nextIndex > this.index ? 1 : -1);

    this.isLocked = true;
    this.root.style.setProperty("--dir", String(dir));

    current.classList.remove("is-active");
    current.classList.add("is-leaving");

    // Yeni sahnenin giriş konumu --dir'e göre hesaplansın diye reflow zorlanır
    void next.offsetWidth;
    next.classList.add("is-active");

    this.index = nextIndex;
    this.applyState(nextIndex);

    window.setTimeout(function () {
      current.classList.remove("is-leaving");
    }, this.reduced ? 30 : LEAVE_MS);

    window.setTimeout(function () {
      self.isLocked = false;
      self.wheelAccum = 0;
    }, this.reduced ? 60 : LOCK_MS);
  };

  Deck.prototype.next = function () { this.goTo(this.index + 1, 1); };
  Deck.prototype.prev = function () { this.goTo(this.index - 1, -1); };

  /* ── Hash'ten sahneye animasyonsuz sıçrama (ilk yükleme) ── */
  Deck.prototype.jumpToHash = function () {
    var hash = window.location.hash.replace("#", "");
    if (!hash) { return; }

    var target = -1;
    this.slides.forEach(function (slide, i) {
      if (slide.id === hash) { target = i; }
    });
    if (target <= 0) { return; }

    var previous = this.slides[this.index];
    previous.classList.remove("is-active");

    this.root.classList.add("no-anim");
    this.index = target;
    this.slides[target].classList.add("is-active");
    this.applyState(target);

    var self = this;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        self.root.classList.remove("no-anim");
      });
    });
  };

  /* ── Girdi bağlama ── */
  Deck.prototype.bindInputs = function () {
    var self = this;

    window.addEventListener("wheel", function (event) {
      if (!self.inputEnabled) { return; }
      event.preventDefault();
      if (self.isLocked) { return; }

      self.wheelAccum += event.deltaY;
      if (self.wheelAccum > WHEEL_THRESHOLD) { self.next(); }
      else if (self.wheelAccum < -WHEEL_THRESHOLD) { self.prev(); }
    }, { passive: false });

    window.addEventListener("touchstart", function (event) {
      if (event.touches.length === 1) {
        self.touchStartY = event.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener("touchend", function (event) {
      if (!self.inputEnabled || self.touchStartY === null) { return; }
      var delta = self.touchStartY - event.changedTouches[0].clientY;
      self.touchStartY = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) { return; }
      if (delta > 0) { self.next(); } else { self.prev(); }
    }, { passive: true });

    window.addEventListener("keydown", function (event) {
      if (!self.inputEnabled) { return; }
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault(); self.next(); break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault(); self.prev(); break;
        case "Home":
          event.preventDefault(); self.goTo(0, -1); break;
        case "End":
          event.preventDefault(); self.goTo(self.slides.length - 1, 1); break;
      }
    });

    this.navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var target = parseInt(link.getAttribute("data-goto"), 10);
        if (!Number.isNaN(target)) { self.goTo(target); }
      });
    });
  };

  AK.Deck = Deck;
})();
