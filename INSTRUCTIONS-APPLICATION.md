# INSTRUCTIONS — APPLICATION

Phrase pour démarrer : « Lis INSTRUCTIONS-APPLICATION.md, on reprend l'application. »

## Documents

Tous les fichiers sont préfixés par matière : `APPLI - `, `FR - `, `MATHS - `.

| Fichier | Contenu | État |
|---|---|---|
| `APPLI - Espace enseignant.dc.html` | Application complète, espace enseignant + espace élève | fonctionnelle, mémoire partielle |
| `FR - Mes mots - livre interactif.html` | Livre feuilletable, 16 thèmes, mots prononcés au clic | images en cours |
| `FR - Mes mots - version sonore.html` | Page unique, tous les mots cliquables | fonctionnel |

## Espace enseignant — structure

**Démarrage** : espace élève, verrouillé. Bouton « Espace enseignant » → mot de passe (`ecole`).

**Sept outils** (cartes blanches, chiffre ou photo dans une pastille de couleur) :
groupes et élèves, changer mon mot de passe, paramétrage des exercices,
**progression des sons**, création de thèmes, productions orales, bilan des exercices.

**Groupes** : Débutants / Intermédiaires / Avancés. Création, suppression, transfert d'élève.

**Paramétrage** : colonne des thèmes à gauche (avec bouton tout cocher / tout décocher),
champs pédagogiques au milieu, exercices et nombre de questions à droite.
Les deux colonnes de droite s'estompent quand seule « La politesse » est cochée.

**Progression des sons** : la liste des sons travaillés en classe, dans l'ordre.
Ajout (le champ accepte les graphies complexes : ou, ch, oi), déplacement par flèches,
retrait, écoute de chaque son, retour à la liste de départ.
Amorce : a i o u é m l r s p t f v ch ou an on in.
**Cette liste est conservée d'une session à l'autre** — le seul élément mémorisé
à ce jour, et le précédent technique pour tout le reste.
Elle pilote les séances de phonologie papier (voir INSTRUCTIONS-FRANCAIS.md).

## Espace élève — parcours

Choisis ton thème → Choisis ton atelier → Niveau et exercice → l'exercice.

**Thèmes** : L'alphabet, Les couleurs, Le matériel scolaire, Le lycée, La maison,
Le temps (sous-thèmes : jours, mois, saisons), La météo,
Les repas (sous-thèmes : fruits, légumes, aliments), Les transports, L'école.
**La politesse** est à part, dans un bloc « accès direct » avec liseré orange :
un clic lance directement son exercice propre.

**L'alphabet ne suit pas ce parcours.** Il propose quatre entrées directes :
**Alphabet 1** (A capitale), **Alphabet 2** (a script), **Alphabet 3** (a cursive), **J'écris**.
Les trois premières sont un appariement lettre / image en trois séries de 9,
avec compteur de réussites, compteur d'erreurs et chronomètre.
En fin de série : bouton principal vers la série suivante, bouton secondaire « Recommencer ».
Pas de verdict chiffré affiché à l'élève.
Les lettres où il s'est trompé **trois fois ou plus** apparaissent sous « À revoir »,
et remontent dans le bilan enseignant (« Alphabet 1 · Exploration — 26/26 — 3 erreurs — B »).
Le mode Évaluation reste un choix de l'enseignante, jamais une sanction automatique.
Polices Belle Allure pour le script et la cursive.

**Ateliers et exercices** (autres thèmes) :
- J'écoute → Explore · Trouve la bonne image · Vrai ou faux
- Je lis → Explore · Trouve le bon dessin · Trouve le bon mot
- Je parle → Écoute et répète (enregistrement au micro, fonctionne)
- J'écris → Explore · Complète le mot · Écris le mot
- La politesse → « Que dis-tu ? » : une situation énoncée, trois formules illustrées au choix

Barre de progression en haut de chaque exercice : un rectangle par question,
vert si réussie, rouge si manquée, violet clignotant pendant la réflexion.

## Graphisme

Fond mur de briques blanches, panneau de liège encadré de bois, titre sur post-it épinglé
avec sa punaise rouge. Fenêtre et plante (photos de l'utilisatrice) posées à gauche.
Cartes blanches à coins arrondis, bordure de couleur épaisse et unique par thème.
Typographie Archivo Black pour les titres. Bandeau bleu nuit en haut.

## Limite actuelle — priorité absolue

**Presque rien n'est mémorisé.** Seule la progression des sons est conservée
(clé `upe2a-sons` dans le navigateur, avec garde-fou si l'écriture échoue).
Groupes, élèves, réglages, scores et enregistrements disparaissent encore
à la fermeture, et les bilans affichés sont fictifs. Le mécanisme est en place :
il reste à l'étendre.

À faire : stocker dans le navigateur les groupes, les élèves, les réglages, les scores.
Pour les enregistrements audio : les conserver, avec un bouton **Télécharger**
(nom du type `amina-pomme-12-06.webm`), un bouton **Supprimer**, et un compteur d'espace.
Prévoir un garde-fou : si le stockage échoue, l'application continue de fonctionner sans mémoire.

## Priorités

1. La mémoire des données (sans elle, l'application n'est pas utilisable en classe)
2. Enregistrements : téléchargement et suppression
3. Nouveaux thèmes au fil des images disponibles

## Chantiers ouverts, discutés mais non commencés

- **Onglet « Mes outils »** : cocher des fiches (lettres du cahier d'écriture, séances de sons)
  et les imprimer en un clic, sans sortir de l'application. Le geste reste à trancher :
  cases à cocher ou vignettes.
- **Combinatoire** : exercices de syllabes dans l'application, adossés à la progression des sons.
- **Enregistrements de l'enseignante** : remplacer la voix de synthèse, qui prononce mal
  les graphies isolées (« ch » sonne comme la lettre).

## Piège technique — polices Belle Allure

Les polices Belle Allure doivent être appelées **par un lien externe** vers `polices.css` :

    <link rel="stylesheet" href="polices.css" />

Intégrées en base64 dans le fichier, ou appelées par `@import`, elles empêchent la page
de s'afficher (le navigateur montre le code source). Symptôme déjà rencontré trois fois.

## Conventions à respecter (toutes conversations)

- **Public** : élèves allophones NSA, 16-18 ans. Ton et visuels adultes, jamais infantilisants.
- **Images** : photographies réalistes plutôt que dessins, y compris pour les images de référence.
  Fond blanc uni, sujet centré, sans texte ni curseur parasite. Largeur maximale 1000 px.
- **Remplacement** : toujours écraser le fichier existant, jamais de doublon (`mot-x2.png`, `tmp-mot-x.png`).
  Supprimer les images devenues inutiles.
- **Nommage** : `clean/mot-<mot>.png` — sans accent, sans article (`mot-pomme.png`, `mot-pommedeterre.png`).
  Les gestes de politesse : `clean/geste-<mot>.png`.
- **Signaler** tout problème sur une image reçue : flou, cadrage coupé, fond non uni, curseur visible, mot qui ne correspond pas.
- **Ne rien modifier** sans accord explicite quand une discussion est en cours.
- **Impression noir et blanc** : les pictogrammes doivent être au trait noir épais, pas en couleur pâle.

## Ressource partagée

Le dossier `clean/` contient environ 290 images utilisées par **tous** les documents.
Une image corrigée profite à tous. Ne jamais dupliquer une image d'un document à l'autre.
