/* 11/10 (sa demande, « aucun écran ne doit être un cul-de-sac ») : barre commune chargée dans le <helmet>
   des documents. Fixée en haut à DROITE (à gauche elle recouvre la colonne de vignettes des diaporamas),
   effacée à l'impression. Ne s'ajoute pas dans l'Espace enseignant ni l'accueil, ni deux fois.
   12/10 : « je veux un bouton retour et accueil. Les deux !!! » + Imprimer.
   - « ← Retour » : history.back(), repli sur l'Espace enseignant en gardant location.search.
   - « Accueil » : toujours l'Espace enseignant, location.search conservé. */
(function () {
  if (window.__boutonRetour) return; window.__boutonRetour = true;
  var chemin = decodeURIComponent(location.pathname);
  if (/Espace enseignant|Accueil|index\.html$|\/$/.test(chemin)) return;
  var ACCUEIL = 'APPLI - Espace enseignant.dc.html';
  function bouton(id, texte, fond, ombre, action) {
    var b = document.createElement('button');
    b.id = id; b.type = 'button'; b.className = 'bouton'; b.textContent = texte;
    b.setAttribute('style', 'min-height:44px;white-space:nowrap;border:none;border-radius:10px;background:' + fond + ';color:#fff;padding:0 16px;font:700 15px Arial, Helvetica, sans-serif;cursor:pointer;box-shadow:' + ombre);
    b.addEventListener('click', function (e) { e.stopPropagation(); action(); });
    return b;
  }
  function poser() {
    if (document.getElementById('bouton-retour-commun')) return;
    var st = document.createElement('style');
    st.textContent = '@media print{#barre-commune{display:none !important}}';
    document.head.appendChild(st);
    var barre = document.createElement('div');
    barre.id = 'barre-commune';
    barre.setAttribute('style', 'position:fixed;top:12px;right:12px;z-index:2147483000;display:flex;gap:10px;align-items:center');
    barre.appendChild(bouton('bouton-imprimer-commun', 'Imprimer', '#2a9d6e', '0 2px 0 #217d57,0 2px 8px rgba(0,0,0,.2)', function () { window.print(); }));
    barre.appendChild(bouton('bouton-retour-commun', '\u2190 Retour', '#1d4e89', '0 2px 8px rgba(0,0,0,.25)', function () {
      var av = location.href; history.back();
      setTimeout(function () { if (location.href === av) location.href = ACCUEIL + location.search; }, 400);
    }));
    barre.appendChild(bouton('bouton-accueil-commun', 'Accueil', '#12233b', '0 2px 8px rgba(0,0,0,.25)', function () { location.href = ACCUEIL + location.search; }));
    document.body.appendChild(barre);
  }
  if (document.body) poser(); else document.addEventListener('DOMContentLoaded', poser);
})();
