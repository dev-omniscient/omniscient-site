// The home page's product shots: each one plays once when it comes into view. (The arrow through the old nine
// stages draws only where that markup is.)
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = document.getElementById("flow");
  const ink = host?.querySelector(".flow .ink"), head = host?.querySelector(".flow .head");
  const stages = host ? [...host.querySelectorAll(".stage")] : [];
  const chev = [...document.querySelectorAll(".chev a")];
  const order = stages.map((s) => s.id);

  // One arrow through all nine stages, drawn to 40% down the screen. A stage's box fills when the arrow reaches it.
  function draw() {
    if (!host) return;
    const r = host.getBoundingClientRect();
    const target = reduce ? r.height : Math.max(0, Math.min(r.height, innerHeight * 0.4 - r.top));
    ink.style.height = target + "px";
    head.style.top = target + "px";
    let current = -1;
    stages.forEach((s, i) => {
      const node = s.querySelector(".node");
      const y = (node || s).getBoundingClientRect().top - r.top + (node ? node.offsetHeight / 2 : 60);
      const reached = y <= target;
      s.classList.toggle("reached", reached);
      if (reached) current = i;
    });
    chev.forEach((a) => {
      const i = order.indexOf(a.dataset.for);
      a.classList.toggle("on", i === current);
      a.classList.toggle("done", i < current);
    });
  }
  addEventListener("scroll", draw, { passive: true });
  addEventListener("resize", draw);
  draw();

  // Each product shot plays once when it comes into view.
  const typed = document.getElementById("typed");
  const reply = "Happy to. A trial runs for 14 days on your own leads, and I can set it up with your team on Thursday. Does 2pm work?";
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    if (el.querySelector("#people")) {
      setTimeout(() => {
        const btn = document.getElementById("approve"), box = document.getElementById("people");
        btn.classList.add("done"); btn.textContent = "Approved"; box.classList.add("approved");
        box.querySelectorAll(".state").forEach((t) => (t.textContent = "Approved"));
      }, reduce ? 0 : 1200);
    }
    if (el.id === "inboxband") {
      if (reduce) typed.textContent = reply;
      else { let i = 0; const t = setInterval(() => { typed.textContent = reply.slice(0, ++i); if (i >= reply.length) clearInterval(t); }, 22); }
    }
    if (el.id === "closeband") {
      setTimeout(() => { const t = document.getElementById("stagetag"); t.textContent = "Won"; t.className = "tag t-green"; }, reduce ? 0 : 1900);
    }
    io.unobserve(el);
  }), { threshold: 0.12 });
  document.querySelectorAll("[data-anim]").forEach((el) => io.observe(el));
})();

// The three sections: each screen is sized to fit its frame in full, the words on the left switch to the screen in
// the middle of the view, and that screen plays what's going on in it, again every 10 seconds while it stays there.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shows = [...document.querySelectorAll(".show")];
  if (!shows.length) return;
  const fits = [...document.querySelectorAll(".screen-fit")];
  function fit() {
    const phone = innerWidth <= 900;
    fits.forEach((f) => {
      const c = f.firstElementChild;
      const w = phone ? 560 : Number(f.dataset.w) || 920;
      c.style.width = w + "px";
      c.style.zoom = String(Math.min(1.2, f.clientWidth / w));
    });
  }
  addEventListener("resize", fit);
  fit();

  const count = (el) => {
    const to = Number(el.dataset.count);
    if (reduce) return void (el.textContent = to.toLocaleString("en-US"));
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString("en-US");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  function play(show) {
    const stage = show.querySelector(".show-stage");
    stage.classList.remove("in");
    void stage.offsetWidth;
    stage.classList.add("in");
    stage.querySelectorAll("[data-count]").forEach(count);
  }
  let current = null, timer = 0;
  function activate(show) {
    if (show === current) return;
    current = show;
    document.querySelectorAll(".st").forEach((s) => s.classList.toggle("on", s.dataset.for === show.id));
    play(show);
    clearInterval(timer);
    if (!reduce) timer = setInterval(() => play(show), 10000);
  }
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && activate(e.target)), { rootMargin: "-45% 0px -45% 0px" });
  shows.forEach((s) => io.observe(s));
})();
