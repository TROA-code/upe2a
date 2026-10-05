/**
 * ============================================================================
 * MODULE DRIVE-STORAGE (Prêt à l'emploi pour GitHub Pages)
 * ============================================================================
 * Ce module remplace localStorage en stockant automatiquement les données
 * dans un fichier JSON sur votre Google Drive via une Web App Google Apps Script.
 * 
 * UTILISATION DANS LE PROJET EXISTANT :
 * ----------------------------------------------------------------------------
 * 1. Inclure ce fichier dans votre index.html :
 *    <script src="driveStorage.js"></script>
 * 
 * 2. Renseigner votre URL d'API Google Apps Script ci-dessous.
 * 
 * 3. Remplacer dans votre code :
 *    - Ancien : const mesDonnees = JSON.parse(localStorage.getItem("mes_donnees")) || [];
 *    - Nouveau : const mesDonnees = await DriveStorage.load();
 * 
 *    - Ancien : localStorage.setItem("mes_donnees", JSON.stringify(mesDonnees));
 *    - Nouveau : await DriveStorage.save(mesDonnees);
 * ============================================================================
 */

const DriveStorage = {
  // URL de déploiement Google Apps Script validée et testée
  API_URL: "https://script.google.com/macros/s/AKfycbyY_BItgYNHNEdjvC640obZtsZMovl6hJI_ivRUInoGo6GxGctAwnChIfRh7rLQIt_r/exec",

  // Nom du fichier JSON qui sera créé/mis à jour dans votre Google Drive
  FILE_NAME: "mes_donnees.json",

  // Clé utilisée pour le cache de secours dans le navigateur (offline)
  CACHE_KEY: "app_cache_drive_data",

  /**
   * Charge les données depuis Google Drive.
   * Si le réseau est indisponible ou hors-ligne, bascule sur le cache local.
   * @returns {Promise<Array|Object>} Données récupérées
   */
  async load() {
    if (this.API_URL && !this.API_URL.includes("VOTRE_ID_DE_DEPLOIEMENT")) {
      try {
        const timestamp = Date.now();
        const response = await fetch(`${this.API_URL}?action=read&file=${encodeURIComponent(this.FILE_NAME)}&t=${timestamp}`, {
          method: "GET",
          headers: { "Accept": "application/json" }
        });

        if (response.ok) {
          const res = await response.json();
          if (res.status === "success" && res.data !== undefined) {
            // Mise à jour du cache local
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(res.data));
            return res.data;
          }
        }
      } catch (err) {
        console.warn("[DriveStorage] Impossible de joindre Google Drive, utilisation du cache local :", err);
      }
    }

    // Repli sur le cache local (localStorage)
    const cached = localStorage.getItem(this.CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  },

  /**
   * Enregistre les données localement et les synchronise avec Google Drive.
   * @param {Array|Object} data - Les données complètes à sauvegarder
   * @returns {Promise<boolean>} Succès de l'enregistrement
   */
  async save(data) {
    // 1. Sauvegarde locale immédiate (zéro perte de données)
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));

    // 2. Envoi vers Google Drive
    if (!this.API_URL || this.API_URL.includes("VOTRE_ID_DE_DEPLOIEMENT")) {
      console.warn("[DriveStorage] URL d'API non configurée. Données sauvegardées en local uniquement.");
      return false;
    }

    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        // Utilisation de text/plain pour éviter les blocages CORS preflight (requêtes OPTIONS)
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "write",
          fileName: this.FILE_NAME,
          data: data
        })
      });

      const res = await response.json();
      return res.status === "success";
    } catch (err) {
      console.error("[DriveStorage] Erreur lors de l'envoi vers Google Drive :", err);
      return false;
    }
  }
};
