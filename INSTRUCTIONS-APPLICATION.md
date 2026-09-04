# INSTRUCTIONS — UPE2A NSA (fichier unique)

Phrase pour démarrer : « Lis INSTRUCTIONS-APPLICATION.md, on reprend. »

Ce fichier est **la seule source à jour**. Il remplace `INSTRUCTIONS.md`,
`INSTRUCTIONS-FRANCAIS.md` et `INSTRUCTIONS-MATHS.md`, tous supprimés. Raison :
**le français et les maths sont intégrés dans l'application** — les livrets papier
deviennent des sources de contenu que l'application met en page et imprime à la demande.
Trois conversations séparées n'ont plus de sens.

## Là où on s'est arrêtés (04/09)

À reprendre en priorité, dans cet ordre :
1. **Le thème « Les métiers »** — elle génère les images, elle n'a pas fini ; rien n'est
   publié. Voir la section « Thème Les métiers — EN COURS » : les 9 déjà rangées, les 11
   qui manquent, et les deux réserves (texte parasite sur `mot-caissier`, trois images en
   format large). Quand ce sera complet : créer le thème dans `BANQUE` + `THEMES` et
   remplacer le cadre « langues » de la carte par le métier (« Il veut être mécanicien »).
2. **`mot-drapeau`** — la vignette neutre manque ; en attendant, c'est le drapeau du
   Portugal qui sert de repère en coin des cases « pays » de la carte. Le prompt lui a été
   donné.
3. **La feuille de route n° 1** — livrée, elle voulait la retravailler plus tard.
4. **Les tests non rangés** : maths fin de cycle 2 (exercices 7 à 9 devinés), et les
   livrets de lecture Canopé, dont je n'ai pas les corrigés. Elle doit aussi revérifier
   **l'angle de l'exercice 15** du maths cycle 3, au rapporteur (124° officiel, elle a
   trouvé 146° sur sa feuille imprimée).
5. **Les verbes** — classement en quatre familles proposé et accepté (consignes de classe ·
   quotidien · déplacement · travail et loisirs), 26 images à fabriquer, aucune envoyée.

## Refusé — ne pas y revenir sans son accord
- **Refonte graphique de l'interface (01/09)** : elle trouve que « le graphisme fait trop IA »
  mais **n'a pas aimé** la version durcie que j'ai proposée (angles droits, filets de couleur
  à la place des pastilles, intertitres en minuscules, plus d'ombres portées) — tout a été
  remis en l'état. Acquis de la discussion : elle veut **« pro, sans qu'on sente l'IA »**,
  elle veut **garder une couleur par rubrique dans le menu**, le chantier ne concerne que
  **l'espace enseignant**, et elle n'a **pas de modèle** en tête. Reprendre ce sujet
  seulement quand elle le relance, et en montrant plutôt qu'en interrogeant.

## Le dossier d'élève — un seul parcours en quatre temps (refonte 01/09)

Elle ne comprenait pas la différence entre « Accueil d'un élève » et « Passer un test »,
et elle avait raison : les deux écrans faisaient les deux bouts du même geste sans se
parler (deux listes d'élèves, deux échelles, et rien pour saisir un test Canopé).

**Un seul écran, quatre étapes cliquables** : ① **La fiche** (dépôt du PDF EANA, ou
ouverture à la main avec nom / prénom / naissance / langue) · ② **Le test** (les tests
proposés, bouton « Je l'ai donné », la base des tests, la traduction) · ③ **Les résultats**
(la grille des exercices à l'échelle du test passé, bilan et pourcentages par domaine) ·
④ **La préconisation** (les champs de la fiche, pré-remplis d'après les résultats, et le PDF
rempli à télécharger).

`positionnement-dossiers.js` (`window.DOSSIERS`) tient les dossiers dans le navigateur
(`upe2a-dossiers`) : identité, classe d'âge, tests donnés avec leur date et leur langue,
scores par exercice, synthèse. **Les deux échelles cohabitent sans se mélanger** : un test
Canopé se note MI/MF/MS/TBM, un test CASNAV Lyon NE/--/-/+/++ ; chaque test garde la sienne
et le bilan se calcule dedans.

Les **exercices sont décrits pour les tests qu'elle a envoyés** (écrit fin de CM1, CM2, 6e :
items 1-5, 6-10, 11-15 ; maths fin de cycle 2 : les 9 exercices), avec leur **domaine** —
c'est ce qui permet de pré-remplir les cases de la fiche EANA. Pour les tests pas encore
reçus, une grille générique marquée « intitulé à préciser » : à remplacer à mesure
qu'elle envoie les tests.

**« Passer un test » a été retiré du menu (01/09)** : les tests Lyon se saisissent
maintenant à l'étape ③, comme les autres. Son code reste dans le fichier, inutilisé — si
elle veut le remettre, ce sera dans une rubrique **Positionnement classe** (le premier
étant *Positionnement CASNAV*), en assumant le doublon. Les saisies de l'ancien écran
n'ont **pas** été reprises : décision d'elle, « on repart de propre ».

**Ce que chaque test sait conclure** (tranché avec elle le 01/09) — les deux échelles ne
mesurent pas la même chose et l'écran ne doit pas les faire dire la même chose :
- **Canopé dit où en est l'élève.** Un niveau est atteint quand **plus de la moitié des
  items sont acquis** (MS ou TBM) — c'est **un comptage d'items**, pas une moyenne de
  points : deux MI et trois MS donnent « atteint ». Conclusion affichée : « Niveau fin de
  CM2 non atteint ». Quand plusieurs niveaux ont été passés, `niveauAtteint()` en tire la
  phrase de la fiche : « Lit au niveau fin de CM1 (fin de CM2 non atteint) ».
- **Lyon dit où orienter** : on reprend tel quel le palier des grilles CASNAV
  (« Palier conseillé : CAP »), calculé par `positionnement.js`.
- **Les maths n'ont qu'un test par cycle**, donc pas de niveau fin : la conclusion est
  « niveau cycle 3 non atteint » **plus le détail par domaine** (sa demande explicite),
  chaque domaine vert ou rouge selon le même seuil de la moitié. Les quatre domaines
  remplissent les quatre cases « Mathématiques » de la fiche EANA.

⚠ **On ne conclut jamais sur un test à moitié noté.** Deux items acquis sur cinq notés ne
disent rien du niveau, et cette phrase part ensuite dans un **document officiel** :
tant que tous les exercices ne sont pas notés, l'écran affiche « 2 items notés sur 5 —
conclusion en attente » et la fiche ne reçoit rien. (Défaut trouvé en vérification le
01/09, corrigé — ne pas le réintroduire.)

## Accueil d'un élève — la fiche EANA et le choix du test (nouveau 01/09)

Écran `APPLI - Accueil d'un élève.dc.html`. Trois fichiers :
`positionnement-eana.js` (lecture et remplissage de la fiche), `positionnement-tests.js`
(la base des tests), l'écran lui-même.

**Acquis technique : la fiche d'accueil EANA 76 est un PDF à formulaire, ses 77 champs
sont lisibles ET remplissables.** L'appli lit ce que le CIO a saisi (identité, parcours,
langues, positionnement) et réécrit dans les mêmes cases : elle rend le PDF officiel
rempli, pas une copie. Les listes déroulantes du PDF imposent leurs valeurs (CIO,
évaluateur, niveau scolaire global, niveau de français, préco classe, accompagnement) :
l'appli n'en propose pas d'autres. ⚠ Les noms de champs contiennent les accents échappés
(`Pr#C3#A9nom`) : ne pas les « corriger ».

**Le parcours voulu** (dit le 01/09) : on dépose le document → l'appli lit nom, prénom,
âge → elle propose le test **selon l'âge**, pas Lyon +16 par défaut → test en **langue
d'origine** (maths + écrit) → puis, seulement si l'élève parle et écrit le français, test
en français. Objectif affiché : **gagner du temps**, « c'est beaucoup trop long ».

**Règle de choix, telle qu'elle la formule** : plus de 16 ans → test +16 ; **sauf non ou
peu scolarisé antérieurement**, qui prend le pas sur l'âge et appelle un autre test.
Moins de 16 ans → le cycle de la classe d'âge (11 ans = 6e), avec repli d'un cycle si
l'élève décroche. Cas vécu : Leila, 10 ans, finlandaise, sans le niveau de sa classe d'âge.

**La base des tests** : elle ne recopie aucun test, elle dit lequel existe, en quelle
langue, à quel niveau, et où le prendre — les PDF restent ceux de Canopé / du CASNAV ou
ceux qu'elle dépose. Contenu au 01/09 : les tests Canopé **un par niveau** (compréhension
de l'écrit et maths, de fin de CP à fin de 3e), les deux tests CASNAV Lyon déjà dans
l'appli, et une entrée **« NSA — à construire »** qui est le vrai trou de la base.

⚠ **Un niveau = un test**, et **rien d'automatique** : on commence au niveau de la classe
d'âge, et **si c'est trop dur on redescend**. Pour Leila (10 ans) : fin de CM2 essayé
d'abord, trop dur, donc fin de CM1. Ce n'est **pas** « on agrafe les deux » (formulation
que j'ai inventée le 01/09, corrigée) : c'est elle qui juge sur pièce. L'appli propose le
niveau de la classe d'âge et garde celui du dessous sous la main.

**26 langues** chez Canopé (albanais, allemand, anglais, arabe, arménien, bulgare,
chinois, dari, espagnol, français, géorgien, italien, macédonien, monténégrin, pachto,
polonais, portugais, roumain, russe, serbe cyrillique et latin, tamoul, tchétchène, thaï,
turc, ukrainien). **Pas de finnois** — d'où l'anglais donné à Leila. ⚠ **Sa langue de
scolarisation est le finnois** (confirmé le 02/09, elle a été scolarisée en Finlande) : ce
qu'on a mesuré est donc sa lecture **en anglais**, une langue de l'école mais pas celle où
elle a appris à lire — le résultat sous-estime probablement ce qu'elle sait faire, et la
case « Lecture en langue de scolarisation » doit le dire tel quel.

À venir : **elle alimente la base au fur et à mesure** de ses envois. Reçu le 01/09 :
les deux tests de compréhension de l'écrit de Leila (fin de CM2 puis fin de CM1, anglais,
15 exercices, échelle MI/MF/MS/TBM). La **saisie des réponses** est faite (02/09, section
ci-dessous) ; reste, « le top du top », **le scan d'un test rempli** relu automatiquement —
et là il faut être franc : l'appli tourne dans le navigateur, elle ne sait pas relire une
photo. Reconnaître des ronds tracés au stylo est de l'analyse d'image, un autre chantier,
moins fiable qu'elle ou moi. En attendant, elle **m'envoie la photo dans la conversation**
et je lis la copie.

**La base se lit en trois colonnes** (sa demande, 01/09) : **Langue d'origine** (bleu nuit,
la compréhension de l'écrit Canopé) · **Mathématiques** (ocre clair à encre brune — l'orange
de rubrique ne passe pas sous du texte blanc) · **Français** (vert). Les maths Canopé sont
aussi en langue d'origine : elles restent dans la colonne Mathématiques.

**Attendu d'elle** : sa **feuille de décodage** pour le test en français (quelques voyelles
et consonnes, quelques syllabes), annoncée le 01/09 — c'est la seule chose qu'elle donne
aux débutants en français, la colonne Français n'a sinon que le test Lyon fin de cycle 4.
Et son **test NSA** de plus de 16 ans.

⚠ Les textes affichés dans l'écran s'adressent **à elle** (« le test que tu donnes ») :
ne pas y recracher les `note` de `positionnement-tests.js`, qui sont écrites pour ce
fichier d'instructions et parlent d'elle à la troisième personne.

## Les résultats rangés sous les mêmes bandes que les tests (fait 02/09)

Elle proposait trois boutons en tête de l'étape 3 (langue de scolarisation · français ·
maths). Réponse donnée : des boutons de filtre sur deux ou trois cartes font surtout des
écrans vides et ajoutent un clic — les **bandes** de l'étape 2 disent la même chose sans
rien à cliquer. `vals.blocsResultats` reprend donc les quatre bandes (bleu langue de
scolarisation, orange maths, vert français, violet « autres tests »), chaque passation
portant `bloc`, et la carte prend la couleur de sa bande. Une bande sans test ne
s'affiche pas.

