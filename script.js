// =============== script.js ===============
// Mission SST : Bâtir la Prévention — Version finale 2025
// ✅ Fonctionne sur desktop ET smartphone
// ✅ Copie automatique résiliente + fallback modale

console.log("✅ Script chargé — LegiMedTrav prêt");

// === 1. GESTION DES ONGLETS PRINCIPAUX ===
document.querySelectorAll('.tab-warroom').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-warroom').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    button.classList.add('active');
    const targetId = button.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');

    if (targetId === 'debriefing') {
      generateQRCode();
    }
  });
});

// === 2. GESTION DES SOUS-ONGLETS ===
document.querySelectorAll('.sub-tab-warroom').forEach(button => {
  button.addEventListener('click', () => {
    const parentSection = button.closest('.tab-content');
    const subTabId = button.getAttribute('data-subtab');

    parentSection.querySelectorAll('.sub-tab-warroom').forEach(b => b.classList.remove('active'));
    parentSection.querySelectorAll('.sub-content-warroom').forEach(c => c.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(subTabId).classList.add('active');
  });
});

// === 3. PROMPTS PRÉDÉFINIS (exacts, format réglementaire) ===
const PROMPTS = {
  "dossier1-affaire1": `1. SECRET PROFESSIONNEL - CADRE LÉGAL :
a) Le secret professionnel du médecin du travail comporte-t-il des exceptions 
   face aux demandes d'un employeur ?
b) Citez les articles PRÉCIS du Code de Déontologie Médicale (Décret exécutif 
   n° 92-276 du 06 juillet 1992, JO n° 52 du 08 juillet 1992, page 1160) 
   définissant l'étendue et les limites du secret professionnel.
c) Précisez le numéro d'article ET reproduisez l'extrait pertinent du texte.

2. COMMUNICATION AUTORISÉE :
a) Quelles informations le médecin du travail PEUT-il légalement communiquer 
   à l'employeur concernant un salarié ?
b) Quelles informations sont STRICTEMENT INTERDITES de communication ?
c) Citez l'article du Décret 93-120 (relatif à l'organisation de la médecine 
   du travail) précisant le contenu de l'avis d'aptitude.

3. CONSÉQUENCES JURIDIQUES D'UNE VIOLATION :
a) Listez les trois types de responsabilités engagées en cas de violation 
   du secret professionnel.
b) Pour chaque type, citez la base légale PRÉCISE (loi, décret, code, article).
c) Précisez les sanctions applicables selon chaque texte.

FORMAT DE RÉPONSE EXIGÉ :
- Chaque affirmation doit être suivie de : [Référence : Texte, Article, Alinéa]
- Exemple : "Le secret professionnel est absolu. [Référence : Code de Déontologie 
  Médicale, Décret 92-276, Article 36, Alinéa 1]"`,

  "dossier1-affaire2": `1. MISSION FONDAMENTALE DU MÉDECIN DU TRAVAIL :
a) Selon la Loi 88-07 relative à l'hygiène, la sécurité et la médecine 
   du travail, quelle est la nature de la mission du médecin du travail ?
b) Citez PRÉCISÉMENT l'article de la Loi 88-07 définissant cette mission.
c) Reproduisez l'extrait pertinent du texte législatif.

2. ÉTENDUE DE LA MISSION - INDIVIDU VS COLLECTIF :
a) Le rôle du médecin du travail se limite-t-il au suivi médical individuel 
   des salariés ?
b) Quelle obligation a-t-il concernant l'action sur le milieu de travail ?
c) Citez l'article de la Loi 88-07 précisant cette obligation d'action 
   sur l'environnement de travail.
d) Le médecin du travail a-t-il une contrainte temporelle réglementaire 
   (proportion de temps minimum) pour son action sur le milieu ? 
   Si oui, citez le texte. Si non, précisez que cette proportion n'existe 
   pas dans la législation algérienne.

3. OBLIGATION DE CONSEIL ENVERS L'EMPLOYEUR :
a) Le médecin du travail a-t-il une obligation de conseil actif envers 
   l'employeur ?
b) Citez l'article du Décret exécutif n° 93-120 du 15 mai 1993 (relatif 
   à l'organisation de la médecine du travail) définissant cette fonction 
   de conseil.
c) Quels sont les outils réglementaires permettant au médecin de formaliser 
   ses recommandations à l'employeur ? (précisez notamment le rôle du 
   rapport annuel)

4. CONSÉQUENCES JURIDIQUES D'UN DÉFAUT D'ACTION COLLECTIVE :
a) Un médecin qui se limite aux soins individuels sans agir sur les causes 
   collectives identifiées engage-t-il sa responsabilité ?
b) Sur quelle base légale cette responsabilité peut-elle être invoquée ?

FORMAT DE RÉPONSE EXIGÉ :
- Chaque affirmation doit être suivie de : [Référence : Texte, Article, Alinéa]
- Précisez si une information n'existe PAS dans la législation algérienne 
  (exemple : "Il n'existe aucune proportion temporelle fixée par la loi 
  algérienne pour l'action sur le milieu")`,

  "dossier1-affaire3": `1. OBLIGATION DE TRAÇABILITÉ DE L'ALERTE :
a) Une alerte orale du médecin du travail constitue-t-elle une preuve 
   juridiquement valable ?
b) Quels sont les moyens réglementaires de traçabilité écrite obligatoire 
   pour le médecin du travail ?
c) Citez les textes réglementaires (loi, décret, arrêté) précisant 
   l'obligation de tenue du registre d'hygiène et de sécurité.
d) Quel est le statut juridique d'une alerte consignée dans ce registre ?

2. ESCALADE INTERNE OBLIGATOIRE :
a) Quelles sont les instances internes que le médecin du travail doit 
   informer officiellement face à un danger identifié ?
b) Précisez le rôle de la Commission d'Hygiène et de Sécurité (CHS) :
   - Base légale de création (citez le décret et l'article)
   - Mission de la CHS face à un danger
   - Pouvoir de la CHS vis-à-vis de l'employeur
c) Citez le texte précisant l'obligation du médecin d'informer la CHS.

3. RECOURS EXTERNE - DEVOIR D'ALERTE :
a) Dans quelles circonstances le médecin du travail a-t-il le DEVOIR 
   (et non simplement la possibilité) d'alerter l'Inspection du Travail ?
b) Définissez la notion de "danger grave et imminent" selon la législation 
   algérienne du travail. Citez la base légale.
c) Quelle est la procédure réglementaire de signalement à l'Inspection 
   du Travail ?
d) Citez l'article de la Loi 90-11 (Code du travail) ou de la Loi 88-07 
   précisant ce devoir d'alerte aux autorités compétentes.

4. RESPONSABILITÉ JURIDIQUE DU MÉDECIN :
a) Un médecin qui se limite à une alerte orale sans suivi engage-t-il 
   sa responsabilité en cas d'accident ultérieur ?
b) Sur quelle base légale cette responsabilité peut-elle être établie ?
c) Le silence ou l'absence de traçabilité peuvent-ils être qualifiés 
   juridiquement de "caution implicite" du danger ?

5. POUVOIR DE DÉCISION DU MÉDECIN :
a) Le médecin du travail a-t-il le pouvoir réglementaire d'arrêter 
   une activité dangereuse ?
b) Si oui, citez la base légale. Si non, précisez les limites de son pouvoir 
   et les recours dont il dispose.

FORMAT DE RÉPONSE EXIGÉ :
- Chaque affirmation doit être suivie de : [Référence : Texte, Article, Alinéa]
- Si un pouvoir ou une procédure n'existe PAS dans la législation algérienne, 
  le préciser explicitement
- Distinguer clairement : obligations / recommandations / interdictions`,

  // Dossiers 2–4 : prompts courts (à étendre si besoin)
  "dossier2-phase1": "Décrivez la surveillance médicale minimale obligatoire pour les travailleurs administratifs en Algérie (fréquence, contenu, rôle du médecin du travail), selon la loi 11-03 et ses textes d’application.",
  "dossier2-phase2": "Pour des soudeurs exposés aux fumées métalliques et UV, listez les examens complémentaires obligatoires, la fréquence des visites, et les critères d’inaptitude temporaire/ définitive.",
  "dossier2-phase3": "Expliquez le dispositif de Suivi Post-Professionnel (SPP) en Algérie : qui est concerné ? Quels sont les délais légaux ? Qui prend en charge les frais ? Quel est le rôle du médecin du travail ?",
  "dossier3-piece1": "Une fiche de visite médicale incomplète (sans mention d’aptitude spécifique) est-elle valable juridiquement ? Quelles sanctions encourent l’employeur et le médecin en cas de contrôle de l’inspection du travail ?",
  "dossier3-piece2": "Des vaccinations obligatoires (ex: tétanos) ne sont pas enregistrées dans le registre. Qui est responsable : le médecin, l’employeur, ou le travailleur ? Quelles sont les conséquences en cas d’accident ?",
  "dossier3-piece3": "Absence de registre d’exposition à l’amiante sur 10 ans. Comment cela impacte-t-il la reconnaissance d’une maladie professionnelle et l’accès au SPP ?",
  "dossier3-synthese": "Proposez un plan d’actions correctives type en 4 points suite à un audit SST défaillant (ex: fiches manquantes, registres incomplets, non-respect du SPP).",
  "dossier4-incident1": "Suite à un accident collectif (3 intoxications), décrivez la procédure d’alerte immédiate : qui doit être informé, dans quels délais, et selon quels textes algériens ?",
  "dossier4-incident2": "La presse locale apprend un accident du travail. Comment gérer la communication sans violer le secret médical ? Quels messages peuvent être partagés légalement ?",
  "dossier4-incident3": "Après une crise (ex: accident collectif), quel suivi psychologique et médical est recommandé pour les victimes ? Quel format de Retour d’Expérience (REX) est exigé par la réglementation algérienne ?"
};

// === 4. askAI — version mobile-friendly (3 stratégies) ===
async function askAI(promptKey) {
  const prompt = PROMPTS[promptKey];
  if (!prompt) return alert("⚠️ Prompt non défini");

  const button = document.querySelector(`[data-prompt-key="${promptKey}"]`);
  const originalText = button?.innerHTML || "✨ Interroger LegiMedTrav-AI";

  // 🌐 Ouvrir LegiMedTrav en arrière-plan (déjà chargé quand on colle)
  const GEM_URL = "https://gemini.google.com/gem/1Nbqoj71k-LItw5pnm2xyH_QcxvBjZ5zr";
  const gemTab = window.open(GEM_URL, '_blank');

  // ⏳ Donner 1s au Gem de charger (meilleure UX mobile)
  setTimeout(async () => {
    // 📋 Stratégie 1 : API moderne (Chrome/Safari récents)
    try {
      await navigator.clipboard.writeText(prompt);
      showFeedback(button, "✅ Copié ! Appuyez 2× dans le chat → 'Coller'");
      return;
    } catch (err) {
      console.warn("Copie API échouée", err);
    }

    // 🔄 Stratégie 2 : execCommand (legacy, mais large support)
    const textarea = document.createElement('textarea');
    textarea.value = prompt;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (success) {
        showFeedback(button, "✅ Copié ! Tapez 2× → 'Coller'");
        return;
      }
    } catch (e) {
      document.body.removeChild(textarea);
    }

    // ❗ Stratégie 3 : Modale de secours (100 % fonctionnelle)
    showMobileFallback(prompt);
  }, 1000);
}

