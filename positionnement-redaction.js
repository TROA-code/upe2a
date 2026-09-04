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
  const feminin = (f) => f.sexe === 'F' || f.sexe === 'Fille';
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
        : 'Le profil de compétences de ' + nom + ' est en adéquation avec les attendus du niveau '
          + (ctx.classe || 'de sa classe d\'âge') + '. Le niveau global est conforme à celui de sa classe d\'âge.');
    } else if (p === 'autrelangue') {
      par.push(nom + ' présente un profil scolaire solide : '
        + (feminin(f) ? 'elle est entrée' : 'il est entré')
        + ' rapidement dans les exercices et a travaillé avec efficacité.');
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
    if (p === 'nsa' || p === 'peu') {
      par.push('Nous préconisons une intégration en UPE2A NSA afin de consolider les fondamentaux.');
    } else if (p === 'francophone') {
      par.push(ctx.finesse === 'fragile'
        ? 'Nous préconisons une affectation en ' + (ctx.classeLongue || ctx.classe || 'classe ordinaire')
          + ', avec un accompagnement en compréhension de l\'écrit. La difficulté ne porte pas sur la langue parlée mais sur la lecture fine : un dispositif UPE2A ne se justifie pas.'
        : 'Nous préconisons une affectation en ' + (ctx.classeLongue || ctx.classe || 'classe ordinaire')
          + ' sans dispositif de soutien linguistique.');
    } else if (p === 'autrelangue') {
      par.push(ctx.classe
        ? 'Compte tenu de la période de l\'année, une affectation en ' + ctx.classe
          + ' lui serait profitable. Par ailleurs, un dispositif UPE2A lui permettrait de consolider ses apprentissages en français.'
        : 'Un dispositif UPE2A lui permettrait de consolider ses apprentissages en français.');
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
