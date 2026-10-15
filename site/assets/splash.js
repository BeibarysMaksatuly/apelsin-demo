// Shared splash for every variant.
// Timeline: a small window reveals and flips through the studio's interiors while "APELSIN" rises letter by letter
// and a counter runs to 100; the window then expands to full screen on the hero photo and dissolves into the page.
// Page entrance animations are held until the splash leaves. Shown on every page load (?nosplash skips).
(function () {
  if (/[?&]nosplash/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var root = document.documentElement;
  var base = root.getAttribute('data-variant') ? '../' : '';
  var img = function (n) { return base + 'assets/img/' + n + '.jpg'; };
  var frames = ['atyrau_kitchen', 'portfolio_cafe_cafe-01', 'atyrau_bedroom', 'portfolio_kv50_kv50-02', 'hero-interior'].map(img);
  var SPRING = 'cubic-bezier(.22,1,.36,1)', INOUT = 'cubic-bezier(.76,0,.24,1)';

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Manrope:wght@400;500&display=block';
  (document.head || root).appendChild(font);

  var css = '' +
    'html.spl-hide{overflow:hidden!important}' +
    'html.spl-hide body *,html.spl-hide body *::before,html.spl-hide body *::after{animation-play-state:paused!important}' +
    'html.spl-hide .rv{opacity:0!important;transform:translateY(40px)!important}' +
    '.spl{position:fixed;inset:0;z-index:2147483000;background:#14110e;color:#f7f3ec;font:500 11px/1.4 "Manrope",system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;overflow:hidden;transition:opacity .8s ' + SPRING + '}' +
    '.spl.fade{opacity:0;pointer-events:none}' +
    '.spl-win{--w:220px;--h:290px;position:absolute;inset:0;clip-path:inset(50% 50% 50% 50% round 4px);transition:clip-path 1s ' + INOUT + '}' +
    '.spl.s1 .spl-win{clip-path:inset(calc(50% - var(--h)/2) calc(50% - var(--w)/2) round 4px)}' +
    '.spl.s3 .spl-win{clip-path:inset(0 0 0 0 round 0);transition-duration:1.15s}' +
    '.spl-win img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.18);transition:opacity .35s,transform 1.6s ' + SPRING + '}' +
    '.spl-win img.on{opacity:1;transform:scale(1.04)}' +
    '.spl.s3 .spl-win img.on{transform:scale(1)}' +
    '.spl-win::after{content:"";position:absolute;inset:0;background:rgba(20,17,14,.25);transition:background 1s}' +
    '.spl.s3 .spl-win::after{background:rgba(20,17,14,.55)}' +
    '.spl-word{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);display:flex;justify-content:center;font:300 clamp(56px,13vw,190px)/1 "Cormorant Garamond",Georgia,serif;letter-spacing:.08em;text-transform:uppercase;padding-left:.08em;mix-blend-mode:difference;color:#fff;pointer-events:none}' +
    '.spl-word span{display:block;overflow:hidden;padding:.02em 0 .06em}' +
    '.spl-word i{display:block;font-style:normal;transform:translateY(110%);filter:blur(10px);opacity:0;transition:transform 1.1s ' + SPRING + ',filter 1s ' + SPRING + ',opacity .6s}' +
    '.spl.s2 .spl-word i{transform:none;filter:none;opacity:1}' +
    '.spl.s3 .spl-word i{transform:translateY(-110%);opacity:0;transition-duration:.8s;transition-delay:0s!important}' +
    '.spl-ui{position:absolute;inset:0;padding:clamp(18px,3.5vw,40px);display:flex;flex-direction:column;justify-content:space-between;opacity:0;transition:opacity .8s}' +
    '.spl.s1 .spl-ui{opacity:1}.spl.s3 .spl-ui{opacity:0;transition-duration:.4s}' +
    '.spl-row{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;color:rgba(247,243,236,.6)}' +
    '.spl-brand{display:flex;align-items:center;gap:10px;color:#f7f3ec}' +
    '.spl-brand img{width:26px;height:26px}' +
    '.spl-n{font:300 clamp(56px,9vw,120px)/.78 "Cormorant Garamond",Georgia,serif;letter-spacing:-.02em;color:#f7f3ec;font-variant-numeric:tabular-nums}' +
    '.spl-n small{font-size:.3em;color:#ff9500;margin-left:.15em}' +
    '.spl-bar{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#ff9500;transform-origin:left;transform:scaleX(0)}' +
    '@media (max-width:767px){.spl-win{--w:170px;--h:224px}.spl-hide-m{display:none}}';
  var style = document.createElement('style');
  style.textContent = css;
  (document.head || root).appendChild(style);

  var letters = 'APELSIN'.split('').map(function (c, i) {
    return '<span><i style="transition-delay:' + (i * 0.07) + 's">' + c + '</i></span>';
  }).join('');
  var el = document.createElement('div');
  el.className = 'spl';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML =
    '<div class="spl-win">' + frames.map(function (s) { return '<img src="' + s + '" alt="">'; }).join('') + '</div>' +
    '<div class="spl-word">' + letters + '</div>' +
    '<div class="spl-ui">' +
      '<div class="spl-row"><span class="spl-brand"><img src="' + base + 'assets/img/logo-icon.png" alt="">Apelsin Interior</span><span class="spl-hide-m">Студия дизайна интерьера</span><span>Алматы</span></div>' +
      '<div class="spl-row"><span class="spl-n"><b id="splN" style="font-weight:300">0</b><small>%</small></span><span style="text-align:right">Проект · 3D · Ремонт<br>под ключ</span></div>' +
    '</div>' +
    '<div class="spl-bar" id="splBar"></div>';
  root.appendChild(el);
  root.classList.add('spl-hide');

  var imgs = el.querySelectorAll('.spl-win img'), n = el.querySelector('#splN'), bar = el.querySelector('#splBar');
  var at = function (ms, fn) { setTimeout(fn, ms); };

  // Wait for the display font and the first frames so nothing swaps mid-animation (never longer than 1.2s).
  var ready = Promise.race([
    Promise.all([
      document.fonts ? document.fonts.load('300 100px "Cormorant Garamond"').catch(function () {}) : 0,
      new Promise(function (r) { var im = new Image(); im.onload = im.onerror = r; im.src = frames[0]; }),
      new Promise(function (r) { var im = new Image(); im.onload = im.onerror = r; im.src = frames[frames.length - 1]; })
    ]),
    new Promise(function (r) { setTimeout(r, 1200); })
  ]);

  ready.then(function () {
    var T = performance.now(), DUR = 2700;
    el.classList.add('s1');
    imgs[0].classList.add('on');
    at(350, function () { el.classList.add('s2'); });
    // flip through interiors inside the window, ending on the hero photo
    [700, 1150, 1600, 2050].forEach(function (ms, k) {
      at(ms, function () { imgs[k].classList.remove('on'); imgs[k + 1].classList.add('on'); });
    });
    (function tick(t) {
      var p = Math.min(1, (t - T) / DUR), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      n.textContent = Math.round(e * 100);
      bar.style.transform = 'scaleX(' + e + ')';
      if (p < 1) requestAnimationFrame(tick);
    })(T);
    at(DUR + 150, function () { el.classList.add('s3'); });          // window expands, word lifts away
    at(DUR + 1100, function () {                                       // hand over to the page
      root.classList.remove('spl-hide');
      el.classList.add('fade');
      document.dispatchEvent(new CustomEvent('splashdone'));
    });
    at(DUR + 2000, function () { el.remove(); style.remove(); });
  });

  // Returning via the back/forward cache mid-splash must never leave the page locked.
  addEventListener('pageshow', function (e) {
    if (e.persisted) { root.classList.remove('spl-hide'); if (el.parentNode) el.remove(); }
  });
})();
