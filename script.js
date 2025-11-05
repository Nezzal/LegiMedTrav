// 🔑 À MODIFIER : remplace par le lien partagé de TON gem LegiMedTrav
const LEGIMEDTRAV_URL = 'https://gemini.google.com/gem/1Nbqoj71k-LItw5pnm2xyH_QcxvBjZ5zr?usp=sharing';

// Navigation entre onglets (nouveau système avec .tab-warroom)
function switchTab(tabId) {
  // Masquer tous les contenus
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  // Afficher le bon contenu
  document.getElementById(tabId).classList.add('active');

  // Désactiver tous les boutons
  document.querySelectorAll('.tab-warroom').forEach(btn => {
    btn.classList.remove('active');
  });
  // Activer le bon bouton
  document.querySelector(`.tab-warroom[data-tab="${tabId}"]`).classList.add('active');
}

// Écouteurs de navigation (pour les boutons .tab-warroom)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tab-warroom').forEach(button => {
    button.addEventListener('click', function (e) {
      const tabId = this.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Génération du QR code en Phase 6 (si bibliothèque chargée)
  if (typeof QRCode !== 'undefined') {
    const qrcodeContainer = document.getElementById('qrcode');
    if (qrcodeContainer && !qrcodeContainer.hasChildNodes()) {
      new QRCode(qrcodeContainer, {
        text: LEGIMEDTRAV_URL,
        width: 220,
        height: 220,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
});

// Fonction principale : envoie le prompt à LegiMedTrav-AI
function askAI(prompt) {
  // Ouvrir directement le gem (sans paramètre `?prompt=...`, car Gemini n’accepte pas les prompts par URL)
  window.open(LEGIMEDTRAV_URL, '_blank');
}