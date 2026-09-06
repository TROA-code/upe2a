/* Les corrigés des tests, pour saisir LES RÉPONSES DE L'ÉLÈVE au lieu de noter
   soi-même chaque exercice. L'appli déduit ensuite MI / MF / MS / TBM.

   Ce fichier ne recopie pas les tests : il ne garde que ce qui est nécessaire pour
   reconnaître une réponse — les propositions à cocher et la bonne réponse.

   Types d'exercice :
     unique  → une seule bonne réponse parmi les propositions
     multi   → plusieurs bonnes réponses (la consigne le dit)
     ordre   → phrases à numéroter, rang attendu pour chacune
     paires  → éléments à relier à l'une des deux colonnes
     juge    → ne se saisit pas (lecture à voix haute, tracé sur un plan, dessin
               entouré) : l'enseignante répond aux questions posées, en clair.

   Règle de notation, la même partout : tout juste → TBM, au moins trois quarts → MS,
   au moins la moitié → MF, en dessous → MI. Une seule bonne réponse : juste → TBM,
   faux → MI. Rien de fragile pour un exercice à réponse unique : c'est juste ou non. */
(function () {
  const C = {
    /* Canopé — compréhension de l'écrit, cycle 3 (texte « Sami », un livret,
       trois paliers). Corrigé officiel Canopé,
       version française : les questions sont posées EN FRANÇAIS à l'écran, même quand
       l'élève a passé le test dans sa langue — les propositions se suivent dans le même
       ordre d'une langue à l'autre.

       Chaque exercice garde aussi sa version ANGLAISE (champs vo, voOptions,
       voPhrases, voElements) : elle s'affiche en petit sous le français, pour retrouver
       à coup sûr la ligne cochée sur un livret en anglais. Ordre strictement identique
       au français. */
    /* Sa feuille de décodage (reçue le 02/09) — « Lecture en alphabet latin ».
       Ce qu'elle en fait : elle CHOISIT des lettres, des syllabes, quelques chiffres,
       et vérifie surtout que l'élève sait lire les trois mots. Donc chaque ligne se juge
       à part, et « rien » veut dire « je ne l'ai pas fait lire », pas « il a échoué ». */
    'decodage-latin': [
      { num: '1', type: 'ouvert', question: 'Lecture à voix haute : lettres et syllabes',
        sous: [
          { libelle: 'Ligne 1 — capitales : A F G H M O U V' },
          { libelle: 'Ligne 2 — minuscules : b c d i j q t s' },
          { libelle: 'Ligne 3 — syllabes simples : pi ra dé bu ni mi to du' },
          { libelle: 'Ligne 4 — syllabes complexes : pil car son pli gar gra tro bul' },
          { libelle: 'Ligne 5 — graphèmes : un ou an en oi ien oin ille' }
        ],
        rubrique: 'lectureFrancais',
        constat: { ok: 'Lit les lettres et les syllabes de l\'alphabet latin.',
          non: 'Le déchiffrage des lettres et des syllabes n\'est pas installé.',
          rien: 'Non évalué' },
        aide: 'Cocher « rien » sur les lignes qu\'elle n\'a pas fait lire.' },
      { num: '2', type: 'ouvert', question: 'Lecture à voix haute : chiffres et nombres',
        sous: [
          { libelle: 'Ligne 1 : 13 · 32 · 1422 · 99 · 1 000 · 2 · 9 · 0,4' },
          { libelle: 'Ligne 2 : 49 · 4 · 0 · 100 · 34 · 221 · 3,14 · 997' },
          { libelle: 'Ligne 3 : 94 · 63 · 10 000 · 60 · 11 · 71 · 2002 · 77' }
        ],
        rubrique: 'mathsNombres',
        constat: { ok: 'Lit les nombres en chiffres, y compris les grands nombres et les décimaux.',
          non: 'La lecture des nombres en chiffres reste hésitante.',
          rien: 'Non évalué' } },
      { num: '3', type: 'ouvert',
        question: 'Quels mots sont exactement les mêmes que le modèle ?',
        sous: [
          { libelle: 'MAMAN → MAMAN (un seul)' },
          { libelle: 'BATEAU → BATEAU, BATEAU (deux)' },
          { libelle: 'PARTIR → PARTIR, PARTIR (deux)' }
        ],
        rubrique: 'lectureFrancais',
        constat: { ok: 'Discrimine visuellement les mots écrits en alphabet latin.',
          non: 'La discrimination visuelle des mots n\'est pas encore fiable.',
          rien: 'Non évalué' },
        aide: 'Attention : deux lignes sur trois ont DEUX bonnes réponses.' },
      { num: '4', type: 'bareme',
        question: 'Relier les mots en capitales à leur écriture en minuscules (six mots)',
        options: [['Les six appariements', 'TBM'], ['Cinq ou quatre', 'MS'],
          ['Trois ou deux', 'MF'], ['Un seul ou aucun', 'MI']],
        rubrique: 'lectureFrancais',
        constat: { ok: 'Fait le lien entre capitales et minuscules.',
          non: 'Le lien entre capitales et minuscules n\'est pas établi.' },
        aide: 'VÉLO · ANIMAL · TÉLÉPHONE · FOOTBALL · ÉCOLE · FILM' }
    ],
    /* CASNAV de Créteil — test FLSco pour le collège, conte « Les Trois Frères »
       (Jean Muzi). En français, pour les collégiens francophones : les réponses sont
       rédigées, chacune se juge juste / faux / rien. Les attendus viennent du texte. */
    'creteil-conte-college': [
      { num: '1', type: 'ouvert', question: "Ce texte est le début de : poésie / théâtre / conte + les mots qui le prouvent",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : conte — « Il était une fois »" },
      { num: '2', type: 'ouvert', question: "Où se passe cette histoire ?",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : dans un village du Mont-Liban" },
      { num: '3', type: 'ouvert', question: "Quels sont les personnages principaux ?",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : les deux paysans (le père et la mère), leur fille Warda, les trois frères" },
      { num: '4', type: 'ouvert', question: "« Ils possédaient un petit champ à la terre fertile. » — un verbe conjugué, un nom, un adjectif",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'expressionEcrite',
        aide: "Attendu : possédaient · champ ou terre · petit ou fertile" },
      { num: '5', type: 'ouvert', question: "Lignes 10 à 14 : un verbe au présent, un à l'imparfait, un au passé simple",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'expressionEcrite',
        aide: "Attendu : trouve (présent) · proposaient, haussait, lançait (imparfait) · finirent, épousèrent (passé simple)" },
      { num: '6', type: 'ouvert', question: "Mettre au pluriel : « Ce paysan avait une belle jeune fille à marier »",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'expressionEcrite',
        aide: "Attendu : Ces paysans avaient de belles jeunes filles à marier" },
      { num: '7', type: 'ouvert', question: "Lignes 6 à 7 : qui sont les « prétendants » ?",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : les garçons du village qui rêvent d'épouser Warda" },
      { num: '8', type: 'ouvert', question: "Quels cadeaux les prétendants proposent-ils ?",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : leur âne, leur dromadaire" },
      { num: '9', type: 'ouvert', question: "Vrai ou faux : « La mère est contente des cadeaux » + justification",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : faux — « La mère haussait les épaules », « on en trouve partout »" },
      { num: '10', type: 'ouvert', question: "Que vont faire les trois frères pour trouver un cadeau unique ?",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : partir en voyage, chacun de son côté, et se retrouver un an plus tard" },
      { num: '11', type: 'ouvert', question: "Passer au discours indirect : « C'est un cadeau unique au monde qu'il faut offrir à ma fille »",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'expressionEcrite',
        aide: "Attendu : …que c'était un cadeau unique au monde qu'il fallait offrir à sa fille" },
      { num: '12', type: 'ouvert', question: "Lignes 4 à 16 : quatre mots en rapport avec le mariage",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : se marier, épouser, prétendants, la main, épousèrent" },
      { num: '13', type: 'ouvert', question: "Lignes 8 à 14 : quatre pronoms mis à la place de « prétendants »",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'expressionEcrite',
        aide: "Attendu : les uns, les autres, leur, ils, en, celui" },
      { num: '14', type: 'ouvert', question: "Pourquoi ne reste-t-il que trois prétendants ? Deux raisons",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : la mère refuse tous leurs cadeaux ; ils se lassent et épousent d'autres jeunes filles" },
      { num: '15', type: 'ouvert', question: "Ligne 29 : recopier la comparaison",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : « rapide comme l'éclair »" },
      { num: '16', type: 'ouvert', question: "Le cheval plaira-t-il à la mère ? Réponse appuyée sur le texte",
        sous: [{ libelle: 'Sa réponse' }], rubrique: 'comprehensionEcrite',
        aide: "Attendu : non : un cheval n'est pas unique au monde — réponse argumentée attendue" },
      { num: '17', type: 'bareme', question: 'Production écrite (sujet 1 ou sujet 2)',
        options: [['Récit construit, 10 à 15 lignes, langue maîtrisée', 'TBM'],
          ['Récit compréhensible, quelques erreurs de langue', 'MS'],
          ['Quelques phrases, récit incomplet', 'MF'],
          ['Moins de trois phrases, ou hors sujet', 'MI']],
        rubrique: 'expressionEcrite',
        constat: { ok: 'Produit un récit construit et compréhensible à l\'écrit.',
          non: 'La production écrite reste très limitée.' },
        aide: 'Sujet 1 : le voyage du deuxième frère (10 lignes). Sujet 2 : le retour au village (15 lignes).' }
    ],
    /* Canopé — mathématiques, cycle 4 / FIN DE 5E, langue d'origine : français. Corrigé
       officiel (CASNAV de Corse, PDF 17066), reçu d'elle le 02/09. Même traitement que
       les autres : barème officiel repris tel quel quand il est gradué, paliers ajoutés
       quand il est binaire, « rien écrit » en dernière ligne. */
    'canope-maths-5e': [
      { num: '1', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '1 et 4', question: 'Priorités opératoires : 15 − 7 × 2 et 13 − 3 × (15 − 12)',
        options: [['Les 2 réponses exactes (1 et 4)', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Réponses 16 et 30 (calcul de gauche à droite)', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'C\'est le barème officiel : il repère lui-même l\'erreur « de gauche à droite » (16 et 30) et la note MF.',
        rubrique: 'mathsNombres',
        constat: { court: 'les priorités opératoires',
          ok: 'Maîtrise les priorités opératoires.',
          mf: 'Calcule de gauche à droite sans tenir compte des priorités opératoires.',
          non: 'Les priorités opératoires ne sont pas installées.' } },
      { num: '2', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'A = 14', question: 'A = 6 + 2y : calculer A pour y = 4',
        options: [['A = 14', 'TBM'], ['Substitution juste, erreur de calcul', 'MS'],
          ['Écrit 6 + 2 × 4 sans conclure', 'MF'],
          ['Ne sait pas remplacer y', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'le calcul d\'une expression littérale',
          ok: 'Sait calculer une expression littérale pour une valeur donnée.',
          mf: 'Remplace la lettre par sa valeur sans mener le calcul à terme.',
          non: 'Le calcul d\'une expression littérale n\'est pas acquis.' } },
      { num: '3', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '− x + 7 · 2 × x − 12 · 6 × a + 24', question: 'Entourer : x + 7 − 2x · 2 × (x − 6) · 3 × (2a + 8)',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : − x + 7 · 2 × x − 12 · 6 × a + 24. Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'la réduction et le développement d\'expressions littérales',
          ok: 'Sait réduire et développer une expression littérale.',
          mf: 'Le calcul littéral est amorcé, sans fiabilité.',
          non: 'Le calcul littéral n\'est pas installé.' } },
      { num: '4', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '7/15 et 10/21', question: 'Fractions : 2/5 + 1/15 et 5/7 × 2/3',
        options: [['Les 2 réponses exactes (7/15 et 10/21)', 'TBM'],
          ['1 réponse exacte', 'MS'],
          ['Additionne numérateurs et dénominateurs entre eux', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Toute fraction égale non simplifiée est acceptée (corrigé officiel). Barème : 2 → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'le calcul avec les fractions',
          ok: 'Maîtrise le calcul avec les fractions.',
          mf: 'Additionne les fractions sans les mettre au même dénominateur.',
          non: 'Le calcul avec les fractions n\'est pas maîtrisé.' } },
      { num: '5', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '− 10 · − 7 · 4', question: 'Relatifs : − 7 − 3 · 8 − 15 · − 4 + 5 − 7 + 10',
        options: [['Les 3 réponses exactes (− 10 · − 7 · 4)', 'TBM'],
          ['1 ou 2 réponses exactes', 'MS'],
          ['Ignore les signes (additionne tout)', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 3 → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'le calcul avec les nombres relatifs',
          ok: 'Maîtrise le calcul avec les nombres relatifs.',
          mf: 'Calcule sans tenir compte des signes.',
          non: 'Le calcul avec les nombres relatifs n\'est pas maîtrisé.' } },
      { num: '6', type: 'unique',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '52,50 €', question: 'Tableau de proportionnalité : 6 livres = 21 €, 15 livres = ?',
        options: ['21', '52,50', '45', '27', '8,50', 'Rien entouré'],
        bonne: '52,50',
        presque: { '45': 'MF' },
        aide: 'Barème officiel : exact → TBM, autre → MI. « 45 » (on ajoute 9 au prix comme on ajoute 9 livres) montre un raisonnement additif.',
        rubrique: 'mathsDonnees',
        constat: { court: 'la proportionnalité',
          ok: 'Sait compléter un tableau de proportionnalité.',
          mf: 'Raisonne de façon additive au lieu de multiplicative.',
          non: 'La proportionnalité n\'est pas acquise.' } },
      { num: '7', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '40 €', question: 'Un pull à 50 € soldé de 20 % : combien vais-je payer ?',
        options: [['40 €', 'TBM'], ['« 10 € » : calcule la réduction, pas le prix payé', 'MS'],
          ['Retire 20 € (confond % et euros)', 'MF'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 40 € → TBM, « 10 € » → MS, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'les pourcentages',
          ok: 'Sait appliquer un pourcentage de réduction.',
          mf: 'Confond le pourcentage et une somme en euros.',
          non: 'Les pourcentages ne sont pas acquis.' } },
      { num: '8', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '12 m² et 9 × π cm²', question: 'Entourer l\'aire du triangle, puis celle du disque',
        options: [['Les 2 réponses exactes (12 m² et 9 × π cm²)', 'TBM'],
          ['1 réponse exacte', 'MS'],
          ['Confond aire et périmètre', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 2 → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'le calcul des aires',
          ok: 'Connaît les formules d\'aire du triangle et du disque.',
          mf: 'Confond aire et périmètre.',
          non: 'Les formules d\'aire ne sont pas installées.' } },
      { num: '9', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'A (5 ; 4) · B (− 3 ; − 4) · C (− 5,5 ; 0), puis E, F, G placés', question: 'Repérage : lire les coordonnées de A, B, C puis placer E, F, G',
        options: [['5 ou 6 réponses exactes', 'TBM'], ['4 réponses exactes', 'MS'],
          ['2 ou 3 réponses exactes', 'MF'], ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : A (5 ; 4), B (− 3 ; − 4), C (− 5,5 ; 0). C\'est le barème officiel.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le repérage dans le plan',
          ok: 'Sait lire et placer des points dans un repère.',
          mf: 'Le repérage dans le plan est amorcé (abscisse et ordonnée encore confondues).',
          non: 'Le repérage dans le plan n\'est pas acquis.' } },
      { num: '10', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'la figure retournée autour du point O', question: 'Tracer le symétrique de la figure par rapport au point O',
        options: [['Symétrique exact', 'TBM'],
          ['Figure juste, décalée d\'un carreau', 'MS'],
          ['Fait une symétrie axiale au lieu d\'une symétrie centrale', 'MF'],
          ['Tracé sans rapport', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : exact → TBM, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la symétrie centrale',
          ok: 'Sait construire le symétrique d\'une figure par rapport à un point.',
          mf: 'Confond symétrie centrale et symétrie axiale.',
          non: 'La symétrie centrale n\'est pas acquise.' } },
      { num: '11', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '80°', question: 'Triangle MAT : calculer l\'angle manquant (40° et 60°)',
        options: [['80°, avec la démarche', 'TBM'], ['80° sans démarche', 'MS'],
          ['Utilise la somme des angles mais se trompe dans le calcul', 'MF'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : exact → TBM, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la somme des angles d\'un triangle',
          ok: 'Sait calculer un angle avec la somme des angles d\'un triangle.',
          mf: 'Connaît la propriété des angles du triangle sans savoir l\'appliquer.',
          non: 'La somme des angles d\'un triangle n\'est pas connue.' } }
    ],
    /* Canopé — mathématiques, cycle 4 / FIN DE 3E (le « fin de cycle 4 » officiel).
       Corrigé officiel (CASNAV de Corse, PDF 17231), reçu d'elle le 02/09.
       L'exercice 9 porte trois notes dans le corrigé (aires, volumes, coefficients) :
       il est donc saisi en trois lignes, 9a, 9b et 9c. */
    'canope-maths-c4': [
      { num: '1', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'faux · vrai · faux · vrai', question: 'Vrai ou faux : multiples et diviseurs (4 affirmations)',
        options: [['Les 4 réponses exactes', 'TBM'], ['3 réponses exactes', 'MS'],
          ['2 réponses exactes', 'MF'], ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : faux · vrai · faux · vrai. Barème officiel : 4 → TBM, 3 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'les multiples et les diviseurs',
          ok: 'Maîtrise le vocabulaire des multiples et des diviseurs.',
          mf: 'Confond encore multiple et diviseur.',
          non: 'Le vocabulaire des multiples et des diviseurs n\'est pas installé.' } },
      { num: '2', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '(2a − 1)(4a + 3) et (3a + 1)a', question: 'Factoriser : deux expressions à facteur commun',
        options: [['Les 2 réponses exactes', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Développe au lieu de factoriser', 'MF'],
          ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : (2a − 1)(4a + 3) et (3a + 1)a. Barème officiel : 2 → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'la factorisation',
          ok: 'Sait factoriser en repérant un facteur commun.',
          mf: 'Développe au lieu de factoriser.',
          non: 'La factorisation n\'est pas acquise.' } },
      { num: '3', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '4a² + 12a + 9 et 25a² − 9', question: 'Identités remarquables : (2a + 3)² et (5a + 3)(5a − 3)',
        options: [['Les 2 réponses exactes', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Oublie le double produit (4a² + 9)', 'MF'],
          ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 4a² + 12a + 9 et 25a² − 9. Barème officiel : 2 → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'les identités remarquables',
          ok: 'Connaît les identités remarquables.',
          mf: 'Oublie le double produit dans le carré d\'une somme.',
          non: 'Les identités remarquables ne sont pas connues.' } },
      { num: '4', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'x = − 3/4 et x = 6', question: 'Résoudre : (4x + 3)(3x − 18) = 0',
        options: [['Les 2 solutions (− 3/4 et 6)', 'TBM'], ['1 seule solution', 'MS'],
          ['Développe au lieu d\'utiliser l\'équation produit', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'C\'est le barème officiel : les 2 solutions → TBM, une seule → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'l\'équation produit',
          ok: 'Sait résoudre une équation produit.',
          mf: 'Ne reconnaît pas l\'équation produit et développe.',
          non: 'La résolution d\'une équation produit n\'est pas acquise.' } },
      { num: '5', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'f(5) = 3 · f(− 3) = 1 · g : − 1 · 1 · 1,5', question: 'Lire f(5) et f(− 3) sur un graphique, puis compléter le tableau de g',
        options: [['Les 5 réponses exactes', 'TBM'], ['3 ou 4 réponses exactes', 'MS'],
          ['1 ou 2 réponses exactes', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : f(5) = 3, f(− 3) = 1 ; g : − 1 · 1 · 1,5. Barème officiel : 5 → TBM, 4 ou 3 → MS, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'la lecture d\'images d\'une fonction',
          ok: 'Sait lire l\'image d\'un nombre sur un graphique et dans un tableau.',
          mf: 'La lecture graphique d\'une image est amorcée (axes encore confondus).',
          non: 'La notion d\'image par une fonction n\'est pas installée.' } },
      { num: '6', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'les trois droites correctement identifiées', question: 'Colorier les représentations graphiques de f, g et h',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'la lecture graphique des fonctions linéaires et affines',
          ok: 'Reconnaît la représentation graphique d\'une fonction linéaire ou affine.',
          mf: 'Distingue mal les droites d\'une fonction linéaire et d\'une fonction affine.',
          non: 'La représentation graphique des fonctions n\'est pas maîtrisée.' } },
      { num: '7', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'les trois rapports trigonométriques exacts', question: 'Trigonométrie : sin JKL, cos LJK et JL à entourer',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la trigonométrie dans le triangle rectangle',
          ok: 'Connaît les rapports trigonométriques du triangle rectangle.',
          mf: 'Confond les rapports trigonométriques entre eux.',
          non: 'La trigonométrie n\'est pas installée.' } },
      { num: '8', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'EG = 3 cm', question: 'Thalès : compléter les rapports et calculer EG',
        options: [['Les 3 réponses exactes (EG = 3 cm)', 'TBM'], ['2 réponses exactes', 'MS'],
          ['Rapports écrits, calcul non mené', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Justification attendue : EG = (4 × 4,5) ÷ 6. Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le théorème de Thalès',
          ok: 'Sait appliquer le théorème de Thalès.',
          mf: 'Écrit les rapports de Thalès sans mener le calcul.',
          non: 'Le théorème de Thalès n\'est pas acquis.' } },
      { num: '9a', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '4 m² et 36 m²', question: 'Agrandissement — les aires : aire ABCD et aire EFGH',
        options: [['Les 2 réponses exactes (4 m² et 36 m²)', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Confond aire et périmètre', 'MF'], ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'C\'est le barème officiel des questions a et b, partie aires.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'le calcul des aires d\'un cube',
          ok: 'Sait calculer l\'aire d\'une face de cube.',
          mf: 'Confond aire et périmètre.',
          non: 'Le calcul d\'aire n\'est pas acquis.' } },
      { num: '9b', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '8 m³ et 216 m³', question: 'Agrandissement — les volumes : volume C1 et volume C2',
        options: [['Les 2 réponses exactes (8 m³ et 216 m³)', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Confond volume et aire', 'MF'], ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'C\'est le barème officiel des questions a et b, partie volumes.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'le calcul du volume d\'un cube',
          ok: 'Sait calculer le volume d\'un cube.',
          mf: 'Confond volume et aire.',
          non: 'Le calcul du volume d\'un cube n\'est pas acquis.' } },
      { num: '9c', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'a = 9 et b = 27', question: 'Agrandissement — les coefficients a (aires) et b (volumes)',
        options: [['Les 2 réponses exactes (a = 9 et b = 27)', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Donne le rapport des longueurs (3) pour les deux', 'MF'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'C\'est le barème officiel de la question c.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'l\'effet d\'un agrandissement sur les aires et les volumes',
          ok: 'Comprend l\'effet d\'un agrandissement sur les aires et les volumes.',
          mf: 'Applique le rapport des longueurs aux aires et aux volumes.',
          non: 'L\'effet d\'un agrandissement sur les aires et les volumes n\'est pas compris.' } }
    ],
    /* Canopé — mathématiques, cycle 4 / FIN DE 4E, langue d'origine : français. Corrigé
       officiel (CASNAV de Corse, PDF 17150), reçu d'elle le 02/09.
       Même traitement que le cycle 3 : quand le barème officiel est déjà gradué (4 exactes
       → TBM, 3 → MS, 2 → MF), il est repris tel quel ; quand il est binaire (« exact →
       TBM, autre → MI »), on ajoute des paliers qui décrivent ce qu'on voit sur la
       feuille. Dernière ligne toujours « rien écrit ». */
    'canope-maths-4e': [
      { num: '1', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '− 35 · 24 · − 8 · − 7', question: 'Nombres relatifs : − 5 × 7 · − 3 × (− 8) · (− 16) ÷ (+ 2) · (+ 21) ÷ (− 3)',
        options: [['Les 4 réponses exactes', 'TBM'], ['3 réponses exactes', 'MS'],
          ['2 réponses exactes', 'MF'], ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : − 35 · 24 · − 8 · − 7. C\'est le barème officiel.',
        rubrique: 'mathsNombres',
        constat: { court: 'le calcul avec les nombres relatifs',
          ok: 'Maîtrise le calcul avec les nombres relatifs.',
          mf: 'Calcule avec les relatifs, mais la règle des signes reste fragile.',
          non: 'Le calcul avec les nombres relatifs n\'est pas maîtrisé.' } },
      { num: '2', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '46/15 · 1/2 · 3/2 · 2/3', question: 'Fractions : 2/5 + 8/3 · 4/7 − 1/14 · 2/3 + 1/2 × 5/3 · 1/2 ÷ 3/4',
        options: [['Les 4 réponses exactes', 'TBM'], ['3 réponses exactes', 'MS'],
          ['2 réponses exactes', 'MF'], ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 46/15 · 1/2 · 3/2 · 2/3. Toute fraction égale non simplifiée est acceptée (corrigé officiel).',
        rubrique: 'mathsNombres',
        constat: { court: 'le calcul avec les fractions',
          ok: 'Maîtrise le calcul avec les fractions.',
          mf: 'Calcule avec les fractions, sans fiabilité (mise au même dénominateur, division).',
          non: 'Le calcul avec les fractions n\'est pas maîtrisé.' } },
      { num: '3', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '8 · 10 · 5¹² · 3³ (soit 27)', question: 'Puissances : 2³ · 10⁻³ × 10⁴ · 5⁴ˣ³ · 3⁸ ÷ 3⁵',
        options: [['Les 4 réponses exactes', 'TBM'], ['3 réponses exactes', 'MS'],
          ['2 réponses exactes', 'MF'], ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 8 · 10 · 5¹² · 3³ (soit 27). C\'est le barème officiel.',
        rubrique: 'mathsNombres',
        constat: { court: 'les puissances',
          ok: 'Maîtrise le calcul avec les puissances.',
          mf: 'Connaît la notation des puissances, mais pas les règles de calcul.',
          non: 'Le calcul avec les puissances n\'est pas maîtrisé.' } },
      { num: '4', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'x = 1/2', question: 'Résoudre : 16x − 5 = 3',
        options: [['x = 1/2 (ou 0,5), avec les étapes', 'TBM'],
          ['Bonne réponse sans étapes écrites', 'MS'],
          ['Isole bien x mais se trompe dans le quotient final', 'MS'],
          ['Amorce la résolution (16x = 8) sans conclure', 'MF'],
          ['Ne sait pas résoudre une équation', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI. Les paliers sont une lecture du brouillon.',
        rubrique: 'mathsNombres',
        constat: { court: 'la résolution d\'une équation du premier degré',
          ok: 'Sait résoudre une équation du premier degré.',
          mf: 'Amorce la résolution d\'une équation sans la mener à terme.',
          non: 'La résolution d\'une équation du premier degré n\'est pas acquise.' } },
      { num: '5', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'vrai · faux · vrai', question: 'Vrai ou faux : trois encadrements en écriture scientifique',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : vrai · faux · vrai. C\'est le barème officiel (3 → TBM, 2 → MS, autre → MI).',
        rubrique: 'mathsNombres',
        constat: { court: "l'ordre de grandeur d'une écriture scientifique",
          ok: 'Sait situer un nombre écrit en notation scientifique.',
          non: 'La notation scientifique et les ordres de grandeur ne sont pas installés.' } },
      { num: '6', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '10x² + 6x − 28 et 3x² + 10x + 8', question: 'Développer : (2x + 4)(5x − 7) et (3x + 4)(x + 2)',
        options: [['Les 2 réponses exactes', 'TBM'], ['1 réponse exacte', 'MS'],
          ['Développe partiellement (oublie un produit)', 'MF'],
          ['Aucune des deux', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 10x² + 6x − 28 et 3x² + 10x + 8. Barème officiel : 2 → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'le développement d\'un produit',
          ok: 'Sait développer un produit de deux facteurs.',
          mf: 'Amorce la double distributivité sans la mener au bout.',
          non: 'La double distributivité n\'est pas acquise.' } },
      { num: '7', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '5 km', question: 'Moyenne : 3 jours à 5 km, 1 jour à 1 km, 2 jours à 7 km',
        options: [['5 km par jour', 'TBM'],
          ['Total juste (30 km), divisé par un mauvais nombre de jours', 'MS'],
          ['Fait la moyenne des trois valeurs (5, 1, 7) sans pondérer', 'MF'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'le calcul d\'une moyenne',
          ok: 'Sait calculer une moyenne.',
          mf: 'Calcule une moyenne simple, sans tenir compte des effectifs.',
          non: 'Le calcul d\'une moyenne n\'est pas acquis.' } },
      { num: '8', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '10 cm³', question: 'Calculer le volume du solide (3 cm · 2 cm · 5 cm)',
        options: [['10 cm³', 'TBM'],
          ['Valeur juste, unité oubliée ou en cm²', 'MS'],
          ['Multiplie les trois côtes (30 cm³) : traite la figure comme un pavé', 'MF'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'La figure est une pyramide : (3 × 2) × 5 ÷ 3 = 10 cm³. L\'erreur classique est de multiplier les trois côtes (30 cm³), comme pour un pavé.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'le calcul d\'un volume',
          ok: 'Sait calculer le volume d\'un solide.',
          mf: 'Reconnaît qu\'il faut multiplier des longueurs, sans identifier le solide.',
          non: 'Le calcul d\'un volume n\'est pas acquis.' } },
      { num: '9', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '1 h 15 min', question: '150 km à 120 km/h : combien de temps ?',
        options: [['1,25 h (ou 1 h 15 min)', 'TBM'],
          ['« 1 h 25 min » : bon quotient, mal converti', 'MS'],
          ['Divise dans le mauvais sens (0,8)', 'MF'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : exact → TBM, « 1 h 25 min » → MS, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'les calculs de vitesse et de durée',
          ok: 'Sait calculer une durée à partir d\'une distance et d\'une vitesse.',
          mf: 'Le lien entre distance, vitesse et durée reste fragile.',
          non: 'Les calculs de vitesse et de durée ne sont pas acquis.' } },
      { num: '10', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'AC = 8 cm', question: 'Triangle rectangle : calculer AC (BC = 10 cm, AB = 6 cm)',
        options: [['AC = 8 cm, avec la démarche', 'TBM'],
          ['8 sans démarche, ou oubli de l\'unité', 'MS'],
          ['Additionne les carrés au lieu de les soustraire (√136)', 'MF'],
          ['N\'utilise pas Pythagore', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le théorème de Pythagore',
          ok: 'Sait appliquer le théorème de Pythagore.',
          mf: 'Connaît le théorème de Pythagore, mais l\'applique mal.',
          non: 'Le théorème de Pythagore n\'est pas acquis.' } }
    ],
    /* Canopé — mathématiques, cycle 3, langue d'origine : français. Corrigé officiel
       (CASNAV de Corse, PDF 16988), relevé le 02/09.
       ⚠ Le barème officiel est presque partout binaire : « réponse exacte → TBM, autre
       → MI ». Trop binaire pour être utile (sa remarque du 02/09) : une multiplication
       bien posée avec une erreur de retenue ne dit pas la même chose qu'une élève qui
       ne sait pas poser. Chaque exercice propose donc des PALIERS — le résultat exact
       reste le TBM officiel, les lignes intermédiaires sont ma lecture, et la dernière
       ligne dit toujours « rien écrit ». Comme les réponses sont posées, tracées ou
       mesurées, on choisit la ligne qui décrit ce qu'on voit sur la feuille. */
    'canope-maths-c3': [
      { num: '1', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '10 395', question: 'Calcule : 297 × 35',
        options: [['Résultat exact (10 395)', 'TBM'],
          ['Bien posée, produits partiels justes, erreur dans l\'addition finale', 'MS'],
          ['Bien posée, mais erreur de table ou de retenue', 'MF'],
          ['Ne sait pas poser (pas de décalage, chiffres alignés au hasard)', 'MI'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Rien écrit', 'MI']],
        aide: 'Barème officiel : exact → TBM, autre → MI. Les paliers intermédiaires sont une lecture de ce qui est écrit.',
        rubrique: 'mathsNombres',
        constat: { court: 'la multiplication posée à deux chiffres',
          sansPoser: 'Écrit un résultat de multiplication sans poser l\'opération : la technique n\'est pas installée.',
          ok: 'Sait poser et calculer une multiplication à deux chiffres.',
          mf: 'Pose la multiplication à deux chiffres, mais le calcul reste fragile.',
          non: 'La multiplication posée à deux chiffres n\'est pas maîtrisée.' } },
      { num: '2', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '136', question: 'Pose et effectue : 408 ÷ 3',
        options: [['Résultat exact (136)', 'TBM'],
          ['Technique juste, une erreur de calcul', 'MS'],
          ['Amorce la division mais ne la termine pas', 'MF'],
          ['Ne sait pas poser une division', 'MI'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Rien écrit', 'MI']],
        aide: 'Toute procédure de division est acceptée si elle conduit au résultat exact.',
        rubrique: 'mathsNombres',
        constat: { court: 'la division posée',
          sansPoser: 'Écrit un résultat de division sans poser l\'opération : la technique n\'est pas installée.',
          ok: 'Sait poser et calculer une division.',
          mf: 'Amorce une division posée sans la mener à terme.',
          non: 'La division posée n\'est pas maîtrisée.' } },
      { num: '3', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '191,37', question: 'Pose et effectue : 164,8 + 26,57',
        options: [['Résultat exact (191,37)', 'TBM'],
          ['Virgules bien alignées, erreur de retenue', 'MS'],
          ['Virgules non alignées (chiffres cadrés à droite)', 'MF'],
          ['Ne sait pas poser', 'MI'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Rien écrit', 'MI']],
        rubrique: 'mathsNombres',
        constat: { court: 'l\'addition posée de décimaux',
          sansPoser: 'Écrit un résultat sans poser l\'addition : la technique n\'est pas installée.',
          ok: 'Sait additionner des nombres décimaux en les posant.',
          mf: 'Additionne des décimaux sans aligner les virgules.',
          non: 'L\'addition posée de décimaux n\'est pas maîtrisée.' } },
      { num: '4', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '9,18', question: 'Pose et effectue : 37,9 − 28,72',
        options: [['Résultat exact (9,18)', 'TBM'],
          ['Virgules bien alignées, erreur d\'emprunt', 'MS'],
          ['Virgules non alignées, ou soustraction chiffre à chiffre du plus petit', 'MF'],
          ['Ne sait pas poser', 'MI'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Rien écrit', 'MI']],
        rubrique: 'mathsNombres',
        constat: { court: 'la soustraction posée de décimaux',
          sansPoser: 'Écrit un résultat sans poser la soustraction : la technique n\'est pas installée.',
          ok: 'Sait soustraire des nombres décimaux en les posant.',
          mf: 'Soustrait des décimaux sans aligner les virgules.',
          non: 'La soustraction posée de décimaux n\'est pas maîtrisée.' } },
      /* Le seul exercice où la réponse de l'élève est lisible telle quelle : on saisit
         ce qu'elle a entouré, et la fraction entourée dit l'erreur. */
      { num: '5', type: 'unique',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '54/10', question: 'Entoure la fraction égale à 5,4',
        options: ['9/10', '54/100', '54/10', '4/5', '5/4', 'Rien entouré'],
        bonne: '54/10',
        presque: { '54/100': 'MS', '5/4': 'MF', '4/5': 'MF' },
        aide: 'Le bon numérateur avec le mauvais dénominateur (54/100) montre que la fraction décimale est amorcée.',
        rubrique: 'mathsNombres',
        constat: { court: 'le lien entre décimal et fraction',
          ok: 'Fait le lien entre un décimal et sa fraction décimale.',
          mf: 'Reconnaît les chiffres du décimal, mais pas sa fraction.',
          non: 'Le lien entre décimal et fraction n\'est pas établi.' } },
      { num: '6', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '22', question: 'Paul a 43 bonbons, Anne 65 : combien Anne en a-t-elle de plus ?',
        options: [['22, avec l\'opération écrite', 'TBM'],
          ['22 sans opération, ou bonne opération et erreur de calcul', 'MS'],
          ['Additionne au lieu de soustraire (108)', 'MF'],
          ['Autre réponse', 'MI'],
          ['Rien écrit', 'MI']],
        rubrique: 'mathsDonnees',
        constat: { court: 'les problèmes de comparaison',
          ok: 'Résout un problème de comparaison.',
          mf: 'Choisit la mauvaise opération dans un problème de comparaison.',
          non: 'Ne résout pas encore un problème de comparaison.' } },
      { num: '7', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '6 € et 16 €', question: 'Compléter le tableau de prix (12 € · 18 €)',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 6 € et 16 €. Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'les tableaux de proportionnalité',
          ok: 'Sait compléter un tableau de proportionnalité.',
          mf: 'Complète une case du tableau de prix, sans tenir la proportionnalité.',
          non: 'La lecture d\'un tableau de prix n\'est pas encore assurée.' } },
      { num: '8', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '4/5, puis les 3/4 coloriés', question: 'Fractions de bande : écrire la fraction coloriée, puis colorier les 3/4',
        options: [['Les 2 réponses exactes', 'TBM'],
          ['Écrit 4/5, mais colorie mal les 3/4', 'MS'],
          ['Colorie les 3/4 sans savoir écrire la fraction', 'MF'],
          ['Aucune des deux', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 4/5 pour la première bande. Barème officiel : 2 → TBM, 1 → MF, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'la lecture et le tracé des fractions',
          ok: 'Lit et représente une fraction simple.',
          mf: 'Représente une fraction sans savoir l\'écrire.',
          non: 'La notion de fraction n\'est pas installée.' } },
      { num: '9', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '3,01 · 3,026 · 3,2 · 3,235', question: 'Ranger : 3,2 · 3,01 · 3,235 · 3,026',
        options: [['Ordre exact (3,01 · 3,026 · 3,2 · 3,235)', 'TBM'],
          ['Une seule inversion', 'MS'],
          ['Compare les décimales comme des entiers (3,2 rangé en dernier)', 'MF'],
          ['Ordre sans rapport', 'MI'], ['Rien écrit', 'MI']],
        rubrique: 'mathsNombres',
        constat: { court: 'le rangement des décimaux',
          ok: 'Sait ranger des nombres décimaux.',
          mf: 'Compare les parties décimales comme des nombres entiers.',
          non: 'Le rangement des nombres décimaux n\'est pas maîtrisé.' } },
      { num: '10', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'un tiers de la bande colorié', question: 'Colorier le tiers de la bande',
        options: [['Un tiers exact colorié', 'TBM'],
          ['Trois parts égales tracées, mais colorie autre chose', 'MS'],
          ['Colorie une part sur un découpage inégal', 'MF'],
          ['Colorie au hasard', 'MI'], ['Rien écrit', 'MI']],
        rubrique: 'mathsNombres',
        constat: { court: 'le partage en parts égales',
          ok: 'Sait représenter un tiers.',
          mf: 'Partage la bande sans faire des parts égales.',
          non: 'Ne sait pas encore représenter un tiers.' } },
      { num: '11', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '178,92', question: 'Pose et effectue : 49,7 × 3,6',
        options: [['Résultat exact (178,92)', 'TBM'],
          ['Chiffres justes (17892), virgule mal placée', 'MS'],
          ['Bien posée, erreur de table ou de retenue', 'MF'],
          ['Ne sait pas poser', 'MI'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Rien écrit', 'MI']],
        rubrique: 'mathsNombres',
        constat: { court: 'la multiplication de décimaux',
          sansPoser: 'Écrit un résultat sans poser la multiplication : la technique n\'est pas installée.',
          ok: 'Sait multiplier des nombres décimaux.',
          ms: 'Multiplie des décimaux, mais place mal la virgule.',
          non: 'La multiplication de décimaux n\'est pas maîtrisée.' } },
      /* Une seule réponse attendue : 1/4 = 0,25 (relu avec elle le 03/09 — l'énoncé ne
         demande pas deux égalités). On saisit donc ce que l'élève a écrit. */
      { num: '12', type: 'unique',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '0,25', question: 'Compléter l\'égalité : 1/4 = …',
        options: ['0,25', '0,4', '0,14', '1,4', '4', 'Rien écrit'], bonne: '0,25',
        presque: { '0,4': 'MF', '0,14': 'MF' },
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI. « 0,4 » et « 0,14 » montrent une lecture chiffre à chiffre de la fraction.',
        rubrique: 'mathsNombres',
        constat: { court: 'le passage entre fraction et décimal',
          ok: 'Passe d\'une écriture fractionnaire à une écriture décimale.',
          mf: 'Le passage entre fraction et décimal est amorcé, sans être fiable.',
          non: 'Le passage entre fraction et décimal n\'est pas acquis.' } },
      { num: '13', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '3 boîtes et 2 œufs', question: '20 œufs dans des boîtes de 6 : boîtes remplies, œufs restants',
        options: [['3 boîtes et 2 œufs', 'TBM'],
          ['3 boîtes, reste faux ou absent', 'MS'],
          ['Reste juste, nombre de boîtes faux', 'MF'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : TBM dès une réponse exacte.',
        rubrique: 'mathsDonnees',
        constat: { court: 'les problèmes de division avec reste',
          ok: 'Résout un problème de division avec reste.',
          mf: 'Amorce le partage, sans traiter le reste.',
          non: 'Ne résout pas encore un problème de division avec reste.' } },
      { num: '14', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '1500 g · 0,5 h · 300 s · 3,8 l · 2300 m', question: 'Compléter les conversions (kg, min, s, cl, km)',
        options: [['Les 5 réponses exactes', 'TBM'], ['3 ou 4 réponses exactes', 'MS'],
          ['2 réponses exactes', 'MF'], ['1 ou aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 1500 g · 0,5 h · 300 s · 3,8 l · 2300 m. C\'est le barème officiel.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'les conversions d\'unités',
          ok: 'Maîtrise les conversions d\'unités usuelles.',
          mf: 'Quelques conversions d\'unités sont installées, pas toutes.',
          non: 'Les conversions d\'unités ne sont pas maîtrisées.' } },
      { num: '15', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '≈ 124°', question: 'Mesurer un angle au rapporteur',
        options: [['≈ 124°, à 5° près', 'TBM'],
          ['≈ 56° (rapporteur lu à l\'envers)', 'MS'],
          ['Autre mesure (rapporteur mal placé)', 'MF'],
          ['Ne se sert pas du rapporteur', 'MI'], ['Rien écrit', 'MI']],
        /* Le corrigé officiel donne ≈ 124° (et 56° pour le rapporteur lu à l'envers),
           mais elle mesure 146° sur sa feuille imprimée (03/09) : une impression « ajustée
           à la page » change l'angle. On note donc par rapport à SA feuille, pas à une
           valeur en dur. */
        aide: 'Valeur du corrigé officiel : ≈ 124° → TBM, ≈ 56° (rapporteur lu à l\'envers) → MS, autre → MI. À revérifier au rapporteur sur la feuille imprimée : une impression mise à l\'échelle modifie l\'angle.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'la mesure des angles au rapporteur',
          ok: 'Sait mesurer un angle au rapporteur.',
          mf: 'Se sert du rapporteur sans le placer correctement.',
          non: 'L\'usage du rapporteur n\'est pas acquis.' } },
      { num: '16', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'triangle rectangle · losange · triangle équilatéral', question: 'Entourer le nom de chaque figure',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : triangle rectangle · losange · triangle équilatéral. Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le nom des figures usuelles',
          ok: 'Reconnaît et nomme les figures usuelles.',
          mf: 'Nomme une figure usuelle, le vocabulaire reste partiel.',
          non: 'Le vocabulaire des figures usuelles n\'est pas installé.' } },
      { num: '17', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'perpendiculaire en vert, parallèle en rouge, passant par E', question: 'Tracer la perpendiculaire (vert) et la parallèle (rouge) passant par E',
        options: [['Les deux droites justes, aux bonnes couleurs', 'TBM'],
          ['Les deux droites justes, couleurs inversées ou oubliées', 'MS'],
          ['Une seule droite juste', 'MS'],
          ['Deux droites tracées, aucune juste (sans équerre)', 'MF'],
          ['Rien écrit', 'MI']],
        aide: 'Barème officiel : les deux → TBM, une seule → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le tracé des perpendiculaires et des parallèles',
          ok: 'Sait tracer perpendiculaires et parallèles.',
          mf: 'Trace à main levée, sans se servir de l\'équerre.',
          non: 'Le tracé des perpendiculaires et des parallèles n\'est pas acquis.' } },
      { num: '18', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: '5 faces, 9 arêtes, 6 sommets', question: 'Faces, arêtes et sommets du solide',
        options: [['Les 3 réponses exactes', 'TBM'], ['2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'], ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Attendu : 5 faces, 9 arêtes, 6 sommets. Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la description des solides',
          ok: 'Décrit un solide (faces, arêtes, sommets).',
          mf: 'Compte une des trois grandeurs du solide.',
          non: 'Le vocabulaire des solides n\'est pas installé.' } },
      { num: '19', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'la figure retournée de l\'autre côté de la droite', question: 'Tracer le symétrique de la figure par rapport à la droite',
        options: [['Symétrique exact', 'TBM'],
          ['Figure juste, décalée d\'un carreau', 'MS'],
          ['Figure recopiée sans être retournée', 'MF'],
          ['Tracé sans rapport', 'MI'], ['Rien écrit', 'MI']],
        rubrique: 'mathsGeometrie',
        constat: { court: 'la symétrie axiale',
          ok: 'Sait construire un symétrique par rapport à une droite.',
          mf: 'Recopie la figure au lieu de la retourner : la symétrie n\'est pas comprise.',
          non: 'La symétrie axiale n\'est pas acquise.' } },
      { num: '20', type: 'bareme',
        /* la réponse attendue, affichée à l'étape 3 : plus besoin du corrigé papier */
        attendu: 'un triangle de 8 cm, 6 cm et 5 cm de côté', question: 'Construire le triangle EFG (8 cm, 6 cm, 5 cm)',
        options: [['Les trois côtés justes, au millimètre près', 'TBM'],
          ['Deux côtés justes', 'MS'],
          ['Triangle tracé, longueurs fausses (tracé sans compas)', 'MF'],
          ['Pas de triangle', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Mesurer les côtés du triangle tracé par l\'élève.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la construction du triangle au compas',
          ok: 'Sait construire un triangle au compas à partir de trois longueurs.',
          mf: 'Trace un triangle sans reporter les longueurs au compas.',
          non: 'La construction d\'un triangle au compas n\'est pas acquise.' } }
    ],
    /* Mathématiques, fin de cycle 2 — Canopé, version française.
       Corrigé officiel reçu le 05/09 (tests/canope-maths-c2-corrige.pdf) : les 20
       exercices sont saisis, avec les paliers du barème officiel. Les intitulés 7 à 9,
       auparavant devinés, étaient faux : l'ex. 7 est un rangement, l'ex. 8 des
       soustractions posées, l'ex. 9 des multiplications posées. */
    'canope-maths-c2': [
      { num: '1', type: 'sous',
        attendu: '47 · 35',
        question: 'Entourer le nombre qui correspond au matériel dessiné',
        sous: [
          { libelle: '4 barres de dix et 7 unités', options: ['84', '74', '47'], bonne: '47' },
          { libelle: '5 unités et 3 barres de dix', options: ['35', '53', '23'], bonne: '35' }
        ],
        aide: 'Barème officiel : 2 réponses exactes → TBM, 1 → MS, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'la lecture des nombres jusqu\'à 100',
          ok: 'Sait lire les nombres jusqu\'à 100 représentés avec du matériel.',
          non: 'La lecture des nombres jusqu\'à 100 avec du matériel n\'est pas installée.' } },
      { num: '2', type: 'unique',
        attendu: '16 + 14',
        question: 'Tom a 14 ballons rouges et 16 ballons bleus. Combien a-t-il de ballons en tout ?',
        options: ['16 - 14', '14 + 14', '16 + 14', '16 + 16'], bonne: '16 + 14',
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'le choix de l\'addition dans un problème',
          ok: 'Sait choisir l\'addition dans un problème de réunion.',
          non: 'Ne choisit pas encore l\'opération qui convient dans un problème d\'addition.' } },
      { num: '3', type: 'unique',
        attendu: '29 − 15',
        question: "Dans la classe, il y a 29 élèves. 15 élèves sont des garçons. Combien y a-t-il de filles ?",
        options: ['29 - 15', '15 + 29', '29 + 15', '29 × 15'], bonne: '29 - 15',
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsDonnees',
        constat: { court: 'le choix de la soustraction dans un problème',
          ok: 'Sait choisir la soustraction dans un problème de complément.',
          non: 'Ne choisit pas encore l\'opération qui convient dans un problème de soustraction.' } },
      { num: '4', type: 'bareme',
        attendu: '382 = 300 + 80 + 2 · 582 = 500 + 80 + 2 · 718 = 8 + 700 + 10',
        question: 'Décomposer 382, 582 et 718',
        options: [['Les 3 décompositions exactes', 'TBM'],
          ['2 décompositions exactes', 'MS'],
          ['1 décomposition exacte', 'MF'],
          ['Aucune', 'MI'], ['Rien écrit', 'MI']],
        aide: 'L\'ordre des termes n\'a pas d\'importance. Barème officiel : 3 → TBM, 2 → MS, 1 → MF, 0 → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'la décomposition en centaines, dizaines et unités',
          ok: 'Sait décomposer un nombre en centaines, dizaines et unités.',
          mf: 'Décompose un nombre en centaines, dizaines et unités sans fiabilité.',
          non: 'La décomposition en centaines, dizaines et unités n\'est pas maîtrisée.' } },
      { num: '5', type: 'bareme',
        attendu: '48 + 31 = 79 · 166 + 254 = 420',
        question: 'Calculer : 48 + 31, puis 166 + 254 (addition posée avec retenue)',
        options: [['Les 2 résultats exacts', 'TBM'],
          ['Seule l\'addition à retenue est juste', 'MS'],
          ['Seule la première addition est juste', 'MF'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Aucun résultat exact', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Seule la seconde addition demande de gérer une retenue (remarque du corrigé officiel).',
        rubrique: 'mathsNombres',
        constat: { court: 'l\'addition posée',
          ok: 'Sait poser et calculer une addition, retenue comprise.',
          ms: 'Sait poser une addition à retenue.',
          mf: 'Calcule une addition simple, mais la retenue n\'est pas installée.',
          non: 'L\'addition posée n\'est pas maîtrisée.',
          sansPoser: 'Écrit un résultat d\'addition sans poser l\'opération : la technique n\'est pas installée.',
          rien: 'Ne sait pas réaliser des additions posées.' },
        rienVaut: 'MI' },
      { num: '6', type: 'bareme',
        attendu: '150 · 140 · 130 · 120 · 110 · 100 · 90 · 80 · 70 · 60 · 50',
        question: 'Compléter la suite de 10 en 10, de 150 à 50',
        options: [['La suite complète et exacte', 'TBM'],
          ['La suite amorcée puis fausse', 'MI'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'les suites de 10 en 10',
          ok: 'Sait poursuivre une suite décroissante de 10 en 10.',
          non: 'La suite décroissante de 10 en 10 n\'est pas maîtrisée.' } },
      { num: '7', type: 'bareme',
        attendu: '2 · 7 · 14 · 20 · 41 · 125 · 152',
        question: 'Ranger du plus petit au plus grand : 152 · 2 · 14 · 7 · 125 · 41 · 20',
        options: [['La suite entièrement exacte', 'TBM'],
          ['Range les nombres à un chiffre, se trompe au-delà', 'MI'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsNombres',
        constat: { court: 'le rangement des nombres',
          ok: 'Sait ranger des nombres du plus petit au plus grand.',
          non: 'Le rangement des nombres du plus petit au plus grand n\'est pas maîtrisé.' } },
      { num: '8', type: 'bareme',
        attendu: '87 − 52 = 35 · 512 − 139 = 373',
        question: 'Calculer : 87 − 52, puis 512 − 139 (soustraction posée avec retenue)',
        options: [['Les 2 résultats exacts', 'TBM'],
          ['Seule la soustraction à retenue est juste', 'MS'],
          ['Seule la première soustraction est juste', 'MF'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Aucun résultat exact', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Seule la seconde soustraction demande de gérer une retenue (remarque du corrigé officiel).',
        rubrique: 'mathsNombres',
        constat: { court: 'la soustraction posée',
          ok: 'Sait poser et calculer une soustraction, retenue comprise.',
          ms: 'Sait poser une soustraction à retenue.',
          mf: 'Calcule une soustraction simple, mais la retenue n\'est pas installée.',
          non: 'La soustraction posée n\'est pas maîtrisée.',
          sansPoser: 'Écrit un résultat de soustraction sans poser l\'opération : la technique n\'est pas installée.',
          rien: 'Ne sait pas réaliser des soustractions posées.' },
        rienVaut: 'MI' },
      { num: '9', type: 'bareme',
        attendu: '32 × 4 = 128 · 75 × 3 = 225',
        question: 'Calculer : 32 × 4, puis 75 × 3 (multiplication posée avec retenue)',
        options: [['Les 2 résultats exacts', 'TBM'],
          ['1 résultat exact', 'MS'],
          ['Un résultat écrit sans opération posée', 'MI'],
          ['Aucun résultat exact', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Seule la seconde multiplication demande de gérer une retenue (remarque du corrigé officiel).',
        rubrique: 'mathsNombres',
        constat: { court: 'la multiplication posée',
          ok: 'Sait poser et calculer une multiplication.',
          ms: 'Pose la multiplication ; les tables restent fragiles.',
          non: 'La multiplication posée n\'est pas maîtrisée.',
          sansPoser: 'Écrit un résultat de multiplication sans poser l\'opération : la technique n\'est pas installée.',
          rien: 'La multiplication posée n\'est pas maîtrisée.' },
        rienVaut: 'MI' },
      { num: '10', type: 'bareme',
        attendu: '104 livres · 8 cartes',
        question: 'Deux problèmes : 26 élèves × 4 livres, puis 32 cartes partagées entre 4 joueurs',
        options: [['Les 2 réponses exactes', 'TBM'],
          ['1 réponse exacte', 'MS'],
          ['Les 2 opérations justes, erreur de calcul', 'MS'],
          ['Autre', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Le corrigé accorde MS quand les deux opérations sont bien choisies (26 × 4 et 32 ÷ 4) et que seul le calcul est faux.',
        rubrique: 'mathsDonnees',
        constat: { court: 'les problèmes de multiplication et de partage',
          ok: 'Résout un problème de multiplication et un problème de partage.',
          ms: 'Choisit la bonne opération dans un problème, le calcul reste fragile.',
          non: 'Ne choisit pas encore l\'opération qui convient dans un problème.' } },
      { num: '11', type: 'bareme',
        attendu: 'environ 6 cm',
        question: 'Mesurer la longueur du segment BC',
        options: [['Environ 6 cm, avec ou sans unité', 'TBM'],
          ['Une mesure fausse', 'MI'],
          ['Rien écrit', 'MI']],
        aide: 'Attention : une impression « ajustée à la page » change la longueur du segment. Mesurer sur la feuille de l\'élève avant de noter.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'la mesure d\'une longueur à la règle',
          ok: 'Sait mesurer une longueur à la règle graduée.',
          non: 'La mesure d\'une longueur à la règle n\'est pas acquise.' } },
      { num: '12', type: 'bareme',
        attendu: 'un segment de 7 cm tracé depuis le point',
        question: 'Tracer un segment de 7 cm à partir du point',
        options: [['Le segment mesure 7 cm', 'TBM'],
          ['Le segment mesure 6 ou 8 cm', 'MF'],
          ['Autre tracé', 'MI'], ['Rien tracé', 'MI']],
        aide: 'Barème officiel : 7 cm → TBM, 6 ou 8 cm → MF, autre → MI.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'le tracé d\'un segment à la règle',
          ok: 'Sait tracer un segment d\'une longueur donnée.',
          mf: 'Trace un segment à la règle, le report de la mesure reste approximatif.',
          non: 'Le tracé d\'un segment d\'une longueur donnée n\'est pas acquis.' } },
      { num: '13', type: 'bareme',
        attendu: '15 mètres · 800 kilogrammes · 1 litre · 10 heures',
        question: 'Entourer la bonne unité (maison, vache, bouteille, montre)',
        options: [['Les 4 réponses exactes', 'TBM'],
          ['3 réponses exactes', 'MS'],
          ['2 réponses exactes', 'MF'],
          ['Autre', 'MI'], ['Rien entouré', 'MI']],
        aide: 'Barème officiel : 4 → TBM, 3 → MS, 2 → MF, autre → MI.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'le choix des unités de mesure',
          ok: 'Choisit l\'unité qui convient pour une longueur, une masse, une contenance, une durée.',
          mf: 'Choisit l\'unité qui convient dans les cas les plus simples.',
          non: 'Le choix de l\'unité de mesure n\'est pas acquis.' } },
      { num: '14', type: 'bareme',
        attendu: '4 ans = 48 mois\n1 kg = 1 000 g\n1 h = 60 min\n1 km = 1 000 m\n30 m = 3 000 cm\n120 min = 2 h\n1 min = 60 s\n1 m = 100 cm\n1 l = 100 cl',
        question: 'Compléter les 9 égalités (durées, masses, longueurs, contenances)',
        options: [['9 ou 8 réponses exactes', 'TBM'],
          ['7 ou 6 réponses exactes', 'MS'],
          ['5, 4 ou 3 réponses exactes', 'MF'],
          ['Moins de 3', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 9-8 → TBM, 7-6 → MS, 5-3 → MF, autre → MI.',
        rubrique: 'mathsGrandeurs',
        constat: { court: 'les conversions d\'unités',
          ok: 'Maîtrise les conversions d\'unités usuelles.',
          mf: 'Connaît quelques conversions d\'unités, pas toutes.',
          non: 'Les conversions d\'unités ne sont pas maîtrisées.' } },
      { num: '15', type: 'bareme',
        attendu: 'cercle · triangle · carré',
        question: 'Entourer le nom de chaque figure (3 figures)',
        options: [['Les 3 noms exacts', 'TBM'],
          ['2 noms exacts', 'MS'],
          ['Autre', 'MI'], ['Rien entouré', 'MI']],
        aide: 'Barème officiel : 3 → TBM, 2 → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le nom des figures usuelles',
          ok: 'Nomme les figures usuelles.',
          non: 'Le nom des figures usuelles n\'est pas installé.' } },
      { num: '16a', type: 'bareme',
        attendu: '5 côtés',
        question: 'Combien cette figure a-t-elle de côtés ?',
        options: [['5', 'TBM'], ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        rubrique: 'mathsGeometrie',
        constat: { court: 'les côtés d\'une figure',
          ok: 'Sait compter les côtés d\'une figure.',
          non: 'Ne compte pas encore les côtés d\'une figure.' } },
      { num: '16b', type: 'bareme',
        attendu: '5 sommets',
        question: 'Combien cette figure a-t-elle de sommets ?',
        options: [['5', 'TBM'], ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        rubrique: 'mathsGeometrie',
        constat: { court: 'les sommets d\'une figure',
          ok: 'Sait compter les sommets d\'une figure.',
          non: 'Le mot « sommet » n\'est pas installé.' } },
      { num: '16c', type: 'bareme',
        attendu: '2 angles droits',
        question: 'Combien cette figure a-t-elle d\'angles droits ?',
        options: [['2', 'TBM'], ['1 angle droit', 'MS'],
          ['Autre réponse', 'MI'], ['Rien écrit', 'MI']],
        aide: 'Barème officiel : 2 → TBM, « 1 angle droit » → MS, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la reconnaissance des angles droits',
          ok: 'Repère les angles droits d\'une figure.',
          ms: 'Repère un angle droit sur deux.',
          non: 'La reconnaissance des angles droits n\'est pas acquise.' } },
      { num: '17', type: 'bareme',
        attendu: 'un carré construit sur le côté déjà tracé',
        question: 'Tracer un carré à partir du côté déjà dessiné',
        options: [['Carré exact', 'TBM'],
          ['Quadrilatère tracé, côtés ou angles faux', 'MI'],
          ['Rien tracé', 'MI']],
        aide: 'Le corrigé accepte le carré tracé sous le segment.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'la construction d\'un carré',
          ok: 'Sait construire un carré à partir d\'un côté donné.',
          non: 'La construction d\'un carré n\'est pas acquise.' } },
      { num: '18', type: 'bareme',
        attendu: 'le plan qui correspond au dessin',
        question: 'Entourer le plan qui correspond au dessin',
        options: [['Le bon plan', 'TBM'], ['Un autre plan', 'MI'], ['Rien entouré', 'MI']],
        aide: 'Barème officiel : réponse exacte → TBM, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le passage du dessin au plan',
          ok: 'Sait reconnaître un espace vu de dessus.',
          non: 'Le passage du dessin au plan n\'est pas acquis.' } },
      { num: '19', type: 'bareme',
        attendu: 'un cercle de centre A passant par B',
        question: 'Tracer au compas un cercle de centre A qui passe par B',
        options: [['Cercle de centre A passant par B', 'TBM'],
          ['Cercle de centre B passant par A', 'MS'],
          ['Autre tracé', 'MI'], ['Rien tracé', 'MI']],
        aide: 'Un compas doit avoir été mis à disposition dès le début du test.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le tracé d\'un cercle au compas',
          ok: 'Sait tracer un cercle au compas à partir de son centre.',
          ms: 'Sait tenir un compas ; le centre et le point de passage sont encore confondus.',
          non: 'Le tracé d\'un cercle au compas n\'est pas acquis.' } },
      { num: '20', type: 'bareme',
        attendu: 'tableau en rouge · bureau de Luc en vert · bureau d\'Anne en bleu · Catherine',
        question: 'Plan de la classe : colorier le tableau, le bureau de Luc, celui d\'Anne, puis dire qui est assis là',
        options: [['Les 4 réponses exactes', 'TBM'],
          ['3 ou 2 réponses exactes', 'MS'],
          ['1 réponse exacte', 'MF'],
          ['Autre', 'MI'], ['Rien fait', 'MI']],
        aide: 'Barème officiel : 4 → TBM, 3 ou 2 → MS, 1 → MF, autre → MI.',
        rubrique: 'mathsGeometrie',
        constat: { court: 'le repérage sur un plan',
          ok: 'Sait se repérer sur le plan d\'un espace connu.',
          mf: 'Se repère sur un plan de façon encore incertaine.',
          non: 'Le repérage sur un plan n\'est pas acquis.' } }
    ],
    /* Cycle 4, fin de 5e — texte « Buck » (Jack London, L'Appel de la forêt).
       Corrigé officiel : chaque exercice a SON barème, recopié dans bareme. */
    'canope-lecture-5e': [
      { num: '1', type: 'multi', bareme: 'buck1',
        question: 'Quels indices laissent penser que Buck est un chien ? (plusieurs réponses)',
        options: ['« Buck avait accepté la corde avec calme. »',
          '« Il grogna de façon menaçante. »',
          '« Jamais il n\'avait été aussi furieux. »',
          '« Sa langue pendait. »',
          '« Pensant, dans son orgueil, que cela suffirait pour être obéi. »',
          '« Ses yeux devinrent vitreux. »'],
        bonnes: ['« Buck avait accepté la corde avec calme. »',
          '« Il grogna de façon menaçante. »', '« Sa langue pendait. »'],
        aide: 'Barème : 3 bonnes → TBM, 2 → MS, 1 → MF, aucune → MI.' },
      { num: '2', type: 'multi', bareme: 'buck2',
        question: "Quels mots caractérisent le mieux l'homme dans le texte ? (plusieurs réponses)",
        options: ['aimant', 'doux', 'cruel', 'habile', 'fort', 'soumis', 'patient'],
        bonnes: ['cruel', 'habile', 'fort'],
        aide: 'Barème : les trois, ou « habile » + « fort » → TBM ; « cruel » + un des deux → MS ; une seule → MF.' },
      { num: '3', type: 'paires', bareme: 'buck3',
        question: 'Vrai ou faux ?',
        colonnes: ['VRAI', 'FAUX'],
        elements: [
          ["Buck a l'habitude d'être maltraité.", 'FAUX'],
          ['Buck ne comprend pas ce qui se passe.', 'VRAI'],
          ['Buck, jusque-là, se pensait supérieur aux autres.', 'VRAI']
        ],
        aide: 'Barème : 3 bonnes → TBM, 2 → MS, 1 → MF, aucune → MI.' },
      { num: '4', type: 'paires', bareme: 'buck3',
        question: 'À quel domaine se rapporte chacun de ces mots ?',
        colonnes: ['un sentiment', 'une réaction', 'une sensation'],
        elements: [
          ['la douleur', 'une sensation'],
          ['le grognement', 'une réaction'],
          ['la colère', 'un sentiment']
        ],
        aide: 'Barème : toutes → TBM, 2 → MS, 1 → MF, aucune → MI.' },
      { num: '5', type: 'ordre', bareme: 'buck5',
        question: "Numéroter les événements de 1 à 4, dans l'ordre de l'histoire",
        phrases: ['Buck se sent en danger.', "Buck s'évanouit.",
          'Buck se laisse faire.', 'Buck résiste.'],
        rangs: [2, 4, 1, 3],
        aide: 'Barème : toutes justes → TBM, 2 justes → MS, moins de 2 → MI (pas de MF).' },
      { num: '6', type: 'multi', bareme: 'buck6',
        question: "À quoi sert la corde dans l'extrait ? (une ou plusieurs réponses)",
        options: ['à frapper Buck', 'à emmener Buck en promenade',
          "à l'empêcher de bouger", "à l'étrangler"],
        bonnes: ["à l'étrangler"],
        aide: "Barème : « à l'étrangler » seul → TBM ; « à l'étrangler » + « à l'empêcher de bouger » → MS ; les autres → MF ou MI." }
    ],
    /* Cycle 4, fin de 4e — dossier UNICEF sur les droits de l'enfant (trois documents :
       le rapport 2015, un tableau de taux de scolarisation, la Convention).
       Corrigé officiel reçu le 05/09. Les exercices 1, 2, 3 et 5 sont à entourer : la
       réponse se saisit, l'appli note (bonne → TBM, autre → MI, comme le corrigé).
       L'exercice 4 est un tableau de douze cases : on compte les ERREURS, donc il se
       saisit au barème, comme en maths. */
    'canope-lecture-4e': [
      { num: '1', type: 'unique', question: 'Quel est le sujet commun aux trois documents ?',
        options: ['La condition des enfants dans le monde.',
          'Le travail des enfants dans les pays en voie de développement.',
          "L'éducation des enfants en Europe."],
        bonne: 'La condition des enfants dans le monde.' },
      { num: '2', type: 'unique',
        question: "De quelle année date la Convention des droits de l'enfant (document 1) ?",
        options: ['1985', '2015', '1990'], bonne: '1990',
        aide: "Le document 1 dit « il y a vingt-cinq ans » et le rapport est de 2015." },
      { num: '3', type: 'unique',
        question: 'À quel article de la Convention (document 3) le document 2 fait-il référence ?',
        options: ['Article 24', 'Article 28', 'Article 32'], bonne: 'Article 28',
        aide: "Le document 2 porte sur la scolarisation : c'est l'article 28, le droit à l'éducation." },
      { num: '4', type: 'bareme',
        attendu: 'autant de garçons que de filles au primaire : Asie du Sud, Asie de l\'Est et Pacifique, Europe — plus de filles que de garçons au secondaire : Asie de l\'Est et Pacifique, Amérique latine et Caraïbes',
        question: 'Tableau à cocher : où y a-t-il autant de garçons que de filles au primaire, et plus de filles au secondaire ?',
        options: [['Aucune, une ou deux erreurs', 'TBM'], ['Trois ou quatre erreurs', 'MS'],
          ['Plus de quatre erreurs', 'MI'], ['Rien coché', 'MI']],
        aide: "Cases attendues — primaire (autant) : Asie du Sud (94/94), Asie de l'Est et Pacifique (95/95), Europe (95/95). Secondaire (plus de filles) : Asie de l'Est et Pacifique (75/76), Amérique latine et Caraïbes (71/75). Barème officiel : 1 ou 2 erreurs → TBM, 3 ou 4 → MS, plus de 4 → MI." },
      { num: '5', type: 'unique', question: "Depuis l'existence de la Convention :",
        options: ["La situation des enfants s'est améliorée.",
          "Tous les problèmes des enfants ont été réglés.",
          "La situation des enfants n'a pas changé."],
        bonne: "La situation des enfants s'est améliorée.",
        aide: "Le document 1 dit les deux à la fois : des progrès importants, et un trop grand nombre d'enfants encore en difficulté. La bonne réponse est donc la première." },
      { num: '6', type: 'paires', bareme: 'troisSur3',
        question: 'À quoi servent les documents proposés ? (relier)',
        colonnes: ['À informer', 'À divertir', 'À fixer officiellement les lois'],
        elements: [
          ['Document 1 — le rapport UNICEF', 'À informer'],
          ['Document 2 — le tableau de statistiques', 'À informer'],
          ['Document 3 — la Convention', 'À fixer officiellement les lois']
        ],
        aide: "« À divertir » ne sert à rien : deux documents vont sur « informer ». Barème officiel : les trois → TBM, deux → MS, une → MF, aucune → MI." }
    ],
    /* Cycle 4, fin de 3e — Alfred de Musset, La Confession d'un enfant du siècle (1836).
       Corrigé officiel reçu le 05/09. Plusieurs exercices attendent DEUX réponses à
       entourer (« les bonnes réponses » au pluriel dans le corrigé) : ils sont saisis en
       cases à cocher, avec le barème officiel — souvent sans MF, ce qui est écrit tel quel
       et ne doit pas être « arrondi ». */
    'canope-lecture-3e': [
      { num: '1', type: 'unique', question: 'Combien y a-t-il de personnages dans ce texte ?',
        options: ['1', '2', '3'], bonne: '2' },
      { num: '2', type: 'multi', bareme: 'musset2',
        question: "Où et quand se situe l'histoire ? (deux réponses)",
        options: ['Dans un appartement', "À l'extérieur", 'Au lever du jour',
          'À la tombée de la nuit'],
        bonnes: ["À l'extérieur", 'À la tombée de la nuit'],
        aide: "Le texte dit « la lune se couchait » et parle des arbres et des charmilles. Barème officiel : les deux → TBM, une → MS, autre → MI (pas de MF)." },
      { num: '3', type: 'unique', question: 'Cet extrait relate :',
        options: ['Un rendez-vous amical', 'Une nouvelle rencontre', 'Un rêve',
          'Un rendez-vous amoureux', 'Une séparation'],
        bonne: 'Un rendez-vous amoureux' },
      { num: '4', type: 'multi', bareme: 'musset2',
        question: 'Le cadre est-il : (deux réponses)',
        options: ['Inquiétant', 'Romantique', 'Sinistre', 'Paisible', 'On ne sait pas'],
        bonnes: ['Romantique', 'Paisible'],
        aide: "« la plus belle nuit du monde », « pas un souffle de vent », « l'air était tiède et embaumé ». Barème officiel : les deux → TBM, une → MS, autre → MI." },
      { num: '5', type: 'ordre', bareme: 'musset5',
        question: "Classer les éléments dans l'ordre chronologique, de 1 à 4",
        phrases: ["Les personnages s'embrassent.", 'Les personnages regardent le paysage.',
          'La jeune femme pleure.', 'Le narrateur songe à un épisode douloureux.'],
        rangs: [4, 1, 3, 2],
        aide: "Ordre du texte : ils regardent le ciel, il se souvient d'un jour de désespoir, elle a les yeux noyés de larmes, ils s'embrassent. Barème officiel : le bon ordre → TBM, deux bonnes → MF, autre → MI (pas de MS)." },
      { num: '6', type: 'paires', bareme: 'troisSur3',
        question: 'Relier chaque mot à son CONTRAIRE',
        colonnes: ['Nostalgique', 'Parfumé', 'Plaisir', 'Inodore', 'Dégoût', 'Joyeux'],
        elements: [
          ['Embaumé', 'Inodore'],
          ['Volupté', 'Dégoût'],
          ['Mélancolique', 'Joyeux']
        ],
        aide: "Piège de l'exercice : « parfumé » et « plaisir » sont des SYNONYMES, pas des contraires. Barème officiel : les trois → TBM, deux → MS, une → MF, aucune → MI." },
      { num: '7', type: 'multi', bareme: 'musset7',
        question: "Pourquoi la jeune femme pleure-t-elle ? (une ou deux réponses)",
        options: ['Elle regrette de se laisser séduire par le narrateur', 'Elle est effrayée',
          'Elle est heureuse', 'Elle est malade'],
        bonnes: ['Elle regrette de se laisser séduire par le narrateur', 'Elle est heureuse'],
        aide: "Le corrigé accepte l'une ou l'autre, ou les deux : le texte ne tranche pas. Barème officiel : une ou deux bonnes → TBM, autre → MI." },
      { num: '8', type: 'paires', bareme: 'musset8',
        question: "Quels sont les effets de l'amour sur le narrateur ?",
        colonnes: ['VRAI', 'FAUX', 'ON NE SAIT PAS'],
        elements: [
          ["L'amour lui permet d'oublier le reste du monde.", 'VRAI'],
          ['Il rend malheureux.', 'FAUX'],
          ['Il modifie sa perception du monde.', 'VRAI'],
          ['Il redonne un sens à son existence.', 'VRAI']
        ],
        aide: "Appuis du texte : « l'univers fut oublié », « une volupté mélancolique nous enivrait », « tout était si plein maintenant ». Barème officiel : les quatre → TBM, trois → MS, une ou deux → MF, aucune → MI." }
    ],
    /* Livret cycle 2, version française (reçu le 05/09). Un test par palier, avec les
       barèmes officiels recopiés tels quels — ils sont détaillés ici, exercice par
       exercice, contrairement au cycle 3.
       ⚠ C'est le même Sami que le cycle 3, un cran plus tôt : son PREMIER JOUR d'école. */
    'canope-lecture-cp': [
      { num: '1', type: 'bareme', question: 'Lire le texte à voix haute',
        options: [['Lecture fluide', 'TBM'], ['Lecture hésitante, plutôt à l\'aise', 'MS'],
          ['Lecture hésitante, difficile', 'MF'], ['Lecture ânonnante', 'MI']],
        aide: "Barème officiel : fluide → TBM ; hésitante → MS ou MF selon le degré ; ânonnante → MI." },
      { num: '2', type: 'bareme', question: 'Relier les dix mots à leur image',
        attendu: 'réveil · lit · chaise · casquette · maman · pantalon · garçon · étoile · chat · pull',
        options: [['Huit mots reliés ou plus', 'TBM'], ['Cinq à sept mots', 'MS'],
          ['Trois ou quatre mots', 'MF'], ['Moins de trois mots', 'MI'], ['Rien relié', 'MI']],
        aide: 'Barème officiel : au moins 8 → TBM, au moins 5 → MS, au moins 3 → MF, autre → MI.' },
      { num: '3', type: 'unique', question: 'À quelle heure sonne le réveil de Sami ?',
        options: ['six heures', 'sept heures', 'huit heures'], bonne: 'sept heures' },
      { num: '4', type: 'bareme', question: 'Dessiner les habits de Sami avec les bonnes couleurs',
        attendu: 'pantalon bleu · pull rouge · casquette verte avec une étoile rouge',
        options: [['Les 3 vêtements dessinés + l\'étoile sur la casquette', 'TBM'],
          ['Au moins 3 éléments dessinés', 'MS'], ['Au moins 2 éléments dessinés', 'MF'],
          ['Autre réponse', 'MI'], ['Rien dessiné', 'MI']],
        aide: "Le texte dit : pantalon bleu, pull rouge, casquette préférée verte avec une étoile rouge dessus. Barème officiel : 3 vêtements + l'étoile → TBM ; au moins 3 éléments → MS ; au moins 2 → MF." },
      { num: '5', type: 'bareme', question: 'Entourer la chambre de Sami et barrer les autres dessins',
        options: [['Le bon dessin entouré, les autres barrés', 'TBM'],
          ['Le bon dessin entouré, les autres non barrés', 'MS'],
          ['Un autre dessin entouré', 'MI'], ['Rien entouré', 'MI']],
        aide: "⚠ Le corrigé ne dit pas quel dessin est le bon : à repérer sur la feuille. Le texte donne le lit avec une chaise à côté, une grosse armoire à côté de la fenêtre, et sur le mur une image avec des chats. Barème officiel : juste → TBM, faux → MI (le palier MS est ajouté pour l'élève qui entoure sans barrer)." }
    ],
    'canope-lecture-ce1': [
      { num: '6', type: 'unique', question: 'Qui a choisi les habits de Sami ?',
        options: ['Sami', 'la maman de Sami', 'le petit frère de Sami', 'le père de Sami'],
        bonne: 'Sami',
        aide: "Le texte dit : « Hier soir, il a passé beaucoup de temps à préparer ses vêtements. »" },
      { num: '7', type: 'multi', bareme: 'buck1',
        question: "Barrer les fruits qui ne sont PAS dans l'assiette",
        options: ['des ananas', 'des fraises', 'des oranges', 'des bananes', 'des pommes', 'des poires'],
        bonnes: ['des fraises', 'des oranges', 'des poires'],
        aide: "Dans l'assiette : ananas, bananes, pommes. À barrer : fraises, oranges, poires. Barème officiel : 3 trouvés → TBM, 2 → MS, 1 → MF, autre → MI." },
      { num: '8', type: 'unique',
        question: 'Vrai ou faux : Sami a passé peu de temps à préparer ses vêtements',
        options: ['vrai', 'faux'], bonne: 'faux',
        aide: "Le texte dit « beaucoup de temps » : la phrase de l'exercice dit le contraire." },
      { num: '9', type: 'unique',
        question: 'Vrai ou faux : Sami déteste ce que sa maman a préparé pour le petit-déjeuner',
        options: ['vrai', 'faux'], bonne: 'faux',
        aide: "Le texte parle de « bonnes odeurs » et de « délicieux gâteaux » : c'est à l'élève de l'inférer, le texte ne dit jamais qu'il aime." },
      { num: '10', type: 'ordre', bareme: 'c2ex10',
        question: "Numéroter les phrases de l'action la plus ancienne à la plus récente",
        phrases: ['Sami sort de sa chambre', "Sami ouvre l'armoire",
          'Sami se regarde dans le miroir', 'Sami a préparé ses vêtements'],
        rangs: [4, 3, 2, 1],
        aide: "Barème officiel : 4 3 2 1 → TBM ; 4 3 1 2 → MS (n'a pas vu l'antériorité mais a suivi l'ordre du texte) ; seule la place du 1 respectée → MF ; autre → MI." }
    ],
    'canope-lecture-ce2': [
      { num: '11', type: 'unique',
        question: 'Vrai ou faux : Sami déteste que sa maman passe sa main dans ses cheveux',
        options: ['vrai', 'faux'], bonne: 'vrai' },
      { num: '12', type: 'unique', question: 'Sami prend des gâteaux dans son cartable',
        options: ['oui', 'non'], bonne: 'non',
        aide: "Il en aimerait, mais « il choisit de ne pas en prendre »." },
      { num: '13', type: 'unique', question: 'Où habite Sami ?',
        options: ['dans un appartement', 'dans une caravane',
          'dans une maison individuelle', 'dans un château'],
        bonne: 'dans un appartement',
        /* Le corrigé accorde MF à « maison individuelle » : l'élève a vu l'escalier
           sans reconnaître l'immeuble. */
        presque: { 'dans une maison individuelle': 'MF' },
        aide: "Le texte dit « l'escalier de l'immeuble ». Barème officiel : « maison individuelle » vaut MF, les autres MI." },
      { num: '14', type: 'unique', question: 'Pourquoi la mère de Sami court dans l\'escalier ?',
        options: ['pour lui faire un bisou', 'pour lui donner sa casquette',
          'pour lui caresser les cheveux', 'parce qu\'elle est en retard'],
        bonne: 'pour lui donner sa casquette' },
      { num: '15', type: 'unique',
        question: "Selon toi, pourquoi Sami pense que c'est important d'avoir sa casquette ?",
        options: ['pour ne pas se perdre', 'parce qu\'elle le rassure',
          'pour aller plus vite à l\'école', 'parce que c\'est son dernier jour d\'école'],
        bonne: 'parce qu\'elle le rassure',
        aide: "Le texte dit « ma casquette porte-bonheur » : c'est la seule question du livret qui demande d'interpréter un sentiment." }
    ],
    'canope-lecture-cm1': [
      { num: '1', type: 'bareme', question: "Lecture à voix haute (environ 3 lignes)",
        options: [['Lecture fluide', 'TBM'], ['Lecture hésitante, plutôt à l\'aise', 'MS'],
          ['Lecture hésitante, difficile', 'MF'], ['Lecture ânonnante', 'MI']],
        vo: 'Read the text aloud (about 3 lines)',
        aide: "Le corrigé demande de faire lire à voix haute le début du texte, environ trois lignes." },
      { num: '2', type: 'unique', question: 'Ce texte est :',
        options: ['une histoire', 'une recette', "un mode d'emploi", 'un poème'],
        bonne: 'une histoire',
        vo: 'This text is:', voOptions: ['a story', 'a recipe', 'a manual', 'a poem'] },
      { num: '3', type: 'unique', question: 'Selon toi, le cauchemar de Sami est :',
        options: ['inquiétant', 'rassurant', 'sportif', 'joyeux'], bonne: 'inquiétant',
        vo: "According to you, Sami's nightmare is:",
        voOptions: ['worrying', 'possible', 'sporty', 'happy'],
        note: "L'exemplaire anglais imprime « possible » là où le français imprime « rassurant » : sans conséquence ici." },
      { num: '4', type: 'unique',
        question: "Quel dessin a-t-elle entouré ? (l'école de Sami à Labacie)",
        options: ['dessin 1 — arbre à gauche, puits contre le bâtiment, à droite',
          'dessin 2 — arbre à gauche, puits au milieu de la cour',
          'dessin 3 — arbre à gauche, puits au milieu de la cour, entrée en bas',
          'dessin 4 — bâtiment à gauche, arbre à droite'],
        bonne: 'dessin 3 — arbre à gauche, puits au milieu de la cour, entrée en bas',
        vo: 'Which drawing did she circle? (Sami\'s school in Labacie)',
        voOptions: ['drawing 1', 'drawing 2', 'drawing 3', 'drawing 4'],
        aide: "Les dessins sont dans l'ordre de la page : les trois du haut de gauche à droite, puis celui du bas. Le texte dit : le puits au milieu de la cour, le grand arbre à gauche du puits en entrant." },
      { num: '5', type: 'bareme',
        question: "L'itinéraire tracé sur le plan",
        options: [['Trajet juste : les arbres, puis à gauche, puis tout droit jusqu\'à l\'école', 'TBM'],
          ['Il longe les arbres ET tourne à gauche, mais n\'arrive pas à l\'école', 'MS'],
          ['Il longe les arbres, OU il arrive à l\'école par un autre chemin', 'MF'],
          ['Autre tracé', 'MI']],
        vo: 'The route drawn on the map',
        aide: 'Le texte dit : à droite en sortant, il suit les arbres, prend la première rue à gauche, puis tout droit — l\'école est en face du parc. Le départ est la croix.' }
    ],
    'canope-lecture-cm2': [
      { num: '6', type: 'unique', question: 'Quelle phrase est une question ?',
        options: ['Un vent froid souffle.', 'Cet arbre était-il là hier ?',
          'Un sentiment étrange ne le quitte pas.', "Il n'y comprend rien !"],
        bonne: 'Cet arbre était-il là hier ?',
        vo: 'Which sentence is a question?',
        voOptions: ['A cold wind starts blowing', 'Was that tree there yesterday?',
          "He can't get rid of this strange feeling", "He doesn't understand any of it!"] },
      { num: '7', type: 'multi', question: 'Dans ce texte, quel temps fait-il ? (plusieurs réponses)',
        options: ['vent froid', 'vent chaud', 'nuages', 'pluie faible', 'éclaircie',
          'pluie forte', 'soleil'],
        bonnes: ['vent froid', 'nuages', 'pluie faible'],
        bareme: 'ex7',
        vo: 'In the text, what is the weather like?',
        voOptions: ['cold wind', 'warm wind', 'cloudy', 'light rain', 'sunny spells',
          'heavy rain', 'sunny'] },
      { num: '8', type: 'unique', question: 'Pourquoi Sami sort son emploi du temps ?',
        options: ["parce qu'il aime les mathématiques", "parce qu'il commence à pleuvoir",
          "parce qu'il cherche des informations", "parce qu'il a sport le jeudi"],
        bonne: "parce qu'il cherche des informations",
        vo: 'Why does Sami take his timetable?',
        voOptions: ['because he likes mathematics', "because it's starting to rain",
          "because he's looking for information", 'because he has sport on Thursdays'] },
      { num: '9', type: 'unique', question: 'Le plus souvent, Sami commence sa journée à quelle heure ?',
        options: ['à huit heures', 'à neuf heures', 'à dix heures'], bonne: 'à neuf heures',
        vo: 'What time does Sami usually start his schoolday?',
        voOptions: ["at eight o'clock", "at nine o'clock", "at ten o'clock"] },
      { num: '10', type: 'unique', question: "Quels jours Sami n'a pas cours d'histoire ?",
        options: ['lundi et jeudi', 'mardi et mercredi',
          'mercredi et jeudi', 'lundi et vendredi'],
        bonne: 'mardi et mercredi',
        /* le corrigé accorde MS à « mercredi et jeudi » : l'élève a vu un des deux jours */
        presque: { 'mercredi et jeudi': 'MS' },
        vo: "On what days doesn't Sami have history?",
        voOptions: ['Mondays and Thursdays', 'Tuesdays and Wednesdays',
          'Wednesdays and Thursdays', 'Mondays and Fridays'] }
    ],
    'canope-lecture-6e': [
      { num: '11', type: 'unique', question: 'Au paragraphe 2, les autres enfants sont :',
        options: ['agréables', 'désagréables', 'on ne sait pas'], bonne: 'désagréables',
        vo: 'In paragraph 2, the other children are:',
        voOptions: ['nice', 'not nice', "we don't know"] },
      { num: '12', type: 'ordre', question: "Numéroter les phrases dans l'ordre de l'histoire, du plus ancien au plus récent",
        phrases: ["Un garçon s'approche.", 'Les enfants se bousculent.',
          'Sami a fait un cauchemar.', 'Un orage éclate.'],
        rangs: [4, 3, 1, 2], bareme: 'ex12',
        vo: 'Number the sentences from the oldest to the most recent',
        voPhrases: ['A boy comes towards him', 'The children are pushing',
          'Sami had a nightmare', 'A storm breaks out'] },
      { num: '13', type: 'unique', question: 'Est-ce que la professeure est un aigle ?',
        options: ['oui', 'non', 'on ne sait pas'], bonne: 'non',
        vo: 'Is the teacher an eagle?', voOptions: ['yes', 'no', "we don't know"] },
      { num: '14', type: 'paires', question: 'Relier les sentiments de Sami aux éléments du texte (tout doit être utilisé)',
        colonnes: ['inquiet', 'rassuré'],
        elements: [
          ['les enfants le regardent avec intérêt', 'rassuré'],
          ["les enfants l'évitent", 'inquiet'],
          ['un orage éclate', 'inquiet'],
          ['il se détend', 'rassuré'],
          ['il retient ses larmes', 'inquiet'],
          ['le soleil apparaît', 'rassuré']
        ], bareme: 'ex14',
        vo: "Link Sami's feelings to the elements of the text",
        voColonnes: ['worried', 'reassured'],
        voElements: ['The children look at him with interest', 'The children avoid him',
          'A storm breaks out', 'He relaxes', 'He holds back his tears', 'The sun appears'] },
      { num: '15', type: 'unique', question: "Selon toi, comment va se passer la suite de l'histoire ?",
        options: ['Sami va avoir de gros problèmes.', "La professeure ne s'occupera pas de Sami.",
          "Sami va s'habituer et se faire accepter.",
          'Le garçon au pull bleu va devenir son ennemi.'],
        bonne: "Sami va s'habituer et se faire accepter.",
        vo: 'What will happen next in the story?',
        voOptions: ['Sami will have some big problems', 'The teacher will ignore Sami',
          'Sami will get used to his new school and be accepted',
          'The boy in the blue jumper will become his enemy'] }
    ]
  };

  function pour(testId) { return C[testId] || null; }

  /* De la part de juste à la note de l'échelle Canopé. */
  function niveau(part) {
    if (part >= 1) return 'TBM';
    if (part >= 0.75) return 'MS';
    if (part >= 0.5) return 'MF';
    return 'MI';
  }

  /* rep : ce que l'enseignante a saisi pour cet exercice.
       unique → la proposition choisie (chaîne)
       multi  → un tableau de propositions
       ordre  → un tableau de nombres, dans l'ordre des phrases
       paires → un tableau de colonnes, dans l'ordre des éléments
       juge   → un tableau de booléens, dans l'ordre des cases
     Renvoie null si rien n'est saisi (l'exercice reste non noté). */
  function noteDe(exo, rep) {
    if (rep == null) return null;
    if (exo.type === 'ouvert') {
      /* « rien » n'est pas une erreur : c'est une ligne qu'elle n'a pas fait lire.
         Elle sort du calcul — sinon sa feuille de décodage, où elle choisit deux ou
         trois lignes, conclurait MI sur tout le reste. */
      const lues = rep.filter(x => x === 'juste' || x === 'faux');
      const riens = rep.filter(x => x === 'rien').length;
      /* Sur un test, une opération laissée vide EST un échec (`rienVaut: 'MI'`) : on la
         lui a proposée. Sur sa feuille de décodage, c'est elle qui n'a pas fait lire la
         ligne — elle ne compte pas. */
      if (!lues.length) return riens && exo.rienVaut ? exo.rienVaut : null;
      const justes = lues.filter(x => x === 'juste').length;
      if (exo.rienVaut === 'MI') return niveau(justes / exo.sous.length);
      return niveau(justes / lues.length);
    }
    if (exo.type === 'sous') {
      /* plusieurs petites questions dans un même exercice, une seule note */
      const saisis = rep.filter(x => x);
      if (!saisis.length) return null;
      let justes = 0;
      exo.sous.forEach((q, i) => { if (rep[i] === q.bonne) justes++; });
      return niveau(justes / exo.sous.length);
    }
    if (exo.type === 'bareme') {
      if (!rep) return null;
      const trouve = exo.options.find(o => o[0] === rep);
      return trouve ? trouve[1] : null;
    }
    if (exo.type === 'unique') {
      if (!rep) return null;
      if (rep === exo.bonne) return 'TBM';
      if (exo.presque && exo.presque[rep]) return exo.presque[rep];
      return 'MI';
    }
    if (exo.type === 'multi') {
      if (!rep.length) return null;
      const justes = rep.filter(r => exo.bonnes.indexOf(r) >= 0).length;
      const faux = rep.length - justes;
      if (exo.bareme === 'buck1' || exo.bareme === 'buck3') {
        /* 3 bonnes → TBM, 2 → MS, 1 → MF, aucune → MI. Une réponse fausse retire une
           bonne : sinon tout entourer donnerait le maximum. Le même barème sert au
           fin de CE1 du cycle 2 (ex. 7, les fruits à barrer). */
        return ['MI', 'MF', 'MS', 'TBM'][Math.max(0, Math.min(3, justes - faux))];
      }
      if (exo.bareme === 'buck2') {
        const a = r => rep.indexOf(r) >= 0;
        if (faux) return justes >= 1 ? 'MF' : 'MI';
        if (justes === 3 || (a('habile') && a('fort'))) return 'TBM';
        if (a('cruel') && (a('habile') || a('fort'))) return 'MS';
        return justes >= 1 ? 'MF' : 'MI';
      }
      if (exo.bareme === 'buck6') {
        const a = r => rep.indexOf(r) >= 0;
        if (a("à l'étrangler") && rep.length === 1) return 'TBM';
        if (a("à l'étrangler") && a("à l'empêcher de bouger") && rep.length === 2) return 'MS';
        if (a("à l'étrangler")) return 'MF';
        return 'MI';
      }
      if (exo.bareme === 'ex7') {
        /* barème officiel : 3 justes → TBM, au moins 2 → MS, au moins 1 → MF.
           Une case fausse empêche le TBM : sinon tout entourer donnerait le maximum. */
        if (justes === 3 && !faux) return 'TBM';
        if (justes >= 2) return 'MS';
        if (justes >= 1) return 'MF';
        return 'MI';
      }
      if (exo.bareme === 'musset2') {
        /* Barème officiel des exercices 2 et 4 du fin de 3e : les deux bonnes → TBM, une
           → MS, autre → MI. Le corrigé ne prévoit PAS de MF ici : ne pas l'inventer.
           Une réponse fausse déclasse, sinon tout entourer donnerait le maximum. */
        if (faux) return 'MI';
        if (justes >= 2) return 'TBM';
        return justes === 1 ? 'MS' : 'MI';
      }
      if (exo.bareme === 'musset7') {
        /* « une ou deux bonnes réponses → TBM, les autres → MI » : le texte ne tranche
           pas entre les deux lectures, le corrigé accepte donc l'une, l'autre, ou les deux. */
        if (faux) return 'MI';
        return justes >= 1 ? 'TBM' : 'MI';
      }
      return niveau(Math.max(0, justes - faux) / exo.bonnes.length);
    }
    if (exo.type === 'ordre') {
      const saisis = rep.filter(x => x);
      if (!saisis.length) return null;
      let justes = 0;
      exo.rangs.forEach((r, i) => { if (Number(rep[i]) === r) justes++; });
      if (exo.bareme === 'buck5') {
        /* le corrigé ne prévoit pas de MF ici */
        if (justes === exo.rangs.length) return 'TBM';
        return justes >= 2 ? 'MS' : 'MI';
      }
      if (exo.bareme === 'ex12') {
        /* barème officiel : tout juste → TBM ; au moins deux justes DONT le rang 1
           (l'élève a vu l'antériorité du cauchemar), ou bien l'ordre 4-3-2 respecté
           sans que le 1 soit à sa place → MS ; le rang 1 seul → MF. */
        const iUn = exo.rangs.indexOf(1);
        const aLUn = Number(rep[iUn]) === 1;
        if (justes === exo.rangs.length) return 'TBM';
        const suite = exo.rangs.map((r, i) => [r, Number(rep[i])])
          .filter(p => p[0] !== 1).sort((a, b) => a[0] - b[0]).map(p => p[1]);
        const ordreTrois = suite.every((v, i) => v && (i === 0 || v > suite[i - 1]));
        if ((justes >= 2 && aLUn) || ordreTrois) return 'MS';
        if (aLUn) return 'MF';
        return 'MI';
      }
      if (exo.bareme === 'musset5') {
        /* Barème officiel du fin de 3e : le bon ordre → TBM, deux bonnes → MF, autre
           → MI. Pas de MS : le corrigé saute ce palier, on ne le comble pas. */
        if (justes === exo.rangs.length) return 'TBM';
        return justes >= 2 ? 'MF' : 'MI';
      }
      if (exo.bareme === 'c2ex10') {
        /* Barème officiel du fin de CE1 (cycle 2) : 4 3 2 1 → TBM ; 4 3 1 2 → MS — l'élève
           a suivi l'ordre du texte sans voir que le plus-que-parfait vient AVANT ; seule
           la place du 1 (l'antériorité) respectée → MF ; autre → MI. */
        if (justes === exo.rangs.length) return 'TBM';
        const suite = rep.map(x => Number(x));
        if (suite[0] === 4 && suite[1] === 3 && suite[2] === 1 && suite[3] === 2) return 'MS';
        const iUn = exo.rangs.indexOf(1);
        return Number(rep[iUn]) === 1 ? 'MF' : 'MI';
      }
      return niveau(justes / exo.rangs.length);
    }
    if (exo.type === 'paires') {
      const saisis = rep.filter(x => x);
      if (!saisis.length) return null;
      let justes = 0;
      exo.elements.forEach((el, i) => { if (rep[i] === el[1]) justes++; });
      if (exo.bareme === 'buck3') {
        return ['MI', 'MF', 'MS', 'TBM'][Math.min(3, justes)];
      }
      if (exo.bareme === 'ex14') {
        /* barème officiel : 5 justes sur 6 → TBM, au moins 3 → MS, au moins 2 → MF */
        if (justes >= 5) return 'TBM';
        if (justes >= 3) return 'MS';
        if (justes >= 2) return 'MF';
        return 'MI';
      }
      if (exo.bareme === 'troisSur3') {
        /* Trois appariements : les trois → TBM, deux → MS, un → MF, aucun → MI.
           Le calcul par proportion donnerait MF pour deux sur trois (0,67) : c'est
           pourquoi ce barème existe. */
        return ['MI', 'MF', 'MS', 'TBM'][Math.min(3, justes)];
      }
      if (exo.bareme === 'musset8') {
        /* Quatre affirmations : les quatre → TBM, trois → MS, une ou deux → MF. */
        if (justes >= 4) return 'TBM';
        if (justes === 3) return 'MS';
        return justes >= 1 ? 'MF' : 'MI';
      }
      return niveau(justes / exo.elements.length);
    }
    if (exo.type === 'juge') return null; /* la note vient des cases, voir noteJuge */
    return null;
  }

  /* Les exercices « juge » sans cases (lecture à voix haute) restent notés à la main.
     Avec des cases, chaque case cochée compte pour une part. */
  function noteJuge(exo, rep) {
    if (!exo.cases || !rep) return null;
    const repondu = rep.some(x => x != null);
    if (!repondu) return null;
    const oui = exo.cases.filter((c, i) => rep[i] === true).length;
    return niveau(oui / exo.cases.length);
  }

  function note(exo, rep) {
    return exo.type === 'juge' ? noteJuge(exo, rep) : noteDe(exo, rep);
  }

  /* Réponse vide, du bon format selon le type. */
  function vide(exo) {
    if (exo.type === 'unique' || exo.type === 'bareme') return '';
    if (exo.type === 'multi') return [];
    if (exo.type === 'ordre') return exo.phrases.map(() => '');
    if (exo.type === 'sous' || exo.type === 'ouvert') return exo.sous.map(() => '');
    if (exo.type === 'paires') return exo.elements.map(() => '');
    if (exo.type === 'juge') return (exo.cases || []).map(() => null);
    return null;
  }

  /* La phrase de la fiche, tirée de la réponse saisie. L'échelle a QUATRE niveaux : un
     constat peut donc en distinguer autant (`tbm`, `ms`, `mf`, `mi`), avec repli sur
     `ok` pour MS et TBM, sur `non` pour MF et MI. Sans cette finesse, une réussite
     partielle et un échec complet s'écrivent de la même façon sur la fiche officielle.
     `rien` a sa propre formulation, parce que ne rien poser n'est pas se tromper — sauf
     là où l'exercice porte `rienVaut`, et alors la phrase doit dire l'échec. */
  function constat(exo, rep, note) {
    if (!exo.constat) return '';
    const c = exo.constat;
    /* Barème choisi « Rien écrit » : l'exercice a été proposé et laissé vide. La note
       est MI (barème officiel : « autre → MI ») et la phrase de la fiche est celle du
       non-acquis — « ne maîtrise pas… ». Elle a tranché ainsi le 02/09 : sur une fiche
       officielle, « exercice laissé vide » ne dit rien de la compétence. Un exercice
       peut malgré tout porter sa propre formulation `vide`, qui l'emporte alors. */
    if (rep === 'Rien écrit' || rep === 'Rien entouré') return c.vide || c.non || '';
    /* Un résultat sans opération posée : ce n'est pas « mal posé », c'est « pas posé ».
       Le cas de Matti, 03/09 — il écrit un résultat faux sans aucune trace de calcul. */
    if (rep === 'Un résultat écrit sans opération posée') {
      return c.sansPoser || c.non || '';
    }
    const toutRien = exo.type === 'ouvert' && (rep || []).length
      && (rep || []).every(x => x === 'rien' || !x) && (rep || []).some(x => x === 'rien');
    if (toutRien && c.rien && !exo.rienVaut) return c.rien;
    if (!note) return toutRien && c.rien ? c.rien : '';
    const parNiveau = { TBM: c.tbm, MS: c.ms, MF: c.mf, MI: c.mi };
    if (parNiveau[note]) return parNiveau[note];
    if (toutRien && c.rien) return c.rien;
    return acquisNote(note) ? c.ok : c.non;
  }
  const acquisNote = (n) => n === 'MS' || n === 'TBM';

  window.CORRIGES = { CORRIGES: C, pour, note, noteDe, noteJuge, niveau, vide, constat };
})();
