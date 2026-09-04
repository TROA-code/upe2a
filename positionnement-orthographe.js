/* LA CORRECTION ORTHOGRAPHIQUE — LanguageTool

   L'appli tourne hors ligne ; cette vérification est la seule chose qui demande du
   réseau, et elle ne part JAMAIS toute seule : l'enseignante clique.

   Le service (api.languagetool.org, gratuit, sans compte) renvoie une liste de fautes
   avec, pour chacune, l'endroit exact et les corrections proposées. Rien n'est appliqué
   d'office : chaque correction s'accepte d'un clic.

   Deux garde-fous : un quota d'environ 20 appels par minute côté service, donc les
   cases sont envoyées d'un seul tenant, séparées par des retours à la ligne ; et si le
   réseau manque, on le dit clairement au lieu de faire semblant. */
(function () {
  const URL = 'https://api.languagetool.org/v2/check';

  /* Ce que LanguageTool sait bien faire, et ce qu'on lui laisse faire ici. On écarte
     les règles de style et de typographie : la relecture maison s'en occupe déjà, et
     ses suggestions de reformulation ne sont pas les tournures de l'enseignante. */
  const ECARTEES = ['WHITESPACE_RULE', 'FRENCH_WHITESPACE', 'UPPERCASE_SENTENCE_START',
    'COMMA_PARENTHESIS_WHITESPACE', 'APOS_TYP', 'FR_SPELLING_RULE_UNPAIRED',
    'APOS_ESPACE', 'ESPACE_APRES_APOSTROPHE', 'TYPOGRAPHIE_APOSTROPHE'];

  function utile(m, texte) {
    if (ECARTEES.indexOf(m.rule && m.rule.id) >= 0) return false;
    const cat = m.rule && m.rule.category && m.rule.category.id;
    if (cat === 'TYPOGRAPHY' || cat === 'STYLE' || cat === 'REDUNDANCY') return false;
    const mot = String(texte || '').substr(m.offset, m.length).trim();
    /* Sigles et codes du métier — UPE2A, NSA, CASNAV, 2GT, A2, B2 : LanguageTool les
       prend pour des fautes et propose n'importe quoi (« UPE2A → OPÉRA »). */
    if (/\d/.test(mot)) return false;
    if (/^[A-ZÉÈÀÙÂÊÎÔÛÇ]{2,}$/.test(mot)) return false;
    return true;
  }

  /* texte : une chaîne. Renvoie [{ debut, longueur, mot, propositions, message }]. */
  async function verifier(texte) {
    if (!texte || !texte.trim()) return [];
    const corps = new URLSearchParams({
      text: texte, language: 'fr', enabledOnly: 'false'
    });
    const r = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: corps.toString()
    });
    if (!r.ok) throw new Error('LanguageTool a répondu ' + r.status);
    const data = await r.json();
    return (data.matches || []).filter(m => utile(m, texte)).map(m => ({
      debut: m.offset, longueur: m.length,
      mot: texte.substr(m.offset, m.length),
      propositions: (m.replacements || []).slice(0, 3).map(x => x.value),
      message: m.shortMessage || m.message || ''
    })).filter(f => f.propositions.length);
  }

  /* Applique une correction dans une chaîne, sans toucher au reste. */
  function appliquer(texte, faute, remplacement) {
    return texte.slice(0, faute.debut) + remplacement + texte.slice(faute.debut + faute.longueur);
  }

  /* Plusieurs cases d'un coup : un seul appel réseau, les fautes reviennent rangées
     par clé de champ. Les cases sont recollées avec un séparateur qui ne trouble pas
     l'analyse et permet de retrouver à quelle case appartient chaque faute. */
  async function verifierPlusieurs(champs) {
    const cles = Object.keys(champs).filter(k => (champs[k] || '').trim());
    if (!cles.length) return {};
    const SEP = '\n\n';
    let position = 0; const bornes = [];
    const morceaux = cles.map(k => {
      const t = String(champs[k]);
      bornes.push({ cle: k, debut: position, fin: position + t.length });
      position += t.length + SEP.length;
      return t;
    });
    const fautes = await verifier(morceaux.join(SEP));
    const out = {};
    for (const f of fautes) {
      const b = bornes.find(x => f.debut >= x.debut && f.debut < x.fin);
      if (!b) continue;
      (out[b.cle] = out[b.cle] || []).push(Object.assign({}, f, { debut: f.debut - b.debut }));
    }
    return out;
  }

  window.ORTHOGRAPHE = { verifier, verifierPlusieurs, appliquer };
})();
