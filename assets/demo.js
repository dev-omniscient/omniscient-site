// Home v2 stages (docs/home-v2.md). No library.
// Each [data-stage] has --len units and steps that start at the step bar's data-go marks. On wide screens scroll
// moves --s from 0 to --len while the stage is pinned; on phones the stage plays by itself once it is in view.
// Each step plays over the first 72% of its share and holds for the rest, so every step can be read.
// Every [data-at] inside turns .on while at <= s < off. [data-count="from,to,at,end,fmt"] counts,
// [data-type="at,end"] types its text, [data-scrub="at,end"] sets --t, and [data-guide] (the spotlight and the
// cursor) moves to the last of its [at, x, y, w, h] stops that has started.
// [data-vscrub] outside a stage sets --t from 0 to 1 as it crosses the screen (the Spine).
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var narrow = window.matchMedia("(max-width: 899px)");
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var nums = function (el, name) { return el.getAttribute(name).split(",").map(function (x) { return x.trim(); }); };
  var headerH = function () { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64; };
  var PLAY = 0.72;     // share of a step spent moving; the rest holds
  var UNIT_MS = 1500;  // phones: time for one unit of --s
  if (reduce) document.documentElement.classList.add("rm");

  // Canvases are drawn at a fixed size and scaled to their box. Narrow boxes crop the left rail (data-crop).
  var canvases = Array.prototype.slice.call(document.querySelectorAll("[data-canvas]"));
  function fit() {
    canvases.forEach(function (c) {
      var box = c.parentNode, pin = box.parentNode, cs = getComputedStyle(pin);
      var w = pin.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var cw = +c.getAttribute("data-w"), ch = +c.getAttribute("data-h"), crop = +(c.getAttribute("data-crop") || 0);
      var useCrop = crop && w < cw * 0.8;
      var k = Math.min(1.3, w / (cw - (useCrop ? crop : 0)));
      // Pinned stages also fit the screen's height, under the title, the step bar and the caption.
      if (!narrow.matches) {
        var top = box.parentNode.querySelector(".stage__top");
        var room = window.innerHeight - headerH() - (top ? top.offsetHeight : 0) - 48;
        k = Math.min(k, room / ch);
      }
      if (useCrop) k = Math.max(k, 0.5);
      c.style.setProperty("--k", k);
      c.style.setProperty("--crop", (useCrop ? crop * k : 0) + "px");
      box.style.height = Math.round(ch * k) + "px";
      box.style.maxWidth = useCrop ? "" : Math.round(cw * k) + "px";
    });
  }

  // Type into mixed text: reveal characters across the element's text nodes in order.
  function typer(el) {
    var nodes = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n;
    while ((n = walk.nextNode())) nodes.push({ n: n, t: n.nodeValue });
    var total = nodes.reduce(function (a, x) { return a + x.t.length; }, 0);
    return function (t) {
      var left = Math.round(total * t);
      nodes.forEach(function (x) { var k = Math.max(0, Math.min(x.t.length, left)); x.n.nodeValue = x.t.slice(0, k); left -= x.t.length; });
      el.classList.toggle("done", t >= 1);
    };
  }

  var fmt = {
    int: function (v) { return Math.round(v).toLocaleString("en-US"); },
    money: function (v) { return "$" + Math.round(v).toLocaleString("en-US"); },
    m: function (v) { return "$" + v.toFixed(2) + "M"; }
  };
  var all = function (el, sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); };

  var stages = all(document, "[data-stage]").map(function (el) {
    var st = { el: el, len: +getComputedStyle(el).getPropertyValue("--len") || 6, s: -1 };
    st.ats = all(el, "[data-at]").map(function (e) {
      return { e: e, at: +e.getAttribute("data-at"), off: e.hasAttribute("data-off") ? +e.getAttribute("data-off") : Infinity };
    });
    st.counts = all(el, "[data-count]").map(function (e) { var a = nums(e, "data-count"); return { e: e, a: +a[0], b: +a[1], at: +a[2], end: +a[3], f: fmt[a[4] || "int"] }; });
    st.types = all(el, "[data-type]").map(function (e) { var a = nums(e, "data-type"); return { at: +a[0], end: +a[1], set: typer(e) }; });
    st.scrubs = all(el, "[data-scrub]").map(function (e) { var a = nums(e, "data-scrub"); return { e: e, at: +a[0], end: +a[1] }; });
    st.guides = all(el, "[data-guide]").map(function (e) { return { e: e, stops: JSON.parse(e.getAttribute("data-guide")), cur: null }; });
    st.steps = all(el, ".steps button").map(function (b) { return { b: b, at: +b.getAttribute("data-go") }; });
    st.steps.forEach(function (x) { x.b.addEventListener("click", function () { go(st, x.at); }); });
    // Step marks and each step's share of the scroll (or of the clock)
    st.marks = st.steps.map(function (x) { return x.at; }).concat([st.len]);
    st.weights = [];
    for (var i = 0; i < st.marks.length - 1; i++) st.weights.push((st.marks[i + 1] - st.marks[i]) / PLAY);
    st.total = st.weights.reduce(function (a, b) { return a + b; }, 0);
    return st;
  });

  // p (0..1 of the scroll or the clock) to s, holding at the end of each step
  function shape(st, p) {
    var acc = 0, last = st.weights.length - 1;
    for (var i = 0; i <= last; i++) {
      var f = st.weights[i] / st.total;
      if (p <= acc + f || i === last) {
        var u = clamp((p - acc) / f), d = st.marks[i + 1] - st.marks[i];
        if (u >= PLAY) return i === last ? st.len : st.marks[i + 1] - 0.001;
        return st.marks[i] + (u / PLAY) * d;
      }
      acc += f;
    }
    return st.len;
  }
  function startOf(st, at) {
    var acc = 0;
    for (var i = 0; i < st.marks.length - 1 && st.marks[i] < at - 0.001; i++) acc += st.weights[i] / st.total;
    return acc;
  }

  function render(st, s) {
    if (Math.abs(s - st.s) < 0.0005) return;
    st.s = s;
    st.el.style.setProperty("--s", s.toFixed(3));
    st.ats.forEach(function (x) { x.e.classList.toggle("on", s >= x.at && s < x.off); });
    st.counts.forEach(function (x) { x.e.textContent = x.f(x.a + (x.b - x.a) * clamp((s - x.at) / (x.end - x.at))); });
    st.types.forEach(function (x) { x.set(clamp((s - x.at) / (x.end - x.at))); });
    st.scrubs.forEach(function (x) { x.e.style.setProperty("--t", clamp((s - x.at) / (x.end - x.at)).toFixed(3)); });
    st.guides.forEach(function (g) {
      var stop = null;
      g.stops.forEach(function (x) { if (s >= x[0]) stop = x; });
      if (stop === g.cur) return;
      g.cur = stop;
      var on = stop && stop[3] > 0;
      g.e.classList.toggle("on", !!on);
      if (!on) return;
      var ox = +(g.e.getAttribute("data-ox") || 0), oy = +(g.e.getAttribute("data-oy") || 0);
      g.e.style.transform = "translate(" + (stop[1] - ox) + "px," + (stop[2] - oy) + "px)";
      if (g.e.classList.contains("focus")) { g.e.style.width = stop[3] + "px"; g.e.style.height = stop[4] + "px"; }
    });
    var cur = 0;
    st.steps.forEach(function (x, i) { if (s >= x.at - 0.002) cur = i; });
    st.steps.forEach(function (x, i) { x.b.classList.toggle("cur", i === cur); });
  }

  var auto = function () { return narrow.matches; };
  function go(st, at) {
    var p = startOf(st, at);
    if (reduce) { render(st, st.len); return; }
    if (auto()) { st.t0 = performance.now() - p * st.total * UNIT_MS * PLAY; st.playing = true; st.started = true; return; }
    var top = st.el.getBoundingClientRect().top + window.scrollY;
    var travel = st.el.offsetHeight - (window.innerHeight - headerH());
    window.scrollTo({ top: top - headerH() + p * travel / 1.04 + 2, behavior: "smooth" });
  }

  var vscrubs = all(document, "[data-vscrub]");
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var st = stages.filter(function (x) { return x.el === e.target; })[0];
      if (e.isIntersecting && auto() && !st.started) { st.started = true; st.playing = true; st.t0 = performance.now(); }
    });
  }, { threshold: 0.35 }) : null;
  stages.forEach(function (st) { if (io) io.observe(st.el); });

  function frame(now) {
    var vh = window.innerHeight, hh = headerH();
    stages.forEach(function (st) {
      st.el.classList.toggle("is-auto", auto() || reduce);
      if (reduce) { render(st, st.len); return; }
      if (auto()) {
        if (st.playing) {
          var p = (now - st.t0) / (st.total * UNIT_MS * PLAY);
          if (p >= 1) { p = 1; st.playing = false; }
          render(st, shape(st, p));
        } else if (!st.started) render(st, 0);
        return;
      }
      var r = st.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      var travel = st.el.offsetHeight - (vh - hh);
      render(st, shape(st, clamp((hh - r.top) / travel * 1.04)));
    });
    vscrubs.forEach(function (el) {
      var r = el.getBoundingClientRect();
      el.style.setProperty("--t", reduce ? 1 : clamp((vh * 0.9 - r.top) / (r.height + vh * 0.45)).toFixed(3));
    });
    requestAnimationFrame(frame);
  }

  fit();
  window.addEventListener("resize", fit);
  requestAnimationFrame(frame);
})();
