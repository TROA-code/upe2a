/**
 * ============================================================================
 * DRIVEDESK - BACKEND GOOGLE APPS SCRIPT
 * ============================================================================
 * Ce script sert de passerelle (API REST sans serveur) entre votre site web
 * (sur clé USB ou hébergé) et votre dossier Google Drive.
 * 
 * GUIDE DE DÉPLOIEMENT RAPIDE EN 3 MINUTES :
 * ----------------------------------------------------------------------------
 * 1. Ouvrez votre Google Drive (https://drive.google.com).
 * 2. Créez un dossier où stocker vos données (ex: "MesDonneesDriveDesk").
 * 3. Ouvrez ce dossier et copiez son ID dans la barre d'adresse de votre navigateur :
 *    Exemple d'URL : drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ
 *    L'ID est la partie après "/folders/" -> 1aBcDeFgHiJkLmNoPqRsTuVwXyZ
 * 4. Rendez-vous sur https://script.google.com et cliquez sur "Nouveau projet".
 * 5. Remplacez tout le contenu par le code de ce fichier.
 * 6. Collez l'ID de votre dossier dans la variable GOOGLE_DRIVE_FOLDER_ID ci-dessous.
 * 7. Cliquez sur "Déployer" (en haut à droite) > "Nouveau déploiement".
 * 8. Cliquez sur la roue dentée (Sélectionner le type) > Choisissez "Application Web".
 * 9. Configurez les options :
 *      - Description : API DriveDesk
 *      - Exécuter en tant que : "Moi (votre adresse email)"
 *      - Qui a accès : "Tout le monde" (indispensable pour l'accès depuis la clé USB)
 * 10. Cliquez sur "Déployer", autorisez les accès à votre compte Google Drive.
 * 11. Copiez l'"URL de l'application Web" (ex: https://script.google.com/macros/s/.../exec).
 * 12. Collez cette URL dans les Paramètres (roue dentée) de votre site web DriveDesk !
 * ============================================================================
 */

// >>> INDIQUEZ ICI L'ID DE VOTRE DOSSIER GOOGLE DRIVE <<<
// Si vous laissez vide (""), le script créera automatiquement un dossier "DriveDesk_Storage" à la racine de votre Drive.
const GOOGLE_DRIVE_FOLDER_ID = ""; 

/**
 * Récupère le dossier Drive configuré ou crée automatiquement un dossier par défaut.
 */
function getTargetFolder() {
  if (GOOGLE_DRIVE_FOLDER_ID && GOOGLE_DRIVE_FOLDER_ID.trim() !== "") {
    try {
      return DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID.trim());
    } catch (err) {
      Logger.log("ID de dossier invalide, fallback vers dossier par défaut : " + err);
    }
  }
  
  // Si aucun ID spécifié, rechercher ou créer le dossier "DriveDesk_Storage"
  const folderName = "DriveDesk_Storage";
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

/**
 * Gestion des requêtes GET (Lecture des données depuis le Drive)
 */
function doGet(e) {
  try {
    const fileName = (e && e.parameter && e.parameter.file) ? e.parameter.file : "drivedesk_data.json";
    const folder = getTargetFolder();
    const files = folder.getFilesByName(fileName);

    if (files.hasNext()) {
      const file = files.next();
      const rawContent = file.getBlob().getDataAsString("UTF-8");
      let parsedData;
      try {
        parsedData = JSON.parse(rawContent);
      } catch (err) {
        parsedData = rawContent;
      }

      return jsonResponse({
        status: "success",
        fileName: fileName,
        lastUpdated: file.getLastUpdated(),
        data: parsedData
      });
    } else {
      return jsonResponse({
        status: "not_found",
        message: "Fichier non trouvé dans le dossier Google Drive",
        fileName: fileName
      });
    }
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * Gestion des requêtes POST (Création ou mise à jour de fichiers sur le Drive)
 */
function doPost(e) {
  try {
    let payload;
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      throw new Error("Aucune donnée reçue dans le corps de la requête");
    }

    const fileName = payload.fileName || "drivedesk_data.json";
    const dataToSave = payload.data !== undefined ? payload.data : [];
    const contentString = typeof dataToSave === "string" ? dataToSave : JSON.stringify(dataToSave, null, 2);

    const folder = getTargetFolder();
    const files = folder.getFilesByName(fileName);

    let targetFile;
    if (files.hasNext()) {
      targetFile = files.next();
      targetFile.setContent(contentString);
    } else {
      targetFile = folder.createFile(fileName, contentString, MimeType.PLAIN_TEXT);
    }

    return jsonResponse({
      status: "success",
      message: "Données sauvegardées avec succès dans Google Drive",
      fileName: fileName,
      lastUpdated: targetFile.getLastUpdated(),
      count: Array.isArray(dataToSave) ? dataToSave.length : 1
    });

  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * Helper pour formater les réponses en JSON avec en-têtes adaptés
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
