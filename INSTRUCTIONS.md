# INSTRUCTIONS — UPE2A NSA (fichier unique)

Phrase pour démarrer : « Lis INSTRUCTIONS.md, on reprend. »

Ce fichier est **la seule source à jour**. Il remplace `INSTRUCTIONS-APPLICATION.md`,
`INSTRUCTIONS-FRANCAIS.md` et `INSTRUCTIONS-MATHS.md`. Raison : **le français et les maths sont en cours d'intégration
dans l'application** — les livrets papier deviennent des sources de contenu que
l'application met en page et imprime à la demande. Trois conversations séparées n'ont
plus de sens.

---

# 1. LE CADRE

## Public
Élèves allophones **non scolarisés antérieurement, 16-18 ans**, qui se destinent à un CAP.
Ton et visuels **adultes, jamais infantilisants**. Ils ne lisent pas encore : tout doit être
compréhensible par l'image, le geste, la couleur ou la voix.

## Conventions absolues
- **Images** : photographies réalistes plutôt que dessins, **y compris** pour les images de
  référence et les mots repères. Fond blanc uni, sujet centré, sans texte ni curseur.
  Largeur maximale **1000 px**, réduire automatiquement au-delà.
- **Nommage** : `clean/mot-<mot>.png` — sans accent, sans article. Gestes de politesse :
  `clean/geste-<mot>.png`. Gestes Borel-Maisonny : `clean/geste-son-<lettre>.png`.
  Phrases illustrées : `clean/phrase-<mot>.png`.
- **Remplacement** : toujours **écraser** le fichier existant, jamais de doublon
  (`mot-x2.png`, `tmp-mot-x.png`). Supprimer les images devenues inutiles.
- **Jamais** convertir une image en noir et blanc ni modifier ses couleurs sans demande.
- **Signaler** tout problème sur une image reçue : flou, cadrage coupé, fond non uni,
  curseur visible, texte parasite, mot qui ne correspond pas.
- **Ne rien modifier** sans accord explicite quand une discussion est en cours.
  Quand elle dit « on discute avant », répondre sans toucher au code.
- **Impression noir et blanc** : pictogrammes au trait noir épais, pas en couleur pâle.

## Ressource partagée
`clean/` contient environ 300 images utilisées par **tous** les documents. Une image
corrigée profite à tous. Ne jamais dupliquer une image d'un document à l'autre.

## Piège technique — polices Belle Allure
Appeler **par lien externe** : `<link rel="stylesheet" href="polices.css" />`.
En base64 ou par `@import`, la page ne s'affiche pas (le navigateur montre le code source).
Symptôme rencontré trois fois.

## Mise en ligne
Application publiée sur **troa-code.github.io/upe2a**, dépôt GitHub `troa-code/upe2a`.
Publication : décompresser le zip, supprimer `work` et `uploads`, copier dans
`Documents\GitHub\upe2a`, puis GitHub Desktop → champ **Summary** (obligatoire, en haut) →
**Commit to main** → **Push origin**. Deux à cinq minutes avant que le site se mette à jour.
Elle est novice : redonner les étapes numérotées sans supposer le vocabulaire acquis.

---

# 2. L'APPLICATION

`APPLI - Espace enseignant.dc.html` — fichier unique, espace enseignant + espace élève.
`APPLI - Fiche.dc.html` — rendu d'une page à imprimer.
`fiches-source.js` — les 120 pages recopiées des livrets.
`fiches-themes.js` — le générateur de fiches à la demande.

## Organisation des fichiers
L'espace enseignant reste **un seul fichier** : le découper casse l'affichage progressif et
la possibilité de le dupliquer d'un geste. En revanche :
- **tout nouveau contenu part dans son propre fichier** (générateurs, séances, livrets) ;
- **les données** (mots, phrases, vrai/faux, sons) sortent dans un fichier de données au
  moment où on y touche ;
- **une copie dans `work/sauvegarde/` avant chaque étape** ; la publication GitHub sert
  d'historique.

## Espace enseignant — barre latérale

Pas de page d'accueil : la barre latérale **est** la navigation, l'entrée se fait sur
Gestion des élèves. Bouton orange **ÉLÈVE** en haut à droite du bandeau.

| Rubrique | Point | Entrées |
|---|---|---|
| Ma classe | vert `#2a9d6e` | Gestion des élèves · Bilan des exercices · Productions orales des thèmes · Bilan des compétences |
| Lexique | rose `#c4479e` | Création de thèmes · 👁 Réglages des thèmes · Fiches et jeux |
| Lecture | turquoise `#4fc3d9` | Les sons · Aider un texte · 👁 Réglages lettres et sons · Séances de phonologie |
| Écriture | brun `#8a4b1e` | Les lettres · Les chiffres |
| Mathématiques | orange `#e59a2b` | Fiches à imprimer |
| Ressources enseignantes | violet `#6d5bd0` | Je continue chez moi · 5 entrées « à venir » |

Le 👁 signale les écrans qui **changent ce que voient les élèves**.

