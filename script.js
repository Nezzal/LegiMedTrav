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

// === 3. PROMPTS PRÉDÉFINIS ===
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

  "dossier2-phase1": `Contexte :
- Population : 50 employés du service administratif
- Activité principale : Travail de bureau
- Risques identifiés : Travail sur écran, stress professionnel, sédentarité
- Localisation : Nouvelle Usine de Précision Algérienne (300 employés total)

1- Cadre légal de la surveillance médicale :
Identifiez et citez précisément le cadre législatif et réglementaire algérien applicable à la surveillance médicale de cette population de travailleurs administratifs.
→ EXIGENCE : Fournissez les références complètes (numéro de loi/décret, date de promulgation, articles pertinents).

2- Modalités pratiques de surveillance :
Sur la base des textes identifiés en Partie 1, précisez :
 - La fréquence légale des examens médicaux (périodicité obligatoire)
 - La nature des visites médicales requises (visite d'embauche, périodique, de reprise, etc.)
 - Le contenu minimal de chaque type de visite
→ Exigence: Pour chaque modalité, citez l'article précis du texte source.

3- Textes de référence détaillés :
Listez de manière exhaustive tous les textes législatifs et réglementaires applicables, dans le format suivant :
- Loi n°XX-XX du [date], Article(s) [numéro(s)] : [objet]
- Décret n°XX-XX du [date], Article(s) [numéro(s)] : [objet]
- Arrêté du [date], Article(s) [numéro(s)] : [objet] (si applicable)
→ Exigence: Hiérarchiser les textes (loi > décret > arrêté).

4- Axes de prévention spécifiques :
Sur la base de la littérature scientifique et des bonnes pratiques en santé au travail, proposez :
1. Des mesures de prévention primaire pour les risques liés au travail sur écran
2. Des mesures de prévention du stress professionnel
3. Des actions contre la sédentarité au poste de travail
→ EXIGENCE : Si ces axes sont mentionnés dans des circulaires ou recommandations officielles algériennes, citez-les. Sinon, précisez "Recommandations basées sur la littérature scientifique internationale".`,

  "dossier2-phase2": `Contexte :
- Population : Travailleurs des ateliers de production
- Postes concernés :
  * Soudeurs (exposition aux fumées métalliques)
  * Opérateurs sur machines-outils (exposition au bruit, vibrations)
  * Chimistes manipulant des solvants (exposition au benzène et autres produits chimiques)
- Localisation : Ateliers de la Nouvelle Usine de Précision Algérienne

Demande structurée en 4 parties :

PARTIE A - Type de surveillance médicale applicable :
1. Confirmez si ces postes relèvent d'une surveillance médicale "renforcée" ou "spéciale" selon la terminologie de la législation algérienne.
2. Définissez les critères légaux qui déterminent ce classement.
→ EXIGENCE : Citez précisément les textes législatifs ou réglementaires algériens qui établissent cette classification (Loi, Décret, avec numéro, date et articles concernés).

PARTIE B - Inventaire exhaustif des textes applicables :
Pour chacune des trois catégories de travailleurs, listez :

B.1 - SOUDEURS (exposition aux fumées métalliques) :
- Textes généraux sur la surveillance médicale renforcée
- Textes spécifiques aux fumées de soudage (si existants)
→ EXIGENCE : Format : Loi/Décret n°XX-XX du [date], Article(s) [numéro(s)]

B.2 - OPÉRATEURS EXPOSÉS AU BRUIT :
- Textes sur la surveillance médicale liée au bruit
- Seuils d'exposition déclenchant la surveillance renforcée
- Examens audiométriques obligatoires
→ EXIGENCE : Format : Loi/Décret n°XX-XX du [date], Article(s) [numéro(s)]

B.3 - CHIMISTES EXPOSÉS AU BENZÈNE :
- Textes sur la surveillance des travailleurs exposés aux CMR (Cancérogènes, Mutagènes, Reprotoxiques)
- Dispositions spécifiques au benzène
- Registres et traçabilité des expositions
→ EXIGENCE : Format : Loi/Décret n°XX-XX du [date], Article(s) [numéro(s)]

PARTIE C - Protocole détaillé : Opérateur exposé au bruit :

Élaborez un protocole de surveillance médicale complet selon le format suivant :

C.1 - Base légale :
Citez le(s) texte(s) imposant ce protocole (numéro, date, articles précis).

C.2 - Évaluation de l'exposition :
- Seuils d'exposition légaux en dB(A) et durée
- Obligation de métrologie

C.3 - Examens médicaux obligatoires :
- Visite d'embauche : contenu minimal
- Visites périodiques : fréquence et contenu
- Examens complémentaires spécifiques : audiométrie (fréquence, protocole)

C.4 - Traçabilité et conservation :
- Durée de conservation du dossier médical
- Informations à consigner obligatoirement

C.5 - Aptitude et restrictions :
- Critères d'inaptitude selon le texte légal
- Possibilités d'aménagement de poste

→ EXIGENCE : Chaque élément doit être accompagné de sa référence légale précise.

PARTIE D - Protocole détaillé : Chimiste exposé au benzène :

Élaborez un protocole de surveillance médicale complet selon le format suivant :

D.1 - Base légale :
Citez le(s) texte(s) imposant ce protocole pour les agents CMR (numéro, date, articles précis).

D.2 - Évaluation de l'exposition :
- VLEP (Valeurs Limites d'Exposition Professionnelle) du benzène en Algérie
- Obligation de prélèvements atmosphériques
- Surveillance biologique de l'exposition (biomarqueurs)

D.3 - Examens médicaux obligatoires :
- Visite d'embauche : contenu minimal (examen clinique + examens complémentaires)
- Visites périodiques : fréquence renforcée et contenu
- Examens biologiques spécifiques : NFS, bilan hépatique, métabolites urinaires du benzène
- Surveillance post-exposition

D.4 - Traçabilité et conservation :
- Durée de conservation du dossier médical (CMR = conservation prolongée)
- Attestation d'exposition à remettre au travailleur
- Transmission à l'organisme de sécurité sociale

D.5 - Mesures de prévention primaire :
- Obligation de substitution (si possible)
- Mesures de protection collective
- EPI (Équipements de Protection Individuelle) obligatoires

D.6 - Aptitude et restrictions :
- Situations d'inaptitude absolue (ex : grossesse)
- Contre-indications médicales

→ EXIGENCE : Chaque élément doit être accompagné de sa référence légale précise. Si certains éléments relèvent de bonnes pratiques internationales non codifiées en Algérie, précisez-le explicitement (ex : "Recommandation OMS, non inscrite dans le droit algérien à ce jour").`,

  "dossier2-phase3": `Contexte du cas clinique :
- Patient : M. Z., travailleur sur le point de partir à la retraite
- Exposition professionnelle : Amiante (dans une ancienne section de l'usine)
- Période d'exposition : Il y a 20 ans
- Problématique : Quelle est la responsabilité de l'employeur et du médecin du travail envers ce retraité ? Quel cadre légal pour le suivi des maladies à longue latence ?

Demande structurée en 5 parties :

PARTIE A - Existence et définition légale du SPP en Algérie :

1. Le dispositif de Suivi Post-Professionnel (SPP) existe-t-il formellement dans la législation algérienne du travail ?
2. Si OUI : Fournissez la définition légale exacte du SPP avec la référence précise (Loi/Décret n°XX-XX du [date], Article [numéro]).
3. Si NON : Précisez explicitement : "Le dispositif de Suivi Post-Professionnel n'est pas codifié dans la législation algérienne actuelle" et indiquez à quelle date remonte votre dernière vérification législative.

→ EXIGENCE : Rigueur absolue. Ne pas inventer de textes inexistants. Si le SPP n'existe pas formellement, le dire clairement.

PARTIE B - Agents ou nuisances concernés par le SPP :

Si le SPP existe légalement en Algérie :
1. Listez les agents chimiques, physiques ou biologiques pour lesquels un SPP est obligatoire.
2. L'amiante fait-il partie de cette liste ?
3. Citez le texte précis qui établit cette liste (Loi/Décret/Arrêté n°XX-XX du [date], Article ou Annexe [numéro]).

Si le SPP n'existe pas formellement :
1. Précisez : "En l'absence de cadre SPP spécifique, aucune liste d'agents n'est établie par la loi algérienne."
2. Indiquez si des recommandations existent (circulaires, guides du Ministère de la Santé ou du Travail).

→ EXIGENCE : Références textuelles obligatoires. Si information non vérifiable, précisez : "Information non confirmée dans les textes consultés".

PARTIE C - Modalités pratiques du SPP (si existant) :

Si le SPP existe dans la législation algérienne, détaillez :

C.1 - Conditions d'éligibilité :
- Durée minimale d'exposition requise
- Autres critères d'inclusion
→ Référence légale : [Texte, article]

C.2 - Organisme responsable du suivi :
- Qui organise le SPP ? (médecin du travail, CPMC, autre organisme)
- Financement du dispositif
→ Référence légale : [Texte, article]

C.3 - Examens médicaux à réaliser :
- Nature et fréquence des examens pour un travailleur exposé à l'amiante
- Examens d'imagerie (radiographie thoracique, scanner, fréquence)
- Examens fonctionnels (EFR - Explorations Fonctionnelles Respiratoires)
→ Référence légale : [Texte, article] ou [Protocole officiel]

C.4 - Attestation d'exposition :
- Obligation pour l'employeur de délivrer une attestation d'exposition
- Contenu de l'attestation
- Délai de remise au travailleur
→ Référence légale : [Texte, article]

C.5 - Traçabilité et conservation :
- Durée de conservation du dossier médical d'un travailleur exposé à l'amiante
- Transmission du dossier en cas de départ à la retraite
→ Référence légale : [Texte, article]

Si le SPP n'existe pas formellement en Algérie :
Précisez : "Ces modalités ne sont pas définies par la loi algérienne. Pour comparaison, voici les modalités appliquées dans des pays de référence [France, Union Européenne], qui pourraient servir de modèle :
- [Résumé des modalités françaises avec références au Code du travail français]
- [Indication explicite qu'il s'agit d'un système étranger, non applicable en Algérie]"

→ EXIGENCE : Transparence totale sur l'existence ou l'absence de textes algériens.

PARTIE D - Responsabilités légales de l'employeur et du médecin du travail :

D.1 - Responsabilité de l'employeur :
- Obligation d'information du travailleur sur les risques liés à l'amiante
- Obligation de traçabilité des expositions
- Responsabilité civile et pénale en cas de pathologie imputable à l'amiante
→ EXIGENCE : Citez les textes algériens précis (Code du travail, Code pénal si applicable, Loi sur la réparation des maladies professionnelles).

D.2 - Responsabilité du médecin du travail :
- Obligation de constituer et conserver le dossier médical
- Obligation d'information du travailleur sur son exposition
- Transmission du dossier au moment du départ à la retraite (si prévue)
→ EXIGENCE : Citez les textes algériens précis (Décrets régissant la médecine du travail, Code de déontologie médicale si applicable).

D.3 - Réparation des maladies professionnelles :
- Maladies liées à l'amiante reconnues dans les tableaux de maladies professionnelles en Algérie
- Délai de prise en charge après cessation d'exposition
- Organisme compétent (CNAS, autre)
→ EXIGENCE : Références aux tableaux de maladies professionnelles algériens (numéros des tableaux, dates, maladies listées).

PARTIE E - Identification des lacunes et recommandations :

E.1 - Analyse critique du cadre légal algérien :
Sur la base de votre analyse des Parties A à D :
1. Identifiez clairement les lacunes du dispositif algérien concernant le SPP.
2. Comparez avec les standards internationaux (OMS, BIT, Union Européenne).
3. Listez les éléments manquants dans la législation algérienne.

E.2 - Recommandations pour le cas de M. Z. :
En l'absence de cadre SPP formel (si c'est le cas) :
1. Que peut faire le médecin du travail pour organiser un suivi de M. Z. à titre de bonne pratique ?
2. Quelles ressources mobiliser (système de santé publique, consultations spécialisées en pneumologie) ?
3. Quels documents remettre à M. Z. pour assurer la continuité du suivi ?

→ EXIGENCE : Précisez explicitement si ces recommandations relèvent de bonnes pratiques médicales ou d'obligations légales.`,

  "dossier3-phase1": `1 - Contexte légal de l'audit
Identifiez et citez les articles précis de la législation algérienne qui donnent pouvoir à l'Inspecteur du Travail de procéder à un audit réglementaire d'un service de santé au travail interentreprises. Pour chaque disposition légale citée, fournissez : (1) la référence complète du texte (Loi, Décret, Arrêté avec date), (2) le numéro d'article exact, (3) le verbatim de l'article pertinent. Citez au minimum la Loi n° 88-07 du 26 janvier 1988 et le Décret exécutif n° 93-120 du 15 mai 1993.

2 - Documents obligatoires du médecin du travail
Selon l'Arrêté interministériel du 16 octobre 2001 fixant le contenu, les modalités d'établissement et de tenue des documents obligatoirement établis par le médecin du travail, listez exhaustivement les 7 documents et registres obligatoires mentionnés à l'Article 2. Pour chaque document, précisez : (1) le point exact de l'Article 2 qui le mentionne, (2) le numéro de l'Annexe correspondante dans cet arrêté, (3) la durée légale de conservation prévue. Structurez votre réponse sous forme de tableau avec références précises.`,

  "dossier3-piece1": `1 - Contenu obligatoire de la Fiche de Visite
Selon l'Article 6 de l'Arrêté interministériel du 16 octobre 2001 et son Annexe 2, identifiez toutes les mentions obligatoires qui doivent figurer sur la Fiche de Visite Médicale Individuelle destinée à l'employeur. Citez le verbatim complet de l'Article 6. Précisez quelles informations sont strictement obligatoires pour que la fiche soit juridiquement valide. Indiquez également les situations où cette fiche doit être établie ou renouvelée selon ce même article.

2 - Conséquences de l'absence de conclusion d'aptitude
En référence à l'Article 6 de l'Arrêté interministériel du 16 octobre 2001 qui impose une 'conclusion d'aptitude' sur la Fiche de Visite Médicale, analysez les conséquences juridiques de l'absence de cette conclusion pour : (1) l'employeur au regard de ses obligations légales, (2) le médecin du travail au regard du Décret exécutif n° 93-120 du 15 mai 1993 et du Code de déontologie médicale (Décret exécutif n° 92-278 du 6 juillet 1992). Citez les articles spécifiques de ces textes qui engagent la responsabilité de chaque partie.

3- Distinction Fiche de Visite vs Dossier Médical
Selon l'Arrêté interministériel du 16 octobre 2001, expliquez la distinction juridique entre : (1) la Fiche de Visite Médicale Individuelle (Annexe 2 - Article 6) et (2) le Dossier Médical Individuel (Annexe 1). Pour chaque document, précisez : (a) sa nature juridique (administrative ou confidentielle), (b) son destinataire légal (qui peut y accéder), (c) le lieu et les modalités de conservation imposés par l'article concerné, (d) les autorités habilitées à le consulter lors d'un audit. Citez le verbatim des articles pertinents concernant la confidentialité et le secret professionnel.`,

  "dossier3-piece2": `1- Mentions obligatoires du Registre de Vaccinations
Selon l'Article 2 (point 5) de l'Arrêté interministériel du 16 octobre 2001 et son Annexe 5, ainsi que l'Instruction n°61 du 25 janvier 2000 relative à la vaccination en milieu de travail, listez exhaustivement toutes les mentions obligatoires qui doivent figurer dans le Registre de Vaccinations pour chaque acte vaccinal. Citez le verbatim complet de l'Article 2 point 5. Précisez spécifiquement l'obligation concernant le numéro de lot vaccinal et sa justification en termes de traçabilité sanitaire.

2- Durée de conservation du Registre
Selon l'Article 2 point 5 de l'Arrêté interministériel du 16 octobre 2001, quelle est la durée légale de conservation du Registre de Vaccinations ? Citez le verbatim exact de l'article concernant cette durée. Précisez à partir de quelle date commence le décompte de cette durée (date de première inscription, date de clôture du registre, autre). Indiquez également les sanctions ou conséquences du non-respect de cette durée de conservation.

3- Obligations de traçabilité vaccinale pour le travailleur
Selon l'Instruction n°61 du 25 janvier 2000 relative à la vaccination en milieu de travail, quelles sont les obligations du médecin du travail concernant la remise d'un document de traçabilité vaccinale au travailleur vacciné ? Citez les dispositions précises de cette instruction qui imposent la remise d'une carte de vaccination. Précisez quelles informations doivent obligatoirement figurer sur cette carte (notamment concernant le numéro de lot vaccinal). Indiquez les conséquences du non-respect de cette obligation.`,

  "dossier3-piece3": `1 - Registre spécifique aux postes exposés
Selon l'Article 2 (point 4) de l'Arrêté interministériel du 16 octobre 2001, le médecin du travail doit-il tenir un registre spécifique concernant les postes de travail exposés à des risques particuliers ? Citez le verbatim exact de l'Article 2 point 4. Précisez : (1) quels types de risques sont concernés, (2) quelles informations doivent y figurer, (3) la durée de conservation de ce registre, (4) l'annexe de l'arrêté qui définit le modèle de ce registre.

2- Obligations spécifiques pour l'exposition à l'amiante
Selon l'Arrêté interministériel du 1er octobre 2003 relatif à la protection des travailleurs contre les risques liés à l'inhalation de poussières d'amiante, listez exhaustivement toutes les obligations documentaires du médecin du travail. Citez spécifiquement : (1) l'Article 16 concernant la liste des travailleurs exposés et son contenu obligatoire, (2) l'Article 19 concernant la durée de conservation du dossier médical, (3) l'Article 20 concernant l'attestation d'exposition à remettre au travailleur. Pour chaque article, fournissez le verbatim complet et précisez les informations exactes qui doivent être documentées (niveaux d'exposition, durée d'exposition, etc.).

3- Reconnaissance du mésothéliome en maladie professionnelle
Selon l'Arrêté interministériel du 5 mai 1996 fixant la liste des maladies présumées d'origine professionnelle, le mésothéliome pleural est-il inscrit dans un tableau de maladie professionnelle ? Si oui, précisez : (1) le numéro exact du tableau concerné, (2) l'intitulé complet de ce tableau, (3) la désignation précise des maladies listées dans ce tableau (citez le verbatim), (4) le délai de prise en charge (DPC) applicable pour le mésothéliome pleural, (5) les conditions d'exposition professionnelle requises pour la reconnaissance.

4- Conséquences du défaut de traçabilité Amiante
En cas de défaut de traçabilité de l'exposition à l'amiante (absence de liste des travailleurs exposés selon l'Article 16 de l'Arrêté du 1er octobre 2003, non-conservation du dossier médical 30 ans selon l'Article 19, absence d'attestation d'exposition selon l'Article 20), analysez les conséquences juridiques et déontologiques pour le médecin du travail. Citez les articles applicables dans : (1) le Décret exécutif n° 93-120 du 15 mai 1993 relatif à l'organisation de la médecine du travail, (2) le Décret exécutif n° 92-278 du 6 juillet 1992 portant code de déontologie médicale. Précisez également les conséquences pour le travailleur dans sa démarche de reconnaissance en maladie professionnelle (Tableau N° 30).`,

  "dossier3-synthese": `1- Hiérarchisation des non-conformités
Sur la base de la législation algérienne en médecine du travail (Loi 88-07, Décret 93-120, Arrêté du 16 octobre 2001, Arrêté du 1er octobre 2003), proposez une méthodologie de hiérarchisation des non-conformités réglementaires en catégories (Critique, Majeure, Mineure). Pour chaque catégorie, définissez les critères objectifs basés sur : (1) l'impact sur la sécurité juridique, (2) l'impact sur la santé des travailleurs, (3) le niveau d'obligation imposé par le texte (obligation de résultat vs obligation de moyen). Citez les articles législatifs qui justifient la qualification de 'critique' pour une non-conformité.

2- Délais réglementaires de mise en conformité
Selon la Loi n° 88-07 du 26 janvier 1988 relative à l'hygiène, la sécurité et la médecine du travail, et le Décret exécutif n° 93-120 du 15 mai 1993, existe-t-il des délais réglementaires imposés pour la mise en conformité suite à un constat de non-conformité par l'Inspecteur du Travail ? Citez les articles pertinents concernant : (1) les pouvoirs de mise en demeure de l'Inspecteur, (2) les délais impartis pour régularisation, (3) les procédures de contrôle de la mise en œuvre des actions correctives. Précisez les sanctions prévues en cas de non-respect des délais de mise en conformité.

3- Obligations de formation continue des médecins du travail
Selon le Décret exécutif n° 93-120 du 15 mai 1993 relatif à l'organisation de la médecine du travail et le Décret exécutif n° 92-278 du 6 juillet 1992 portant code de déontologie médicale, existe-t-il une obligation de formation continue pour les médecins du travail, notamment concernant l'évolution de la réglementation ? Citez les articles spécifiques qui imposent : (1) une obligation de mise à jour des connaissances réglementaires, (2) les modalités de cette formation continue, (3) les conséquences du défaut de formation sur la responsabilité professionnelle du médecin. Précisez qui (autorité, organisme) est responsable de l'organisation de cette formation continue.`,

  "dossier4-incident1": `INCIDENT N°1 - ALERTE INTERNE 

1 - Service d'Hygiène et Sécurité (SHS)
Contexte : Odeur chimique suspecte, vertiges.
→ Quel est le rôle exact du SHS selon la réglementation algérienne ?
Veuillez fournir :
- Les missions légales spécifiques du SHS
- La référence législative COMPLÈTE :
   • Titre exact, numéro, date (ex : Décret exécutif n° XX-XX du JJ Mois AAAA)
   • JO (numéro + date + page)
   • Articles applicables
- Les actions concrètes immédiates attendues
- Une directive opérationnelle claire que le médecin du travail peut transmettre au SHS

2 - Commission d'Hygiène et de Sécurité (CHS)
→ Quel est le rôle de la CHS dans cette alerte ?
Veuillez fournir :
- Missions légales de la CHS
- Référence législative COMPLÈTE (texte, numéro, date, JO, articles)
- Modalités de convocation d'urgence
- Prérogatives dans l’évaluation du risque et recommandation de mesures conservatoires
- Composition légale et caractère paritaire
- Une directive opérationnelle pour la CHS

FORMAT EXIGÉ :
→ Chaque affirmation doit être suivie de : [Référence : Texte, Article, JO]
→ Exemple : "[Référence : Décret exécutif n° 93-120 du 15 mai 1993, Article 42, JO n°21 du 27 mai 1993, p. 987]"`,

