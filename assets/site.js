// Header menus, the phone menu, the header line on scroll, and scroll reveals. No library.
(function () {
  // Scroll reveals. These run first and mark the page with rv-on; without it, a timer in the head shows everything.
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }
  document.documentElement.classList.add("rv-on");
})();

(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  // The header gets its hairline once the page scrolls.
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 4); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Product and Resources menus: hover on a mouse, click anywhere, Esc or a click outside to close.
  var groups = Array.prototype.slice.call(header.querySelectorAll(".nav__group"));
  var hoverable = window.matchMedia("(hover: hover) and (pointer: fine)");
  var timer;
  function setOpen(group, open) {
    group.classList.toggle("is-open", open);
    group.querySelector(".nav__trigger").setAttribute("aria-expanded", open ? "true" : "false");
  }
  function closeAll(except) { groups.forEach(function (g) { if (g !== except) setOpen(g, false); }); }

  groups.forEach(function (group) {
    var trigger = group.querySelector(".nav__trigger");
    trigger.addEventListener("click", function () {
      var open = !group.classList.contains("is-open");
      closeAll(group);
      setOpen(group, open);
    });
    group.addEventListener("mouseenter", function () {
      if (!hoverable.matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { closeAll(group); setOpen(group, true); }, 120);
    });
    group.addEventListener("mouseleave", function () {
      if (!hoverable.matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { setOpen(group, false); }, 160);
    });
    group.addEventListener("keydown", function (e) {
      var items = Array.prototype.slice.call(group.querySelectorAll(".nav__panel a"));
      var i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(group, true);
        items[Math.min(i + 1, items.length - 1)].focus();
      } else if (e.key === "ArrowUp" && i > -1) {
        e.preventDefault();
        if (i === 0) trigger.focus(); else items[i - 1].focus();
      }
    });
    group.addEventListener("focusout", function (e) {
      if (!group.contains(e.relatedTarget)) setOpen(group, false);
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav__group")) closeAll();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var open = groups.filter(function (g) { return g.classList.contains("is-open"); })[0];
    closeAll();
    if (open) open.querySelector(".nav__trigger").focus();
    if (header.classList.contains("is-open")) toggleSheet(false);
  });

  // Phone menu
  var menuBtn = header.querySelector(".menu-btn");
  function toggleSheet(open) {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("is-locked", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { toggleSheet(!header.classList.contains("is-open")); });
    document.querySelectorAll(".sheet a").forEach(function (a) {
      a.addEventListener("click", function () { toggleSheet(false); });
    });
    var wide = window.matchMedia("(min-width: 1024px)");
    var onWide = function (m) { if (m.matches) toggleSheet(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  // The tour: the sidebar follows the scroll. The last section or feature whose top has passed a line a third of the
  // way down the screen is the active one. Its module opens, the item lights up and the blue bar slides to it.
  var tour = document.querySelector("[data-tour]");
  if (tour) {
    var tnav = tour.querySelector(".tnav");
    var bar = tour.querySelector(".tnav__bar");
    var links = Array.prototype.slice.call(tnav.querySelectorAll("a"));
    var targets = links.map(function (a) { return document.getElementById(a.hash.slice(1)); });
    var current = -1;
    var pending = false;
    var place = function () {
      var link = links[current];
      if (!link || !bar) return;
      var top = link.getBoundingClientRect().top - tnav.getBoundingClientRect().top - tnav.clientTop;
      bar.style.height = link.offsetHeight + "px";
      bar.style.transform = "translateY(" + top + "px)";
    };
    var update = function () {
      pending = false;
      var line = window.innerHeight * 0.35;
      var active = 0;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= line) active = i; });
      if (active === current) return;
      current = active;
      var link = links[active];
      var mod = link.closest(".tnav__mod");
      tnav.querySelectorAll(".tnav__mod").forEach(function (m) { m.classList.toggle("is-active", m === mod); });
      links.forEach(function (a) {
        var on = a === link;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
      place();
      // On a phone the sidebar is a strip of tabs: keep the active one in view.
      var tab = mod.querySelector("a");
      if (tnav.scrollWidth > tnav.clientWidth) tnav.scrollTo({ left: tab.offsetLeft - 16, behavior: "smooth" });
    };
    var queue = function () { if (!pending) { pending = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", function () { place(); queue(); });
    update();
  }

})();
