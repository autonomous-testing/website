// Fills a card template from data and fits the punchline. The generator calls
// window.renderCard(data) and screenshots once the returned promise resolves.
(function () {
  function set(field, value) {
    document.querySelectorAll('[data-field="' + field + '"]').forEach(function (el) {
      if (value == null || value === "") el.remove();
      else el.textContent = value;
    });
  }

  // The punchline as text, with "→" in the accent colour and a line break at each newline.
  function setPunchline(el, text) {
    el.textContent = "";
    text.split(/(→|\n)/).forEach(function (part) {
      if (part === "\n") el.appendChild(document.createElement("br"));
      else if (part === "→") {
        var s = document.createElement("span");
        s.className = "arrow";
        s.textContent = part;
        el.appendChild(s);
      } else if (part) el.appendChild(document.createTextNode(part));
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

  // Largest font size (max..min px) at which the punchline fits its box in at most maxLines,
  // without breaking a word. With forced breaks, no line may wrap further.
  // Returns the size and the line count.
  function fit(el, max, min, maxLines) {
    var box = el.parentElement;
    var forced = el.querySelectorAll("br").length;
    for (var size = max; size >= min; size -= 2) {
      el.style.fontSize = size + "px";
      var lh = parseFloat(getComputedStyle(el).lineHeight);
      var lines = Math.round(el.scrollHeight / lh);
      var ok = forced ? lines === forced + 1 : lines <= maxLines;
      if (ok && el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= box.clientHeight) {
        return { size: size, lines: lines };
      }
    }
    return { size: min, lines: Math.round(el.scrollHeight / parseFloat(getComputedStyle(el).lineHeight)), overflow: true };
  }

  window.renderCard = async function (d) {
    set("kicker", d.kicker);
    set("author", d.author && d.author.name);
    var p = document.querySelector(".punchline");
    setPunchline(p, d.punchline);

    var frame = document.querySelector(".frame");
    if (d.layout) frame.classList.add("l-" + d.layout);
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
        span.textContent = d.author.name.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2);
        document.querySelector(".author").prepend(span);
      }
    }
    if (!d.author) document.querySelectorAll(".author").forEach(function (e) { e.remove(); });

    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map(function (i) { return i.decode().catch(function () {}); }));

    var f = (p.dataset.fit || "170,84,3").split(",").map(Number);
    var r = fit(p, f[0], f[1], f[2]);
    return { hasShot: hasShot, size: r.size, lines: r.lines, overflow: !!r.overflow };
  };
})();