**Style du menu, validé — ne pas rediscuter** : étiquette de rubrique en aplat de bleu
`#1d4e89`, texte blanc Archivo Black **en capitales**, un **point de couleur vif** devant le
nom, chevron blanc à droite, coins arrondis et petite ombre portée. Chaque entrée du
sous-menu reprend le point en 6 px. Sous-menu gris bleuté `#c3d2e2`, seule l'entrée en
cours s'éclaircit et passe en blanc. Le titre de rubrique est **plus gros** que ses entrées.

Rubriques **indépendantes** : ouvrir l'une ne referme pas les autres, **rien ne remonte
jamais**. Titres **collants** (`position:sticky`), ascenseur fin (`.om-rail`).
⚠ Ne **jamais** écraser la hauteur des entrées pour éviter le défilement : une entrée
invisible est le pire défaut possible (erreur commise, à ne pas refaire).

**Refusées, ne pas reproposer** : la palette sourde avec trait vertical ; les six étiquettes
de couleurs pleines (effet « Noël »).

Les fiches à imprimer sont **un seul écran** (`outils`) filtré par domaine via `DOMAINES`.
Ajouter un domaine = une ligne dans `DOMAINES` + une entrée dans `RUBRIQUES`.
⚠ L'entrée **Lexique → Fiches à imprimer a été supprimée** : le générateur de Fiches et jeux
la remplace. Les pages figées `dico` restent dans `fiches-source.js` — Créer une fiche →
Livret s'en sert encore — mais elles n'ont plus d'entrée de menu.

**Regroupement des vignettes** : les pages d'une même série forment **une seule vignette**
(« Lettre A · 2 pages »), via `cleLot()` / `lotsDe()`. Le +/− agit sur tout le lot.
57 fiches de lettres → 29 vignettes.

## Fiches et jeux — le générateur

Les fiches sont **construites à la demande** à partir des mots ou des phrases du thème :
elles suivent automatiquement les thèmes qu'elle crée et les images qu'elle remplace.

`fiches-themes.js` → `window.FICHES_THEMES.build()` rend des pages
`{id, coll:'fabrique', nom, html}` — même format que `fiches-source.js`, donc aperçu,
sélection, compteur d'exemplaires et impression fonctionnent sans modification.
Point d'entrée unique : `toutesFeuilles()`.

**Trois familles** (onglets) :
- **Pour l'élève** — relier, écrire le mot, feuille support, feuille de correction.
- **Ateliers à manipuler** — loto (planches + cartes), étiquettes **avec** leur feuille
  support, cartes de révision à plier, imagier de référence. À venir : memory, Logico,
  Dobble, Vertichs.
- **Jeux en ligne** — elle colle un lien LearningApps ou Wordwall ; il se range dans le
  thème et s'affiche en cadre intégré. Une case décide s'il apparaît côté élève.

⚠ **Cap tenu ensemble** : les jeux en ligne sont une **étape de passage**. On ne génère rien
chez ces services. L'objectif est de **refaire chaque jeu dans l'application**, un par un,
pour qu'il marche hors ligne, sur téléphone, avec la voix française et les images du thème.
Quand un jeu est refait, son lien disparaît.

