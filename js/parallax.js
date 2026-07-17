/* ═══ Fare paralaksı — katmanlar imleci derinlik katsayısıyla izler ═══
   data-depth="N" → katmanın gezinme yarıçapı (px). İmleç ekran merkezinden
   uzaklaştıkça katman, N ile orantılı kayar; lerp ile yumuşatılır. */
(function () {
  "use strict";

  var LERP_FACTOR = 0.075;
  var IDLE_EPSILON = 0.02;

  function Parallax(root) {
    this.layers = AK.qsa("[data-depth]", root);
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rafId = null;
    this.enabled = !AK.prefersReducedMotion() && !AK.isTouchDevice();

    if (!this.enabled || this.layers.length === 0) { return; }

    this.onMove = this.onMove.bind(this);
    this.tick = this.tick.bind(this);

    window.addEventListener("mousemove", this.onMove, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibility.bind(this));
    this.start();
  }

  Parallax.prototype.onMove = function (event) {
    // -0.5 .. 0.5 aralığına normalize edilmiş imleç konumu
    this.targetX = event.clientX / window.innerWidth - 0.5;
    this.targetY = event.clientY / window.innerHeight - 0.5;
  };

  Parallax.prototype.onVisibility = function () {
    if (document.hidden) { this.stop(); } else { this.start(); }
  };

  Parallax.prototype.start = function () {
    if (this.rafId === null && this.enabled) {
      this.rafId = window.requestAnimationFrame(this.tick);
    }
  };

  Parallax.prototype.stop = function () {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  };

  Parallax.prototype.tick = function () {
    this.currentX = AK.lerp(this.currentX, this.targetX, LERP_FACTOR);
    this.currentY = AK.lerp(this.currentY, this.targetY, LERP_FACTOR);

    var idle =
      Math.abs(this.currentX - this.targetX) < IDLE_EPSILON / 100 &&
      Math.abs(this.currentY - this.targetY) < IDLE_EPSILON / 100;

    if (!idle) {
      for (var i = 0; i < this.layers.length; i += 1) {
        var layer = this.layers[i];
        var depth = parseFloat(layer.getAttribute("data-depth")) || 0;
        var x = (this.currentX * depth).toFixed(2);
        var y = (this.currentY * depth * 0.85).toFixed(2);
        layer.style.translate = x + "px " + y + "px";
      }
    }

    this.rafId = window.requestAnimationFrame(this.tick);
  };

  AK.Parallax = Parallax;
})();
