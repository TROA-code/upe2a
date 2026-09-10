/* L'emploi du temps de la classe UPE2A NSA — recopié de son tableau (06/09/2026).
   Quatre jours : pas de mercredi. Les horaires masqués sur sa capture sont marqués
   `aVerifier: true` : ce sont MES estimations, à lui faire confirmer.
   Base : programme 2026 de l'école. */
(function () {
  /* Les types qu'ELLE crée, avec la couleur de son choix (demande du 06/09). Rangés dans
     ses réglages, ils s'ajoutent aux huit livrés sans les remplacer. */
  const PALETTE = [
    { cle: 'bleu', nom: 'Bleu', fond: '#dbe7f5', trait: '#3f7cc0', encre: '#1a3f68' },
    { cle: 'vert', nom: 'Vert', fond: '#dcefe0', trait: '#4e9c62', encre: '#1c5230' },
    { cle: 'prune', nom: 'Prune', fond: '#ecdff2', trait: '#9257ad', encre: '#4d2560' },
    { cle: 'brique', nom: 'Brique', fond: '#f6ded6', trait: '#c2664a', encre: '#7a3320' },
    { cle: 'ocre', nom: 'Ocre', fond: '#f7ecd2', trait: '#c09232', encre: '#6b4a08' },
    { cle: 'ardoise', nom: 'Ardoise', fond: '#e3e7ec', trait: '#68788c', encre: '#2c3846' }
  ];

  /* Les huit domaines livrés PLUS les siens. Toujours passer par ici : lire `DOMAINES`
     directement fait disparaître ses types de l'affichage. */
  function domaines(base) {
    return Object.assign({}, DOMAINES, (base && base.domaines) || {});
  }

  /* Les cinq jours possibles, dans l'ordre, avec leur rang dans la semaine (0 = lundi).
     ⚠ Ne PAS retirer le mercredi de cette liste : son emploi du temps n'en a pas
     aujourd'hui, mais elle a dit le 06/09 qu'elle pourrait avoir cours le mercredi. Les
     jours affichés sont ceux de `jours` dans ses réglages, pas cette liste. */
  const TOUS_JOURS = [
    ['lundi', 'Lundi', 0], ['mardi', 'Mardi', 1], ['mercredi', 'Mercredi', 2],
    ['jeudi', 'Jeudi', 3], ['vendredi', 'Vendredi', 4]
  ];
  /* SES ÉLÈVES — liste officielle donnée le 06/09 (capture de son ENT, classe 0-UPE2A-NSA,
     5 élèves). Orthographe exacte, NOM en capitales et prénom tels qu'ils apparaissent :
     FAKHILZAI Anita · HALAWA Ahmed Samir · TARAKHEIL Sania · TARAKHEIL Yasir ·
     ZANGA Josefina.
     ⚠ Corrections apportées ce jour-là : « Josephina » s'écrit **Josefina** (sans h), et
     Ahmed a un second prénom, **Samir**.
     ⚠ Sania et Yasir TARAKHEIL portent le même nom : frère et sœur, très probablement.
     Ne pas les fusionner ni supposer que l'un parle pour l'autre.
     ⚠ L'`id` est stable et indépendant du prénom : c'est la clé de ses notes de
     différenciation. Renommer un élève ne doit pas effacer ce qui est écrit sur lui.
     ⚠ « Sania » n'est pas forcément la « Sana » du dossier de positionnement : orthographes
     différentes, ne pas les fusionner sans le lui demander.
     `nom` = le prénom seul, c'est ce qu'on affiche en classe ; `famille` = le NOM. */
  const ELEVES = [
    { id: 'e-anita', nom: 'Anita', famille: 'FAKHILZAI' },
    { id: 'e-ahmed', nom: 'Ahmed', famille: 'HALAWA', prenoms: 'Ahmed Samir' },
    { id: 'e-josephina', nom: 'Josefina', famille: 'ZANGA' },
    { id: 'e-sania', nom: 'Sania', famille: 'TARAKHEIL' },
    { id: 'e-yasir', nom: 'Yasir', famille: 'TARAKHEIL' }
  ];

  /* ⚠ Le MERCREDI fait partie de ses jours de classe (ajouté à sa demande le 06/09) :
     sa capture d'écran n'en montrait pas, mais elle a bien cours ce jour-là. */
  const JOURS_PAR_DEFAUT = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];

  /* Les couleurs viennent de sa capture, éclaircies : son rouge plein et son orange plein
     ne laissent pas lire un titre de quatre lignes. Le fond est clair, l'encre est foncée
     (contraste ≥ 4,5:1), et la BORDURE GAUCHE épaisse garde la couleur forte d'origine —
     on reconnaît la matière d'un coup d'œil sans perdre la lisibilité. */
  const DOMAINES = {
    atelier: { nom: 'Atelier autonome', fond: '#e4f1f7', trait: '#5f9fb8', encre: '#1c4a5c' },
    rituel: { nom: 'Rituel collectif', fond: '#e8eaee', trait: '#8d959f', encre: '#333a44' },
    litteracie: { nom: 'Littéracie et écriture', fond: '#fbdcda', trait: '#e0564f', encre: '#8a2723' },
    csp: { nom: 'Rituel CSP', fond: '#fdf6e3', trait: '#c9a24a', encre: '#5c4409' },
    flsco: { nom: 'FLSco & Application', fond: '#fbdde6', trait: '#d4699a', encre: '#7d2551' },
    monde: { nom: 'Découverte du monde et des sciences', fond: '#dfefe4', trait: '#5fa87a', encre: '#1e5c3a' },
    projet: { nom: 'Projet', fond: '#fde5d3', trait: '#e08a45', encre: '#7d4310' },
    /* La récréation (donnée le 06/09 : 10h00 – 10h15), en NOIR à sa demande : ce n'est pas
       une séance, et le noir la distingue franchement des huit domaines colorés. Encre
       blanche pour le contraste. */
    recre: { nom: 'Récréation', fond: '#1c2430', trait: '#12161c', encre: '#ffffff' },
    vivre: { nom: 'Apprendre ensemble et vivre ensemble', fond: '#fdf7cc', trait: '#c9bc4a', encre: '#544c07' }
  };

  /* Les cinq créneaux qui reviennent à l'identique les quatre jours : écrits une fois,
     dépliés ensuite. Recopier quatre fois la même phrase, c'est quatre endroits à
     corriger le jour où elle la change. */
  /* ⚠ LES HORAIRES ONT ÉTÉ RECALÉS le 06/09 : « je commence à 09h10 le matin et la
     récréation est de 10h00 à 10h15 ». Les deux premiers créneaux remplissent donc
     exactement 09h10 → 10h00, et tout ce qui suit la récréation est décalé en gardant les
     durées de son tableau (littéracie 1h, FLSco 30 min, découverte 1h).
     ⚠ Conséquence à lui faire trancher : la matinée finit tard (13h15 avec « Apprendre
     ensemble » le lundi). Il manque l'heure de fin de matinée — d'où les `aVerifier`
     sur tous les créneaux d'après-récréation. */
  /* ⚠ `court` : le libellé affiché DANS la grille. Le titre complet reste pour le panneau,
     le mode jour et l'impression. Sans lui, « Littéracie et écriture — nouveau son + vidéo
     métier » prend quatre lignes dans une colonne de 150 px, et l'emploi du temps ne tient
     plus sur une page — sa consigne du 06/09 : « je ne dois pas utiliser l'ascenseur ». */
  const TOUS_LES_JOURS = [
    { cle: 'atelier-lecture', domaine: 'atelier', debut: '09:10', fin: '09:30',
      titre: 'Atelier autonome — lecture', court: 'Atelier lecture',
      detail: 'Lecture de syllabes, de mots et dictée entre pairs (un élève dicte à l\'autre).' },
    { cle: 'recre', domaine: 'recre', debut: '10:00', fin: '10:15',
      titre: 'Récréation', court: 'Récréation', detail: '' },
    { cle: 'atelier-maths', domaine: 'atelier', debut: '10:15', fin: '10:35',
      titre: 'Atelier autonome — mathématiques', court: 'Atelier maths',
      detail: 'Fluence de calculs : doubles, compléments…' },
    { cle: 'csp', domaine: 'csp', debut: '11:35', fin: '11:45', aVerifier: true,
      titre: 'Rituel CSP', court: 'Rituel CSP', detail: '' },
    { cle: 'flsco', domaine: 'flsco', debut: '11:45', fin: '12:15', aVerifier: true,
      titre: 'FLSco & Application : maths concrets', court: 'FLSco · maths concrets',
      detail: '' }
  ];

  /* Ce qui change d'un jour à l'autre. `(R)` est repris de sa capture tel quel : je ne
     sais pas encore ce qu'il désigne — à lui demander. */
  const PROPRES = {
    lundi: [
      { cle: 'rituel', domaine: 'rituel', debut: '09:30', fin: '10:00',
        titre: 'Rituel collectif (R)', court: 'Rituel collectif',
        detail: '« Je me présente », « Quoi de neuf ». Les mots étudiés durant le week-end.' },
      { cle: 'litteracie', domaine: 'litteracie', debut: '10:35', fin: '11:35',
        titre: 'Littéracie et écriture — nouveau son + vidéo métier',
        court: 'Littéracie · nouveau son',
        detail: 'Exemple : le son A / Karim à l\'atelier.' },
      { cle: 'monde', domaine: 'monde', debut: '12:15', fin: '13:15', aVerifier: true,
        titre: 'Découverte du monde et des sciences — temps et histoire (R)',
        court: 'Monde · temps et histoire',
        detail: 'Frise chronologique (Préhistoire, Antiquité…), jeu sur les inventions.' },
      { cle: 'vivre', domaine: 'vivre', debut: '13:15', fin: '13:45', aVerifier: true,
        titre: 'Apprendre ensemble et vivre ensemble', court: 'Vivre ensemble', detail: '' }
    ],
    mardi: [
      { cle: 'rituel', domaine: 'rituel', debut: '09:30', fin: '10:00',
        titre: 'Rituel collectif (R)', court: 'Rituel collectif',
        detail: '« Je me présente », « Quoi de neuf ». Tirage d\'une carte thématique.' },
      { cle: 'litteracie', domaine: 'litteracie', debut: '10:35', fin: '11:35',
        titre: 'Littéracie et écriture — moment littéraire',
        court: 'Littéracie · moment littéraire', detail: '' },
      { cle: 'monde', domaine: 'monde', debut: '12:15', fin: '13:15', aVerifier: true,
        titre: 'Découverte du monde et des sciences — espace et géographie',
        court: 'Monde · espace et géographie',
        detail: 'Travail sur le globe et le planisphère. Localisation du Havre, de la France, des pays d\'origine.' }
    ],
    mercredi: [
      /* Le mercredi partage la charpente des autres jours (atelier, rituel, récréation,
         FLSco) mais son CONTENU propre est inconnu : sa capture ne le montrait pas. Les
         trois créneaux ci-dessous sont donc à remplir par elle — intitulés neutres,
         `aVerifier` sur tous, pour ne rien lui prêter qu'elle n'a pas dit. */
      { cle: 'rituel', domaine: 'rituel', debut: '09:30', fin: '10:00', aVerifier: true,
        titre: 'Rituel collectif (R)', court: 'Rituel collectif',
        detail: 'À préciser : le rituel du mercredi.' },
      { cle: 'litteracie', domaine: 'litteracie', debut: '10:35', fin: '11:35', aVerifier: true,
        titre: 'Littéracie et écriture', court: 'Littéracie et écriture',
        detail: 'À préciser : le contenu du mercredi.' },
      { cle: 'monde', domaine: 'monde', debut: '12:15', fin: '13:15', aVerifier: true,
        titre: 'Découverte du monde et des sciences', court: 'Découverte du monde',
        detail: 'À préciser.' }
    ],
    jeudi: [
      { cle: 'rituel', domaine: 'rituel', debut: '09:30', fin: '10:00',
        titre: 'Rituel collectif (R)', court: 'Rituel collectif',
        detail: '« Je me présente », « Quoi de neuf ». Tirage d\'une carte thématique.' },
      { cle: 'litteracie', domaine: 'litteracie', debut: '10:35', fin: '11:35',
        titre: 'Nouveau son + vidéo métier', court: 'Littéracie · nouveau son',
        detail: 'Exemple : le son A / Karim à l\'atelier.' },
      { cle: 'projet', domaine: 'projet', debut: '12:15', fin: '13:15', aVerifier: true,
        titre: 'PROJET', court: 'PROJET', detail: '' }
    ],
    vendredi: [
      { cle: 'rituel', domaine: 'rituel', debut: '09:30', fin: '10:00',
        titre: 'Regroupement (R)', court: 'Regroupement', detail: '' },
      { cle: 'litteracie', domaine: 'litteracie', debut: '10:35', fin: '11:35',
        titre: 'Littéracie et écriture — moment littéraire',
        court: 'Littéracie · moment littéraire', detail: '' },
      { cle: 'monde', domaine: 'monde', debut: '12:15', fin: '13:15', aVerifier: true,
        titre: 'Découverte du monde et des sciences — citoyenneté',
        court: 'Monde · citoyenneté',
        detail: 'Égalité filles-garçons, la laïcité, les symboles de la République.' }
    ]
  };

  /* Les documents DÉJÀ dans l'appli, rattachés au créneau où ils servent. Rien d'inventé :
     chaque entrée est un fichier existant. Elle en ajoutera d'autres, et ses vidéos, depuis
     le panneau du créneau. */
  const RESSOURCES = {
    'atelier-lecture': [
      { nom: 'Maison des sons', f: 'FR - Maison des sons.dc.html' },
      { nom: 'Mes mots — volume 1', f: 'FR - Livret 2 - Mes mots - Volume 1.dc.html' },
      { nom: 'Mes mots — volume 2', f: 'FR - Livret 2 - Mes mots - Volume 2.dc.html' }
    ],
    'atelier-maths': [
      { nom: 'Les nombres de 0 à 10', f: 'MATHS - Livret 1 - Les nombres de 0 à 10.dc.html' },
      { nom: 'Comparer et ranger', f: 'MATHS - Livret 2 - Comparer et ranger.dc.html' }
    ],
    'lundi-litteracie': [
      { nom: 'Séance type — le son A', f: 'FR - Séance type - Le son A.dc.html' },
      { nom: 'Cahier d\'écriture — tracer les lettres', f: 'FR - Cahier d\'écriture - Tracer les lettres.dc.html' }
    ],
    'jeudi-litteracie': [
      { nom: 'Séance type — le son I', f: 'FR - Séance type - Le son I.dc.html' },
      { nom: 'Séance type — le son O', f: 'FR - Séance type - Le son O.dc.html' }
    ],
    'mardi-litteracie': [
      { nom: 'Les repas — livret 3', f: 'FR - Livret 3 - Les repas.dc.html' }
    ],
    'vendredi-litteracie': [
      { nom: 'Les repas — livret 3', f: 'FR - Livret 3 - Les repas.dc.html' }
    ],
    'lundi-rituel': [
      { nom: 'Se présenter — cartes', f: 'CARTE - se présenter.dc.html' }
    ],
    'mardi-rituel': [
      { nom: 'Planche des thèmes', f: 'PLANCHE - thème illustré.dc.html' },
      { nom: 'Feuille de route des thèmes', f: 'FEUILLE DE ROUTE - thèmes.dc.html' }
    ],
    'jeudi-rituel': [
      { nom: 'Planche des thèmes', f: 'PLANCHE - thème illustré.dc.html' }
    ],
    'lundi-vivre': [
      { nom: 'Me présenter (Ratatouille)', f: 'SÉANCES - Me présenter (Ratatouille).dc.html' }
    ],
    flsco: [
      { nom: 'Tracer les chiffres', f: 'MATHS - Livret 1 bis - Tracer les chiffres.dc.html' }
    ],
    'jeudi-projet': [
      { nom: 'Mon avenir au Havre', f: 'ORIENTATION - Mon avenir au Havre.html' }
    ]
  };

  /* Un créneau porte un id stable `jour-cle` : c'est la clé de ses ressources ajoutées,
     de ses notes de différenciation et, plus tard, du cahier journal. Ne pas la fabriquer
     à partir de l'horaire — il changera. */
  function creneaux() {
    const out = [];
    JOURS_PAR_DEFAUT.forEach((jour) => {
      TOUS_LES_JOURS.concat(PROPRES[jour] || []).forEach(c => {
        out.push(Object.assign({}, c, { id: jour + '-' + c.cle, jour }));
      });
    });
    return out.sort((a, b) => a.debut < b.debut ? -1 : a.debut > b.debut ? 1 : 0);
  }

  /* Les ressources d'un créneau : celles rattachées au jour précis d'abord
     (`lundi-litteracie`), sinon celles du créneau commun (`atelier-lecture`). */
  function ressourcesDe(c) {
    return (RESSOURCES[c.id] || RESSOURCES[c.cle] || []).slice();
  }

  const minutes = (h) => {
    const m = String(h || '').split(':');
    return (parseInt(m[0], 10) || 0) * 60 + (parseInt(m[1], 10) || 0);
  };

  /* Les plages horaires de la semaine, dans l'ordre : une ligne de la grille par plage.
     Tous les jours partagent les mêmes bornes — c'est ce qui permet un vrai tableau
     aligné plutôt que quatre colonnes indépendantes. */
  function plages(liste) {
    const vues = {};
    liste.forEach(c => { vues[c.debut + '-' + c.fin] = { debut: c.debut, fin: c.fin }; });
    return Object.keys(vues).map(k => vues[k])
      .sort((a, b) => minutes(a.debut) - minutes(b.debut));
  }

  /* ---- Les vacances et les jours fériés ----
     ZONE B, académie de Normandie (Le Havre) — calendrier officiel 2026-2027, ajouté le
     06/09 à sa demande (« je suis en zone B, attention aux vacances »).
     `du` = premier jour sans classe, `reprise` = matin de la rentrée. Une semaine est en
     vacances si son lundi tombe dans [du, reprise[. */
  const VACANCES = [
    { nom: 'Vacances de la Toussaint', du: '2026-10-17', reprise: '2026-11-02' },
    { nom: 'Vacances de Noël', du: '2026-12-19', reprise: '2027-01-04' },
    { nom: "Vacances d'hiver", du: '2027-02-20', reprise: '2027-03-08' },
    { nom: 'Vacances de printemps', du: '2027-04-17', reprise: '2027-05-03' },
    { nom: "Pont de l'Ascension", du: '2027-05-06', reprise: '2027-05-11' },
    { nom: "Vacances d'été", du: '2027-07-03', reprise: '2027-09-02' }
  ];

  /* Seuls les fériés qui tombent un jour de classe possible (lundi → vendredi) et HORS
     vacances : les autres n'ont aucun effet sur sa semaine. */
  const FERIES = {
    '2026-11-11': 'Armistice',
    '2027-03-29': 'Lundi de Pâques',
    '2027-05-17': 'Lundi de Pentecôte'
  };

  function vacancesDe(jour) {
    const j = iso(jour);
    const v = VACANCES.find(x => j >= x.du && j < x.reprise);
    return v ? v.nom : '';
  }

  /* Une semaine ne compte pas dans l'alternance A/B si elle est entièrement en vacances.
     On teste le lundi ET le vendredi : une semaine coupée (départ en vacances le mercredi)
     reste une semaine de classe. */
  function semaineDeVacances(lundi) {
    const ven = new Date(lundi.getFullYear(), lundi.getMonth(), lundi.getDate() + 4);
    return !!vacancesDe(lundi) && !!vacancesDe(ven) ? vacancesDe(lundi) : '';
  }

  /* ---- Le calendrier ----
     L'ANNÉE SCOLAIRE, bornée par elle le 06/09 : du LUNDI 7 SEPTEMBRE 2026 au
     4 JUILLET 2027. ⚠ Ce n'est pas la rentrée officielle (1er septembre 2026) : c'est SON
     emploi du temps qui commence le 7. La navigation de semaine en semaine s'arrête à ces
     deux bornes — rien à préparer avant, rien après.
     L'ancre de l'alternance est la première semaine : elle a dit être en semaine B. */
  const ANNEE = { debut: '2026-09-07', fin: '2027-07-04' };
  const ANCRE = { lundi: '2026-09-07', lettre: 'B' };

  function lundiDe(d) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const j = x.getDay();               /* 0 = dimanche */
    x.setDate(x.getDate() - ((j + 6) % 7));
    return x;
  }

  /* ⚠ L'ALTERNANCE SAUTE LES VACANCES (sa mise en garde du 06/09). Compter les semaines
     du calendrier donnerait un décalage à chaque retour de vacances : deux semaines de
     Toussaint remettraient la même lettre, quatre semaines d'été aussi. On compte donc
     les semaines DE CLASSE entre l'ancre et la semaine affichée.
     Une semaine de vacances n'a pas de lettre du tout : elle renvoie ''. */
  function lettreSemaine(lundi, ancre) {
    const a = ancre || ANCRE;
    if (semaineDeVacances(lundi)) return '';
    const dep = lundiDe(new Date(a.lundi + 'T12:00:00'));
    const avant = lundi < dep;
    let n = 0;
    let cur = new Date((avant ? lundi : dep).getTime());
    const bout = avant ? dep : lundi;
    /* Garde-fou : au-delà de deux ans, on renonce plutôt que de boucler sans fin. */
    let tours = 0;
    while (cur < bout && tours++ < 120) {
      if (!semaineDeVacances(cur)) n++;
      cur = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 7);
    }
    const pair = ((n % 2) + 2) % 2 === 0;
    return pair ? a.lettre : (a.lettre === 'A' ? 'B' : 'A');
  }

  /* Le numéro de semaine ISO : celui des calendriers d'établissement. */
  function numeroSemaine(lundi) {
    const j = new Date(lundi.getFullYear(), lundi.getMonth(), lundi.getDate());
    j.setDate(j.getDate() + 3);         /* jeudi de la semaine */
    const debut = new Date(j.getFullYear(), 0, 4);
    debut.setDate(debut.getDate() + 3 - ((debut.getDay() + 6) % 7));
    return 1 + Math.round((j - debut) / 604800000);
  }

  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août',
    'septembre', 'octobre', 'novembre', 'décembre'];

  function libelleSemaine(lundi) {
    const fin = new Date(lundi.getFullYear(), lundi.getMonth(), lundi.getDate() + 4);
    const memeMois = fin.getMonth() === lundi.getMonth();
    return 'du ' + lundi.getDate() + (memeMois ? '' : ' ' + MOIS[lundi.getMonth()])
      + ' au ' + fin.getDate() + ' ' + MOIS[fin.getMonth()] + ' ' + fin.getFullYear();
  }

  function dateDuJour(lundi, jour) {
    const t = TOUS_JOURS.find(x => x[0] === jour);
    const rang = t ? t[2] : 0;
    return new Date(lundi.getFullYear(), lundi.getMonth(), lundi.getDate() + rang);
  }

  const iso = (d) => d.getFullYear() + '-'
    + String(d.getMonth() + 1).padStart(2, '0') + '-'
    + String(d.getDate()).padStart(2, '0');

  /* ---- Ce qu'elle écrit par-dessus ----
     `upe2a-edt` garde ses modifications de créneaux, ses ressources ajoutées et ses notes
     de différenciation. Les données ci-dessus ne bougent pas : elles restent le point de
     départ, et une modification ratée se répare en vidant la clé. */
  const CLE = 'upe2a-edt';

  function charger() {
    try {
      const b = localStorage.getItem(CLE);
      if (b) {
        const o = JSON.parse(b);
        if (o && typeof o === 'object') {
          return { modifs: o.modifs || {}, ajouts: o.ajouts || [], retires: o.retires || [],
            liens: o.liens || {}, differ: o.differ || {}, ancre: o.ancre || null,
            /* `semaines` : les modifications propres à UNE semaine, classées par le lundi
               en ISO. La première semaine de l'année est « forcément totalement
               différente » (06/09) — elle ne doit pas déformer le modèle. */
            semaines: o.semaines || {},
            domaines: o.domaines || {},
            jours: Array.isArray(o.jours) && o.jours.length ? o.jours : null };
        }
      }
    } catch (e) {}
    return { modifs: {}, ajouts: [], retires: [], liens: {}, differ: {}, ancre: null,
      semaines: {}, domaines: {}, jours: null };
  }

  function enregistrer(base) {
    try { localStorage.setItem(CLE, JSON.stringify(base)); } catch (e) {}
    return base;
  }

  /* La semaine telle qu'elle est affichée : trois couches empilées dans cet ordre —
     les données de départ, le MODÈLE (ce qui vaut toutes les semaines), puis les
     modifications PROPRES à cette semaine, qui l'emportent.
     `cleSem` est le lundi en ISO ; sans elle, on ne voit que le modèle. */
  function semaine(base, cleSem) {
    const b = base || charger();
    const sp = (cleSem && (b.semaines || {})[cleSem]) || {};
    const spModifs = sp.modifs || {}, spAjouts = sp.ajouts || [], spRetires = sp.retires || [];
    const retires = (b.retires || []).concat(spRetires);
    const liste = creneaux()
      .filter(c => retires.indexOf(c.id) < 0)
      .map(c => Object.assign({}, c, (b.modifs || {})[c.id] || {}, spModifs[c.id] || {}))
      .concat((b.ajouts || []).filter(c => retires.indexOf(c.id) < 0)
        .map(c => Object.assign({ ajoute: true }, c, spModifs[c.id] || {})))
      .concat(spAjouts.filter(c => spRetires.indexOf(c.id) < 0)
        .map(c => Object.assign({ ajoute: true, propreSemaine: true }, c)));
    return liste.sort((a, b2) => minutes(a.debut) - minutes(b2.debut));
  }

  /* Cette semaine a-t-elle ses propres modifications ? Sert à afficher le repère
     « semaine particulière » et le bouton de retour au modèle. */
  function aSaSemaine(base, cleSem) {
    const sp = ((base || {}).semaines || {})[cleSem];
    if (!sp) return false;
    return Object.keys(sp.modifs || {}).length > 0
      || (sp.ajouts || []).length > 0 || (sp.retires || []).length > 0;
  }

  /* Les bornes de l'année, en lundis : `bornes().premier` et `.dernier`. */
  function bornes() {
    return {
      premier: lundiDe(new Date(ANNEE.debut + 'T12:00:00')),
      dernier: lundiDe(new Date(ANNEE.fin + 'T12:00:00'))
    };
  }

  /* Ramène un lundi dans l'année scolaire. Sert à la navigation ET à l'ouverture :
     consultée en août, l'appli doit s'ouvrir sur la première semaine, pas sur du vide. */
  function dansAnnee(lundi) {
    const b = bornes();
    if (lundi < b.premier) return b.premier;
    if (lundi > b.dernier) return b.dernier;
    return lundi;
  }

  /* Les jours affichés : les siens s'ils sont réglés, sinon les quatre de départ.
     Toujours rendus dans l'ordre de la semaine, quel que soit l'ordre de ses clics. */
  function joursActifs(base) {
    const choisis = (base && base.jours) || JOURS_PAR_DEFAUT;
    return TOUS_JOURS.filter(j => choisis.indexOf(j[0]) >= 0).map(j => [j[0], j[1]]);
  }

  window.EDT = { TOUS_JOURS, JOURS_PAR_DEFAUT, DOMAINES, RESSOURCES, ANCRE, CLE, ELEVES,
    VACANCES, FERIES, ANNEE, PALETTE, domaines,
    creneaux, ressourcesDe, plages, minutes, semaine, aSaSemaine, joursActifs, bornes, dansAnnee,
    lundiDe, lettreSemaine, numeroSemaine, libelleSemaine, dateDuJour, iso,
    vacancesDe, semaineDeVacances, charger, enregistrer };
})();
