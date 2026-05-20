(function () {
  const buttons = document.querySelectorAll('[data-crew-tab]');
  const rows = document.querySelectorAll('[data-crew-group]');
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.crewTab;
    rows.forEach((row) => row.classList.toggle('hidden', row.dataset.crewGroup !== target && target !== 'all'));
  }));
})();
