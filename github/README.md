# UPE2A NSA — outils de classe

Application de classe et supports imprimables pour une UPE2A NSA (élèves allophones
non scolarisés antérieurement, 16-18 ans) : positionnement à l'accueil, lecture,
écriture, mathématiques, emploi du temps, jeux et livrets à imprimer.

Aucun build, aucun serveur, aucun compte : on ouvre `index.html` dans un navigateur.

## Ouvrir

- `index.html` — entrée directe dans **l'espace élève** (l'espace enseignant se
  déverrouille depuis l'application).
- `sommaire.html` — la liste des livrets imprimables.

Pour servir en local plutôt qu'ouvrir le fichier :

```
python3 -m http.server
```

## Ce qu'il y a dedans

| | |
|---|---|
| `APPLI - *.dc.html` | les écrans de l'application (espace élève et espace enseignant) |
| `positionnement-*.js` | positionnement à l'accueil : fiche EANA, base de tests, corrigés, dossiers élèves, rédaction et relecture des rubriques |
| `banque-mots.js`, `fiches-*.js`, `lecture-*.js`, `sons-fiches.js` | le contenu pédagogique (mots, thèmes, sons, fiches) |
| `FR - *`, `MATHS - *`, `JEU - *`, `SÉANCE*`, `PLANCHE`, `ÉTIQUETTES` | supports imprimables |
| `clean/` | les photographies des mots (fond blanc, 1000 px) |
| `fonts/` | polices d'écriture cursive Belle Allure |
| `support.js`, `deck-stage.js`, `doc-page.js`, `image-slot.js` | briques techniques |
| `DOC-TECHNIQUE.md` | architecture, API des modules, stockage, pièges connus |

## Pile technique

JavaScript ES2020 · React chargé par `support.js` · aucun build · aucun backend ·
données en `localStorage` et `IndexedDB` (rien ne sort du navigateur) ·
pdf-lib et Leaflet en CDN.

## Données personnelles

**Rien de nominatif n'est publié.** Les dossiers d'élèves, les fiches EANA déposées et
les copies passées restent **dans le navigateur de l'enseignante** (`localStorage`,
`IndexedDB`) et ne sont jamais envoyés ailleurs. Le dépôt ne contient ni photo d'élève,
ni scan de copie, ni liste de noms.

## Ce qui n'est PAS dans le dépôt

- `tests/` — les sujets, corrigés et grilles officiels (**Canopé, CASNAV**) : ce sont
  des documents sous droits, à récupérer sur les sites des académies. Les boutons
  « sujet » et « corrigé » de l'écran de positionnement pointent vers ce dossier :
  ils resteront sans effet tant qu'il n'est pas rempli.
- `docs/` — documents tiers (dont les cartes de langage de **Charivari**).
- `uploads/` — dépôts de travail : documents sources et photographies d'élèves.

## Licence

Le code peut être réutilisé librement. Les **photographies** de `clean/`, les
**polices Belle Allure** (gratuites pour l'enseignement, © Jean-Marie Douteau) et tous
les documents officiels ou tiers cités ci-dessus **ne sont pas couverts** : vérifier
leurs conditions avant toute réutilisation.
