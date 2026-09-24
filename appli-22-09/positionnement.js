/* Tests de positionnement — élèves allophones arrivants (au-delà de la classe UPE2A).
   Deux tests repris des grilles CASNAV Lyon : mathématiques 16 ans, et compréhension
   écrite fin de cycle 4. L'échelle et le calcul des paliers sont ceux des corrigés.
   Logique écrite pour ce projet ; aucune donnée d'élève ne sort du navigateur. */
(function(){
  if (window.POSITIONNEMENT) return;

const ECHELLE=[
  {v:'NE', nom:'NE',  aide:'non évalué',        fond:'#eef1f5', texte:'#8a91a3', pts:null},
  {v:'--', nom:'--',  aide:'non atteint',       fond:'#fbe3e6', texte:'#b3283c', pts:0},
  {v:'-',  nom:'-',   aide:'partiellement',     fond:'#fdeadd', texte:'#b5651d', pts:1},
  {v:'+',  nom:'+',   aide:'atteint',           fond:'#e2f2e8', texte:'#1e7a4f', pts:2},
  {v:'++', nom:'++',  aide:'maîtrisé',          fond:'#cfeadb', texte:'#155e3d', pts:3}
];
const PTS={}; ECHELLE.forEach(e=>{ PTS[e.v]=e.pts; });

/* [num, capacité, palier, groupe, réponse attendue, grille officielle, paliers cliquables,
   case de la fiche EANA, libellé court pour cette case]
   ⚠ Les paliers s'écartent volontairement du barème Lyon sur un point : « ++ » n'est
   donné que si TOUT est juste (sa règle du 03/09). Le barème officiel accordait ++ à
   4 ou 5 calculs justes sur 6 — « c'est très bien si tout est bon ». La grille d'origine
   reste dans la 6e colonne, pour mémoire — les deux colonnes de corrigé viennent de
   tests/lyon-maths-16-corrige.pdf, relevées le 03/09 : la réponse s'affiche à l'étape 3,
   plus besoin de la feuille papier. */
const MATHS=[
  [1,'Effectuer des opérations','CAP','base','16 · 48 · 13 · 237,63 · 1500 · 5','4 ou 5 calculs justes : ++ · 3 : + · 2 : − · 0 ou 1 : − −',[['Les 6 calculs justes','++'],['4 ou 5 calculs justes','+'],['3 calculs justes','+'],['2 calculs justes','-'],['0 ou 1 calcul juste','--'],['Rien écrit','--']],"nombres","les opérations posées"],
  /* ⚠ LA RÉPONSE ATTENDUE COMMENCE À − 3 (07/09, sa correction) : « − 30 » et « − 3,5 »
     sont les EXEMPLES imprimés sur la feuille pour montrer comment ranger, pas des nombres
     à classer. Les inclure faussait la liste et le décompte des erreurs. */
  [2,'Ranger des nombres','CAP','base','− 3 · 0 · 2 · 4 · 5 · 7 · 12 · 12,5 · 14 · 19 · 50','tout juste : ++ · les positifs bien classés : + · 4 erreurs maxi : − · plus de 4 : − −',[['Tout est juste','++'],['Les nombres positifs sont bien classés','+'],['4 erreurs au maximum','-'],['Plus de 4 erreurs','--'],['Rien écrit','--']],"nombres","le rangement des nombres"],
  [3,'Convertir des grandeurs','CAP','base',"1 km = 1 000 m\n1 g = 1 000 mg\n1 h = 3 600 s",'3 conversions justes : ++ · 2 : + · 1 : − · 0 : − −',[['Les 3 conversions justes','++'],['2 conversions justes','+'],['1 conversion juste','-'],['Aucune conversion juste','--'],['Rien écrit','--']],'grandeurs',"les conversions d'unités"],
  [4,'Relier les fractions égales','CAP','base',"2/6 = 1/3\n3/4 = 0,75\n0,5 = 1/2\n5/20 = 1/4\n3/2 = 1,5",'5 égalités justes : ++ · 4 : + · 2 ou 3 : − · 0 ou 1 : − −',[['Les 5 égalités justes','++'],['4 égalités justes','+'],['2 ou 3 égalités justes','-'],['1 égalité juste','--'],['Aucune égalité juste','--'],['Rien écrit','--']],"nombres","les fractions égales"],
  [5,'Lire un tableau à double entrée','CAP','base',"Chine : 1 386 000 000 habitants\nSénégal : Dakar\nMexique : peso",'3 réponses justes : ++ · 2 : + · 1 : − · 0 : − −',[['Les 3 réponses justes','++'],['2 réponses justes','+'],['1 réponse juste','-'],['Aucune réponse juste','--'],['Rien écrit','--']],"donnees","la lecture d'un tableau à double entrée"],
  [6,"Appliquer un pourcentage d'évolution",'2de BAC PRO','inter','72 € et 390 €','2 réponses justes : ++ · 1 : + · démarche correcte mais erreur de calcul : − · démarche fausse : − −',[['Les 2 réponses justes','++'],['1 réponse juste','+'],['Démarche correcte, erreur de calcul','-'],['Démarche fausse','--'],['Rien écrit','--']],'donnees',"les pourcentages d'évolution"],
  [7,'Calculer des grandeurs proportionnelles','2de BAC PRO','inter',"1 kg = 5 €\n3 kg = 15 €\n25 kg = 125 €\nx kg = 5x €\ny € = y ÷ 5 kg",'4 ou 5 réponses justes : ++ · 3 : + · 2 : − · 0 ou 1 : − −',[['Les 5 réponses justes','++'],['4 réponses justes','+'],['3 réponses justes','+'],['2 réponses justes','-'],['0 ou 1 réponse juste','--'],['Rien écrit','--']],"donnees","les grandeurs proportionnelles"],
  [8,'Reconnaître une situation de proportionnalité','2de BAC PRO','inter','200 g','réponse juste : ++ · réponse fausse : − −',[['Réponse juste (200 g)','++'],['Réponse fausse','--'],['Rien écrit','--']],"donnees","la reconnaissance de la proportionnalité"],
  [9,'Calculer avec des puissances','2de BAC PRO','inter',"10² × 10⁴ × 10¹⁰ = 10¹⁶\n10⁸ ÷ 10⁵ = 10³\n(10⁴)⁻² = 10⁻⁸",'3 réponses justes : ++ · 2 : + · 1 : − · 0 : − −',[['Les 3 réponses justes','++'],['2 réponses justes','+'],['1 réponse juste','-'],['Aucune réponse juste','--'],['Rien écrit','--']],"nombres","le calcul avec les puissances"],
  [10,"Résoudre des problèmes d'échelles",'2de BAC PRO','inter',"600 km",'réponse correcte : ++ · bon nombre de carreaux mais 4e proportionnelle fausse (500 km) : + · carreaux lus sans proportionnalité : −',[['Réponse correcte (600 km)','++'],['Carreaux bien lus, 4e proportionnelle fausse (500 km)','+'],['Carreaux bien lus, sans proportionnalité','-'],['Autre réponse','--'],['Rien écrit','--']],"grandeurs","les problèmes d'échelle"],
  [11,'Estimer un ordre de grandeur (aires)','2de BAC PRO','inter','Aire ≈ 250 m²','réponse juste : ++ · réponse fausse : − −',[['Réponse juste (≈ 250 m²)','++'],['Réponse fausse','--'],['Rien écrit','--']],"grandeurs","les ordres de grandeur d'aires"],
  /* ⚠ Sans « 60 » ni « 20 % » (07/09, sa correction) : la première valeur de chaque ligne
     est donnée en EXEMPLE sur la feuille, l'élève complète les quatre autres. Le total de
     300 reste, lui : c'est bien la somme des cinq. */
  [12,'Utiliser un diagramme','2de BAC PRO','inter',"nombres : 45 · 75 · 90 · 30 (total 300)\nfréquences : 15 · 25 · 30 · 10 %",'tout juste : ++ · fréquences justes et quelques nombres corrects : + · fréquences justes seules : −',[['Tout est juste','++'],['Fréquences justes et quelques nombres corrects','+'],['Fréquences justes seulement','-'],['Autre','--'],['Rien écrit','--']],"donnees","la lecture d'un diagramme"],
  [13,'Se repérer dans le plan','2de BAC PRO','inter',"B (4 ; − 2)\nC (0,5 ; 2)\nD (2 ; 1), E (− 2 ; 3) et F (0 ; 1)",'tout juste : ++ · 3 réponses justes sur 4 : + · 1 ou 2 : − · 0 : − −',[['Tout est juste','++'],['3 réponses justes sur 4','+'],['1 ou 2 réponses justes','-'],['Aucune réponse juste','--'],['Rien écrit','--']],"geometrie","le repérage dans le plan"],
  [14,'Résoudre une équation','2de BAC PRO','inter',"x = 5\nx = − 4\nx = 60",'3 équations justes : ++ · 2 : + · 1 : − · 0 : − −',[['Les 3 équations justes','++'],['2 équations justes','+'],['1 équation juste','-'],['Aucune équation juste','--'],['Rien écrit','--']],"nombres","la résolution d'équations"],
  [15,'Développer une expression littérale','2de GT','inter',"14x + 28\n− 12x² + 17x + 5\n9x² − 4",'3 développements justes : ++ · 2 : + · 1 : − · 0 : − −',[['Les 3 développements justes','++'],['2 développements justes','+'],['1 développement juste','-'],['Aucun développement juste','--'],['Rien écrit','--']],"nombres","le développement d'expressions littérales"],
  [16,'Théorème de Pythagore, aires','2de GT','inter',"BC = 5 cm\naire = 6 cm²",'tout juste : ++ · 1 réponse sur 2 : + · les 2 fausses : − −',[['Tout est juste (BC et aire)','++'],['1 réponse juste sur 2','+'],['Les 2 réponses fausses','--'],['Rien écrit','--']],"geometrie","le théorème de Pythagore"],
  [17,"Image et antécédent d'une fonction",'2de GT','inter',"f(3) = 16\nf(− 1) = − 8\nx = 5/3 (l'antécédent de 8)",'3 réponses justes : ++ · 2 : + · 1 : − · 0 : − −',[['Les 3 réponses justes','++'],['2 réponses justes','+'],['1 réponse juste','-'],['Aucune réponse juste','--'],['Rien écrit','--']],"donnees","les images par une fonction"],
  [18,'Tableaux de valeurs et variations','1ère GT','avance',"x : − 4 · − 1,5 · 0 · 1 · 3 · 4\nf(x) : − 1 · − 1,5 · 1 · 3 · 0,5 · 2,5",'valeurs : 5 ou 6 justes ++ · 3 ou 4 + · 1 ou 2 − · 0 − − ; variations : flèches, x et images ++ · flèches et x + · flèches seules −',[['Tout est juste : valeurs, flèches, x et images','++'],['5 valeurs justes sur 6, flèches et x justes','+'],['3 ou 4 valeurs justes, ou flèches seules','-'],['Tout est faux','--'],['Rien écrit','--']],"donnees","les tableaux de variations"],
  [19,'Coordonnées et vecteurs','1ère GT','avance',"v (3 ; 0)\nw (− 2 ; − 4)",'2 coordonnées justes : ++ · 1 : + ; le point B bien placé : ++',[['Les 2 coordonnées justes (et le point B bien placé)','++'],['1 coordonnée juste','+'],['Aucune coordonnée juste','--'],['Rien écrit','--']],"geometrie","les vecteurs"],
  [20,'Calculer une dérivée','Terminale','avance',"f'(x) = 4x³ − 8x\nf'(x) = − 7 ÷ (3x − 5)²",'2 dérivées justes : ++ · 1 : +',[['Les 2 dérivées justes','++'],['1 dérivée juste','+'],['Aucune dérivée juste','--'],['Rien écrit','--']],"nombres","le calcul de dérivées"],
];

const FR=[
  [1,'Indices textuels','reperage','Ce que l’élève a repéré dans le texte'],
  [2,'Caractérisation d’un personnage','vocabulaire','Les mots entourés'],
  [3,'Vrai ou faux','reperage','Six affirmations à valider'],
  [4,'Champs lexicaux','vocabulaire','Associer les mots à leur champ'],
  [5,'Chronologie du récit','comprehension','Remettre quatre étapes dans l’ordre'],
  [6,'Inférence','inference','Comprendre ce qui n’est pas écrit'],
  [7,'Expression écrite','expression','Trois lignes, dans la langue de l’élève']
];

const TESTS={
  maths:{
    id:'maths', nom:'Mathématiques', sous:'CASNAV Lyon — 16 ans', couleur:'#e59a2b',
    exercices:MATHS.map(e=>({id:'m'+e[0], num:e[0], titre:'Ex. '+e[0], capacite:e[1],
      niveau:e[2], groupe:e[3], attendu:e[4]||'', grille:e[5]||'',
      paliers:(e[6]||[]).map(x=>({nom:x[0], v:x[1]})), fiche:e[7]||'', court:e[8]||''})),
    groupes:[['base','Socle (CAP)'],['inter','Intermédiaire (BAC PRO, 2de GT)'],['avance','Avancé (1ère, Terminale)']],
    phrases:{base:'les exercices du socle (niveau CAP)',
      inter:'les exercices de niveau Bac pro et seconde générale',
      avance:'les exercices de niveau première et terminale'},
    paliers:['CAP','2de BAC PRO','2de GT','1ère GT','Terminale']
  },
  fr:{
    id:'fr', nom:'Français', sous:'Compréhension écrite — fin de cycle 4', couleur:'#4fc3d9',
    exercices:FR.map(e=>({id:'f'+e[0], num:e[0], titre:'Ex. '+e[0], capacite:e[1],
      niveau:'Cycle 4', groupe:e[2], detail:e[3]})),
    groupes:[['reperage','Repérage d’informations'],['vocabulaire','Vocabulaire et lexique'],
      ['comprehension','Compréhension globale'],['inference','Inférence'],
      ['expression','Expression écrite']],
    paliers:[]
  }
};

const LANGUES=['Non précisée','Albanais','Amharique','Anglais','Arabe','Arabe dialectal',
  'Bambara','Bengali','Dari','Espagnol','Finnois','Géorgien','Mandarin','Ourdou','Pachto',
  'Pendjabi','Peul','Portugais','Roumain','Russe','Soninké','Tamoul','Tigrinya','Turc',
  'Ukrainien','Vietnamien'];

// pourcentage de réussite d'un groupe d'exercices : moyenne des points sur 3
function pctGroupe(scores, exos){
  let somme=0, n=0;
  exos.forEach(ex=>{
    const p=PTS[(scores||{})[ex.id]];
    if(p===null||p===undefined) return;
    somme+=p; n++;
  });
  return n?{pct:Math.round((somme/(n*3))*100), evalues:n, total:exos.length}
          :{pct:null, evalues:0, total:exos.length};
}

/* Palier conseillé en maths : le plus haut niveau dont les exercices sont réussis.
   ⚠ LE NIVEAU AVANCÉ RÉUSSI NE SE FAIT PLUS RECALER PAR L'INTERMÉDIAIRE (07/09 : « il a le
   niveau lycée général, alors pourquoi tu conseilles un bac pro ? »). Sana avait 87 % au
   socle, 67 % en avancé… et 58 % en intermédiaire : la règle exigeait 60 % PARTOUT, donc
   deux points manquants sur un domaine intermédiaire la faisaient tomber deux crans plus
   bas, en 2de BAC PRO. Une réussite au niveau le plus haut n'est pas annulée par un trou
   plus bas — c'est un trou à combler, pas un plafond.
   La règle est donc : le plus haut domaine réussi décide, l'intermédiaire ne sert plus que
   de garde-fou large (50 %) contre un score avancé isolé. Volontairement prudent : un
   niveau n'est retenu qu'au-dessus de 60 %. */
function palierMaths(scores){
  const t=TESTS.maths;
  const g=id=>pctGroupe(scores, t.exercices.filter(e=>e.groupe===id));
  const base=g('base'), inter=g('inter'), avance=g('avance');
  if(base.evalues===0 && inter.evalues===0 && avance.evalues===0) return null;
  /* ⚠ LE PALIER LE PLUS HAUT EXIGE LES DEUX DOMAINES (07/09, troisième passe : « Sana a le
     niveau pour une première ??? »). Non : son 67 % en avancé repose sur TROIS exercices
     (2 réussis sur 3), quand l'intermédiaire en compte douze et n'est qu'à 58 %. Conclure
     « 1ère GT ou Terminale » sur trois items était une sur-interprétation.
     Le vrai défaut qu'elle avait signalé était ailleurs : la chute de DEUX crans (jusqu'à
     2de BAC PRO) pour deux points manquants. La correction juste est donc le cran
     intermédiaire — 2de GT — et non le sommet. */
  if((avance.pct||0)>=60 && (inter.pct||0)>=60 && (base.pct||0)>=60) return '1ère GT ou Terminale';
  if(((avance.pct||0)>=60 || (inter.pct||0)>=60) && (base.pct||0)>=60) return '2de GT';
  if((inter.pct||0)>=40 && (base.pct||0)>=60) return '2de BAC PRO';
  if((base.pct||0)>=50) return 'CAP';
  return 'Socle non consolidé';
}

const PHRASES={
  maths:{
    haut:"Les acquis en mathématiques sont solides, y compris sur les notions de lycée. La langue, et non les mathématiques, est le premier frein.",
    moyen:"Le socle du collège est en place, les notions de lycée restent fragiles. Les mathématiques peuvent servir d'appui pour entrer dans les apprentissages.",
    bas:"Le socle numérique n'est pas consolidé. Il faut reprendre la numération et les opérations avant d'aborder le programme de la classe d'accueil."
  },
  fr:{
    haut:"L'élève accède seul au sens d'un texte de fin de cycle 4. Une inclusion large en classe ordinaire est envisageable.",
    moyen:"Le sens global est perçu, l'analyse fine reste fragile. Une inclusion partielle avec maintien d'heures de FLS est indiquée.",
    bas:"L'accès autonome au sens d'un texte de cycle 4 n'est pas encore possible. Un accompagnement intensif en dispositif est indispensable."
  }
};

function bilan(testId, scores){
  const t=TESTS[testId]; if(!t) return null;
  const parGroupe=t.groupes.map(([id,nom])=>{
    const r=pctGroupe(scores, t.exercices.filter(e=>e.groupe===id));
    return {id:id, nom:nom, pct:r.pct, evalues:r.evalues, total:r.total};
  });
  const g=pctGroupe(scores, t.exercices);
  const global=g.pct;
  const forts=parGroupe.filter(x=>x.pct!==null && x.pct>=67).map(x=>x.nom);
  const faibles=parGroupe.filter(x=>x.pct!==null && x.pct<34).map(x=>x.nom);
  const cle=global===null?null:(global>=67?'haut':(global>=34?'moyen':'bas'));
  return {
    parGroupe:parGroupe, global:global, evalues:g.evalues, total:g.total,
    palier:testId==='maths'?palierMaths(scores):null,
    phrase:cle?PHRASES[testId][cle]:null,
    forts:forts, faibles:faibles
  };
}

window.POSITIONNEMENT={ECHELLE, TESTS, LANGUES, bilan, pctGroupe};
})();