**Le loto est un jeu, pas une fiche** : plusieurs planches **différentes** de 6 images
(2 à 6 selon le thème, réglable) + les cartes à découper. Mise en page reprise de ses
grilles fruits/légumes : cadre noir, **bandeau déchiré rouge**, titre manuscrit accordé
(« Le loto du corps », « des fruits », « de l'école »), grille 3×2, numéro en bas à droite.

**Pagination équilibrée** : 9 items sur deux pages donnent 5 et 4, jamais 6 et 3.
`PARPAGE` fixe le maximum par page et dépend de l'interligne pour l'écriture.

Ajouter un type = une fonction, une ligne dans `TYPES` (avec sa famille) et une dans
`PARPAGE`. Rien à toucher dans l'application.

## Thèmes de vocabulaire — hiérarchie

Groupes définis dans `PARENTS` (`ENFANTS` en est déduit) :
- **Le temps** — Les jours · Les mois · Les saisons
- **Les aliments** — Les fruits · Les légumes · Les féculents · Les légumineuses ·
  La viande, le poisson, les œufs · Les produits laitiers · Les matières grasses ·
  Les produits sucrés · Les boissons *(groupes alimentaires, en vue de l'équilibre alimentaire)*
- **Les repas** — Les moments du repas · À table *(les moments et la table, pas les aliments)*

Un groupe n'a **jamais de mots à lui** : il n'existe pas dans `BANQUE`, seulement dans
`PARENTS`. Un thème **vide** reste visible dans Création de thèmes, marqué « à remplir » —
c'est la carte de ce qui reste — mais **n'apparaît pas côté élève** (`garni()`).
Les groupes sont des en-têtes gris dépliables par une flèche à droite ; même arborescence
partout, y compris dans Fiches et jeux.

## Espace élève — parcours

Deux panneaux de liège : **Les thèmes** et **Les lettres et les sons**.
Thème → atelier → niveau → exercice.
Les panneaux d'accueil font **560 px** au maximum (moitié de leur taille d'origine) et leurs
vignettes d'aperçu sont **carrées** — `aspect-ratio:1` + `align-self:start`, elles le resteront
toujours, quelle que soit la taille du glyphe ou de l'image posée dedans.

**Ateliers** :
- J'écoute → Explore · Trouve la bonne image · Vrai ou faux
- Je lis → Explore · Trouve le bon dessin · Trouve le bon mot
- Je parle → Écoute et répète (micro, fonctionne)
- J'écris → Explore · Complète le mot · Écris le mot
- La politesse → « Que dis-tu ? » : une situation, trois formules illustrées

**Les trois temps enchaînés** : « Commencer » lance la série ; la barre du haut devient un
fil **① J'explore les mots → ② Je trouve la bonne image → ③ Vrai ou faux**, numéroté, gros,
en gras. L'accès à un exercice seul reste sous la mention « un exercice seulement ».

**Niveaux** : Les mots · Les phrases · Les textes. Au niveau 2, le corpus bascule
automatiquement sur les phrases (`corpus()`, `surPhrases()`) : 18 phrases pour Le corps.

**Vrai ou faux** : boutons **✓ VRAI** vert et **✕ FAUX** rouge (les mots restent, ils les
verront sur papier). La correction ne passe pas par la couleur des boutons : le bouton
choisi garde sa couleur et prend un anneau, l'autre s'estompe, un grand ✓ ou ✕ apparaît.
Généré automatiquement pour les thèmes sans banque écrite.
Voix : « Oui. C'est vert. » / « Regarde bien. C'est vert. » — **jamais « Si »**, jamais
contredire l'élève.

**Boutons de progression** : une grosse **flèche ronde ➜**, jamais « Question suivante » —
ils ne lisent pas.

**L'alphabet ne suit pas ce parcours** : quatre entrées directes — Alphabet 1 (A capitale),
Alphabet 2 (a script), Alphabet 3 (a cursive), J'écris. Appariement lettre/image, trois
séries de 9, compteur de réussites, d'erreurs, chronomètre. Les lettres manquées **trois
fois ou plus** apparaissent sous « À revoir ». Pas de verdict chiffré à l'élève.

**Barre de progression** : un rectangle par question, vert réussi, rouge manqué, violet
clignotant pendant la réflexion.

## Téléphone

En dessous de 760 px (ou écran physique étroit, ou écran tactile — le mode « Site pour
ordinateur » de Chrome est neutralisé) : bandeau compacté, roue crantée à la place du
bouton enseignant, **décors masqués**, panneaux en pleine largeur, thèmes de 5 à 2 colonnes,
images d'exercice de 4 à 2 colonnes, fil réduit à « 2 / 3 » + l'étape en cours.
Les écrans **défilent** : ne jamais borner un écran d'exercice à la hauteur de la fenêtre.
Le sous-titre du bandeau (« UPE2A NSA · français langue de scolarisation ») ne s'affiche
qu'au-delà de **940 px** : en dessous il écrasait le titre.
Une tablette tactile bascule en présentation téléphone jusqu'à 1100 px — portrait en version
simple, paysage en version large. Vérifié à 420 et 820 px : décor masqué, une colonne,
boutons Accueil / Retour / Réglages gros, cases de liège carrées.

## Je continue chez moi

Elle envoie les liens **par Pronote**, pas par WhatsApp. L'écran donne un lien par champ,
avec un bouton Copier et un bouton « Copier tout le bloc » :
`troa-code.github.io/upe2a/?devoir=lecorps-1-ecoute`

L'élève clique : l'application s'ouvre **directement** sur les trois temps, bandeau violet,
sans menu ni mot de passe. À la fin : thème, exercice, score et date sous « Montre à ton
professeur », plus un bouton **Encore**. **Rien n'est enregistré, rien ne remonte** — c'est
délibéré, ce ne doit pas devenir un mouchard.

## Voix

Sélection filtrée : les voix `natural / premium / enhanced / siri / neural` passent devant,
**Google français** est favorisée, les voix locales bas de gamme (Hortense…) reculent.
La voix arrive du réseau une seconde après les voix locales : garder le choix affiché et
attendre (`voiceschanged` + relances à 300/900/2000/4000 ms) au lieu de basculer.
« dos » est envoyé à la voix sous la forme « do ».

## Mémoire — limite actuelle

Sont conservés : progression des sons (`upe2a-sons`), thèmes personnels
(`upe2a-themes-perso`), réglages d'outils. **Ne le sont pas** : groupes, élèves, scores,
enregistrements. Les bilans affichés sont **fictifs**.

À faire : stocker groupes, élèves, réglages, scores. Pour les enregistrements : les
conserver, avec **Télécharger** (`amina-pomme-12-06.webm`), **Supprimer**, et un compteur
d'espace. Garde-fou : si le stockage échoue, l'application continue sans mémoire.

**RGPD** : prénoms seuls = donnée personnelle. En local, aucune formalité. En ligne, il
faudrait le registre du lycée et l'accord du chef d'établissement. Recommandation retenue :
**initiales** (« Amina D. ») et scores gardés en local.

## Graphisme

Mur de briques blanches, panneau de liège encadré de bois, titre sur post-it épinglé avec
punaise rouge. Fenêtre et plante (ses photos) à gauche — masquées quand la barre est là.
Cartes blanches à coins arrondis, bordure épaisse d'une couleur par thème.
Archivo Black pour les titres. Bandeau bleu nuit en haut.

---

# 3. LES FICHES PAPIER — RÈGLES CONSTANTES

- **Police** : lettres bâton détachées (Verdana / Tahoma), **jamais de cursive**.
  Belle Allure est réservée au tracé du cahier d'écriture. Elle veut du **script**.
- **Consignes** : toujours en **gras**, toujours en **FALC** — une action par ligne,
  phrases courtes, impératif. « Découpe les étiquettes. / Colle le mot sous l'image. »
- **Pictos** : chaque consigne porte son picto (ciseaux, colle, œil, crayon, oreille).
- **Relier** : **toujours** des points de part et d'autre, à mi-hauteur de chaque case.
- **Découpage** : toute feuille d'étiquettes sort **avec sa feuille support** (images +
  cases vides) — des étiquettes seules ne servent à rien.
