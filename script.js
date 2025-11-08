// 🔑 À MODIFIER : remplace par le lien partagé de TON gem LegiMedTrav
const LEGIMEDTRAV_URL = 'https://gemini.google.com/gem/1Nbqoj71k-LItw5pnm2xyH_QcxvBjZ5zr?usp=sharing';

// Navigation entre onglets (compatible avec .tab-warroom)
function switchTab(tabId) {
  // Masquer tous les contenus
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  // Afficher le bon contenu
  const targetSection = document.getElementById(tabId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Désactiver tous les boutons
  document.querySelectorAll('.tab-warroom').forEach(btn => {
    btn.classList.remove('active');
  });
  // Activer le bon bouton
  const activeButton = document.querySelector(`.tab-warroom[data-tab="${tabId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

// Fonction principale : ouvre le gem LegiMedTrav-AI
function askAI(prompt) {
  // ⚠️ Gemini ne prend PAS les prompts via l'URL.
  // Le lien partagé ouvre déjà le gem configuré.
  // Le prompt sert de guide pédagogique — l'utilisateur le copie/colle manuellement.
  window.open(LEGIMEDTRAV_URL, '_blank');
}

// Initialisation au chargement complet du DOM
document.addEventListener('DOMContentLoaded', function () {
  // Écouteurs pour les onglets
  document.querySelectorAll('.tab-warroom').forEach(button => {
    button.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Génération du QR code (sécurisée)
  const qrcodeContainer = document.getElementById('qrcode');
  if (typeof QRCode !== 'undefined' && qrcodeContainer && !qrcodeContainer.hasChildNodes()) {
    new QRCode(qrcodeContainer, {
      text: LEGIMEDTRAV_URL,
      width: 220,
      height: 220,
      colorDark: '#000',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
});