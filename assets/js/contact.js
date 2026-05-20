document.getElementById('contact-time')?.append(` • Updated ${new Date().toLocaleDateString()}`);

(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  const recent = document.getElementById('recent-requests');
  const storeKey = 'raccoContactLeads';

  if (!form || !status || !recent) return;

  const existing = JSON.parse(localStorage.getItem(storeKey) || '[]');
  recent.textContent = existing.length ? `Recent requests saved on this browser: ${existing.length}` : 'No requests submitted from this browser yet.';

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

    if (!payload.name || !payload.email || !payload.interest) {
      status.classList.remove('hidden');
      status.textContent = 'Please fill Name, Email, and Interest to continue.';
      return;
    }

    const saved = JSON.parse(localStorage.getItem(storeKey) || '[]');
    saved.push(payload);
    localStorage.setItem(storeKey, JSON.stringify(saved.slice(-20)));
    recent.textContent = `Recent requests saved on this browser: ${Math.min(saved.length, 20)}`;

    status.classList.remove('hidden');
    status.textContent = 'Request submitted. Your email draft is opening now.';
    form.reset();

    const subject = encodeURIComponent(`Website Request: ${payload.interest}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\nInterest: ${payload.interest}\nMessage: ${payload.message || 'N/A'}`
    );
    window.location.href = `mailto:support@raccoimbatorecity.org?subject=${subject}&body=${body}`;
  });
})();