- **Atelier autonome** : premier item déjà fait, encadré et marqué « modèle » ;
  feuille de correction en dernière page, bord vert, à laisser sur la table.
- **Étiquettes** : hauteur 22 mm environ, manipulables.
- **Un exercice ne doit pas être coupé** entre deux pages ; image, mots et ligne
  d'écriture forment un bloc.

## Bandes d'écriture

Cinq traits : bleu (ciel) · gris (capitales) · vert (minuscules) · marron (ligne
d'écriture) · **noir** (jambages). Le noir remplace le rouge : c'est ce qu'ils ont dans
leur cahier, et le rouge veut dire « faux » ailleurs dans l'application.

Interligne réglable **petit 10 / moyen 13,5 / grand 19** — c'est un outil de
différenciation, pas une préférence esthétique. Le « moyen » est la valeur validée.

---

# 4. LES CONTENUS

## Cahier d'écriture — `FR - Cahier d'écriture - Tracer les lettres.dc.html`
Page alphabet, puis une page par lettre : point vert numéroté au départ, flèche de sens,
point rouge à l'arrivée, numéros de tracé en noir à l'extérieur. Étayage dégressif :
modèle plein → pointillé → amorce → ligne vide. Capitale sur deux interlignes, barre du A
et du E sur la ligne verte. Mots repères Retz. **Terminé.**

**Extraction à la demande** : « affiche la fiche du M » → un fichier de 1 ou 2 pages est
extrait. Le cahier complet (59 pages) reste la source unique, il n'est pas découpé.

## Livret 2 — Mes mots (dictionnaire imagé), 4 volumes
Grille de 9 cases : vignette à gauche (image + mot en capitales, colonne de 35 mm), ligne
d'écriture à droite avec le mot tracé en script bleu posé sur la ligne marron. Bandeau des
7 jours en haut, colonne des quantièmes 1 à 31 à gauche, cadre bleu épais.

**Déterminants** : chaque mot porte son article (UN CAHIER, DU PAIN, DE L'EAU, LES YEUX).
Pas d'article pour les couleurs, les jours, les mois.
**Syllabes** : certains mots ont une syllabe en rouge et un graphème souligné
(un ta**bleau**, une t**rou**sse).

Images manquantes : **lycée**, et les contraires ouvert/fermé, plein/vide, jeune/vieux.
Déjà faits : mois, saisons, positions, ville, chaud/froid, grand/petit, propre/sale,
lourd/léger.

## Séances de phonologie — Retz « La clé du code » + Pilotis
Deux pages A4 par son, **six mots** par séance. 3 sons faits (A, I, O) sur 18.

**En-tête page 1**, bandeau sur trois zones : mot repère à gauche sur fond beige ·
pictogramme oreille + le son entre crochets · geste Borel-Maisonny à droite · en dessous,
pictogramme œil + toutes les graphies (capitale, script, script Belle Allure, cursive
minuscule, cursive majuscule ; pour [i] ajouter Y y y, pour [o] ajouter AU et EAU).

**Quatre exercices, dans cet ordre** :
1. **J'écoute. Je répète.** Six mots : photo + capitales + script.
2. **J'entends [x] ? Je coche.** Huit images **sans le mot écrit** — sinon l'élève cherche
   la lettre des yeux au lieu d'écouter. Moitié d'intrus.
3. **Je lis. J'entoure les x.** Grille de 27 lettres, la cible dans toutes ses graphies,
   mêlée à des lettres visuellement proches.
4. **Je manipule des syllabes.** Six mots, autant de cases que de syllabes.

**Pas d'exercice d'écriture** : le cahier d'écriture s'en charge.
**Prononciation de référence** : le E final se prononce. FRO-MA-GE = 3 syllabes.

**Mots repères Retz (source de vérité)** : A ananas · B ballon · C carotte et cerise ·
D date · E renard · F fantôme · G gâteau · **H rien (laisser vide)** · I gris · J jupe ·
K kangourou · L lit · M moto · N nuage · O pot et pomme · P pied · Q cinq · R robot ·
S salade et rose · T table · U rue · V vélo · W wagon · X xylophone · Y pyjama · Z zèbre.
Le mot repère fait **entendre le son dans le mot**, il n'illustre pas l'initiale.

**Gestes Borel-Maisonny** : `clean/geste-son-<lettre>.png`, carré 1000 px, fond rendu
transparent. Modèles alternés (jeune femme, jeune homme, adolescent), même cadrage, même
fond, vêtements neutres.

**Ce qui se génère, ce qui ne se génère pas** : la structure, la disposition, les exercices,
les syllabes sont mécaniques et réutilisables. **Les mots illustrés de chaque son, non** —
il faut que l'image existe. Rôles convenus : elle choisit le mot repère, les mots et
l'ordre ; l'assistant propose et fabrique.
**Consonnes** : une étape de **combinatoire** (MA ME MI MO MU) que les voyelles n'ont pas,
et le son ne se prononce pas seul.

## Mathématiques
- **Livret 1 — Les nombres de 0 à 10** : couverture, référentiel (0 à 10 en constellation
  5+5), 4 fiches, bilan, mémo. Scan redressé et nettoyé. Grille de dés 3×3 en fin de fiche.
- **Livret 1 bis — Tracer les chiffres** : couverture + 10 pages. Chiffres extraits de son
  document de référence, avec couleurs, flèches et numérotation d'origine, en haut à gauche.
  Cinq bandes d'étayage dégressif. Trait unique, pas de contour. Le **7 porte sa barre
  médiane** (usage français).
- **Livret 2 — Comparer et ranger** : 5 fiches. Cocher l'ensemble qui a le plus, le moins,
  suites, ranger, compléter. Écarts variables pour forcer le dénombrement. Jetons au trait
  noir, pas d'images couleur.

## Livret 3 — Les repas
Lotos fruits et légumes : 4 planches de 6 cases, une couleur de banderole par joueur,
24 cartes à découper. Reste à ajouter : pages de lexique et d'exercices.

## Images encore dessinées, à remplacer par des photos
`lit`, `chaise`, `sac`, `cartable`, `litchi`, `olive`, `cafe`, `taxi`, `date`, `madame`,
`magasin`, `glace`, `carte`, `mars`, `abricot`, `karate`.
`gris` est une tache de peinture grise, comme les autres couleurs : rien à remplacer.
Déjà remplacés par des photos : `chat`, `table`, `ballon`, `garcon`, `violon` (nouveau).
`gateau` était déjà une photo.

**Prompt qui donne de bons résultats** :
« Photorealistic photograph of a single <objet>, centered, plain pure white seamless
background, soft even studio lighting, sharp focus, whole object visible, no text, no
watermark, no logo, no visible studio equipment, no softbox in frame, no cursor, natural
colors, 4:3 ratio. »
À la réception : réduire à 1000 px, puis **rendre le fond blanc transparent** pour les
mots repères (sinon un rectangle blanc apparaît sur le fond beige).

---

# 5. LES MÉTIERS — colonne vertébrale de l'année (très important)

Les élèves visent un CAP : l'entrée par les métiers est **obligatoire** et structure
l'année entière. Ce n'est **pas** un thème de lexique parmi d'autres.

Une fiche par métier — boulanger, menuisier, maçon… — avec le matériel, les EPI, le lieu
de travail, les gestes. En sous-thèmes, comme Les aliments : Métiers → Boulanger,
Menuisier, Maçon… La mécanique des sous-thèmes existe déjà.

Deux usages naturels : les EPI se prêtent au vrai ou faux (« Le maçon porte un casque ») ;
ces fiches sont le cas d'école du principe « le livret à l'écran, les fiches en sortent ».
Lié aux vidéos métier de l'emploi du temps (lundi et jeudi).

---

# 6. LE PLAN — où on en est

1. ✅ **La barre et le rangement** — six rubriques, arborescence, style validé
2. ✅ **Fiches et jeux** — générateur, trois familles, loto, flashcards, regroupement
3. ✅ **Écriture** — réorganisée en deux entrées, aides au décodage en place
   (restent les gestes préparatoires et la cursive, tous deux « à construire »)
4. **Mathématiques** — les livrets à l'écran, les fiches qui en sortent
5. ⏳ **Lecture** — étape 2 faite (une page par phonème + « Aider un texte ») ; restent la Maison des sons et les séances manquantes
6. **La mémoire** — groupes, élèves, scores
7. **Ressources enseignantes** — ses étagères, « Donner en devoir » dans chaque rubrique

## Étape 3 — Écriture : FAIT

**La rubrique Écriture a deux entrées** : *Apprentissage* et *Créer une fiche*.
(L'ancien découpage en trois — Apprentissage / Mon cahier d'écriture / Créer une fiche —
était artificiel : les fiches de lettres sont aussi de l'apprentissage.)

Dans **Apprentissage**, une seule progression graphique de haut en bas :
en-tête gris dépliable **Les gestes préparatoires** (« 4 étapes ») contenant
*Les ronds · Les courbes · Les boucles · Les ponts*, toutes « à construire » ;
puis **Lettres script** (le cahier de 59 pages), **Lettres cursive** (à construire),
**Les chiffres**. La bande de cases A→Z / 0→9 ne s'affiche que sur les lettres
et les chiffres, jamais sur les gestes préparatoires.

Dans **Créer une fiche**, deux cartes, dans cet ordre :
- **Écrire un mot, une phrase ou un texte** — saisie libre ;
- **Livret** — porte une flèche et déplie la liste des thèmes sous elle (les thèmes
  parents se déplient à leur tour). Cliquer un thème affiche à droite ses pages
  **« Mes mots »** (image à gauche, mot en script à droite) en aperçu A4 imprimable.

L'écran donne la saisie, l'image (**aucune** par défaut · **importer** · **générer avec
l'IA**, grisée) et l'**interlignage** (petit · moyen validé · grand) sur une seule ligne,
puis le bouton **Aider à lire le mot**, l'aperçu A4, et trois icônes de 38 px :
imprimante verte · disquette grisée (Sauvegarder, à venir) · étoile orange (Favori).

La fiche imprimée reprend la mise en page des livrets : bandeau bleu nuit, consigne FALC
en aplat `#d8e6f4`, le mot en capitales dans un cadre bleu (image à gauche), puis les
bandes d'écriture en couleur, avec étayage dégressif (1re ligne modèle plein bleu,
2e pâle, 3e amorce, suivantes vides). Un texte plus large que la ligne laisse les bandes vides.

**Colonnes repliables** (gain de place, décidé après avoir écarté le menu horizontal —
21 entrées sur deux niveaux imposeraient des déroulants qui cachent la structure) :
la barre latérale se replie à **46 px** en gardant les six pastilles de couleur, celle de
la rubrique en cours cerclée d'orange, un clic rouvre le menu sur cette rubrique ;
la colonne « Mes collections » se replie de même (nom à la verticale) et se replie
**automatiquement** dès qu'une collection est choisie.

---

## Les aides au décodage — FAIT (étape 1 du chantier lecture)

Moteur dans **`lecture-code.js`**, écrit pour le projet. **Aucun code externe** :
LireCouleur est sous GPL, on n'en reprend que les principes pédagogiques — recopier
leur code forcerait l'appli entière sous GPL, ce qui est irréversible.
Attention aussi : les 52 mots repères viennent d'un ouvrage **© Retz** — la liste des
associations ne pose pas de problème, leurs **dessins** oui. D'où les photos maison.

### Table des mots repères
Les **52 graphies de son affichage classe** (Retz, *Boîte à outils pour l'apprentissage
du code en lecture-écriture*), **dans l'ordre du mur**, pas alphabétique.
Sa table remplace celle qui existait dans l'appli, faite avec d'autres mots.

**24 photos présentes** dans `clean/`. **28 manquantes** — la graphie reste colorée,
sans vignette et sans réserver de place, jusqu'à réception de la photo :
in→lapin · eau→chapeau · ion→lion · en→cent · oin→point · ê→tête · or→tortue ·
ein→ceinture · ui→huit · et→bonnet · elle→pelle · ei→reine · ien→chien · gu→guitare ·
gn→peigne · erre→terre · es→escargot · aille→médaille · ouille→citrouille ·
eille→abeille · em→embrasser · ss→tasse · t→addition · œu→nœud · esse→princesse ·
ge→pigeon · om→pompier · im→timbre

« er » a deux repères : *cahier* en fin de mot, *vert* devant une consonne.
« œu » aussi (nœud / œuf) : le premier de l'affichage par défaut.
**N'utiliser que ce qu'elle a envoyé** — ne rien ajouter, ne rien remplacer.

### Les cinq aides
Toutes **décochées** par défaut, dans une **boîte de dialogue** ouverte par le bouton
« Aider à lire le mot » (qui affiche l'état courant en résumé). Chaque case porte son
**propre exemple**, rendu avec l'aide appliquée — on voit ce qu'on coche :

| Aide | Exemple de la case | Rendu |
|---|---|---|
| Étiquettes de mots | le cahier rouge | chaque mot dans un cadre |
| Couleur des syllabes | ordinateur | alternance bleu `#1d4e89` / rouge brique `#c1440e` |
| Lettres muettes en gris | le canard | `#9aa4b2` |
| Arcs sous les syllabes | ordinateur | arc porté par la syllabe, à sa largeur exacte |
| Mots repères | rouge | photo 7 mm au-dessus de la graphie |

Les cases cochées sont **mémorisées** (`upe2a-aides`) : c'est un réglage.
Le panier de pages à imprimer, lui, **repart de zéro** à chaque session : c'est un panier.

### Règles tranchées avec elle — ne pas y revenir
- Le **e final reste noir**. Le griser laisserait croire qu'on peut l'oublier en écrivant.
- On marque les **autres** muettes : canar**d**, peti**t**, les chien**s**, ils mang**ent**.
- Les **muettes internes** sont grisées : ca**h**ier, **h**iver, t**h**éâtre, lon**g**.
  Le *h* de **ch**at et **ph**oque reste noir : c'est une graphie, pas une lettre muette.
- ⚠ *beaucoup* : seul le **p** est muet, le *c* se prononce (beau-coup). Erreur commise, corrigée.
- **Pas de liaisons.** LireCouleur écrit « il stravaillent », « prè sn est » : dangereux
  pour des élèves qui construisent l'orthographe.
- L'**interligne est calculé** selon les aides cochées (1,5 · 1,9 avec arcs · 2,5 avec
  mots repères) : pas de réglage manuel. Leur réglage 1,5/2/2,5/3 existe parce qu'ils
  travaillent dans Word et ne savent pas quelles aides sont posées ; l'appli le sait.
- Ne pas confondre leur « interligne » (espace entre lignes d'un texte **à lire**) et son
  « interlignage » Petit/Moyen/Grand (hauteur du lignage Seyès **à écrire**).
- Un **mode noir et blanc** doit rester lisible : les muettes en gris et les arcs
  fonctionnent sans couleur.

### Corrections à la main
- `gom-me` — les tirets **forcent** la coupe.
- `canar(d)` — les parenthèses **forcent** une lettre muette.

### Signalement des cas douteux
Encadré ocre sous l'aperçu, listant les mots que les règles ne tranchent pas, avec le
découpage proposé et la question : « ent » final (ciment / mangent) · « ill » (fille /
ville) · consonne finale (bus / puits) · « gu » (guitare / aiguille) · mots de plus de
12 lettres. **Promesse faite** : dire quand un cas dépasse les règles, plutôt
qu'imprimer une bêtise.

### Découpages vérifiés
ca-nard · cra-yon · ca-hier · chaus-su-re · clas-seur · tor-tue · es-car-got ·
or-di-na-teur · ta-bleau · mai-tresse · man-gent · beau-coup.
Concordent avec LireCouleur sur les pièges testés.

---

## Le chantier lecture — étapes 2 à 4, décidées, non commencées

### Étape 2 — FAIT

`lecture-sons.js` → `window.LECTURE_SONS` : table des **34 phonèmes** (clé telle qu'elle la
tape dans la progression, notation, graphies, mots repères Retz + photo, geste, lot de
pages de la séance, famille), découpage d'un mot en graphies et `contient(son, mot)`.
Règles assumées : *s* entre deux voyelles = [z], *c* et *g* devant e/i/y adoucis, *t* de
« -tion » = [s]. Le reste est une approximation déclarée, pas une vérité.

La rubrique Lecture a maintenant : **Les sons** · **Aider un texte** ·
👁 Réglages lettres et sons · Séances de phonologie.

« Les sons » garde l'ajout, l'ordre et le retrait, mais **chaque son ouvre sa page**
(écran `son`, clé `sonCle`) qui rassemble : la graphie en gros + la notation + écoute ·
le mot repère avec sa photo (ou « photo à venir ») · le geste Borel-Maisonny (a, i, o
seulement) · toutes les graphies du son en capitale, script, Belle Allure script et
cursive · la séance de phonologie (vignettes A4 + Imprimer si les pages existent, sinon
« à construire ») · la Maison des sons (en attente de l'image) · **les mots des thèmes où
on entend ce son**, cliquables pour les écouter. Flèches ← → pour passer au son suivant
dans l'ordre de la progression.

**Fiches et jeux du son** (décidé avec elle) : la page du son reprend **le même menu que
Fiches et jeux du lexique** — deux onglets pour l'instant, *Pour l'élève* et *Jeux en
ligne*, mêmes cases à cocher, mêmes vignettes, même panier global (les flèches ← → entre
sons remplacent la liste de gauche : on coche, on passe au son suivant, on imprime tout).
Choix tranché : les onglets vivent **sur la page du son**, pas dans un écran séparé.

⚠ L'onglet **Ateliers à manipuler a été retiré de la page du son** : les ateliers du lexique
(loto, étiquettes, imagier) n'ont pas de sens pour un phonème. Décision prise avec elle :
**deux fichiers d'ateliers séparés** — `fiches-themes.js` garde ceux du lexique, et les
ateliers propres aux sons iront dans un fichier à part (maison des sons, assemblage
syllabique, découpage phonémique…), le jour où on les construit.

Dans « Jeux en ligne », une **étiquette « La maison du [x] »** (petite maison au toit bleu)
ouvre le jeu refait dans l'application, au-dessus des liens LearningApps / Wordwall.

Les fiches génériques (relier, écrire, étiquettes, loto, imagier, cartes) sont fabriquées par
`fiches-themes.js` sur **les mots des thèmes qui portent ce son**. `sons-fiches.js` ajoute la
**séance de phonologie** (2 pages : en-tête mot repère / oreille + son / geste, puis les
graphies ; J'écoute je répète · J'entends ? je coche, 8 images sans le mot, moitié d'intrus ·
Je lis j'entoure, grille de 27 · les syllabes) et la **combinatoire** (consonnes seulement).
Les six mots sont **tirés au hasard** parmi les mots illustrés portant le son, avec « autre
tirage » et une croix par mot pour le remplacer ; un mot déjà utilisé ailleurs peut resservir.
⚠ Les séances **A, I et O recopiées à la main ne sont pas regénérées** : elles s'affichent
telles quelles, le moteur ne sert qu'aux sons suivants.

« Aider un texte » : texte collé + consigne, les **cinq aides** (mêmes cases mémorisées
`upe2a-aides` que Créer une fiche), interligne **manuel** (serré 1,5 · normal 2 · aéré 2,5 ·
très aéré 3) et taille (18 · 24 · 30 pt), aperçu A4 sans lignage d'écriture, encadré ocre
des cas douteux, impression.

**Étape 2 — architecture Lecture, une entrée par phonème.**
« Progression des sons » ne sert à rien aujourd'hui : c'est une liste ordonnée que
**rien ne consomme** (l'écran l'avoue lui-même). Ne pas la supprimer — la **retourner** :
elle devient la colonne vertébrale de la partie Lecture. Chaque son ouvre sa page,
qui rassemble ce qui est aujourd'hui éparpillé : la graphie et ses variantes (on, om) ·
le mot repère et sa photo · le geste · la Maison des sons · la séance de phonologie ·
les mots des thèmes contenant ce son.

Conséquence : la grille des 52 mots repères n'ira **pas** dans Réglages lettres et sons
(proposition abandonnée) — le mot repère vit dans la page de son phonème, là où on le
cherche. « Réglages lettres et sons » se réduit alors aux ateliers visibles.

Y ajouter un écran **« Aider un texte »** : on colle un texte, on coche, on imprime —
sans lignage d'écriture, juste le texte en grand. C'est là que le réglage **manuel** de
l'interligne devient pertinent (l'idée de LireCouleur).

Renommer le bloc selon l'écran : « Aider à lire le mot » en Écriture, « Les aides » en Lecture.

**Étape 3 — la Maison des sons**, reconstruite comme atelier de l'appli (score remontant
dans Bilan des exercices), sur le modèle du [ON], **déclinable aux autres phonèmes** —
elle sert de maquette. Source : `troa-code.github.io/TROA-code` (LE SONS ON /
1-maison des sons). **En attente : son image de maison.**

**Étape 4 — génération automatique des pages « Mes mots ».**
Aujourd'hui les pages affichées au clic sur un thème sont **figées** (`fiches-source.js`) :
un mot ajouté à un thème n'y apparaît pas, et un thème sans page prête (Les contraires)
retombe sur l'éditeur mot par mot. À remplacer par une génération à la volée depuis les
mots vivants des thèmes.

Ce que les pages figées contiennent déjà, à reproduire : bandeau coloré au titre en Caveat
(couleur propre au thème), consigne « Recopiez le mot à la suite », grille de 9 lignes
(image + mot en capitales à gauche, lignage Seyès avec mot en pointillé à droite),
découpage en « Les fruits » / « Les fruits 2 », et quelques ajouts ponctuels (La politesse
porte un semainier).

⚠ **Déterminant obligatoire — jamais « POMME » seul.** L'ajouter s'il manque
(« UNE POMME », « DU PAIN », « LES CISEAUX »). Il fait partie du texte du mot dans
Création de thèmes, donc corrigeable au cas par cas. Ne pas deviner un genre incertain :
lui donner la liste à trancher.

⚠ **L'alternance de couleur syllabique du Matériel scolaire doit être conservée** : c'est
l'un des premiers thèmes et elle prépare le découpage syllabique. Prévoir un réglage
par thème (question posée, non tranchée : sur tous les thèmes ou seulement les premiers ?).

Sans image pour un mot, laisser la case **vide exprès** — l'élève dessine.

## À rappeler à l'utilisatrice (elle a demandé qu'on le lui rappelle)

**L'ordre des thèmes du tableau élève** est à revoir. Référence retenue : l'ordre de
Silvia Camara (dansmavalise-fls.com), du plus urgent au plus large — se présenter, les
consignes, les lieux de l'école, le matériel scolaire, les couleurs, les jours, puis les
verbes, les aliments, les vêtements, le corps. À adapter au public 16-18 ans :
**Les métiers passe avant Les vêtements**. Attendre son ordre à elle.

**Les champs par thème** : aujourd'hui J'écoute / Je lis / Je parle / J'écris sont
**globaux**. Elle a signalé vouloir parfois les quatre pour un thème et un seul pour un
autre. Trois pistes proposées, décision reportée (« pas ma priorité du moment ») :
réglage par thème avec valeurs par défaut · réglage par niveau · ne rien changer et
utiliser les liens de devoirs.

## Chantiers évoqués, non commencés
- **Combinatoire** : exercices de syllabes dans l'application, adossés à la progression.
- **Enregistrements de l'enseignante** pour remplacer la voix de synthèse, qui prononce mal
  les graphies isolées (« ch » sonne comme la lettre).
- **Documentation** : deux documents prévus, un mode d'emploi pour elle et une
  documentation technique — écrits **au fil des étapes**, pas à la fin.
- **Sortir les données** de l'application dans un fichier séparé, au moment où on y touche.

## En attente d’elle

- Les **28 photos** de mots repères manquantes (liste ci-dessus).
- L’**image de maison** pour la Maison des sons.
- Le **retour de classe** sur la qualité des découpages syllabiques.
- L’ordre des thèmes du tableau élève.
