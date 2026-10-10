# DriveDesk - Guide Complet & Instructions Détaillées
### Application Web CRUD & Synchronisation Google Drive (Portable Clé USB)

**DriveDesk** est une solution complète, autonome et portable permettant de gérer des données en CRUD (Créer, Lire, Mettre à jour, Supprimer) directement stockées sous forme de fichier JSON dans un dossier de votre **Google Drive**, sans aucun serveur à installer.

---

## 📑 Sommaire
1. [Fonctionnement & Architecture](#1-fonctionnement--architecture)
2. [Structure des fichiers du projet](#2-structure-des-fichiers-du-projet)
3. [Tutoriel pas-à-pas : Configuration Google Drive & Google Apps Script](#3-tutoriel-pas-à-pas--configuration-google-drive--google-apps-script)
4. [Code source complet du backend Google Apps Script (`Code.gs`)](#4-code-source-complet-du-backend-google-apps-script-codegs)
5. [Installation et utilisation sur Clé USB](#5-installation-et-utilisation-sur-clé-usb)
6. [Guide d'utilisation de l'interface](#6-guide-dutilisation-de-linterface)
7. [Structure des données & Personnalisation](#7-structure-des-données--personnalisation)
8. [Résolution des problèmes (FAQ & Dépannage)](#8-résolution-des-problèmes-faq--dépannage)

---

## 1. Fonctionnement & Architecture

### Pourquoi cette approche ?
* **Contrainte de la clé USB** : Lorsque vous ouvrez un fichier HTML directement depuis une clé USB, l'adresse commence par `file:///`. Les API d'authentification directes de Google (OAuth2) **interdisent** strictement ce protocole par mesure de sécurité.
* **La solution retenue (Google Apps Script en API relais)** :
  * Un script gratuit hébergé sur les serveurs Google (`Code.gs`) s'exécute avec les droits de votre compte Google Drive.
  * Il expose une URL d'API Web (`https://script.google.com/macros/s/.../exec`).
  * Votre page web HTML/JS sur la clé USB communique avec cette URL pour lire (`GET`) et enregistrer (`POST`) les données.
  * **Avantages** : zéro serveur local requis, fonctionne en double-cliquant sur le fichier HTML depuis n'importe quel ordinateur, fonctionne hors-ligne avec cache automatique, sauvegarde transparente sur votre Drive.

---

## 2. Structure des fichiers du projet

Pour que l'application fonctionne, conservez ces fichiers ensemble dans le même dossier :

```text
DriveDesk/
├── index.html       # Interface utilisateur (structure HTML5, modales, recherche, filtres)
├── style.css        # Système de design (thème sombre, responsive, animations, statuts)
├── app.js           # Logique applicative (CRUD, localStorage, synchronisation Drive, export/import)
├── Code.gs          # Script backend à copier sur Google Apps Script
└── README.md        # Le présent guide exhaustif
```

---

## 3. Tutoriel pas-à-pas : Configuration Google Drive & Google Apps Script

Cette configuration ne prend que **3 minutes** et ne doit être effectuée qu'**une seule fois**.

### Étape 3.1 : Créer le dossier sur Google Drive
1. Ouvrez votre navigateur et connectez-vous sur [Google Drive](https://drive.google.com).
2. Cliquez sur le bouton **+ Nouveau** (en haut à gauche) > **Nouveau dossier**.
3. Nommez le dossier comme vous le souhaitez (ex : `Mes_Donnees_DriveDesk`).
4. Ouvrez ce nouveau dossier en double-cliquant dessus.
5. Regardez la **barre d'adresse** de votre navigateur internet. L'URL ressemble à ceci :
   ```text
   https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ12345
   ```
6. **Copiez l'identifiant du dossier** : c'est la chaîne de caractères située après `/folders/` (dans l'exemple ci-dessus : `1aBcDeFgHiJkLmNoPqRsTuVwXyZ12345`).
   *(Note : Si vous ne renseignez aucun identifiant, le script créera automatiquement un dossier `DriveDesk_Storage` à la racine de votre Drive)*.

---

### Étape 3.2 : Créer le projet Google Apps Script
1. Ouvrez un nouvel onglet et rendez-vous sur [script.google.com](https://script.google.com).
2. Cliquez sur **Nouveau projet** (en haut à gauche).
3. Cliquez sur le titre en haut "Projet sans titre" et renommez-le `DriveDesk API`.
4. Dans la fenêtre de code centrale, **effacez tout le code existant** (`function myFunction() { ... }`).
5. Copiez et collez l'intégralité du code fourni dans la [Section 4 ci-dessous](#4-code-source-complet-du-backend-google-apps-script-codegs) ou dans le fichier [`Code.gs`](Code.gs).
6. À la ligne 29 de ce script, collez l'identifiant de votre dossier entre les guillemets :
   ```javascript
   const GOOGLE_DRIVE_FOLDER_ID = "1aBcDeFgHiJkLmNoPqRsTuVwXyZ12345";
   ```
7. Cliquez sur l'icône de **Disquette 💾 (Enregistrer le projet)** ou faites `Ctrl + S`.

---

### Étape 3.3 : Déployer en tant qu'Application Web
1. En haut à droite de Google Apps Script, cliquez sur le bouton bleu **Déployer** > **Nouveau déploiement**.
2. À gauche de la fenêtre qui s'ouvre, cliquez sur l'icône d'**Engrenage ⚙️** (Sélectionner le type) et choisissez **Application Web**.
3. Remplissez les champs comme suit :
   * **Description** : `DriveDesk v1`
   * **Exécuter en tant que** : `Moi (votre_adresse@gmail.com)` *(très important)*
   * **Qui a accès** : `Tout le monde` *(indispensable : cela permet à la clé USB de lire/écrire sans blocage d'origine)*
4. Cliquez sur le bouton bleu **Déployer**.

---

### Étape 3.4 : Autoriser l'accès Google (Écran de sécurité normal)
Puisque c'est un script personnel que vous venez de créer, Google affiche un avertissement de sécurité standard :
1. Une fenêtre contextuelle s'ouvre : cliquez sur **Autoriser l'accès**.
2. Choisissez votre compte Google.
3. Google affiche : *"Google n'a pas validé cette application"*. **C'est tout à fait normal** pour vos propres scripts personnels.
4. Cliquez sur le lien discret **Paramètres avancés** (en bas à gauche).
5. Cliquez sur **Accéder à DriveDesk API (non sécurisé)**.
6. Cliquez enfin sur le bouton bleu **Autoriser**.

---

### Étape 3.5 : Récupérer l'URL de l'application Web
1. Une boîte de dialogue finale s'affiche avec votre **URL de l'application Web**.
2. Elle ressemble à ceci :
   ```text
   https://script.google.com/macros/s/AKfycbx...ABCDEF123456/exec
   ```
3. Cliquez sur **Copier**. Conservez cette URL, c'est votre adresse d'API personnelle !

---

### Étape 3.6 : Lier votre site DriveDesk à l'API
1. Ouvrez le fichier [`index.html`](index.html) dans votre navigateur.
2. Cliquez sur l'icône de roue dentée ⚙️ en haut à droite (**Paramètres**).
3. Collez votre URL dans le champ **URL de déploiement Google Apps Script (Web App)**.
4. Cliquez sur le bouton **Tester la connexion**.
   * Un message vert apparaît : *"Connexion réussie avec Google Apps Script & Google Drive !"*.
5. Cliquez sur **Enregistrer la configuration**.

Votre site web est maintenant relié à votre dossier Google Drive !

---

## 4. Code source complet du backend Google Apps Script (`Code.gs`)

Copiez l'intégralité de ce code dans votre projet [Google Apps Script](https://script.google.com) :

```javascript
/**
 * ============================================================================
 * DRIVEDESK - BACKEND GOOGLE APPS SCRIPT
 * ============================================================================
 */

// >>> INDIQUEZ ICI L'ID DE VOTRE DOSSIER GOOGLE DRIVE <<<
// Laissez vide ("") pour créer automatiquement un dossier "DriveDesk_Storage".
const GOOGLE_DRIVE_FOLDER_ID = ""; 

/**
 * Récupère le dossier Drive configuré ou crée automatiquement un dossier par défaut.
 */
function getTargetFolder() {
  if (GOOGLE_DRIVE_FOLDER_ID && GOOGLE_DRIVE_FOLDER_ID.trim() !== "") {
    try {
      return DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID.trim());
    } catch (err) {
      Logger.log("ID de dossier invalide, repli vers dossier par défaut : " + err);
    }
  }
  
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
 * Helper pour formater les réponses JSON
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 5. Installation et utilisation sur Clé USB

### Préparation de la clé USB :
1. Branchez votre clé USB sur votre ordinateur.
2. Créez un dossier sur votre clé, par exemple : `DriveDesk/`.
3. Copiez l'ensemble des fichiers du projet à l'intérieur :
   * `index.html`
   * `style.css`
   * `app.js`
   * `README.md`
   * *(Le fichier `Code.gs` peut être conservé comme sauvegarde mais n'est pas requis sur la clé une fois déployé)*.

### Utilisation quotidienne sur n'importe quel ordinateur :
1. Insérez votre clé USB sur un PC Windows, un Mac ou un ordinateur Linux.
2. Ouvrez le dossier `DriveDesk/`.
3. **Double-cliquez sur `index.html`**.
4. Le navigateur par défaut s'ouvre avec l'interface.
5. Si l'ordinateur est connecté à Internet, l'application se connecte immédiatement à votre Google Drive et synchronise vos données.
6. Si l'ordinateur est **hors-ligne**, vous pouvez consulter, ajouter ou modifier des données sans problème : elles restent enregistrées dans le cache du navigateur. Dès que vous retrouvez une connexion Internet, cliquez sur **Synchroniser** pour reporter vos modifications sur Google Drive.

---

## 6. Guide d'utilisation de l'interface

### Ajouter une entrée (Create)
* Cliquez sur le bouton bleu **+ Nouvelle entrée** (ou en bas dans l'état vide).
* Renseignez le **Titre** (obligatoire), la **Catégorie** (ex : Projet, Tâche, Client, Matériel), le **Statut** (Actif, En cours, Important, Terminé) et le **Contenu** (texte libre, notes ou données JSON).
* Cliquez sur **Enregistrer**.

### Modifier une entrée (Update)
* Cliquez sur le bouton avec l'icône de **Crayon** sur la carte ou la ligne du tableau.
* Modifiez les informations souhaitées, puis enregistrez.

### Dupliquer une entrée
* Cliquez sur l'icône de **Double feuille (Dupliquer)**. Une copie conforme portant la mention `(Copie)` est immédiatement créée.

### Supprimer une entrée (Delete)
* Cliquez sur l'icône de **Corbeille rouge**.
* Confirmez la suppression dans la boîte de dialogue.

### Recherche & Filtres
* **Barre de recherche** : tapez n'importe quel mot-clé pour filtrer instantanément par titre, contenu ou catégorie.
* **Filtre par Catégorie** : liste déroulante générée automatiquement selon vos données.
* **Filtre par Statut** : filtrez par Actif, En cours, Important ou Terminé.
* **Bascule d'affichage** : deux boutons à droite permettent d'alterner entre l'affichage en **Cartes visuelles** ou en **Tableau compact**.

### Exporter et Importer ses données
Dans la fenêtre des Paramètres (⚙️) :
* **Exporter en JSON** : télécharge le fichier complet `drivedesk_data.json` sur votre clé USB.
* **Exporter en CSV** : télécharge une version tableur compatible Excel, LibreOffice Calc et Google Sheets.
* **Importer un fichier JSON** : permet de restaurer une sauvegarde précédente ou d'injecter des données externes d'un coup.

---

## 7. Structure des données & Personnalisation

Les données sont enregistrées dans Google Drive sous forme d'un tableau d'objets JSON standard :

```json
[
  {
    "id": "item-1788714656000-abc12",
    "title": "Inventaire parc informatique",
    "category": "Matériel",
    "status": "Actif",
    "content": "Description ou contenu textuel / JSON...",
    "createdAt": "2026-09-06T17:10:00.000Z",
    "updatedAt": "2026-09-06T17:15:00.000Z"
  }
]
```

Vous pouvez ouvrir et éditer ce fichier `drivedesk_data.json` directement depuis Google Drive si vous souhaitez effectuer des modifications manuelles en masse.

---

## 8. Résolution des problèmes (FAQ & Dépannage)

### 1. Pourquoi le badge indique "Erreur réseau" ou le test de connexion échoue ?
* **Vérifiez l'URL de déploiement** : elle doit obligatoirement se terminer par `/exec` et non pas `/edit`.
* **Vérifiez l'option d'accès** : dans Google Apps Script, allez dans *Déployer* > *Gérer les déploiements*. Vérifiez que le champ **Qui a accès** est bien réglé sur **Tout le monde** (*Anyone*). Si c'est sur *"Moi uniquement"*, la clé USB ne pourra pas communiquer avec l'API.

### 2. Comment modifier le script Apps Script ultérieurement ?
Si vous modifiez le code dans Google Apps Script :
1. Cliquez sur **Enregistrer 💾**.
2. Cliquez sur **Déployer** > **Gérer les déploiements**.
3. Cliquez sur l'icône de **Crayon (Modifier)** à côté de votre déploiement actif.
4. Dans la liste déroulante *Version*, choisissez **Nouvelle version**.
5. Cliquez sur **Déployer**. L'URL reste ainsi la même !

### 3. Mes données sont-elles effacées si je retire la clé USB ?
* **Non !** Les données sont doublement protégées :
  1. Elles sont stockées en sécurité sur votre **Google Drive** dans le fichier `drivedesk_data.json`.
  2. Une copie de secours est maintenue dans le `localStorage` du navigateur utilisé.

### 4. Puis-je utiliser la clé sur un ordinateur sans Internet ?
* **Oui.** L'application fonctionnera en mode local grâce au cache. Vous pourrez ajouter ou modifier des éléments. Lorsque vous brancherez la clé sur un ordinateur connecté à Internet, cliquez simplement sur le bouton **Synchroniser** pour envoyer vos modifications vers Google Drive.
