# PROMPT À DONNER AU LLM (ChatGPT, Claude, Cursor, etc.)

> **Instructions pour ton amie :**
> Copie-colle l'intégralité du texte ci-dessous dans ton LLM préféré en lui partageant le code actuel de ton projet (ton fichier JS ou HTML). Il adaptera automatiquement ton code pour synchroniser tes données avec Google Drive au lieu de `localStorage`.

---

```markdown
Bonjour ! J'ai un projet web statique hébergé sur GitHub Pages qui utilise actuellement le `localStorage` du navigateur pour enregistrer, modifier et supprimer des données (CRUD).

Je souhaite migrer mon stockage vers un fichier JSON hébergé dans un dossier de mon **Google Drive** personnel, tout en gardant `localStorage` comme cache/secours si l'utilisateur est hors-ligne.

Voici l'architecture que je souhaite utiliser (sans backend Node/Python et sans authentification complexe pour les visiteurs) :
Une Web App **Google Apps Script** gratuite qui fait office de mini-API REST pour lire et écrire dans mon Google Drive.

---

### 1. Voici le script Google Apps Script (Code.gs) que j'utilise côté Google :

```javascript
const GOOGLE_DRIVE_FOLDER_ID = "VOTRE_ID_DE_DOSSIER_GOOGLE_DRIVE"; // ou "" pour le dossier par défaut

function doGet(e) {
  try {
    const fileName = (e && e.parameter && e.parameter.file) ? e.parameter.file : "data.json";
    const folder = getFolder();
    const files = folder.getFilesByName(fileName);
    if (files.hasNext()) {
      const content = files.next().getBlob().getDataAsString("UTF-8");
      return ContentService.createTextOutput(JSON.stringify({ status: "success", data: JSON.parse(content) }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "not_found", data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const fileName = payload.fileName || "data.json";
    const folder = getFolder();
    const files = folder.getFilesByName(fileName);
    const content = JSON.stringify(payload.data, null, 2);
    
    if (files.hasNext()) {
      files.next().setContent(content);
    } else {
      folder.createFile(fileName, content, MimeType.PLAIN_TEXT);
    }
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getFolder() {
  if (GOOGLE_DRIVE_FOLDER_ID) return DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
  const name = "MonApp_DriveStorage";
  const f = DriveApp.getFoldersByName(name);
  return f.hasNext() ? f.next() : DriveApp.createFolder(name);
}
```

---

### 2. Voici le module JavaScript autonome à intégrer dans mon projet :

```javascript
const DriveStorage = {
  API_URL: "https://script.google.com/macros/s/AKfycbyY_BItgYNHNEdjvC640obZtsZMovl6hJI_ivRUInoGo6GxGctAwnChIfRh7rLQIt_r/exec",
  FILE_NAME: "data.json",
  LOCAL_KEY: "mon_app_cache_local",

  // Récupérer les données (Drive avec fallback LocalStorage)
  async load() {
    try {
      const res = await fetch(`${this.API_URL}?action=read&file=${this.FILE_NAME}&t=${Date.now()}`);
      const json = await res.json();
      if (json.status === "success" && json.data) {
        localStorage.setItem(this.LOCAL_KEY, JSON.stringify(json.data));
        return json.data;
      }
    } catch (e) {
      console.warn("Mode hors-ligne ou erreur Drive, lecture depuis localStorage :", e);
    }
    const cached = localStorage.getItem(this.LOCAL_KEY);
    return cached ? JSON.parse(cached) : [];
  },

  // Sauvegarder les données (sauvegarde locale immédiate + envoi vers Drive)
  async save(data) {
    localStorage.setItem(this.LOCAL_KEY, JSON.stringify(data));
    try {
      await fetch(this.API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // text/plain évite les erreurs CORS preflight
        body: JSON.stringify({ fileName: this.FILE_NAME, data: data })
      });
      return true;
    } catch (e) {
      console.error("Erreur lors de la sauvegarde sur Google Drive :", e);
      return false;
    }
  }
};
```

---

### 3. Ma demande pour toi :

Voici mon code JavaScript / HTML actuel :
```javascript
// [COLLE ICI LE CODE ACTUEL DE TON PROJET QUI UTILISE LOCALSTORAGE]
```

Peux-tu adapter mon code pour :
1. Remplacer les lectures `localStorage.getItem(...)` par `await DriveStorage.load()` au chargement de la page.
2. Remplacer les écritures `localStorage.setItem(...)` par `await DriveStorage.save(...)` lors des créations, modifications et suppressions.
3. Afficher si possible un petit indicateur visuel (ex: "Enregistrement sur Drive...", "Synchronisé", ou notification).
4. Me donner les étapes exactes de modification dans mes fichiers avec les explications claires.
```
