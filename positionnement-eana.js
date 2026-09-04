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
    responsable: ['Parents', 'ASE', 'Jeune majeur(e)', 'Autre (fournir la délégation parentale) :']
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

  async function remplir(source, valeurs) {
    const { PDFDocument, PDFTextField, PDFDropdown, PDFCheckBox, PDFRadioGroup, StandardFonts } = await pdflib();
    const buf = source instanceof Uint8Array ? source : new Uint8Array(await source.arrayBuffer());
    const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
    const form = doc.getForm();
    /* ⚠ Les accents. La fiche d'origine décrit ses champs avec une police en encodage
       MacRoman : les octets écrits par pdf-lib (WinAnsi) y sont relus de travers —
       « Scolarité conforme à la classe d'âge » sortait « ScolaritÈ conforme ‡ la classe
       d'ge » (02/09). On embarque donc notre propre Helvetica et on regénère
       l'apparence de tous les champs avec elle, après la saisie. */
    let police = null;
    try { police = await doc.embedFont(StandardFonts.Helvetica); } catch (e) {}
    const refus = [];
    for (const [cle, val] of Object.entries(valeurs || {})) {
      const nom = CHAMPS[cle] || CASES[cle];
      if (!nom || val == null || val === '') continue;
      let f; try { f = form.getField(nom); } catch (e) { refus.push(cle + ' (champ absent)'); continue; }
      try {
        if (f instanceof PDFTextField) f.setText(String(val));
        else if (f instanceof PDFDropdown) {
          const ok = f.getOptions().includes(String(val));
          if (ok) f.select(String(val)); else refus.push(cle + ' : « ' + val + ' » hors liste');
        } else if (f instanceof PDFCheckBox) { val ? f.check() : f.uncheck(); }
        else if (f instanceof PDFRadioGroup) f.select(String(val));
      } catch (e) { refus.push(cle + ' : ' + e.message); }
    }
    if (police) {
      try { form.updateFieldAppearances(police); }
      catch (e) { refus.push('apparence des champs : ' + e.message); }
    }
    return { octets: await doc.save(), refus };
  }

  window.EANA = { CHAMPS, CASES, OPTIONS, CLASSES, lire, remplir, age, tranche, classeDage, anneeRentree, jour };
})();
