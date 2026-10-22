/**
 * Кастомный курсор — ОДНА единая система на весь сайт.
 * Этот файл — единственный источник логики курсора, подключается
 * одинаково на index.html и на каждой странице /projects/*.html.
 * Отдельной реализации ни на одной странице нет.
 *
 * Negative/inverted — это DEFAULT-вид курсора (см. css/style.css:
 * mix-blend-mode:difference + сплошная заливка стоят всегда, без
 * условий). Наведение на кликабельные элементы никак не меняет
 * ни размер, ни форму, ни сам эффект — поэтому здесь нет никакой
 * hover-детекции вообще, только слежение за позицией курсора.
 *
 * На touch-устройствах ничего не создаётся — родной курсор
 * (которого там и так нет) не трогается.
 */
(function () {
  var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) return;

  document.documentElement.classList.add('has-custom-cursor');

  var cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<span class="cursor-dot"></span>';
  document.body.appendChild(cursor);

  var mx = 0, my = 0, cx = 0, cy = 0, shown = false;

  window.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!shown) {
      shown = true;
      cursor.classList.add('cursor--visible');
    }
  });

  (function raf() {
    cx += (mx - cx) * 0.2;
    cy += (my - cy) * 0.2;
    cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    requestAnimationFrame(raf);
  })();
})();
