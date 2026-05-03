// Suppresses the benign "ResizeObserver loop completed with undelivered
// notifications" error that webpack-dev-server's overlay otherwise surfaces
// as a fatal "Uncaught runtime error". The browser already recovers; the
// overlay just makes it look catastrophic.
//
// Loaded synchronously from <head> so this runs BEFORE webpack-dev-server's
// overlay registers its own error listeners. Only injected in development —
// see docusaurus.config.js.
(function () {
  var BENIGN = /ResizeObserver loop/i;

  var stop = function (e) {
    if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
    if (e && e.preventDefault) e.preventDefault();
  };

  window.addEventListener(
    "error",
    function (e) {
      var msg = (e && e.message) || (e && e.error && e.error.message) || "";
      if (BENIGN.test(msg)) stop(e);
    },
    true
  );

  window.addEventListener(
    "unhandledrejection",
    function (e) {
      var reason = e && e.reason;
      var msg = (reason && (reason.message || reason)) || "";
      if (typeof msg === "string" && BENIGN.test(msg)) stop(e);
    },
    true
  );

  // Wrap ResizeObserver callbacks so notifications fire on the next animation
  // frame — prevents the loop from overflowing in the first place.
  if (typeof window.ResizeObserver === "function") {
    var Original = window.ResizeObserver;
    window.ResizeObserver = function (cb) {
      return new Original(function (entries, observer) {
        window.requestAnimationFrame(function () {
          try {
            cb(entries, observer);
          } catch (_) {
            /* swallow */
          }
        });
      });
    };
    window.ResizeObserver.prototype = Original.prototype;
  }
})();
