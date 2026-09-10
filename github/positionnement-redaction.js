/* LA RÉDACTION DES RUBRIQUES DE LA FICHE EANA

   Ce fichier ne décide rien : il propose un BROUILLON dans les tournures relevées sur
   les fiches réellement remplies (quatre profils : un anglophone scolarisé, un
   francophone de niveau B2, un élève peu scolarisé arabophone, une lycéenne
   francophone orientée en 2GT). L'enseignante relit,
   corrige, réécrit — rien n'est envoyé dans le PDF sans son passage.

   Les règles de style relevées sur ses fiches :
     · le CONSTAT, jamais le score — « La lecture en anglais est fluide. », pas « MS » ;
     · les mathématiques en TIRETS, une compétence par ligne ;
     · ce qui n'a pas été vu s'écrit : « Non évalué » ;
     · ce que la langue empêche d'évaluer : « Évaluation impossible. » ;
     · le PRÉNOM de l'élève ouvre souvent la phrase, plutôt qu'un « il » anonyme ;
     · en expression écrite, les manques s'annoncent par « Axes de progression
       identifiés: » et se listent à tirets, jamais comme un échec ;
     · les Remarques sont une suite de PARAGRAPHES séparés par une ligne vide : le
       profil, les mathématiques, le projet quand il existe, puis toujours la
       préconisation en dernier — « Nous préconisons une affectation en… ». */
