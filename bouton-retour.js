/* 11/10 (sa demande, « aucun écran ne doit être un cul-de-sac ») : bouton « ← L'accueil » commun,
   chargé dans le <helmet> des documents qui n'en avaient pas. Fixé en haut à DROITE (à gauche il
   recouvre la colonne de vignettes des diaporamas), effacé à l'impression, history.back() avec repli
   sur l'Espace enseignant en gardant location.search. Ne s'ajoute pas si la page est dans un cadre
   qui a déjà sa barre, ni deux fois. */
(function () {
  if (window.__boutonRetour) return; window.__boutonRetour = true;
  /* Un document importé DANS l'Espace enseignant ou l'accueil élève ne pose pas de bouton : ces pages ont leur barre. */
  var chemin = decodeURIComponent(location.pathname);
  if (/Espace enseignant|Accueil|index\.html$|\/$/.test(chemin)) return;
  function poser() {
    if (document.getElementById('bouton-retour-commun')) return;
    var st = document.createElement('style');
    st.textContent = '@media print{#bouton-retour-commun{display:none !important}}';
    document.head.appendChild(st);
    var b = document.createElement('button');
    b.id = 'bouton-retour-commun'; b.type = 'button'; b.className = 'bouton';
    b.textContent = '\u2190 L\u2019accueil';
    b.setAttribute('style', 'position:fixed;top:12px;right:12px;z-index:2147483000;min-height:44px;border:none;border-radius:10px;background:#12233b;color:#fff;padding:0 16px;font:700 15px Arial, Helvetica, sans-serif;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25)');
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var av = location.href; history.back();
      setTimeout(function () { if (location.href === av) location.href = 'APPLI - Espace enseignant.dc.html' + location.search; }, 400);
    });
    document.body.appendChild(b);
  }
  if (document.body) poser(); else document.addEventListener('DOMContentLoaded', poser);
})();