"dossier4-incident2": `INCIDENT N°2 - ESCALADE EXTERNE 

1 - Procédure de Notification à la CNAS
→ Intoxication aiguë hospitalisée : procédure exacte de déclaration à la CNAS ?
Veuillez fournir :
- Base législative COMPLÈTE (Loi n°XX-XX, date, JO, articles)
- Objectif de la notification (réparation, indemnisation…)
- Informations obligatoires : identité, certificat médical, lien professionnel
- Délai légal de déclaration
- Conséquences juridiques pour le travailleur, l’employeur, le médecin
- Un modèle de notification conforme à la réglementation algérienne

2 - Procédure de Signalement à l'Inspection du Travail
→ Signalement obligatoire ? Procédure ?
Veuillez fournir :
- Base législative (Loi 88-07, Décret… avec références JO complètes)
- Objectif (prévention collective vs réparation individuelle)
- Informations à transmettre : danger, circonstances, mesures prises, risque de récidive
- Différence fondamentale CNAS ↔ Inspection du Travail
- Suites possibles (enquête, sanctions…)
- Un modèle de signalement conforme

FORMAT EXIGÉ :
→ Chaque élément doit être référencé : [Texte, Article, JO]
→ Modèles exploitables directement en entreprise algérienne`,

"dossier4-incident3": `INCIDENT N°3 - GESTION APRÈS-CRISE 

Question : Quel est le rôle spécifique du médecin du travail en matière de FORMATION et d'INFORMATION des travailleurs sur les risques professionnels ?

Veuillez fournir :

1. Base législative PRINCIPALE :
   - Loi n° 88-07 du 26 janvier 1988 (JO n°5 du 03 février 1988, p. 152)
   - Articles PRÉCIS définissant ce rôle

2. Textes COMPLÉMENTAIRES :
   - Décret exécutif n° 93-120 du 15 mai 1993 (JO n°21 du 27 mai 1993)
   - Autres décrets pertinents (formation, tiers-temps…)
   - Avec références JO complètes

3. Missions SPÉCIFIQUES :
   - Participation à l’élaboration des programmes de formation
   - Animation d’actions sur les risques
   - Éducation sanitaire
   - Collaboration avec les autres acteurs

4. Cadre d’intervention :
   - Tiers-temps d’action en milieu
   - Collaboration avec l’employeur et le SHS

5. Exemple CONCRET de note de service co-signée (médecin + direction) pour une campagne de formation sur les risques chimiques, incluant :
   - Rappel réglementaire
   - Objectifs
   - Modalités (animateur, durée, contenu)
   - Caractère obligatoire/recommandé
→ Doit être conforme et directement utilisable en entreprise algérienne.

FORMAT EXIGÉ :
→ Références précises obligatoires : [Loi 88-07, Art. XX, JO n°X, p. XXX]
→ Exemple rédigé comme un document officiel.`
};

