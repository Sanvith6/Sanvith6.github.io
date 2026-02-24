(function () {
  const revealItems = document.querySelectorAll('.reveal');

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const counters = document.querySelectorAll('.stat-number[data-count]');
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute('data-count'));
    if (!Number.isFinite(target)) {
      return;
    }

    let current = 0;
    const duration = 1200;
    const stepMs = 16;
    const steps = Math.max(1, Math.floor(duration / stepMs));
    const increment = Math.max(1, Math.ceil(target / steps));

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = String(target);
        window.clearInterval(timer);
        return;
      }
      counter.textContent = String(current);
    }, stepMs);
  });
})();
