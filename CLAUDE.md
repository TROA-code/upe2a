# Préférences du projet

Ce fichier ne garde que ce qui doit s'appliquer **sans qu'elle ait à le redemander**.
Le détail, l'historique et les pièges sont dans `INSTRUCTIONS-APPLICATION.md` ; la liste de
ce qui reste ouvert est dans `A-FAIRE.md`. Les deux se lisent au démarrage et se tiennent à
jour à chaque décision prise avec elle.

## Public
Élèves allophones non scolarisés antérieurement (UPE2A NSA), **16-18 ans**. Ton et visuels
adultes, jamais infantilisants. Beaucoup ne lisent pas encore : l'image et le geste portent
le sens avant le texte.

## Méthode de travail
- **On discute avant de coder.** Une question appelle une réponse, pas une modification.
  Rien ne se code sans son accord explicite.
- Quand une discussion est en cours, ne rien modifier.
- Proposer, donner un avis motivé, puis attendre qu'elle tranche.
- ⚠ **Une réponse à UNE question n'est pas un accord sur toute la proposition** (24/09 : elle
  a répondu « recto verso » au format, j'ai sorti la planche du livret sans son oui — « tu
  agis sans attendre ma réponse », « arrête d'agir sans me demander »). Chaque changement
  proposé attend son « oui » à lui.
- Ne jamais insérer de texte français par expression régulière (trois pannes bloquantes).

## Impression
- **2 cm de marge sur les quatre côtés** de tout document imprimé. Le contenu cède, jamais
  la marge.
- **Pas d'A3** : elle n'a qu'une imprimante A4.
- **La case est toujours plus grande que l'étiquette** qu'on y colle.
- Texte d'un document imprimé : 12 pt minimum.

## Navigation dans l'appli
- **Jamais `target="_blank"`** sur un document de l'appli. Sinon : « preview token
  required » (déjà corrigé le 14/09, le 18/09 et le 23/09). **Le test est l'adresse, pas la
  provenance** : un lien s'ouvre en `_blank` seulement s'il commence par `http`. Tout
  fichier du projet (`.dc.html`, `.html`, `.mp3`, `.pdf`, `docs/…`, `clean/…`) reste dans
  le cadre, même s'il est rangé dans ses `liens` ou arrive par un chemin « externe ». Vaut
  pour tout nouveau code qui ouvre un document.
- La classe **`.retour`** déclenche une navigation interne (câblée sur `data-vers`). Tout
  bouton qui n'est pas un retour de page utilise **`.bouton`** — même dessin, aucun
  câblage. L'oubli a déjà renvoyé deux fois à la carte sans raison.
- Aucun écran ne doit être un cul-de-sac : bouton « ← L'accueil » en `history.back()`, avec
  repli sur un lien en conservant `location.search`.
- **Un diaporama aussi a son bouton de retour** (22/09). Il occupe tout l'écran, donc la
  barre se pose PAR-DESSUS (`position:fixed`) et s'efface à l'impression. ⚠ **En haut à
  DROITE** : à gauche elle recouvre la colonne de vignettes et rend la première diapositive
  inclicable.
- **Un diaporama avance AU CLIC sur l'image** (22/09) : les flèches de la barre du bas sont
  trop fines pour une classe. Les clics sur nos boutons, sur la colonne de vignettes et sur
  la barre du composant ne comptent pas, et le clic ne dépasse jamais la dernière vue.
- **Un bouton « Masquer les vignettes »** (22/09, attribut `no-rail` de `deck-stage`, choix
  retenu en `localStorage`) : projetée, la colonne mange l'écran et montre la suite avant
  l'heure.

## Images
- **Toute image reçue est convertie en `.webp`** à la réception (qualité 0.85, 1000 px max),
  et c'est le `.webp` qui est déposé dans `clean/`. **Ne jamais déposer un `.png` dans
  `clean/`** : tout le code appelle désormais `.webp`, et une vingtaine d'endroits
  fabriquent le nom du fichier (`'clean/mot-' + mot + '.webp'`).
- **Photographies réalistes, jamais de dessin enfantin.** Fond blanc uni, sujet centré,
  aucun texte, aucun décor, aucun curseur. Vaut aussi pour les images de référence et les
  mots repères.
- **Exception : un LIEU n'a pas de fond blanc** — plan large, cadrage serré, le lieu remplit
  l'image, personne au premier plan, aucune enseigne.
- **Toujours remplacer le fichier existant** quand elle envoie une nouvelle image pour un
  mot déjà illustré. Jamais de doublon (`mot-x2.png`, `tmp-mot-x.png`). Supprimer les
  images devenues inutiles.
- **Ne jamais convertir une image en noir et blanc** ni toucher ses couleurs sans demande
  explicite.
- **Réduire à 1000 px** de large toute image plus grande, proportions conservées, net à
  l'impression.
- **Signaler tout problème** sur une image reçue : flou, cadrage coupé, fond non uni,
  curseur visible, texte parasite, mot qui ne correspond pas. ⚠ Le curseur violet vient de
  la capture d'écran — lui rappeler le bouton de téléchargement.

