// Floating variant switcher shared by all four homepage variants.
(function () {
  var VARIANTS = [
    { id: 'v1', n: '1', title: 'Исходная версия', note: 'Ваш текущий сайт · светлая и тёмная тема' },
    { id: 'v2', n: '2', title: 'Новая структура', note: 'Ваш стиль и шрифты, перестроенная структура' },
    { id: 'v3', n: '3', title: 'Премиум editorial', note: 'Полный редизайн в журнальном стиле' },
    { id: 'v4', n: '4', title: 'Альтернатива', note: 'Другая концепция подачи' }
  ];

  var current = document.documentElement.getAttribute('data-variant');
  var hasTheme = document.documentElement.hasAttribute('data-theme-toggle');
  var base = current ? '../' : '';

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  var css = '' +
    '.vs{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9999;font:500 13px/1.3 "Manrope",system-ui,sans-serif;color:#161616}' +
    '.vs-bar{display:flex;align-items:center;gap:6px;padding:6px;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(22,22,22,.1);border-radius:999px;box-shadow:0 12px 40px rgba(0,0,0,.18)}' +
    '.vs a,.vs button{all:unset;cursor:pointer;box-sizing:border-box}' +
    '.vs-home{padding:9px 14px;border-radius:999px;color:#5a6170}' +
    '.vs-home:hover{background:#f1ede6;color:#161616}' +
    '.vs-v{display:flex;align-items:center;gap:8px;padding:8px 14px 8px 8px;border-radius:999px;white-space:nowrap;transition:background .2s}' +
    '.vs-home,.vs-theme{white-space:nowrap}' +
    '.vs-v:hover{background:#f1ede6}' +
    '.vs-v b{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#f1ede6;font-weight:600;font-size:12px}' +
    '.vs-v.on{background:#161616;color:#fff}.vs-v.on b{background:#ff9500;color:#161616}' +
    '.vs-sep{width:1px;height:22px;background:rgba(22,22,22,.12);margin:0 4px}' +
    '.vs-theme{padding:9px 14px;border-radius:999px;border:1px solid rgba(22,22,22,.14)}' +
    '.vs-theme:hover{background:#f1ede6}' +
    '.vs-min{width:32px;height:32px;display:grid!important;place-items:center;border-radius:50%;color:#5a6170}' +
    '.vs-min:hover{background:#f1ede6}' +
    '.vs-note{position:absolute;left:50%;bottom:calc(100% + 10px);transform:translateX(-50%);white-space:nowrap;padding:8px 14px;border-radius:10px;background:#161616;color:#fff;font-size:12px;opacity:0;pointer-events:none;transition:opacity .2s}' +
    '.vs:hover .vs-note{opacity:1}' +
    '.vs.mini .vs-v span,.vs.mini .vs-home,.vs.mini .vs-theme,.vs.mini .vs-sep{display:none}' +
    '.vs.mini .vs-v{padding:8px}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var root = document.createElement('nav');
  root.className = 'vs';
  root.setAttribute('aria-label', 'Варианты дизайна');
  var cur = VARIANTS.filter(function (v) { return v.id === current; })[0];

  var html = '<div class="vs-note">' + (cur ? 'Вариант ' + cur.n + ' — ' + cur.note : 'Выберите вариант') + '</div><div class="vs-bar">';
  html += '<a class="vs-home" href="' + base + 'index.html">Все варианты</a>';
  VARIANTS.forEach(function (v) {
    html += '<a class="vs-v' + (v.id === current ? ' on' : '') + '" href="' + base + v.id + '/index.html" title="' + v.note + '"><b>' + v.n + '</b><span>' + v.title + '</span></a>';
  });
  if (hasTheme) html += '<span class="vs-sep"></span><button class="vs-theme" type="button"></button>';
  html += '<button class="vs-min" type="button" aria-label="Свернуть панель">–</button></div>';
  root.innerHTML = html;
  document.body.appendChild(root);

  if (store('vs-mini') === '1') root.classList.add('mini');
  root.querySelector('.vs-min').addEventListener('click', function () {
    root.classList.toggle('mini');
    store('vs-mini', root.classList.contains('mini') ? '1' : '0');
    this.textContent = root.classList.contains('mini') ? '+' : '–';
  });
  if (root.classList.contains('mini')) root.querySelector('.vs-min').textContent = '+';

  if (hasTheme) {
    var btn = root.querySelector('.vs-theme');
    var paint = function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.textContent = dark ? '☀ Светлая тема' : '☾ Тёмная тема';
    };
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      store('v1-theme', next);
      paint();
      document.dispatchEvent(new CustomEvent('themechange'));
    });
    paint();
  }
})();
