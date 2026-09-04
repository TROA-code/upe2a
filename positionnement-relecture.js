/* LA RELECTURE AVANT IMPRESSION

   Ce que la machine sait faire seule, sans jamais changer le sens : la ponctuation,
   les majuscules, les espaces. Elle NE corrige PAS l'orthographe des mots — aucun
   dictionnaire ne tourne hors ligne ici, et une correction devinée serait pire que la
   coquille. Pour l'orthographe, l'enseignante relit, ou elle me montre le texte.

   Règles appliquées, dans l'ordre :
     · les espaces multiples deviennent un seul espace ;
     · l'espace insécable avant : ; ! ? » et après « , comme le veut le français ;
     · pas d'espace avant . , ni après une parenthèse ouvrante ;
     · une majuscule en début de phrase et après un point ;
     · un point final s'il manque (sauf sur une ligne à tiret laissée en style télégraphique
       — non : elle en met, donc on en met aussi) ;
     · les lignes vides en trop disparaissent, les tirets gardent leur alignement. */
(function () {
  const INSEC = '\u00a0';

  function ligne(t) {
    let s = String(t);
    s = s.replace(/[ \t]+/g, ' ').trim();
    if (!s) return '';
    /* ponctuation double : une espace insécable devant, une espace derrière */
    s = s.replace(/\s*([;:!?»])/g, INSEC + '$1');
    s = s.replace(/«\s*/g, '«' + INSEC);
    /* ponctuation simple : rien devant, une espace derrière */
    s = s.replace(/\s+([.,])/g, '$1');
    s = s.replace(/([.,;:!?])(?=[A-Za-zÀ-ÿ0-9«])/g, '$1 ');
    s = s.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
    /* majuscule en tête, et après un point */
    const majuscule = (x) => x.charAt(0).toUpperCase() + x.slice(1);
    const tiret = /^[-–—]\s*/.exec(s);
    if (tiret) s = tiret[0].replace(/^[–—]/, '-') + majuscule(s.slice(tiret[0].length));
    else s = majuscule(s);
    s = s.replace(/([.!?])\s+([a-zà-ÿ])/g, (m, p, c) => p + ' ' + c.toUpperCase());
    /* point final : elle en met partout, même sur les lignes à tiret */
    if (!/[.!?:»]$/.test(s)) s += '.';
    return s;
  }

  function texte(t) {
    if (!t) return '';
    return String(t).split('\n').map(l => l.trim() ? ligne(l) : '')
      .join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  /* Les champs qui ne sont pas des phrases : dates, noms, listes déroulantes. */
  const BRUTS = { datePositionnement: 1, evaluePar: 1, evalueParAutre: 1, nom: 1, prenom: 1,
    naissance: 1, arrivee: 1, nationalite: 1, precoClasse: 1, precoSerie: 1, accompagnement: 1,
    niveauScolaire: 1, niveauFrancais: 1, sexe: 1, telEleve: 1, mailEleve: 1, codePostal: 1 };

  function tout(valeurs) {
    const out = {};
    for (const k in valeurs) {
      const v = valeurs[k];
      out[k] = (typeof v === 'string' && !BRUTS[k]) ? texte(v) : (typeof v === 'string' ? v.trim() : v);
    }
    return out;
  }

  window.RELECTURE = { tout, texte, ligne };
})();
