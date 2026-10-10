# Studio Voix Educ-AI 🎙️ (Mode API Direct Éphémère)

Interface web simple, moderne et confidentielle pour générer et télécharger de la synthèse vocale via l'API **[voice.educ-ai.fr](https://voice.educ-ai.fr/)** ([documentation](https://voice.educ-ai.fr/docs)).

---

## ⚡ Mode API Direct Éphémère (Zero Sauvegarde Serveur)

Conformément à votre demande, l'application utilise l'endpoint **`/generate/stream`** de l'API Educ-AI :
- **Aucun enregistrement sur le serveur** : Rien n'est écrit sur le disque du serveur Educ-AI.
- **Aucune trace dans l'interface ou l'historique** de `voice.educ-ai.fr`.
- **Fichier en mémoire vive client (Blob)** : Le son généré est reçu directement en flux binaire dans votre navigateur.
- **Si vous ne téléchargez pas le fichier WAV**, le son est **définitivement perdu** à la fermeture ou à l'actualisation de la page.

---

## ✨ Fonctionnalités

1. **Sélection de la voix** :
   - Chargement dynamique des profils vocaux disponibles (ex: *Celine2*, *Cristalle*, *steeve2*, *celine*, *steeve*).
   - Cartes cliquables ou menu déroulant.
2. **Saisie du texte** :
   - Compteur de caractères en direct (jusqu'à 5000 caractères).
   - Suggestions de prompts en un clic (*Accueil*, *Pédagogie*, *Citation*).
   - Bouton pour effacer rapidement le texte.
3. **Options avancées (facultatives)** :
   - Instruction de style / émotion (ex: *"Parler d'un ton calme et posé"*).
   - Choix de la langue (français, anglais, espagnol, allemand, italien).
4. **Génération & Lecteur Audio** :
   - Minuteur en direct pendant le calcul du flux.
   - Lecteur intégré avec animation onde sonore (waveform).
   - Contrôles de lecture (Play/Pause, barre de progression, vitesse 1.0x / 1.25x / 1.5x / 2.0x).
5. **Téléchargement immédiat** :
   - Bouton **« Télécharger le WAV »** pour enregistrer le fichier audio en local sur votre ordinateur avant qu'il ne disparaisse.

---

## 🚀 Démarrage rapide

L'application ne nécessite aucune installation de module externe (utilise le serveur HTTP natif de Node.js).

Dans le terminal, dans ce dossier :

```bash
npm start
```
*ou directement :*
```bash
node server.js
```

Puis ouvrez votre navigateur sur : **[http://localhost:3000](http://localhost:3000)**
