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
        { v: 'MS', nom: 'MS', aide: 'maîtrise satisfaisante', pts: 2, fond: '#e6f2e9', texte: '#2a6b45' },
        { v: 'TBM', nom: 'TBM', aide: 'très bonne maîtrise', pts: 3, fond: '#cfeadb', texte: '#155e3d' }
      ]
    },
    lyon: {
      id: 'lyon', nom: 'NE / -- / - / + / ++', source: 'CASNAV Lyon',
      seuil: 'un palier n\'est retenu qu\'au-dessus de 60 %',
      valeurs: null /* pris dans window.POSITIONNEMENT.ECHELLE au moment de l'affichage */
    }
  };

  /* Les exercices, quand on les connaît vraiment (tests reçus d'elle).
     domaine : sert à pré-remplir les cases de la fiche EANA. */
  const EXERCICES = {
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
    'canope-maths-5e': [
      ['1', 'Priorités opératoires (deux calculs à entourer)', 'nombres'],
      ['2', 'Calculer A = 6 + 2y pour y = 4', 'nombres'],
      ['3', 'Réduire et développer trois expressions littérales', 'nombres'],
      ['4', 'Calculs avec des fractions', 'nombres'],
      ['5', 'Calculs avec des nombres relatifs', 'nombres'],
      ['6', 'Tableau de proportionnalité (prix des livres)', 'donnees'],
      ['7', 'Pourcentage : un pull à 50 € soldé de 20 %', 'donnees'],
      ['8', "Aire d'un triangle et aire d'un disque", 'grandeurs'],
      ['9', 'Repérage dans le plan : lire et placer des points', 'geometrie'],
      ['10', 'Symétrie centrale par rapport à un point', 'geometrie'],
      ['11', 'Angle manquant dans un triangle', 'geometrie']
    ],
    'canope-maths-c4': [
      ['1', 'Multiples et diviseurs (vrai / faux)', 'nombres'],
      ['2', 'Factoriser avec un facteur commun', 'nombres'],
      ['3', 'Identités remarquables', 'nombres'],
      ['4', 'Résoudre une équation produit', 'nombres'],
      ['5', "Lire l'image d'un nombre sur un graphique et dans un tableau", 'donnees'],
      ['6', 'Reconnaître la représentation graphique de trois fonctions', 'donnees'],
      ['7', 'Trigonométrie : sinus, cosinus, tangente', 'geometrie'],
      ['8', 'Théorème de Thalès', 'geometrie'],
      /* L'exercice 9 est noté trois fois dans le corrigé officiel : trois lignes. */
      ['9a', 'Agrandissement : les aires des deux cubes', 'grandeurs'],
      ['9b', 'Agrandissement : les volumes des deux cubes', 'grandeurs'],
      ['9c', 'Agrandissement : les coefficients a et b', 'grandeurs']
    ],
    'canope-maths-4e': [
      ['1', 'Calculs avec des nombres relatifs', 'nombres'],
      ['2', 'Calculs avec des fractions', 'nombres'],
      ['3', 'Puissances de 10 et de 5', 'nombres'],
      ['4', 'Résoudre 16x − 5 = 3', 'nombres'],
      ['5', "Encadrer une écriture scientifique (vrai / faux)", 'nombres'],
      ['6', 'Développer un produit de deux parenthèses', 'nombres'],
      ['7', 'Calculer une moyenne', 'donnees'],
      ['8', "Calculer un volume", 'grandeurs'],
      ['9', 'Durée à partir de la distance et de la vitesse', 'donnees'],
      ['10', 'Théorème de Pythagore : calculer AC', 'geometrie']
    ],
    'canope-maths-c2': [
      ['1', 'Matériel base 10 : entourer le nombre', 'nombres'],
      ['2', 'Problème : combien en tout', 'donnees'],
      ['3', 'Problème : combien de filles', 'donnees'],
      ['4', 'Décomposer (382 = 300 + 80 + 2)', 'nombres'],
      ['5', 'Additions posées', 'nombres'],
      ['6', 'Compléter une suite de 10 en 10', 'nombres'],
      ['7', 'Ranger du plus petit au plus grand', 'nombres'],
      ['8', 'Soustractions posées', 'nombres'],
      ['9', 'Multiplications posées', 'nombres']
    ],
    'canope-maths-c3': [
      ['1', 'Multiplication posée : 297 × 35', 'nombres'],
      ['2', 'Division posée : 408 ÷ 3', 'nombres'],
      ['3', 'Addition de décimaux : 164,8 + 26,57', 'nombres'],
      ['4', 'Soustraction de décimaux : 37,9 − 28,72', 'nombres'],
      ['5', 'Entourer la fraction égale à 5,4', 'nombres'],
      ['6', 'Problème : combien de bonbons de plus', 'donnees'],
      ['7', 'Compléter le tableau de prix', 'donnees'],
      ['8', 'Fractions de bande : lire et colorier', 'nombres'],
      ['9', 'Ranger des décimaux du plus petit au plus grand', 'nombres'],
      ['10', 'Colorier le tiers de la bande', 'nombres'],
      ['11', 'Multiplication de décimaux : 49,7 × 3,6', 'nombres'],
      ['12', 'Compléter l\'égalité : 1/4 = 0,25', 'nombres'],
      ['13', 'Problème : 20 œufs dans des boîtes de 6', 'donnees'],
      ['14', 'Conversions (kg, min, s, cl, km)', 'grandeurs'],
      ['15', "Mesurer un angle au rapporteur", 'grandeurs'],
      ['16', 'Nommer les figures', 'geometrie'],
      ['17', 'Tracer une perpendiculaire et une parallèle', 'geometrie'],
      ['18', 'Faces, arêtes et sommets d\'un solide', 'geometrie'],
      ['19', 'Tracer le symétrique par rapport à une droite', 'geometrie'],
      ['20', 'Construire un triangle (8, 6 et 5 cm)', 'geometrie']
    ]
  };

  const DOMAINES = {
    nombres: 'Nombres et calcul', donnees: 'Organisation et gestion de données',
    grandeurs: 'Grandeurs et mesures', geometrie: 'Espace et géométrie',
    lecture: 'Lecture', comprehension: 'Compréhension', inference: 'Inférence',
    expression: 'Expression écrite',
    reperage: "Repérage d'informations", langue: 'Langue et vocabulaire'
  };

  /* Quand le test n'est pas encore dans la base, on pose une grille par domaine :
     ce sont les quatre domaines de la fiche EANA, ce qui permet quand même de
     remplir les quatre cases « Mathématiques » du PDF. */
  const PARDEFAUT = { lecture: 5, maths: 12 };
  const DOM_MATHS = ['nombres', 'donnees', 'grandeurs', 'geometrie'];

  function echelleDe(test) {
    if (!test) return ECHELLES.canope;
    if (test.dansAppli) return ECHELLES.lyon;
    return ECHELLES.canope;
  }

  function valeurs(echelle) {
    if (echelle.valeurs) return echelle.valeurs;
    const P = window.POSITIONNEMENT;
    return (P && P.ECHELLE) ? P.ECHELLE.map(e => Object.assign({ aide: e.aide }, e)) : [];
  }

  function exercices(test) {
    if (!test) return [];
    if (test.dansAppli) {
      const P = window.POSITIONNEMENT;
      const t = P && P.TESTS && (P.TESTS[test.matiere === 'maths' ? 'maths' : 'fr']);
      /* attendu / grille : le corrigé CASNAV Lyon, pour l'afficher à l'étape 3. */
      return t ? t.exercices.map(e => ({ id: e.id, num: e.num, titre: e.capacite || e.titre,
        domaine: e.groupe, attendu: e.attendu || '', grille: e.grille || '',
        paliers: e.paliers || [], fiche: e.fiche || '', court: e.court || '' })) : [];
    }
    const connus = EXERCICES[test.id];
    if (connus) return connus.map(([num, titre, domaine]) => ({ id: test.id + '-' + num, num, titre, domaine }));
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
  function bilan(test, scores) {
    const ech = echelleDe(test), vals = valeurs(ech);
    const pts = {}, acquis = {};
    vals.forEach(v => { pts[v.v] = v.pts; acquis[v.v] = v.v === 'MS' || v.v === 'TBM' || v.v === '+' || v.v === '++'; });
    const max = Math.max.apply(null, vals.map(v => v.pts == null ? 0 : v.pts));
    const exos = exercices(test);
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
