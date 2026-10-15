// Variant switcher: a slim tab on the right edge that opens a side drawer with all four variants.
(function () {
  var VARIANTS = [
    { id: 'v1', n: '1', title: 'Исходная версия', note: 'Ваш текущий сайт: светлая и тёмная тема' },
    { id: 'v2', n: '2', title: 'Новая структура', note: 'Ваш стиль и шрифты, перестроенная структура' },
    { id: 'v3', n: '3', title: 'Премиум editorial', note: 'Полный редизайн в журнальном стиле' },
    { id: 'v4', n: '4', title: 'Альтернатива', note: 'Другая концепция подачи' }
  ];
  var current = document.documentElement.getAttribute('data-variant');
  var base = current ? '../' : '';
  var cur = VARIANTS.filter(function (v) { return v.id === current; })[0];

  var css = '' +
    '.vsw,.vsw *{box-sizing:border-box}' +
    '.vsw{font:500 14px/1.4 "Manrope",system-ui,sans-serif;color:#161616;-webkit-font-smoothing:antialiased}' +
    '.vsw-tab{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:9998;display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 9px;border:0;border-radius:14px 0 0 14px;background:#161616;color:#fff;cursor:pointer;box-shadow:-6px 10px 30px rgba(0,0,0,.18);transition:padding .25s,background .25s}' +
    '.vsw-tab:hover{padding-right:13px;background:#000}' +
    '.vsw-tab b{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#ff9500;color:#161616;font-size:12px;font-weight:700}' +
    '.vsw-tab span{writing-mode:vertical-rl;transform:rotate(180deg);font-size:12px;letter-spacing:.14em;text-transform:uppercase}' +
    '.vsw-scrim{position:fixed;inset:0;z-index:9998;background:rgba(10,10,10,.35);backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .35s}' +
    '.vsw-panel{position:fixed;top:0;right:0;bottom:0;z-index:9999;width:min(380px,92vw);background:#f7f4ef;box-shadow:-20px 0 60px rgba(0,0,0,.2);transform:translateX(100%);transition:transform .45s cubic-bezier(.22,1,.36,1);display:flex;flex-direction:column}' +
    '.vsw.open .vsw-panel{transform:none}.vsw.open .vsw-scrim{opacity:1;pointer-events:auto}' +
    '.vsw-hd{display:flex;justify-content:space-between;align-items:flex-start;padding:28px 24px 18px;border-bottom:1px solid #e2dcd2}' +
    '.vsw-hd small{display:block;color:#c96f00;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:600}' +
    '.vsw-hd strong{display:block;margin-top:6px;font:500 26px/1.1 "Cormorant Garamond",Georgia,serif}' +
    '.vsw-x{width:36px;height:36px;border-radius:50%;border:1px solid #e2dcd2;background:#fff;display:grid;place-items:center;cursor:pointer;font-size:18px;line-height:1;color:#161616}' +
    '.vsw-list{padding:16px;display:grid;gap:10px;overflow-y:auto}' +
    '.vsw-item{display:grid;grid-template-columns:112px 1fr;gap:14px;align-items:center;padding:10px;border-radius:14px;background:#fff;border:1px solid transparent;text-decoration:none;color:inherit;transition:border-color .2s,transform .2s}' +
    '.vsw-item:hover{border-color:#e2dcd2;transform:translateX(-2px)}' +
    '.vsw-item.on{border-color:#ff9500;box-shadow:0 0 0 3px rgba(255,149,0,.15)}' +
    '.vsw-th{position:relative;height:72px;border-radius:9px;overflow:hidden;background:#eee9e1}' +
    '.vsw-th img{width:100%;height:100%;object-fit:cover;object-position:top}' +
    '.vsw-th b{position:absolute;left:6px;top:6px;width:22px;height:22px;border-radius:50%;background:#ff9500;display:grid;place-items:center;font-size:11px;font-weight:700}' +
    '.vsw-item strong{display:block;font-size:15px;font-weight:600}' +
    '.vsw-item p{margin:3px 0 0;color:#5a6170;font-size:12.5px;line-height:1.4;font-weight:400}' +
    '.vsw-item em{display:inline-block;margin-top:6px;font-style:normal;font-size:11px;font-weight:600;color:#c96f00;letter-spacing:.06em;text-transform:uppercase}' +
    '.vsw-ft{margin-top:auto;padding:16px 24px 24px;border-top:1px solid #e2dcd2;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:13px;color:#5a6170}' +
    '.vsw-ft a{color:#161616;text-decoration:none;border-bottom:1px solid currentColor}' +
    '@media (max-width:767px){.vsw-tab{top:auto;bottom:140px;transform:none;padding:12px 7px}.vsw-tab span{font-size:10px}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var items = VARIANTS.map(function (v) {
    var on = v.id === current;
    return '<a class="vsw-item' + (on ? ' on' : '') + '" href="' + base + v.id + '/index.html">' +
      '<span class="vsw-th"><img src="' + base + 'assets/previews/' + v.id + '.jpg" alt=""><b>' + v.n + '</b></span>' +
      '<span><strong>' + v.title + '</strong><p>' + v.note + '</p>' + (on ? '<em>Вы смотрите</em>' : '') + '</span></a>';
  }).join('');

  var root = document.createElement('div');
  root.className = 'vsw';
  root.innerHTML =
    '<button class="vsw-tab" type="button" aria-label="Открыть варианты дизайна"><b>' + (cur ? cur.n : '4') + '</b><span>Варианты</span></button>' +
    '<div class="vsw-scrim"></div>' +
    '<aside class="vsw-panel" role="dialog" aria-label="Варианты главной страницы">' +
      '<div class="vsw-hd"><div><small>APELSIN · демо</small><strong>Варианты главной</strong></div><button class="vsw-x" type="button" aria-label="Закрыть">×</button></div>' +
      '<div class="vsw-list">' + items + '</div>' +
      '<div class="vsw-ft"><span>' + (cur ? 'Вариант ' + cur.n + ' из 4' : '4 варианта') + '</span><a href="' + base + 'index.html">Сравнить все варианты</a></div>' +
    '</aside>';
  document.body.appendChild(root);

  function toggle(open) { root.classList.toggle('open', open); }
  root.querySelector('.vsw-tab').addEventListener('click', function () { toggle(true); });
  root.querySelector('.vsw-x').addEventListener('click', function () { toggle(false); });
  root.querySelector('.vsw-scrim').addEventListener('click', function () { toggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
})();
