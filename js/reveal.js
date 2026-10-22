/**
 * Scroll-reveal: элементы с [data-reveal] плавно проявляются при
 * попадании во вьюпорт (один раз, дальше отключаются от observer).
 * Общий для всех страниц сайта.
 */
(function () {
  var items = document.querySelectorAll('[data-reveal]');

  items.forEach(function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.transitionDelay = d + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { io.observe(el); });
})();
