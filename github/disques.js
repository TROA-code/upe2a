// Disques à scratcher sur les faces des gros dés (face de 8,6 cm).
// Un seul générateur, appelé par l'écran « Outils de manipulation » de l'appli.
// Une page = un dé = 6 disques. Diamètre réglable, trait de coupe noir continu.
(function () {
  var POLICE = 'Verdana, Tahoma, sans-serif';
  function esc(t) {
    return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function img(fichier) {
    var f = String(fichier || '');
    if (/^(data:|https?:|clean\/)/.test(f)) return f;
    return 'clean/' + (/^(geste|phrase|son)-/.test(f) ? f : 'mot-' + f) + '.png';
  }

  // un disque : trait de coupe + contenu centré, jamais rogné
  function disque(d, contenu) {
    return '<div style="flex:0 0 auto;width:' + d + 'mm;height:' + d + 'mm;border:1.2px solid #14213d;border-radius:50%;' +
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:' + (d * 0.03).toFixed(1) + 'mm;' +
      'padding:' + (d * 0.1).toFixed(1) + 'mm;box-sizing:border-box;text-align:center;overflow:hidden">' + contenu + '</div>';
  }

  // taille calculée : le mot le plus long doit tenir dans le disque, sur 1 à 3 lignes
  function tailleMot(texte, d) {
    var mots = String(texte || '').trim().split(/\s+/), lmax = 1;
    mots.forEach(function (m) { lmax = Math.max(lmax, m.length); });
    var lignes = mots.length <= 1 ? 1 : (mots.length <= 2 ? 2 : 3);
    var largeur = d * 0.78, mm = Math.min(largeur / (0.66 * lmax), (d * 0.62) / (1.25 * lignes));
    return Math.max(9, Math.min(28, mm / 0.3528));
  }
  function contenuMot(it, d) {
    var haut = String(it.haut || ''), bas = String(it.bas || '');
    var taille = tailleMot(haut, d);
    return '<span style="font-size:' + taille.toFixed(1) + 'pt;font-weight:700;color:#14213d;line-height:1.05;letter-spacing:0.01em">' + esc(haut) + '</span>' +
      (bas ? '<span style="font-size:' + (taille * 0.62).toFixed(1) + 'pt;color:#4a5468;line-height:1.15">' + esc(bas) + '</span>' : '');
  }
  function contenuImage(it, d) {
    var lg = it.haut ? d * 0.62 : d * 0.76;
    return '<span style="flex:0 0 auto;width:' + lg.toFixed(1) + 'mm;height:' + lg.toFixed(1) + 'mm;display:block;' +
      'background-image:url(\'' + img(it.image) + '\');background-size:contain;background-repeat:no-repeat;background-position:center"></span>' +
      (it.haut ? '<span style="font-size:' + Math.max(10, d * 0.13).toFixed(1) + 'pt;font-weight:700;color:#14213d;line-height:1.1">' + esc(it.haut) + '</span>' : '');
  }
  function contenuSon(it, d) {
    var encre = it.encre || '#14213d';
    return '<span style="font-size:' + (d * 1.6).toFixed(1) + 'pt;font-weight:400;color:' + encre + ';line-height:0.85">' + esc(it.haut) + '</span>' +
      (it.bas ? '<span style="font-size:' + (d * 0.15).toFixed(1) + 'pt;color:' + encre + ';line-height:1.1">' + esc(it.bas) + '</span>' : '');
  }
  var CONTENU = { mot: contenuMot, image: contenuImage, son: contenuSon };

  // o : {titre, sousTitre, couleur, diametre, forme:'mot'|'image'|'son', items:[{haut,bas,image}], no, sur, note}
  function planche(o) {
    var d = Math.max(40, Math.min(90, o.diametre || 81));
    var f = CONTENU[o.forme] || contenuMot;
    var items = (o.items || []).slice(0, 6);
    var cases = items.map(function (it) { return disque(d, f(it, d)); }).join('');
    var vides = '';
    for (var i = items.length; i < 6; i++) {
      vides += disque(d, '<span style="font-size:' + Math.max(9, d * 0.1).toFixed(1) + 'pt;color:#9aa4b2">à dessiner</span>');
    }
    var no = o.no || 1, sur = o.sur || 1, c = o.couleur || '#1d4e89';
    // en-tête tenu au plus court : deux lignes, pour que les six disques tiennent sur la page
    return '<section class="page" data-screen-label="' + esc('Dés ' + no) + '" style="position:relative;display:flex;flex-direction:column;background:#fff;overflow:hidden;padding:6mm 7mm 5mm;box-sizing:border-box;font-family:' + POLICE + '">' +
      '<div style="flex:0 0 auto;display:flex;align-items:baseline;gap:4mm;padding-bottom:1.8mm;border-bottom:2px solid ' + c + '">' +
      '<span style="font-size:13pt;font-weight:700;color:#14213d;line-height:1.05">' + esc(o.titre || 'Les dés') + '</span>' +
      '<span style="flex:1;min-width:0"></span>' +
      '</div>' +
      (o.question ? '<div style="flex:0 0 auto;font-size:12pt;font-weight:700;color:#14213d;line-height:1.25;padding:2mm 0 0">' + esc(o.question) + '</div>' : '') +
      '<div style="flex:1;min-height:0;display:flex;flex-wrap:wrap;align-content:flex-start;justify-content:center;gap:8mm;padding-top:3mm">' + cases + vides + '</div>' +
      '</section>';
  }

  window.DISQUES = { planche: planche, parPage: 6 };
})();
