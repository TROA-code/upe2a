## 05/10 (soir) — à reprendre
- ✅ `DELF.html` = fichier ISOLÉ (A1 sujet 1, aucune sortie, tout inclus, 5,4 Mo), fabriqué depuis `DELF-seul.dc.html` (SEUL forcé) + images/sons en base64. En ligne : **https://troa-code.github.io/upe2a/github/DELF.html** (elle l'a déposé dans `github/`, majuscules). Si le sujet 1 change → refabriquer.
- ✅ Publication 05/10 : `?v=43`. ⚠ Dépôt public contient `A-FAIRE.md`, `DOC-TECHNIQUE.md` et des vieux dossiers (`a-imprimer-22-09`, `appli-22-09`, `export-github`, `github`, `publier`, `autonome`) → lui proposer de les retirer. `uploads/` absent : OK.
- ⏳ Voix de CÉLINE (profil voicebox « Celine2 ») pour les 25 mots repères + 26 noms de lettres → `audio/mot-<mot>.wav`, `audio/lettre-<l>.wav`. Reçus : ananas, ballon, carotte, deux. « je » et « fenêtre » ont planté le serveur (500) → script console avec DEJA + zip. À relier ensuite : 3 endroits des mots repères + jeu de l'oie.
- ✅ Jeu de l'oie : plateau LETTRES en 1er, « Jouer seul » (lettres seulement, à étendre après essai), 8e tableau élève vert (`?eleve=1` = pas d'Imprimer).

