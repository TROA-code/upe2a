/* La fiche d'accueil EANA 76 : lecture et remplissage.
   Les noms de champs sont ceux du PDF officiel, tels qu'ils sortent du formulaire
   (les accents y sont échappés en #C3#A9 : ne pas "corriger", ce sont les vrais noms).
   window.EANA */
(function () {
  const PDFLIB = 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.js';
  let lib = null;
  async function pdflib() { return (lib = lib || await import(PDFLIB)); }

  // clé interne -> nom du champ dans le PDF
  const CHAMPS = {
    dateFiche: 'Date',
    cio: 'CIO / DSDEN',
    nom: 'Nom de famille',
    prenom: 'Pr#C3#A9nom',
    naissance: 'Date de naissance',
    arriveeFrance: "date d'arriv#C3#A9e en France",
    pays: 'Pays',
    responsable: 'Responsable l#C3#A9gal',
    priseEnCharge: 'structure ou prise en charge #C3#A0 pr#C3#A9ciser',
    c1nom: 'Contact 1 nom', c1prenom: 'contact 1 pr#C3#A9nom',
    c1tel: 'Contact 1 t#C3#A9l#C3#A9phone', c1qualite: 'Contact 1 qualit#C3#A9',
    c2nom: 'contact 2 nom', c2prenom: 'contact 2 pr#C3#A9nom',
    c2tel: 'contact 2 t#C3#A9l#C3#A9phone', c2qualite: 'contact 2 qualit#C3#A9',
    contactMail: 'contact adresse #C3#A9lectronique',
    telEleve: 'tel personnel', mailEleve: 'adresse #C3#A9lectronique perso',
    adresse: 'H#C3#A9bergement adresse', cp: 'H#C3#A9bergement code postal', ville: 'H#C3#A9bergement ville',
    domAdresse: 'domiciliation adresse', domCp: 'domiciliation code postal', domVille: 'domiciliation ville',
    langueMaternelle: 'langue maternelle',
    nbLangues: 'Nombre de langues parl#C3#A9es en dehors du fran#C3#A7ais',
    langueScolarisation: 'langues de scolarisation',
    parcours: 'Parcours scolaire',
    lvEtudiee: 'LV #C3#A9tudi#C3#A9e dans le cadre scolaire',
    autresDocuments: 'Autre documents fournis',
    remarquesGenerales: 'Remarques g#C3#A9n#C3#A9rales',
    posPrevuDate: 'positionnement pr#C3#A9vu date',
    posPrevuHeure: 'positionnement pr#C3#A9vu heure',
    posPrevuLieu: 'positionnement pr#C3#A9vu lieu',
    oepreInfo: 'OEPRE info',
    datePositionnement: 'Date du positionnement',
    evaluePar: '#C3#A9valu#C3#A9 par', evalueParAutre: '#C3#A9valu#C3#A9 par qui',
    niveauScolaire: 'Niveau scolaire global',
    lectureLangueOrigine: "Lecture en langue d'origine",
    gesteGraphique: '#C3#A9criture',
    langues: 'langues',
    mathsNombres: 'Math#C3#A9matiques nombres et calcul',
    mathsDonnees: 'Math#C3#A9matique organisation de donn#C3#A9es',
    mathsGrandeurs: 'Math#C3#A9matiques Grandeurs et mesures',
    mathsGeometrie: 'Math#C3#A9matiques Espace et g#C3#A9om#C3#A9trie',
    mathsGeneral: 'Maths g#C3#A9n#C3#A9ralit#C3#A9s',
    niveauFrancais: 'Niveau de Fran#C3#A7ais',
    lectureFrancais: 'Lecure en fran#C3#A7ais',
    productionOrale: 'Production orale / communication',
    comprehensionOrale: 'Compr#C3#A9hension orale',
    comprehensionEcrite: 'compr#C3#A9hension #C3#A9crite',
    expressionEcrite: 'Expression #C3#A9crite',
    precoClasse: 'pr#C3#A9co classe',
    precoSerie: 'pr#C3#A9co s#C3#A9rie sp#C3#A9cialit#C3#A9',
    accompagnement: 'accompagnement',
    remarquesCasnav: 'Remarques CASNAV',
    datePsy: 'date rencontre psy', nomPsy: 'nom psy EN',
    souhaits: 'Souhaits scolaires ou pro'
  };

  const CASES = {
    moins16: 'moins de 16 ans', entre1618: 'entre 16 et 18 ans', plus18: 'Plus de 18 ans',
    sexeM: 'Case #C3#A0 cocher M', sexeF: 'Case #C3#A0 cocher F',
    scolariseOui: 'Scolaris#C3#A9 oui', scolariseNon: 'Scolaris#C3#A9 non',
    scolLangueMaternelleOui: 'scolaris#C3#A9 en langue maternelle oui',
    scolLangueMaternelleNon: 'scolaris#C3#A9 en langue maternelle non',
    docBulletins: 'documents bulletins', docDiplomes: 'documents dipl#C3#B4mes',
    docCertifScol: 'documents certif scol', docAutres: 'documents autres',
    missionLocale: 'Mission Locale'
  };

  // listes déroulantes du PDF : ce sont les seules valeurs acceptées
  const OPTIONS = {
    niveauScolaire: ["Scolarité conforme à la classe d'âge [en français]",
      "Scolarité conforme à sa classe d'âge [dans une autre langue]",
      'Non scolarisé antérieurement', 'Peu scolarisé antérieurement'],
    niveauFrancais: ["L'élève parle couramment le français",
      "L'élève ne parle pas du tout français, ou très peu.",
      "L'élève peut échanger en français."],
    precoClasse: ['6ème', '5ème', '4ème', '3ème', 'CAP', '2GT', '2Pro', '1GT', '1Pro',
      'Terminale', 'Term. Pro', 'UPE2A NSA', 'UPE2A Sas'],
    accompagnement: ['Classe ordinaire sans soutien linguistique',
      'Classe ordinaire avec soutien linguistique', 'UPE2A', 'UPE2A NSA', 'UPE2A Sas'],
    responsable: ['Parents', 'ASE', 'Jeune majeur(e)', 'Autre (fournir la délégation parentale) :'],
    /* ⚠ « évalué par » est une LISTE DÉROULANTE du PDF, pas un champ libre (07/09) : la
       liste des évaluateurs du CASNAV, telle qu'elle est dans le document. Un nom hors
       liste part en refus au remplissage — c'est « Autre : » qu'il faut choisir, et écrire
       le nom dans « évalué par qui ». Les espaces de fin d'« Autre :  » sont ceux du PDF :
       ne pas les corriger. */
    evaluePar: ['Anouck CARRE', 'Ekaterina CAULLIER', 'Élodie VAILLANT', 'Émilie SOUFFLET',
      'Ève HOUNKPATI-DELFONT', 'Esther LEROY', 'Fabienne GUERIN', 'Gaëtan BEREAU',
      'Hélène RESSE', 'Hélène VAULTIER', 'Isabelle LECOMPTE', 'J-Louis ROPERS-BECKMANN',
      'Joyce RISTANOVIC', 'Julie JAOUEN', 'Julie LEBERT', 'Lorenzo PIERAGNOLI',
      'Lucie BONS', 'Lucie ELIE', 'Marie ROBERT', 'Marthe BOUVET', 'Martine BEAUVAIS',
      'Matthieu MARCHADOUR', 'Muriel VAN KEMPEN', 'Patricia BROSSON', 'Véronique RONDEAU',
      'Autre :  ']
  };

  function jour(txt) { // "24/03/2009" -> Date
    const m = String(txt || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
  }

  function age(naissance, ref) {
    const d = naissance instanceof Date ? naissance : jour(naissance);
    if (!d) return null;
    const r = ref ? (ref instanceof Date ? ref : jour(ref)) : new Date();
    let a = r.getFullYear() - d.getFullYear();
    const m = r.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && r.getDate() < d.getDate())) a--;
    return a;
  }

  function tranche(a) { return a == null ? null : a < 16 ? 'moins16' : a <= 18 ? 'entre1618' : 'plus18'; }

  // classe d'âge de référence en France : 11 ans en 6e, une classe par année
  /* La classe d'âge se calcule sur l'ANNÉE DE NAISSANCE, jamais sur l'âge en années :
     tous les élèves nés du 01/01/2015 au 31/12/2015 sont en 6e à la rentrée 2026, même
     ceux qui n'ont pas encore 11 ans. Écart = année de rentrée − année de naissance. */
  const CLASSES = [
    [6, 'CP', 'cp', 2], [7, 'CE1', 'ce1', 2], [8, 'CE2', 'ce2', 2],
    [9, 'CM1', 'cm1', 3], [10, 'CM2', 'cm2', 3], [11, '6ème', '6e', 3],
    [12, '5ème', '5e', 4], [13, '4ème', '4e', 4], [14, '3ème', '3e', 4],
    [15, '2de', null, null], [16, '1re', null, null], [17, 'Terminale', null, null]
  ];

  /* Année de la rentrée en cours : à partir de juillet, c'est l'année civile. */
  function anneeRentree(ref) {
    const r = ref ? (ref instanceof Date ? ref : jour(ref)) : new Date();
    return r.getMonth() >= 6 ? r.getFullYear() : r.getFullYear() - 1;
  }

  /* classeDage accepte une date de naissance (« 07/12/2015 »), un objet Date,
     ou une simple année. */
  function classeDage(naissance, ref) {
    let an = null;
    if (naissance instanceof Date) an = naissance.getFullYear();
    else if (typeof naissance === 'number' && naissance > 1900) an = naissance;
    else { const d = jour(naissance); if (d) an = d.getFullYear(); }
    if (!an) return null;
    const ecart = anneeRentree(ref) - an;
    if (ecart < 6) return { nom: 'maternelle', cle: null, cycle: null, ecart };
    if (ecart > 17) return { nom: 'post-bac / CAP', cle: null, cycle: null, ecart };
    const t = CLASSES.find(([x]) => x === ecart);
    return t ? { nom: t[1], cle: t[2], cycle: t[3], ecart } : null;
  }

  async function lire(source) {
    const { PDFDocument, PDFTextField, PDFDropdown, PDFCheckBox, PDFRadioGroup, StandardFonts } = await pdflib();
    const buf = source instanceof Uint8Array ? source : new Uint8Array(await source.arrayBuffer());
    const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
    const form = doc.getForm();
    const brut = {};
    for (const f of form.getFields()) {
      const n = f.getName();
      try {
        if (f instanceof PDFTextField) brut[n] = f.getText() || '';
        else if (f instanceof PDFDropdown) brut[n] = (f.getSelected() || [])[0] || '';
        else if (f instanceof PDFCheckBox) brut[n] = f.isChecked();
        else if (f instanceof PDFRadioGroup) brut[n] = f.getSelected() || '';
      } catch (e) { brut[n] = ''; }
    }
    const v = {};
    for (const [cle, nom] of Object.entries(CHAMPS)) v[cle] = (brut[nom] || '').replace(/\r/g, '\n').trim();
    for (const [cle, nom] of Object.entries(CASES)) v[cle] = !!brut[nom];
    v.age = age(v.naissance);
    v.tranche = tranche(v.age);
    v.classe = classeDage(v.naissance);
    v.classeDage = v.classe ? v.classe.nom : null;
    v.classeCle = v.classe ? v.classe.cle : null;
    v.classeCycle = v.classe ? v.classe.cycle : null;
    v.brut = brut;
    v.vide = !v.nom && !v.prenom && !v.naissance;
    return v;
  }

  /* ⚠ LES ACCENTS : LA CAUSE ÉTAIT UNE DOUBLE ESPACE, PAS UN ENCODAGE (07/09, après
     plusieurs fausses pistes — j'ai d'abord accusé MacRoman et écrit une table de
     transcodage, qui abîmait les libellés déjà corrects).
     Les options de la fiche sont propres. C'est notre valeur qui portait deux espaces
     (« d'âge  [en français] ») là où le document n'en a qu'une : la comparaison stricte
     la déclarait « hors liste », rien n'était sélectionné, et la case gardait la vieille
     valeur abîmée du fichier d'origine — « ScolaritÈ conforme ‡ la classe d'ge ».
     D'où cette comparaison indulgente : sans accent, sans casse, espaces normalisées. Le
     libellé d'une option ne doit pas se retaper au caractère près. */
  const pareil = (a, b) => {
    const n = (x) => String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ').trim().toLowerCase();
    return n(a) === n(b);
  };
  /* Les noms de champs du PDF arrivent échappés (« Scolaris#C3#A9 non ») : on compare sans
     la casse ET sans les accents, déjà échappés ou non. */
  const pareilNom = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();

  /* ⚠ LES CARACTÈRES QUE LE PDF NE SAIT PAS ÉCRIRE (07/09 : « le remplissage a échoué :
     WinAnsi cannot encode "ᵉ" »). Un formulaire PDF standard n'écrit qu'en WinAnsi, un jeu
     de caractères d'Europe occidentale : un « 3ᵉ » avec le petit e en exposant, une espace
     insécable fine, un tiret conditionnel, et TOUT remplissage s'arrête net — une seule
     lettre invisible faisait perdre la fiche entière.
     Deux passes :
     1. `NFKC` replie les variantes typographiques sur leur lettre ordinaire (ᵉ → e, ½ → 1⁄2,
        № → No) SANS défaire les accents — `NFKD` les décomposerait et casserait les é ;
     2. ce qui reste hors WinAnsi est remplacé par un équivalent lisible, ou retiré, et le
        champ est signalé dans `refus` pour qu'elle sache où regarder.
     ⚠ Conséquence à connaître : une phrase écrite en ARABE (ou dans tout alphabet non
     latin) ne peut pas figurer dans cette fiche — la police du formulaire ne la contient
     pas. Elle est retirée et signalée, pas silencieusement remplacée. */
  const REMPLACE = {
    '\u2044': '/', '\u2248': '~', '\u2260': '!=', '\u2264': '<=', '\u2265': '>=',
    '\u2192': '->', '\u2190': '<-', '\u21d2': '=>', '\u00d7': 'x', '\u2032': "'", '\u2033': '"',
    '\u202f': ' ', '\u2009': ' ', '\u2007': ' ', '\u200a': ' ', '\u200b': '', '\u00ad': '',
    '\u2011': '-', '\u2015': '-', '\u2212': '-', '\u2043': '-'
  };
  /* Les signes typographiques que WinAnsi SAIT écrire, en plus du latin-1 : guillemets
     courbes, tirets cadratins, points de suspension, puce, œ, €… Les remplacer serait une
     perte gratuite sur une fiche française (« œ » → « oe »). */
  const EXTRA_WINANSI = '\u20ac\u201a\u0192\u201e\u2026\u2020\u2021\u02c6\u2030\u0160\u2039\u0152'
    + '\u017d\u2018\u2019\u201c\u201d\u2022\u2013\u2014\u02dc\u2122\u0161\u203a\u0153\u017e\u0178';
  const winAnsi = (texte) => {
    let s = String(texte == null ? '' : texte);
    try { s = s.normalize('NFKC'); } catch (e) {}
    let perdu = false;
    let out = '';
    for (const c of s) {
      if (REMPLACE[c] !== undefined) { out += REMPLACE[c]; continue; }
      const n = c.codePointAt(0);
      /* Latin-1 imprimable, les signes typographiques de WinAnsi, et les blancs de mise en
         page : le socle sûr. */
      if (n === 10 || n === 13 || n === 9 || (n >= 32 && n <= 126) || (n >= 160 && n <= 255)
        || EXTRA_WINANSI.indexOf(c) >= 0) {
        out += c; continue;
      }
      /* Dernière chance : la lettre sans son accent (ā → a). Sinon on abandonne le signe. */
      let repli = '';
      try {
        repli = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (repli && repli.codePointAt(0) > 255) repli = '';
      } catch (e) { repli = ''; }
      if (repli) out += repli; else perdu = true;
    }
    return { texte: out, perdu };
  };

  async function remplir(source, valeurs) {
    const { PDFDocument, PDFTextField, PDFDropdown, PDFCheckBox, PDFRadioGroup, StandardFonts,
      PDFName, PDFBool, PDFString, PDFDict } = await pdflib();
    const buf = source instanceof Uint8Array ? source : new Uint8Array(await source.arrayBuffer());
    const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
    const form = doc.getForm();
    /* ⚠ Les champs de la fiche d'origine imposent une police du document et une taille
       fixe. On embarque donc notre propre Helvetica, on regénère les apparences avec elle,
       puis on réécrit le /DA en taille automatique (voir plus bas : l'ordre compte). */
    let police = null;
    try { police = await doc.embedFont(StandardFonts.Helvetica); } catch (e) {}
    const refus = [];
    for (const [cle, val] of Object.entries(valeurs || {})) {
      const nom = CHAMPS[cle] || CASES[cle];
      if (!nom || val == null || val === '') continue;
      let f;
      /* ⚠ LE NOM DU CHAMP SE CHERCHE SANS TENIR COMPTE DE LA CASSE (07/09). La fiche EANA 76
         mélange les majuscules d'un champ à l'autre : « Scolarisé oui » avec un S majuscule,
         mais « scolarisé non » en minuscule. Conséquence mesurée : la case « scolarisé
         antérieurement : NON » n'était JAMAIS cochée — l'information centrale du document
         pour un élève NSA, partie vide en silence pendant des jours, avec pour seul indice
         un « champ absent » dans les refus.
         On retrouve donc le champ par son nom normalisé, comme `pareil()` le fait pour les
         listes. Cela règle la classe entière du défaut, pas seulement ce champ. */
      try { f = form.getField(nom); }
      catch (e) {
        const trouve = form.getFields().find((x) => {
          try { return pareilNom(x.getName(), nom); } catch (e2) { return false; }
        });
        if (trouve) f = trouve;
        else { refus.push(cle + ' (champ absent)'); continue; }
      }
      try {
        if (f instanceof PDFTextField) {
          const p = winAnsi(val);
          if (p.perdu) refus.push(cle + " : des caractères que le PDF ne sait pas écrire ont été retirés (alphabet non latin ?)");
          f.setText(p.texte);
        } else if (f instanceof PDFDropdown) {
          /* On retrouve l'option du document à l'espace et à l'accent près, et on sélectionne
             SON libellé à elle : c'est lui qui s'affichera. */
          const options = f.getOptions();
          const i = options.findIndex((o) => pareil(o, val));
          if (i < 0) { refus.push(cle + ' : « ' + val + ' » hors liste'); continue; }
          f.select(options[i]);
        } else if (f instanceof PDFCheckBox) { val ? f.check() : f.uncheck(); }
        else if (f instanceof PDFRadioGroup) f.select(String(val));
      } catch (e) { refus.push(cle + ' : ' + e.message); }
    }
    if (police) {
      /* ⚠ ET LA POLICE PAR DÉFAUT DES CHAMPS EST RÉÉCRITE (07/09, troisième tentative sur
         le même défaut). Le vrai coupable est le `/DA` du champ : « /F11 14 Tf » désigne
         une police du document en encodage MacRoman. Nos apparences étaient bonnes, mais
         tout lecteur qui redessine un champ — au clic, à l'impression, quand il juge
         l'apparence périmée — repart de ce /DA et remange les accents : « ScolaritÈ
         conforme ‡ la classe d'ge  [en franÁis] ».
         On déclare donc NOTRE Helvetica dans les ressources du formulaire (/DR) et on fait
         pointer le /DA du formulaire ET de chaque champ dessus. Les trois pièces sont
         nécessaires ensemble : /DR + /DA + NeedAppearances à faux. Ne pas en retirer une. */
      /* Chaque champ regénère son apparence avec NOTRE police : `updateFieldAppearances`
         seul laissait de côté les listes déroulantes, et c'est justement une liste
         (« Scolarité conforme à la classe d'âge ») qui ressortait de travers (07/09). */
      for (const f of form.getFields()) {
        if (!(f instanceof PDFTextField) && !(f instanceof PDFDropdown)) continue;
        try { f.updateAppearances(police); } catch (e) {}
      }
      try { form.updateFieldAppearances(police); }
      catch (e) { refus.push('apparence des champs : ' + e.message); }
      /* ⚠ LA TAILLE DE POLICE SE RÈGLE EN DERNIER, ET ELLE VAUT ZÉRO (07/09 : « c'est la
         taille de la police qui est délirante »). Deux causes cumulées : le `/DA` d'origine
         imposait 14 pt, et `updateAppearances` recalcule une taille qu'il réécrit dans le
         `/DA` — 16, 19 pt — d'après la hauteur du cadre, sans voir la longueur du texte.
         Comme le lecteur redessine d'après ce `/DA`, une adresse électronique s'affichait
         en géantes et débordait de sa case.
         `0 Tf` veut dire « ajuste à la case » : le lecteur réduit lui-même jusqu'à ce que
         le texte tienne. Il faut donc écrire le /DA APRÈS les apparences, sinon elles
         l'écrasent — c'est l'ordre qui compte ici, pas la valeur. */
      try {
        const dr = form.acroForm.dict.lookup(PDFName.of('DR'), PDFDict);
        let fonts = dr ? dr.lookup(PDFName.of('Font'), PDFDict) : null;
        if (dr && !fonts) { fonts = doc.context.obj({}); dr.set(PDFName.of('Font'), fonts); }
        if (fonts) fonts.set(PDFName.of(police.name), police.ref);
        const da = PDFString.of('/' + police.name + ' 0 Tf 0 g');
        form.acroForm.dict.set(PDFName.of('DA'), da);
        for (const f of form.getFields()) {
          if (!(f instanceof PDFTextField) && !(f instanceof PDFDropdown)) continue;
          try { f.acroField.dict.set(PDFName.of('DA'), da); } catch (e) {}
        }
      } catch (e) { refus.push('police des champs : ' + e.message); }
    }
    /* ⚠ `NeedAppearances` À VRAI, ET C'EST VOULU (07/09, après l'avoir essayé à faux).
       À faux, le lecteur affiche l'apparence telle qu'elle est dans le fichier : sur les
       listes déroulantes, l'ancien dessin de la fiche d'origine restait donc à l'écran —
       « ScolaritÈ conforme ‡ la classe d'ge » — alors que la valeur enregistrée était
       désormais correcte. À vrai, le lecteur REDESSINE à partir de la valeur juste, avec
       la police que nous avons déclarée dans /DR et pointée par le /DA de chaque champ.
       Les deux réglages vont donc ensemble : notre police dans /DA + /DR, et ce drapeau à
       vrai. Ne pas le repasser à faux sans corriger l'autre. */
    try { form.acroForm.dict.set(PDFName.of('NeedAppearances'), PDFBool.True); } catch (e) {}
    return { octets: await doc.save(), refus };
  }

  window.EANA = { CHAMPS, CASES, OPTIONS, CLASSES, lire, remplir, age, tranche, classeDage, anneeRentree, jour };
})();