// === Feedback court (2.5s) ===
function showFeedback(button, msg) {
  if (!button) return;
  const original = button.innerHTML;
  button.innerHTML = msg;
  button.style.background = "linear-gradient(135deg, #4CAF50, #66BB6A)";
  setTimeout(() => {
    button.innerHTML = original;
    button.style.background = "";
  }, 2500);
}

// === Fallback mobile : boîte modale simple ===
function showMobileFallback(prompt) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.7); z-index: 10000;
    display: flex; align-items: center; justify-content: center;
    padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: #1a1a25; color: #e0e0ff; border-radius: 12px;
    width: 100%; max-width: 90vw; max-height: 80vh;
    overflow: hidden; display: flex; flex-direction: column;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  `;

  const header = document.createElement('div');
  header.innerHTML = "📋 Copiez la question ci-dessous";
  header.style.cssText = "background: #ff6600; padding: 14px 16px; font-weight: bold; font-size: 1.1rem;";

  const content = document.createElement('div');
  content.style.cssText = "flex: 1; overflow: auto; padding: 14px; font-size: 0.95rem; white-space: pre-wrap; line-height: 1.5;";
  content.textContent = prompt;

  const footer = document.createElement('div');
  footer.style.cssText = "display: flex; gap: 8px; padding: 12px; background: #252535;";

  const copyBtn = document.createElement('button');
  copyBtn.textContent = "Copier";
  copyBtn.style.cssText = "flex: 1; padding: 10px; background: #4a90e2; color: white; border: none; border-radius: 8px; font-weight: bold;";
  copyBtn.onclick = () => {
    navigator.clipboard?.writeText(prompt).then(() => {
      copyBtn.textContent = "✅ OK ! Collez dans LegiMedTrav";
      setTimeout(() => overlay.remove(), 2000);
    }).catch(() => {
      alert("⚠️ Sélectionnez tout le texte → Copier");
    });
  };

  const closeBtn = document.createElement('button');
  closeBtn.textContent = "Annuler";
  closeBtn.style.cssText = "flex: 1; padding: 10px; background: #666; color: white; border: none; border-radius: 8px;";
  closeBtn.onclick = () => overlay.remove();

  footer.append(copyBtn, closeBtn);
  box.append(header, content, footer);
  overlay.append(box);
  document.body.append(overlay);

  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
}

// === 5. ÉCOUTE DES BOUTONS ===
document.querySelectorAll('.ai-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const key = button.getAttribute('data-prompt-key');
    if (key) {
      askAI(key);
    } else {
      console.warn("Bouton sans data-prompt-key", button);
    }
  });
});

// === 6. GÉNÉRATION DU QR CODE (Débriefing) ===
function generateQRCode() {
  const qrContainer = document.getElementById('qrcode');
  if (!qrContainer) return;

  const BASE_URL = "https://gemini.google.com/gem/1Nbqoj71k-LItw5pnm2xyH_QcxvBjZ5zr";
  qrContainer.innerHTML = '';

  try {
    new QRCode(qrContainer, {
      text: BASE_URL,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.L
    });
  } catch (err) {
    console.error("Erreur QR :", err);
    qrContainer.innerHTML = "<p style='color:#ff6600; text-align:center'>⚠️ QR non généré</p>";
  }
}

// === 7. INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('debriefing').classList.contains('active')) {
    generateQRCode();
  }
});