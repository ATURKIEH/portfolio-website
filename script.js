document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('nav-active'));
          const match = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (match) match.classList.add('nav-active');
        }
      });
    },
    { threshold: 0.3 }
  );

  ['about', 'experience', 'projects', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });
});