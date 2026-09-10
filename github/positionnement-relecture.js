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
    niveauScolaire: 1, niveauFrancais: 1, sexe: 1, telEleve: 1, mailEleve: 1, codePostal: 1,
    /* ⚠ LES CONTACTS, L'ADRESSE ET LES COURRIELS (07/09, ses deux captures) : la relecture
       écrivait « BEN ABDALLAH. », « Amar. », « 06/28/16/70/99. », « Père. » — un point
       final sur un nom propre — et surtout « Bennne59@gmail. Com. » : la règle « majuscule
       après un point » coupait l'adresse électronique en deux et la rendait FAUSSE.
       Ces champs ne sont pas de la prose : on n'y touche pas. */
    responsable: 1, priseEnCharge: 1, pays: 1, arriveeFrance: 1,
    c1nom: 1, c1prenom: 1, c1tel: 1, c1qualite: 1,
    c2nom: 1, c2prenom: 1, c2tel: 1, c2qualite: 1, contactMail: 1,
    adresse: 1, cp: 1, ville: 1, domAdresse: 1, domCp: 1, domVille: 1,
    langueMaternelle: 1, nbLangues: 1, langues: 1, datePsy: 1, nomPsy: 1 };

  /* Filet de sécurité, en plus de la liste : ce qui n'est PAS une phrase reste intact.
     Une adresse électronique, une adresse web, un numéro de téléphone, une date, ou un
     libellé de deux mots sans verbe apparent — la relecture n'a rien à y faire, et elle y
     fait des dégâts irréparables (un courriel faux ne se remarque qu'au premier envoi). */
  const pasUnePhrase = (s) => {
    const t = String(s || '').trim();
    if (!t) return true;
    if (/[@]|https?:|www\./.test(t)) return true;
    if (/^[\d\s./+()-]+$/.test(t)) return true;
    return t.split(/\s+/).length <= 3 && !/[.!?]/.test(t);
  };

  function tout(valeurs) {
    const out = {};
    for (const k in valeurs) {
      const v = valeurs[k];
      out[k] = (typeof v === 'string' && !BRUTS[k] && !pasUnePhrase(v))
        ? texte(v)
        : (typeof v === 'string' ? v.trim() : v);
    }
    return out;
  }

  window.RELECTURE = { tout, texte, ligne };
})();