(function () {
  const acquis = (n) => n === 'MS' || n === 'TBM';

  /* Le profil de départ, lu sur la fiche. C'est lui qui commande le registre. */
  function profil(f) {
    const n = (f.niveauScolaire || '').toLowerCase();
    if (n.indexOf('non scolarisé') >= 0) return 'nsa';
    if (n.indexOf('peu scolarisé') >= 0) return 'peu';
    if (n.indexOf('[en français]') >= 0) return 'francophone';
    if (n.indexOf('autre langue') >= 0) return 'autrelangue';
    return '';
  }
  function parleFrancais(f) {
    const n = (f.niveauFrancais || '').toLowerCase();
    if (n.indexOf('couramment') >= 0) return 'oui';
    if (n.indexOf('pas du tout') >= 0 || n.indexOf('très peu') >= 0) return 'non';
    if (n) return 'un peu';
    return '';
  }
  const prenom = (f) => (f.prenom || '').trim();
  /* « Il » / « Elle » : la fiche EANA coche le sexe, l'étape 4 le redemande en clair. */
  /* ⚠ TROIS FORMES POSSIBLES (07/09) : la fiche EANA déposée coche deux booléens
     (`sexeF` / `sexeM`), l'étape ④ enregistre « Fille » / « Garçon », et d'anciens
     dossiers portent « F ». Ne lire que `f.sexe` faisait sortir « Sana se débrouille en
     arabe : IL lit et comprend », « Non lecteurrice », « a été scolarisé » — au masculin
     sur les quatre filles dont la fiche vient du CIO, là où l'accord est le plus visible.
     Les trois formes comptent. */
  const feminin = (f) => f.sexeF === true
    || f.sexe === 'F' || f.sexe === 'Fille' || f.sexe === 'fille';
  const il = (f) => (feminin(f) ? 'Elle' : 'Il');

  /* --- Lecture en langue de scolarisation ---------------------------------- */
  function lecture(f, niveau) {
    const lg = (f.langueScolarisation || f.langueMaternelle || '').trim();
    const en = lg ? ' en ' + lg : '';
    const p = profil(f);
    if (p === 'nsa') return 'Non lecteur' + (feminin(f) ? 'rice' : '') + '.';
    if (p === 'peu') return 'Difficultés importantes. Le déchiffrage est laborieux.';
    if (!niveau) return '';
    /* en français elle nomme l'élève, dans une autre langue elle nomme la langue */
    if (niveau.atteintClasseAge) {
      return p === 'francophone' && prenom(f)
        ? prenom(f) + ' lit de manière fluide.'
        : 'La lecture' + en + ' est fluide.';
    }
    return 'La lecture' + en + ' est acquise jusqu\'au niveau ' + niveau.nom + '.';
  }

  /* --- Geste graphique ------------------------------------------------------ */
  function geste(f, ecriture) {
    if (ecriture === 'cursive') return 'Le geste graphique est maîtrisé. L\'écriture est cursive.';
    if (ecriture === 'script') return 'L\'écriture en script est maîtrisée.';
    if (ecriture === 'prenom') {
      return prenom(f) + ' sait écrire son prénom et son nom en écriture cursive.';
    }
    if (ecriture === 'aucune') return 'Le geste graphique n\'est pas installé.';
    return '';
  }

  /* --- Langues (autres que le français) ------------------------------------- */
  function langues(f, niveau) {
    const lg = (f.langueScolarisation || '').trim();
    const p = profil(f);
    if (p === 'nsa' || p === 'peu') return 'Aucune autre langue.';
    if (!lg) return '';
    if (niveau && niveau.atteintClasseAge) {
      return il(f) + ' a été scolarisé' + (feminin(f) ? 'e' : '') + ' en ' + lg
        + '. ' + il(f) + ' a acquis de bonnes stratégies de lecture : ' + (feminin(f) ? 'elle' : 'il')
        + ' repère les informations implicites, identifie les données explicites et émet des hypothèses pertinentes.';
    }
    return il(f) + ' a été scolarisé' + (feminin(f) ? 'e' : '') + ' en ' + lg + '.';
  }

  /* --- Mathématiques : une ligne à tiret par compétence --------------------- */
  function maths(lignes) {
    const l = (lignes || []).filter(Boolean);
    return l.length ? l.map(x => '- ' + x).join('\n') : 'Non évalué';
  }

  /* --- Le bloc « Connaissance du français » --------------------------------- */
  function francais(f, ctx) {
    ctx = ctx || {};
    const parle = parleFrancais(f);
    if (parle === 'non') {
      return {
        lectureFrancais: il(f) + ' ne connaît pas encore le système phonologique français mais connaît le nom de quelques lettres.',
        productionOrale: 'Évaluation impossible.',
        comprehensionOrale: 'Évaluation impossible.',
        comprehensionEcrite: 'Évaluation impossible.',
        expressionEcrite: 'Évaluation impossible.'
      };
    }
    if (parle === 'oui') {
      /* « Parle couramment » ne veut pas dire « comprend tout ce qu'il lit ». Quand le
         test de compréhension de l'écrit montre que l'implicite passe à côté, la fiche
         doit le dire : sinon on écrit « très bonne maîtrise » sur une élève qui rate la
         compréhension fine (son observation sur Khadissatou, 02/09). */
      const fragile = ctx.finesse === 'fragile';
      return {
        lectureFrancais: il(f) + ' maîtrise le système phonologique.',
        productionOrale: '',
        comprehensionOrale: il(f) + ' comprend la langue française à l\'oral.',
        comprehensionEcrite: fragile
          ? il(f) + ' comprend le sens global d\'un texte, mais la compréhension fine reste fragile : l\'implicite, les inférences et les questions qui demandent de relier deux informations.'
          : il(f) + ' comprend le sens global d\'un texte.',
        expressionEcrite: ''
      };
    }
    return {};
  }

  /* --- Les Remarques : une suite de paragraphes, préconisation en dernier ---- */
  function remarques(f, ctx) {
    const p = profil(f), nom = prenom(f) || 'L\'élève';
    const par = [];

    /* 1. le profil */
    if (p === 'nsa' || p === 'peu') {
      par.push(nom + ' présente des difficultés de lecture et de compréhension dans sa langue.');
    } else if (p === 'francophone') {
      par.push(parleFrancais(f) === 'oui'
        ? (ctx.finesse === 'fragile'
          ? nom + ' maîtrise la langue française à l\'oral et lit avec fluidité. En revanche, la compréhension fine d\'un texte reste fragile : l\'implicite et les inférences passent encore à côté.'
          : nom + ' a une très bonne maîtrise de la langue française (compréhension et expression).')
        /* ⚠ « EN ADÉQUATION AVEC LES ATTENDUS DU NIVEAU TERMINALE » NE S'ÉCRIT PLUS À
           L'AVEUGLE (07/09 : « ça, c'est une grosse grosse boulette de ta part »). Cette
           phrase sortait du seul choix « Scolarité conforme à la classe d'âge » dans une
           liste — donc SANS AUCUNE PREUVE — sur une élève dont le test de français venait
           d'être jugé trop difficile. Elle affirmait un niveau de classe que rien ne
           soutenait, sur une fiche lue par le CASNAV et par la famille, et contredisait
           deux rubriques plus haut de la même page.
           Trois garde-fous désormais : rien ne s'écrit si le français est en cause
           (`francaisDur`) ou si la lecture fine est fragile ; la scolarité antérieure et
           le niveau de FRANÇAIS sont deux choses distinctes — on parle de scolarité, pas
           de compétences ; et on ne compare plus à « les attendus du niveau X », qui
           mélange les deux. Ne pas rétablir la formule. */
        /* ⚠ « ET EST INSCRIT EN TERMINALE » NE S'ÉCRIT PLUS (07/09 : « c'est n'importe quoi
           ce que tu as écrit — Ibrahim Khalil a suivi une scolarité conforme à sa classe
           d'âge et est inscrit en Terminale »). Deux fautes en une phrase : la classe
           d'accueil est un fait administratif qui figure DÉJÀ en tête de la fiche, et
           l'accoler à « scolarité conforme » la faisait lire comme un niveau atteint — sur
           un élève dont elle venait d'écrire « impossible pour le moment » en compréhension
           orale, écrite et en production. Ne pas rétablir la mention de la classe ici.
           `debutantFrancais` dit ce qu'elle a observé : la scolarité antérieure est un
           acquis, le français reste entièrement à construire. Les deux dans la même
           phrase, sinon la première se lit comme un bilan. */
        : ctx.debutantFrancais
          ? nom + ' a suivi une scolarité conforme à sa classe d\'âge dans son pays ; '
            + 'le français est en revanche entièrement à construire.'
          : nom + ' a suivi une scolarité conforme à sa classe d\'âge.');
    } else if (p === 'autrelangue') {
      par.push(nom + ' présente un profil scolaire solide : '
        + (feminin(f) ? 'elle est entrée' : 'il est entré')
        + ' rapidement dans les exercices et a travaillé avec efficacité.');
    }

    /* 1 bis. le contraste langue de scolarisation / français (07/09) : « Sana se
       débrouille en langue arabe, c'est plus compliqué en français ». C'est ce que le
       CASNAV cherche d'abord chez un élève scolarisé antérieurement — il sait lire, la
       marche à franchir est le français. Une phrase, jamais deux bilans côte à côte : la
       place manque dans la case.
       On ne l'écrit QUE si un test a été passé dans sa langue : sans point de comparaison,
       « c'est plus compliqué en français » ne veut rien dire. */
    /* ⚠ UN SEUL PARAGRAPHE, QUI RACONTE L'ENCHAÎNEMENT (07/09, sa reformulation) : « Le
       test en français s'est révélé trop difficile. Un test en arabe a donc été donné pour
       situer ses acquis scolaires, qui sont … ». Le constat, la décision, le résultat — et
       le résultat FERME la phrase, ce qui manquait : « pour situer ses acquis scolaires »
       laissait le lecteur sans réponse.
       Ne pas revenir à « Le profil de compétences de X » : cette entrée en matière annonce
       un bilan de compétences là où il s'agit d'expliquer POURQUOI le test a été passé
       dans une autre langue. */
    /* ⚠ SA PROPRE RÉÉCRITURE, REPRISE TELLE QUELLE (07/09) : elle a réécrit le paragraphe
       dans la case, et sa version est meilleure que la mienne sur trois points — le
       « pourtant » qui NOUE la scolarité antérieure et l'échec en français (mes deux
       paragraphes séparés laissaient le lecteur faire le lien), « Ils sont conformes à … »
       en phrase courte plutôt qu'une relative qui n'en finissait pas, et un seul
       paragraphe au lieu de deux.
       Le paragraphe de profil est donc absorbé ici : ne pas le rajouter au-dessus, il ferait
       doublon avec « a suivi une scolarité conforme à sa classe d'âge ». */
    if (ctx.langueScol && ctx.francaisDur) {
      if (par.length) par.pop();
      par.push(nom + ' a suivi une scolarité conforme à sa classe d\'âge pourtant le test '
        + 'en français s\'est révélé trop difficile. Un test en '
        + String(ctx.langueScol).toLowerCase() + ' a donc été donné pour situer ses acquis '
        + 'scolaires. '
        + (ctx.origineOk
          ? (ctx.palierOrigine
            ? 'Ils sont conformes à une scolarité de ' + ctx.palierOrigine + '.'
            : 'Ils sont conformes à sa classe d\'âge.')
          : 'La saisie est en cours.'));
    } else if (ctx.langueScol && ctx.origineOk) {
      par.push(nom + ' se débrouille en ' + String(ctx.langueScol).toLowerCase()
        + ' : ' + (feminin(f) ? 'elle lit et comprend' : 'il lit et comprend')
        + ' un texte de son niveau de classe. L\'entrée dans l\'écrit est plus difficile en français.');
    }

    /* 2. les mathématiques */
    if (p === 'nsa' || p === 'peu') {
      par.push('Son niveau de mathématiques est en deçà des attendus de sa classe d\'âge.');
    } else if (ctx.mathsSolide) {
      par.push('Son niveau en mathématique est satisfaisant.');
    }

    /* 3. le projet, quand l'élève en a formulé un (surtout les plus de 16 ans) */
    if (ctx.projet) {
      par.push('Son projet professionnel actuel vers ' + ctx.projet + ' est cohérent et réaliste.');
    }

    /* 4. la préconisation, toujours en dernier */
    /* ⚠ UNE SEULE TOURNURE, AU CONDITIONNEL (07/09, sa demande mot pour mot) : « Une
       affectation en [classe préconisée] lui permettrait de … » — puis ce que le
       dispositif rend possible : consolider les fondamentaux pour un NSA, travailler son
       projet professionnel pour un SAS. Trois raisons de s'y tenir :
       - c'est une PROPOSITION au CASNAV, qui décide : le conditionnel le dit, « nous
         préconisons » sonnait comme une décision déjà prise ;
       - la phrase part de la classe qu'elle a choisie, donc elle ne peut plus contredire
         ce choix (« UPE2A Sas […] un dispositif UPE2A ne se justifie pas », 07/09) ;
       - « lui » vaut pour une fille comme pour un garçon : aucun accord à reprendre.
       Le profil ne change plus la STRUCTURE, seulement la suite du « lui permettrait
       de ». Ne pas réintroduire une phrase par profil. */
    const ou = ctx.classeLongue || ctx.classe;
    if (ou) {
      const quoi = /nsa/i.test(ou)
        ? 'de consolider les fondamentaux avant d\'envisager une orientation'
        : /sas/i.test(ou)
          ? 'de travailler sur son projet professionnel'
          : /upe2a|fle|allophone/i.test(ou)
            ? 'de consolider ses apprentissages en français'
            : (p === 'nsa' || p === 'peu')
              ? 'de consolider les fondamentaux'
              : ctx.finesse === 'fragile'
                ? 'de poursuivre sa scolarité avec un accompagnement en compréhension de l\'écrit'
                : 'de poursuivre sa scolarité';
      par.push('Une affectation en ' + ou + ' lui permettrait ' + quoi + '.');
    }
    return par.join('\n\n');
  }

  /* Les manques s'écrivent après les réussites, sous un intertitre. */
  function axes(reussites, progres) {
    const bloc = (l) => (l || []).filter(Boolean).map(x => '- ' + x).join('\n');
    const a = bloc(reussites), b = bloc(progres);
    if (a && b) return a + '\n\nAxes de progression identifiés:\n' + b;
    return a || b;
  }

  /* --- La préconisation : classe et accompagnement -------------------------- */
  function preconisation(f, ctx) {
    ctx = ctx || {};
    const p = profil(f);
    if (p === 'nsa' || p === 'peu') return { precoClasse: 'UPE2A NSA', accompagnement: 'UPE2A NSA' };
    if (p === 'francophone') return { accompagnement: (ctx.finesse === 'fragile')
      ? 'Classe ordinaire avec soutien linguistique'
      : 'Classe ordinaire sans soutien linguistique' };
    if (p === 'autrelangue') return { accompagnement: 'UPE2A' };
    return {};
  }

  /* Le brouillon complet. ctx : { niveau, mathsLignes, ecriture, classe }. */
  function brouillon(f, ctx) {
    ctx = ctx || {};
    const out = {};
    const mettre = (cle, val) => { if (val) out[cle] = val; };
    mettre('lectureLangueOrigine', lecture(f, ctx.niveau));
    mettre('gesteGraphique', geste(f, ctx.ecriture));
    mettre('langues', langues(f, ctx.niveau));
    if (ctx.mathsLignes) {
      mettre('mathsNombres', maths(ctx.mathsLignes.nombres));
      mettre('mathsDonnees', maths(ctx.mathsLignes.donnees));
      mettre('mathsGrandeurs', maths(ctx.mathsLignes.grandeurs));
      mettre('mathsGeometrie', maths(ctx.mathsLignes.geometrie));
    }
    const fr = francais(f, ctx);
    for (const k in fr) mettre(k, fr[k]);
    const pr = preconisation(f, ctx);
    for (const k in pr) mettre(k, pr[k]);
    mettre('remarquesCasnav', remarques(f, ctx));
    return out;
  }

  window.REDACTION = { brouillon, profil, parleFrancais, acquis, maths, axes, remarques };
})();
