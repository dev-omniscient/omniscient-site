// Product pages: each product shot plays once when it comes into view (rows arrive, signals and bars fill).
(() => {
  const shots = document.querySelectorAll("[data-anim]");
  if (!("IntersectionObserver" in window)) return shots.forEach((el) => el.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  }), { threshold: 0.12 });
  shots.forEach((el) => io.observe(el));
})();
