/* La base des tests de positionnement à l'arrivée.
   Ce fichier ne contient AUCUN test recopié : il dit quel test existe, dans quelle
   langue, à quel niveau, et où il se trouve. Les PDF restent ceux des éditeurs
   (Réseau Canopé / CASNAV) ou ceux que l'enseignante dépose dans l'application.
   window.TESTS */
(function () {

  /* ---- Les langues traduites par Canopé (24 langues + français + dari).
     Les archives sont celles mises en ligne par le CASNAV de Lille.
     `cle` sert à reconnaître ce qui est écrit sur la fiche EANA. ---- */
  const BASE_LILLE = 'https://casnav.site.ac-lille.fr/wp-content/uploads/sites/36/2021/12/';
  const L = (nom, fichier, alias) => ({ nom, cles: [nom.toLowerCase()].concat(alias || []), zip: BASE_LILLE + fichier + '.zip' });

  const LANGUES = [
    L('Français', 'Francais', ['francais']),
    L('Albanais', 'Albanais'),
    L('Allemand', 'Allemand'),
    L('Anglais', 'Anglais'),
    L('Arabe', 'Arabe', ['arabe littéraire', 'arabe litteraire']),
    L('Arménien', 'Armenien', ['armenien']),
    L('Bulgare', 'Bulgare'),
    L('Chinois', 'Chinois', ['mandarin', 'chinois simplifié']),
    L('Dari', 'Dari', ['persan', 'farsi']),
    L('Espagnol', 'Espagnol'),
    L('Géorgien', 'Georgien', ['georgien']),
    L('Italien', 'Italien'),
    L('Macédonien', 'Macedonien', ['macedonien']),
    L('Monténégrin', 'Montenegrin', ['montenegrin']),
    L('Pachto', 'Pachto', ['pashto']),
    L('Polonais', 'Polonais'),
    L('Portugais', 'Portugais'),
    L('Roumain', 'Roumain'),
    L('Russe', 'Russe'),
    L('Serbe (cyrillique)', 'Serbe-alphabet-cyrillique', ['serbe']),
    L('Serbe (latin)', 'Serbe-alphabet-latin'),
    L('Tamoul', 'Tamoul'),
    L('Tchétchène', 'Tchechene', ['tchetchene']),
    L('Thaï', 'Thai', ['thai']),
    L('Turc', 'Turc'),
    L('Ukrainien', 'Ukrainien')
  ];

  /* La page d'où viennent ces PDF : le protocole de passation et l'évaluation non
     verbale (pour les élèves en grande difficulté) y sont aussi. */
  const PAGE_CORSE_MATHS = 'https://www.ac-corse.fr/casnav-espace-eana-les-tests-canope-mathematiques-122546';
  const PROTOCOLE_MATHS = 'https://www.ac-corse.fr/media/16811/download';
  const NON_VERBAL_MATHS = 'https://www.ac-corse.fr/media/16814/download';

  /* Les PDF rangés dans le dossier tests/ du site : un clic sur l'imprimante les ouvre,
     sans repasser par Canopé. Ce sont les fichiers d'origine, inchangés. */
  const PDFS = {
    /* Livret cycle 2, version française (reçu le 05/09) : les trois paliers dans le même
       document, comme au cycle 3 — fin de CP (ex. 1 à 5), fin de CE1 (6 à 10), fin de CE2
       (11 à 15). C'est le MÊME Sami que le cycle 3, un cran plus tôt : son premier jour
       d'école. */
    'canope-lecture-cp': { versions: { Arabe: 'tests/canope-ecrit-c2-arabe.pdf' }, sujet: 'tests/canope-ecrit-c2-francais.pdf', langue: 'français',
      corrige: 'tests/canope-ecrit-c2-corrige-francais.pdf',
      note: 'livret cycle 2 : les trois paliers dans le même document' },
    'canope-lecture-ce1': { versions: { Arabe: 'tests/canope-ecrit-c2-arabe.pdf' }, sujet: 'tests/canope-ecrit-c2-francais.pdf', langue: 'français',
      corrige: 'tests/canope-ecrit-c2-corrige-francais.pdf',
      note: 'livret cycle 2 : les trois paliers dans le même document' },
    'canope-lecture-ce2': { versions: { Arabe: 'tests/canope-ecrit-c2-arabe.pdf' }, sujet: 'tests/canope-ecrit-c2-francais.pdf', langue: 'français',
      corrige: 'tests/canope-ecrit-c2-corrige-francais.pdf',
      note: 'livret cycle 2 : les trois paliers dans le même document' },
    'canope-lecture-cm1': { versions: { Arabe: 'tests/canope-ecrit-c3-arabe.pdf' }, sujet: 'tests/canope-ecrit-c3-anglais.pdf', langue: 'anglais',
      corrige: 'tests/canope-ecrit-c3-corrige-francais.pdf',
      note: 'livret cycle 3 : les trois paliers dans le même document' },
    'canope-lecture-cm2': { versions: { Arabe: 'tests/canope-ecrit-c3-arabe.pdf' }, sujet: 'tests/canope-ecrit-c3-anglais.pdf', langue: 'anglais',
      corrige: 'tests/canope-ecrit-c3-corrige-francais.pdf',
      note: 'livret cycle 3 : les trois paliers dans le même document' },
    'canope-lecture-6e': { versions: { Arabe: 'tests/canope-ecrit-c3-arabe.pdf' }, sujet: 'tests/canope-ecrit-c3-anglais.pdf', langue: 'anglais',
      corrige: 'tests/canope-ecrit-c3-corrige-francais.pdf',
      note: 'livret cycle 3 : les trois paliers dans le même document' },
    'canope-lecture-5e': { versions: { Arabe: 'tests/canope-ecrit-c4-5e-arabe.pdf' }, corrige: 'tests/canope-ecrit-c4-5e-corrige-buck.pdf',
      note: 'le corrigé de Buck seulement — le sujet reste à déposer' },
    /* Corrigés de français des deux paliers hauts du cycle 4, reçus le 05/09 ; leurs
       sujets sont arrivés le même jour. Contrairement aux cycles 2 et 3, chaque palier
       du cycle 4 est un document à part — texte différent à chaque niveau. */
    'canope-lecture-4e': { versions: { Arabe: 'tests/canope-ecrit-c4-4e-arabe.pdf' }, sujet: 'tests/canope-ecrit-c4-4e-sujet.pdf', langue: 'français',
      corrige: 'tests/canope-ecrit-c4-4e-corrige.pdf',
      note: "dossier UNICEF sur les droits de l'enfant — trois documents" },
    'canope-lecture-3e': { versions: { Arabe: 'tests/canope-ecrit-c4-3e-arabe.pdf' }, sujet: 'tests/canope-ecrit-c4-3e-sujet.pdf', langue: 'français',
      corrige: 'tests/canope-ecrit-c4-3e-corrige.pdf',
      note: 'texte de Musset, La Confession d\'un enfant du siècle' },
    'creteil-conte-college': { sujet: 'tests/creteil-3-freres-sujet.pdf', langue: 'français',
      corrige: "POSITIONNEMENT - Corrigé Les Trois Frères.dc.html" },
    /* ⚠ Le sujet est SON PDF OFFICIEL (10/09), copié tel quel — il remplace la version
       refaite d'après ses captures, qui s'imprimait mal. Ne pas le régénérer. */
    'creteil-lycee-gary': { sujet: 'tests/creteil-lycee-gary-sujet.pdf',
      langue: 'français',
      corrige: 'POSITIONNEMENT - Corrigé FLSco lycée.dc.html' },
    'decodage-latin': { sujet: 'tests/decodage-alphabet-latin.pdf', langue: 'français' },
    'lyon-maths-16': { sujet: 'tests/lyon-maths-16-sujet.pdf', langue: 'français',
      corrige: 'tests/lyon-maths-16-corrige.pdf' },
    /* Les maths Canopé : les PDF ne sont pas rangés dans le site, ils vivent sur la page
       du CASNAV de Corse (elle m'a donné le lien le 02/09). Le bouton ouvre le fichier
       chez eux — version française ; les 25 autres langues sont sur la même page. */
    'canope-maths-c2': { sujet: 'https://www.ac-corse.fr/media/16904/download', langue: 'français',
      corrige: 'tests/canope-maths-c2-corrige.pdf',
      note: 'fin de cycle 2 · CASNAV de Corse — les 25 autres langues sont sur leur page' },
    'canope-maths-c3': { sujet: 'https://www.ac-corse.fr/media/16985/download', langue: 'français',
      corrige: 'tests/canope-maths-c3-corrige.pdf',
      note: 'fin de cycle 3 · CASNAV de Corse — les 25 autres langues sont sur leur page' },
    /* Fin de 4e : un test intermédiaire du cycle 4 (le « fin de cycle 4 » officiel, lui,
       porte sur la fin de 3e). Elle m'a envoyé le corrigé le 02/09 ; le sujet est à
       prendre sur la page du CASNAV de Corse. */
    'canope-maths-5e': { sujet: 'tests/canope-maths-5e-sujet.pdf', langue: 'français',
      corrige: 'tests/canope-maths-5e-corrige.pdf',
      note: 'fin de 5e · sujet et corrigé rangés dans l\'application (envoyés le 02/09)' },
    'canope-maths-4e': { sujet: 'tests/canope-maths-4e-sujet.pdf', langue: 'français',
      corrige: 'tests/canope-maths-4e-corrige.pdf',
      note: 'fin de 4e · sujet et corrigé rangés dans l\'application (envoyés le 02/09)' },
    'canope-maths-c4': { sujet: 'tests/canope-maths-c4-sujet.pdf', langue: 'français',
      corrige: 'tests/canope-maths-c4-corrige.pdf',
      note: 'fin de 3e · sujet et corrigé rangés dans l\'application (envoyés le 02/09)' }
  };


  const CORRIGES_CANOPE = BASE_LILLE + 'CE-langue-dorigine-corriges-et-grilles.zip';
  /* La page du CASNAV de Lille : c'est de là que viennent les 26 archives et les
     corrigés. Plus pratique que la plateforme Canopé — tout est sur une seule page. */
  const PAGE_LILLE = 'https://casnav.site.ac-lille.fr/tests-en-langue-dorigine/';
  const PLATEFORME_CANOPE = 'https://www.reseau-canope.fr/eana-outils-devaluation-en-langue-dorigine/evaluation-en-langue-dorigine.html';

  /* ---- Les tests connus ----
     Chez Canopé, chaque NIVEAU est un test à part. On commence au niveau de la classe
     d'âge ; si c'est trop dur, on redescend d'un niveau. Ce n'est pas une règle absolue :
     l'enseignante juge sur pièce (Leila, 10 ans : fin de CM2 trop dur, donc fin de CM1). ---- */
  const CANOPE = 'Réseau Canopé / CASNAV Aix-Marseille et Lille';
  const NIVEAUX = [
    { cle: 'cp', nom: 'fin de CP', cycle: 2, age: 6 },
    { cle: 'ce1', nom: 'fin de CE1', cycle: 2, age: 7 },
    { cle: 'ce2', nom: 'fin de CE2', cycle: 2, age: 8 },
    { cle: 'cm1', nom: 'fin de CM1', cycle: 3, age: 9 },
    { cle: 'cm2', nom: 'fin de CM2', cycle: 3, age: 10 },
    { cle: '6e', nom: 'fin de 6e', cycle: 3, age: 11 },
    { cle: '5e', nom: 'fin de 5e', cycle: 4, age: 12 },
    { cle: '4e', nom: 'fin de 4e', cycle: 4, age: 13 },
    { cle: '3e', nom: 'fin de 3e', cycle: 4, age: 14 }
  ];

  const canope = (matiere, n) => ({
    id: 'canope-' + matiere + '-' + n.cle,
    /* Le nom du texte entre parenthèses après le niveau : le palier ordonne la liste et
       part sur la fiche EANA, mais c'est au TEXTE qu'elle reconnaît le test (05/09).
       Les quatre paliers du cycle 4 sont nommés de la même façon que ceux du cycle 3. */
    titre: (matiere === 'lecture' ? "Compréhension de l'écrit" : 'Mathématiques') + ' — ' + n.nom
      + (matiere === 'lecture' ? (({ '5e': ' (Buck)', '4e': ' (UNICEF)', '3e': ' (Musset)',
        cp: ' (Sami)', ce1: ' (Sami)', ce2: ' (Sami)',
        cm1: ' (Sami)', cm2: ' (Sami)', '6e': ' (Sami)' })[n.cle] || '') : ''),
    matiere, source: CANOPE, niveaux: [n.nom], niveauCle: n.cle, cycle: n.cycle,
    /* Les livrets Canopé de compréhension de l'écrit sont UN document par cycle pour les
       cycles 2 et 3, avec les paliers à la suite (cycle 3 : items 1 à 15, fin de CM1 →
       fin de CM2 → fin de 6e). Elle peut donc donner « le cycle 2 complet » d'un coup :
       l'appli le reconnaît par ce champ et regroupe les paliers en une carte (03/09).
       ⚠ PAS AU CYCLE 4 (dit le 05/09) : « je ne donnerai jamais à faire tous les
       exercices, donc “je donne le livret” n'a aucun sens ». Et de fait, ce sont trois
       DOCUMENTS distincts chez Canopé — un texte différent par palier (Buck, UNICEF,
       Musset). Le cycle 4 se donne donc test par test ; le champ `cycle: 4` suffit à les
       ranger ensemble dans la base des tests. */
    livret: (matiere === 'lecture' && n.cycle < 4) ? 'c' + n.cycle : null,
    ageIndicatif: [n.age - 1, n.age], echelle: 'MI-MF-MS-TBM',
    multilingue: true, lien: PAGE_LILLE, corriges: CORRIGES_CANOPE,
    materiel: matiere === 'maths'
      ? 'crayon, gomme, rapporteur, règle graduée, équerre, compas, crayons vert + rouge' : null
  });

  /* Ce qu'elle donne, dit le 05/09 : aux cycles 2 et 3, le test COMPLET est possible et
     reste proposé tel quel — mais elle veut pouvoir n'en donner qu'un palier (CP · CE1 ·
     CE2, puis CM1 · CM2 · 6e), d'où le sous-menu de paliers sur la carte. Le CYCLE 4,
     lui, est trop long pour être donné d'un coup : il se donne par NIVEAU (fin de 5e,
     fin de 4e, fin de 3e), et son livret « fin de cycle 4 » porte le titre « fin de 3e ».
     Les paliers viennent de la colonne FIN DE de la grille officielle. */
  const CYCLES = [
    { cle: 'c2', nom: 'fin de cycle 2', paliers: ['CP', 'CE1', 'CE2'], cycle: 2, age: 8, exos: 'nombres jusqu\'à 1000, addition, soustraction, multiplication, suites, rangement, problèmes' },
    { cle: 'c3', nom: 'fin de cycle 3', paliers: ['CM1', 'CM2', '6e'], cycle: 3, age: 11, exos: 'décimaux, fractions, division posée, géométrie, mesures' },
    { cle: 'c4', nom: 'fin de cycle 4', niveau: 'fin de 3e', cycle: 4, age: 14, exos: 'diviseurs, factorisation, identités remarquables, équation produit, fonctions, trigonométrie, Thalès, agrandissement' }
  ];
  const canopeMaths = (c) => ({
    id: 'canope-maths-' + c.cle,
    titre: 'Mathématiques — ' + (c.niveau || c.nom),
    matiere: 'maths', source: CANOPE, niveaux: [c.niveau || c.nom], cycleCle: c.cle, cycle: c.cycle,
    /* Les paliers notables à l'intérieur du livret (cycles 2 et 3 seulement). */
    paliers: c.paliers || null,
    /* Le nom du document Canopé quand le titre ne le dit pas, pour le retrouver chez eux. */
    document: c.niveau ? 'livret ' + c.nom : '',
    ageIndicatif: [c.age - 2, c.age], echelle: 'MI-MF-MS-TBM', contenu: c.exos,
    materiel: c.cycle === 2
      ? 'crayon, gomme, règle graduée, équerre, compas'
      : 'crayon, gomme, rapporteur, règle graduée, équerre, compas, crayons vert + rouge',
    multilingue: true, lien: PAGE_CORSE_MATHS, corriges: CORRIGES_CANOPE
  });

  const TESTS = []
    .concat(NIVEAUX.map(n => canope('lecture', n)))
    .concat(CYCLES.map(canopeMaths))
    .concat([
    {
      /* Les deux paliers intermédiaires du cycle 4 : « fin de cycle 4 » porte sur la
         fin de 3e, l'écart avec le cycle 3 (fin de 6e) est énorme. */
      id: 'canope-maths-5e',
      titre: 'Mathématiques — fin de 5e',
      matiere: 'maths', source: CANOPE, niveaux: ['fin de 5e'], cycle: 4,
      ageIndicatif: [12, 14], echelle: 'MI-MF-MS-TBM', items: 11,
      contenu: 'priorités opératoires, expressions littérales, fractions, relatifs, proportionnalité, pourcentages, aires, repérage, symétrie centrale, angles',
      materiel: 'crayon, gomme, règle graduée',
      multilingue: true, lien: PAGE_CORSE_MATHS, corriges: CORRIGES_CANOPE
    },
    {
      id: 'canope-maths-4e',
      titre: 'Mathématiques — fin de 4e',
      matiere: 'maths', source: CANOPE, niveaux: ['fin de 4e'], cycle: 4,
      ageIndicatif: [13, 15], echelle: 'MI-MF-MS-TBM', items: 10,
      contenu: 'relatifs, fractions, puissances, équation, développement, moyenne, volume, vitesse, Pythagore',
      materiel: 'crayon, gomme, règle graduée',
      multilingue: true, lien: PAGE_CORSE_MATHS, corriges: CORRIGES_CANOPE
    },
    {
      id: 'lyon-maths-16',
      titre: 'Mathématiques — plus de 16 ans (orientation)',
      matiere: 'maths', source: 'CASNAV Lyon, dans l\'application',
      niveaux: ['CAP', 'Bac pro', '2de GT', '1re', 'Terminale'],
      ageIndicatif: [16, 25], echelle: 'NE / -- / - / + / ++', items: 20,
      dansAppli: 'positionnement', ecran: 'passer', multilingue: false,
      note: "Vise l'orientation, pas le niveau UPE2A : trois groupes (socle, intermédiaire, avancé)."
    },
    {
      id: 'lyon-francais-16',
      titre: 'Français — compréhension écrite fin de cycle 4',
      matiere: 'francais', source: 'CASNAV Lyon, dans l\'application',
      niveaux: ['fin de cycle 4'], ageIndicatif: [15, 25],
      echelle: 'NE / -- / - / + / ++', items: 7,
      dansAppli: 'positionnement', ecran: 'passer', multilingue: false,
      note: "Cinq domaines : repérage, vocabulaire, compréhension, inférence, expression. "
        + "À ne passer que si l'élève lit un peu le français."
    },
    {
      id: 'decodage-latin',
      titre: 'Test de déchiffrage — lettres, syllabes, chiffres, mots',
      matiere: 'francais', source: 'sa feuille, dans l\'application',
      niveaux: ['débutant en français'], ageIndicatif: [11, 25], echelle: 'MI-MF-MS-TBM',
      items: 4, multilingue: false, materiel: 'la feuille imprimée',
      note: "Sa feuille de décodage, reçue le 02/09 : c'est ce qu'elle donne aux débutants "
        + "en français. Elle ne fait pas tout lire — elle choisit des lettres, des syllabes, "
        + "quelques chiffres, et vérifie que l'élève sait lire les trois mots."
    },
    {
      id: 'creteil-conte-college',
      titre: "Compréhension de l'écrit et production écrite — Les Trois Frères",
      matiere: 'francais', source: 'CASNAV de Créteil',
      niveaux: ['fin de 5e'], niveauCle: '5e', cycle: 4, ageIndicatif: [11, 16], echelle: 'MI-MF-MS-TBM',
      /* ⚠ « fin de 5e » est un rang que NOUS lui donnons : il n'est pas imprimé sur le
         document de Créteil, qui se présente seulement comme un test FLSco pour
         collégiens. Il lui en fallait un pour être ordonné entre les paliers Canopé (elle
         l'a cité comme repli à côté de Buck, 02/09) — à corriger si le CASNAV précise
         autre chose. Ce n'est pas ce rang qui le fait suggérer : c'est sa nature. */
      niveauAttribue: true,
      items: 17, multilingue: false,
      note: "Test FLSco de Créteil, en français : pour les collégiens francophones. "
        + "Un conte de Jean Muzi, seize questions rédigées, puis une production écrite au choix.",
      materiel: 'stylo'
    },
    {
      /* Ce qu'elle donne pour tester le NIVEAU LYCÉE à un francophone (dit le 05/09).
         Elle ne l'avait qu'en captures d'écran : le document est refait dans l'appli. */
      id: 'creteil-lycee-gary',
      titre: "Compréhension de l'écrit et production écrite — lycée (Romain Gary)",
      matiere: 'francais', source: 'CASNAV de Créteil',
      niveaux: ['lycée'], niveauCle: '2de', cycle: 4, ageIndicatif: [15, 25],
      /* Sa grille de compétences (reçue le 05/09) a son échelle propre en signes, et elle
         ne vise pas un palier scolaire mais une ORIENTATION : CAP, bac pro, bac général. */
      echelle: 'NE / --- / --+ / ++- / +++', echelleId: 'creteil', items: 20,
      multilingue: false, materiel: 'stylo',
      note: "Test FLSco pour le lycée, en français : c'est ce qu'elle donne aux "
        + "francophones de niveau lycée. Trois types de documents — un extrait de "
        + "La Promesse de l'aube (Romain Gary), une photographie, une affiche — vingt "
        + "questions rédigées et une production écrite au choix. La grille classe en trois "
        + "niveaux visés : vers le CAP, vers le bac pro, bac général et technologique."
    },
    {
      /* ⚠ CE TEST N'EST PAS LA TRADUCTION DU PRÉCÉDENT (07/09). Elle a donné à Haralds un
         Romain Gary « en anglais » — mais le document est bâti sur un AUTRE extrait de La
         Promesse de l'aube (« You Will Be an Ambassador, My Son… », la scène de la mère qui
         rentre avec ses cartons à chapeaux) et pose SEIZE questions d'une autre facture :
         identification, compréhension, étude de la langue, production écrite au choix entre
         deux sujets. Le Gary français, lui, porte sur la rencontre avec Valentine et
         travaille sur trois documents (texte, photographie, affiche).
         Les deux ne se recouvrent donc PAS : saisir les réponses de l'un dans la grille de
         l'autre n'aurait aucun sens. D'où cette entrée séparée. */
      id: 'gary-ambassadeur-en',
      titre: "Compréhension de l'écrit et production écrite — lycée, en anglais (Romain Gary, « ambassador »)",
      matiere: 'lecture', source: 'Document du lycée (version anglaise)',
      niveaux: ['lycée'], niveauCle: '2de', cycle: 4, ageIndicatif: [15, 25],
      echelle: 'NE / --- / --+ / ++- / +++', echelleId: 'creteil', items: 16,
      multilingue: true, materiel: 'stylo',
      note: "Le même exercice que le Gary français, mais sur un autre extrait et EN ANGLAIS : "
        + "pour un élève qui ne lit pas encore le français et dont la langue de scolarisation "
        + "n'est pas traduite par Canopé, l'anglais permet de mesurer ce qu'il sait faire "
        + "d'un texte littéraire — inférence, temps verbaux, reformulation, argumentation. "
        + "Trente lignes de texte, sept notes de vocabulaire, seize questions."
    },
    {
      /* ⚠ SES DEUX TESTS DE COMPRÉHENSION ÉCRITE NOTÉS SUR 5 (07/09) : « on a aussi un test
         B1 et A2 pour des élèves qui peuvent se débrouiller en français ». Ce sont deux
         feuilles distinctes, une par niveau du CECRL, qu'elle donne à un élève déjà à
         l'aise à l'oral — entre le décodage (débutant) et le Romain Gary (niveau lycée).
         Barème en points sur la feuille, mais la saisie garde l'échelle de maîtrise :
         c'est celle des autres tests, et un point et demi ne se coche pas. */
      id: 'ce-b1-bilingues',
      titre: "Compréhension écrite — niveau B1 (Des bilingues par millions)",
      matiere: 'francais', source: 'Document du lycée · Science et Vie Junior (2001)',
      niveaux: ['B1'], niveauCle: null, cycle: 4, ageIndicatif: [13, 25],
      echelle: 'MI / MF / MS / TBM', echelleId: 'canope', items: 4,
      multilingue: false, materiel: 'stylo',
      note: "Une page, notée sur 5 : un texte documentaire sur le bilinguisme, puis le type "
        + "de texte, deux vrai/faux À JUSTIFIER par une citation, et une question de "
        + "compréhension fine. C'est la justification qui départage : cocher juste sans "
        + "citer le texte ne vaut pas le point."
    },
    {
      id: 'ce-a2-train',
      titre: "Compréhension écrite — niveau A2 (Je me souviens…)",
      matiere: 'francais', source: 'Document du lycée · Taxi 2, Hachette (2003)',
      niveaux: ['A2'], niveauCle: null, cycle: 3, ageIndicatif: [12, 25],
      echelle: 'MI / MF / MS / TBM', echelleId: 'canope', items: 5,
      multilingue: false, materiel: 'stylo',
      note: "Une page, notée sur 5 : un récit court dans un train, deux questions ouvertes "
        + "(lieu, moment de l'année) et trois questions à cocher. ⚠ La feuille passe de la "
        + "question 3 à la question 5 : la numérotation est celle du document, il n'y a pas "
        + "de question 4."
    }
  ]);

  /* ⚠ Il n'existe PAS de test pour les élèves non scolarisés antérieurement, et il n'y
     en aura pas : sa méthode (dite le 02/09) est de donner le test de la classe d'âge et
     d'observer — s'il ne lit pas, ou ne comprend rien de ce qu'il lit, cela se voit tout
     de suite. L'ancienne entrée « NSA — à construire » a donc été retirée. */

  /* Les traductions maison, dans les langues que Canopé ne couvre pas.
     statut : 'brouillon' tant qu'un locuteur ne l'a pas relue. */
  const TRADUCTIONS = [
    { testId: 'canope-lecture-cm1', langue: 'Finnois', statut: 'brouillon',
      fichier: 'POSITIONNEMENT - Test finnois - Écrit CM1 et CM2.dc.html',
      controle: 'POSITIONNEMENT - Contrôle bilingue finnois.dc.html',
      reluPar: null, le: null, fait: '01/09/2026',
      adapte: ['dessins et plan à photocopier de la version Canopé',
        "emploi du temps laissé à la française",
        "item 3 : « rassurant » (français) et non « possible » (version anglaise)"] },
    { testId: 'canope-lecture-cm2', langue: 'Finnois', statut: 'brouillon',
      fichier: 'POSITIONNEMENT - Test finnois - Écrit CM1 et CM2.dc.html',
      controle: 'POSITIONNEMENT - Contrôle bilingue finnois.dc.html',
      reluPar: null, le: null, fait: '01/09/2026' }
  ];

  /* Les tests reçus d'elle, rangés dans la base. */
  const RECUS = [
    { testId: 'canope-maths-c2', langue: 'Français', items: 20,
      photos: ['uploads/IMG_20260901_074917.jpg', 'uploads/IMG_20260901_074921.jpg', 'uploads/IMG_20260901_074932.jpg'],
      eleve: 'Leila D., née en 2015 — 6e, finlandaise',
      note: "passé en FRANÇAIS, pas en langue d'origine — c'était le seul disponible" },
    { testId: 'canope-lecture-cm1', langue: 'Anglais', items: 15,
      scan: 'uploads/CamScanner 01-09-2026 07.10.pdf',
      eleve: 'Leila D., née en 2015 — 6e, finlandaise', note: 'donné après que le fin de CM2 s\'est révélé trop dur' },
    { testId: 'canope-lecture-cm2', langue: 'Anglais',
      scan: 'uploads/CamScanner 01-09-2026 07.10.pdf',
      eleve: 'Leila D., née en 2015 — 6e, finlandaise', note: 'essayé en premier : trop dur' }
  ];
  TESTS.forEach(t => {
    t.recus = RECUS.filter(r => r.testId === t.id);
    t.traductions = TRADUCTIONS.filter(r => r.testId === t.id);
  });
  function traduction(testId, nomLangue) {
    const n = normal(nomLangue);
    return TRADUCTIONS.find(t => t.testId === testId && normal(t.langue) === n) || null;
  }

  /* Les mêmes langues sous plusieurs noms : la fiche EANA écrit tantôt « finnois »,
     tantôt « finlandais ». On ne veut nommer qu'une fois la langue manquante. */
  const SYNONYMES = [
    ['finnois', 'finlandais'], ['persan', 'farsi', 'dari'], ['pachto', 'pashto', 'pachtou'],
    ['bengali', 'bengalais'], ['ourdou', 'urdu'], ['soninké', 'soninke'],
    ['bambara', 'dioula'], ['tigrigna', 'tigrinya'], ['somali', 'somalien'],
    ['mandarin', 'chinois'], ['peul', 'pular', 'fulfulde'], ['wolof'],
    ['kurde', 'kurmandji', 'sorani'], ['amharique'], ['népalais', 'nepali'],
    ['cinghalais', 'singhalais'], ['vietnamien'], ['khmer', 'cambodgien'],
    ['lingala'], ['swahili', 'kiswahili'], ['hindi'], ['tamil', 'tamoul'],
    ['créole', 'creole'], ['comorien', 'shikomor'], ['hébreu', 'hebreu'],
    ['grec'], ['hongrois'], ['tchèque', 'tcheque'], ['slovaque'], ['letton'],
    ['lituanien'], ['estonien'], ['suédois', 'suedois'], ['norvégien', 'norvegien'],
    ['danois'], ['néerlandais', 'hollandais'], ['japonais'], ['coréen', 'coreen'],
    ['indonésien', 'indonesien'], ['philippin', 'tagalog']
  ];
  function canonique(mot) {
    const n = normal(mot);
    const g = SYNONYMES.find(l => l.some(x => normal(x) === n));
    if (!g) return { cle: n, nom: mot };
    const nom = g[0];
    return { cle: normal(nom), nom: nom.charAt(0).toUpperCase() + nom.slice(1) };
  }

  /* ---- Trouver la langue du test ---- */
  function normal(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
  function langue(nom) {
    const n = normal(nom);
    if (!n) return null;
    return LANGUES.find(l => l.cles.some(c => normal(c) === n))
      || LANGUES.find(l => l.cles.some(c => n.includes(normal(c)))) || null;
  }
  /* ⚠ Les langues SANS TRADITION ÉCRITE scolaire ne comptent pas comme langue de
     scolarisation : un élève wolophone est presque toujours scolarisé en français, et
     annoncer « pas de version en wolof » n'aurait aucun sens (dit le 02/09). On les
     écarte du calcul des langues manquantes. */
  const SANS_ECRIT_SCOLAIRE = ['wolof', 'peul', 'peulh', 'pulaar', 'bambara', 'soninke',
    'soninké', 'mandingue', 'malinke', 'malinké', 'diola', 'serere', 'sérère', 'toucouleur',
    'lingala', 'bassa', 'ewondo', 'comorien', 'shimaore', 'creole', 'créole', 'baoule', 'baoulé'];

  /* La fiche EANA donne souvent plusieurs langues ("anglais finlandais") :
     on retient, dans l'ordre, la langue de scolarisation puis les maternelles. */
  function languesPossibles(fiche) {
    const brut = [fiche.langueScolarisation, fiche.langueMaternelle].join(' ');
    const mots = brut.split(/[\s,;/\n]+/).filter(Boolean);
    const vues = [], absentes = [], clesVues = [];
    for (const m of mots) {
      const l = langue(m);
      if (l) { if (!vues.includes(l)) vues.push(l); continue; }
      if (normal(m).length < 4) continue;
      if (SANS_ECRIT_SCOLAIRE.some(x => normal(x) === normal(m))) continue;
      const c = canonique(m);
      if (!clesVues.includes(c.cle)) { clesVues.push(c.cle); absentes.push(c.nom); }
    }
    return { disponibles: vues, absentes: absentes };
  }

  /* ---- Quel test proposer ----
     Règle de l'enseignante : l'âge décide, sauf non ou peu scolarisé antérieurement,
     qui prend le pas sur l'âge. */
  function proposer(fiche) {
    const a = fiche.age;
    const niv = normal(fiche.niveauScolaire);
    const nsa = niv.includes('non scolarise') || niv.includes('peu scolarise');
    /* Deux sources, pas une : la liste « Niveau de français » de l'étape 4 quand elle
       est renseignée, ET la langue de scolarisation de la fiche. Un élève scolarisé EN
       français lit le français — ne pas le déduire masquait tout le bloc Français
       (cas Khadissatou, 02/09 : scolarisée en français, aucun test de français proposé). */
    const scolEnFrancais = /franc/.test(normal(fiche.langueScolarisation))
      || /franc/.test(normal(fiche.langueMaternelle));
    const parleFrancais = normal(fiche.niveauFrancais).includes('couramment')
      || normal(fiche.niveauFrancais).includes('peut echanger')
      || scolEnFrancais;
    const lang = languesPossibles(fiche);
    const par = id => TESTS.find(t => t.id === id);
    const etapes = [];

    /* Non scolarisé antérieurement : sa méthode est de donner quand même le test de la
       classe d'âge et d'observer. On ne propose donc rien de spécial — seulement la
       raison change, pour que l'écran dise ce qu'elle regarde. */
    const cheminDeLaClasse = () => {
      const cle = fiche.classeCle || 'cm2';
      const i = Math.max(0, NIVEAUX.findIndex(n => n.cle === cle));
      /* On descend de DEUX crans, pas d'un seul : le cas vécu (Leila, 6e) est
         fin de 6e trop dur → fin de CM2 → fin de CM1. C'est elle qui juge sur pièce,
         l'appli garde simplement les deux niveaux du dessous sous la main. */
      const ref = NIVEAUX[i];
      /* ⚠ LE PALIER DE LECTURE EST CELUI QUI EST ACHEVÉ, PAS CELUI DE LA CLASSE (10/09 :
         « il doit être scolarisé en cinquième, tu ne peux donc pas me proposer un test
         fin de cinquième »). Les livrets Canopé sont des tests de FIN d'année : un élève
         qui est EN 5e n'a pas fait sa 5e, son dernier palier achevé est la fin de 6e.
         Même règle qu'en maths, qui l'appliquait déjà par cycle. Vaut pour toutes les
         classes : 4e → fin de 5e, 6e → fin de CM2.
         ⚠ À PARTIR DE FÉVRIER les deux sont à égalité en haut de page (sa règle du
         10/09) : arrivé en cours d'année, l'élève a fait une bonne partie de sa classe,
         son palier peut être tenu. Avant février, il reste sous la main. */
      const lu = NIVEAUX[Math.max(0, i - 1)];
      const mois = new Date().getMonth() + 1;
      const anneeEntamee = mois >= 2 && mois <= 8;
      const iLu = Math.max(0, i - 1);
      const replis = [iLu - 1, iLu - 2].filter(j => j >= 0).map(j => NIVEAUX[j]);
      /* ⚠ Les maths Canopé n'ont qu'un test par CYCLE, et c'est un test de FIN de cycle :
         « fin de cycle 4 » = fin de 3e. Pour une élève de 5e, ce cycle n'est pas fait —
         on propose donc le dernier cycle ACHEVÉ (cycle 3, fin de 6e) et on garde le sien
         en repli, si elle s'en sort trop bien. Même règle qu'en lecture : on ne conclut
         jamais sur un palier au-dessus de la classe d'âge (dit le 02/09). */
      const DERNIERE_ANNEE = { 2: 'ce2', 3: '6e', 4: '3e' };
      const cycleClasse = fiche.classeCycle || ref.cycle;
      const cycleFait = DERNIERE_ANNEE[cycleClasse] === ref.cle
        ? cycleClasse : Math.max(2, cycleClasse - 1);
      const cyc = 'c' + cycleFait;
      etapes.push({ rang: 1,
        pourquoi: "Classe d'âge : " + (fiche.classeDage || '?') + " (naissance " + ((fiche.naissance || '').slice(-4) || '?') + ")"
          + (cycleFait !== cycleClasse
            ? " — le test de maths porte sur le dernier cycle achevé : le cycle " + cycleClasse + " n'est pas terminé."
            : "."),
        test: par('canope-maths-' + cyc) });
      etapes.push({ rang: 2,
        pourquoi: nsa
          ? "Non ou peu scolarisé antérieurement : on donne quand même le test du dernier palier achevé, et on observe — s'il ne lit pas, ou ne comprend rien de ce qu'il lit, cela se voit tout de suite."
          : (lu.cle !== ref.cle
            ? "Compréhension de l'écrit dans la langue de scolarisation : le dernier palier ACHEVÉ. L'élève est en " + (fiche.classeDage || ref.nom) + ", il ne l'a pas terminée."
            : "Compréhension de l'écrit dans la langue de scolarisation."),
        test: par('canope-lecture-' + lu.cle) });
      /* Le palier de sa classe : à égalité à partir de février, sous la main avant. */
      if (lu.cle !== ref.cle) etapes.push({ rang: anneeEntamee ? 2 : etapes.length + 1,
        pourquoi: anneeEntamee
          ? "L'année est entamée : le palier de sa classe se tient aussi. À donner à égalité, c'est toi qui juges sur pièce."
          : "À garder sous la main : le palier de sa classe, si le précédent est trop facile.",
        test: par('canope-lecture-' + ref.cle), agrafe: !anneeEntamee });
      replis.forEach((n, k) => etapes.push({ rang: 3 + k,
        pourquoi: k === 0 ? 'À garder sous la main : si le niveau au-dessus est trop dur.'
          : 'Et celui-ci, si le précédent est encore trop dur.',
        test: par('canope-lecture-' + n.cle), agrafe: true }));
      /* Les livrets ENTIERS des cycles 3 puis 2, toujours sous la main (sa demande du
         05/09). Aux cycles 2 et 3, un seul document contient les trois paliers : les
         cartes « Livret cycle 3 » et « Livret cycle 2 » se forment d'elles-mêmes et se
         donnent en entier — contrairement au cycle 4. Les paliers déjà poussés ci-dessus
         ne sont pas dupliqués : `etapes` est dédoublonnée par test plus loin. */
      ['cm2', 'cm1', 'ce2', 'ce1', 'cp'].forEach(cle2 => {
        if (etapes.some(e => e.test && e.test.id === 'canope-lecture-' + cle2)) return;
        etapes.push({ rang: etapes.length + 1,
          pourquoi: ['ce2', 'ce1', 'cp'].indexOf(cle2) >= 0
            ? 'Le livret du cycle 2 en entier : pour un élève qui lit à peine.'
            : 'Le livret du cycle 3 en entier.',
          test: par('canope-lecture-' + cle2), agrafe: true });
      });
      const cycNum = cycleFait;
      /* Un cran au-dessus si elle s'en sort trop bien, un cran en dessous si c'est trop dur. */
      if (cycleFait !== cycleClasse) {
        etapes.push({ rang: etapes.length + 1,
          pourquoi: "À garder sous la main : si le cycle achevé est trop facile (fin de cycle " + cycleClasse + ").",
          test: par('canope-maths-c' + cycleClasse), agrafe: true });
      }
      if (cycNum > 2) etapes.push({ rang: etapes.length + 1, pourquoi: 'À garder sous la main : si le cycle au-dessus est trop dur.', test: par('canope-maths-c' + (cycNum - 1)), agrafe: true });
      /* ⚠ LE TEST D'ORIENTATION RESTE ATTEIGNABLE AVANT 16 ANS (08/09 : « pour Seydina j'ai
         donné plus de 16 ans, mets-le dans autre test possible »). Il n'apparaissait nulle
         part pour un élève de 15 ans en 2de : la règle des 16 ans le faisait disparaître de
         la page, alors qu'un lycéen de 15 ans se pose déjà les mêmes questions
         d'orientation. Suggéré à partir de 16 ans, simplement gardé sous la main avant. */
      if (a != null && a >= 14) etapes.push({ rang: etapes.length + 1,
        pourquoi: "À garder sous la main : le test d'orientation de plus de 16 ans, si l'élève est déjà au lycée.",
        test: par('lyon-maths-16'), agrafe: true });
      /* Entre le cycle 3 (fin de 6e) et le cycle 4 (fin de 3e), l'écart est grand :
         le test de fin de 4e est le palier intermédiaire. */
      if (cyc === 'c4') {
        etapes.push({ rang: etapes.length + 1, pourquoi: "À garder sous la main : si la fin de 3e est trop dure, le palier de fin de 4e.", test: par('canope-maths-4e'), agrafe: true });
        etapes.push({ rang: etapes.length + 1, pourquoi: "Et si la fin de 4e est encore trop dure : le palier de fin de 5e.", test: par('canope-maths-5e'), agrafe: true });
      }
    };

    if (!nsa && a != null && a >= 16) {
      etapes.push({ rang: 1, pourquoi: 'Plus de 16 ans et scolarité antérieure : on vise l\'orientation.', test: par('lyon-maths-16') });
      /* ⚠ LE ROMAIN GARY EST PROPOSÉ À TOUT LYCÉEN, francophone ou pas (07/09 : « il est en
         classe de première, pourquoi tu me proposes un test de quatrième ? Tu devrais me
         proposer Romain Gary voyons »). Il n'était poussé que dans le bloc `parleFrancais`,
         donc invisible pour un élève dont on ne sait pas encore s'il parle français — c'est
         justement le cas au moment du positionnement, avant tout test. L'appli suggérait
         alors le fin de 4e Canopé comme seul test de lecture : un test de collège pour un
         élève de première.
         Le Gary est le test de son NIVEAU DE CLASSE en français ; le Canopé traduit mesure
         autre chose (ce qu'il sait lire dans SA langue). Les deux se donnent, dans cet
         ordre-là. */
      etapes.push({ rang: 2,
        pourquoi: "Niveau lycée, en français : vingt questions sur trois documents, puis une production écrite. La grille classe vers le CAP, le bac pro ou le bac général.",
        bloc: 'lecture', test: par('creteil-lycee-gary') });
      /* ⚠ Pour un élève SCOLARISÉ EN FRANÇAIS, les paliers Canopé ne sont qu'un repli :
         ses tests à elle sont ceux de Créteil (Les Trois Frères, Romain Gary), plus
         proches de ce que l'élève va rencontrer en classe. Sa capture du 05/09 le dit :
         « pour ce cas précis je dois voir en haut les trois frères et Gary ». */
      etapes.push({ rang: 3, pourquoi: lang.length
          ? 'Compréhension de l\'écrit dans sa langue de scolarisation (' + lang[0] + ') : ce qu\'il sait lire dans SA langue, si le français est trop difficile.'
          : 'Compréhension de l\'écrit dans la langue de scolarisation.',
        test: par('canope-lecture-4e'), agrafe: scolEnFrancais });
      /* ⚠ Le fin de 3e n'est PLUS suggéré : « je ne donne jamais niveau 3ème car il est
         nul ce test » (05/09). Elle avait demandé de le laisser en place le temps de
         choisir un remplaçant ; sa capture du même jour a tranché — Les Trois Frères et
         le Romain Gary en haut, Musset dans « autres tests possibles ». Il reste donc
         téléchargeable, mais l'appli ne le propose plus. */
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Le palier de fin de 3e (Musset) : téléchargeable, mais elle ne le donne pas.', test: par('canope-lecture-3e'), agrafe: true });
      /* Les mêmes replis que pour un collégien : on commence en haut, on descend. */
      etapes.push({ rang: etapes.length + 1, pourquoi: 'À garder sous la main : si la fin de 4e est trop dure — Buck.', test: par('canope-lecture-5e'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Et en dessous : le palier de fin de 6e.', test: par('canope-lecture-6e'), agrafe: true });
      /* Et si même la fin de 6e est trop dure : les livrets entiers du cycle 3 puis du
         cycle 2 (sa demande du 05/09 — « ajoute dans autres tests possibles cycle 3 et
         cycle 2 »). Comme ces deux cycles sont groupés en livret, les paliers se
         réunissent en une carte « Livret cycle 3 » et une carte « Livret cycle 2 », avec
         leur PDF — celui-là se donne en entier, contrairement au cycle 4. */
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Le livret du cycle 3 en entier, si les paliers du collège sont hors de portée.', test: par('canope-lecture-cm2'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Le livret du cycle 3 en entier.', test: par('canope-lecture-cm1'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Le livret du cycle 2 en entier : pour un élève qui lit à peine.', test: par('canope-lecture-ce2'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Le livret du cycle 2 en entier.', test: par('canope-lecture-ce1'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Le livret du cycle 2 en entier.', test: par('canope-lecture-cp'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Si le test de plus de 16 ans est trop dur en maths : le palier de fin de 3e, puis ceux du dessous.', test: par('canope-maths-c4'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Puis la fin de 4e.', test: par('canope-maths-4e'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Puis la fin de 5e.', test: par('canope-maths-5e'), agrafe: true });
      etapes.push({ rang: etapes.length + 1, pourquoi: 'Et si le cycle 4 est trop dur : la fin de cycle 3.', test: par('canope-maths-c3'), agrafe: true });
      /* Les Trois Frères n'est PAS poussé ici : le bloc `parleFrancais`, plus bas, le fait
         déjà et sait s'il doit être suggéré ou seulement gardé sous la main. Le pousser
         aux deux endroits créait un doublon où la version agrafée pouvait l'emporter. */
    } else {
      cheminDeLaClasse();
    }
    if (parleFrancais) {
      /* Pour un élève scolarisé EN français, « Les Trois Frères » vient d'abord : c'est
         le test qu'elle utilise pour les collégiens francophones. Le test Lyon +16 et la
         feuille de décodage restent en repli. */
      /* « Je veux les 3 frères » (05/09) : il était réservé aux classes de 5e et 4e, donc
         invisible pour une lycéenne francophone alors qu'elle le donne. Il est proposé
         dès le collège et au-delà — c'est le seul test de lecture avec production écrite. */
      const collegeOuPlus = a == null || a >= 11;
      if (collegeOuPlus) {
        etapes.push({ rang: etapes.length + 1,
          pourquoi: scolEnFrancais
            ? "Scolarité en français : seize questions de compréhension et de langue, puis une production écrite."
            : "Au choix avec Buck (fin de 5e) : plus long, plus de grammaire, avec une production écrite.",
          /* Si le français EST sa langue de scolarisation, ce test relève de la
             compréhension de l'écrit, pas du français langue seconde : il se range dans
             le bloc bleu, avec Buck. Le bloc vert garde ce qui teste le français appris
             comme langue étrangère (le décodage, le test Lyon). */
          bloc: scolEnFrancais ? 'lecture' : 'francais',
          test: par('creteil-conte-college'), agrafe: !scolEnFrancais });
      }
      /* NIVEAU LYCÉE, francophone : c'est le Romain Gary qu'elle donne (05/09). Suggéré,
         pas agrafé, quand l'élève est scolarisé EN français — comme Les Trois Frères un
         cran plus bas.
         ⚠ On teste l'ÂGE, pas `classeCle` : dans EANA.CLASSES, les trois lignes du lycée
         (2de, 1re, Terminale) ont une clé NULLE — il n'existe pas de test Canopé à ce
         niveau, donc pas de clé de palier. Une condition sur `classeCle === '2de'` ne
         serait jamais vraie (code mort trouvé en vérification, 05/09). La règle attrape
         donc aussi les plus de 18 ans, ce qui est voulu : au-delà du lycée, c'est encore
         ce test-là qui est le plus proche. */
      if (a != null && a >= 15 && !etapes.some(e => e.test && e.test.id === 'creteil-lycee-gary')) {
        etapes.push({ rang: etapes.length + 1,
          pourquoi: scolEnFrancais
            ? "Niveau lycée et scolarité en français : vingt questions sur trois documents, puis une production écrite. La grille classe vers le CAP, le bac pro ou le bac général."
            : "Le test de niveau lycée, en français : à garder sous la main si le cycle 4 est trop facile.",
          bloc: scolEnFrancais ? 'lecture' : 'francais',
          test: par('creteil-lycee-gary'), agrafe: !scolEnFrancais });
      }
      /* Le test Lyon vise l'orientation après 16 ans : hors de propos pour un collégien
         de cycle 3, même francophone. */
      if (a == null || a >= 15) {
        etapes.push({ rang: etapes.length + 1, pourquoi: 'L\'élève lit un peu le français.',
          test: par('lyon-francais-16'), agrafe: true });
      }
      /* Sa feuille de décodage : pour les débutants, c'est la seule chose qu'elle donne. */
      etapes.push({ rang: etapes.length + 1,
        pourquoi: 'Décodage en alphabet latin : lettres, syllabes, chiffres, trois mots.',
        test: par('decodage-latin'), agrafe: true });
    }
    return { etapes, langues: lang, nsa, parleFrancais };
  }

  window.TESTS = { LANGUES, NIVEAUX, CYCLES, RECUS, TRADUCTIONS, TESTS, SYNONYMES, PDFS, SANS_ECRIT_SCOLAIRE, canonique, traduction, PLATEFORME_CANOPE, PAGE_LILLE, PAGE_CORSE_MATHS, PROTOCOLE_MATHS, NON_VERBAL_MATHS, CORRIGES_CANOPE, langue, languesPossibles, proposer, normal };
})();
