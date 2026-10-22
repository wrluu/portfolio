/**
 * Общая органическая tilt-анимация для декоративных элементов
 * (листок в Hero, оранжевый штрихкод). Позиция лерпится через
 * requestAnimationFrame, а не мгновенным CSS-переходом — поэтому
 * и следование за курсором, и возврат в исходное положение
 * ощущаются как одно плавное, живое движение, а не "прыжок".
 *
 * Штрихкод и листок используют одну и ту же функцию с разными
 * амплитудами — это и есть "одна интерактивная система", а не
 * два независимых эффекта.
 */
function createOrganicTilt(el, opts) {
  if (!el) return;
  opts = opts || {};

  var rxAmp = opts.rx !== undefined ? opts.rx : 6;
  var ryAmp = opts.ry !== undefined ? opts.ry : 7;
  var txAmp = opts.tx !== undefined ? opts.tx : 8;
  var tyAmp = opts.ty !== undefined ? opts.ty : 6;
  var liftPx = opts.liftPx !== undefined ? opts.liftPx : 0;
  var scaleAmp = opts.scale !== undefined ? opts.scale : 0.015;
  var ease = opts.ease !== undefined ? opts.ease : 0.09;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // элемент остаётся статичным

  var target = { rx: 0, ry: 0, tx: 0, ty: 0, s: 1 };
  var current = { rx: 0, ry: 0, tx: 0, ty: 0, s: 1 };

  function loop() {
    current.rx += (target.rx - current.rx) * ease;
    current.ry += (target.ry - current.ry) * ease;
    current.tx += (target.tx - current.tx) * ease;
    current.ty += (target.ty - current.ty) * ease;
    current.s  += (target.s  - current.s ) * ease;

    el.style.transform =
      'translate(' + current.tx + 'px, ' + current.ty + 'px) ' +
      'rotateX(' + current.rx + 'deg) rotateY(' + current.ry + 'deg) ' +
      'scale(' + current.s + ')';

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  el.addEventListener('mousemove', function (e) {
    var rect = el.getBoundingClientRect();
    var px = (e.clientX - rect.left) / rect.width - 0.5;
    var py = (e.clientY - rect.top) / rect.height - 0.5;
    target = {
      rx: py * -rxAmp,
      ry: px * ryAmp,
      tx: px * txAmp,
      ty: py * tyAmp - liftPx,
      s: 1 + scaleAmp
    };
  });

  el.addEventListener('mouseleave', function () {
    target = { rx: 0, ry: 0, tx: 0, ty: 0, s: 1 };
  });
}
