# Documentation technique — UPE2A NSA

Application et supports imprimables pour une classe UPE2A NSA (élèves allophones non
scolarisés antérieurement, 16-18 ans). Site **100 % statique**, sans build, sans backend,
sans base de données. Toutes les données d'élèves restent dans le navigateur.

---

## 1. Démarrer

```bash
# n'importe quel serveur statique à la racine du dépôt
python3 -m http.server 8000
# puis http://localhost:8000/index.html
```

Un serveur est nécessaire (les `<script src>` et `fetch` internes échouent en `file://`).
Aucune installation, aucune dépendance npm, aucune étape de compilation.

Point d'entrée : **`index.html`** — sommaire des supports.
Application : **`APPLI - Espace enseignant.dc.html`**.

`index.html` redirige vers l'application en conservant la query string dès qu'elle
contient `?devoir=…` (lien « J'écoute chez moi » envoyé aux élèves).

Navigateurs cibles : Chrome / Edge / Firefox à jour. Requis : ES2020, `IndexedDB`,
`SpeechSynthesis` (lecture des mots), `import()` dynamique (pdf-lib).

---

## 2. Architecture

### 2.1 Deux natures de fichiers

| Extension | Nature | Rendu |
|---|---|---|
| `*.dc.html` | **Design Component** : page autonome et composant réutilisable | via `support.js` |
| `*.html` | page HTML classique (livres interactifs, orientation) | natif |
| `*.js` (racine) | modules de données/logique, chargés par `<script src>` | globals `window.*` |

Un `.dc.html` s'ouvre directement dans le navigateur **et** s'importe depuis un autre
`.dc.html` par `<dc-import name="APPLI - Fiche" f="{{ page }}"></dc-import>`.

### 2.2 Le runtime `support.js`

`support.js` (fourni, **ne pas modifier**) interprète la structure d'un `.dc.html` :

```html
<x-dc>
  <helmet> … polices, <script src> des modules, @font-face … </helmet>
  <div>… gabarit avec des trous {{ valeur }} …</div>
</x-dc>
<script data-dc-script>
  class Component extends DCLogic {
    state = { … }
    renderVals() { return { /* tout ce que le gabarit consomme */ } }
  }
</script>
```

Règles du gabarit :

- `{{ chemin.pointé }}` uniquement — **jamais d'expression JS** dans un trou ;
  tout calcul se fait dans `renderVals()`.
- boucles `<sc-for list="{{ l }}" as="x" hint-placeholder-count="3">`,
  conditions `<sc-if value="{{ b }}" hint-placeholder-val="{{ false }}">`.
- styles **en ligne** (`style="…"`), pas de feuille de classes : la page se peint
  pendant le streaming.
- `<script src>` autorisé **seulement** dans `<helmet>`.

### 2.3 Chargement des modules

Chaque écran déclare dans son `<helmet>` les modules dont il a besoin. Ils s'exposent en
IIFE sur `window` ; l'ordre de déclaration est l'ordre de dépendance.

`APPLI - Espace enseignant.dc.html` charge :
`fiches-source.js`, `fiches-themes.js`, `lecture-code.js`, `lecture-sons.js`,
`sons-fiches.js`, `positionnement*.js`, `disques.js`.

`APPLI - Accueil d'un élève.dc.html` charge la pile `positionnement-*` complète.

---

## 3. Écrans

| Fichier | Rôle |
|---|---|
| `APPLI - Espace enseignant.dc.html` | coquille de l'application : navigation, thèmes, sons, fiches, outils, aperçu et impression. ~5 200 lignes |
| `APPLI - Accueil d'un élève.dc.html` | parcours en 4 étapes : fiche EANA → choix du test → saisie des résultats → préconisation + PDF rempli |
| `APPLI - Emploi du temps.dc.html` | emploi du temps éditable (glisser-déposer, portée semaine/année) |
| `APPLI - Fiche.dc.html` | rendu d'**une** page A4 (210×297 mm), soit HTML source (`FICHES_SRC`) soit page générée. Utilisé partout en vignette via `transform: scale()` |
| `FEUILLE DE ROUTE - thèmes.dc.html`, `PLANCHE - thème illustré.dc.html` | documents imprimables adossés à la banque de mots |
| `FR - *`, `MATHS - *`, `SÉANCE *`, `POSITIONNEMENT - *` | livrets et supports imprimables autonomes |
| `ORIENTATION - Mon avenir au Havre.html` | carte Leaflet des lycées du Havre |

---

## 4. Modules — API publique

Tous en IIFE, un seul global chacun.

### Contenus pédagogiques

| Module | Global | Exporte |
|---|---|---|
| `banque-mots.js` | `BANQUE_MOTS` | `BANQUE`, `PREF`, `themes()`, `mots(theme)` — copie de service de la banque de mots pour les documents imprimables (l'application garde la sienne) |
| `fiches-source.js` | `FICHES_SRC` | `collections`, `pages[{id, coll, nom, html}]` — 2,6 Mo de pages A4 pré-écrites |
| `fiches-themes.js` | `FICHES_THEMES` | `types`, `familles`, `build(options)` → pages `{id, coll, nom, html}` générées à partir d'un thème |
| `lecture-code.js` | `LECTURE_CODE` | `REPERES`, `GRAPHIES`, `analyser(mot)`, `motHTML()`, `texteHTML()`, `doutesTexte()`, `imageDe(graphie)` — décodage : graphies complexes, syllabes, lettres muettes |
| `lecture-sons.js` | `LECTURE_SONS` | `SONS`, `MAP`, `sonDe(cle)`, `contient()`, `decouper()`, `pagesSeance()`, `pageTexte()`, `pageFluence()`, `aPhoto()` |
| `sons-fiches.js` | `SONS_FICHES` | `TYPES`, `build()`, `tirer()`, `sansArticle()` — génère les pages d'un phonème (4 exercices, structure Retz/Pilotis) |
| `disques.js` | `DISQUES` | `planche(opts)`, `parPage: 6` — disques à coller sur les faces des gros dés |
| `emploi-du-temps.js` | `EDT` | `JOURS`, `DOMAINES`, `RESSOURCES`, `PALETTE`, `creneaux()`, `semaine()`, `plages()`, `joursActifs()`, `iso()`, … + persistance |

### Positionnement (accueil d'un élève)

| Module | Global | Rôle |
|---|---|---|
| `positionnement.js` | `POSITIONNEMENT` | échelle CASNAV Lyon (`NE/--/-/+/++`), tests Lyon, `bilan()`, `pctGroupe()` |
| `positionnement-tests.js` | `TESTS` | catalogue : quel test existe, à quel niveau, dans quelle langue, où est le PDF. **Aucun test recopié** — liens Canopé / CASNAV Lille & Corse |
| `positionnement-corriges.js` | `CORRIGES` | corrigés saisissables : `pour(testId)`, `note()`, `noteDe()`, `niveau()`, `constat()`. Types d'exercice : `unique`, `multi`, `ordre`, `paires`, `juge` |
| `positionnement-dossiers.js` | `DOSSIERS` | le dossier élève : `charger()`, `enregistrer()`, `bilan()`, `exercices()`, `echelleDe()`, `depuisFiche()`. Gère **deux échelles** (Canopé `MI/MF/MS/TBM` et Lyon) sans les mélanger |
| `positionnement-eana.js` | `EANA` | fiche officielle EANA 76 : `CHAMPS`, `CASES`, `lire(pdf)`, `remplir(pdf, valeurs)`, `age()`, `classeDage()`. Charge **pdf-lib 1.17.1** par `import()` dynamique (CDN jsDelivr) |
| `positionnement-parcours.js` | `PARCOURS` | lit le parcours scolaire écrit sur la fiche (`lire()`, `ecart()`) — **par mots-clés**, rend toujours la phrase repérée et `null` en cas de doute |
| `positionnement-redaction.js` | `REDACTION` | brouillons des rubriques rédigées : `brouillon()`, `profil()`, `acquis()`, `maths()`, `axes()` |
| `positionnement-relecture.js` | `RELECTURE` | typographie française (espaces insécables, majuscules) — ne touche jamais au sens |
| `positionnement-orthographe.js` | `ORTHOGRAPHE` | `verifier()`, `appliquer()` via **api.languagetool.org**. Seul appel réseau de l'application, **jamais automatique** |
| `positionnement-pdfs.js` | `PDFS` | `ranger()`, `lire()`, `effacer()`, `cles()` — stockage IndexedDB des PDF déposés |

### Composants tiers embarqués

`deck-stage.js` (diaporamas), `doc-page.js` (documents paginés), `image-slot.js`
(emplacements d'image) — composants web fournis, non modifiés.

---

## 5. Données et persistance

**Rien ne sort du navigateur.** Aucun serveur, aucun compte, aucune télémétrie.

### localStorage (JSON)

| Clé | Contenu |
|---|---|
| `upe2a-dossiers` | dossiers d'élèves (fiche EANA, tests donnés, scores, synthèse) |
| `upe2a-positionnement` | `{eleves:[…]}` — passations hors classe UPE2A |
| `upe2a-themes-perso` | thèmes, mots, phrases, images (dataURL) et jeux ajoutés par l'enseignante |
| `upe2a-competences` | compétences cochées par élève |
| `upe2a-fluence` | relevés de fluence (20 derniers par élève) |
| `upe2a-sons` | progression des sons |
| `upe2a-aides` | aides au décodage actives (étiquettes, couleurs, muettes, arcs, repère) |
| `upe2a-outils` | sélections des outils de manipulation (lotos, dés) |
| `upe2a-fiches-favoris` | fiches fabriquées mises de côté (24 max) |
| `upe2a-voix` | voix de synthèse choisie |
| `upe2a-jeux-eleve` | `'0'` / `'1'` — jeux visibles côté élève |
| `upe2a-edt` | emploi du temps modifié |
| `upe2a-planche-themes` | réglages de la planche illustrée |
| `upe2a-feuilles-route` | feuilles de route par thèmes |
| `deck-stage.*` | état du composant diaporama (rail, largeur) |

Toutes les lectures sont enveloppées dans un `try/catch` avec valeur de repli : vider une
clé répare l'écran correspondant sans casser le reste.

### IndexedDB

Base `upe2a-fiches`, magasin `pdf` — les PDF déposés (trop gros pour localStorage).
Durée de vie liée au dossier : supprimés avec lui, ou par « Oublier le PDF ».

---

## 6. Dépendances externes

| Ressource | Usage | Chargement |
|---|---|---|
| `pdf-lib@1.17.1` (jsDelivr) | lire et remplir la fiche EANA | `import()` dynamique, à la demande |
| `api.languagetool.org` | correction orthographique | à la demande, sur clic |
| Google Fonts (Archivo, Archivo Black, Caveat) | typographie | `<link>` |
| `leaflet@1.9.4` (unpkg) | carte des lycées | uniquement `ORIENTATION - …html` |
| `fonts/BelleAllure*.otf` + `polices.css` | écriture cursive scolaire | local |

Hors de ces points, l'application fonctionne **hors ligne**.
Une clé d'API Claude a été explicitement écartée : sur un site statique elle serait publique.

---

## 7. Ressources

```
clean/            465 images — vignettes des mots et supports
  mot-<mot>.png     un mot du lexique (sans accent, sans article)
  geste-<mot>.png   geste de politesse
  lycee-*.png       lieux du lycée
  carte-*.png       cartes des lieux
  eleves/ ent/ pictos/ seances/
  apercu/           410 aperçus de fiches
docs/             modèles et PDF sources
tests/            32 PDF officiels Canopé / CASNAV (sujets, corrigés, grilles)
fonts/            3 polices Belle Allure
uploads/          dépôts bruts de l'enseignante — à NE PAS publier
```

**Convention de nommage** (contraignante, le code la déduit) :
`clean/mot-<mot>.png`, sans accent, sans article ; `clean/geste-<mot>.png`.
Toute image > 1000 px de large est réduite à 1000 px ; fond blanc uni, sujet centré,
photographie réaliste (public 16-18 ans).

---

## 8. Impression

- **2 cm de marge sur les quatre côtés** de tout document imprimé : règle absolue.
- Une page = `<section class="page">` en `210mm × 297mm`, `overflow:hidden`.
- Les vignettes affichent une vraie page mise à l'échelle
  (`transform: scale(0.24)` sur un bloc `210mm × 297mm`), jamais une capture.
- Export : ouvrir le document → Imprimer → Enregistrer au format PDF.

---

## 9. Pièges connus

1. **Ne jamais insérer de texte français par expression régulière** dans les modules :
   trois pannes bloquantes le 03/09, toutes de cette cause. Éditer à la main, chaîne exacte.
2. **Encodage PDF** : `pdf-lib` en WinAnsi refuse `ᵉ`, `≈`, les exposants… Les champs
   doivent être normalisés avant `EANA.remplir()`, sinon rien ne se télécharge.
3. **Noms de champs du PDF EANA** : accents échappés (`#C3#A9`) et casse incohérente d'un
   champ à l'autre — ce sont les vrais noms, ne pas les « corriger ».
4. **Classes lycée** (`2de`, `1re`, Terminale) : `classeCle` vaut `null`, aucun test
   Canopé n'existe à ce niveau. Un test `classeCle === '2de'` est du code mort.
5. **Ne jamais écraser une valeur déjà présente** dans la fiche : ce que le CIO a rempli
   prime, on ne remplace jamais en silence.
6. **Deux échelles de notation** cohabitent (Canopé et Lyon) : `DOSSIERS.echelleDe(test)`
   fait foi, ne pas convertir de l'une à l'autre.
7. `renderVals()` doit exposer **tout** ce que le gabarit consomme : un trou non résolu
   n'affiche rien et se contente d'un avertissement console.

---

## 10. Ajouter du contenu

**Un mot** → l'image dans `clean/mot-<mot>.png`, l'entrée dans le thème de
`banque-mots.js` *et* dans la banque de l'espace enseignant.

**Un son** → une entrée dans le tableau `T` de `lecture-sons.js`
(`[clé, notation, graphies, mots repères, geste, lot de pages, famille]`) ; les pages de
séance sont générées par `sons-fiches.js`.

**Un test de positionnement** → le PDF dans `tests/`, la description dans
`positionnement-tests.js`, le corrigé saisissable dans `positionnement-corriges.js`
(types `unique` / `multi` / `ordre` / `paires` / `juge`).

**Un écran** → un nouveau `.dc.html`, ses modules déclarés dans `<helmet>`, un lien dans
`index.html` et dans la navigation de l'espace enseignant.

---

## 11. Publier sur GitHub

Site statique : GitHub Pages fonctionne tel quel (branche + racine).

À exclure avant publication d'un dépôt public :

```gitignore
uploads/          # documents sources, PDF officiels, photos d'élèves
clean/eleves/     # photographies d'élèves
```

Les PDF de `tests/` et `docs/` appartiennent à leurs éditeurs (Réseau Canopé, CASNAV) :
vérifier les droits avant de les publier.
