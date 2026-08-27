# INSTRUCTIONS — APPLICATION

Phrase pour démarrer : « Lis INSTRUCTIONS-APPLICATION.md, on reprend l'application. »

## Documents

Tous les fichiers sont préfixés par matière : `APPLI - `, `FR - `, `MATHS - `.

| Fichier | Contenu | État |
|---|---|---|
| `APPLI - Espace enseignant.dc.html` | Application complète, espace enseignant + espace élève | fonctionnelle, mémoire partielle |
| `FR - Mes mots - livre interactif.html` | Livre feuilletable, 16 thèmes, mots prononcés au clic | images en cours |
| `FR - Mes mots - version sonore.html` | Page unique, tous les mots cliquables | fonctionnel |

## Espace enseignant — structure (barre latérale, depuis l'étape 1)

Plus de page d'accueil : la barre latérale gauche est la navigation, et l'entrée se fait
directement sur Gestion des élèves. Six rubriques **dépliables** (une seule ouverte à la
fois, celle de l'écran en cours), intitulés cerclés d'orange, une couleur par rubrique.
En haut, le bouton orange **ÉLÈVE**. En bas, le changement de mot de passe.
La barre disparaît sur téléphone et côté élève.

| Rubrique | Couleur | Entrées |
|---|---|---|
| Ma classe | vert `#2a9d6e` | Gestion des élèves · Bilan des exercices · Productions orales des thèmes · Bilan des compétences |
| Lexique | rose `#c4479e` | Création de thèmes · Réglages des thèmes · Fiches à imprimer · Jeux et ateliers |
| Lecture | bleu `#1d4e89` | Progression des sons · Réglages lettres et sons · Séances de phonologie |
| Écriture | brun `#8a4b1e` | Les lettres · Les chiffres |
| Mathématiques | orange `#e59a2b` | Fiches à imprimer |
| Ressources enseignantes | violet `#6d5bd0` | Je continue chez moi · 5 entrées « à venir » |

**Style du menu, validé par l'utilisatrice** : étiquette de rubrique en aplat de bleu
`#1d4e89`, texte blanc Archivo Black **en capitales** (11,5 px), un **point de couleur
vif** devant le nom (la couleur de la rubrique), chevron blanc à droite, coins arrondis
et petite ombre portée. Chaque entrée du sous-menu reprend le même point en 6 px.
Sous-menu sobre (gris bleuté `#c3d2e2`, 11,5 px), seule l'entrée en cours s'éclaircit
et passe en blanc. Le titre de rubrique est **plus gros** que ses entrées.

Rubriques **indépendantes** : ouvrir l'une ne referme pas les autres — rien ne remonte
jamais. Les titres sont **collants** (`position:sticky`) et la barre défile avec un
ascenseur fin (`.om-rail`). Ne jamais écraser la hauteur des entrées pour éviter le
défilement : une entrée invisible est le pire défaut possible.

Une version à palette sourde avec trait vertical a été essayée puis **refusée** :
ne pas la reproposer. Une version à étiquettes de six couleurs pleines aussi
(effet « Noël »).

Les fiches à imprimer sont **un seul écran** (`outils`) filtré par domaine via `DOMAINES` :
`lexique→dico`, `jeux→lotos`, `lecture→sonsF`, `ecrLettres→lettres`, `ecrChiffres→chiffres`,
`maths→nombres`. Ajouter un domaine = une ligne dans `DOMAINES` + une entrée dans `RUBRIQUES`.

Les réglages sont coupés en deux : `reglages` (thèmes, champs, nombre de questions, voix)
et `reglagesCode` (ateliers lettres et sons). La voix est un réglage global resté dans
`reglages` — à déplacer si un écran de réglages généraux est créé.

**Groupes** : Débutants / Intermédiaires / Avancés. Création, suppression, transfert d'élève.

**Progression des sons** : la liste des sons travaillés en classe, dans l'ordre.
Ajout (le champ accepte les graphies complexes : ou, ch, oi), déplacement par flèches,
retrait, écoute de chaque son, retour à la liste de départ.
Amorce : a i o u é m l r s p t f v ch ou an on in.
**Cette liste est conservée d'une session à l'autre.**
⚠ Aujourd'hui **rien ne la lit** : elle ne commande ni l'ordre des ateliers élève,
ni les séances de phonologie papier. Ce câblage est l'étape 6, non commencée.

Rubriques à venir, gardées hors barre tant qu'elles sont vides : Moment littéraire,
Rituels, Découverte du monde et des sciences, Étude de la langue. Elles deviendront des
étagères dans Ressources enseignantes, puis des rubriques le jour où elles ont du contenu.
« Donner en devoir » deviendra un bouton dans chaque domaine, pas une rubrique.

## Fabriquer des fiches (étape 2)

Écran **Lexique → Fabriquer des fiches**. Les fiches ne sont plus recopiées : elles sont
**construites à la demande** à partir des mots ou des phrases du thème, donc elles suivent
automatiquement les thèmes que l'utilisatrice crée et les images qu'elle remplace.

Générateur : `fiches-themes.js` (fichier séparé, `window.FICHES_THEMES.build()`), qui rend
des pages `{id, coll:'fabrique', nom, html}` — le même format que `fiches-source.js`, donc
l'aperçu, la sélection, le compteur d'exemplaires et l'impression fonctionnent sans
modification. Point d'entrée unique côté application : `toutesFeuilles()`.

Cinq types de fiches : relier l'image et le mot (avec les points de part et d'autre),
étiquettes à découper, feuille support à coller, écrire le mot (bandes d'écriture réglées),
feuille de correction. Réglages : thème, mots ou phrases, interligne petit / moyen / grand,
premier item fait en modèle. Pagination **équilibrée** : 9 items sur deux pages donnent
5 et 4, jamais 6 et 3 ; `PARPAGE` fixe le maximum par page et dépend de l'interligne
pour la fiche d'écriture.

**Trois familles** (onglets de l'écran) :
- **Pour l'élève** — relier, écrire le mot, feuille support, feuille de correction.
- **Ateliers à manipuler** — loto (la planche et les cartes), étiquettes à découper,
  cartes de révision à plier, imagier de référence. **Tout est construit depuis le thème
  choisi** : les anciennes planches de loto figées (fruits, légumes) ont été retirées de
  l'écran, le générateur les remplace pour n'importe quel thème. À venir : memory,
  Logico, Dobble, Vertichs.
- **Jeux en ligne** — l'utilisatrice colle le lien d'un exercice qu'elle a créé sur
  LearningApps ou Wordwall ; il se range dans le thème et s'affiche en cadre intégré.
  Une case décide s'ils apparaissent aussi côté élève.

⚠ **Cap tenu ensemble** : ces jeux en ligne sont une **étape de passage**. On ne génère
rien chez LearningApps ou Wordwall (impossible, pas d'accès public). L'objectif est de
**refaire chaque jeu dans l'application**, un par un, pour qu'il marche hors ligne, sur
téléphone, avec la voix française et les images du thème. Quand un jeu est refait, son
lien disparaît.

Ajouter un type de fiche = une fonction, une ligne dans `TYPES` (avec sa famille) et une
dans `PARPAGE` de `fiches-themes.js`, rien à toucher dans l'application.

## Thèmes de vocabulaire — hiérarchie

Trois groupes, définis dans `PARENTS` (`ENFANTS` en est déduit automatiquement) :

- **Le temps** — Les jours · Les mois · Les saisons
- **Les aliments** — Les fruits · Les légumes · Les féculents · Les légumineuses ·
  La viande, le poisson, les œufs · Les produits laitiers · Les matières grasses ·
  Les produits sucrés · Les boissons *(groupes alimentaires, en vue du travail sur
  l'équilibre alimentaire)*
- **Les repas** — Les moments du repas · À table *(les moments et la table, pas les
  aliments : deux axes différents)*

Un groupe n'a **jamais de mots à lui** : il n'existe pas dans `BANQUE`, seulement dans
`PARENTS`. Les mots vivent dans les sous-thèmes.

Un thème **vide** reste visible dans « Création de thèmes », marqué « à remplir » — c'est
la carte de ce qui reste à faire — mais il **n'apparaît pas côté élève** (`garni()`).

Dans « Création de thèmes », la colonne de gauche suit cette hiérarchie : les groupes sont
des en-têtes en petites capitales, non cliquables ; les sous-thèmes sont indentés.

## À rappeler à l'utilisatrice (elle a demandé qu'on le lui rappelle)

**L'ordre des thèmes du tableau élève** est à revoir. Référence retenue, l'ordre de
Silvia Camara (dansmavalise-fls.com), du plus urgent au plus large : se présenter,
les consignes, les lieux de l'école, le matériel scolaire, les couleurs, les jours,
puis les verbes, les aliments, les vêtements, le corps.
À adapter au public 16-18 ans : **Les métiers passe avant Les vêtements** (entrée CAP).
Attendre son ordre à elle avant de poser quoi que ce soit.

## Historique

Avant l'étape 1 : une page d'accueil en tuiles numérotées et un seul écran
« Paramétrage des exercices » à trois colonnes. Remplacés par la barre latérale
ci-dessus. Version conservée dans `work/sauvegarde/`.

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

## Les métiers — colonne vertébrale de l'année (très important)

Les élèves se destinent à un CAP : l'entrée par les métiers est obligatoire et
structure l'année entière. Ce n'est pas un thème de lexique parmi d'autres.

Une fiche par métier — boulanger, menuisier, maçon… — avec le matériel, les EPI,
le lieu de travail, les gestes. Organisation en sous-thèmes, comme Les aliments
(Fruits / Légumes / Repas) : Métiers → Boulanger, Menuisier, Maçon…
La mécanique des sous-thèmes existe déjà, rien à construire pour ça.

Deux usages naturels à ne pas oublier :
- les EPI se prêtent au vrai ou faux (« Le maçon porte un casque » vrai / faux) ;
- ces fiches sont le cas d'école du principe « le livret à l'écran, les fiches en sortent ».

Lié aux vidéos métier de l'emploi du temps (lundi et jeudi, « Nouveau son + vidéo métier »).

## Organisation des fichiers

L'espace enseignant reste **un seul fichier** : c'est un composant unique, le découper
casse l'affichage progressif et la possibilité de le dupliquer d'un geste pour essayer
une variante. En revanche, à partir de maintenant :

- **Tout nouveau contenu part dans son propre fichier** (générateur de fiches, séances
  de sons, livrets, fiches métiers) — jamais ajouté au fichier de l'application.
- **Les données** (mots par thème, phrases, propositions vrai ou faux, liste des sons)
  sortent dans un fichier de données au moment où on y touche.
- **Une copie de sauvegarde dans `work/sauvegarde/` avant chaque étape**, et la
  publication GitHub sert d'historique : c'est ça, le vrai filet de sécurité.

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