### Les préfixes d'images, à ne jamais mélanger
- `clean/mot-<mot>.webp` — ses photos réalistes, la banque de référence des exercices.
- `clean/illu-<mot>.webp` — réservé à « Glisse et lis ».
- `clean/lieu-<mot>.webp` — banque de lieux partagée (1000 × 1000), pour les fiches métier.
- `clean/geste-<mot>.webp` — gestes de politesse.
- `clean/poeme-<texte>-<mot>.webp` — les illustrations ISOLÉES d'un texte littéraire, pour
  les étiquettes à découper et les feuilles d'écriture : une étiquette montre UN objet.
- `clean/diapo-<texte>-<mot>.webp` — les vues d'un DIAPORAMA, qui peuvent être des scènes
  entières. ⚠ Ne jamais les verser dans `poeme-` : une scène ne se découpe pas.
- Nommage sans accent, sans article. **Ne jamais écraser une image sans vérifier qui
  l'utilise.** `github/clean/` est le filet de sécurité : ne pas le supprimer.

## Données de l'appli
- **Un thème sans toutes ses photos ne s'affiche pas côté élève** (`PHOTOS_ATTENDUES` :
  retirer le slug à chaque photo reçue).
- Les **mots repères** vivent à **trois endroits** — `ALPHA_IMG`, `banque-mots.js`,
  `FR - Mes mots - livre interactif.html`. Les corriger **ensemble**.
- Un thème se publie dans les **deux** `BANQUE` : `banque-mots.js` et
  `APPLI - Espace enseignant.dc.html`.
- **Ne rien remettre dans `RESSOURCES` d'`emploi-du-temps.js`** sans sa demande explicite :
  elle accroche ses documents elle-même depuis le panneau du créneau.
- Quand elle ne voit pas une modification sur son téléphone : incrémenter le `?v=`
  d'`index.html`.

## Contenu
- **Ne rien inventer** : un texte officiel (référentiel, ONISEP, catalogue du lycée) se
  copie, il ne se rédige pas. Pas de formule creuse type « il faut être dynamique » — du
  concret, vérifiable.
- **Texte littéraire : c'est elle qui tranche.** Le 22/09 j'avais posé « jamais de vers
  d'Éluard » ; le 23/09 elle a levé l'interdit (« c'est pour un cours, je me suis
  renseignée, je peux le prendre ») : le texte de « Dans Paris » entre dans le livret. Ne
  plus le lui rediscuter. Pour un AUTRE texte, lui signaler une fois, puis suivre son choix.
  Et les déterminants suivent le texte — « une maison », « un escalier » : dans ce
  poème chaque chose est découverte, pas désignée.
- **Pas de score, pas de compteur d'erreurs** dans les jeux. Ces élèves ont assez
  d'occasions d'être notés.
- **On touche, on ne glisse pas** : le toucher-puis-toucher est le geste de base de toute
  activité élève, parce que le glisser-déposer ne se déclenche pas au doigt sur tablette.
  **Elle a demandé le 21/09 d'ajouter le glissé** (façon H5P) dans « Je trie » du jeu du
  son A : les deux gestes coexistent, le glissé **s'ajoute**, il ne remplace jamais le
  toucher.
- **Rien n'est écrit tant que l'élève n'a pas répondu** dans un jeu d'écoute : la lettre
  trompe (« orange » s'écrit avec un a et ne contient aucun [a]). Des **cases vides**, pas
  les syllabes écrites, et le mot jamais affiché.
- **Une manche = cinq ou six images**, pas la banque entière (« ça me saoule »). À la fin,
  un bouton pour en relancer autant d'autres. Les mots peuvent revenir : c'est ce qui les
  installe.
- **Un jeu à choix multiple se valide par un bouton « J'ai fini »** quand il peut y avoir
  plusieurs bonnes réponses : sinon les croix s'affichent d'un coup et l'élève n'a rien
  cherché (« cartable » a deux [a], c'est à lui de poser les deux croix).
- **BRAVO ! / OH ZUT !** en grand : on félicite ou on compatit **au coup**, sans jamais
  rien compter. ⚠ Exception qu'elle a demandée explicitement le 22/09 dans « Le son A » :
  les carrés de progression passent au **rouge** sur une erreur — « je veux qu'il voie ses
  erreurs ». Je lui ai opposé la règle, elle a maintenu. Ne pas revenir dessus, ne pas
  l'étendre aux autres jeux sans lui demander.
- Dans un jeu d'écoute, **aucun mot écrit en cas d'erreur** : la case devient rouge, un
  petit son descend, la voix dit « on entend le son a ». ⚠ Le son se dit **dans une phrase
  à part** — collé à la fin, « pas a » se prononce « pas za ».
- **Le clic, pas le survol** : sur tablette le survol n'existe pas.
- Garder toujours la phrase simple en gros — le texte d'adulte s'ajoute, il ne remplace pas.
