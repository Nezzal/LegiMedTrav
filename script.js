// 🔑 À MODIFIER : remplace par le lien partagé de TON gem LegiMedTrav
const LEGIMEDTRAV_URL = 'https://gemini.google.com/gem/1Nbqoj71k-LItw5pnm2xyH_QcxvBjZ5zr?usp=sharing';

// Navigation entre onglets
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-tab') === tabId) {
      link.classList.add('active');
    }
  });
}

// Écouteurs de navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const tabId = this.getAttribute('data-tab');
    switchTab(tabId);
  });
});

// Fonction principale : envoie le prompt à LegiMedTrav-AI
function askAI(prompt) {
  const fullUrl = `${LEGIMEDTRAV_URL}?prompt=${encodeURIComponent(prompt)}`;
  window.open(fullUrl, '_blank');
}

// Génération du QR code en Phase 6
document.addEventListener('DOMContentLoaded', function() {
  if (typeof QRCode !== 'undefined') {
    new QRCode(document.getElementById('qrcode'), {
      text: LEGIMEDTRAV_URL,
      width: 220,
      height: 220,
      colorDark: '#000',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
});