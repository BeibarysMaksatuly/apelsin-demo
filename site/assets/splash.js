// Shared splash screen for every variant: kinetic logo reveal + counter, then a two-layer curtain wipe.
// Shown once per browser session; skipped for reduced-motion visitors and when ?nosplash is in the URL.
(function () {
  var seen = false;
  try { seen = sessionStorage.getItem('apelsin-splash') === '1'; } catch (e) {}
  if (seen || /[?&]nosplash/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try { sessionStorage.setItem('apelsin-splash', '1'); } catch (e) {}

  var root = document.documentElement;
  var base = root.getAttribute('data-variant') ? '../' : '';
  var ease = 'cubic-bezier(.76,0,.24,1)', spring = 'cubic-bezier(.22,1,.36,1)';

  var css = '' +
    '.spl{position:fixed;inset:0;z-index:2147483000;pointer-events:all;font-family:"Manrope","Onest",system-ui,sans-serif}' +
    '.spl-l{position:absolute;inset:0;transition:clip-path 1.1s ' + ease + '}' +
    '.spl-or{background:#ff9500;transition-delay:.12s}' +
    '.spl-bg{background:#14110e;color:#f7f3ec;display:flex;align-items:center;justify-content:center;overflow:hidden}' +
    '.spl.out .spl-l{clip-path:inset(0 0 100% 0)}' +
    '.spl-glow{position:absolute;width:70vmin;height:70vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,149,0,.28),transparent 65%);filter:blur(40px);opacity:0;transform:scale(.6);transition:opacity 1.6s ' + spring + ',transform 2.4s ' + spring + '}' +
    '.spl.go .spl-glow{opacity:1;transform:scale(1)}' +
    '.spl-c{position:relative;display:flex;flex-direction:column;align-items:center;gap:22px}' +
    '.spl-logo{width:84px;height:84px;opacity:0;transform:scale(.4) rotate(-120deg);transition:transform 1.3s ' + spring + ',opacity .6s}' +
    '.spl.go .spl-logo{opacity:1;transform:none}' +
    '.spl-word{display:flex;overflow:hidden;font:300 clamp(44px,9vw,104px)/1 "Cormorant Garamond","Playfair",Georgia,serif;letter-spacing:.14em;padding-left:.14em}' +
    '.spl-word span{display:block;transform:translateY(105%);transition:transform 1s ' + spring + '}' +
    '.spl.go .spl-word span{transform:none}' +
    '.spl-sub{overflow:hidden;font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:#ff9500}' +
    '.spl-sub span{display:block;transform:translateY(110%);transition:transform .9s ' + spring + ' .75s}' +
    '.spl.go .spl-sub span{transform:none}' +
    '.spl-f{position:absolute;left:0;right:0;bottom:0;padding:0 clamp(16px,4vw,48px) clamp(20px,4vw,40px);display:flex;justify-content:space-between;align-items:flex-end;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:rgba(247,243,236,.55)}' +
    '.spl-n{font:300 clamp(48px,8vw,96px)/.8 "Cormorant Garamond","Playfair",Georgia,serif;letter-spacing:-.02em;color:#f7f3ec;font-variant-numeric:tabular-nums}' +
    '.spl-bar{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#ff9500;transform-origin:left;transform:scaleX(0)}' +
    '.spl-hide{overflow:hidden!important}';

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Manrope:wght@400;500&display=swap';
  (document.head || root).appendChild(font);

  var style = document.createElement('style');
  style.textContent = css;
  (document.head || root).appendChild(style);

  var word = 'APELSIN'.split('').map(function (ch, i) {
    return '<span style="transition-delay:' + (0.25 + i * 0.06) + 's">' + ch + '</span>';
  }).join('');
  var el = document.createElement('div');
  el.className = 'spl';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML =
    '<div class="spl-l spl-or"></div>' +
    '<div class="spl-l spl-bg"><div class="spl-glow"></div>' +
      '<div class="spl-c"><img class="spl-logo" src="' + base + 'assets/img/logo-icon.png" alt="">' +
      '<div class="spl-word">' + word + '</div><div class="spl-sub"><span>Interior · Алматы</span></div></div>' +
      '<div class="spl-f"><span class="spl-n" id="splN">000</span><span>Дизайн интерьера под ключ</span></div>' +
      '<div class="spl-bar" id="splBar"></div></div>';
  root.appendChild(el);
  root.classList.add('spl-hide');

  requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('go'); }); });

  // Counter runs ~1.7s with ease-out; finishing also waits for the page to load (max 4s total).
  var start = performance.now(), dur = 2600, loaded = document.readyState === 'complete', done = false;
  addEventListener('load', function () { loaded = true; });
  var n = el.querySelector('#splN'), bar = el.querySelector('#splBar');
  function tick(t) {
    var p = Math.min(1, (t - start) / dur), e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    if (!loaded && t - start < 4000) e = Math.min(e, 0.92);
    n.textContent = String(Math.round(e * 100)).padStart(3, '0');
    bar.style.transform = 'scaleX(' + e + ')';
    if (e >= 1 || t - start > 4000) { finish(); return; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function finish() {
    if (done) return; done = true;
    n.textContent = '100'; bar.style.transform = 'scaleX(1)';
    setTimeout(function () {
      el.classList.add('out');
      root.classList.remove('spl-hide');
      setTimeout(function () { el.remove(); style.remove(); }, 1400);
    }, 450);
  }
})();
