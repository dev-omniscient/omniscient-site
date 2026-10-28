// Home v2 stages (docs/home-v2.md). No library.
// Each [data-stage] has --len units. On wide screens scroll moves --s from 0 to --len while the stage is pinned;
// on phones the stage plays by itself once it is in view. Every [data-at] inside turns .on while at <= s < off.
// [data-count="from,to,at,end,fmt"] counts, [data-type="at,end"] types its text, [data-scrub="at,end"] sets --t.
// [data-vscrub] outside a stage sets --t from 0 to 1 as it crosses the screen (the Spine).
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var narrow = window.matchMedia("(max-width: 899px)");
  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var nums = function (el, name) { return el.getAttribute(name).split(",").map(function (x) { return x.trim(); }); };
  if (reduce) document.documentElement.classList.add("rm");
  var headerH = function () { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64; };

  // Canvases are drawn at a fixed size and scaled to their box. Narrow boxes crop the left rail (data-crop).
  var canvases = Array.prototype.slice.call(document.querySelectorAll("[data-canvas]"));
  function fit() {
    canvases.forEach(function (c) {
      var box = c.parentNode, w = box.clientWidth;
      var cw = +c.getAttribute("data-w"), ch = +c.getAttribute("data-h"), crop = +(c.getAttribute("data-crop") || 0);
      var useCrop = crop && w < cw * 0.8;
      var k = Math.min(1.3, w / (cw - (useCrop ? crop : 0)));
      // Pinned stages also fit the screen's height, under the title and the step bar.
      if (!narrow.matches) {
        var top = box.parentNode.querySelector(".stage__top");
        var room = window.innerHeight - headerH() - (top ? top.offsetHeight : 0) - 56;
        k = Math.min(k, room / ch);
      }
      if (useCrop) k = Math.max(k, 0.56);
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

  var stages = Array.prototype.slice.call(document.querySelectorAll("[data-stage]")).map(function (el) {
    var st = { el: el, len: +getComputedStyle(el).getPropertyValue("--len") || 6, s: -1 };
    st.ats = Array.prototype.slice.call(el.querySelectorAll("[data-at]")).map(function (e) {
      return { e: e, at: +e.getAttribute("data-at"), off: e.hasAttribute("data-off") ? +e.getAttribute("data-off") : Infinity };
    });
    st.counts = Array.prototype.slice.call(el.querySelectorAll("[data-count]")).map(function (e) { var a = nums(e, "data-count"); return { e: e, a: +a[0], b: +a[1], at: +a[2], end: +a[3], f: fmt[a[4] || "int"] }; });
    st.types = Array.prototype.slice.call(el.querySelectorAll("[data-type]")).map(function (e) { var a = nums(e, "data-type"); return { at: +a[0], end: +a[1], set: typer(e) }; });
    st.scrubs = Array.prototype.slice.call(el.querySelectorAll("[data-scrub]")).map(function (e) { var a = nums(e, "data-scrub"); return { e: e, at: +a[0], end: +a[1] }; });
    st.steps = Array.prototype.slice.call(el.querySelectorAll(".steps button")).map(function (b) { return { b: b, at: +b.getAttribute("data-go") }; });
    st.steps.forEach(function (x) { x.b.addEventListener("click", function () { go(st, x.at); }); });
    return st;
  });

  function render(st, s) {
    if (Math.abs(s - st.s) < 0.001) return;
    st.s = s;
    st.el.style.setProperty("--s", s.toFixed(3));
    st.ats.forEach(function (x) { x.e.classList.toggle("on", s >= x.at && s < x.off); });
    st.counts.forEach(function (x) { x.e.textContent = x.f(x.a + (x.b - x.a) * clamp((s - x.at) / (x.end - x.at))); });
    st.types.forEach(function (x) { x.set(clamp((s - x.at) / (x.end - x.at))); });
    st.scrubs.forEach(function (x) { x.e.style.setProperty("--t", clamp((s - x.at) / (x.end - x.at)).toFixed(3)); });
    var cur = 0;
    st.steps.forEach(function (x, i) { if (s >= x.at - 0.001) cur = i; });
    st.steps.forEach(function (x, i) { x.b.classList.toggle("cur", i === cur); });
  }

  // Phones: play on a clock once the stage is in view, then hold the last frame.
  var auto = function () { return narrow.matches; };
  function go(st, at) {
    if (auto() || reduce) { st.t0 = performance.now() - at * 1400; st.playing = !reduce; if (reduce) render(st, at); return; }
    var top = st.el.getBoundingClientRect().top + window.scrollY;
    var travel = st.el.offsetHeight - (window.innerHeight - headerH());
    window.scrollTo({ top: top - headerH() + (at / st.len) * travel / 1.08 + 2, behavior: "smooth" });
  }

  var vscrubs = Array.prototype.slice.call(document.querySelectorAll("[data-vscrub]"));
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var st = stages.filter(function (x) { return x.el === e.target; })[0];
      if (e.isIntersecting && auto() && !st.started) { st.started = true; st.playing = true; st.t0 = performance.now(); }
      st.visible = e.isIntersecting;
    });
  }, { threshold: 0.35 }) : null;
  stages.forEach(function (st) { if (io) io.observe(st.el); else st.visible = true; });

  function frame(now) {
    var vh = window.innerHeight, hh = headerH();
    stages.forEach(function (st) {
      st.el.classList.toggle("is-auto", auto() || reduce);
      if (reduce) { render(st, st.len); return; }
      if (auto()) {
        if (st.playing) { var s = (now - st.t0) / 1400; if (s >= st.len) { s = st.len; st.playing = false; } render(st, s); }
        else if (!st.started) render(st, 0);
        return;
      }
      var r = st.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      var travel = st.el.offsetHeight - (vh - hh);
      var p = clamp((hh - r.top) / travel);
      render(st, Math.min(st.len, p * st.len * 1.08));
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
