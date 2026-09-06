/* LA BANQUE DE MOTS ILLUSTRÉS — copie de service.
   L'espace enseignant garde sa propre copie (on n'y touche pas) ; ce fichier existe pour
   que les documents imprimables (planches, feuilles de route) puissent lister les mots
   d'un thème sans charger toute l'application. Relevé le 03/09.
   Les noms de fichiers suivent la convention du projet : clean/mot-<mot>.png, et
   clean/geste-<mot>.png pour les gestes de politesse. window.BANQUE_MOTS */
(function () {
  const BANQUE = {
 'Les pays, les langues':[['le Portugal','portugal'],['l\'Espagne','espagne'],['l\'Italie','italie'],['le Maroc','maroc'],['l\'Algérie','algerie'],['la Turquie','turquie'],['la Pologne','pologne'],['le Brésil','bresil'],['le Vietnam','vietnam'],['les langues','langues'],['un drapeau','drapeau']],
    'Les animaux': [['un chat', 'chat'], ['un chien', 'chien'], ['un lapin', 'lapin'],
      ['une poule', 'poule'], ['une vache', 'vache'], ['un mouton', 'mouton'],
      ['un oiseau', 'oiseau'], ['un poisson', 'poisson'], ['un cheval', 'cheval']],
 'La politesse':[['bonjour','geste-bonjour'],['bonsoir','geste-bonsoir'],['au revoir','geste-aurevoir'],['merci','geste-merci'],["s'il vous plaît",'geste-silvousplait'],['pardon','geste-pardon'],['oui','geste-oui'],['non','geste-non'],['à demain','geste-ademain']],
 "L'alphabet":[['a','ananas'],['b','ballon'],['c','carotte'],['d','deux'],['e','renard'],['f','fantome'],['g','gateau'],['i','gris'],['j','jupe'],['k','kangourou'],['l','lit'],['m','moto'],['n','nuage'],['o','orange'],['p','pied'],['q','cinq'],['r','robot'],['s','salade'],['t','table'],['u','rue'],['v','velo'],['w','wagon'],['x','xylophone'],['y','pyjama'],['z','zebre']],
 'Les jours':[['lundi','lundi'],['mardi','mardi'],['mercredi','mercredi'],['jeudi','jeudi'],['vendredi','vendredi'],['samedi','samedi'],['dimanche','dimanche']],
 'Les mois':[['janvier','janvier'],['février','fevrier'],['mars','mars'],['avril','avril'],['mai','mai'],['juin','juin'],['juillet','juillet'],['août','aout'],['septembre','septembre'],['octobre','octobre'],['novembre','novembre'],['décembre','decembre']],
 'La météo':[['le soleil','soleil'],['un nuage','nuage'],['la pluie','pluie'],['la neige','neige'],['le vent','vent'],["l'orage",'orage'],['le brouillard','brouillard'],['il fait chaud','chaud'],['il fait froid','froid']],
 'La maison':[['une maison','maison'],['une porte','porte'],['une table','table'],['une chaise','chaise'],['un lit','lit'],['un livre','livre'],['un mur','mur'],['une lampe','lampe'],['un sac','sac']],
 'Le lycée':[['un professeur','professeur'],['une salle','salle'],['un tableau','tableau'],['une cantine','cantine'],['une cour','cour'],['un bureau','bureau'],['une chaise','chaise'],['un cahier','cahier'],['une porte','porte']],
 'Le matériel scolaire':[['un stylo','stylo'],['un crayon','crayon'],['une gomme','gomme'],['une règle','regle'],['un taille-crayon','taille-crayon'],['des ciseaux','ciseaux'],['un feutre','feutre'],['la colle','colle'],['une trousse','trousse']],
 "Le vocabulaire de l'école":[["l'école",'ecole'],['la cour','cour'],['le couloir','couloir'],['la cantine','cantine'],["l'emploi du temps",'emploidutemps'],['un banc','banc'],['une note','note'],['une lettre','lettre'],['le prénom','prenom'],['le nom','nom'],['une question','question'],['une image','image']],
 'Le corps':[['la bouche','bouche'],["l'oreille",'oreille'],['les yeux','yeux'],['les cheveux','cheveux'],['le visage','visage'],['la jambe','jambe'],['la main','main'],['le nez','nez'],['le pied','pied']],
 'Les vêtements':[['un pantalon','pantalon'],['une chemise','chemise'],['une robe','robe'],['une veste','veste'],['un pull','pull'],['une jupe','jupe'],['un manteau','manteau'],['un tee-shirt','teeshirt'],['une chaussure','chaussure'],['une chaussette','chaussette'],['des lunettes','lunettes']],
 'La ville':[['un magasin','magasin'],['la mairie','mairie'],["l'hôpital",'hopital'],['un hôtel','hotel'],['la pharmacie','pharmacie'],['la poste','poste'],['la banque','banque'],['la gare','gare'],['une usine','usine'],['la ville','ville'],['le marché','marche'],['une poubelle','poubelle']],
 'Les actions':[['manger','manger'],['boire','boire'],['dormir','dormir'],['courir','courir'],['marcher','marcher'],['lire','lire'],['écrire','ecrire'],['écouter','ecouter'],['parler','parler']],
 'Les positions':[['dans','dans'],['sur','sur'],['sous','sous'],['devant','devant'],['derrière','derriere'],['entre','entre'],['à gauche','gauche'],['à droite','droite'],['ici','ici']],
 'Les contraires':[['grand','grand'],['petit','petit'],['chaud','chaud'],['froid','froid'],['lourd','lourd'],['léger','leger'],['rapide','rapide'],['lent','lent'],['propre','propre'],['sale','sale']],
 'Les saisons':[['le printemps','printemps'],["l'été",'ete'],["l'automne",'automne'],["l'hiver",'hiver']],
 'Les fruits':[['une fraise','fraise'],['un kiwi','kiwi'],['un melon','melon'],['une mangue','mangue'],['une figue','figue'],['un ananas','ananas'],['une pastèque','pasteque'],['une prune','prune'],['une pêche','peche'],['un abricot','abricot'],['une framboise','framboise'],['un raisin','raisin']],
 'Les légumes':[['un poireau','poireau'],['un radis','radis'],['un oignon','oignon'],['une courgette','courgette'],['un haricot','haricot'],['un navet','navet'],['un poivron','poivron'],['un concombre','concombre'],['un chou','chou'],['une betterave','betterave'],['un avocat','avocat'],['un champignon','champignon'],['de la salade','salade']],
 'Les féculents':[['du pain','pain'],['du riz','riz'],['une pomme de terre','pommedeterre']],
 'Les légumineuses':[],
 'La viande, le poisson, les œufs':[['de la viande','viande'],['du poisson','poisson'],['un œuf','oeuf']],
 'Les produits laitiers':[['du lait','lait'],['du fromage','fromage'],['un yaourt','yaourt']],
 'Les matières grasses':[["de l'huile",'huile']],
 'Les produits sucrés':[['du sucre','sucre'],['un gâteau','gateau'],['un bonbon','bonbon']],
 'Les boissons':[["de l'eau",'eau'],['du café','cafe']],
 'Les moments du repas':[],
 'À table':[['la table','table'],['une assiette','assiette'],['un verre','verre']],
 'Les couleurs':[['rouge','rouge'],['jaune','jaune'],['bleu','bleu'],['vert','vert-peinture'],['noir','noir'],['blanc','blanc'],['gris','gris'],['orange','orange-peinture'],['marron','marron']],
 'Les transports':[['un vélo','velo'],['une voiture','voiture'],['un bus','bus'],['un train','train'],['un avion','avion'],['un taxi','taxi'],['un wagon','wagon']],
 /* Thème publié le 05/09 : 16 métiers accessibles en CAP / apprentissage, plus le
    coiffeur, le docteur et l'informatique qui existaient déjà. Les images sont dans
    clean/. Livreur, esthéticienne, jardinier, agriculteur et couturier ont été écartés. */
 'Les métiers':[['un maçon','macon'],['un peintre','peintre'],['un électricien','electricien'],['un plombier','plombier'],['un menuisier','menuisier'],['un soudeur','soudeur'],['un mécanicien','mecanicien'],['un cuisinier','cuisinier'],['un serveur','serveur'],['un boulanger','boulanger'],['un pâtissier','patissier'],['un vendeur','vendeur'],['un caissier','caissier'],['un magasinier','magasinier'],['un aide-soignant','aidesoignant'],['un agent d\'entretien','agententretien'],['un coiffeur','coiffeur']]
};
  const PREF = f => (/^(geste|phrase)-/.test(f) ? f : 'mot-' + f);
  /* Ses mots à elle, ajoutés dans l'espace enseignant, viennent se ranger à la suite. */
  function perso() {
    try {
      const b = JSON.parse(localStorage.getItem('upe2a-themes-perso') || '{}');
      return (b && b.mots) || {};
    } catch (e) { return {}; }
  }
  function themes() {
    const p = perso();
    const l = Object.keys(BANQUE).concat(Object.keys(p));
    return l.filter((x, i) => l.indexOf(x) === i);
  }
  function mots(theme) {
    const p = perso()[theme] || [];
    const l = (BANQUE[theme] || []).concat(p);
    const vus = {};
    return l.filter(x => x && x[0] && !vus[x[0]] && (vus[x[0]] = true))
      .map(x => ({ mot: x[0], image: 'clean/' + PREF(x[1]) + '.png' }));
  }
  window.BANQUE_MOTS = { BANQUE, PREF, themes, mots };
})();
