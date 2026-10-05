/* TOP CHRONO — source unique des 41 séries (02/10). Ses 10 premiers (v1) + TOUT le Top Chrono
   CE1 qu'elle a envoyé, refait dans son format : noir et blanc, sans « CE1 », sans doublon.
   8 livrets (découpage validé le 02/10). Ronds : ● 0-10 · ●● 20 · ●●● 100 · ●●●● 199.
   La correction est CALCULÉE à partir des calculs : on ne tape jamais une réponse.
   Corriger un calcul ICI : les 8 livrets lisent ce fichier. */
(function () {
  const LIVRETS = [
    [1, 'Additionner jusqu\u2019\u00e0 10', [
      ['J\u2019additionne. Le r\u00e9sultat va jusqu\u2019\u00e0 10.', '1fr 1fr', ['3 + 6 = _', '4 + 5 = _', '2 + 7 = _', '5 + 3 = _', '6 + 4 = _', '2 + 6 = _', '4 + 4 = _', '3 + 5 = _', '5 + 5 = _', '7 + 2 = _']],
      ['J\u2019additionne. Le r\u00e9sultat d\u00e9passe 10.', '1fr 1fr', ['7 + 8 = _', '7 + 4 = _', '9 + 5 = _', '6 + 7 = _', '8 + 3 = _', '5 + 9 = _', '8 + 6 = _', '4 + 9 = _', '6 + 5 = _', '8 + 8 = _']],
      ['Les doubles jusqu\u2019\u00e0 5.', '1fr 1fr', ['1 + 1 = _', 'double de 2 \u2192 _', '2 + 2 = _', 'double de 4 \u2192 _', '3 + 3 = _', 'double de 1 \u2192 _', '4 + 4 = _', 'double de 5 \u2192 _', '5 + 5 = _', 'double de 3 \u2192 _']],
      ['Les compl\u00e9ments \u00e0 5.', '1fr 1fr', ['1 + _ = 5', '5 \u2212 1 = _', '3 + _ = 5', '5 \u2212 3 = _', '0 + _ = 5', '5 \u2212 2 = _', '4 + _ = 5', '5 \u2212 4 = _', '2 + _ = 5', '5 \u2212 5 = _']],
      ['Les compl\u00e9ments \u00e0 10.', '1fr 1fr', ['1 + _ = 10', '4 + _ = 10', '7 + _ = 10', '2 + _ = 10', '9 + _ = 10', '5 + _ = 10', '3 + _ = 10', '8 + _ = 10', '6 + _ = 10', '0 + _ = 10']]]],
    [2, 'Les nombres jusqu\u2019\u00e0 20', [
      ['J\u2019\u00e9cris < ou >.', '1fr 1fr', ['7 _ 12', '15 _ 9', '11 _ 14', '20 _ 18', '6 _ 16', '13 _ 3', '19 _ 17', '8 _ 10', '12 _ 2', '14 _ 19']],
      ['Le nombre d\u2019avant et le nombre d\u2019apr\u00e8s.', '1fr 1fr', ['_ 12 _', '_ 5 _', '_ 17 _', '_ 9 _', '_ 14 _', '_ 19 _', '_ 10 _', '_ 16 _']],
      ['Je range dans l\u2019ordre croissant.', '1fr', ['8 \u00b7 3 \u00b7 12 \u2192 _ < _ < _', '15 \u00b7 11 \u00b7 19 \u2192 _ < _ < _', '9 \u00b7 20 \u00b7 4 \u2192 _ < _ < _', '17 \u00b7 7 \u00b7 13 \u2192 _ < _ < _', '10 \u00b7 1 \u00b7 6 \u2192 _ < _ < _']],
      ['Compter jusqu\u2019\u00e0 20.', '1fr', ['11 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '14 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '8 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '16 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '9 \u2192 _ \u2192 _ \u2192 _ \u2192 _']],
      ['Les doubles jusqu\u2019\u00e0 10.', '1fr 1fr', ['6 + 6 = _', 'double de 7 \u2192 _', '8 + 8 = _', 'double de 6 \u2192 _', '7 + 7 = _', 'double de 9 \u2192 _', '9 + 9 = _', 'double de 10 \u2192 _', '10 + 10 = _', 'double de 8 \u2192 _']]]],
    [2, 'Les tables d\u2019addition', [
      ['Les tables + 2 et + 3.', '1fr 1fr', ['6 + 2', '3 + 8', '2 + 9', '7 + 3', '5 + 2', '3 + 9', '8 + 2', '4 + 3', '2 + 7', '3 + 6']],
      ['Les tables + 4 et + 5.', '1fr 1fr', ['7 + 4', '5 + 6', '4 + 9', '8 + 5', '4 + 6', '5 + 9', '8 + 4', '5 + 7', '4 + 5', '9 + 5']],
      ['La table + 6.', '1fr 1fr', ['6 + 3', '5 + 6', '6 + 8', '7 + 6', '6 + 6', '9 + 6', '6 + 4', '2 + 6', '6 + 7', '8 + 6']],
      ['La table + 7.', '1fr 1fr', ['7 + 5', '3 + 7', '7 + 8', '6 + 7', '7 + 7', '9 + 7', '7 + 4', '2 + 7', '7 + 9', '8 + 7']],
      ['Les tables + 6 et + 7.', '1fr 1fr', ['6 + 5', '7 + 8', '6 + 9', '7 + 4', '6 + 7', '7 + 9', '6 + 8', '7 + 6', '6 + 3', '7 + 7']],
      ['La table + 8.', '1fr 1fr', ['8 + 4', '6 + 8', '8 + 7', '3 + 8', '8 + 8', '9 + 8', '8 + 5', '2 + 8', '8 + 9', '5 + 8']],
      ['La table + 9.', '1fr 1fr', ['9 + 3', '5 + 9', '9 + 8', '4 + 9', '9 + 9', '7 + 9', '9 + 6', '2 + 9', '9 + 7', '6 + 9']]]],
    [2, 'Calculer vite jusqu\u2019\u00e0 20', [
      ['Presque les doubles.', '1fr 1fr', ['5 + 6', '7 + 8', '4 + 5', '8 + 9', '6 + 7', '3 + 4', '9 + 10', '6 + 5', '8 + 7', '7 + 6']],
      ['Les doubles jusqu\u2019\u00e0 20.', '1fr 1fr', ['11 + 11 = _', 'double de 14 \u2192 _', '12 + 12 = _', 'double de 18 \u2192 _', '15 + 15 = _', 'double de 13 \u2192 _', '16 + 16 = _', 'double de 20 \u2192 _', '17 + 17 = _', 'double de 19 \u2192 _']],
      ['Les compl\u00e9ments \u00e0 20.', '1fr 1fr', ['15 + _ = 20', '20 \u2212 4 = _', '12 + _ = 20', '_ + 17 = 20', '9 + _ = 20', '20 \u2212 11 = _', '18 + _ = 20', '_ + 6 = 20', '14 + _ = 20', '20 \u2212 13 = _']],
      ['J\u2019ajoute 3 nombres.', '1fr 1fr', ['5 + 5 + 1', '4 + 4 + 6', '2 + 8 + 3', '7 + 3 + 6', '6 + 4 + 2', '5 + 2 + 5', '3 + 7 + 7', '8 + 2 + 4', '9 + 1 + 5', '4 + 6 + 8']],
      ['J\u2019ajoute 5, j\u2019enl\u00e8ve 5.', '1fr 1fr', ['7 + 5', '12 \u2212 5', '9 + 5', '15 \u2212 5', '11 + 5', '8 \u2212 5', '14 + 5', '17 \u2212 5', '6 + 5', '13 \u2212 5']],
      ['Les moiti\u00e9s jusqu\u2019\u00e0 20.', '1fr 1fr', ['moiti\u00e9 de 4 \u2192 _', 'moiti\u00e9 de 10 \u2192 _', 'moiti\u00e9 de 16 \u2192 _', 'moiti\u00e9 de 8 \u2192 _', 'moiti\u00e9 de 20 \u2192 _', 'moiti\u00e9 de 6 \u2192 _', 'moiti\u00e9 de 14 \u2192 _', 'moiti\u00e9 de 12 \u2192 _', 'moiti\u00e9 de 18 \u2192 _', 'moiti\u00e9 de 2 \u2192 _']]]],
    [3, 'Les nombres jusqu\u2019\u00e0 100', [
      ['J\u2019ajoute 10, j\u2019enl\u00e8ve 10.', '1fr 1fr', ['25 + 10', '47 \u2212 10', '63 + 10', '72 \u2212 10', '18 + 10', '56 \u2212 10', '39 + 10', '81 \u2212 10', '54 + 10', '30 \u2212 10']],
      ['Compter jusqu\u2019\u00e0 100.', '1fr', ['38 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '59 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '67 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '89 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '94 \u2192 _ \u2192 _ \u2192 _ \u2192 _']],
      ['J\u2019ajoute et j\u2019enl\u00e8ve des dizaines.', '1fr 1fr', ['40 + 20', '98 \u2212 20', '62 \u2212 20', '25 + 30', '58 + 20', '91 \u2212 30', '47 \u2212 20', '36 + 40', '75 \u2212 50', '13 + 60']],
      ['Les compl\u00e9ments \u00e0 100.', '1fr 1fr', ['90 + _ = 100', '100 \u2212 30 = _', '60 + _ = 100', '_ + 20 = 100', '40 + _ = 100', '100 \u2212 70 = _', '10 + _ = 100', '_ + 50 = 100', '80 + _ = 100', '100 \u2212 60 = _']],
      ['J\u2019arrive \u00e0 la dizaine.', '1fr 1fr', ['73 + _ = 80', '81 + _ = 90', '46 + _ = 50', '27 + _ = 30', '58 + _ = 60', '64 + _ = 70', '32 + _ = 40', '95 + _ = 100', '19 + _ = 20', '88 + _ = 90']],
      ['J\u2019ajoute 9, j\u2019enl\u00e8ve 9.', '1fr 1fr', ['24 + 9', '35 \u2212 9', '47 + 9', '52 \u2212 9', '16 + 9', '63 \u2212 9', '58 + 9', '41 \u2212 9', '73 + 9', '86 \u2212 9']]]],
    [3, 'Doubles et multiplications', [
      ['La table \u00d7 2.', '1fr 1fr', ['2 \u00d7 3', '5 \u00d7 2', '2 \u00d7 8', '4 \u00d7 2', '2 \u00d7 6', '9 \u00d7 2', '2 \u00d7 7', '1 \u00d7 2', '2 \u00d7 10', '2 \u00d7 0']],
      ['La table \u00d7 10.', '1fr 1fr', ['3 \u00d7 10', '10 \u00d7 7', '5 \u00d7 10', '10 \u00d7 2', '9 \u00d7 10', '10 \u00d7 4', '6 \u00d7 10', '10 \u00d7 10', '8 \u00d7 10', '10 \u00d7 1']],
      ['La table \u00d7 5.', '1fr 1fr', ['5 \u00d7 2', '4 \u00d7 5', '5 \u00d7 6', '3 \u00d7 5', '5 \u00d7 10', '8 \u00d7 5', '5 \u00d7 5', '7 \u00d7 5', '5 \u00d7 9', '1 \u00d7 5']],
      ['La table \u00d7 3.', '1fr 1fr', ['3 \u00d7 2', '4 \u00d7 3', '3 \u00d7 6', '5 \u00d7 3', '3 \u00d7 9', '7 \u00d7 3', '3 \u00d7 3', '8 \u00d7 3', '3 \u00d7 10', '1 \u00d7 3']],
      ['La table \u00d7 4.', '1fr 1fr', ['4 \u00d7 2', '3 \u00d7 4', '4 \u00d7 5', '6 \u00d7 4', '4 \u00d7 4', '9 \u00d7 4', '4 \u00d7 7', '8 \u00d7 4', '4 \u00d7 10', '1 \u00d7 4']],
      ['Les tables \u00d7 2, 3, 4, 5 et 10.', '1fr 1fr', ['3 \u00d7 4', '2 \u00d7 9', '5 \u00d7 6', '4 \u00d7 7', '10 \u00d7 8', '3 \u00d7 8', '5 \u00d7 9', '4 \u00d7 6', '2 \u00d7 7', '3 \u00d7 7']]]],
    [4, 'Apr\u00e8s 100', [
      ['Compter jusqu\u2019\u00e0 199.', '1fr', ['163 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '156 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '176 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '128 \u2192 _ \u2192 _ \u2192 _ \u2192 _', '189 \u2192 _ \u2192 _ \u2192 _ \u2192 _']],
      ['Les compl\u00e9ments en deux \u00e9tapes.', '1fr 1fr', ['37 + _ = 50', '12 + _ = 30', '78 + _ = 100', '56 + _ = 70', '47 + _ = 70', '61 + _ = 80', '24 + _ = 40', '83 + _ = 100', '15 + _ = 40', '69 + _ = 90']],
      ['J\u2019arrive \u00e0 la centaine.', '1fr 1fr', ['78 + _ = 100', '189 + _ = 200', '88 + _ = 100', '171 + _ = 200', '145 + _ = 200', '93 + _ = 100', '156 + _ = 200', '62 + _ = 100', '134 + _ = 200', '117 + _ = 200']]]],
    [3, 'Calculer jusqu\u2019\u00e0 100', [
      ['J\u2019additionne deux nombres.', '1fr 1fr', ['25 + 23', '28 + 67', '60 + 38', '27 + 41', '32 + 26', '18 + 67', '49 + 20', '54 + 35', '36 + 47', '71 + 19']],
      ['Les moiti\u00e9s jusqu\u2019\u00e0 100.', '1fr 1fr', ['moiti\u00e9 de 40 \u2192 _', 'moiti\u00e9 de 70 \u2192 _', 'moiti\u00e9 de 92 \u2192 _', 'moiti\u00e9 de 24 \u2192 _', 'moiti\u00e9 de 86 \u2192 _', 'moiti\u00e9 de 30 \u2192 _', 'moiti\u00e9 de 64 \u2192 _', 'moiti\u00e9 de 58 \u2192 _', 'moiti\u00e9 de 100 \u2192 _', 'moiti\u00e9 de 16 \u2192 _']],
      ['Les doubles jusqu\u2019\u00e0 100.', '1fr 1fr', ['double de 20 \u2192 _', 'double de 15 \u2192 _', 'double de 30 \u2192 _', 'double de 25 \u2192 _', 'double de 40 \u2192 _', 'double de 12 \u2192 _', 'double de 50 \u2192 _', 'double de 35 \u2192 _', 'double de 14 \u2192 _', 'double de 45 \u2192 _']]]]
  ];
  const E = s => s.indexOf('_') < 0 ? s + ' = _' : s;
  const tok = s => s.split(' ').map(t => t === '_' ? { blank: true, texte: false } : { t, blank: false, texte: true });
  const calc = toks => Function('return (' + toks.join(' ').replace(/\u2212/g, '-').replace(/\u00d7/g, '*') + ')')();
  function reponses(str) {
    const w = str.split(' '), nb = w.filter(x => x === '_').length, num = x => +x;
    if (w[0] === 'double') return [2 * num(w[2])];
    if (w[0] === 'moiti\u00e9') return [num(w[2]) / 2];
    if (str.includes('\u00b7')) return w.filter(x => /^\d+$/.test(x)).map(Number).sort((a, b) => a - b);
    if (w.length === 3 && w[0] === '_' && w[2] === '_') return [num(w[1]) - 1, num(w[1]) + 1];
    if (w.length === 3 && w[1] === '_') return [num(w[0]) < num(w[2]) ? '<' : '>'];
    if (w[1] === '\u2192') return Array.from({ length: nb }, (_, i) => num(w[0]) + i + 1);
    const eq = w.indexOf('='), g = w.slice(0, eq), d = w.slice(eq + 1);
    if (d[0] === '_') return [calc(g)];
    const c = num(d[0]);
    if (g[0] === '_') return [c - num(g[2])];
    return [g[1] === '+' ? c - num(g[0]) : num(g[0]) - c];
  }
  const corrige = str => { const r = reponses(str); let i = 0; return str.split(' ').map(t => t === '_' ? { t: String(r[i++]), rep: true, texte: false } : { t, rep: false, texte: true }); };
  function livret(k) {
    let n = 1;
    for (let i = 0; i < k - 1; i++) n += LIVRETS[i][2].length;
    const [niv, titre, defs] = LIVRETS[k - 1];
    const ronds = Array.from({ length: niv }, (_, i) => i);
    const series = defs.map(([objectif, colonnes, items], i) => {
      const full = items.map(E);
      return { n: n + i, objectif, colonnes, ronds, items: full.map(tok), corr: full.map(corrige) };
    });
    const pages = [], corrPages = [];
    for (let i = 0; i < series.length; i += 2) { const g = series.slice(i, i + 2); pages.push({ series: g, label: 'n\u00b0 ' + g[0].n + (g[1] ? '-' + g[1].n : '') }); }
    for (let i = 0; i < series.length; i += 4) { const g = series.slice(i, i + 4); corrPages.push({ series: g, label: 'Correction n\u00b0 ' + g[0].n + '-' + g[g.length - 1].n }); }
    return { cover: { num: k, titre, ronds, de: series[0].n, a: series[series.length - 1].n, fiches: series.map(s => ({ n: s.n, objectif: s.objectif })) }, pages, corrPages, pret: true };
  }
  window.TOP_CHRONO = { LIVRETS, livret };
})();
