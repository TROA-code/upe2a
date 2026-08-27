// Générateur de fiches à imprimer à partir d'un thème.
// Produit des pages {id, coll, nom, html} lisibles par « APPLI - Fiche ».
// Règles : police bâton, consignes en gras et en FALC (une action par ligne),
// pictos, points de part et d'autre pour relier, feuille support avec les étiquettes,
// modèle fait pour l'autonomie, feuille de correction.
(function () {
  try {
    if (!document.getElementById('om-caveat')) {
      var l = document.createElement('link');
      l.id = 'om-caveat'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap';
      document.head.appendChild(l);
    }
  } catch (e) {}
  var PAS = { petit: 10, moyen: 13.5, grand: 19 };
  var POLICE = 'Verdana, Tahoma, sans-serif';

  function esc(t) {
    return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function img(fichier) {
    var f = String(fichier || '');
    if (/^(data:|https?:|clean\/)/.test(f)) return f;
    return "clean/" + (/^(geste|phrase)-/.test(f) ? f : 'mot-' + f) + ".png";
  }
  function bande(interligne) {
    var pas = PAS[interligne] || PAS.moyen, m = pas / 2, h = pas * 4 + m * 2;
    var traits = [['#2f5fd0', 1.8], ['#b9bfc8', 1.3], ['#3aa03a', 2.2], ['#8a5a2b', 2.2], ['#d94a3d', 1.8]];
    var lignes = traits.map(function (t, i) {
      var y = m + pas * i;
      return '<line x1="0" y1="' + y + '" x2="1000" y2="' + y + '" stroke="' + t[0] + '" stroke-width="' + t[1] + '"></line>';
    }).join('');
    return '<svg viewBox="0 0 1000 ' + h + '" preserveAspectRatio="none" style="width:100%;height:' + (h * 0.42).toFixed(1) + 'mm;display:block">' + lignes + '</svg>';
  }
  function page(label, titre, sousTitre, corps, couleur) {
    return '<section class="page" data-screen-label="' + esc(label) + '" style="position:relative;display:flex;flex-direction:column;background:#fff;overflow:hidden;padding:14mm 14mm 16mm;box-sizing:border-box;font-family:' + POLICE + '">' +
      '<div style="flex:0 0 auto;display:flex;align-items:flex-end;gap:6mm;padding-bottom:3mm;border-bottom:2.5px solid ' + couleur + '">' +
      '<span style="flex:1;font-size:17pt;font-weight:700;color:#14213d;line-height:1.1">' + esc(titre) + '</span>' +
      '<span style="flex:0 0 auto;font-size:8pt;letter-spacing:0.14em;text-transform:uppercase;color:' + couleur + '">' + esc(sousTitre) + '</span>' +
      '</div>' +
      '<div style="flex:0 0 auto;display:flex;gap:8mm;padding:3mm 0 0;font-size:9.5pt;color:#6b7386">' +
      '<span style="flex:1;border-bottom:1px solid #b9c6d6;padding-bottom:1.5mm">Nom :</span>' +
      '<span style="flex:0 0 46mm;border-bottom:1px solid #b9c6d6;padding-bottom:1.5mm">Date :</span>' +
      '</div>' + corps + '</section>';
  }
  function consigne(lignes, pictos, note) {
    var PICTO = { oeil: 'clean/icone-oeil.svg', oreille: 'clean/icone-oreille.svg',
      crayon: 'clean/mot-crayon.png', ciseaux: 'clean/mot-ciseaux.png', colle: 'clean/mot-colle.png' };
    var ico = (pictos || []).map(function (p, i) {
      return (i ? '<span style="flex:0 0 auto;font-size:15pt;color:#8a91a3">&#8594;</span>' : '') +
        '<span style="flex:0 0 auto;width:13mm;height:11mm;background-image:url(\'' + (PICTO[p] || ('clean/mot-' + p + '.png')) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;display:block"></span>';
    }).join('');
    return '<div style="flex:0 0 auto;display:flex;align-items:center;gap:5mm;background:#f4f6f9;border:1.5px solid #dde2e9;border-radius:2mm;padding:3mm 4mm;margin:5mm 0 5mm">' + ico +
      '<span style="flex:1;min-width:0;font-size:12pt;font-weight:700;color:#14213d;line-height:1.45">' +
      lignes.map(esc).join('<br />') +
      (note ? '<br /><span style="font-weight:400;color:#6b7386">' + esc(note) + '</span>' : '') +
      '</span></div>';
  }
  function point(c) {
    return '<span style="flex:0 0 auto;width:3.2mm;height:3.2mm;border-radius:50%;background:' + c + ';display:block"></span>';
  }

  // ---- relier l'image et le mot
  function ficheRelier(t, items) {
    var droite = t.melange(items.slice());
    var lignes = items.map(function (it, i) {
      var d = droite[i];
      return '<div style="display:flex;align-items:center;gap:4mm">' +
        '<span style="flex:0 0 30mm;height:22mm;border:1.5px solid #14213d;border-radius:2mm;background-image:url(\'' + img(it[1]) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;background-origin:content-box;padding:1.5mm;display:block"></span>' +
        point('#1d4e89') +
        '<span style="flex:1"></span>' + point('#1d4e89') +
        '<span style="flex:0 0 62mm;border:1.5px solid #dde2e9;border-radius:2mm;padding:3mm;font-size:13pt;color:#14213d;line-height:1.3">' + esc(d[0]) + '</span>' +
        '</div>';
    }).join('');
    return page('Relier', t.titre, 'relier', consigne(['Regarde l\'image.', 'Relie l\'image et le mot.'], ['oeil', 'crayon']) +
      '<div style="flex:0 0 auto;display:flex;flex-direction:column;gap:5mm">' + lignes + '</div>', '#1d4e89');
  }

  // ---- étiquettes à découper
  function ficheEtiquettes(t, items) {
    var etq = t.melange(items.slice()).map(function (it) {
      return '<div style="border:2px dashed #8a91a3;border-radius:2mm;display:flex;align-items:center;justify-content:center;padding:3mm;font-size:13pt;color:#14213d;text-align:center;line-height:1.3">' + esc(it[0]) + '</div>';
    }).join('');
    return page('Étiquettes', t.titre, 'à découper', consigne(['Découpe les étiquettes.'], ['ciseaux']) +
      '<div style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:22mm;align-content:start;gap:5mm">' + etq + '</div>', '#8a4b1e');
  }

  // ---- feuille support : images + cases vides, le premier item fait
  function ficheSupport(t, items) {
    var cases = items.map(function (it, i) {
      var modele = i === 0 && t.modele;
      return '<div style="display:flex;flex-direction:column;gap:2.5mm">' +
        '<div style="position:relative;height:34mm;border:1.5px solid #14213d;border-radius:2mm;background-image:url(\'' + img(it[1]) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;background-origin:content-box;padding:2mm">' +
        (modele ? '<span style="position:absolute;top:1.5mm;left:2mm;background:#1d4e89;color:#fff;font-size:7.5pt;letter-spacing:0.1em;text-transform:uppercase;padding:1mm 2.5mm;border-radius:1mm">modèle</span>' : '') +
        '</div>' +
        (modele
          ? '<div style="height:18mm;border:2px solid #1d4e89;border-radius:2mm;display:flex;align-items:center;justify-content:center;padding:2mm;font-size:12.5pt;color:#14213d;text-align:center;line-height:1.25">' + esc(it[0]) + '</div>'
          : '<div style="height:18mm;border:2px dashed #b9c6d6;border-radius:2mm"></div>') +
        '</div>';
    }).join('');
    return page('Support', t.titre, 'à coller', consigne(['Découpe les étiquettes.', 'Colle le mot sous l\'image.'], ['ciseaux', 'colle'], t.modele ? 'La première est faite. C\'est le modèle.' : '') +
      '<div style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:min-content;align-content:start;gap:6mm 8mm">' + cases + '</div>', '#8a4b1e');
  }

  // ---- écrire le mot sous l'image (paginé selon l'interligne)
  function ficheEcrire(t, items) {
    var b = bande(t.interligne);
    var blocs = items.map(function (it) {
      return '<div style="display:flex;flex-direction:column;gap:2.5mm">' +
        '<div style="display:flex;align-items:center;gap:5mm">' +
        '<span style="flex:0 0 30mm;height:23mm;border:1.5px solid #14213d;border-radius:2mm;background-image:url(\'' + img(it[1]) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;background-origin:content-box;padding:1.5mm;display:block"></span>' +
        '<span style="flex:1;min-width:0;font-family:BA Script, ' + POLICE + ';font-size:19pt;color:#8a91a3;line-height:1.2">' + esc(it[0]) + '</span>' +
        '</div>' + b + '</div>';
    }).join('');
    return page('Écrire', t.titre, 'écrire', consigne(['Regarde l\'image.', 'Écris le mot sur les lignes.'], ['oeil', 'crayon']) +
      '<div style="flex:0 0 auto;display:flex;flex-direction:column;gap:6mm">' + blocs + '</div>', '#2a9d6e');
  }

  // ---- feuille de correction
  function ficheCorrection(t, items) {
    var lignes = items.map(function (it) {
      return '<div style="display:flex;align-items:center;gap:4mm;border:1.5px solid #dde2e9;border-radius:2mm;padding:2.5mm">' +
        '<span style="flex:0 0 26mm;height:22mm;background-image:url(\'' + img(it[1]) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;display:block"></span>' +
        '<span style="flex:1;min-width:0;font-size:11.5pt;color:#14213d;line-height:1.3">' + esc(it[0]) + '</span>' +
        '</div>';
    }).join('');
    return page('Correction', t.titre + ' — je vérifie tout seul', 'correction',
      '<div style="flex:0 0 auto;display:flex;align-items:center;gap:5mm;background:#e8f7ef;border:1.5px solid #b6e2cd;border-radius:2mm;padding:3mm 4mm;margin:5mm 0 5mm">' +
      '<span style="flex:0 0 auto;width:11mm;height:11mm;background-image:url(\'clean/icone-oeil.svg\');background-size:contain;background-repeat:no-repeat;background-position:center;display:block"></span>' +
      '<span style="flex:1;min-width:0;font-size:12pt;font-weight:700;color:#14213d;line-height:1.45">Regarde ta feuille.<br />Regarde cette feuille.<br />C\'est pareil ? Bravo !</span>' +
      '<span style="flex:0 0 auto;font-size:20pt;color:#2a9d6e;line-height:1">&#10004;</span></div>' +
      '<div style="flex:0 0 auto;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:min-content;align-content:start;gap:5mm 8mm">' + lignes + '</div>', '#2a9d6e');
  }

  // nombre d'items par page ; pour « écrire », dépend de l'interligne
  // ---- cartes de révision : flashcards recto-verso
  function carteCadre(contenu) {
    return '<div style="border:1.8px dashed #14213d;border-radius:2mm;display:flex;align-items:center;justify-content:center;padding:3mm;overflow:hidden">' + contenu + '</div>';
  }
  function ficheCartes(t, items, no, sur) {
    var n = Math.min(6, items.length);
    var rangs = n <= 2 ? 1 : (n <= 4 ? 2 : 3);
    var lignes = [];
    for (var i = 0; i < items.length; i += 2) {
      var l = items.slice(i, i + 2);
      if (l.length === 1) l.push(null); // case vide, pour que le verso tombe en face
      lignes.push(l);
    }
    var vide = '<div></div>';
    var recto = lignes.map(function (l) {
      return l.map(function (it) {
        return it ? carteCadre('<span style="width:100%;height:100%;min-height:30mm;background-image:url(\'' + img(it[1]) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;display:block"></span>') : vide;
      }).join('');
    }).join('');
    // verso : colonnes inversées pour tomber en face au recto-verso
    var verso = lignes.map(function (l) {
      return l.slice().reverse().map(function (it) {
        return it ? carteCadre('<span style="font-size:15pt;color:#14213d;text-align:center;line-height:1.3">' + esc(it[0]) + '</span>') : vide;
      }).join('');
    }).join('');

    var grille = function (cells) {
      return '<div style="flex:1;min-height:0;display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(' + rangs + ',1fr);gap:4mm">' + cells + '</div>';
    };
    return [
      { s: 'recto', html: page('Flashcards recto', t.titre, 'cartes — recto',
          consigne(['Imprime en recto-verso.', 'Retourne sur le grand côté.'], ['ciseaux'],
            'Puis découpe : image devant, mot derrière. Si les mots ne tombent pas en face, change le côté de retournement dans les réglages de l\'imprimante.') + grille(recto), '#6d5bd0') },
      { s: 'verso', html: page('Flashcards verso', t.titre, 'cartes — verso',
          '<div style="flex:0 0 auto;padding:5mm 0 5mm;font-size:11pt;color:#6b7386">Verso des cartes. Ne pas découper avant d\'avoir imprimé les deux faces.</div>' +
          grille(verso), '#6d5bd0') }
    ];
  }

  // ---- imagier de référence
  function ficheImagier(t, items) {
    var cases = items.map(function (it) {
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:1.5mm;border:1px solid #dde2e9;border-radius:2mm;padding:2mm">' +
        '<span style="width:100%;height:22mm;background-image:url(\'' + img(it[1]) + '\');background-size:contain;background-repeat:no-repeat;background-position:center;display:block"></span>' +
        '<span style="font-size:10.5pt;color:#14213d;text-align:center;line-height:1.2">' + esc(it[0]) + '</span>' +
        '</div>';
    }).join('');
    return page('Imagier', t.titre, 'imagier',
      '<div style="flex:0 0 auto;padding:5mm 0 5mm;font-size:11pt;color:#6b7386">Les mots du thème, à coller dans le cahier ou à afficher.</div>' +
      '<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:min-content;align-content:start;gap:5mm">' + cases + '</div>', '#6d5bd0');
  }

  // ---- loto : les planches de jeu (bandeau déchiré + grille 3x2)
  function bandeau(titre, couleur) {
    return '<div style="flex:0 0 auto"><svg viewBox="0 0 1000 160" preserveAspectRatio="none" style="width:100%;height:18mm;display:block">' +
      '<polygon points="0,0 1000,0 1000,112 860,150 700,104 540,152 380,110 200,150 60,112 0,138" fill="' + couleur + '"></polygon>' +
      '<path d="M0 138L60 112L200 150L380 110L540 152L700 104L860 150L1000 112" fill="none" stroke="#1a1a1a" stroke-width="7" stroke-dasharray="26 18" stroke-linecap="round"></path>' +
      '<text x="500" y="76" text-anchor="middle" font-family="Caveat, cursive" font-size="74" fill="#fff" stroke="rgba(0,0,0,0.22)" stroke-width="3" paint-order="stroke">' + esc(titre) + '</text>' +
      '</svg></div>';
  }
  function ficheLotoPlanche(t, items, no, sur) {
    var cells = items.slice(0, 6).map(function (it, i) {
      var bord = (i % 3 ? 'border-left:1.5px solid #14213d;' : '') + (i > 2 ? 'border-top:1.5px solid #14213d;' : '');
      return '<div style="' + bord + 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1mm;padding:2mm;overflow:hidden;box-sizing:border-box">' +
        '<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden"><img src="' + img(it[1]) + '" alt="" style="max-width:100%;max-height:100%;object-fit:contain;display:block" /></div>' +
        '<span style="flex:0 0 auto;font-size:13pt;color:#1a1a1a;line-height:1.1;text-align:center">' + esc(it[0]) + '</span>' +
        '</div>';
    }).join('');
    return '<section class="page" data-screen-label="Loto planche ' + no + '" style="position:relative;display:flex;flex-direction:column;gap:5mm;background:#fff;overflow:hidden;padding:12mm 14mm 14mm;box-sizing:border-box;font-family:' + POLICE + '">' +
      '<div style="flex:1;min-height:0;display:flex;flex-direction:column;border:2px solid #14213d;border-radius:1.5mm;overflow:hidden;background:#fff">' +
      bandeau('Le loto ' + t.deTitre, t.couleurLoto) +
      '<div style="flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr)">' + cells + '</div>' +
      '</div>' +
      '<div style="position:absolute;bottom:5mm;right:14mm;width:9mm;height:9mm;border-radius:50%;background:#e6e6e6;display:flex;align-items:center;justify-content:center;font-size:10.5pt;font-weight:700;color:#14213d">' + no + '</div>' +
      '</section>';
  }

  // ---- loto : les cartes-images à découper
  function ficheLotoCartes(t, items, no, sur) {
    var n = Math.min(6, items.length);
    var rangs = n <= 2 ? 1 : (n <= 4 ? 2 : 3);
    var cols = n === 1 ? 1 : 2;
    var cartes = items.slice(0, 6).map(function (it) {
      return '<div style="border:1.8px dashed #14213d;border-radius:2mm;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2mm;padding:3mm;overflow:hidden">' +
        '<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden"><img src="' + img(it[1]) + '" alt="" style="max-width:100%;max-height:100%;object-fit:contain;display:block" /></div>' +
        '<span style="flex:0 0 auto;font-size:13pt;color:#14213d;line-height:1.15;text-align:center">' + esc(it[0]) + '</span>' +
        '</div>';
    }).join('');
    return '<section class="page" data-screen-label="Loto cartes ' + no + '" style="position:relative;display:flex;flex-direction:column;background:#fff;overflow:hidden;padding:13mm 14mm 14mm;box-sizing:border-box;font-family:' + POLICE + '">' +
      '<div style="flex:0 0 auto;display:flex;align-items:baseline;gap:5mm;padding-bottom:3mm;border-bottom:2.5px solid #1d4e89;margin-bottom:4mm">' +
      '<span style="font-size:20pt;font-weight:700;color:#14213d;line-height:1.1">Loto ' + esc(t.deTitre) + '</span>' +
      '<span style="font-size:11pt;color:#1d4e89">cartes à découper ' + no + (sur > 1 ? ' / ' + sur : '') + ' &middot; une carte par case</span></div>' +
      '<div style="flex:1;min-height:0;display:grid;grid-template-columns:repeat(' + cols + ',1fr);grid-template-rows:repeat(' + rangs + ',1fr);gap:4mm">' + cartes + '</div>' +
      '</section>';
  }

  var PARPAGE = {
    relier: function () { return 6; },
    etiquettes: function () { return 8; },
    support: function () { return 6; },
    ecrire: function (i) { return i === 'grand' ? 3 : (i === 'petit' ? 5 : 4); },
    correction: function () { return 8; },
    cartes: function () { return 6; },
    imagier: function () { return 12; },
    lotoPlanche: function () { return 6; },
    lotoCartes: function () { return 6; }
  };
  var TYPES = [
    ['relier', 'Relier l\'image et le mot', ficheRelier, 'eleve'],
    ['ecrire', 'Écrire le mot', ficheEcrire, 'eleve'],
    ['support', 'Feuille support à coller', ficheSupport, 'eleve'],
    ['correction', 'Feuille de correction', ficheCorrection, 'eleve'],
    ['lotoPlanche', 'Loto — la planche', ficheLotoPlanche, 'atelier'],
    ['lotoCartes', 'Loto — les cartes', ficheLotoCartes, 'atelier'],
    ['etiquettes', 'Étiquettes à découper', ficheEtiquettes, 'atelier'],
    ['cartes', 'Cartes de révision recto-verso', ficheCartes, 'atelier'],
    ['imagier', 'Imagier de référence', ficheImagier, 'atelier']
  ];
  var FAMILLES = [['eleve', "Pour l'élève"], ['atelier', 'Ateliers à manipuler'], ['lien', 'Jeux en ligne']];

  window.FICHES_THEMES = {
    types: TYPES.map(function (t) { return [t[0], t[1], t[3]]; }),
    familles: FAMILLES,
    slug: function (theme) { return String(theme || '').replace(/[^a-z0-9]/gi, ''); },
    // opts : {theme, items:[[texte,fichier]], types:{cle:true}, interligne, modele}
    build: function (opts) {
      var o = opts || {}, items = (o.items || []).filter(function (x) { return x && x[0] && x[1]; });
      if (!items.length) return [];
      var graine = 0; (o.theme || '').split('').forEach(function (c) { graine += c.charCodeAt(0); });
      var melangeSeed = function (l, s0) {
        var g = graine + (s0 || 0) * 7919;
        for (var i = l.length - 1; i > 0; i--) {
          g = (g * 9301 + 49297) % 233280;
          var j = Math.floor((g / 233280) * (i + 1));
          var t = l[i]; l[i] = l[j]; l[j] = t;
        }
        return l;
      };
      var melange = function (l) { return melangeSeed(l, 0); };
      var th = o.theme || 'Thème';
      var ctx = {
        titre: th, items: items, melange: melange,
        deTitre: /^(Le |Les |La |L')/i.test(th)
          ? th.replace(/^Le /i, 'du ').replace(/^Les /i, 'des ').replace(/^La /i, 'de la ').replace(/^L'/i, "de l'")
          : 'de ' + th,
        couleurLoto: '#d64541',
        interligne: o.interligne || 'moyen', modele: o.modele !== false
      };
      var pages = [], cle = (o.theme || '').replace(/[^a-z0-9]/gi, '');
      TYPES.forEach(function (t) {
        if (!(o.types || {})[t[0]]) return;
        if (t[0] === 'lotoPlanche' || t[0] === 'lotoCartes') {
          // un loto jouable : chaque case d'une planche a sa carte
          if (items.length < 6) return;
          var nbPl = Math.max(1, Math.min(10, o.planches || 4));
          var lots2 = [];
          for (var g = 0; g < nbPl; g++) {
            lots2.push(melangeSeed(items.slice(), g + 1).slice(0, 6));
          }
          if (t[0] === 'lotoPlanche') {
            lots2.forEach(function (lot, k) {
              pages.push({
                id: 'gen-' + cle + '-lotoPlanche-' + ctx.interligne + '-' + (o.niveau || 'mots') + '-' + k,
                coll: 'fabrique', nom: o.theme + ' — Loto, planche ' + (k + 1) + ' / ' + nbPl,
                html: ficheLotoPlanche(ctx, lot, k + 1, nbPl)
              });
            });
          } else {
            // le paquet est tiré des planches : autant de cartes que de cases
            var paquet = [];
            lots2.forEach(function (lot) { paquet = paquet.concat(lot); });
            var nbCartes = Math.ceil(paquet.length / 6);
            for (var q = 0; q < nbCartes; q++) {
              pages.push({
                id: 'gen-' + cle + '-lotoCartes-' + ctx.interligne + '-' + (o.niveau || 'mots') + '-' + q,
                coll: 'fabrique',
                nom: o.theme + ' — Loto, cartes ' + (q + 1) + ' / ' + nbCartes,
                html: ficheLotoCartes(ctx, paquet.slice(q * 6, q * 6 + 6), q + 1, nbCartes)
              });
            }
          }
          return;
        }
        var maxi = PARPAGE[t[0]](ctx.interligne);
        // pages équilibrées : 9 items sur 2 pages donnent 5 et 4, pas 6 et 3
        var nbPages = Math.max(1, Math.ceil(items.length / maxi));
        var base = Math.floor(items.length / nbPages), reste = items.length % nbPages;
        var lots = [], d = 0;
        for (var k = 0; k < nbPages; k++) {
          var taille = base + (k < reste ? 1 : 0);
          lots.push(items.slice(d, d + taille));
          d += taille;
        }
        var idx = 0;
        lots.forEach(function (lot, k) {
          var out = t[2](ctx, lot, k + 1, lots.length);
          if (!Array.isArray(out)) out = [{ s: '', html: out }];
          out.forEach(function (face) {
            pages.push({
              id: 'gen-' + cle + '-' + t[0] + '-' + ctx.interligne + '-' + (o.niveau || 'mots') + '-' + idx,
              coll: 'fabrique',
              nom: o.theme + ' — ' + t[1] + (face.s ? ' ' + face.s : '') + (lots.length > 1 ? ' (' + (k + 1) + '/' + lots.length + ')' : ''),
              html: face.html
            });
            idx++;
          });
        });
      });
      return pages;
    }
  };
})();
