/* LE RANGEMENT DES PDF DÉPOSÉS

   Le PDF de la fiche EANA ne tient pas dans la mémoire ordinaire du navigateur
   (localStorage plafonne à quelques mégaoctets et n'accepte que du texte). Il est donc
   rangé dans IndexedDB, la réserve du navigateur prévue pour les fichiers.

   Règle de vie du fichier : il est gardé tant que le dossier existe — on revient
   souvent corriger une case et retélécharger la fiche. Il disparaît quand l'enseignante
   supprime le dossier, ou quand elle clique « Oublier le PDF » : rien ne s'accumule
   sans qu'elle l'ait voulu. */
(function () {
  const BASE = 'upe2a-fiches', MAGASIN = 'pdf';

  function ouvrir() {
    return new Promise((resoudre, rejeter) => {
      const d = indexedDB.open(BASE, 1);
      d.onupgradeneeded = () => { d.result.createObjectStore(MAGASIN); };
      d.onsuccess = () => resoudre(d.result);
      d.onerror = () => rejeter(d.error);
    });
  }

  function operation(mode, action) {
    return ouvrir().then(base => new Promise((resoudre, rejeter) => {
      const t = base.transaction(MAGASIN, mode);
      const r = action(t.objectStore(MAGASIN));
      t.oncomplete = () => { base.close(); resoudre(r && r.result); };
      t.onerror = () => { base.close(); rejeter(t.error); };
    }));
  }

  const ranger = (cle, octets) => operation('readwrite', m => m.put(octets, cle));
  const lire = (cle) => operation('readonly', m => m.get(cle));
  const effacer = (cle) => operation('readwrite', m => m.delete(cle));
  const cles = () => operation('readonly', m => m.getAllKeys());

  window.PDFS = { ranger, lire, effacer, cles };
})();
