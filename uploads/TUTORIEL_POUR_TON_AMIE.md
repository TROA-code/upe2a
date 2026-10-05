# 📘 Tutoriel pour ton amie : Connecter son projet GitHub Pages à Google Drive

> ✅ **Résultat du test :** L'URL Google Apps Script a été testée avec succès !  
> **URL :** `https://script.google.com/macros/s/AKfycbyY_BItgYNHNEdjvC640obZtsZMovl6hJI_ivRUInoGo6GxGctAwnChIfRh7rLQIt_r/exec`  
> Les tests d'écriture (`POST`) et de lecture (`GET`) ont validé la création et la modification en temps réel du fichier JSON sur Google Drive.

---

## 🎯 Objectif
Remplacer le stockage local éphémère (`localStorage`) de son projet GitHub Pages par un stockage cloud permanent sur **Google Drive**, sans devoir payer un serveur et sans demander aux visiteurs de se connecter.

---

## ⚡ Méthode 1 : Donner le prompt pré-rempli à son LLM (Le plus rapide - 1 minute)

Ton amie n'a qu'à ouvrir ChatGPT, Claude, Cursor ou Copilot et lui envoyer le contenu du fichier [`PROMPT_POUR_LLM.md`](PROMPT_POUR_LLM.md).

Elle y colle simplement son code JavaScript actuel à la fin, et son LLM lui renverra son code directement adapté avec l'URL déjà configurée !

---

## 🛠️ Méthode 2 : L'intégrer elle-même à la main (Très simple)

Si elle préfère le faire elle-même, voici les 3 seules étapes :

### Étape 1 : Ajouter le module dans son projet
1. Copier le fichier [`driveStorage.js`](driveStorage.js) à la racine de son projet GitHub.
2. Dans son fichier `index.html`, ajouter cette ligne dans le `<head>` ou avant la fermeture du `</body>` :
   ```html
   <script src="driveStorage.js"></script>
   ```

*(L'URL de son Google Apps Script y est déjà pré-configurée !)*

---

### Étape 2 : Adapter les 2 lignes de son code JavaScript

Dans le fichier JavaScript où elle utilise actuellement `localStorage` :

#### 1. Au chargement des données (Lecture) :
* **Avant :**
  ```javascript
  const mesDonnees = JSON.parse(localStorage.getItem("mes_donnees")) || [];
  ```
* **Après :**
  ```javascript
  const mesDonnees = await DriveStorage.load();
  ```

#### 2. À l'enregistrement des données (Création / Modification / Suppression) :
* **Avant :**
  ```javascript
  localStorage.setItem("mes_donnees", JSON.stringify(mesDonnees));
  ```
* **Après :**
  ```javascript
  await DriveStorage.save(mesDonnees);
  ```

*(Penser à ajouter `async` devant la fonction si elle ne l'était pas déjà : `async function enregistrer() { ... }`)*.

---

### Étape 3 : Publier sur GitHub Pages
1. Faire un `git add .`, `git commit -m "Migration vers Google Drive"`, puis `git push`.
2. Ouvrir l'URL de son site GitHub Pages (`https://pseudo.github.io/mon-projet/`).
3. Ajouter une entrée ou modifier des données : **elles s'enregistrent instantanément sur son Google Drive !**

---

## 🔍 Comment vérifier que tout fonctionne sur son Google Drive ?

1. Ton amie se rend sur [Google Drive](https://drive.google.com).
2. Elle verra un dossier nommé **`DriveDesk_Storage`**.
3. À l'intérieur, un fichier `drivedesk_data.json` (ou `data.json`) est présent.
4. Si elle fait un clic droit > *Ouvrir avec* > *Google Docs* ou *Aperçu*, elle verra ses données formatées en JSON !

---

## 💡 Les avantages pour son projet :
* 📱 **Multi-appareils** : Elle peut ouvrir son site GitHub Pages depuis son smartphone ou un autre ordinateur, elle retrouvera toujours ses données à jour.
* 🛡️ **Sécurité hors-ligne** : Si la connexion Internet coupe momentanément, `driveStorage.js` continue d'enregistrer dans `localStorage` pour ne rien perdre.
* 📂 **Sauvegarde facile** : Elle peut télécharger ou sauvegarder son fichier JSON directement depuis son Google Drive à tout moment.
