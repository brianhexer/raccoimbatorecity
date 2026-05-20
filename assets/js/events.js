(function () {
  const buttons = document.querySelectorAll('[data-event-filter]');
  const cards = document.querySelectorAll('[data-event-type]');
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.eventFilter;
    cards.forEach((card) => card.classList.toggle('hidden', filter !== 'all' && card.dataset.eventType !== filter));
  }));
})();