## Les accents dans la fiche téléchargée (corrigé 02/09)

« Scolarité conforme à la classe d'âge » sortait **« ScolaritÈ conforme ‡ la classe
d'ge »** dans le PDF téléchargé. Cause : les champs de la fiche d'origine sont décrits
avec une police en encodage **MacRoman**, et pdf-lib y écrit des octets WinAnsi (é = 0xE9
relu « È », à = 0xE0 relu « ‡ », â purement perdu). `EANA.remplir()` embarque donc sa
propre Helvetica (`doc.embedFont(StandardFonts.Helvetica)`) et appelle
`form.updateFieldAppearances(police)` **après** la saisie, ce qui regénère l'apparence de
tous les champs avec une police WinAnsi. À vérifier sur un téléchargement réel à chaque
fois qu'on touche à ce fichier.

## « Très bonne maîtrise » : ne pas l'écrire sur un texte mal compris (fait 02/09)

Sur Khadissatou, le brouillon écrivait « a une très bonne maîtrise de la langue française
(compréhension et expression) » + « classe ordinaire sans dispositif de soutien
linguistique », alors qu'elle passait à côté de la **compréhension fine** d'un texte. La
cause : ces phrases ne dépendaient que de `niveauFrancais` (« parle couramment »), jamais
des résultats. L'appli calcule maintenant `ctx.finesse` à partir des domaines
**inférence** et **compréhension** du test de lecture (`fragile` dès qu'un des deux n'est
pas acquis), et le brouillon en tient compte à trois endroits :
« maîtrise la langue française à l'oral et lit avec fluidité. En revanche, la
compréhension fine d'un texte reste fragile… », la case « Compréhension écrite » le dit
aussi, et la préconisation devient « avec un accompagnement en compréhension de l'écrit —
la difficulté ne porte pas sur la langue parlée mais sur la lecture fine : un dispositif
UPE2A ne se justifie pas » (accompagnement : « Classe ordinaire avec soutien
linguistique »). Rien ne change quand les deux domaines sont acquis.
⚠ Piège traversé : Les Trois Frères n'avait pas d'entrée dans `DOSSIERS.EXERCICES`, donc
un seul domaine « autre » — le signal ne se déclenchait pas sur le dossier même qui avait
motivé la demande. Ses 17 exercices sont maintenant rangés par domaine (compréhension,
inférence, repérage, langue, expression — ce dernier ajouté à `DOMAINES`), ce qui sert
aussi aux pourcentages de l'étape 3. Et en filet, si un test n'est pas rangé par domaine,
`finesse` se lit sur les notes des exercices dont la rubrique est « compréhension
écrite ».

## Compréhension orale : des phrases toutes faites (fait 02/09)

Aucun test ne mesure la compréhension orale — c'est elle qui l'observe pendant
l'entretien, et elle réécrivait la phrase à chaque élève. Un **menu déroulant** au-dessus
de la case propose six phrases graduées, de « les échanges passent par une langue tierce »
à « comprend le français oral de la classe sans aide ». Le choix ÉCRIT dans la case, qui
reste librement modifiable : le déroulant ne retient rien (helper `propose()` à l'étape 4).
Si elle veut la même chose pour « Production orale », c'est une ligne à ajouter.

## ⚠ Ne plus jamais insérer de texte français par expression régulière

Trois pannes bloquantes le 03/09, toutes de la même cause : des lignes de `positionnement.js`
reconstruites au `replace`, avec des apostrophes françaises non échappées (`les conversions
d'unités`) puis des guillemets dépareillés (`,'nombres","…"`). Chaque fois le fichier
entier cessait d'être évalué, `window.POSITIONNEMENT` restait `undefined`, et TOUT le
positionnement disparaissait de l'écran. Règles :
– libellés français toujours entre **double quotes** dans ces tables ;
– après toute retouche de ce fichier, contrôler la syntaxe (`new Function(source)`) AVANT
de rendre la main ;
– vérifier aussi la liste voisine (`FR`), déjà touchée par un remplacement trop large.

## Les quatre cases maths restaient vides avec le test Lyon (corrigé 03/09)

Sur la fiche imprimée d'un élève de plus de 16 ans, les quatre cases « Mathématiques »
étaient **vides** alors que le test était noté — seule l'appréciation générale portait
une phrase. Cause : le test Lyon est noté par groupes d'orientation (socle · intermédiaire
· avancé), qui ne correspondent à aucune case de la fiche EANA, et il n'a pas de corrigé
saisi exercice par exercice. Chaque exercice de `MATHS` porte donc deux colonnes de plus :
sa **case de fiche** (nombres · donnees · grandeurs · geometrie) et son **libellé court**
(« les conversions d'unités », « le théorème de Pythagore et les aires »…).
`propositionsFiche` a une boucle dédiée pour les tests sans corrigé rangé.
⚠ Et surtout : la condensation ne triait que les notes **Canopé** (MI/MF/MS/TBM) — les
notes **Lyon** (`--`/`-`/`+`/`++`) ne tombaient dans aucun des deux paquets, donc les
quatre cases ressortaient vides (avec juste la puce « • », signe qu'une proposition
existait mais valait la chaîne vide). Les deux échelles sont maintenant reconnues ;
toute nouvelle échelle devra être ajoutée là. La condensation habituelle s'applique : « Maîtrise les opérations posées, le rangement des
nombres. Ne maîtrise pas le calcul de dérivées. »

## ✅ Premier envoi d'images rangé (03/09)

25 images fabriquées avec Gemini, rangées dans `clean/` : **9 portraits**
(`portrait-1` … `portrait-9`), 5 animaux (chien, lapin, poule, vache, mouton), et thé,
chocolat, pâtes, frites, musique, téléphone, danse, course, dessiner, mécanique, coiffure.
Toutes ramenées à 1000 px max, fond blanc aplati.
⚠ Le nommage repose sur l'ORDRE des pièces jointes de son message — à vérifier avec elle,
un échange de deux fichiers est vite arrivé.
Le thème **« Les animaux »** est créé dans `banque-mots.js` (9 mots). Les **9 cartes
fictives** de `CARTE - se présenter (visuelle).dc.html` sont désormais visuelles :
portrait + une image pour « il aime » et une pour « il n'aime pas ».
Restent à fabriquer : `mot-poulet` (retiré de la planche à découper en attendant, sa case
restait vide), `mot-famille` (qui doit remplacer mot-fille / mot-garcon / mot-femme /
mot-homme, des dessins enfantins), `mot-drapeau`, `mot-langues`, `mot-sport`,
`mot-metier`, `mot-lecture`, `mot-nombres`, `mot-etude-langue`, `mot-carte-monde`.

## ⏳ Images en cours — thème « Les animaux » et cartes fictives (engagement du 03/09)

Elle fabrique les images avec Genially d'après mes prompts, et me les envoie au fur et à
mesure. **Ce que je dois faire à chaque envoi** :
1. ranger l'image dans `clean/` sous le nom exact annoncé (`mot-<mot>.png`, sans accent,
   sans article), en remplaçant le fichier s'il existe déjà ;
2. l'ajouter au thème concerné dans l'espace enseignant (et dans `banque-mots.js`, la
   copie de service) ;
3. remplacer par l'image le texte correspondant sur les **9 cartes fictives** de
   `CARTE - se présenter (visuelle).dc.html`.
⚠ **Le thème « Les animaux » n'existe PAS dans la banque** (il est dans la liste `THEMES`
mais sans aucun mot) : il est à créer avec ses mots au premier envoi. Présents dans
`clean/` : chat, cheval, oiseau, poisson. Attendus : chien, lapin, poule, vache, mouton.
Attendus aussi : 9 portraits (`portrait-1` … `portrait-9`), et thé, chocolat, pâtes,
frites, musique, téléphone, danse, course, dessiner, mécanique, coiffure, carte du monde.

## Se présenter : la carte brise-glace (fait 03/09)

Point de départ : le jeu **cartes d'identité brise-glace** du CASNAV (PDF déposé), dont
les rubriques sont « fille ou garçon, prénom, âge, couleur préférée, animal de compagnie,
frère et sœur, il aime / il n'aime pas ». Ce que j'ai proposé de remplacer, et qu'elle a
suivi : plus d'animal de compagnie ni de couleur préférée (école primaire), mais le
**pays**, les **langues**, la **famille**, et « **plus tard, je voudrais** » ; la
**première personne** d'abord (la troisième sert à présenter un camarade, deuxième temps) ;
des **photographies**, jamais des dessins enfantins.
Deux fichiers :
– `CARTE - se présenter (visuelle).dc.html` — **celle qu'elle veut** : « comme pour les
primaires, c'est plus visuel et plus sympa ». Une image par question, la réponse à côté,
une carte par page, cadre photo en haut. Les images sont testées au chargement : celles qui
manquent sont **annoncées à l'écran** (avec le nom de fichier attendu) au lieu d'imprimer
des cadres vides, et une image de secours prend le relais quand il en existe une.
– `CARTE - se présenter.dc.html` — version sobre, format carte d'identité, **gardée pour
plus tard** à sa demande.
Images encore à fabriquer (prompts Gemini donnés le 03/09) : `mot-drapeau`, `mot-langues`,
`mot-famille`, `mot-sport`, `mot-metier`, et pour la feuille de route `mot-lecture`,
`mot-nombres`, `mot-etude-langue`.

## ⏸ À REPRENDRE — la feuille de route et la planche (mis en pause le 03/09)

Elle a demandé de **le lui rappeler comme une étape importante** : le chantier est en
pause, pas terminé. Ce qui reste :
– les **vignettes par défaut** ne sont pas toutes justes (« Les mois » = mot-janvier, une
galette des rois ; « Les jours » = mot-lundi, un post-it manuscrit) — et il manque de
vraies images pour **la lecture, les nombres, l'étude de la langue, se présenter** : à lui
demander, puis à ranger dans `clean/` ;
– vérifier sur une impression réelle que les deux colonnes tiennent sur une page avec les
vignettes de 13 mm ;
– relier les deux documents depuis l'espace enseignant (ils sont encore autonomes).

## La planche DES THÈMES (fait 03/09)

Deuxième chose reprise du Padlet du CASNAV (celui de Pouppez) : la **planche des
thèmes** — une image ou un pictogramme par thème, et **le nom du thème écrit dessous**.
⚠ Ce n'est PAS l'imagier d'un thème : j'avais d'abord fait la planche des mots d'un
thème, et elle a dit « non ! ». C'est la planche qui présente les thèmes eux-mêmes.
Fichier `PLANCHE - thème illustré.dc.html` (doc-page). On coche les thèmes (seuls
ceux qui ont au moins une image sont proposés), on nomme la planche, on choisit le
nombre d'images par ligne (2 pour le mur → 5 pour le cahier ; tailles suivent).
L'image d'un thème est celle de son premier mot dans la banque — ce qui donnait
« L'alphabet » illustré par un **ananas** et « Les mois » par une **galette des rois** :
un bloc « L'IMAGE DE CHAQUE THÈME » permet donc de cliquer la vignette qui représente
vraiment le thème (mémorisé par thème dans `upe2a-planche-themes`).
⚠ Piège de streaming : un `<img src="{{ hole }}">` dans un `sc-for` part en requête avec
le hole non résolu (erreur console + cadres cassés). Un `sc-if` autour de l'image
**n'y change rien** — les enfants fantômes sont streamés avant que la logique s'applique.
La solution est `hint-placeholder-count="0"` sur le `sc-for` qui contient une image.
Les mots viennent de `banque-mots.js`, une **copie de service** de la banque de l'espace
enseignant (`window.BANQUE_MOTS`, + ses mots de `upe2a-themes-perso`) : l'application
garde la sienne, on n'y touche pas — mais si elle ajoute des mots à la banque de base, il
faut refaire la copie. Réglages mémorisés dans `upe2a-planche`.

## Thème « Les métiers » — EN COURS (04/09)

