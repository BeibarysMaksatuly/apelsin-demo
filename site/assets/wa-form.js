// Contact forms open a prefilled WhatsApp chat with the studio, as on apelsin.design.
document.querySelectorAll('form#wa').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var text = 'Здравствуйте! Заявка с сайта.\nИмя: ' + (d.get('n') || '') + '\nТелефон: ' + (d.get('p') || '') +
      (d.get('e') ? '\nEmail: ' + d.get('e') : '') + '\nО проекте: ' + (d.get('m') || '');
    window.open('https://wa.me/77770239748?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
});
