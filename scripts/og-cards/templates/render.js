// Fills a card template from data and fits the text. The generator calls
// window.renderCard(data) and screenshots once the returned promise resolves.
(function () {
  function set(field, value) {
    document.querySelectorAll('[data-field="' + field + '"]').forEach(function (el) {
      if (value == null || value === "") el.remove();
      else el.textContent = value;
    });
  }

  function loadImg(img, src) {
    return new Promise(function (resolve) {
      if (!src) { img.remove(); return resolve(false); }
      img.onload = function () { resolve(true); };
      img.onerror = function () { img.remove(); resolve(false); };
      img.src = src;
    });
  }

  // Shrink font size until the element fits in maxLines, between max and min px.
  function fitLines(el, max, min, maxLines) {
    if (!el) return;
    for (var size = max; size >= min; size -= 2) {
      el.style.fontSize = size + "px";
      var lh = parseFloat(getComputedStyle(el).lineHeight);
      if (el.scrollHeight <= lh * maxLines + 2) return;
    }
    clampWords(el, maxLines);
  }

  // Cut whole words and end with an ellipsis until the text fits in maxLines.
  function clampWords(el, maxLines) {
    if (!el) return;
    var lh = parseFloat(getComputedStyle(el).lineHeight);
    var limit = lh * maxLines + 2;
    if (el.scrollHeight <= limit) return;
    var words = el.textContent.split(/\s+/);
    while (words.length > 1 && el.scrollHeight > limit) {
      words.pop();
      el.textContent = words.join(" ").replace(/[,.;:–—-]+$/, "") + "…";
    }
  }

  // Drop the description (then shrink the title further) while the column overflows.
  function fitColumn() {
    var text = document.querySelector(".text");
    if (!text) return;
    var desc = text.querySelector(".desc");
    var guard = 0;
    while (text.scrollHeight > text.clientHeight + 1 && guard++ < 6) {
      if (desc && desc.textContent.length) {
        var lh = parseFloat(getComputedStyle(desc).lineHeight);
        var lines = Math.round(desc.scrollHeight / lh) - 1;
        if (lines < 1) { desc.remove(); desc = null; } else clampWords(desc, lines);
      } else {
        var t = text.querySelector(".title");
        t.style.fontSize = parseFloat(t.style.fontSize || "48") - 4 + "px";
      }
    }
  }

  window.renderCard = async function (d) {
    set("kicker", d.kicker);
    set("title", d.title);
    set("desc", d.description);
    set("author", d.author && d.author.name);
    set("role", d.author && d.author.title);
    set("path", d.path);

    var frame = document.querySelector(".frame");
    var shot = document.querySelector(".shot img");
    var hasShot = false;
    if (shot) hasShot = await loadImg(shot, d.shot);
    if (frame.classList.contains("t-changelog")) {
      frame.classList.add(hasShot ? "has-shot" : "no-shot");
      if (!hasShot) document.querySelectorAll(".only-shot").forEach(function (e) { e.remove(); });
      else document.querySelectorAll(".only-pattern").forEach(function (e) { e.remove(); });
    }
    var av = document.querySelector("img.avatar");
    if (av) {
      var ok = await loadImg(av, d.author && d.author.image);
      if (!ok && d.author && d.author.name) {
        var span = document.createElement("div");
        span.className = "avatar";
        span.textContent = d.author.name.split(/\s+/).map(function (p) { return p[0]; }).join("").slice(0, 2);
        document.querySelector(".author").prepend(span);
      }
    }
    if (!d.author) document.querySelectorAll(".author").forEach(function (e) { e.remove(); });

    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map(function (i) { return i.decode().catch(function () {}); }));

    var t = document.querySelector(".title");
    var fit = (t && t.dataset.fit ? t.dataset.fit : "64,44,3").split(",").map(Number);
    fitLines(t, fit[0], fit[1], fit[2]);
    var desc = document.querySelector(".desc");
    if (desc) clampWords(desc, Number(desc.dataset.lines || 3));
    fitColumn();
    return { hasShot: hasShot, title: t ? parseFloat(t.style.fontSize) : 0 };
  };
})();