// === 4. askAI — version mobile-friendly (3 stratégies) ===
async function askAI(promptKey) {
  const prompt = PROMPTS[promptKey];
  if (!prompt) return alert("⚠️ Prompt non défini");

  const button = document.querySelector(`[data-prompt-key="${promptKey}"]`);
  const originalText = button?.innerHTML || "✨ Interroger LegiMedTrav-AI";

  // 🌐 Ouvrir LegiMedTrav en arrière-plan
  const GEM_URL = "https://gemini.google.com/gem/1Nbqoj71k-LItw5pnm2xyH_QcxvBjZ5zr";
  const gemTab = window.open(GEM_URL, '_blank');

  setTimeout(async () => {
    // 📋 Stratégie 1 : API moderne
    try {
      await navigator.clipboard.writeText(prompt);
      showFeedback(button, "✅ Copié ! Appuyez 2× dans le chat → 'Coller'");
      return;
    } catch (err) {
      console.warn("Copie API échouée", err);
    }

    // 🔄 Stratégie 2 : execCommand
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

    // ❗ Stratégie 3 : Modale de secours
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

  // 🔐 URL de ton site GitHub Pages
  const BASE_URL = "https://nezzal.github.io/LegiMedTrav/";

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
    qrContainer.innerHTML = `
      <div style="text-align: center; padding: 12px; background: #333; border-radius: 6px;">
        <span style="color: #ff6600;">⚠️ QR non généré</span><br>
        <small style="color: #aaa;">Vérifiez que vous êtes connecté à internet.</small>
      </div>
    `;
  }
}
// === 7. INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('debriefing').classList.contains('active')) {
    generateQRCode();
  }
});