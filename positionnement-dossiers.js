/* Le dossier d'un élève à l'arrivée : la fiche, les tests donnés, les scores, la synthèse.
   Un seul endroit pour les deux échelles — celle de Canopé (MI/MF/MS/TBM) et celle des
   grilles CASNAV Lyon (NE/--/-/+/++) : un test garde la sienne, on ne les mélange pas.
   Tout reste dans le navigateur (upe2a-dossiers). window.DOSSIERS */
(function () {
  const CLE = 'upe2a-dossiers';

  const ECHELLES = {
    canope: {
      id: 'canope', nom: 'MI / MF / MS / TBM', source: 'Réseau Canopé',
      seuil: 'MS et TBM : on considère que c\'est acquis',
      valeurs: [
        { v: 'NE', nom: 'NE', aide: 'non évalué', pts: null, fond: '#eef1f5', texte: '#8a91a3' },
        { v: 'MI', nom: 'MI', aide: 'maîtrise insuffisante', pts: 0, fond: '#fbe3e6', texte: '#b3283c' },
        { v: 'MF', nom: 'MF', aide: 'maîtrise fragile', pts: 1, fond: '#fdeedd', texte: '#a35a12' },
        { v: 'MS', nom: 'MS', aide: 'maîtrise satisfaisante', pts: 2, acquis: true, fond: '#e6f2e9', texte: '#2a6b45' },
        { v: 'TBM', nom: 'TBM', aide: 'très bonne maîtrise', pts: 3, acquis: true, fond: '#cfeadb', texte: '#155e3d' }
      ]
    },
    lyon: {
      id: 'lyon', nom: 'NE / -- / - / + / ++', source: 'CASNAV Lyon',
      seuil: 'un palier n\'est retenu qu\'au-dessus de 60 %',
      valeurs: null /* pris dans window.POSITIONNEMENT.ECHELLE au moment de l'affichage */
    },
    /* La grille du test FLSco lycée de Créteil a SA propre échelle — quatre crans notés
       en signes (05/09). Ne pas la confondre avec celle de Lyon : les libellés se
       ressemblent (« -- », « ++ ») mais ce sont trois signes, pas deux, et la grille ne
       vise pas un palier scolaire — elle vise une ORIENTATION : CAP, bac pro, bac
       général et technologique. */
    creteil: {
      id: 'creteil', nom: 'NE / --- / --+ / ++- / +++', source: 'CASNAV de Créteil',
      seuil: 'les trois niveaux visés se lisent séparément : CAP, bac pro, bac général',
      valeurs: [
        { v: 'NE', nom: 'NE', aide: 'non évalué', pts: null, fond: '#eef1f5', texte: '#8a91a3' },
        { v: '---', nom: '---', aide: 'non atteint', pts: 0, fond: '#fbe3e6', texte: '#b3283c' },
        { v: '--+', nom: '--+', aide: 'plutôt non atteint', pts: 1, fond: '#fdeedd', texte: '#a35a12' },
        /* « ++- » compte comme ACQUIS, au même titre que MS chez Canopé : les deux échelles
           ont quatre crans et coupent au même endroit — les deux du haut sont tenus pour
           acquis. Tranché le 05/09. */
        { v: '++-', nom: '++-', aide: 'plutôt atteint', pts: 2, acquis: true, fond: '#e6f2e9', texte: '#2a6b45' },
        { v: '+++', nom: '+++', aide: 'atteint', pts: 3, acquis: true, fond: '#cfeadb', texte: '#155e3d' }
      ]
    }
  };

  /* Les exercices, quand on les connaît vraiment (tests reçus d'elle).
     domaine : sert à pré-remplir les cases de la fiche EANA. */
  const EXERCICES = {
    /* Livret cycle 2 (reçu le 05/09), un test par palier : fin de CP = ex. 1 à 5,
       fin de CE1 = 6 à 10, fin de CE2 = 11 à 15. */
    'canope-lecture-cp': [
      ['1', 'Lire le texte à voix haute', 'lecture'],
      ['2', 'Relier dix mots à leur image', 'lexique'],
      ['3', "L'heure du réveil", 'reperage'],
      ['4', 'Dessiner les habits de Sami avec les bonnes couleurs', 'comprehension'],
      ['5', 'Reconnaître la chambre de Sami parmi quatre dessins', 'comprehension']
    ],
    'canope-lecture-ce1': [
      ['6', 'Qui a choisi les habits de Sami', 'inference'],
      ['7', "Barrer les fruits absents de l'assiette", 'reperage'],
      ['8', 'Vrai ou faux : peu de temps à préparer ses vêtements', 'comprehension'],
      ['9', 'Vrai ou faux : il déteste le petit-déjeuner', 'inference'],
      ['10', "Numéroter quatre actions dans l'ordre de l'histoire", 'chronologie']
    ],
    'canope-lecture-ce2': [
      ['11', 'Vrai ou faux : la main dans les cheveux', 'comprehension'],
      ['12', 'Sami prend-il des gâteaux', 'comprehension'],
      ['13', 'Où habite Sami', 'inference'],
      ['14', 'Pourquoi sa mère court dans l\'escalier', 'comprehension'],
      ['15', 'Pourquoi la casquette est importante', 'inference']
    ],
    'canope-lecture-cm1': [
      ['1', 'Lire le texte', 'lecture'],
      ['2', 'La nature du texte', 'comprehension'],
      ['3', 'Le cauchemar de Sami', 'inference'],
      ['4', "Le dessin de l'école", 'comprehension'],
      ['5', "L'itinéraire sur le plan", 'reperage']
    ],
    'canope-lecture-cm2': [
      ['6', 'Quelle phrase est une question', 'langue'],
      ['7', "Le temps qu'il fait (plusieurs réponses)", 'reperage'],
      ['8', "Pourquoi il sort l'emploi du temps", 'inference'],
      ['9', "L'heure de début de journée", 'reperage'],
      ['10', 'Les jours sans histoire', 'reperage']
    ],
    'canope-lecture-6e': [
      ['11', 'Les autres enfants, au paragraphe 2', 'inference'],
      ['12', 'Numéroter les phrases dans l\'ordre', 'comprehension'],
      ['13', 'La professeure est-elle un aigle', 'inference'],
      ['14', 'Relier les sentiments aux éléments', 'comprehension'],
      ['15', 'Ce qui va se passer ensuite', 'inference']
    ],
    /* Les Trois Frères (Créteil) : ses 17 exercices rangés par domaine. Sans cette
       entrée, le test n'avait qu'un domaine « autre » — et la fiche ne pouvait pas
       voir que la compréhension fine était en échec (Khadissatou, 02/09). */
    'creteil-conte-college': [
      ['1', 'La nature du texte (conte) et ce qui le prouve', 'comprehension'],
      ['2', "Où se passe l'histoire", 'reperage'],
      ['3', 'Les personnages principaux', 'comprehension'],
      ['4', 'Verbe, nom, adjectif dans une phrase', 'langue'],
      ['5', 'Présent, imparfait, passé simple', 'langue'],
      ['6', 'Mettre une phrase au pluriel', 'langue'],
      ['7', 'Qui sont les « prétendants »', 'inference'],
      ['8', 'Les cadeaux proposés', 'reperage'],
      ['9', 'Vrai ou faux, avec justification', 'inference'],
      ['10', 'Ce que vont faire les trois frères', 'comprehension'],
      ['11', 'Passer au discours indirect', 'langue'],
      ['12', 'Quatre mots du champ lexical du mariage', 'langue'],
      ['13', 'Quatre pronoms qui remplacent « prétendants »', 'langue'],
      ['14', 'Pourquoi il ne reste que trois prétendants', 'inference'],
      ['15', 'Recopier la comparaison', 'comprehension'],
      ['16', 'Le cheval plaira-t-il à la mère (argumenté)', 'inference'],
      ['17', 'Production écrite', 'expression']
    ],
    /* Romain Gary (Créteil, niveau lycée) : ce qu'elle donne aux francophones de niveau
       lycée (05/09). Quatre parties dans le sujet — compréhension globale, analyse,
       interprétation, production écrite — et le rangement par domaine les suit :
       l'interprétation littéraire est de l'inférence, l'analyse est de la langue. */
    'creteil-lycee-gary': [
      ['1', "Présenter le document (œuvre, auteur, date)", 'reperage'],
      ['2', "Les deux personnages et l'apparence de la fillette", 'reperage'],
      ['3', "Les sentiments des personnages l'un pour l'autre", 'comprehension'],
      ['4', 'Proposer un titre pour cet extrait', 'inference'],
      ['5', 'Les deux temps du passé, avec un exemple chacun', 'langue'],
      ['6', 'Le pronom personnel dominant et qui il représente', 'langue'],
      ['7', "Trois mots ou expressions d'idéalisation (lignes 1 à 10)", 'comprehension'],
      ['8', "Nature et valeur de « absolument », « immédiatement », « toujours », « jamais »", 'langue'],
      ['9', "L'âge de l'auteur au moment où il écrit", 'inference'],
      ['10', 'Les réactions physiques et le sentiment qu\'elles traduisent (lignes 7 à 10)', 'inference'],
      ['11', 'La figure de style et le choix de l\'auteur', 'inference'],
      ['12', "Les indices de l'autobiographie", 'inference'],
      ['13', 'Production écrite — sujet 1 : raconter une rencontre à la manière de Gary', 'expression'],
      ['14', 'Production écrite — sujet 2 : raconter la rencontre en étant Valentine', 'expression'],
      /* ⚠ Questions 15 à 20 : elles portent sur les DOCUMENTS 2 et suivants — une
         photographie ancienne, une affiche de vaccination — que ses captures du 05/09 ne
         contenaient pas. Les intitulés ci-dessous sont reconstitués d'après le corrigé :
         ils disent ce qui est évalué, pas la consigne exacte. À remplacer dès qu'elle
         envoie les pages manquantes. */
      ['15', 'Photographie : compléter le tableau (personnages, objets, lieu — premier plan et arrière-plan)', 'reperage'],
      ['16', "Photographie : l'effet produit (humour, nostalgie) et ce qui le produit", 'inference'],
      ['17', "Affiche : de quoi elle traite (la vaccination)", 'comprehension'],
      ['18', "Affiche : le conseil donné et ses deux raisons", 'comprehension'],
      ['19', 'Le lien entre les deux documents (école et santé)', 'inference'],
      ['20', 'Le point commun aux trois types de documents', 'inference']
    ],
    /* Fin de 5e : compétences de la grille officielle (page 3). ⚠ Les grilles du
       CYCLE 4 n'ont pas de colonne « FIN DE » : pas de palier interne à afficher. */
    'canope-maths-5e': [
      ['1', 'Priorités opératoires (deux calculs à entourer)', 'nombres', "Calculer des expressions numériques en utilisant les règles de priorités."],
      ['2', 'Calculer A = 6 + 2y pour y = 4', 'nombres', 'Utiliser une égalité littérale.'],
      ['3', 'Réduire et développer trois expressions littérales', 'nombres', 'Développer des expressions algébriques.'],
      ['4', 'Calculs avec des fractions', 'nombres', 'Calculer avec des fractions.'],
      ['5', 'Calculs avec des nombres relatifs', 'nombres', 'Calculer avec des nombres relatifs.'],
      ['6', 'Tableau de proportionnalité (prix des livres)', 'donnees', 'Résoudre des problèmes de proportionnalité.'],
      ['7', 'Pourcentage : un pull à 50 € soldé de 20 %', 'donnees', 'Résoudre des problèmes de pourcentage.'],
      ['8', "Aire d'un triangle et aire d'un disque", 'grandeurs', "Identifier des grandeurs composées rencontrées en mathématiques ou dans d'autres disciplines (aires du triangle et du disque)."],
      ['9', 'Repérage dans le plan : lire et placer des points', 'geometrie', 'Repérer et placer des points dans un repère orthonormé.'],
      ['10', 'Symétrie centrale par rapport à un point', 'geometrie', "Tracer le symétrique d'une figure par rapport à un point."],
      ['11', 'Angle manquant dans un triangle', 'geometrie', "Calculer le troisième angle d'un triangle."]
    ],
    /* Fin de cycle 4 (fin de 3e) : compétences de la grille officielle (page 5).
       ⚠ La grille ne note l'ex. 9 qu'en DEUX lignes (aires · volumes) ; le corrigé, lui,
       le note trois fois — nos 9a / 9b / 9c suivent le corrigé, la 9c (coefficients)
       n'ayant pas de ligne propre dans la grille. */
    'canope-maths-c4': [
      ['1', 'Multiples et diviseurs (vrai / faux)', 'nombres', "Déterminer si un entier est ou n'est pas multiple ou diviseur d'un autre entier."],
      ['2', 'Factoriser avec un facteur commun', 'nombres', "Factoriser des expressions algébriques dans des cas très simples."],
      ['3', 'Identités remarquables', 'nombres', 'Connaître et utiliser les identités remarquables.'],
      ['4', 'Résoudre une équation produit', 'nombres', 'Savoir résoudre une équation produit.'],
      ['5', "Lire l'image d'un nombre sur un graphique et dans un tableau", 'donnees', "Utiliser différents modes de représentation et passer de l'un à l'autre."],
      ['6', 'Reconnaître la représentation graphique de trois fonctions', 'donnees', "Lire et interpréter graphiquement les coefficients d'une fonction affine représentée par une droite."],
      ['7', 'Trigonométrie : sinus, cosinus, tangente', 'geometrie', "Utiliser la trigonométrie du triangle rectangle pour calculer des longueurs ou des angles."],
      ['8', 'Théorème de Thalès', 'geometrie', "Utiliser le théorème de Thalès pour calculer des longueurs."],
      ['9a', 'Agrandissement : les aires des deux cubes', 'grandeurs', "Calculer l'aire d'un carré (niveau cycle 3 / CM2)."],
      ['9b', 'Agrandissement : les volumes des deux cubes', 'grandeurs', "Calculer le volume d'un pavé droit (niveau cycle 3 / 6e)."],
      ['9c', 'Agrandissement : les coefficients a et b', 'grandeurs', "Comprendre l'effet d'un agrandissement sur les aires et les volumes."]
    ],
    /* Fin de 4e : compétences de la grille officielle (page 4). Pas de colonne
       « FIN DE » au cycle 4. ⚠ La grille range la VITESSE (ex. 9) en grandeurs et
       mesures, pas en gestion de données : domaine corrigé le 05/09. */
    'canope-maths-4e': [
      ['1', 'Calculs avec des nombres relatifs', 'nombres', 'Calculer avec des nombres relatifs.'],
      ['2', 'Calculs avec des fractions', 'nombres', 'Calculer avec des fractions.'],
      ['3', 'Puissances de 10 et de 5', 'nombres', "Effectuer des calculs numériques simples impliquant des puissances."],
      ['4', 'Résoudre 16x − 5 = 3', 'nombres', "Résoudre une équation du premier degré à une inconnue."],
      ['5', "Encadrer une écriture scientifique (vrai / faux)", 'nombres', "Encadrer un nombre écrit sous forme scientifique par deux entiers."],
      ['6', 'Développer un produit de deux parenthèses', 'nombres', "Développer des expressions algébriques dans des cas très simples."],
      ['7', 'Calculer une moyenne', 'donnees', "Résoudre un problème en calculant la moyenne d'une série de données."],
      ['8', "Calculer un volume", 'grandeurs', "Calculer avec des grandeurs mesurables le volume d'une pyramide et d'un cône."],
      ['9', 'Durée à partir de la distance et de la vitesse', 'grandeurs', "Mener des calculs impliquant des grandeurs composées (vitesse)."],
      ['10', 'Théorème de Pythagore : calculer AC', 'geometrie', 'Utiliser le théorème de Pythagore.']
    ],
    /* Cycle 2 : les compétences et le palier « fin de » sont ceux de la GRILLE
       D'ÉVALUATION officielle (tests/canope-maths-grilles.pdf, page 1).
       ⚠ Les trois domaines de la grille sont Nombres et calculs · Grandeurs et mesures ·
       Espace et géométrie : les problèmes (ex. 2, 3, 10) y relèvent des NOMBRES, pas de
       la gestion de données — la case « données » de la fiche reste donc non évaluée sur
       ce test, ce qui est exact. */
    'canope-maths-c2': [
      ['1', 'Matériel base 10 : entourer le nombre', 'nombres', "Comprendre et utiliser des nombres entiers pour dénombrer, ordonner, repérer, comparer.", 'CP'],
      ['2', 'Problème : combien de ballons en tout', 'nombres', "Résoudre des problèmes issus de la vie quotidienne relevant des structures additives (choisir le calcul).", 'CP'],
      ['3', 'Problème : combien de filles', 'nombres', "Résoudre des problèmes issus de la vie quotidienne relevant des structures additives ou multiplicatives (choisir le calcul).", 'CE1'],
      ['4', 'Décomposer (382 = 300 + 80 + 2)', 'nombres', "Comprendre et utiliser des nombres entiers pour dénombrer, ordonner, repérer, comparer.", 'CE1'],
      ['5', 'Additions posées (48 + 31 · 166 + 254)', 'nombres', "Mettre en œuvre un algorithme de calcul posé pour l'addition.", 'CE1'],
      ['6', 'Compléter une suite de 10 en 10', 'nombres', 'Itérer une suite de 10 en 10.', 'CE1'],
      ['7', 'Ranger du plus petit au plus grand', 'nombres', 'Comparer et ranger des nombres entiers.', 'CE1'],
      ['8', 'Soustractions posées (87 − 52 · 512 − 139)', 'nombres', 'Mettre en œuvre un algorithme de calcul posé pour la soustraction.', 'CE2'],
      ['9', 'Multiplications posées (32 × 4 · 75 × 3)', 'nombres', 'Mettre en œuvre un algorithme de calcul posé pour la multiplication.', 'CE2'],
      ['10', 'Problèmes : 26 × 4 livres, 32 cartes partagées', 'nombres', 'Résoudre des problèmes relevant des structures additives, multiplicatives, de partage ou de groupements. Modéliser ces problèmes à l\'aide d\'écritures mathématiques.', 'CE2'],
      ['11', 'Mesurer la longueur BC', 'grandeurs', 'Mesurer des longueurs avec un instrument adapté.', 'CP'],
      ['12', 'Tracer un segment de 7 cm', 'grandeurs', 'Utiliser la règle comme instrument de tracé.', 'CP'],
      ['13', 'Entourer la bonne unité (m, kg, l, h)', 'grandeurs', 'Estimer les ordres de grandeur de quelques longueurs, masses et contenances en relation avec les unités métriques.', 'CE1'],
      ['14', 'Compléter 9 égalités de conversion', 'grandeurs', 'Comparer, estimer, mesurer des longueurs, des masses, des contenances, des durées. Relations entre ces unités.', 'CE2'],
      ['15', 'Nommer les figures', 'geometrie', 'Reconnaître les figures planes usuelles. Utiliser le vocabulaire approprié : carré, rectangle, triangle, cercle.', 'CP'],
      ['16a', 'Nombre de côtés de la figure', 'geometrie', "Utiliser le vocabulaire géométrique approprié : côté, sommet.", 'CP'],
      ['16b', 'Nombre de sommets de la figure', 'geometrie', "Utiliser le vocabulaire géométrique approprié : côté, sommet.", 'CP'],
      ['16c', "Nombre d'angles droits de la figure", 'geometrie', 'Utiliser le vocabulaire géométrique approprié : angle droit.', 'CE1'],
      ['17', 'Tracer un carré à partir d\'un côté', 'geometrie', 'Construire quelques figures géométriques.', 'CE1'],
      ['18', 'Entourer le plan qui correspond au dessin', 'geometrie', 'Se repérer en utilisant des repères et des représentations.', 'CE1'],
      ['19', 'Tracer un cercle au compas (centre A, par B)', 'geometrie', 'Construire un cercle connaissant son centre et un point.', 'CE2'],
      ['20', 'Plan de la classe : colorier et repérer', 'geometrie', 'Situer des objets et des personnes les uns par rapport aux autres ou par rapport à d\'autres repères.', 'CE2']
    ],
    /* Fin de cycle 3 : compétences et paliers de la GRILLE D'ÉVALUATION officielle
       (tests/canope-maths-grilles.pdf, page 2), paliers CM1 · CM2 · 6e.
       ⚠ La grille range les problèmes (ex. 6, 7, 13) dans NOMBRES ET CALCULS et non dans
       la gestion de données : les domaines sont alignés dessus (05/09). */
    'canope-maths-c3': [
      ['1', 'Multiplication posée : 297 × 35', 'nombres', "Mettre en œuvre un algorithme de calcul posé pour la multiplication.", 'CM1'],
      ['2', 'Division posée : 408 ÷ 3', 'nombres', "Mettre en œuvre un algorithme de calcul posé pour la division.", 'CM1'],
      ['3', 'Addition de décimaux : 164,8 + 26,57', 'nombres', "Mettre en œuvre un algorithme de calcul posé pour l'addition.", 'CM1'],
      ['4', 'Soustraction de décimaux : 37,9 − 28,72', 'nombres', "Mettre en œuvre un algorithme de calcul posé pour la soustraction.", 'CM1'],
      ['5', 'Entourer la fraction égale à 5,4', 'nombres', "Associer diverses désignations d'un nombre décimal (fractions décimales et écritures à virgule).", 'CM1'],
      ['6', 'Problème : combien de bonbons de plus', 'nombres', 'Résoudre des problèmes mettant en jeu les quatre opérations.', 'CM1'],
      ['7', 'Compléter le tableau de prix', 'nombres', "Reconnaître et résoudre des problèmes relevant de la proportionnalité en utilisant une procédure adaptée.", 'CM1'],
      ['8', 'Fractions de bande : lire et colorier', 'nombres', 'Comprendre et utiliser la notion de fractions simples.', 'CM1'],
      ['9', 'Ranger des décimaux du plus petit au plus grand', 'nombres', 'Comparer et ranger des nombres décimaux.', 'CM2'],
      ['10', 'Colorier le tiers de la bande', 'nombres', 'Comprendre et utiliser la notion de fractions simples.', '6e'],
      ['11', 'Multiplication de décimaux : 49,7 × 3,6', 'nombres', "Mettre en œuvre un algorithme de calcul posé pour la multiplication.", '6e'],
      ['12', "Compléter l'égalité : 1/4 = 0,25", 'nombres', "Associer diverses désignations d'un nombre décimal.", '6e'],
      ['13', 'Problème : 20 œufs dans des boîtes de 6', 'nombres', 'Résoudre des problèmes mettant en jeu les quatre opérations.', '6e'],
      ['14', 'Conversions (kg, min, s, cl, km)', 'grandeurs', "Utiliser le lexique, les unités, les instruments spécifiques de ces grandeurs.", 'CM1'],
      ['15', "Mesurer un angle au rapporteur", 'grandeurs', "Utiliser un instrument de mesure (un rapporteur) et une unité de mesure (le degré) pour déterminer la mesure en degré d'un angle.", '6e'],
      ['16', 'Nommer les figures', 'geometrie', "Reconnaître, nommer des figures planes simples (triangles et quadrilatères particuliers).", 'CM1'],
      ['17', 'Tracer une perpendiculaire et une parallèle', 'geometrie', "Effectuer des tracés correspondant à des relations de perpendicularité ou de parallélisme de droites et de segments.", '6e'],
      ['18', "Faces, arêtes et sommets d'un solide", 'geometrie', "Reconnaître, nommer, décrire, reproduire, représenter, construire des solides simples.", '6e'],
      ['19', 'Tracer le symétrique par rapport à une droite', 'geometrie', "Construire la figure symétrique d'une figure donnée par rapport à un axe donné.", '6e'],
      ['20', 'Construire un triangle (8, 6 et 5 cm)', 'geometrie', 'Reproduire, représenter, construire des figures simples.', '6e']
    ]
  };

  const DOMAINES = {
    nombres: 'Nombres et calcul', donnees: 'Organisation et gestion de données',
    grandeurs: 'Grandeurs et mesures', geometrie: 'Espace et géométrie',
    lecture: 'Lecture', comprehension: 'Compréhension', inference: 'Inférence',
    expression: 'Expression écrite',
    reperage: "Repérage d'informations", langue: 'Langue et vocabulaire',
    /* Deux domaines propres au livret cycle 2 (05/09) : au CP, l'appariement mot-image
       est du LEXIQUE pur, et l'exercice 10 du CE1 teste la CHRONOLOGIE du récit —
       comprendre qu'un plus-que-parfait vient avant. Les ranger dans « compréhension »
       aurait mélangé trois choses différentes sur la fiche. */
    lexique: 'Lexique (mot et image)', chronologie: 'Chronologie du récit'
  };

  /* Quand le test n'est pas encore dans la base, on pose une grille par domaine :
     ce sont les quatre domaines de la fiche EANA, ce qui permet quand même de
     remplir les quatre cases « Mathématiques » du PDF. */
  const PARDEFAUT = { lecture: 5, maths: 12 };
  const DOM_MATHS = ['nombres', 'donnees', 'grandeurs', 'geometrie'];

  function echelleDe(test) {
    if (!test) return ECHELLES.canope;
    if (test.dansAppli) return ECHELLES.lyon;
    /* Un test peut nommer son échelle : le FLSco lycée de Créteil a la sienne. */
    if (test.echelleId && ECHELLES[test.echelleId]) return ECHELLES[test.echelleId];
    return ECHELLES.canope;
  }

  function valeurs(echelle) {
    if (echelle.valeurs) return echelle.valeurs;
    const P = window.POSITIONNEMENT;
    return (P && P.ECHELLE) ? P.ECHELLE.map(e => Object.assign({ aide: e.aide }, e)) : [];
  }

  /* Les paliers retenus filtrent les exercices : elle peut ne donner que le CP et le CE1
     du livret de cycle 2 (sa demande du 05/09). Un exercice sans palier (cycle 4) reste
     toujours là ; sans liste de paliers, le test est complet. */
  function exercices(test, paliers) {
    if (!test) return [];
    if (test.dansAppli) {
      const P = window.POSITIONNEMENT;
      const t = P && P.TESTS && (P.TESTS[test.matiere === 'maths' ? 'maths' : 'fr']);
      /* attendu / grille : le corrigé CASNAV Lyon, pour l'afficher à l'étape 3. */
      return t ? t.exercices.map(e => ({ id: e.id, num: e.num, titre: e.capacite || e.titre,
        domaine: e.groupe, attendu: e.attendu || '', grille: e.grille || '',
        paliers: e.paliers || [], fiche: e.fiche || '', court: e.court || '' })) : [];
    }
    const garde = (e) => !paliers || !paliers.length || !e.finDe || paliers.indexOf(e.finDe) >= 0;
    const connus = EXERCICES[test.id];
    if (connus) return connus.map(([num, titre, domaine, competence, finDe]) => ({
      id: test.id + '-' + num, num, titre, domaine,
      /* La grille d'évaluation officielle donne, par exercice, la compétence rédigée et
         le palier « FIN DE » (CP · CE1 · CE2 au cycle 2). L'étape 3 les affiche comme sur
         la grille papier qu'elle a sous les yeux (05/09). */
      competence: competence || '', finDe: finDe || '' })).filter(garde);
    /* Pas d'entrée dans EXERCICES, mais un CORRIGÉ existe : c'est lui qui fait foi — ses
       questions sont les vraies, avec leurs vrais numéros. Sans ce repli, un corrigé
       fraîchement intégré restait invisible et l'appli affichait « pas de corrigé » avec
       cinq « Exercice 1…5 » devinés (corrigés de français 4e et 3e, 05/09). */
    const C = window.CORRIGES && window.CORRIGES.pour(test.id);
    if (C && C.length) return C.map(e => ({
      id: test.id + '-' + e.num, num: e.num,
      titre: e.question || ('Exercice ' + e.num),
      domaine: e.rubrique || null, attendu: e.attendu || '' }));
    const n = PARDEFAUT[test.matiere] || 8;
    const liste = [];
    for (let i = 1; i <= n; i++) {
      const dom = test.matiere === 'maths' ? DOM_MATHS[(i - 1) % DOM_MATHS.length] : null;
      liste.push({ id: test.id + '-' + i, num: String(i), titre: 'Exercice ' + i, domaine: dom, suppose: true });
    }
    return liste;
  }

  /* Bilan d'un test. Deux conclusions différentes selon l'origine du test :
     – Canopé dit OÙ EN EST L'ÉLÈVE. Le niveau est atteint quand PLUS DE LA MOITIÉ des
       items sont acquis (MS ou TBM) — un comptage d'items, décidé avec elle le 01/09,
       pas une moyenne de points.
     – Lyon dit OÙ ORIENTER : on reprend tel quel le palier des grilles CASNAV. */
  function bilan(test, scores, paliers) {
    const ech = echelleDe(test), vals = valeurs(ech);
    const pts = {}, acquis = {};
    /* Ce qui compte comme ACQUIS vient de l'échelle elle-même (drapeau `acquis`), et non
       d'une liste de valeurs écrite ici : cette liste ne connaissait que MS/TBM et +/++,
       si bien qu'une échelle nouvelle ne pouvait RIEN acquitter — le bilan du test lycée
       restait à 0 % quoi qu'elle saisisse (trouvé en vérification, 05/09). Les libellés
       de Lyon, qui viennent d'un autre fichier, gardent leur repli par nom. */
    vals.forEach(v => { pts[v.v] = v.pts;
      acquis[v.v] = v.acquis === true
        || (v.acquis === undefined && (v.v === 'MS' || v.v === 'TBM' || v.v === '+' || v.v === '++')); });
    const max = Math.max.apply(null, vals.map(v => v.pts == null ? 0 : v.pts));
    const exos = exercices(test, paliers);
    let obtenus = 0, evalues = 0, nbAcquis = 0;
    const parDomaine = {};
    for (const e of exos) {
      const s = (scores || {})[e.id];
      const p = s ? pts[s] : null;
      if (p == null) continue;
      evalues++; obtenus += p;
      if (acquis[s]) nbAcquis++;
      const d = e.domaine || 'autre';
      parDomaine[d] = parDomaine[d] || { obtenus: 0, evalues: 0, acquis: 0 };
      parDomaine[d].obtenus += p; parDomaine[d].evalues++;
      if (acquis[s]) parDomaine[d].acquis++;
    }
    const pct = evalues ? Math.round((obtenus / (evalues * max)) * 100) : null;
    /* Les tests de l'appli regroupent par PALIER D'ORIENTATION (base · inter · avance) :
       leurs libellés vivent dans POSITIONNEMENT, pas dans DOMAINES. Sans ça la fiche
       officielle affichait « Points d'appui : base. Fragilités : inter et avance. » —
       du jargon de code sur un document lu au CASNAV (03/09). */
    const NOMS_GROUPES = (() => {
      if (!test || !test.dansAppli) return {};
      const P = window.POSITIONNEMENT;
      const t = P && P.TESTS && P.TESTS[test.matiere === 'maths' ? 'maths' : 'fr'];
      const o = {};
      ((t && t.groupes) || []).forEach(g => { o[g[0]] = g[1]; });
      return o;
    })();
    const domaines = Object.keys(parDomaine).map(d => {
      const x = parDomaine[d];
      return {
        id: d, nom: NOMS_GROUPES[d] || DOMAINES[d] || d, evalues: x.evalues, acquis: x.acquis,
        pct: Math.round((x.obtenus / (x.evalues * max)) * 100),
        atteint: x.acquis * 2 > x.evalues
      };
    }).sort((a, b) => b.pct - a.pct);

    /* La conclusion, dans les mots du test. On ne conclut PAS sur un test à moitié noté :
       deux items acquis sur cinq notés ne disent rien du niveau, et cette phrase part
       ensuite dans un document officiel. */
    const complet = evalues > 0 && evalues === exos.length;
    const atteint = complet ? nbAcquis * 2 > evalues : null;
    let mot = null, conclusion = null, palier = null;
    if (evalues && !complet) {
      mot = evalues + ' item' + (evalues > 1 ? 's' : '') + ' noté' + (evalues > 1 ? 's' : '')
        + ' sur ' + exos.length + ' — conclusion en attente.';
    } else if (complet) {
      if (test && test.dansAppli) {
        const P = window.POSITIONNEMENT;
        const b = P && P.bilan ? P.bilan(test.matiere === 'maths' ? 'maths' : 'fr', scores) : null;
        palier = b ? b.palier : null;
        conclusion = palier ? 'Palier conseillé : ' + palier + '.' : null;
        mot = (b && b.phrase) ? b.phrase : null;
      } else {
        const nom = (test.niveaux && test.niveaux[0]) ? test.niveaux[0] : (test.titre || 'ce niveau');
        conclusion = 'Niveau ' + nom + (atteint ? ' atteint.' : ' non atteint.');
        mot = atteint
          ? nbAcquis + ' item' + (nbAcquis > 1 ? 's' : '') + ' acquis sur ' + evalues + ' : plus de la moitié, le niveau est atteint.'
          : nbAcquis + ' item' + (nbAcquis > 1 ? 's' : '') + ' acquis sur ' + evalues + " : moins de la moitié, le niveau n'est pas atteint.";
      }
    }
    return { pct, evalues, total: exos.length, max, acquis: nbAcquis, atteint,
      domaines, conclusion, mot, palier, echelle: ech };
  }

  /* La conclusion d'ensemble, quand plusieurs niveaux du même domaine ont été passés :
     « lit au niveau fin de CM1 » = le plus haut niveau atteint. */
  const RANGS = ['cp', 'ce1', 'ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'];
  function niveauAtteint(passations, listeTests) {
    const faits = [];
    for (const p of (passations || [])) {
      const t = (listeTests || []).find(x => x.id === p.testId);
      if (!t || !t.niveauCle || t.matiere !== 'lecture') continue;
      const b = bilan(t, p.scores);
      if (b.atteint == null) continue;
      faits.push({ cle: t.niveauCle, nom: (t.niveaux && t.niveaux[0]) || t.titre, atteint: b.atteint, rang: RANGS.indexOf(t.niveauCle) });
    }
    if (!faits.length) return null;
    faits.sort((a, b) => a.rang - b.rang);
    const hauts = faits.filter(f => f.atteint);
    const plusHaut = hauts.length ? hauts[hauts.length - 1] : null;
    const echoue = faits.filter(f => !f.atteint);
    const rates = echoue.filter(f => !plusHaut || f.rang > plusHaut.rang).map(f => f.nom);
    const et = (l) => l.length > 1 ? l.slice(0, -1).join(', ') + ' et ' + l[l.length - 1] : l[0];
    return {
      faits,
      niveau: plusHaut ? plusHaut.nom : null,
      /* Tous les paliers échoués sont nommés, et pas seulement le premier : quand elle
         donne un livret complet (cycle 3 : CM1, CM2, 6e), la fiche doit dire où ça
         s'arrête ET ce qui n'est pas atteint (03/09). */
      echecs: echoue.map(f => f.nom),
      phrase: plusHaut
        ? 'Lit au niveau ' + plusHaut.nom
          + (rates.length ? ' — ' + et(rates) + (rates.length > 1 ? ' non atteints' : ' non atteint') : '')
          + '.'
        : (echoue.length ? et(echoue.map(f => f.nom)) + (echoue.length > 1 ? ' non atteints' : ' non atteint')
          + " : reprendre au niveau du dessous." : null)
    };
  }

  /* ---- Les dossiers ---- */
  function charger() {
    try {
      const b = localStorage.getItem(CLE);
      if (b) { const o = JSON.parse(b); if (o && Array.isArray(o.dossiers)) return o; }
    } catch (e) {}
    return { dossiers: [] };
  }
  function enregistrer(base) {
    try { localStorage.setItem(CLE, JSON.stringify(base)); } catch (e) {}
    return base;
  }
  function id() { return 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function depuisFiche(f) {
    return {
      id: id(), maj: Date.now(),
      nom: f.nom || '', prenom: f.prenom || '', naissance: f.naissance || '',
      classe: f.classeDage || '', classeCle: f.classeCle || '', classeCycle: f.classeCycle || null,
      age: f.age, tranche: f.tranche,
      langueScolarisation: f.langueScolarisation || '', langueMaternelle: f.langueMaternelle || '',
      fiche: f, tests: [], synthese: {}
    };
  }

  function nomComplet(d) {
    return ((d.prenom || '') + ' ' + (d.nom || '')).trim() || 'Dossier sans nom';
  }

  window.DOSSIERS = { CLE, ECHELLES, EXERCICES, DOMAINES, RANGS, echelleDe, valeurs, exercices,
    bilan, niveauAtteint, charger, enregistrer, id, depuisFiche, nomComplet };
})();