Le cadre « langues » de la carte doit devenir **le métier qu'il veut faire** (elle a
choisi cette piste parmi quatre : métier · transport · ce qu'il sait faire · où il
habite). Phrase visée : « Il veut être mécanicien. »
Liste arrêtée : 22 métiers accessibles en CAP / apprentissage — bâtiment (maçon, peintre,
électricien, plombier, menuisier, soudeur), restauration (cuisinier, serveur, boulanger,
pâtissier), commerce et logistique (vendeur, caissier, magasinier, chauffeur-livreur),
soin et services (aide-soignant, agent d'entretien, coiffeur, esthéticienne), extérieur
(jardinier, agriculteur), plus mécanicien, couturier et l'informatique. Garçons et filles
alternés, avec des filles sur l'électricité, la soudure et l'agriculture — « ça change ce
que les élèves se croient permis ».
**Déjà rangées dans clean/** (04/09) : `mot-macon`, `mot-peintre`, `mot-electricien`,
`mot-plombier`, `mot-cuisinier`, `mot-serveur`, `mot-boulanger`, `mot-aidesoignant`,
`mot-caissier` — plus `mot-mecanique`, `mot-coiffure`, `mot-docteur`, `mot-ordinateur`
qui existaient déjà.
**Reste à fabriquer** : menuisier, soudeur, pâtissier, vendeur, magasinier, livreur,
agent d'entretien, esthéticienne, jardinier, agriculteur, couturier.
⚠ Trois réserves sur les images reçues : **`mot-caissier` porte du texte parasite**
(badge « NATHALIE / CAISSIÈRE », briques « LAIT » et « PÂTES ») alors que le prompt
l'interdisait ; et `mot-macon`, `mot-electricien`, `mot-caissier` sont en format large
(1000 × 545) et non carré — acceptable dans une case en `contain`, mais moins homogène.
**Elle n'a pas fini de les générer : rien n'est publié.** Le thème « Les métiers » n'existe
donc pas encore dans `BANQUE`, et la carte garde le cadre « langues ». À reprendre quand
elle enverra la suite.

## Thème « Les pays, les langues » (créé 04/09)

Les cartes « se présenter » ne parlent plus de la **famille** ni de l'**animal** : « ça
peut être un sujet délicat » pour ses élèves, et les animaux ne l'intéressaient pas. Les
deux cases du haut deviennent **le pays d'origine** (drapeau) et **les langues parlées**.
D'où un thème nouveau dans `BANQUE` (espace enseignant) et dans `banque-mots.js` :
« Les pays, les langues » — Portugal, Espagne, Italie, Maroc, Algérie, Turquie, Pologne,
Brésil, Vietnam (des pays « classiques », pas l'Érythrée), plus `drapeau` et `langues`
pour les vignettes.
⚠ **Exception assumée** à la règle « pas de texte dans les images » : le **nom du pays est
écrit sur le drapeau**, elle l'a demandé explicitement. Un drapeau seul ne se reconnaît pas.
Les **10 images sont arrivées le 04/09** (9 drapeaux + `mot-langues`, deux jeunes adultes
et deux bulles vides) : le thème est publié dans l'application. Deux réserves à lui
signaler : « ALGERIE » est sans accent sur l'image, et `mot-drapeau` (vignette neutre)
manque — c'est le drapeau du Portugal qui sert provisoirement de repère en coin des cases
« pays », et le mot « un drapeau » n'est pas dans le thème (un mot sans image = carte
blanche chez l'élève).
Sur la carte, les **langues sont dites par des drapeaux** elles aussi (pays d'origine +
autre langue parlée) : une bulle de dialogue ne distingue pas deux langues. Les neuf
personnes fictives viennent donc des neuf pays fabriqués (João, Lucía, Marco, Youssef,
Nadia, Emre, Kasia, Paulo, Mai) et la planche à découper a une seule rangée « MON PAYS,
MES LANGUES ».
Le jeu se rangera dans le thème « Se présenter » de l'espace enseignant, avec les
documents à imprimer.

## La carte « se présenter » : le format du modèle, sans un seul mot (fait 04/09)

Elle a envoyé la carte du CASNAV en photo : liseré doré, photo en haut à gauche, prénom et
âge dans un cadre arrondi, étoile orange à droite, puis **quatre cadres arrondis en
pointillés** (famille · animal · ❤ aime · ❤ barré n'aime pas). Consigne nette : « retire
tous les mots pour ne laisser que les images ».
`CARTE - se présenter (visuelle).dc.html` reprend donc ce format à l'identique, et chaque
cadre est marqué d'une **vignette en coin** (mot-fille, mot-chat, coeur-aime,
coeur-aime-pas) — c'est elle qui dit de quoi parle le cadre, puisqu'il n'y a plus de
libellé. Les neuf cartes fictives suivent le même dessin : portrait, « AMADOU, 17 ans »,
étoile de couleur, et des images dans les quatre cases (le récit écrit — pays, langues,
projet — a disparu : c'est l'élève qui le fabrique à l'oral). La planche à découper n'a
plus de mot sous les images.
Le bouton **« Images seules / Avec les mots »** remet tous les textes pour un élève déjà
lecteur ; le défaut est muet. Les deux autres boutons restent indépendants : la personne
(je / il-elle) et le prénom caché pour la devinette.

## La feuille de route par thèmes (fait 03/09)

Elle a repéré sur le Padlet « Planches thématiques FLSCO » (CASNAV) une feuille de route :
une liste de thèmes, deux colonnes « À travailler / Validé le », un prénom. Elle veut la
même avec SES thèmes. ⚠ Le Padlet ne se lit pas de l'extérieur (contenu chargé en JS) :
c'est elle qui a déposé le PDF.
Ses choix : **quatre cases par thème — écouter · parler · lire · écrire** (elle a rappelé
que « parler » manquait à ma proposition), une **sélection des thèmes avant impression**,
et le **prénom laissé vide**, à remplir à la main. Niveaux : non tranché, la feuille n'en
a donc pas pour l'instant.
Fichier : `FEUILLE DE ROUTE - thèmes.dc.html` (doc-page, imprimable tel quel). Le
sélecteur est masqué à l'impression ; les thèmes viennent de la liste de l'application,
de ses sous-thèmes, et de `upe2a-themes-perso` (ses thèmes créés) — chacun n'apparaît
qu'une fois.
**Deux colonnes, comme le modèle** (03/09) : elle a redéposé le PDF en disant « je veux
un truc comme ça !! ne va pas trop loin » — donc la forme du CASNAV à l'identique : les
THÈMES à gauche, l'ALPHABET ET LES OUTILS à droite (Les lettres 1/2/3, La lecture, Les
nombres, Les mathématiques, L'étude de la langue, Outils et documents, Les arts visuels),
et pour chaque ligne les deux colonnes « À travailler » et « Validé le ». Les quatre
cases écouter/parler/lire/écrire sont donc abandonnées.
⚠ **Une ligne par thème, jamais une ligne par mot.** J'avais détaillé « Les mois » en
janvier, février… : « je veux pas tous les mots, juste une planche qui ressemble à celle
de Pouppez ». La feuille reste donc une liste de thèmes.
**Plusieurs feuilles, une par période** (03/09) : `upe2a-feuilles-route` garde la liste
`{nom, sousTitre, themes}`, on choisit la feuille en haut, on la renomme, on en crée
d'autres. L'ordre des lignes imprimées suit l'ordre de ses clics : c'est sa progression.
La **n° 1, première période**, est livrée avec ses thèmes : politesse, se présenter, les
jours, les mois, les saisons, l'école. À relier depuis l'espace enseignant quand elle
l'aura validée.

## Test d'orientation : citer les niveaux réussis de bas en haut (fait 03/09)

L'appréciation générale a écrit « Réussit les exercices du socle (niveau CAP) ; les
exercices de niveau première et terminale. » alors que le niveau intermédiaire n'était
PAS atteint — trois exercices réussis tout en haut ne disent rien du niveau réel, et la
phrase se contredit. On ne cite donc que la **suite continue** de niveaux atteints en
partant du socle : au premier niveau non atteint, on s'arrête. (Les tests Canopé, eux,
listent tous leurs domaines : ils ne sont pas hiérarchisés.) Et pas de virgule à
l'intérieur d'un libellé — « les exercices du socle (niveau CAP) », séparateur « ; ».

## Réponses attendues : ni modèle, ni bloc compact (03/09)

Deux règles de présentation pour `attendu`, demandées coup sur coup :
– **une ligne par item** (`\n`, affiché en `white-space: pre-line`) : « 10² × 10⁴ × 10¹⁰ =
10¹⁶ · 10⁸ ÷ 10⁵ = 10³ · (10⁴)⁻² = 10⁻⁸ » sur une seule ligne était illisible ;
– **jamais la réponse du calcul modèle** déjà résolu sur la feuille — elle s'y perdait en
comptant les items. Retiré aux exercices 14 (x = 3), 13 (le point A) et 19 (le vecteur u).
– **rien qui ne soit une réponse** : ni consigne (« puis placer D, E et F »), ni
description (« variations : flèches, x et images »), ni redite de l'énoncé (« 3 carreaux
= 100 km, donc… » → « 600 km »). Ce qui relève du geste à vérifier vit dans les paliers.
Les 20 exercices du test Lyon ont été repris dans ce sens.

## ⚠ Les exposants ne sortent pas des PDF (03/09)

À l'extraction du texte, les exposants et indices des PDF Lyon deviennent « ! » :
« 10!×10!×10!" = 10!" ». J'avais donc **inventé** les réponses de l'exercice 9 (puissances).
Rétabli : elle a dicté les trois lignes de l'exercice 9 depuis sa feuille — 10² × 10⁴ × 10¹⁰
= 10¹⁶ · 10⁸ ÷ 10⁵ = 10³ · (10⁴)⁻² = 10⁻⁸ — et les exercices 3 et 20
portent « à vérifier sur ta feuille : les exposants ne sortent pas du PDF ». Règle : pour
tout exercice à exposants, indices, figures ou éléments à relier, ne rien affirmer sans
qu'elle ait confirmé — ces cases partent sur un document officiel.

## Descendre les paliers aussi après 16 ans (fait 03/09)

Sur Ibrahim (Terminale), l'écran ne proposait que deux tests, sans aucun repli : « fin de
3e, mais si c'est trop dur je descends ». La branche `a >= 16` de `proposer()` pousse
maintenant les mêmes échelles descendantes que `cheminDeLaClasse()` :
lecture fin de 3e → fin de 4e → Buck (fin de 5e) → fin de 6e ; maths Lyon +16 → fin de 3e
→ fin de 4e → fin de 5e → fin de cycle 3 ; et **Les Trois Frères**, qu'elle cite comme
l'autre test de fin de 5e, en agrafe dans le bloc « français » (c'est un test en français,
pas en langue de scolarisation).

## « passé en bengali » : faux (corrigé 03/09)

La fiche annonçait « Test de mathématiques plus de 16 ans (orientation), passé en
bengali » : l'appli enregistre la langue de scolarisation de l'élève à la passation, sans
regarder si le test existe dans cette langue. Le test Lyon +16 n'existe qu'en français
(`multilingue: false`). `languePassation(test, pass)` renvoie donc « français » pour ces
tests, quelle que soit la valeur enregistrée — utilisé à l'étape 3 et dans la synthèse
maths. Les tests Canopé (26 langues) gardent la langue saisie.

## Deux fautes de rédaction sur la fiche officielle (corrigé 03/09)

Rappel de sa règle : ces cases sont lues par le CASNAV et par la famille.
1. **Jargon de code, deux fois.** L'appréciation générale écrivait « Points d'appui :
base. Fragilités : inter et avance. » — les clés de groupe du programme. `bilan()` prend
maintenant les libellés dans `POSITIONNEMENT.TESTS.maths.groupes`. Mais « Fragilités :
Intermédiaire (BAC PRO, 2de GT) et Avancé (1ère, Terminale) » ne voulait toujours rien
dire pour qui lit la fiche (« ça sert à quoi ? ») : un test d'orientation ne se lit pas en
domaines mais en NIVEAUX. D'où `TESTS.maths.phrases`, les mêmes groupes dits en clair, et
la phrase devient « Réussit les exercices du socle, de niveau CAP. » — et **rien de plus** :
elle a fait retirer la liste des niveaux non atteints le 03/09 (le palier conseillé le dit
déjà, et l'énumération se lisait comme un jugement). Les tests Canopé gardent « Points d'appui / Fragilités » : là, ce sont de
vrais domaines.
2. **« et » en collision.** « Ne maîtrise pas le repérage dans le plan, le théorème de
Pythagore et les aires et les coordonnées et les vecteurs. » Deux mesures : les libellés
courts contenant « et » ont été raccourcis (« le théorème de Pythagore », « les
vecteurs », « les images par une fonction », « les tableaux de variations »), et
l'énumération passe en virgules seules dès qu'un libellé contient encore « et ».

## Lyon +16, exercice 4 : des égalités, pas des comparaisons (corrigé 03/09)

J'avais lu l'exercice 4 comme des comparaisons (« 2/6 < 1/2 ») : c'est faux, il s'agit de
**relier chaque écriture à celle qui lui est égale**. Le corrigé est bien dans
`tests/lyon-maths-16-corrige.pdf`, mais sa mise en page en deux colonnes reliées par des
carrés sort mélangée à l'extraction du texte — d'où l'erreur. Rétabli :
2/6 = 1/3 · 3/4 = 0,75 · 0,5 = 1/2 · 5/20 = 1/4 · 3/2 = 1,5, capacité « Relier les
fractions égales », paliers sur 5 égalités. ⚠ Leçon : pour un exercice à relier ou à
cocher, l'extraction de texte ne suffit pas — lui demander confirmation.

## Le palier d'orientation : d'où il vient (dit dans le guide, 03/09)

Elle a demandé si j'avais le document officiel qui dit « CAP / Bac pro / … ». Réponse :
non. Ce qui existe : le **sujet** Lyon étiquette chaque exercice par niveau (1-5 CAP ·
6-17 2de Bac pro et 2de GT · 18-20 1re et Terminale) — elle a validé cet étiquetage — et
le corrigé donne les barèmes. En revanche les **seuils** de `palierMaths()` (60 % par
groupe) sont un calcul de l'application. C'est écrit noir sur blanc dans
`GUIDE - Accueil d'un élève.dc.html`, section « Ce que l'application ne sait pas faire »,
avec l'écart de barème sur « ++ ». À remplacer si elle retrouve la notice du CASNAV.

## La réponse attendue sous les yeux (fait 03/09)

Elle corrigeait avec la feuille du corrigé papier posée à côté de l'écran. Chaque exercice
des cinq corrigés de maths porte donc `attendu` — la réponse officielle, en clair — et
l'étape 3 l'affiche dans un bandeau vert « RÉPONSE ATTENDUE » au-dessus des paliers
(61 exercices renseignés : cycle 2, cycle 3, fin de 5e, fin de 4e, fin de 3e).
Le test **Lyon +16 ans** n'a pas de corrigé exercice par exercice (il se note à la grille
officielle, dans l'écran « positionnement ») : ses 20 exercices portent maintenant deux
colonnes de plus dans `MATHS` de `positionnement.js` — la réponse attendue et la grille
officielle (« 4 ou 5 calculs justes : ++ · 3 : + … »), relevées sur
`tests/lyon-maths-16-corrige.pdf`. La grille n'est plus affichée en une ligne : elle est devenue des **paliers cliquables**
rédigés comme ceux des corrigés Canopé (« 4, 5 ou 6 calculs justes », « 3 calculs justes »,
« Démarche correcte, erreur de calcul », « Rien écrit »), septième colonne `paliers` de
`MATHS`. Ils remplacent les boutons NE/--/-/+/++ sur ce test et se lisent en colonne sous
l'intitulé ; les codes courts restent en ligne pour les tests sans paliers rédigés. Deux paliers portent souvent la même note (« Démarche fausse » et « Rien écrit » valent
tous deux `--`) : `noter()` enregistre donc le **libellé choisi** dans `reponses` en plus
de la note dans `scores`, et c'est le libellé qui dit lequel est allumé — sans quoi ils
s'allumaient ensemble. ⚠ **« ++ » seulement si tout est juste** (03/09) : le barème Lyon donnait ++ à « 4 ou 5
calculs justes » sur 6, ce qui affichait 100 % et « très bonne maîtrise » à une élève qui
s'est trompée — « c'est très bien si tout est bon ». Les paliers « presque tout » sont
descendus d'un cran aux exercices 1, 7 et 18 ; la grille officielle reste dans la 6e
colonne de `MATHS`, pour mémoire.
Un dernier palier **« Non évalué »** remet l'exercice à zéro : les
boutons NE/--/-/+/++ ayant disparu sur ce test, un clic par erreur était sinon
irréversible. La réponse attendue s'affiche au-dessus.
⚠ Piège rencontré : un remplacement par expression régulière sur `MATHS` avait aussi
frappé la liste `FR` juste en dessous (7 exercices de français repartis avec les réponses
de maths). Rétabli — vérifier les deux listes après toute retouche de ce fichier.
À faire pour tout nouveau corrigé rangé, y compris en lecture.

## Ne jamais écraser ce qui était déjà dans la fiche (corrigé 03/09)

Sur « Compréhension orale », la fiche déposée par le CIO portait **B1** (et A2 en
compréhension écrite) : mon brouillon passait devant et remplaçait ces valeurs sans le
dire. Ordre de priorité corrigé à l'étape 4 :
**1.** ce qu'elle a saisi — **2.** ce qui était déjà dans la fiche déposée — **3.** mon
brouillon. Le libellé du champ dit d'où vient la valeur : « ⟵ déjà dans la fiche déposée »
ou « • » pour une proposition. Règle générale : une donnée écrite par quelqu'un d'autre ne
se remplace jamais en silence.

## L'angle de l'exercice 15 : sa feuille fait foi (fait 03/09)

Le corrigé officiel du cycle 3 donne « ≈ 124° » (et 56° pour le rapporteur lu à l'envers),
mais elle a trouvé **146°** sur sa feuille imprimée — une impression « ajustée à la page »
modifie l'angle. **Décision du 03/09 : on garde 124°** (« ≈ 124°, à 5° près »), elle
revérifiera au rapporteur ; l'`aide` prévient qu'une impression mise à l'échelle change
la mesure. ⚠ À rouvrir quand elle aura vérifié — et à garder en tête pour tout exercice
mesuré au rapporteur ou à la règle.

## Un résultat sans opération posée (fait 03/09)

Matti, exercice 1 du maths : il n'a rien posé, il a écrit un résultat faux. Aucun palier
ne disait ça — « ne sait pas poser » suppose une opération posée de travers, et « rien
écrit » suppose une case vide. Les cinq exercices « posés » des corrigés de maths portent
donc une ligne **« Un résultat écrit sans opération posée »** (MI), avec sa propre phrase
de fiche via `constat.sansPoser` : « Écrit un résultat de multiplication sans poser
l'opération : la technique n'est pas installée. » Règle générale : un palier doit décrire
ce qu'on voit sur la feuille, pas ce qu'on suppose.

## « ✓ DONNÉ » ne retire plus (corrigé 03/09)

Elle a marqué « Mathématiques — fin de cycle 3 » comme donné à Mathis, et le test s'est
retrouvé **retiré** : le bouton vert « ✓ DONNÉ » appelait le même `marquerDonne(test)`
que le bouton « Retirer », et un simple reclic basculait en arrière, sans rien dire.
`marquerDonne(test, veut)` prend maintenant l'état voulu **explicitement** : le bouton
principal marque (`true`), « Retirer » retire (`false`), et redonner un test conserve sa
date et sa langue d'origine au lieu de les réécrire. En plus, les tests déjà donnés du
bloc sont nommés en vert sous le déroulant — un test donné ne doit jamais rester caché
derrière une liste fermée.

## Donner un livret de lecture en entier (fait 03/09)

Elle a donné à Mathis **le cycle 3 complet** (fin de CM1, fin de CM2, fin de 6e) « pour
voir » — l'appli traitait ça comme trois tests sans lien. Or les livrets Canopé de
compréhension de l'écrit sont **un document par cycle**, paliers à la suite (cycle 3 :
items 1 à 15). Les tests de lecture portent donc `livret: 'c2' | 'c3' | 'c4'`, et dès que
deux paliers du même livret sont donnés, un bandeau bleu s'affiche sur la première carte
de l'étape 3 : « Livret cycle 3 — un seul document, les paliers à la suite : fin de CM1 ·
fin de CM2 · fin de 6e. Lit au niveau fin de CM1 — fin de CM2 et fin de 6e non atteints. »
`niveauAtteint()` nomme désormais **tous** les paliers échoués au-dessus du niveau
retenu (avant : seulement le premier, et il était même passé sous silence si l'ordre s'y
prêtait) et expose `echecs`.

## La partie maths de la fiche : une synthèse (fait 03/09)

C'est cette partie qui part sur le PDF, donc elle doit se lire d'un coup d'œil.
« Mathématiques — appréciation générale » n'est plus une liste de pourcentages mais une
**synthèse** en deux lignes : le test passé, sa langue et son taux de réussite, puis les
points d'appui et les fragilités nommés par domaine (« Points d'appui : nombres et calcul,
espace et géométrie. Fragilités : grandeurs et mesures. »). Le détail chiffré reste dans
les quatre cases du dessous.
⚠ Deux pièges de ce fichier : `bilan().mot` et `bilan().conclusion` sont des **phrases
complètes**, jamais des qualificatifs — les mettre entre parenthèses donne « 42 % de
réussite (8 items notés sur 9 — conclusion en attente.). ». On les met donc à la suite.
Et `conclusion` vaut `null` tant que tous les exercices ne sont pas notés : dans ce cas
la ligne dit « … % de réussite sur les exercices notés à ce jour, la saisie n'est pas
terminée » plutôt que d'annoncer un résultat ferme sur une fiche officielle. La langue de
passation est repassée en minuscules (« passé en anglais »).
⚠ **Aucun plafond dans l'énumération.** J'avais coupé à trois compétences avec « et 6
autres points » : inacceptable sur une fiche lue par le CASNAV et par la famille — « quels
autres points ? » (03/09). Toutes les compétences sont nommées, virgules puis « et »
final ; c'est le rôle des libellés `court` de garder la case lisible.
Corollaire : **tout corrigé de maths doit porter un `court` sur chacun de ses
exercices**, sinon sa case retombe en phrases pleines (le cycle 2 était dans ce cas, et
c'était justement le seul test de maths des dossiers de démonstration). Fait pour les
cinq corrigés de maths. Et quand aucun exercice d'un domaine n'est noté, la case garde le
pourcentage mais rédigé — « Domaine acquis : 100 % de réussite. » — plutôt qu'un
pourcentage nu à côté de trois cases rédigées.

## Les cases maths de la fiche, condensées (fait 02/09)

Vingt exercices notés donnaient onze phrases dans la seule case « Nombres et calcul ».
Chaque constat porte donc un libellé **court** (`constat.court`, un groupe nominal :
« la division posée », « les conversions d'unités »), et `propositionsFiche` condense la
case en deux lignes quand tous ses exercices en ont un :
« - Maîtrise la multiplication posée à deux chiffres, la division posée. » /
« - Ne maîtrise pas les conversions d'unités, la symétrie axiale. »
Il n'y a pas de seuil : une case se condense dès que tous ses exercices ont un libellé
court — « grandeurs et mesures » n'en a que deux dans ce test et restait sinon la seule
case en phrases pleines. Sans libellé court, on garde une phrase par ligne (les tests de français n'ont pas de `court` : rien ne change pour eux). Ce qu'elle
a observé pendant la passation reste toujours sur ses propres lignes, en dessous.

## Un test sans corrigé rangé : le dire (fait 02/09)

Sur Matti (3ème, « Mathématiques — fin de cycle 4 »), l'étape 3 affichait « Exercice 1
(intitulé à préciser) », « Exercice 2 (intitulé à préciser) »… — ça se lisait comme un
bug. Les exercices supposés sont maintenant simplement numérotés (« Exercice 3 »), et un
bandeau ocre au-dessus de la liste dit que le corrigé de ce test n'est pas encore dans
l'application et qu'il suffit de l'envoyer. Manquent encore : maths fin de cycle 2
(complet), fin de 5e, fin de cycle 4 (= fin de 3e), et les tests de lecture Canopé.

## Maths cycle 4 : les trois paliers (fait 02/09)

Elle a envoyé, sujets ET corrigés officiels (CASNAV de Corse), tous rangés dans `tests/` :
**fin de 5e** (17063 / 17066), **fin de 4e** (17147 / 17150), **fin de 3e** (17228 / 17231,
c'est le « fin de cycle 4 » de Canopé). Les trois sont saisissables exercice par exercice
avec la même logique en paliers, et tous leurs constats ont un libellé `court` — les cases
maths de la fiche se condensent donc.
Fin de 5e et fin de 4e sont des entrées à part du catalogue (hors boucle `CYCLES`),
proposées en agrafe derrière le test de fin de 3e : « si la fin de 3e est trop dure, le
palier de fin de 4e », puis fin de 5e. L'écart entre le cycle 3 (fin de 6e) et le cycle 4
(fin de 3e) est trop grand pour n'avoir aucun palier intermédiaire.
⚠ Fin de 3e : le corrigé note **trois fois** l'exercice 9 (aires · volumes · coefficients)
— il est donc saisi en trois lignes, 9a / 9b / 9c, dans `EXERCICES` comme dans le corrigé.

## Maths fin de 4e (détails, fait 02/09)

Elle a envoyé le corrigé officiel (CASNAV de Corse, PDF 17150) → rangé dans
`tests/canope-maths-4e-corrige.pdf`. C'est un **palier intermédiaire** du cycle 4 : le
« fin de cycle 4 » de Canopé porte, lui, sur la fin de 3e. Le test `canope-maths-4e` est
donc une entrée à part du catalogue (hors boucle `CYCLES`), proposée en agrafe quand le
test de fin de 3e risque d'être trop dur. Ses 10 exercices sont saisissables avec la même
logique en paliers que le cycle 3 : relatifs, fractions, puissances, équation, notation
scientifique, développement, moyenne, volume, vitesse, Pythagore — tous avec un libellé
`court`, donc les cases de la fiche se condensent.
Sujet et corrigé sont tous deux rangés dans `tests/` (envoyés le 02/09).
L'énigme de l'exercice 8 est levée : la figure est une **pyramide**, d'où
(3 × 2) × 5 ÷ 3 = 10 cm³. Le palier MF « multiplie les trois côtes (30 cm³) » couvre
l'erreur classique du pavé.

## La grille de maths en paliers, et « rien écrit » (fait 02/09)

Deux remarques d'affilée sur le maths fin de cycle 3. D'abord : à l'exercice 5, l'élève
n'a rien écrit — chaque exercice porte donc une dernière ligne **« Rien écrit »**
(« Rien entouré » à l'ex. 5), notée MI comme le veut le barème officiel, et
`constat()` accepte une formulation `vide` par exercice, mais **aucune n'est utilisée**
sur ce test : elle a demandé le 02/09 que la fiche écrive le non-acquis (« ne maîtrise
pas… ») et non « exercice laissé vide » — sur une fiche officielle, la case doit parler
de la compétence.
Ensuite, la vraie critique : « c'est trop binaire ». Le barème Canopé dit presque
partout « exact → TBM, autre → MI », ce qui met dans le même sac une multiplication bien
posée avec une retenue fausse et une élève qui ne sait pas poser. La grille a donc été
refaite **en paliers**, comme celle des Trois Frères : le résultat exact garde le TBM
officiel, et les lignes intermédiaires décrivent ce qu'on voit sur la feuille (virgules
non alignées, rapporteur lu à l'envers, figure recopiée au lieu d'être retournée…),
chacune avec son `ms`/`mf` pour la phrase de la fiche. Là où le barème officiel est
plus fin que binaire, il est repris tel quel, et `aide` le rappelle.
L'exercice 5 est le seul où la réponse de l'élève est lisible telle quelle : on saisit
la fraction entourée, et `presque` fait le reste (54/100 → MS, 5/4 ou 4/5 → MF).

## Saisir les réponses de l'élève, et non ses notes (fait 02/09)

Sa demande : « mets le corrigé à l'écran et laisse-moi écrire ses réponses ». Trois façons
de renseigner un test cohabitent désormais, la troisième étant la nouvelle :
je note moi-même · **je saisis ses réponses** · (un jour) le scan relu.

`positionnement-corriges.js` (`window.CORRIGES`) tient les corrigés. Il ne recopie pas les
tests : pour chaque exercice, les propositions à cocher et la bonne réponse. **Six formes
d'exercice**, c'est tout ce qu'il a fallu : `unique` (une bonne réponse) · `multi`
(plusieurs) · `ordre` (phrases à numéroter) · `paires` (à relier) · `sous` (plusieurs
petites questions, une seule note) · `ouvert` (réponse écrite : juste / faux / **rien**) ·
`bareme` (les paliers du corrigé, à choisir en clair).

⚠ **Le « rien » n'est pas un « faux »** : une opération laissée vide dit autre chose qu'une
opération ratée, et le constat écrit sur la fiche n'est pas le même. C'est ce qui a produit,
pour Leila, « Ne sait pas réaliser des additions ou des soustractions posées. »

⚠ **La notation suit le barème officiel, exercice par exercice**, et non un seuil inventé.
Relevé sur les corrigés Canopé : l'ex. 7 du cycle 3 (3 justes → TBM, 2 → MS, 1 → MF),
l'ex. 10 qui accorde **MS** à « mercredi et jeudi » (l'élève a vu un des deux jours),
l'ex. 12 qui regarde l'**antériorité** du cauchemar, l'ex. 14 qui demande **5 bonnes sur 6**
pour TBM ; chez Buck, l'ex. 2 où « habile » + « fort » suffit au TBM sans « cruel », et
l'ex. 6 où « à l'étrangler » **seul** vaut TBM — y ajouter « à l'empêcher de bouger »
redescend à MS. Ne pas remplacer ces règles par une moyenne.

**Les questions s'affichent en français, avec l'anglais du livret en petit dessous**
(champs `vo`, `voOptions`, `voPhrases`, `voElements`). Raison donnée par elle : sa copie est
en anglais, l'appareil bilingue lui évite de chercher la ligne. L'ordre des propositions est
strictement le même d'une langue à l'autre.

**Corrigés en place** : compréhension de l'écrit cycle 3 (les 15 items, trois paliers) ·
Buck fin de 5e (les 6 exercices, barème officiel) · maths fin de cycle 2 (les 9 exercices ;
les intitulés 7 à 9 sont **devinés**, la page n'a pas été relevée) · « Les Trois Frères »
CASNAV de Créteil (16 questions + production écrite, **attendus tirés de ma lecture du
texte**, pas du corrigé officiel — à confirmer).

**Un bilan clôt chaque test** à l'étape ③ : les phrases que la saisie permet d'écrire,
telles qu'elles rejoindront la fiche. Plus une zone **« Ce que tu as observé pendant la
passation »**, pour ce que la saisie ne dit pas (ses tables de multiplication, la table de 5).
Un même constat ne s'écrit **qu'une fois**, même si deux exercices y mènent.

⚠ **Ne jamais conclure sur le palier au-dessus de la classe d'âge** : Leila entre en 6e,
donc « fin de 6e » porte sur une année qu'elle n'a pas faite et ne se conclut pas. Et
l'appli propose **deux niveaux de repli**, pas un (6e → CM2 → CM1) : le cas vécu est
descendu de deux crans.

## Rédiger les rubriques dans ses tournures (fait 02/09)

`positionnement-redaction.js` (`window.REDACTION`) propose un **brouillon** des cases de la
fiche, marqué d'un point « • » tant qu'elle ne l'a pas repris. Tiré de **quatre fiches
qu'elle a réellement remplies** (un anglophone scolarisé, un francophone B2, un élève peu
scolarisé arabophone, une lycéenne orientée en 2GT). Ses règles de style, relevées sur ces
fiches :
- **le constat, jamais le score** — « La lecture en anglais est fluide. », pas « MS » ;
- les **mathématiques en tirets**, une compétence par ligne ;
- ce qui n'a pas été vu s'écrit : **« Non évalué »** ; ce que la langue empêche d'évaluer :
  **« Évaluation impossible. »** ;
- le **prénom** ouvre souvent la phrase (« Fanah Gigla lit de manière fluide. ») ;
- en expression écrite, les manques s'annoncent par **« Axes de progression identifiés: »**,
  jamais comme un échec ;
- les **Remarques** sont une suite de paragraphes séparés d'une ligne vide : le profil, les
  mathématiques, le projet professionnel s'il existe, puis **toujours** la préconisation en
  dernier — « Nous préconisons une affectation en… ».

Le brouillon lit le **profil coché en « Niveau scolaire global »** (NSA / peu scolarisé /
conforme dans une autre langue / conforme en français) et le **niveau de français** : ces
deux valeurs sont saisies à l'étape ④ (`d.synthese`), pas dans la fiche — sans elles le
brouillon reste muet. Un champ **Fille / Garçon** commande les accords ; il coche les cases
sexeM / sexeF du PDF et n'est pas envoyé comme un champ.

**Geste graphique** : six boutons écrivent la phrase (cursive maîtrisée · cursive parfaite ·
script · script + signature cursive · prénom et nom seulement · pas installé). C'est le seul
constat qu'aucun test ne mesure. Pour Leila, d'après sa copie : script, signature cursive,
geste maîtrisé — ligne de base tenue, hauteurs différenciées, tracé fluide, et elle se relit
(ratures de correction).

⚠ **Les listes à tirets des maths ne s'inventent pas** : chaque exercice porte un `constat`
(`ok` / `non` / `rien`) dans `positionnement-corriges.js`, et une `rubrique` de destination.
C'est ce couple qui écrit la fiche.

## Avant l'impression : relecture, orthographe, PDF gardé (fait 02/09)

`positionnement-relecture.js` — ce que la machine sait faire seule **sans toucher au sens** :
espaces multiples, espace insécable avant `: ; ! ?`, majuscule en tête et après un point,
point final. Les dates, noms et listes déroulantes en sont exclus (`BRUTS`).
⚠ **Ne jamais rogner ce qu'elle tape** : un `trim` à l'affichage mange l'espace en fin de
mot et l'empêche d'écrire — bogue introduit puis corrigé le 02/09. Le nettoyage ne concerne
que les valeurs qu'elle n'a pas saisies.

`positionnement-orthographe.js` — bouton **« Vérifier l'orthographe »** à l'étape ④, qui
appelle **LanguageTool** (api.languagetool.org, gratuit, sans clé). Les fautes s'affichent
sous leur champ avec jusqu'à trois corrections, appliquées **au clic seulement**. Filtré :
les sigles du métier (UPE2A, NSA, CASNAV, 2GT, A2) que LanguageTool prend pour des fautes
— il proposait « UPE2A → OPÉRA » —, et les règles de typographie que la relecture maison
fait déjà. C'est **le seul appel réseau de l'application** ; sans connexion, le bouton le dit.
L'option Claude a été écartée : dans un site statique, la clé d'API serait visible de tous.

`positionnement-pdfs.js` — le PDF déposé est rangé dans **IndexedDB** (`upe2a-fiches`), pas
dans localStorage qui plafonne et n'accepte que du texte. Il **survit aux rechargements** :
elle revient souvent corriger une case et retélécharger. Il part quand elle supprime le
dossier, ou par le bouton **« Oublier le PDF de cet élève »**.
⚠ Redéposer la fiche du même élève **ne crée plus de doublon** : `ajouterDossier()` retrouve
le dossier existant (même nom, même naissance) et lui rattache le PDF.

**Deux bogues du 02/09 à ne pas refaire** : un **second `componentDidMount`** ajouté dans la
classe **écrase le premier** — la liste des dossiers a disparu, les données étaient intactes ;
et les `textarea` de l'étape ④ doivent se dimensionner sur leur **contenu réel**
(`scrollHeight`), pas sur un compte de `\n` — sinon les brouillons de cinq à sept lignes sont
tronqués, et c'est exactement ce qu'elle doit relire.

## Les PDF des tests : son Drive, pas l'application (décidé 02/09)

Question posée : « et si je les mets dans un Google Drive ? » Réponse retenue : **oui, pour
tout** — ses tests, ses scans, ses traductions. L'appli n'y accède pas (elle tourne dans le
navigateur, sans son compte), donc pas de liste qui se remplit toute seule ; en revanche la
base des tests porte **un seul lien**, un bouton **« Mon dossier Drive — les PDF des tests »**
(dossier privé, elle reste connectée). Prudence dite : le matériel Canopé se partage en
« restreint », jamais « tout le monde avec le lien ». Les tests qu'elle imprime le plus
souvent peuvent en plus vivre dans le site, pour marcher sans réseau.

## La base des tests, en gris (02/09)

Elle est passée **en retrait, fond gris** : c'est une réserve, pas ce qu'on regarde d'abord.
À l'étape ②, les propositions sont **regroupées en deux bandes** — « Compréhension de
l'écrit » (bleu `#e3edf8`) et « Mathématiques » (orange `#f4d5a0` sur encre brune, le même
que la base) — et **chaque bande se renumérote à partir de 1**.

⚠ **« Ouvrir le dossier à la main » a été retiré de l'étape ① (02/09)** : « ça ne peut pas
arriver », elle a toujours la fiche. Conséquence assumée : plus de porte de secours si un
PDF est illisible (un scan n'a pas de champs de formulaire).

## L'étape ② refaite en blocs, et l'impression des tests (02/09, soirée)

« C'est trop confus » : la pile de cartes est remplacée par **un bloc encadré par matière**,
chacun avec **une liste déroulante** et une seule fiche de test à l'écran.

**Trois blocs, plus un.** `ÉVALUATION EN LANGUE DE SCOLARISATION` (bleu `#e3edf8` / `#1d4e89`)
· `MATHÉMATIQUES` (orange `#f4d5a0` / `#4a3208`) · `FRANÇAIS` (vert `#d9ecdf`, bordure
`#4f9d7d`, texte `#1d6b42`) · `NON OU PEU SCOLARISÉ ANTÉRIEUREMENT` (violet `#e8e0f4`).
Bordure **4 px** dans l'encre du bloc. Chaque bloc habille son contenu de sa couleur.
⚠ Deux règles de lisibilité apprises à la dure : la **carte du test reste sur fond blanc**
(la teinter faisait tomber ses lignes grises à 3,1:1) et la couleur de **bordure** est
dissociée de la couleur de **texte** (`encre` vs `encreTexte` : le vert choisi donnait
2,6:1 sur son propre fond). Le bouton « JE L'AI DONNÉ » porte un trait de 2 px, sinon il
disparaît sur la carte blanche.

**Le rangement suit la LANGUE, pas la matière du test.** Un test en français passé par un
élève **scolarisé en français** relève de la langue de scolarisation : l'étape porte un
champ `bloc` qui l'emporte sur `matiere` (sa remarque : « si sa langue de scolarisation est
le français, elle passe le test directement en français »). Le bloc vert ne garde que le
français **langue seconde** (la feuille de décodage, le test Lyon).

**Chaque bloc se renumérote à partir de 1**, et les replis (« + ») ne consomment pas de rang.

**Bouton « Difficultés de lecture ? »** dans le bloc de lecture : il ajoute les tests de
déchiffrage à la liste, et **déménage** la carte concernée depuis le bloc où elle vivait.
État attaché au dossier, pas global.

**« Retirer » ne supprime plus rien** (⚠ corrigé le 02/09) : l'entrée reste dans `d.tests`
avec ses `scores`, ses `reponses` et ses `observations`, seulement marquée `donne: false`.
La redonner restitue tout et **remet la date du jour**. `estDonneDans(t)` (`t.donne !== false`)
filtre partout : étape ②, étape ③, `propositionsFiche()`, `niveauAtteint()`, et le compteur
de la liste DOSSIER.

**Télécharger les tests.** Elle a le droit de les imprimer tant qu'ils ne sont pas modifiés.
`PDFS` dans `positionnement-tests.js` associe un test à `{ sujet, corrige, langue, note }`,
les fichiers vivant dans **`tests/`**. Rangés le 02/09 : Les Trois Frères (sujet + le corrigé
que j'ai écrit), la feuille de décodage, le livret **anglais** cycle 3 + son corrigé français,
le maths Lyon +16 (sujet + corrigé), le corrigé de Buck (son sujet manque).
Depuis le 02/09, les boutons de téléchargement sont aussi dans **LA BASE DES TESTS**
(étape 2) et non plus seulement sur les propositions : c'est là qu'elle cherchait le
maths Lyon. Dans la base, la langue de l'élève n'est pas regardée — on télécharge ce
qui est rangé.
**Les maths Canopé (02/09).** Elle a donné la page du CASNAV de Corse, qui héberge tous
les PDF : `https://www.ac-corse.fr/casnav-espace-eana-les-tests-canope-mathematiques-122546`.
Ces fichiers ne sont **pas copiés** dans le site (je ne peux pas télécharger un binaire
depuis le web) : `PDFS` porte l'URL directe et le bouton ouvre le fichier chez eux —
`ouvrirPdf` fait `window.open` quand le chemin ne finit pas par `.pdf`. Rangés :
fin de cycle 2 (16904 / corrigé 16910), fin de cycle 3 (sujet 16985 ; son corrigé, elle me l'a
envoyé le 02/09 → `tests/canope-maths-c3-corrige.pdf`, et ses 20 exercices sont dans
`positionnement-corriges.js` + `positionnement-dossiers.js` : la saisie des résultats
marche donc pour ce test — barème officiel, ligne par ligne, parce que les réponses sont
posées ou tracées sur le papier), fin de 3e
(17228 / 17231), en français. Aussi sur cette page, pas encore utilisés :
le protocole de passation (16811), l'évaluation non verbale pour les élèves en grande
difficulté (16814) — les deux sont dans la colonne MATHÉMATIQUES de la base depuis le
02/09 — et les 25 autres langues. Les trois tests de cycle apparaissent
désormais dans la colonne MATHÉMATIQUES de la base, avec leurs boutons.
⚠ Trois pièges traversés : un `<a href>` vers un fichier du projet donne **« preview token
required »** en mode aperçu ; passer par un `blob:` dans un nouvel onglet donne
**ERR_BLOCKED_BY_CLIENT** (Chrome) ; l'aperçu dans un `iframe` ne s'imprimait pas. Décision
d'elle : **« on va pas s'embêter, mets juste le bouton télécharger »** — `fetch` + `<a download>`,
et elle imprime depuis ses téléchargements. Un `.html` (mon corrigé) garde une vraie
navigation : ses ressources sont relatives, un `blob:` l'afficherait blanc.
⚠ Le bouton **regarde la langue de l'élève** : sinon il ferait imprimer le livret anglais à
un élève arabophone. Sans correspondance, il disparaît et laisse une phrase construite sur
`languesPossibles()` — jamais sur la chaîne brute de la fiche.

## Ce que les tests savent conclure — deux règles à ne jamais enfreindre

**Jamais un palier au-dessus de la classe d'âge.** Elle entre en 6e : « fin de 6e » porte sur
une année non faite. Deux niveaux de repli sont proposés (6e → CM2 → CM1).

**Les maths sont des tests de FIN DE CYCLE** (⚠ corrigé le 02/09, sa remarque : « tu proposes
fin de cycle 4 pour Khadissatou alors qu'elle devrait être en cinquième »). Le test proposé
porte sur le dernier cycle **achevé** : CM1/CM2 → cycle 2, 6e → cycle 3, **5e et 4e → cycle 3**,
3e → cycle 4. Le cycle de la classe reste en repli « si c'est trop facile ».

## Les tests reçus le 02/09

**« Les Trois Frères »** (CASNAV de Créteil, conte de Jean Muzi) — ce qu'elle utilise pour les
**collégiens francophones**. Rangé en **fin de 5e**, à côté de Buck : les deux sont proposés,
c'est elle qui choisit. Seize questions rédigées + une production écrite au choix.
⚠ Le corrigé officiel de Créteil est **introuvable** : j'ai écrit une proposition,
`POSITIONNEMENT - Corrigé Les Trois Frères.dc.html` — le questionnaire avec les réponses en
bleu, un barème sous chaque exercice et les cases MI/MF/MS/TBM à entourer, comme chez Canopé.
Le conte n'est pas recopié (extrait Flammarion) : elle photocopie le sujet.

**Sa feuille de décodage** — « Lecture en alphabet latin » : lettres et syllabes (5 lignes),
chiffres et nombres (3 lignes), trois mots à reconnaître, appariement capitales/minuscules.
⚠ Elle **ne fait pas tout lire** : elle choisit des lettres, des syllabes, quelques chiffres,
et vérifie surtout les trois mots. D'où le « rien » qui sort du calcul.
⚠ Deux lignes sur trois de l'exercice 3 ont **deux** bonnes réponses.

**Il n'existe PAS de test pour les NSA, et il n'en faut pas** (dit le 02/09) : elle donne le
test de la classe d'âge et **observe** — « je me rends compte qu'ils ne savent pas lire, ou
qu'ils ne comprennent absolument rien de ce qu'ils lisent ». L'entrée fantôme
« NSA — à construire » a été supprimée ; la base n'a plus de trou.

**Les langues sans tradition écrite scolaire ne sont pas des langues de scolarisation**
(`SANS_ECRIT_SCOLAIRE`) : wolof, bambara, peul/pulaar, soninké, mandingue, diola, sérère,
lingala, comorien, créole, baoulé, ewondo. « Ce n'est pas une langue écrite ; généralement
les enfants parlant wolof sont scolarisés en français. » Ne jamais annoncer « pas de version
en wolof ».

**Les liens pointent le CASNAV de Lille** (`PAGE_LILLE`), pas la plateforme Canopé : tout y
est sur une page — les 26 archives de langues et l'archive des corrigés.

## Le guide d'utilisation (créé 02/09)

`GUIDE - Accueil d'un élève.dc.html`, imprimable (`doc-page`). Elle a demandé que les
explications sortent de l'écran pour y entrer : **« ce blabla est très intéressant mais je
préfère que tu le mettes dans notre guide et que tu le retires, pour gagner en ergonomie »**.
Règle à tenir : **une explication qui traîne à l'écran va dans le guide.** Un bouton
« Guide d'utilisation » ouvre le document depuis la barre du haut de l'appli.
Le guide couvre les quatre étapes, les deux règles de choix, le sens du « rien », le
« Retirer » qui ne détruit rien — et une section **« Ce que l'application ne sait pas faire »**.
À alimenter au fil des écrans (elle l'a demandé) : la classe, les fiches, la lecture.

## Traduire un test dans une langue non couverte (décidé 01/09)

Bouton violet **« Traduire ce test en … »** sous les tests proposés. Il prend la langue
manquante détectée sur la fiche (finnois pour Leila) et copie la demande pour le chat.

**Position tenue, et elle l'a validée** : c'est **l'assistant qui traduit**, pas une API de
traduction. Un test de positionnement doit garder **la même difficulté** — un mot plus rare
dans la langue cible déplace la difficulté et l'échelle MI/MF/MS/TBM ne veut plus rien
dire ; certains items demandent une **adaptation** (emploi du temps, noms propres) qui est
une décision pédagogique, à signaler et à lui faire arbitrer ; et une langue ne se traduit
**qu'une fois** — le fichier se range dans la base, gratuit et hors ligne ensuite.
Une API ne garde du sens que comme **dépannage** (élève à positionner demain matin dans une
langue que personne ne lit), et le brouillon doit alors être tamponné « non relu ».

**Le circuit, en trois temps** : (1) deux fichiers sont produits — le test dans la langue,
prêt à imprimer, et une **feuille de contrôle bilingue** (français à gauche, langue à
droite, ligne par ligne, colonne à cocher) ; (2) un locuteur relit la feuille de contrôle —
il compare, il n'a pas besoin de connaître le test, et la consigne lui demande de signaler
aussi ce qui est **plus difficile**, pas seulement ce qui est faux ; (3) les corrections sont
reportées et la version passe de `brouillon` à `relue par X le …` dans `TRADUCTIONS`.
**Seule une version relue s'imprime sans avertissement.** Canopé accepte les traductions
dans les langues manquantes : une version relue peut leur être renvoyée.

**Fait le 01/09 — finnois, paliers fin de CM1 et fin de CM2** :
`POSITIONNEMENT - Test finnois - Écrit CM1 et CM2.dc.html` (6 pages A4) et
`POSITIONNEMENT - Contrôle bilingue finnois.dc.html` (2 pages paysage), statut
**brouillon**. Adaptations signalées : les dessins et le plan (items 4 et 5) restent ceux
de Canopé, à photocopier — on ne les redessine pas ; l'emploi du temps garde les horaires
et les matières français (l'exercice porte sur la lecture d'un tableau) ; ⚠ **son exemplaire
anglais imprime « possible » là où la version française imprime « rassurant »** (item 3) —
le français a été suivi.

**Le test complet, pour mémoire** : 15 items, trois paliers dans un même texte (Sami,
premier jour d'école) — fin de CM1 items 1 à 5, fin de CM2 items 6 à 10, fin de 6e items
11 à 15. Les images du fichier sont extraites dans `work/scan-test/`.

⚠⚠ **La classe d'âge se calcule sur l'ANNÉE DE NAISSANCE, jamais sur l'âge en années.**
Tous les élèves nés du 01/01/2015 au 31/12/2015 sont en **6e** à la rentrée 2026, même ceux
qui n'ont pas encore 11 ans — Leila, née le 07/12/2015, est en 6e. Écart = année de rentrée
− année de naissance : 6 → CP, 11 → 6e, 14 → 3e, 17 → Terminale. L'année de rentrée passe
à l'année civile **à partir de juillet**. `CLASSES` et `classeDage()` dans
`positionnement-eana.js`. Erreur commise deux fois le 01/09 (échelle par âge), corrigée :
ne pas y revenir. Seules la borne des **16 ans** et celle des **18 ans** de la fiche EANA
restent sur l'âge réel, c'est la fiche qui le demande.

⚠ **Les maths Canopé sont par CYCLE, la compréhension de l'écrit par NIVEAU.**
L'en-tête du test de Leila dit « EANA - MATHS - FIN DE CYCLE 2 » : trois tests de maths
(fin de cycle 2, 3, 4) contre neuf tests d'écrit. Corrigé dans la base le 01/09.

**Le maths de Leila, reçu le 01/09** (photos dans `uploads/IMG_20260901_0749*.jpg`) :
fin de cycle 2, **passé en français et non en langue d'origine** — c'était le seul
disponible. Neuf exercices : matériel base 10, deux problèmes à choix d'opération,
décomposition (382 = 300 + 80 + 2), additions posées, suite de 10 en 10 descendante,
rangement, soustractions posées, multiplications posées. Matériel : crayon, gomme, règle
graduée, équerre, compas (pas de rapporteur au cycle 2).

**L'écran est branché** dans **Positionnement → Accueil d'un élève** (écran `accueilEleve`),
en première entrée. L'espace enseignant l'appelle avec la prop `sansEntete`, qui efface son
bandeau interne pour ne pas doubler celui de l'appli ; le fichier reste séparé.
⚠ Il ne doit **pas** repeindre le fond de la page (pas de fond sur `body` dans son helmet)
et ses grilles à deux colonnes s'écrivent `repeat(2,minmax(0,1fr))` avec repli à une colonne
sous 860 px — `1fr` seul déborde dans la coquille enseignante (défaut trouvé deux fois
le 01/09).

## À faire à la reprise
- **API de synthèse vocale `https://voice.educ-ai.fr/docs`** (décidé 31/08) : brancher l'appli
  dessus pour utiliser **la voix de l'enseignante** à la place de la voix du navigateur.
  Lire la doc de l'API en premier. Concerne partout où l'appli lit un mot ou une phrase
  (Mes mots, fiches de son, dictées, consignes).
- **Positionnement — la correction automatique** : la saisie des réponses est **faite**
  (02/09, voir plus haut). Reste, « le top du top » : **scanner un test rempli** et le relire
  automatiquement — faisable, mais c'est de la reconnaissance de ronds tracés au stylo, pas
  de la lecture de champs comme pour la fiche EANA. Différence déjà expliquée le 02/09 :
  en attendant, elle envoie la photo dans la conversation et je lis la copie.
- **Les corrigés qui manquent** : les intitulés exacts des exercices **7 à 9 du maths cycle 2**
  (devinés), le **corrigé officiel de Créteil** pour « Les Trois Frères » (mes attendus
  viennent du texte), et les corrigés des autres tests qu'elle utilise.
- **Les exercices des tests pas encore reçus** : grille générique « intitulé à préciser »
  (5 items en lecture, 12 en maths répartis sur les 4 domaines). À remplacer à mesure
  qu'elle envoie les tests — c'est ce qui rend le pré-remplissage de la fiche juste.
- **Le finnois en maths** : pas fait, à sa demande (« on verra plus tard, si j'en ai
  l'utilité »).
- **Positionnement — le multilingue** : le vrai point de départ du chantier, pas encore traité.
  Décider quelles langues et si c'est la **fiche imprimée** qui est traduite ou seulement
  l'écran de saisie. Enjeu : évaluer si l'élève sait lire dans SA langue, sans passer par le
  français.
- **Brancher le MCLM dans Ma classe** : le calcul et l'historique par élève existent déjà
  dans le code (`upe2a-fluence`), il n'y a qu'à les afficher dans une entrée de Ma classe.
- **Google Sheet comme source de vérité** (décidé 30/08, à faire plus tard) : liste d'élèves
  et scores tenus dans un tableur, et je fais le va-et-vient **à la demande** (pas de synchro
  automatique : l'appli tourne dans le navigateur, elle n'a pas accès au Drive seule).
  Règle de conflit retenue : le Sheet fait foi pour les élèves, l'appli pour les scores.
- **Tester le moteur de décodage sur un véritable texte de classe** (pas un texte
  généré) : c'est là que sortiront les derniers cas de découpage et de lettres muettes.
- Photos manquantes dans `clean/` pour certains mots repères.

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
| Lecture | turquoise `#4fc3d9` | L'apprentissage du code · Lire des textes |
| Écriture | brun `#8a4b1e` | Les lettres · Les chiffres |
| Mathématiques | orange `#e59a2b` | Fiches à imprimer |
| Positionnement | bleu `#1d4e89` | Accueil d'un élève · Tous les élèves testés |
| Ressources enseignantes | violet `#6d5bd0` | Je continue chez moi · Outils de manipulation en classe · 5 entrées « à venir » |

Le 👁 signale les écrans qui **changent ce que voient les élèves**.

## Outils de manipulation en classe (nouveau 31/08)

Entrée **Ressources enseignantes → Outils de manipulation en classe** (écran `disques`).
L'écran est une **étagère à onglets** : les dés ne sont qu'un outil parmi d'autres
(« les dés ne sont qu'une partie »). Trois onglets grisés « en attente » à remplacer par
ses vrais outils : étiquettes-mots, cartes à pince, bandes de nombres — **mes propositions,
pas les siennes** : lui demander lesquels elle utilise et comment avant de construire.
Générateur : `disques.js` (`window.DISQUES.planche()`), banc d'essai
`OUTILS - Disques pour les dés.dc.html`.

Ses **gros dés font 8,6 cm de diamètre de face** ; les disques se scratchent dessus.
Diamètre réglable **70 / 76 / 81 / 86 mm** — 81 est sa valeur (face moins 5 mm).
Velcro : **le velours sur les faces du dé**, les **crochets sur les disques** (tranché avec
elle : les crochets accrochent tout ce qui traîne, et le dé reste en main).
Elle **plastifie la planche sur une feuille de couleur** — le dos coloré identifie la série.
Anneau de rangement : percer une **languette**, jamais le cercle (à construire).

**Mes dés prêts** en tête d'écran : Le temps · Les consonnes · Les voyelles — un clic charge
la série (elles étaient enfouies dans « liste tapée à la main », elle ne les retrouvait pas).
Les sources se **replient au deuxième clic**.
**Une planche = un dé = 6 disques.** Trois sources : mots et/ou images d'un thème
(mot seul · image seule · image + mot), liste tapée à la main, modèles rapides
(Le temps · Les voyelles · Les consonnes). Le champ **question** s'imprime une seule fois
en tête de planche, valable pour les six faces (« Qu'est-ce que tu fais / as fait /
vas faire ? » pour le dé du temps) ; vide, il ne s'affiche pas.
Lettres **en maigre, très grosses** (1,6 × le diamètre), en bleu `#1d4e89`,
**minuscule script seule** — pas de capitale sur les dés de sons.
Séries validées : temps = HIER · AUJOURD'HUI · CE SOIR · DEMAIN · DIMANCHE PROCHAIN ·
CET ÉTÉ ; consonnes = d m f b l j ; voyelles = a e i o u ou.
Espacement des disques 8 mm (pour découper), en-tête réduit à deux lignes, marges
d'impression à zéro : les six disques tiennent sur la feuille.

À venir : la languette de perçage, le disque de tête par série, les images rondes
appelées depuis Fiches et jeux.

## Positionnement (nouveau 31/08)

Rubrique bleue `#1d4e89`, deux entrées : **Accueil d'un élève** · **Tous les élèves testés**.
(« Passer un test » a été absorbé par l'étape ③ de l'accueil le 01/09 — voir plus haut.)
**Public plus large que la classe** : tous les élèves allophones arrivants de
l'établissement, pas seulement l'UPE2A. C'est pourquoi elle a sa **propre liste d'élèves**
(`upe2a-positionnement`), indépendante de Ma classe.

Fichier : `positionnement.js` (`window.POSITIONNEMENT`). Deux tests repris des grilles
CASNAV Lyon, à partir des prototypes de l'enseignante (`uploads/d.html` pour les maths,
`uploads/fr-C.html` pour le français) :
- **Mathématiques** — 20 exercices, paliers CAP → Terminale, trois groupes (socle,
  intermédiaire, avancé). C'est bien de l'**orientation** qui est visée, pas du niveau UPE2A.
- **Français** — compréhension écrite fin de cycle 4, 7 exercices sur 5 domaines
  (repérage, vocabulaire, compréhension, inférence, expression).

Échelle **NE / -- / - / + / ++** (0 à 3 points), celle des corrigés CASNAV. Le bilan se
recalcule à chaque clic : pourcentage par groupe, pourcentage global, palier conseillé
(prudent : un niveau n'est retenu qu'au-dessus de 60 %), phrase de synthèse.
« Tous les élèves testés » compare la classe et exporte en CSV.

La langue première est saisie par élève (liste alphabétique, `LANGUES`) — elle servira au
multilingue, qui reste à faire.

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
`sac`, `cartable`, `litchi`, `olive`, `madame`, `magasin`, `carte`, `mars`, `abricot`,
`karate`, `maison`, `bonbon`.
`gris` est une tache de peinture grise, comme les autres couleurs : rien à remplacer.
Déjà remplacés par des photos : `chat`, `table`, `ballon`, `garcon`, `violon`, `cafe`,
`chaise`, `lit`, `date`, `glace`, `taxi`.
⚠ Signalés : `glace` n'est qu'en 250 px (flou à l'impression) ; `date` porte du faux texte
d'éphéméride ; `taxi` a un fond gris clair. `maison` et `bonbon` sont encore des dessins.
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
5. ✅ **Lecture** — menu en deux entrées, une page par phonème, fiches de son générées,
   Maison des sons refaite dans l'appli (restent les séances des sons non illustrés)
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
| Couleur des syllabes | ordinateur | alternance bleu `#1d4e89` / rouge `#cc2222`, **continue d'un mot au suivant** (comme LireCouleur), **première syllabe du texte en rouge** : la 1re syllabe d'un mot n'est pas toujours bleue |
| Lettres muettes en gris | le canard | `#9aa4b2` |
| Arcs sous les syllabes | ordinateur | arc porté par la syllabe, à sa largeur exacte |
| Mots repères | rouge | photo 7 mm au-dessus de la graphie |

Les cases cochées sont **mémorisées** (`upe2a-aides`) : c'est un réglage.
Le panier de pages à imprimer, lui, **repart de zéro** à chaque session : c'est un panier.

### Règles tranchées avec elle — ne pas y revenir
- Le **e final reste noir** après une consonne (pomme, table, école) : le griser laisserait
  croire qu'on peut l'oublier en écrivant. **Après une voyelle il est grisé** :
  phar-ma-ci(e), la vi(e), jour-né(e), tor-tu(e).
- Le **« ed » final reste noir** : dans *pied* le d sert à faire le son [e].
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

### La consonne double ne se coupe jamais — règle validée en images (30/08)
Elle **attaque la syllabe suivante**, avec le *e* final : chau-ssu-re · cla-sseur ·
go-mme · te-rre · ba-llon · po-mme · pou-be-lle · pro-fe-sseur · chau-sse-tte ·
mai-tre-sse · fi-lle · fa-mi-lle · prin-ce-sse.
⚠ Cette règle **remplace** l'ancienne liste (chaus-su-re, clas-seur, gom-me, mai-tresse) :
ne pas la rétablir. Le tiret manuel `gom-me` continue de forcer une coupe au cas par cas.

### Découpages vérifiés
ca-nard · cra-yon · tor-tue · es-car-got · or-di-na-teur · ta-bleau ·
beau-coup · bou-lan-ger · sep-tem-bre.
**Le « ill » ouvre une syllabe** : ci-trou-ille · mé-da-ille · a-be-ille · feu-ille —
sauf s'il ne reste rien devant (fi-lle, fa-mi-lle).
**Le « i » devant une voyelle prend sa syllabe** : li-on · pi-ed · chi-en · a-vi-on ·
me-nui-si-er · in-fir-mi-è-re · plu-si-eurs · ca-hi-er (h grisé) · jan-vi-er.
Sauf devant le « e » final : phar-ma-cie, cui-si-ne.

### Consonnes finales prononcées
Liste `FINALE_SONNE` dans `lecture-code.js` : bus, mars, os, ours, tous, sac, avec, chef,
six, dix, huit, août, neuf, net, but, test, direct, cool, stop, gaz, sud… Elles ne sont plus
grisées. **sept** est à part : le *p* est muet, le *t* se prononce.

---

## Le chantier lecture — étapes 2 et 3 FAITES, étape 4 à venir

### Étape 2 — architecture Lecture : FAIT

`lecture-sons.js` → `window.LECTURE_SONS` : table des **34 phonèmes** (clé telle qu'elle la
tape dans la progression, notation, graphies, mots repères Retz + photo, geste, lot de
pages de la séance, famille), découpage d'un mot en graphies et `contient(son, mot)`.
Règles assumées : *s* entre deux voyelles = [z], *c* et *g* devant e/i/y adoucis, *t* de
« -tion » = [s]. Le reste est une approximation déclarée, pas une vérité.

La rubrique Lecture a **deux entrées seulement** (validé avec elle) :
**L'apprentissage du code** (la progression des sons, et derrière, la page de chaque son)
et **Lire des textes** (l'ancien « Aider un texte »). La logique : d'un côté déchiffrer,
de l'autre lire pour comprendre.

**Lire des textes a deux onglets** (30/08) : « Texte aidé » (le texte en grand avec les
aides cochées) et « **Fluence** ». Les deux **paginent** : un texte long sort sur plusieurs
A4, avec un bandeau de rappel en tête des pages suivantes et le numéro de page en bas —
rien n'est tronqué. Flèches ‹ › pour parcourir les pages, le bouton d'impression sort tout.

La fiche de fluence : le texte redécoupé en lignes fixes avec le **nombre de mots cumulé
en marge** de chaque ligne (principe repris de MiCetF), en-tête titre + nom + date.
**Deux feuilles à l'impression** : une avec les aides, une nue.
Deux modes : **Test** (une passation d'une minute) et **Entraînement** (un tableau de trois
essais que l'élève remplit lui-même en relisant le même texte).
Sous le formulaire, mots lus − erreurs = **MCLM**, enregistré par élève et par date
(`upe2a-fluence` dans le navigateur), avec l'historique affiché.
⚠ Pas de barème de vitesse par niveau : les repères CE1/CM2 de MiCetF n'ont pas de sens
pour des 16-18 ans allophones (tranché avec elle).
Mise en page de la fiche : **Nom / Date** (date laissée vide) tout en haut, puis le **titre
du texte centré en gras**, puis le texte. Pas de bandeau bleu.
La ligne se remplit sur toute la largeur : la largeur est **mesurée pour de vrai** (canvas,
en px), pas estimée — c'est ce qui aligne nos coupures sur celles de MiCetF.
**Police** (Verdana, Tahoma, Arial, Times, Cursive) et **taille** (Auto ou 13→24 pt) au choix.
Auto cherche la plus grande taille possible, plancher 13 pt.
**Comptage des mots** : deux cases, l'apostrophe et le trait d'union séparent ou non les
mots. Décochées par défaut — « l'ami » et « arc-en-ciel » comptent pour 1.
Fin de fiche : « Nombre de mots lus correctement » avec **trois cases** (essai 1, 2, 3) et
« Nombre de mots du texte ». Une page de plus est créée si ça ne tient pas.
Le champ « Le titre du texte » existe dans les deux onglets ; celui de Texte aidé sert de
repli pour la fluence.
« Réglages lettres et sons » n'est plus une entrée : un bouton **👁 Ce que voient les élèves**
en haut de L'apprentissage du code y mène, et l'écran a un bouton de retour.
« Séances de phonologie » non plus : les pages A, I, O s'affichent dans la page de leur son.

L'apprentissage du code garde l'ajout et l'ordre, mais **chaque son ouvre sa page**
(écran `son`, clé `sonCle`) qui rassemble : la graphie en gros + la notation + écoute ·
le mot repère avec sa photo (ou « photo à venir ») · le geste Borel-Maisonny (a, i, o
seulement) · toutes les graphies du son en capitale, script, Belle Allure script et
cursive · la séance de phonologie · la Maison des sons · **les mots des thèmes où on entend ce son**,
cliquables pour les écouter.

**Ordre de la progression** : plus de flèches ← → (« ça m'agace ») — l'ordre se change au
**cliquer-déposer** par la poignée ⋮⋮. Les 18 sons de départ **ne se retirent pas**
(pas de croix) : seuls les sons qu'elle ajoute gardent la leur. Ordre de départ, revu avec
elle : voyelles (a i o u é), consonnes qui se prolongent (l m r s f v), occlusives (p t),
digrammes (ch ou), nasales en dernier (on an in) — le plus dur à discriminer à l'oreille.
⚠ Sa liste est enregistrée dans le navigateur : le nouvel ordre n'arrive qu'en cliquant
**Liste de départ**.

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

Les fiches génériques du lexique (relier, écrire, étiquettes, support, correction) ont été
**retirées de la page du son** : elles n'avaient pas de sens pour un phonème. Il ne reste que
`sons-fiches.js` : la
**séance de phonologie** (2 pages : en-tête mot repère / oreille + son / geste, puis les
graphies ; J'écoute je répète · J'entends ? je coche, 8 images sans le mot, moitié d'intrus ·
Je lis j'entoure, grille de 27 · les syllabes) et la **combinatoire** (consonnes seulement).
Les six mots sont **tirés au hasard** parmi les mots illustrés portant le son, avec « autre
tirage » et une croix par mot pour le remplacer ; un mot déjà utilisé ailleurs peut resservir.
La **page 2** existe bien : « Je lis. J'entoure les x » (grille de 27) puis « Je tape les
syllabes dans mes mains. Je coche une case par syllabe ».
⚠ **L'aperçu montre toutes les pages d'un document, avec l'ascenseur** — exigence répétée.
Il ne se ferme qu'avec le bouton Fermer (un clic sur le fond le fermait, donc impossible
d'atteindre la page 2), l'en-tête annonce « 2 pages — fais défiler ».
⚠ Les séances **A, I et O recopiées à la main ne sont pas regénérées** : elles s'affichent
telles quelles, le moteur ne sert qu'aux sons suivants.

« Aider un texte » : texte collé + consigne, les **cinq aides** (mêmes cases mémorisées
`upe2a-aides` que Créer une fiche), interligne **manuel** (serré 1,5 · normal 2 · aéré 2,5 ·
très aéré 3) et taille (18 · 24 · 30 pt), aperçu A4 sans lignage d'écriture, encadré ocre
des cas douteux, impression.

La grille des 52 mots repères n'ira **pas** dans Réglages lettres et sons (proposition
abandonnée) : le mot repère vit dans la page de son phonème, là où on le cherche.

Renommer le bloc selon l'écran : « Aider à lire le mot » en Écriture, « Les aides » en Lecture.

### Étape 3 — la Maison des sons : FAIT

`FR - Maison des sons.dc.html`, ouverte depuis l'onglet **Jeux en ligne** de la page du son
par une étiquette « La maison du [x] » (petite maison au toit bleu). **Elle s'ouvre dans
l'application, en plein écran avec un bouton Fermer** — jamais dans un nouvel onglet, qui
perd l'accès aux fichiers. Le jeu n'est pas écrit pour le [ON] : il prend le son de la page
et ses mots, donc toutes les maisons existent déjà.

Règles validées avec elle, ne pas y revenir :
- toit bleu portant **[on]** (jamais la notation phonétique, jamais la liste des graphies),
  une **oreille** blanche à gauche et la mention **ON ENTEND** — on entend, on ne voit pas ;
  geste Borel-Maisonny et image repère à côté ;
- **pas de mots écrits** dans la banque : uniquement des images ;
- le **mot repère n'est pas dans la banque** (il est déjà sur la maison) ;
- banque **mêlée au hasard** à l'ouverture et à chaque Recommencer ;
- petit **haut-parleur bleu** au survol de chaque image pour l'écouter sans la choisir ;
- l'audio dit **le déterminant** : « un ballon », jamais « ballon » ;
- **9 emplacements, 9 mots** ; les cases vides sont visibles en pointillé dès le début ;
- dépose juste → deux notes qui montent + panneau **BRAVO !** (image + mot écrit) ;
  dépose fausse → deux notes basses + bandeau rouge « Essaie encore », l'image reste ;
- toutes les images placées entières, jamais rognées ;
- fin de partie → arpège de victoire + panneau **VICTOIRE !** et bouton **↻ Rejouer**.

À venir : le score qui remonte dans Bilan des exercices, et les autres ateliers de sons
(assemblage syllabique, découpage phonémique) dans leur fichier propre.

### La détection des sons — pièges corrigés, ne pas régresser

`lecture-sons.js` sert au jeu, à l'exercice « J'entends [x] ? » et à la liste des mots des
thèmes. Trois règles gagnées en classe :
- une **graphie nasale n'est nasale que si rien ne rouvre la voyelle** : gomme, pomme,
  homme, comme ne sont pas [ɔ̃] ; femme, banane, ami ne sont pas [ɑ̃] ;
- **on entend, on ne voit pas** : *août* est [u] (découpé aoû + t), *plaît* est [ɛ]
  (p + l + aî + t) — jamais du [a] ;
- on écoute **le mot sans son déterminant** : « la pluie » n'est pas un mot du son [a].

Une liste `ECARTES` retire des exemples les mots à orthographe piégeuse (août, plaît,
s'il vous plaît, femme, monsieur, oignon, automne, paon, second, examen, parfum) : le son
y est, mais la graphie est une exception, donc c'est un mauvais exemple.

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
- **Documentation** : le **mode d'emploi est commencé** (`GUIDE - Accueil d'un élève.dc.html`,
  02/09) et reste à étendre aux autres écrans ; la documentation technique n'existe pas encore.
  Écrits **au fil des étapes**, pas à la fin.
- **Sortir les données** de l'application dans un fichier séparé, au moment où on y touche.

## En attente d’elle

- Les **28 photos** de mots repères manquantes (liste ci-dessus).
- Le **retour de classe** sur la qualité des découpages syllabiques.
- L’ordre des thèmes du tableau élève.
- Les intitulés exacts des **exercices 7 à 9 du maths fin de cycle 2** (devinés le 02/09).
- Le **corrigé officiel de Créteil** pour « Les Trois Frères » (introuvable ; ma proposition
  tient lieu de corrigé en attendant).
- Le **sujet de Buck** (fin de 5e) et le **sujet du maths fin de cycle 2** : sans eux, pas de
  bouton « Télécharger le test » pour ces deux-là.
- Les **livrets dans les autres langues** (arabe, portugais, ukrainien…) : seul l'anglais est
  rangé dans `tests/`.
