document.getElementById('contact-time')?.append(` • Updated ${new Date().toLocaleDateString()}`);

(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  const recent = document.getElementById('recent-requests');
  const storeKey = 'raccoContactLeads';
  // Keep only the latest browser-side requests to avoid unbounded localStorage growth.
  const maxStoredRequests = 20;
  const getRequestCountText = (count) =>
    count ? `Recent requests saved on this browser: ${count}` : 'No requests submitted from this browser yet.';

  if (!form || !status || !recent) return;

  const existing = JSON.parse(localStorage.getItem(storeKey) || '[]');
  recent.textContent = getRequestCountText(existing.length);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      interest: String(data.get('interest') || '').trim(),
      message: String(data.get('message') || '').trim(),
      submittedAt: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem(storeKey) || '[]');
    saved.push(payload);
    const trimmed = saved.slice(-maxStoredRequests);
    localStorage.setItem(storeKey, JSON.stringify(trimmed));
    recent.textContent = getRequestCountText(trimmed.length);

    status.classList.remove('hidden');
    status.textContent = 'Request submitted. Your email draft is opening now.';
    form.reset();

    const subject = encodeURIComponent(`Website Request: ${payload.interest}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\nInterest: ${payload.interest}\nMessage: ${payload.message || 'N/A'}`
    );
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:support@raccoimbatorecity.org?subject=${subject}&body=${body}`;
    mailtoLink.click();
  });
})();
