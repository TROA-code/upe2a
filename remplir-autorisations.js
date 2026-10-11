/* 11/10 (son oui) : remplit les autorisations parents de la sortie Pagnol avec SES contacts.
   Les coordonnées sont lues dans le localStorage de CET ordinateur (COORDO, rubrique Contacts) ;
   le PDF est fabriqué dans le navigateur et téléchargé directement. Rien n'est enregistré dans
   le projet ni envoyé en ligne. ⚠ Ne jamais écrire de coordonnée dans ce fichier : il est publié. */
(function () {
  const SOURCE = 'docs/administratif/2026-10-15 Autorisation parents et droit image - Pagnol.pdf';
  const ORDRE = [['FAKHILZAI', 'Anita'], ['HALAWA', 'Ahmed'], ['ZANGA', 'Josefina'], ['TARAKHEIL', 'Sania'],
    ['TARAKHEIL', 'Yasir'], ['ORYAKKHIL', 'Sumaya'], ['CAMARA', 'Bilal'], ['SAYEM', 'Saifur'], ['TOURE', 'Alpha']];
  const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
  function contactDe(liste, nom, prenom) {
    const n = norm(nom), p = norm(prenom);
    return liste.find(e => (norm(e.nom) === n || norm(e.nom).startsWith(n.slice(0, 5))) && norm(e.prenom).includes(p)) || {};
  }
  window.remplirAutorisationsPagnol = async function () {
    let liste = [];
    try { liste = JSON.parse(localStorage.getItem('coordo-upe2a-eleves') || '[]') || []; } catch (e) {}
    const lib = await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    const octets = await (await fetch(encodeURI(SOURCE))).arrayBuffer();
    const pdf = await lib.PDFDocument.load(octets);
    const f = await pdf.embedFont(lib.StandardFonts.HelveticaBold);
    const pages = pdf.getPages();
    const ecrire = (pg, x, y, s, max) => {
      s = String(s || '').trim(); if (!s) return;
      let size = 11; while (size > 7 && f.widthOfTextAtSize(s, size) > max) size -= 0.5;
      pg.drawText(s, { x, y, size, font: f });
    };
    let manquants = [];
    ORDRE.forEach(([nom, prenom], i) => {
      const c = contactDe(liste, nom, prenom), p1 = pages[i * 2], p2 = pages[i * 2 + 1];
      if (!p1 || !p2) return;
      if (!c.adresse && !c.responsable && !c.telReferent) manquants.push(prenom);
      ecrire(p1, 118, 615, c.responsable, 410);
      ecrire(p1, 102, 588, c.adresse, 430);
      ecrire(p1, 316, 546, [c.referent, c.telReferent].filter(Boolean).join(' — '), 190);
      ecrire(p2, 150, 241, c.responsable, 360);
      ecrire(p2, 82, 227, c.adresse, 430);
    });
    const url = URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' }));
    const a = document.createElement('a'); a.href = url; a.download = 'Autorisations parents - Pagnol (remplies).pdf';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    return manquants;
  };
})();
