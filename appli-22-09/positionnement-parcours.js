/* Lecture du PARCOURS SCOLAIRE écrit sur la fiche EANA.
   ------------------------------------------------------------------
   Sa demande du 05/09 : que l'application propose le test d'après ce qui est écrit dans
   le parcours, et non d'après le seul âge — « une jeune fille de 15 ans scolarisée
   jusqu'en CM2 ». Sa consigne d'écriture, portée au guide : commencer par
   « scolarisé(e) jusqu'en… ».

   ⚠ Ce fichier lit des MOTS-CLÉS, il ne comprend pas le texte. Il rend donc toujours
   la phrase repérée et sa raison, pour qu'elle juge sur pièce ; et quand il ne trouve
   rien de sûr, il rend null au lieu de deviner. Aucune décision n'est prise ici. */
(function () {
  /* Les niveaux français, du plus bas au plus haut, avec le nombre d'années d'école
     accomplies à la fin de ce niveau (CP = 1 an). Les clés sont celles de TESTS.NIVEAUX. */
  var NIVEAUX = [
    { cle: 'cp', nom: 'CP', annees: 1, mots: ["cp", "cours preparatoire", "cours préparatoire"] },
    { cle: 'ce1', nom: 'CE1', annees: 2, mots: ["ce1"] },
    { cle: 'ce2', nom: 'CE2', annees: 3, mots: ["ce2"] },
    { cle: 'cm1', nom: 'CM1', annees: 4, mots: ["cm1"] },
    { cle: 'cm2', nom: 'CM2', annees: 5, mots: ["cm2"] },
    { cle: '6e', nom: '6e', annees: 6, mots: ["6e", "6eme", "6ème", "sixieme", "sixième"] },
    { cle: '5e', nom: '5e', annees: 7, mots: ["5e", "5eme", "5ème", "cinquieme", "cinquième"] },
    { cle: '4e', nom: '4e', annees: 8, mots: ["4e", "4eme", "4ème", "quatrieme", "quatrième"] },
    { cle: '3e', nom: '3e', annees: 9, mots: ["3e", "3eme", "3ème", "troisieme", "troisième"] },
    { cle: '2de', nom: 'seconde', annees: 10, mots: ["2de", "2nde", "seconde"] },
    { cle: '1re', nom: 'première', annees: 11, mots: ["1re", "1ere", "1ère", "premiere", "première"] },
    { cle: 'term', nom: 'terminale', annees: 12, mots: ["terminale", "term"] }
  ];

  /* Ce qui dit qu'il n'y a pas eu d'école, ou qu'elle s'est arrêtée. Ces mentions ne
     donnent pas un niveau : elles disent de ne pas se fier à la classe d'âge. */
  var RUPTURES = [
    { mots: ["jamais scolarise", "jamais ete scolarise", "non scolarise", "pas scolarise",
      "aucune scolarisation", "pas d'ecole", "jamais alle a l'ecole"],
      mot: "la fiche indique qu'il n'y a pas eu de scolarisation" },
    { mots: ["ecole coranique", "coranique", "medersa", "madrasa"],
      mot: "la fiche mentionne une école coranique : ce n'est pas une scolarisation en langue écrite scolaire" },
    { mots: ["interrompu", "interruption", "arret de la scolarite", "arrete l'ecole",
      "descolarise", "rupture scolaire"],
      mot: "la fiche mentionne une interruption de scolarité" },
    { mots: ["analphabete", "illettre", "ne sait pas lire", "ne lit pas"],
      mot: "la fiche mentionne que l'élève ne lit pas" }
  ];

  /* Les accents et la casse ne doivent pas décider : on compare sur du texte aplati. */
  function plat(s) {
    return String(s || '')
      .replace(/[\u00e9\u00e8\u00ea\u00eb]/g, 'e').replace(/[\u00e0\u00e2\u00e4]/g, 'a')
      .replace(/[\u00ee\u00ef]/g, 'i').replace(/[\u00f4\u00f6]/g, 'o')
      .replace(/[\u00fb\u00f9\u00fc]/g, 'u').replace(/\u00e7/g, 'c')
      .replace(/\u2019/g, "'")
      .toLowerCase();
  }

  /* La phrase d'origine autour d'un mot trouvé : c'est elle qu'on affiche, telle qu'elle
     est écrite sur la fiche — jamais une reformulation. */
  function phraseAutour(texte, index) {
    var t = String(texte || '');
    var debut = Math.max(t.lastIndexOf('.', index), t.lastIndexOf('\n', index),
      t.lastIndexOf(';', index)) + 1;
    var fins = [t.indexOf('.', index), t.indexOf('\n', index), t.indexOf(';', index)]
      .filter(function (x) { return x >= 0; });
    var fin = fins.length ? Math.min.apply(null, fins) : t.length;
    return t.slice(debut, fin).trim();
  }

  function niveauParMot(p) {
    /* On cherche le niveau le PLUS HAUT nommé : « du CP au CM2 » veut dire CM2. */
    var trouve = null;
    NIVEAUX.forEach(function (n) {
      n.mots.forEach(function (m) {
        /* Bornes de mot : « 6e » ne doit pas se trouver dans « 16e », ni « cp » dans « cpge ». */
        var re = new RegExp('(^|[^a-z0-9])' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])');
        var i = p.search(re);
        if (i >= 0 && (!trouve || n.annees > trouve.niveau.annees)) {
          trouve = { niveau: n, index: i };
        }
      });
    });
    return trouve;
  }

  /* « 9 ans d'école », « scolarisé pendant 5 ans », « 7 années de scolarité ». */
  function anneesEcole(p) {
    var re = /(\d{1,2})\s*(?:ans|annees|annee)\s*(?:d'|de\s+)?(?:ecole|scolarite|scolarisation|classe)/;
    var m = p.match(re);
    if (m) return { annees: parseInt(m[1], 10), index: m.index, mot: m[0] };
    var re2 = /scolarise[e]?\s*(?:pendant|durant)\s*(\d{1,2})\s*(?:ans|annees)/;
    var m2 = p.match(re2);
    if (m2) return { annees: parseInt(m2[1], 10), index: m2.index, mot: m2[0] };
    return null;
  }

  /* « sa 4ème année scolaire », « de la première à la 5ème année » : un ORDINAL suivi de
     « année » compte des années d'école accomplies — ce n'est PAS la classe de 4e.
     Erreur commise sur Leila (« 4ème année scolaire » lue « fin de 4e », quatre niveaux
     de trop), corrigée le 05/09. On retient le plus grand ordinal (« de la première à la
     5ème année » = 5 ans d'école) et on IGNORE « première année », presque toujours
     descriptif (« sa première année de maternelle »). */
  function anneesOrdinal(p) {
    /* ⚠ Un ordinal ne dit le niveau ATTEINT que s'il marque un terme : « a terminé sa
       4ème année », « de la première à la 5ème année ». « PENDANT sa 5ème année, il a
       changé d'école » raconte un épisode et ne dit rien du niveau final — erreur
       commise sur Matti (lu CM2 alors qu'il est en 3ème), corrigée le 05/09. */
    var TERME = /(termin|fini|acheve|jusqu|derniere|dernier|arret|quitte|a\s+la\s+\d|a\s+la\s+(?:deuxieme|troisieme|quatrieme|cinquieme|sixieme|septieme|huitieme|neuvieme|dixieme))/;
    var AVANT = /(pendant|durant|au\s+cours\s+de|lors\s+de|en)\s*(?:sa|son|la|le|ma|mon)?\s*$/;
    var phraseDe = function (i) {
      var deb = Math.max(p.lastIndexOf('.', i), p.lastIndexOf('\n', i), p.lastIndexOf(';', i)) + 1;
      var f = [p.indexOf('.', i), p.indexOf('\n', i), p.indexOf(';', i)]
        .filter(function (x) { return x >= 0; });
      return p.slice(deb, f.length ? Math.min.apply(null, f) : p.length);
    };
    var accepte = function (i) {
      if (AVANT.test(p.slice(Math.max(0, i - 26), i))) return false;
      return TERME.test(phraseDe(i));
    };
    var re = /(\d{1,2})\s*(?:eme|ere|re|er|e)?\s*annee/g;
    var m, best = null;
    while ((m = re.exec(p)) !== null) {
      var n = parseInt(m[1], 10);
      if (n >= 2 && n <= 12 && accepte(m.index) && (!best || n > best.annees)) {
        best = { annees: n, index: m.index, mot: m[0] };
      }
    }
    if (best) return best;
    var LETTRES = { deuxieme: 2, troisieme: 3, quatrieme: 4, cinquieme: 5, sixieme: 6,
      septieme: 7, huitieme: 8, neuvieme: 9, dixieme: 10 };
    for (var mot in LETTRES) {
      var m2 = p.match(new RegExp(mot + '\\s+annee'));
      if (m2 && accepte(m2.index)) return { annees: LETTRES[mot], index: m2.index, mot: m2[0] };
    }
    return null;
  }

  /* Ce qui ne doit JAMAIS être lu comme un niveau, masqué par des espaces pour que les
     positions dans le texte d'origine restent justes :
     – les âges : « jusqu'à ses 5 ans », « à l'âge de 3 ans » — un âge n'est pas un niveau
       (erreur commise sur Matti : « jusqu'à ses 5 ans » lu « jusqu'en première ») ;
     – « première / seconde / Nème + année », déjà traité comme un compte d'années. */
  function masque(p) {
    var res = p;
    [/jusqu'?\s*a\s*(?:ses|l'age\s*de)?\s*\d{1,2}\s*ans/g,
      /a\s*(?:ses|l'age\s*de)\s*\d{1,2}\s*ans/g,
      /(?:^|[^a-z])a\s+\d{1,2}\s*ans/g,
      /(?:premiere|seconde|deuxieme|troisieme|quatrieme|cinquieme|sixieme|septieme|huitieme|neuvieme|dixieme)\s+annee/g,
      /\d{1,2}\s*(?:eme|ere|re|er|e)?\s*annee/g
    ].forEach(function (r) {
      res = res.replace(r, function (t) { return new Array(t.length + 1).join(' '); });
    });
    return res;
  }

  /* « grade 7 », « classe 9 », « 9th grade » : dans la plupart des systèmes, le rang de
     la classe est le nombre d'années accomplies. C'est une approximation — elle est
     annoncée comme telle dans la raison affichée. */
  function grade(p) {
    var m = p.match(/(?:grade|classe|class|year)\s*(\d{1,2})/);
    if (!m) {
      m = p.match(/(\d{1,2})\s*(?:th|st|nd|rd)?\s*grade/);
    }
    if (!m) return null;
    var n = parseInt(m[1], 10);
    if (!(n >= 1 && n <= 12)) return null;
    return { annees: n, index: m.index, mot: m[0] };
  }

  function parAnnees(a) {
    var trouve = null;
    NIVEAUX.forEach(function (n) { if (n.annees === a || (a > 12 && n.annees === 12)) trouve = n; });
    return trouve;
  }

  /* Les DIPLÔMES obtenus sont l'indice le plus sûr : un brevet réussi dit que la fin de
     3e est acquise, quoi que dise le reste du texte. */
  var DIPLOMES = [
    { mots: ["brevet", "bem", "dnb", "bepc"], annees: 9, nom: 'brevet' },
    { mots: ["baccalaureat", "bac "], annees: 12, nom: 'baccalauréat' },
    { mots: ["cap "], annees: 11, nom: 'CAP' }
  ];
  var ECHOUE = /(echou|rate|pas obtenu|non obtenu|sans succes)/;

  /* Les ÉTAPES du parcours : « ensuite au CEM pendant 4 ans », « enfin en lycée pour
     deux années ». Chacune a une durée, et elles s'ADDITIONNENT — c'est ce qui manquait :
     on ne lisait que le premier fragment (« de la première à la 5ème année ») et on
     concluait CM2 sur une élève de terminale qui avait son brevet (erreur du 05/09). */
  var CHIFFRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7,
    huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12 };
  var ETAPES = [
    { mots: ["primaire", "ecole primaire", "elementaire"], parDefaut: 5, plancher: 0 },
    { mots: ["cem", "college", "ceg", "moyen"], parDefaut: 4, plancher: 6 },
    { mots: ["lycee", "secondaire"], parDefaut: 3, plancher: 10 }
  ];

  function nombreAvant(s) {
    var m = s.match(/(\d{1,2})\s*(?:ans|annees|annee)/);
    if (m) return parseInt(m[1], 10);
    for (var mot in CHIFFRES) {
      if (new RegExp('(^|[^a-z])' + mot + '\\s+(?:ans|annees|annee)').test(s)) return CHIFFRES[mot];
    }
    return null;
  }

  /* La durée d'une étape peut aussi être écrite en ordinal : « en primaire de la première
     à la 5ème année » = 5 années de primaire. Sans ça, l'étape passait pour estimée
     alors que la fiche la donnait (Sana, 05/09). */
  function dureeOrdinale(s) {
    var re = /(\d{1,2})\s*(?:eme|ere|re|er|e)?\s*annee/g, m, best = null;
    while ((m = re.exec(s)) !== null) {
      var n = parseInt(m[1], 10);
      if (n >= 1 && n <= 12 && (!best || n > best)) best = n;
    }
    return best;
  }

  /* Toutes les étapes nommées, avec leur durée quand elle est écrite. */
  function etapes(p, brutPlat) {
    var out = [];
    ETAPES.forEach(function (e) {
      e.mots.forEach(function (mot) {
        var re = new RegExp('(^|[^a-z])' + mot + '([^a-z]|$)');
        var i = p.search(re);
        if (i < 0) return;
        if (out.some(function (x) { return x.groupe === e; })) return;
        /* La durée est écrite juste après (« pendant 4 ans », « pour deux années »),
           parfois juste avant (« 4 ans au collège »), parfois en ordinal dans la même
           phrase du texte non masqué (« de la première à la 5ème année »). */
        var apres = p.slice(i, i + 60), avant = p.slice(Math.max(0, i - 30), i);
        var ord = null;
        if (brutPlat) {
          var deb = Math.max(brutPlat.lastIndexOf('.', i), brutPlat.lastIndexOf('\n', i)) + 1;
          var fins = [brutPlat.indexOf('.', i), brutPlat.indexOf('\n', i)]
            .filter(function (x) { return x >= 0; });
          ord = dureeOrdinale(brutPlat.slice(deb, fins.length ? Math.min.apply(null, fins) : brutPlat.length));
        }
        out.push({ groupe: e, mot: mot, index: i,
          annees: nombreAvant(apres) || nombreAvant(avant) || ord || null });
      });
    });
    return out;
  }

  /* Le cœur : ce que le parcours dit du niveau atteint.
     ⚠ On COLLECTE tous les indices et on retient le PLUS HAUT — un parcours s'énumère
     dans l'ordre chronologique, le premier fragment est donc le plus bas. Renvoie null
     si rien de lisible : surtout ne pas inventer. */
  function lire(texte) {
    var brut = String(texte || '').trim();
    if (!brut) return null;
    var p = plat(brut);
    var q = masque(p);

    var ruptures = [];
    RUPTURES.forEach(function (r) {
      r.mots.forEach(function (m) {
        if (ruptures.length || q.indexOf(m) < 0) return;
        ruptures.push({ mot: r.mot, phrase: phraseAutour(brut, q.indexOf(m)) });
      });
    });

    var indices = [];
    var pousse = function (annees, index, raison, source) {
      var n = parAnnees(annees);
      if (n) indices.push({ niveau: n, annees: annees, index: index, raison: raison, source: source });
    };

    /* 1. Un diplôme OBTENU : l'indice le plus sûr. ⚠ Il faut la preuve de l'obtention :
       « l'année charnière de 3ème avec le DNB » parle d'un examen à VENIR — comptabilisé
       comme acquis, il faisait conclure à tort (Matti, 05/09). */
    var OBTENU = /(reussi|obtenu|valide|decroche|avec mention|diplome)/;
    DIPLOMES.forEach(function (dip) {
      dip.mots.forEach(function (mot) {
        var i = q.indexOf(mot);
        if (i < 0) return;
        var ph = plat(phraseAutour(brut, i));
        if (ECHOUE.test(ph) || !OBTENU.test(ph)) return;
        pousse(dip.annees, i, 'la fiche mentionne le ' + dip.nom
          + ' réussi : la fin de ' + parAnnees(dip.annees).nom + ' est acquise', 'diplome');
      });
    });

    /* 2. « jusqu'en <niveau> » : sa formulation, celle du guide. */
    var mj = q.match(/jusqu'?\s*(?:en|au|a\s+la\s+classe\s+de|a\s+la)\b/);
    if (mj) {
      var fen = q.slice(mj.index, mj.index + 70).split(/[.\n;]/)[0];
      var pj = niveauParMot(fen);
      if (pj) indices.push({ niveau: pj.niveau, annees: pj.niveau.annees, index: mj.index,
        raison: 'la fiche dit « ' + brut.substr(mj.index, fen.length).trim() + ' »',
        source: 'jusquen' });
    }

    /* 3. Les étapes du parcours, ADDITIONNÉES quand il y en a plusieurs. */
    var et = etapes(q, p);
    if (et.length) {
      var total = 0, connues = 0, dernier = null;
      et.forEach(function (x) {
        total += (x.annees || x.groupe.parDefaut);
        if (x.annees) connues++;
        if (!dernier || x.index > dernier.index) dernier = x;
      });
      if (et.length > 1) {
        pousse(total, dernier.index,
          'la fiche décrit ' + et.length + ' étapes (' + et.map(function (x) {
            return x.mot + (x.annees ? ' ' + x.annees + ' ans' : '');
          }).join(', ') + ') : environ ' + total + ' années d\'école'
          + (connues < et.length ? ' (durées en partie estimées)' : ''), 'etapes');
      }
      /* Un lycée fréquenté suppose le collège fait : c'est un plancher, pas un compte. */
      if (dernier.groupe.plancher) {
        pousse(dernier.groupe.plancher, dernier.index,
          'la fiche mentionne le ' + dernier.mot + ' : la scolarité du niveau précédent est faite',
          'plancher');
      }
    }

    /* 4. « sa 4ème année scolaire », « de la première à la 5ème année » = des ANNÉES. */
    var o = anneesOrdinal(p);
    if (o) pousse(o.annees, o.index,
      'la fiche dit « ' + brut.substr(o.index, o.mot.length).trim() + ' » : ' + o.annees
        + ' années d\'école, soit le niveau ' + (parAnnees(o.annees) || {}).nom + ' en France',
      'annees');

    /* 5. « 9 ans d'école ». */
    var a = anneesEcole(p);
    if (a) pousse(a.annees, a.index,
      'la fiche dit « ' + brut.substr(a.index, a.mot.length).trim() + ' » : ' + a.annees
        + ' années d\'école, soit le niveau ' + (parAnnees(a.annees) || {}).nom + ' en France',
      'annees');

    /* 6. « grade 7 », « classe 9 » : approximation, annoncée comme telle. */
    var g = grade(q);
    if (g) pousse(g.annees, g.index,
      'la fiche dit « ' + brut.substr(g.index, g.mot.length).trim() + ' » : ' + g.annees
        + ' années d\'école, soit le niveau ' + (parAnnees(g.annees) || {}).nom
        + ' en France (équivalence approchée)', 'grade');

    /* 7. Dernier recours : un niveau nommé quelque part, appui faible — et seulement si
       rien d'autre n'a parlé. */
    if (!indices.length) {
      var seul = niveauParMot(q);
      if (seul) indices.push({ niveau: seul.niveau, annees: seul.niveau.annees,
        index: seul.index, source: 'mention',
        raison: 'la fiche mentionne ' + seul.niveau.nom + ' (sans « jusqu\'en » : à vérifier)' });
    }

    /* Le plus haut niveau l'emporte : le parcours se lit du début à la fin, et c'est la
       FIN qui dit où en est l'élève. À égalité, le diplôme passe devant. */
    var res = null;
    indices.forEach(function (x) {
      if (!res || x.annees > res.annees
        || (x.annees === res.annees && x.source === 'diplome')) res = x;
    });

    /* ⚠ Garde-fou : la phrase montrée doit contenir l'appui, sinon on citerait la fiche
       à faux — erreur commise sur Matti (05/09). */
    if (res) {
      var phrase = phraseAutour(brut, res.index);
      var dedans = plat(phrase);
      var appui = res.source !== 'jusquen'
        || res.niveau.mots.some(function (m) { return dedans.indexOf(m) >= 0; });
      if (appui) { res.phrase = phrase; } else { res = null; }
    }

    if (!res && !ruptures.length) return null;
    return {
      niveauCle: res ? res.niveau.cle : '',
      niveauNom: res ? res.niveau.nom : '',
      annees: res ? res.niveau.annees : null,
      source: res ? res.source : 'rupture',
      phrase: res ? res.phrase : ruptures[0].phrase,
      raison: res ? res.raison : ruptures[0].mot,
      ruptures: ruptures
    };
  }

  /* Le niveau lu, comparé à la classe d'âge : c'est l'écart qui rend la suggestion utile.
     `classeCle` est la clé de la classe d'âge (TESTS.NIVEAUX / EANA.CLASSES). */
  function ecart(lu, classeCle) {
    if (!lu || !lu.annees) return null;
    var c = null;
    NIVEAUX.forEach(function (n) { if (n.cle === classeCle) c = n; });
    if (!c) return null;
    var e = c.annees - lu.annees;
    if (e <= 0) return { ans: 0, mot: '' };
    return { ans: e, mot: e === 1 ? 'un an sous sa classe d\'âge'
      : e + ' ans sous sa classe d\'âge' };
  }

  window.PARCOURS = { NIVEAUX: NIVEAUX, lire: lire, ecart: ecart, plat: plat };
})();
