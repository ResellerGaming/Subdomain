const form = document.getElementById('subdomainForm');
const loading = document.getElementById('loading');
const resultBox = document.getElementById('result');
const errorBox = document.getElementById('error');
const resultSubdomain = document.getElementById('result-subdomain');
const resultIP = document.getElementById('result-ip');
const errorMsg = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Reset state
  loading.classList.remove('hidden');
  resultBox.classList.add('hidden');
  errorBox.classList.add('hidden');

  const subdomain = form.subdomain.value.trim();
  const ip = form.ip.value.trim();

  try {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ subdomain, ip })
    });

    const data = await res.json();
    loading.classList.add('hidden');

    if (data.success) {
      resultSubdomain.textContent = `${subdomain}.domain.my.id`;
      resultIP.textContent = ip;
      resultBox.classList.remove('hidden');
    } else {
      errorMsg.textContent = data.error || 'Terjadi kesalahan tidak dikenal.';
      errorBox.classList.remove('hidden');
    }
  } catch (err) {
    loading.classList.add('hidden');
    errorMsg.textContent = 'Gagal terhubung ke server.';
    errorBox.classList.remove('hidden');
  }
});
    