## ✅ 04/10 — `JEU - Les syllabes.dc.html` (nouvelle appli, ses choix)
- 5 jeux : J'entends je touche · Je fabrique (c + v) · Je reconstruis le mot · La syllabe qui manque · Je lis vite (Lent/Moyen/Vite). Manches de 6, BRAVO/OH ZUT, pas de score, toucher seulement.
- ⚙ Les lettres : consonnes + voyelles choisies par elle (localStorage `syllabes-lettres`). Mots des jeux 3-4 = banques des jeux de sons A/I/O/M (photos `mot-*`), filtrés sur les lettres choisies.
- Rangé (mon choix, elle n'a pas tranché) : dernière case du tableau « Lettres, sons, syllabes », après Glisse et lis. ⏳ À lui confirmer.
- ✅ VOIX : la synthèse du navigateur disait « P-E », « na » pour « da ». 48 syllabes (m s l r t p n d × a i o u e é) fabriquées avec la voix de STEEVE sur voicebox (voice.educ-ai.fr, pas de clé d'API ; « celine » rendait mal) → `audio/syl-<syll>.wav` (é → `-aigu`). Le jeu les joue ; autre syllabe/mot = voix du navigateur.
- ⚠ voicebox refuse les appels venant d'une autre page (CORS) : `OUTIL - Voix des syllabes.dc.html` ne marche donc PAS depuis l'appli. Méthode qui marche : script collé dans la console (F12) SUR voice.educ-ai.fr (POST /generate {profile_id, text, language:'fr', seed:42} → attendre status completed via /history/{id} → GET /audio/{id}). Chrome : « Autoriser » les téléchargements multiples. Nouvelles lettres → refaire le script avec ces lettres.
- ✅ Consignes des 5 jeux + « Bravo » aussi avec la voix de Steeve : `audio/syl-phrase-<ecoute|fabrique|ordre|manque|lis|bravo>.wav` (table PHRASES_AUDIO du jeu).
- ⏳ À lui demander : Steeve est-il d'accord pour que sa voix soit publiée ?
- 📌 SON AUTRE APPLI (05/10, elle la cherchait le 04/10) : https://troa-code.github.io/TROA-code/ (dépôt `troa-code/TROA-code`). Ex. « Machine à syllabes » son ON (règle m devant m b p) : …/LE%20SONS%20ON/2-assemblage/index.html. ⏳ Ce qu'elle veut en faire : inspiration / lien / refaire dans l'appli.
- ✅ Niveaux (04/10) : N1 = m f l j b r ; N2 = N1 + t p v n d s. Mots : syllabes CV strictes seulement. N1 : robe, bébé, lire (+ rame). N2 : tomate, salade, vélo, moto, banane, jupe (+ numéro, menu, vase). Refusés : lama, lime, mule, poire, bureau.
- ⏳ Photos à recevoir : `mot-rame`, `mot-numero`, `mot-menu`, `mot-vase` → les ajouter alors dans MOTS du jeu des syllabes (rose, mare, valise, pile, lune, farine, dame ajoutés le 04/10).
- ⏳ robe et tomate : o OUVERT ≠ syllabe « ro/to » du jeu. Je propose de les retirer, elle n'a pas encore tranché.

## ✅ 04/10 — Accueil élève : 7e tableau « PRÉPARATION AU DELF » (vide, « bientôt »)
- Tableaux réduits d'1/4 : 4 colonnes au lieu de 3 (4 + 3).
- ✅ Maquette `DELF - Préparation.dc.html` (A1 / A2, entraînement À L'ÉCRAN, ses choix) : 4 cartes J'écoute / Je lis / J'écris / Je parle + durée, chrono, 🔊 sur chaque consigne, « J'ai fini » → BRAVO / OH ZUT par question. Sujet A1 « Placebo » (son PDF, copié en `docs/delf/`, audios en `audio/delf-a1-ex2-oral-1..4.mp3`). Branchée sur le tableau de l'accueil élève.
- ✅ Exercice 3 oral : ses 6 photos Gemini en couleur (`clean/delf-a1-oral3-a..f.webp`), grille 3 × 2 comme le sujet, chiffres 1-6 sur une ligne. Textes visibles (enseigne « Village féérique » en F…) : elle garde tout (« on laisse tout »).
- ⏳ Images manquantes : l'emploi du temps de Robert (p. 8), les produits du dialogue simulé.
- Lecteur audio : ▶ J'écoute / ❚❚ Pause + barre où l'on touche. PAS de « 10 s », PAS de stop, PAS de « Reprendre » (ses refus).
- ✅ Exercice 4 oral : l'audio a 5 situations (1re = « Ces élèves me fatiguent… »), le papier 4. Refait sur l'audio : S1 Où est-ce ? (école) · S2 « À quelle heure sortent-ils demain ? » (3 h) · S3 Qui parle ? · S4 Où est-ce ? (café) · S5 De quoi ? (animal).
- ✅ « SUJET 1 » fait (son OUI) : accueil DELF = A1/A2 + une carte par sujet (numéro + image repère, le bus + 4 mini-pictos) → le sujet → ses 4 épreuves. Retour : épreuve → sujet → sujets → accueil. Réponses remises à zéro à chaque séance (rien en localStorage). ⏳ SUJET 2 demain : ajouter un objet dans `A1` de `data()`.
- ⏳ Logos J'écoute / Je lis / J'écris / Je parle : prompt donné (trait noir, sans texte), noms `clean/pictos/delf-ecoute/lis/ecris/parle` — attend ses images.
- ⏳ Exercice 3 oral : corrigé 6 situations / transcription 5 — à vérifier sur l'audio.
- ⏳ Entretien : j'ai retiré « marié(e) / enfants / profession / travail » de la liste d'exemples (16-18 ans) — à lui confirmer.
- ⏳ A2 : aucun sujet reçu. Les fichiers d'`uploads/` (DELF) sont copiés, PAS supprimés.
- ⏳ Proposé, sans réponse : semaine affichée (28/09-02/10 un dimanche), Histoire-géo vide alors que des diaporamas existent, aperçu « Les thèmes » (rectangle rouge, stylo), petites lignes sous les tableaux, bandeau d'outils cliquable par les élèves.

## ✅ 04/10 — Livret « Se repérer dans le temps » : photos `hist-*` reçues
- ⏳ 8 images pour l'Activité 9 (tableau des mois Mars/Juin/Octobre/Décembre) : `hist-habits-printemps/ete/automne/hiver`, `pictos/thermo-tres-froid/frais/chaud/tres-chaud`. Le temps qu'il fait utilise les pictos existants `mot-soleil/pluie/vent/neige`.
- ✅ Diaporama « Se repérer dans le temps (la journée) » : panorama `hist-course-soleil` + 6 photos, branché dans `histtemps`.
- ⏸ **Livret « Se repérer dans le temps » MIS DE CÔTÉ (04/10, à sa demande : « on garde, je ferai plus tard »).** Ne rien y toucher sans qu'elle le rouvre. État : 19 pages, Activités 1 à 9 ; Activité 1 = rond 15 cm avec 9 cases (jour / les deux / nuit) sous 2 volets ; 6 photos `hist-jour-*` / `hist-nuit-*` reçues et placées ; dernière correction : marge du bas p. 02 (écarts 3,5 mm, bandeau resserré) — à revérifier à la reprise.
- ✅ Pictos reçus (04/10) : `pictos/colle.webp`, `pictos/decoupe.webp` (avec le mot),
  `pictos/ciseaux.webp` (ciseaux seuls, recadrés de `decoupe`, à poser sur un trait).
  Livret : badges remplacés, consigne « Je découpe sur les tirets » sur chaque planche,
  pli gris plein + « je plie » sur les volets jour/nuit.
- 21/21 dans `clean/` : arbre-printemps/ete/automne/hiver · matin, midi, apres-midi, soir ·
  bus-avant/pendant/apres · repas-avant/pendant/apres · sablier, minuteur, chronometre,
  montre, horloge, reveil, calendrier.
- ✅ Livret codé (son « oui ») : `HIST - Livret - Se repérer dans le temps.dc.html`, 12 pages,
  branché dans l'Espace enseignant (`histtemps`). PDF CENICIENTA retiré et supprimé.
- ⏳ Jour / nuit : pas de page (aucune photo). Lui proposer 2 photos si elle le veut.

## ✅ 03/10 — Histoire : plus de cul-de-sac
- Les 6 livrets HIST ont « ← L'accueil » (haut gauche, caché à l'impression).
- Les 6 diaporamas HIST ont la barre standard (retour + vignettes, haut droite) et l'avance au clic.

## ⏳ OUVERT AU 03/10 (fin de conversation)
- Photos `hist-*` des 6 livrets d'histoire (~35) — prompts à lui donner quand elle les demande.
- Livret des longueurs : exemples fond gris + bord noir, retrait des jours de la semaine — attend son oui.
- Livret 3 de Grandeurs et mesures : L'heure (GM.36 → GM.58) — pas commencé.
- Évaluations longueurs / monnaie / heure à refaire en vraies fiches (après les livrets).
- « Se repérer dans le temps » : proposition d'une frise murale des 6 périodes — non tranchée.
- Page « Séance à distance » (visio WhatsApp) — proposée, attend son oui après son test.
- Refaire `publier/` + zip + `?v=43` avant la prochaine mise en ligne.
- Collection « nombres » de FICHES_SRC : plus affichée nulle part, à vérifier/nettoyer.

# À FAIRE — tout ce qui reste ouvert (arrêté au 02/10/2026)

- ✅ 02/10 : **Grandeurs et mesures** — son PDF mimiclass (41 fiches) à couper en 3 livrets au gabarit de SES livrets (couverture, sommaire + Je fais le point, fiches avec jours/compétence/objectif, bilan, J'ai appris, consignes, + corrigé). ✅ Livret 1 · Les longueurs (8 fiches, rangé, onglet sorti des « vides »). ⏳ Livret 2 · La monnaie, Livret 3 · L'heure : à faire après son retour sur le livret 1. ⚠ Imprimer à 100 % (segments en vraie grandeur). (abandonné 03/10 : elle a refusé le PDF brut) Évaluations = SES fiches mimiclass telles quelles (`docs/grandeurs-mesures-mimiclass.pdf`, 58 fiches GM.01-58 + corrigés p. 33-64) : 3 entrées avec les pages à imprimer (longueurs 4,7,8 / monnaie 13,15,17 / heure 19,20,21). Découpage en PDF séparés impossible ici (trop lourd) — à faire si un outil le permet. ⚠ L'heure va jusqu'à GM.58 (pas 41) : heures de l'après-midi, minutes, problèmes. Hachette CE1 « Pour comprendre les maths » reçu : comparé, apports = problèmes (schéma en barres), calcul expliqué, « Je cherche » — rien fait.

- ✅ 02/10 : tableau « Les lettres et les sons » renommé **« Lettres, sons, syllabes »** ; « Glisse et lis » y entre en DERNIÈRE case (sa demande). Sa place sur l'accueil élève = **« Histoire, géographie, EMC »**, vide (« on voit plus tard »). ⏳ Contenu histoire-géo-EMC à venir. `?v=41`.
- ✅ 02/10 : `FR - L'ordre alphabétique` (d'après sa fiche clicmaclasse, refaite : 3 niveaux — 8 séries de 5 lettres / 4 séries de 4 mots repères en photo, 1re lettre / 4 séries même 1re lettre, 2e lettre à surligner — + corrigé calculé). Aucune image à générer (bébé et mur écartés : dessins). Rangé : Écriture → Les mots repères. ⏳ Côté élève (« Lettres, sons, syllabes ») : PAS fait — c'est une fiche papier, une case d'atelier ne l'ouvrirait que pour l'imprimer ; lui redemander.

- ✅ 02/10 : onglet Maths « **Automatismes** » (pas « calcul mental », son mot) avec sa
  progression cycle 2 (`docs/progression-automatismes.webp`) + intertitre « Calculs » (entrée
  `['§Titre']` dans DOCS_COLL) avec les **8 livrets Top Chrono** (`MATHS - Top Chrono - Livret 1..8`,
  n° 1-41, séries dans `top-chrono-series.js`, page de garde Nom/Prénom/Classe). Ancien Top
  Chrono, v2 et pages de garde par élève SUPPRIMÉS (02/10, son oui).
- ✅ 02/10 : **bandeau d'outils** au-dessus des tableaux de liège (accueil élève, ORDINATEUR
  seulement — masqué sur téléphone/tablette, calé à droite pour ne pas toucher la fenêtre) :
  ⏱ Chrono (plafond 3 min, 2/3/4 ; DISQUE qui se remplit + chiffres qui montent) et roue
  « À qui le tour ? » (EDT.ELEVES ; `pasArrive` = grisé hors roue : Sumaya, David, Alpha ;
  touche = absent ; « Une seule fois chacun » allumé par défaut, ✓ vert = déjà passé ; ↺ seul
  = réinitialiser ; prénoms ajoutés à la main en localStorage ; TOURNE = bouton blanc central ;
  prénom tiré À CÔTÉ de la roue, jaune sur vert ; cliquetis pendant le tour ; PAS de confettis —
  déconseillé, elle n'a pas tranché). Les prochains outils s'y ajoutent — jamais en languette.
- ✅ 02/10 : `COORDO UPE2A` — rubrique **Contacts** (adresse, responsable, éducateur·rice,
  téléphone) remplie par ELLE, en localStorage seulement (jamais dans le code : publié).
  Alpha, Saifur et Bilal ajoutés à son tableau ; contacts d'Alpha/Saifur/Bilal saisis dans son
  navigateur. ⏳ Bilal : n° de rue « 67 » à vérifier (caché par le curseur). ⏳ SYLLA Mahamadou
  dans le tableau mais pas en classe : elle ne sait pas (02/10) — on le LAISSE, ne pas y revenir sans elle. — ⏳ Les dispositifs à la rentrée : image coupée + curseur, à renvoyer ;
  rubrique « Infos de l'équipe » proposée, pas de oui.

Liste complète, à relire avec `INSTRUCTIONS-APPLICATION.md` (qui garde le détail, les
décisions et les pièges). Ici : seulement ce qui reste à faire.
**Rien ne se code sans son accord explicite.** Deux colonnes dans chaque section : ce que
**je** peux faire seul, et ce qui attend **elle** (une photo, une info, un choix).

---

## 00 · COMMENCÉ ET PAS FINI — du 29/09 au 02/10 (à traiter en tout premier)

Elle : « j'ai commencé des morceaux sans finir… n'oublie rien ». Chaque ligne dit ce qui
manque et QUI le débloque.

### Administratif (`docs/administratif/`)
- ⏳ **Sortie PAGNOL** (collège Marcel Pagnol, 63 rue Gustave Brindeau ; classe ULIS de
  Mylène SWIATEK ; les ULIS initient les miens aux jeux de société, en période 2 les UPE2A NSA
  animent à leur tour — une rencontre par période ; départ du lycée 10h50, à pied).
  **ELLE** doit donner : la DATE de la séance de période 1, l'heure de RETOUR, le NOMBRE
  d'élèves, les ACCOMPAGNATEURS (elle + M. CRESSEN ?). Elle doit aussi valider les 3 objectifs
  proposés. Ensuite **MOI** : autorisation de sortie (PDF) + fiche action (Word, depuis
  `MODELE - Fiche action -vierge-.docx`).
- ✅ Valmy (12/10, « Roule galette », Mme Audrey COLIN, M. CRESSEN, 7 élèves, départ 08h50) :
  autorisation + fiche action faites. ⚠ La fiche Word avait été abîmée (j'avais coupé le
  XML du tableau) : refaite en vérifiant le fichier. **Règle** : remplir un .docx en
  remplaçant le texte des balises `<w:t>` existantes, ne jamais couper la structure, et
  toujours vérifier que le XML est valide avant d'enregistrer.

### Le code — sons (elle suit PILOTIS)
- **Progression décidée le 01/10** : a · i · o · **m** · **s** · u · é · l · r…
  ⏳ **ELLE** : sur son TÉLÉPHONE et sur l'ordinateur du LYCÉE, faire glisser M puis S après le O
  (la progression est enregistrée sur chaque appareil, pas en ligne).
- ✅ `JEU - Le son M` + `FR - Livret des sons - son M` (repère MOTO, aucun piège, pas de m
  nasal). ⏳ **ELLE** : écouter la voix du jeu (« mmm » au lieu de « emme ») et dire si ça sonne bien.
  ✅ `clean/geste-son-m.webp` reçue le 02/10 (main à plat sur la gorge, bouche fermée). Sert
  aussi à l'affiche « Ça explose / Ça dure » (zigzags rouges = ça vibre, zigzag GRIS BARRÉ = ça ne vibre pas).
  ⏳ Picto « ça vibre » jugé « moyennement parlant » par elle : pistes proposées (téléphone en mode
  vibreur / silencieux — ma préférence ; deux photos zzzz/ssss ; vidéo + QR). À reprendre quand elle veut.
- ✅ `AFFICHE - Ça explose, ça dure` (02/10) : SES deux affiches refaites avec les mots repères
  et toutes les graphies ; ses images extraites dans `clean/pictos/son-*`. l r m n en bande
  sur l'affiche 2. « Ça ne vibre pas » = zigzag GRIS BARRÉ (pas de croix sur la gorge : elle
  dirait « ne fais pas le geste » — elle a validé). Marges 1,5 cm : exception qu'ELLE a
  autorisée pour cette affiche seulement. ⏳ Rangée nulle part : lui demander où.
- ✅ `FR - Livret des sons - son S` (repère SALADE, « le S de salade ») et `AFFICHE - Le son S`.
  ⏳ **ELLE / MOI** : la ranger « avec les exercices sur le son » — ni le livret ni l'affiche ne
  sont accrochés à un menu. ⏳ Pas de `JEU - Le son S` : à faire quand on arrivera au S.
  ⏳ Photos pour enrichir le S : tasse, savon, os, cactus, sifflet, sapin, hérisson.
- ⏳ **Exercice « s / ss »** (le cahier qu'elle a montré : on dit le mot, on écrit s ou ss, le
  début du mot est donné) — elle veut que je le refasse. **ELLE** doit trancher : (1) y mettre
  les mots en [z] (maison, rose, chaise, fraise), alors qu'elle les a trouvés « piégeux » dans
  le livret du S ; (2) fiche à part, après le livret du S ? ; (3) Seyès ou sa réglure
  ciel/herbe/terre. Photos manquantes : tasse, valise, coussin.
- ⏳ Les livrets des sons M et S ne sont accrochés à aucun jour de l'emploi du temps.

### Images
- ⏳ **`mot-sac` est un dessin d'enfant** (200 px). Proposé : (1) mettre `mot-sac-kraft` dans
  le livret du S tout de suite ; (2) une vraie photo de sac à dos pour toute l'appli (prompt
  donné). Sans réponse.
- ⏳ **`mot-kilo` est très mauvaise** (dessin 300 px ; sert aussi à la lettre K du cahier
  d'écriture). Proposé : un poids en fonte « 1 kg » (le texte gravé est la seule exception à la
  règle). Sans réponse.
- ⏳ **Verbes d'action en dessin au trait** : 13 restent à générer (colorier, trouer, rire,
  remuer, insulter, se coiffer, se disputer, plier ; porter, laver, prendre, regarder,
  acheter). Les 6 nouveaux (s'accroupir, ouvrir, fermer, remercier, couper, partir) ne sont
  PAS dans le thème « Les actions » : elle doit dire lesquels y vont.
- ⏳ Photo du marché `lieu-marche` : 600 × 300 seulement, floue en grand.

### Le livre « La maison » (façon Book Creator)
- ⏳ **ELLE** doit choisir : (1) un thème à part « Les pièces de la maison » (11 lieux) — mon
  conseil — ou (2) les pièces ajoutées au thème « La maison » (qui a déjà les objets).
  Ensuite : publier dans les DEUX `BANQUE`, ranger le livre dans le thème, et 7 photos de
  pièces à recevoir (le thème reste caché côté élève tant qu'elles manquent).

### Maths
- ⏳ **Top Chrono en ligne** : « on verra plus tard » (plan en §0, attendre son oui).
- ⏳ Idée proposée, sans réponse : un tableau « Mes temps » au dos de la page de garde du Top Chrono.
- ✅ Top Chrono papier : 10 séries, numérotées à la suite, N&B ; n° 1 = additions jusqu'à 10 sans
  « 1 + », n° 2 = additions qui dépassent 10.

### Le livret « Au marché »
- ⏳ **Mémos dans le style de sa collègue** (bandeau « Rappel : », bulles pastel) : être/avoir
  proposé ; « le, la, les » et « Combien y a-t-il de… ? » proposés en plus — sans réponse.
- ⏳ Le prochain métier (semaine « découverte d'un métier ») n'est pas encore choisi.

### Publication
- ⏳ **L'appli en ligne était CASSÉE** après son push du 28/09 (fichiers copiés au mauvais
  niveau dans `Documents\GitHub\upe2a`). Jamais revérifié avec elle. Depuis, beaucoup de
  nouveaux fichiers : refaire `publier/` + incrémenter `?v=` AVANT sa prochaine publication,
  et vérifier ensemble sur https://troa-code.github.io/upe2a/ .
- ⏳ **Parcours des sons tronqué sur l'écran de l'ordinateur** (sa capture du 30/09) : à revérifier en ligne.

## 0 · OUVERT AU 26/09 (à traiter en premier)

- ⏳ **TOP CHRONO EN LIGNE** (28/09, « on verra plus tard ») — plan proposé, PAS encore validé : 5e tableau de liège « Les maths » côté élève (après « Les lettres et les sons »), une boîte avec Top Chrono dedans. Niveau ● / ●●, séries n° 1…, 10 calculs un à la fois, toucher parmi 3 cases, consigne dite, BRAVO / OH ZUT sans compter, chrono = l'élève contre lui-même (« ton temps », « ta dernière fois »), aucun classement. Mêmes séries que `MATHS - Top Chrono (papier)`. ⚠ Attendre son oui avant de coder.
- ✅ **TOP CHRONO PAPIER** — remplacé le 02/10 par les 8 livrets (voir en tête).
- ✅ **PAGES DE GARDE MATHS** (28/09) — `MATHS - Pages de garde.dc.html`, 9 élèves. ⚠ Liste d'élèves recopiée à la main : la tenir à jour avec `emploi-du-temps.js`.

- ✅ **AU MARCHÉ** (27/09) — lundi 28/09, 10h35 : puzzle en mode syllabes (`?img=lieu-marche&mode=syllabes`), 2 audios (`audio/`), `FR - Diaporama - Au marché` (8 étapes, `clean/diapo-marche-1…8`), `FR - Livret - Au marché` (N&B, 14 pages). `?v=38`. ⏳ À publier.

- ✅ **`publier/` refait** le 28/09 (`?v=39`). ⏳ Mise en ligne à revérifier avec elle (appli cassée après son push : fichiers au mauvais niveau).
- ⏳ **Ranger le livret des mots repères** — où et sur quel jour : attend SA réponse.
- ⏳ **Parcours des sons sur téléphone** : à confirmer par elle après publication.
- ✅ **Jeu de l'alphabet** (26/09) : images qui disparaissaient après un toucher — corrigé, `?v=36`. À publier.
- ✅ **`JEU - Le son O.dc.html`** (26/09) : 24 mots avec [o] (o, au, eau ensemble), 23 sans dont 4 pièges (poire, poisson, mouton, citron — 2 max par manche). Accroché au parcours (case o).
- ✅ **Vignette du parcours** (menu) : ses pastilles suivent les sons prêts (a · i · o). ⚠ Un nouveau jeu de son s'ajoute à `JEUX_APPLI` (parcours) ET `VIGNETTE_JEUX` (espace enseignant). `?v=37`.
- ✅ **Livret du son I : le Y ajouté** (26/09) — couverture et fiche 1 (Y · y en 5 écritures), fiche 5 (y/Y à entourer, v et u en lettres proches).
- ✅ **`FR - Livret des sons - son O.dc.html`** (26/09) : 10 fiches, o · au · eau, repère POT. Étiquettes à trier du son O ajoutées à la feuille commune. ⏳ Rangé nulle part : lui demander où.
- ✅ **Niveaux d'écriture** (26/09) : fiche 7 = niveau 1 (un rond) dans les 3 livrets ; fiche 7 bis « J'écris une phrase » = niveau 2 (deux ronds), livret du son O seulement : verbe imposé (manger, boire, écrire, dessiner) + objet du son, l'élève choisit je/il/elle, formes données. ⏳ À ajouter aux livrets A et I ? Question posée.
- ⏳ **Son O — écriture** : « il faut absolument qu'ils écrivent un peu » — forme à décider avec elle.
- ⏳ **Le sac dans « La maison »** : elle s'en étonne — le retirer ? Question posée.
- ⏳ **Mots repères sans photo pour les sons Retz** : « huit » [ɥi] et « peigne » [ɲ]
  (pas utiles au livret alphabétique, mais manquants dans `lecture-sons.js`).
- ✅ Fait le 25/09 : pictos taper et montre (plus aucun cadre pointillé).

## 1 · CE QUI ATTEND UNE IMAGE D'ELLE

| Où | Ce qui manque |
|---|---|
| `MATHS - Lexique de mathématiques.dc.html` | **4 photos** : `mot-piece`, `mot-billet`, `mot-monnaie`, `mot-balance`. Les 41 autres cases sont finies. ⚠ Pas celles de son document source, filigranées. |
| Mots repères | `mot-pot` (l'actuelle est un dessin au trait, 172 px). |
| Fiches métier | `mot-docteur` (retirée le 05/09, basse résolution) et `mot-coiffure` (ciseaux + peigne, perdue). |
| « Glisse et lis » | 3 illustrations encore en emoji : **zip**, **pull**, + 1 à retrouver. Nommage `illu-<mot>.webp`, jamais `mot-`. |
| « Tout le matériel » (pressing) | Les 5 images reçues sont **inutilisables en l'état** : curseur violet incrusté, fonds beiges, convoyeur sépia (mannequin de repassage, roll, convoyeur, cabine de détachage, chariot de lingerie). ⚠ Le curseur vient de la **capture d'écran** : utiliser le bouton de téléchargement. |

## 2 · CE QUI ATTEND UNE INFO OU UNE DÉCISION D'ELLE

- **Les lieux et le point de vigilance, métier par métier** (`ORIENTATION - Mon avenir au Havre.html`) : 1 fiche sur 21 est faite (agent de pressing). Il faut qu'elle les **dicte** — deux lignes par métier, en « je », rien d'inventé.
- **Le rangement** — son mot : « y a plein de choses non accrochées ». Voir §5, c'est le plus gros chantier.
- **Où brancher `sommaire.html`** : plus rien ne le relie à l'appli (il tient les livrets imprimables).
- **« brosse à chiendent »** : le catalogue du lycée écrit « brosse à chien dent », corrigé — à confirmer.
- **Les vidéos du panneau « Cette semaine »** : le mécanisme est prêt, elle n'en a accroché aucune. Et confirmer l'emplacement du panneau (onglet sur l'accueil élève, pas affiche au mur).
- **Photos du thème « Le corps »** : trois réserves jamais tranchées — les cercles et la flèche rouges sur six photos, les dents (autre modèle), la jambe en legging.
- **COORDO UPE2A** : que veut dire le statut **« In »**, et veut-elle un **export Excel** en plus du CSV.
- **Alternance de couleur syllabique** : sur tous les thèmes ou seulement les premiers ?
- **Commander le diaporama depuis son téléphone** (22/09, « comme sur Canva ») — REMIS À
  PLUS TARD par elle, à sa demande. Ce qui a été établi : une télécommande façon Canva est
  impossible ici (il faudrait un serveur pour faire parler les deux appareils ; l'appli est
  un simple fichier). Trois chemins praticables, dans l'ordre de fiabilité : une
  **télécommande de présentation Bluetooth** (~15 €, envoie les flèches du clavier, rien à
  installer) ; une **appli de clavier Bluetooth** sur Android — elle a installé « Wireless
  BT Mouse and Keyboard », l'appli ne trouvait rien, on n'est pas allé au bout (pistes :
  autorisation de **localisation** obligatoire pour la recherche Bluetooth, ordinateur à
  laisser en « Ajouter un appareil », appairage souvent à lancer DEPUIS l'ordinateur) ;
  ⚠ impossible sur iPhone, iOS interdit l'émulation de clavier Bluetooth ; ou **projeter
  depuis le téléphone** (HDMI / Chromecast), et là le doigt sur l'écran suffit puisque le
  diaporama avance au clic. ⚠ Dans tous les cas, cliquer une fois sur l'image avant :
  sans le focus, les flèches partent dans le vide.
- **Article des mots** (« UNE POMME », « DU PAIN ») : lui donner la liste des genres incertains à trancher.
- **Rallye / jeu de piste** : l'entrée du lycée — LE HALL ou LE PORTAIL DE LA COUR, elle hésitait.
- **Dépôt GitHub** : `uploads/` contient des documents sources et des **photos d'élèves**, `tests/` et `docs/` des PDF Canopé / CASNAV / Charivari. **À exclure d'un dépôt public.**

## 3 · GLISSE ET LIS

- ⏳ **Lui montrer** l'escalier (K C T D), le toboggan (B) et le tunnel (P) : dessinés le 20/09, jamais validés par elle.
- ⏳ **Le tunnel en gris ?** Sa photo de l'appli d'origine montre une arche **grise**, le mien est une colline verte. Question posée, sans réponse.
- ⏳ Les 3 illustrations en emoji (voir §1).
- ✅ Fait : 3 niveaux (continus / explosifs / complexes), paysage par consonne, deux bulles seulement, bande latérale en miniatures de décor, clé `glisse-et-lis-9`.

## 4 · MON AVENIR AU HAVRE

- ⏳ **26 `officielTexte`** : seul MAÇON a son descriptif de référentiel. À **copier** des fiches diplôme (ONISEP) — ne rien rédiger.
- ⏳ **Les CAP de l'UFA Jules Le Cesne** (page du CFA académique inaccessible), puis la ligne **« COMMENT ? à l'école / en alternance »** sur les fiches des lycées.
- ⏳ **Les formations du Bâtiment CFA** : 2 sur plus de 20. Ne rien deviner.
- ⏳ **Vérifier les coordonnées des deux CFA** (estimées) d'un coup d'œil sur la carte.
- ⏳ **Le lexique du matériel** (bouton « Les mots ▸ ») : 10 mots courants en grand, catalogue complet en dessous. Le niveau se règle **dans** le lexique, pas par un choix « je découvre / j'approfondis ».
- ⏳ **Illustrer « Tout le matériel »** (§1) — elle a dit « je verrai plus tard ».
- ⏳ **Les étapes des autres métiers** : seul le pressing a son circuit en 8 étapes. Au fur et à mesure, ce n'est pas un gabarit à remplir 26 fois.

## 4 bis · LA SÉQUENCE « DANS PARIS » (22/09) — ce qui reste

Fait : l'écran **Moment littéraire** est ouvert (il était « à venir ») et porte la séquence,
son **diaporama** (12 vues, série cumulative de la chambre), les deux jeux d'étiquettes,
**« Écris les mots »**, le texte de la semaine et l'**audio d'Éluard** en lecteur. Accroché à
mardi 22 (les documents) et mercredi 23 (l'audio).

- ⏳ **Les quatre premières vues du diaporama** — paris, une rue, une maison, un escalier —
  sont encore dans l'ANCIEN style (illustrations isolées du PDF), alors que les sept
  suivantes sont sa série cumulative de la chambre. Le diaporama change donc de monde au
  milieu. Question posée deux fois, sans réponse : les refaire dans le même décor (une
  maison vue de la rue, puis l'escalier de cette maison) ?
- ⏳ **`FR - Fiche 2 - Le son A.dc.html` n'est accrochée à aucun menu** : quatre pages pour
  la maison (j'entends a ? · où est le a ? · je colle · je découpe). À ranger — derrière le
  son A du plateau, ou à une date ?
- ⏳ Le **soleil orange à visage** dans `poeme-paris-rue` : seul élément enfantin de la
  série, elle a dit de le laisser (« non, laisse »). Ne pas y revenir.

## 5 · LE RANGEMENT — le chantier prioritaire

Rien ne bouge sans son accord. Ce qui n'est accroché à **aucun menu** :

- `FR - Jeu des syllabes - Je colle et j'écris.dc.html` — deux pistes proposées : « Les planches en images » (Lexique) ou **créer une collection sous Lecture**. Sans réponse.
- `FR - Les sports en images.dc.html` — même question.
- ⚠ **Les planches en images ne sont atteignables depuis aucun menu** : la collection existe dans le code, mais il n'y a pas d'entrée « Fiches à imprimer » sous Lexique (il y en a une sous Écriture et sous Mathématiques). Proposition faite le 18/09, sans réponse.
- `FR - Livret d'évaluation - Lecture période 1.dc.html` — rangé nulle part.
- ✅ Les **supports des mots repères** — rangés le 22/09 dans la collection *Écriture → Les mots repères* (7 documents).
- **La frise de l'alphabet** et le livret d'évaluation → « Affichages de la classe ».
- ⚠ **Retirer de `sommaire.html`** la rubrique « Affichages » créée sans son accord.
- **Faire l'inventaire complet des fichiers orphelins** de la racine à cette occasion.
- Pas de fiche « Les métiers » dans « Mes mots », alors que le thème existe avec ses 17 photos.

## 5 bis · LA SEMAINE 1 — PARIS (21-22/09)

Fait et accroché : le **puzzle de Paris** (lundi, rituel), **« Je lis, je fais »** aux trois
niveaux A1.1 / A1 / A2, le **texte de la semaine** aux trois niveaux, la **fluence A2**,
**« a ou à ? »** (mercredi), les **étiquettes du poème**, l'**affiche UPE2A** à colorier.

- ⏳ **`JEU - Le son A.dc.html` n'est accroché à aucun menu** : trois jeux (j'entends a ? /
  où est le a ? / je trie) avec voix et photos. Où le ranger — sous « Jeux de classe », ou
  dans la séance du son A ?
- ⏳ **La fiche papier du son A**, sur les mêmes mots que le jeu : demandée (« des jeux
  numériques avec l'ordi et après sur fiche »), pas encore faite.
- ⏳ **Quatre images de la banque ne sont pas des photos** et tombent dans ce jeu :
  `mot-nuage`, `mot-bus`, `mot-taxi`, `mot-maison` (dessins ou pictogrammes). Les retirer du
  jeu, ou les remplacer dans la banque ? Question posée, sans réponse.
- ⏳ **Le créneau « Littéracie » du mercredi** est encore marqué « à préciser » dans
  l'emploi du temps : elle n'a jamais dit ce qu'elle y fait.
- ⏳ **La découpe syllabique est ÉCRITE, pas orale** : `ba-na-ne` = 3 syllabes, tranché le
  21/09 contre un jeu du commerce qui en donnait 2. Le « e » final compte toujours
  (`table` 2, `carotte` 3, `fenêtre` 3) — les élèves segmentent **pour écrire**. Le jeu
  « Combien de syllabes ? » a été **retiré** (« aucun intérêt »), ne pas le remettre.
- ⏳ **La semaine 2 est un métier** (alternance décidée jusqu'à la Toussaint) : **maçon**,
  pour enchaîner sur maison / chambre / les lieux du poème d'Éluard.

## 5 ter · OUVERT DEPUIS LE 22-23/09

- ✅ **`JEU - Le son I.dc.html`** (23/09) : copie conforme du son A, 27 mots avec [i] + 20 sans (dont pièges à l'œil : poire, lait, train, lapin…). Accroché au **parcours des sons** (case i). ⏳ À lui confirmer : les carrés rouges repris du son A.
- ✅ 02/10 : `MATHS - Numération 4.1 - Le chèque` (son doc n° 5 refait sur un vrai chèque, banque
  fictive, 2 par page, étiquettes en option) rangé en Numération après N°4. De ses 7 docs « nombres
  entiers » (6e) : ✅ tableau des classes (réduit mille + unités) fait deux fois le 02/10 —
  `MATHS - Outil - Le tableau des nombres` (Outils, 2 par A4) et `MATHS - Numération 4.2 - Le
  tableau des nombres` (Numération, 2 pages). ✅ 02/10 aussi : Numération 5 (jusqu'à 999 999),
  Numération 6 (millions et milliards, paysage), outil « Le grand tableau des nombres » (4
  classes) ; couleurs c bleu · d vert · u orange partout. ✅ L'enquête (son doc n° 6 en FALC) :
  Numération 2.1 (jusqu'à 100, voleur 74) et 6.1 (ses suspects, voleur 40 530 290 018), rangées.
  ✅ 02/10 : comparer / ranger / les suites ajoutés dans Numération 5 et 6 (sa feuille n° 1,
  niveaux 2-3, en FALC, corrigé calculé). ⏳ Les PAYS (niveau 3) : ✅ faits le 02/10 dans Numération 6 (page 5 + corrigé) —
  Afghanistan, Égypte, Angola, Sénégal, Bangladesh + France (pays d'origine de ses élèves,
  donnés le 02/10 — ⚠ jamais de prénom à côté d'un pays dans un fichier) ; Banque mondiale
  2024. ⏳ Pays de deux élèves non donnés.
  pas de oui. Cours, questions-réponses et enquête Mme 657 : laissés.
- ⏳ **Top Chrono en classe** (02/10) : affiche « Quand j'ai fini » proposée (œil = je vérifie
  seul, crayon de couleur = je me corrige, main = j'invente 3 calculs) — PAS de oui. Plafond
  retenu : 3 min par fiche de 10 calculs.
- ⏳ **`?v=` à incrémenter** (index.html, actuellement 40) avant sa prochaine mise en ligne :
  chrono, roue, bandeau, Automatismes, livrets Top Chrono, Alpha. `emploi-du-temps.js` déjà passé
  à `?v=10` dans l'espace enseignant.
- ⏳ **Parcours des sons**, même un fichier du projet — contraire à la règle « le test est l'adresse ». Signalé, pas corrigé.
- ✅ **Maths rangées** (23/09) : onglets Numération (ses N°1, 1.1, 2, 3, 4 + Tracer les chiffres + l'étoile) · Géométrie (ses 3 livrets) · Grandeurs et mesures (« à venir ») · Outils (lexique A5, marchande) · Les nombres. PDF dans `docs/numeration-*.pdf`, `docs/geometrie-*.pdf`. Mes Livrets 1 et 2 retirés des menus, fichiers gardés. `?v=20`.
- ⏳ Grandeurs et mesures : aucun fichier reçu.
- ⏳ **Voix des jeux du son A et I** : sur une bonne réponse « banane… Bravo » s'entend comme « banane a le son ». Proposé : dire la phrase entière aussi quand c'est juste. En attente de son accord.
- ⏳ **Son A** : sac, porte, livre sont des dessins — les retirer ? En attente.

- ⏳ **« Pourquoi j'ai ça le mercredi 30 septembre ? »** — sa question, restée sans réponse (coupure).
- ⏳ **Son PDF « fiches-numération »** : pas encore ouvert, elle n'a pas dit ce qu'elle en veut.
- ⏳ **`TABLEAU - Lecture et dictée.dc.html`** accroché à aucun menu (Affichages → Au mur ?).
- ⏳ **Bilal** n'est pas dans `ELEVES` (emploi-du-temps.js) : il manque son nom de famille.
- ⚠ Ses créneaux perso et leurs liens vivent dans le `localStorage` de CET appareil : ils n'apparaissent pas sur son téléphone.

## 6 · LE RESTE DE L'APPLI

- **Le jeu de la marchande** (22/09, `docs/jeu-marchande.pdf`, rangé dans *Mathématiques →
  Les livrets*) : à **accrocher à une date** de l'emploi du temps, et à trancher — quelles
  pages elle utilise réellement avec des non-lecteurs (les noms d'articles sont écrits).

- **Supprimer les PNG d'archive** (`github/clean/`, ~400 Mo) une fois qu'elle aura vérifié
  les images sur son téléphone **et** sur une impression. Tout `clean/` est en `.webp`
  depuis le 20/09 ; les PNG ne sont qu'une roue de secours.

- **La suite du rituel « J'entends, j'entoure »** : semaine du 22 septembre (elle l'a
  demandée). ⚠ Elle ne l'a **pas fait** la semaine du 21 — son mot : « j'ai du mal à
  m'organiser, c'est pour ça que j'ai besoin que tu accroches les choses ». Tout ce qui
  est créé doit atterrir à une date de l'emploi du temps, pas rester à la racine.
- **Les devoirs du soir** : les quatre vignettes LIRE / ÉCRIRE / PARLER / ÉCOUTER sont
  faites et rangées dans les affichages. Reste à décider ce qu'elle donne réellement,
  10-15 minutes par jour, avec une trace.
- **Brancher le MCLM dans « Ma classe »** : le calcul et l'historique existent déjà (`upe2a-fluence`), il n'y a qu'à les afficher.
- **Stockage** : groupes, élèves, réglages, scores. Et pour les enregistrements : conserver + Télécharger (`amina-pomme-12-06.webm`) + Supprimer + compteur d'espace. Garde-fou : si le stockage échoue, l'appli continue sans mémoire.
- **Google Sheet comme source de vérité** (décidé le 30/08, « plus tard ») : va-et-vient à la demande, pas de synchro automatique.
- **Multilingue** : la langue première est déjà saisie par élève (`LANGUES`), rien n'en est fait.
- **Livret 3 — Les repas** : ajouter les pages de lexique et d'exercices.
- **Mode d'emploi** : `GUIDE - Accueil d'un élève.dc.html` est commencé, à étendre aux autres écrans. La documentation technique n'existe pas.
- **Sortir les données de l'appli dans un fichier séparé**, au moment où on y touche.
- **Images encore dessinées à remplacer par des photos** (liste en fin d'`INSTRUCTIONS-APPLICATION.md`).
- **Son cache** : incrémenter le `?v=` d'`index.html` (v4) quand elle ne voit pas une modification sur son téléphone.

---

## LES RÈGLES À NE PAS RÉAPPRENDRE

➡ **Elles sont désormais dans `CLAUDE.md`**, qui est lu automatiquement à chaque
conversation : plus besoin de les redemander. Rappel court ci-dessous ; la version qui fait
foi est `CLAUDE.md`.


1. **On discute avant de coder.** Une question appelle une réponse, pas une modification.
2. **2 cm de marge** sur les quatre côtés de tout document imprimé. Le contenu cède, jamais la marge. Pas d'A3 (elle n'a qu'une A4).
3. **La case est toujours plus grande que l'étiquette** qu'on y colle.
4. **Jamais `target="_blank"`** sur un document de l'appli.
5. **Photos réalistes, jamais de dessin enfantin** : public de 16-18 ans. Fond blanc uni, sujet centré, aucun texte, aucun décor.
6. **Ne jamais écraser une image sans vérifier** qui l'utilise — `clean/mot-*` est la source de vérité, `clean/illu-*` est réservé à Glisse et lis, `github/clean/` est le filet de sécurité.
7. **Un thème sans ses photos ne s'affiche pas côté élève** (`PHOTOS_ATTENDUES` : retirer le slug à chaque photo reçue).
8. Les mots repères vivent à **trois endroits** : `ALPHA_IMG`, `banque-mots.js`, `FR - Mes mots - livre interactif.html`. Les corriger **ensemble**.


## 6 · À RÉFLÉCHIR CE WEEK-END (24/09)

- ⏳ **Où ranger les quiz** côté élève : « QUIZ - Moto, salade, tomate, lit » est pour l'instant sur *Cette semaine* (jeudi 24) seulement. Piste proposée : un coin « Mes quiz » sur la page élève.

- ✅ 03/10 : livret `MATHS - Grandeurs et mesures 2 - La monnaie` FINI et rangé (onglet Grandeurs et mesures). Vrais billets `clean/mot-billet{5,10,20,50}.webp` (anciens billets, son PDF — elle a validé : la couleur suffit) et vraies pièces `clean/mot-piece{1c..50c,1e,2e}.webp` à taille réelle. Exemples = une ligne déjà faite (fond gris 7 %, bord noir 3,5 px, onglet rouge « Exemple », réponses en rouge, entourage à main levée). Picto `clean/pictos/compte.webp` créé (Compte + Écris sur les fiches 2, 3, 6, 7). Fiche 2 : difficulté croissante (rangé → mélangé). Fiche 3 : > ou < dans une case. Pas de jours de la semaine. Dernière page : déroulé des séances + sac mystère (20 c au toucher). « D'après Mimi classe » en italique en bas. Pas de picto « Compare » (proposé, pas demandé). Reste : livret 3 L'heure (GM.36-58), puis 3 évaluations construites. Entrées PDF mimiclass retirées de l'appli.
