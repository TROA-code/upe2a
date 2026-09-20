/* Séances de phonologie et fiches d'un son — UPE2A NSA.
   Génère les pages d'un phonème à partir de six mots tirés des thèmes (photo obligatoire).
   Structure Retz « La clé du code » + Pilotis : quatre exercices, dans cet ordre,
   pas d'exercice d'écriture (le cahier d'écriture s'en charge).
   Les séances A, I et O recopiées à la main ne sont PAS regénérées. */
(function(){

const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
// ordre important : « une » doit passer avant « un », sinon « une maison » → « e maison »
const sansArticle=t=>String(t).replace(/^(une|un|des|les|le|la|du|de la|de l'|d'|l')\s+/i,'')
  .replace(/^(l'|d')/i,'').trim();
const CAP=t=>sansArticle(t).toLocaleUpperCase('fr-FR');

// tirage reproductible : même son + même graine = mêmes mots
function alea(graine){
  let g=graine;
  return ()=>{ g=(g*9301+49297)%233280; return g/233280; };
}
function melange(liste, graine){
  const l=liste.slice(), r=alea(graine);
  for(let i=l.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); const t=l[i]; l[i]=l[j]; l[j]=t; }
  return l;
}
function graineDe(cle, seed){
  let g=1000+(seed||0)*7919;
  String(cle).split('').forEach(c=>{ g+=c.charCodeAt(0)*13; });
  return g;
}

/* banque : [[texte, srcImage]] — on ne garde que les mots qui ont une image.
   avec : ceux qui portent le son ; intrus : ceux qui ne le portent pas. */
function tirer(cle, banque, seed, nbMots, nbIntrus){
  const LS=window.LECTURE_SONS;
  const dedans=[], dehors=[];
  const vus={};
  (banque||[]).forEach(it=>{
    if(!it || !it[0] || !it[1]) return;
    const m=sansArticle(it[0]).toLowerCase();
    if(!m || m.length<2 || /\s/.test(m) || vus[m]) return;
    if(LS && LS.ecarte && LS.ecarte(it[0])) return;   // orthographe piégeuse
    vus[m]=1;
    ((LS && LS.contient(cle,m)) ? dedans : dehors).push(it);
  });
  const g=graineDe(cle, seed);
  return {mots:melange(dedans,g).slice(0,nbMots||6),
          intrus:melange(dehors,g+31).slice(0,nbIntrus||4),
          totalDispo:dedans.length};
}

/* ── briques de mise en page
   ⚠ L'HABILLAGE EST CELUI DES ANCIENNES FICHES A, I ET O (16/09 : « oh comme c'est pas joli
   graphiquement par rapport à ce que j'avais »). Ces trois fiches étaient composées à la
   main, en dur dans fiches-source.js, et bien plus soignées que ce gabarit : bandeau
   bordeaux à ras bord + liseré orange, numéro d'exercice en pastille, mot repère sur fond
   crème. Elles ne sont plus affichées (la séance est fabriquée pour tous les sons depuis le
   16/09) mais leur graphisme est repris ici, pour tous les sons. Repères de couleur, à ne
   pas changer isolément : bordeaux #8c1c13, liseré #c1440e, encre #14213d, crème #faf6ec
   avec sa bordure #e4dfc8. */
const ROUGE='#8c1c13', LISERE='#c1440e', ENCRE='#14213d', CREME='#faf6ec', BORDCREME='#e4dfc8';

/* Tout est en PIXELS, comme ses fiches d'origine : la page fait 210 × 297 mm, soit
   794 × 1123 px, et c'est en px que les blocs étaient cotés. Mélanger mm et px donnait les
   proportions bancales qu'elle a vues (photo minuscule, colonnes trop larges). */
const BANDEAU=(titre,sous)=>'<div style="flex:0 0 auto;background:'+ROUGE+';color:#fff;'
 +'padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px">'
 +'<span style="font-size:26px;font-weight:700;letter-spacing:0.04em">'+esc(titre)+'</span>'
 +'<span style="font-size:15px;letter-spacing:0.1em;opacity:0.85">'+esc(sous||'')+'</span></div>'
 +'<div style="flex:0 0 auto;height:5px;background:'+LISERE+'"></div>';

/* Consigne numérotée : pastille ronde bleu nuit, texte à 19 px — exactement ses fiches. */
const CONSIGNE=(n,txt)=>'<div style="flex:0 0 auto;display:flex;align-items:baseline;gap:11px">'
 +'<span style="width:29px;height:29px;flex:0 0 auto;border-radius:50%;background:'+ENCRE+';color:#fff;'
 +'font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center">'+n+'</span>'
 +'<span style="font-size:19px;color:'+ENCRE+';font-weight:700">'+esc(txt)+'</span></div>';

const PAGE=(label,corps)=>'<section class="page" data-screen-label="'+esc(label)+'" '
 +'style="position:relative;display:flex;flex-direction:column;background:#fff;overflow:hidden;'
 +'padding:0;box-sizing:border-box;width:210mm;height:297mm;'
 +'font-family:Arial, Helvetica, sans-serif;color:'+ENCRE+'">'+corps+'</section>';

const CORPS=c=>'<div style="flex:1;min-height:0;display:flex;flex-direction:column;gap:12px;'
 +'padding:16px 24px 20px">'+c+'</div>';

const OREILLE='clean/icone-oreille.svg', OEIL='clean/icone-oeil.svg', CRAYON='clean/mot-crayon.webp';

// en-tête de la page 1 : mot repère · le son · le geste, puis les cinq écritures
function enTete(f){
  const rep=(f.reperes||[])[0];
  const photoRep=rep && f.aPhoto(rep[1])
    ? '<div style="width:126px;height:118px;background:url(\'clean/mot-'+rep[1]+'.webp\') center/contain no-repeat"></div>'
    : '<div style="width:126px;height:118px;border:2px dashed #c9b98f;border-radius:7px;display:flex;'
      +'align-items:center;justify-content:center;font-size:11px;color:#8a7c55;text-align:center">photo<br />à venir</div>';
  const geste=f.geste
    ? '<div style="width:100px;height:100px;background:url(\''+f.geste+'\') center/contain no-repeat"></div>'
    : '<div style="width:100px;height:100px;border:2px dashed #c9cfd8;border-radius:7px;display:flex;'
      +'align-items:center;justify-content:center;font-size:11px;color:#8a91a3;text-align:center">geste<br />à venir</div>';

  /* ⚠ CINQ ÉCRITURES DE LA MÊME LETTRE, pas la liste des graphies (16/09) : capitale
     d'imprimerie, script minuscule, script Belle Allure, cursive minuscule, cursive
     majuscule. C'est ce que montraient ses fiches, et c'est plus juste : l'élève doit
     reconnaître SA lettre sous ses cinq visages. La version d'avant alignait a/à/â en
     colonnes larges, ce qui ne disait rien et laissait la ligne à moitié vide. */
  const g=(f.graphies||[f.cle||'a'])[0];
  const G=g.toLocaleUpperCase('fr-FR');
  const ECRITURES=[
    ['font-weight:700', G], ['', g],
    ["font-family:'BA Script'", g],
    ["font-family:'BA Cursive'", g],
    ["font-family:'BA Cursive'", G]
  ];
  const cases=ECRITURES.map(e=>
    '<div style="display:flex;align-items:center;justify-content:center;border-left:1px solid #eef1f5">'
    +'<span style="font-size:40px;color:'+ENCRE+';line-height:1.05;'+e[0]+'">'+esc(e[1])+'</span></div>').join('');

  const etiq=(icone,txt)=>'<div style="flex:0 0 auto;width:62px;display:flex;flex-direction:column;'
    +'align-items:center;gap:1px;padding:6px 0">'
    +'<div style="width:26px;height:26px;background:url(\''+icone+'\') center/contain no-repeat"></div>'
    +'<span style="font-size:9.5px;letter-spacing:0.07em;color:#8a4b1e;font-weight:700">'+txt+'</span></div>';

  return '<div style="flex:0 0 auto;display:flex;align-items:stretch;border-bottom:3px solid '+ENCRE+'">'
    +'<div style="flex:0 0 auto;width:150px;display:flex;flex-direction:column;align-items:center;'
    +'justify-content:center;gap:4px;background:'+CREME+';border-right:2px solid '+BORDCREME+';padding:10px 6px">'
    +photoRep
    +'<span style="font-size:19px;font-weight:700;letter-spacing:0.05em;color:'+ENCRE+';text-align:center">'
    +esc(rep?CAP(rep[0]):'—')+'</span></div>'
    +'<div style="flex:1;min-width:0;display:flex;flex-direction:column">'
    +'<div style="flex:1;display:flex;align-items:center;border-bottom:1px solid #dde2e9">'
    +etiq(OREILLE,'J’ENTENDS')
    +'<span style="flex:1;font-size:46px;font-weight:700;color:'+ENCRE+';text-align:center;line-height:1">'
    +esc(f.api)+'</span>'
    +'<div style="flex:0 0 auto;width:118px;display:flex;align-items:center;justify-content:center;'
    +'border-left:1px dashed #c9cfd8">'+geste+'</div></div>'
    +'<div style="flex:1;display:flex;align-items:center">'+etiq(OEIL,'JE VOIS')
    +'<div style="flex:1;display:grid;grid-template-columns:repeat(5,1fr);gap:0;align-self:stretch">'
    +cases+'</div></div>'
    +'</div></div>';
}

// Ex 1 — j'écoute, je répète : photo + capitales + script
function exEcoute(mots){
  /* Cases à 2 px de bordure et 9 px de rayon, capitales à 20 px puis script à 17 px :
     les cotes de ses fiches d'origine. */
  const cases=mots.map(m=>
    '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;'
    +'border:2px solid '+ENCRE+';border-radius:9px;padding:8px">'
    +'<img src="'+esc(m[1])+'" alt="" style="width:100%;height:96px;object-fit:contain" />'
    +'<span style="font-size:20px;font-weight:700;letter-spacing:0.05em;color:'+ENCRE+'">'+esc(CAP(m[0]))+'</span>'
    +'<span style="font-size:17px;color:#6b7386">'+esc(sansArticle(m[0]))+'</span></div>').join('');
  return CONSIGNE(1,'J’écoute. Je répète.')
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:11px">'+cases+'</div>';
}

// Ex 2 — j'entends ? je coche : huit images SANS le mot écrit, moitié d'intrus
function exCoche(mots, intrus, api, graine){
  const liste=melange(mots.slice(0,4).concat(intrus.slice(0,4)), graine+7);
  const cases=liste.map(m=>
    '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;'
    +'border:2px solid '+ENCRE+';border-radius:9px;padding:8px">'
    +'<img src="'+esc(m[1])+'" alt="" style="width:100%;height:84px;object-fit:contain" />'
    +'<span style="width:26px;height:26px;border:2px solid '+ENCRE+';border-radius:4px;display:block"></span></div>').join('');
  return CONSIGNE(2,'J’entends '+api+' ? Je coche la case.')
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:11px">'+cases+'</div>';
}

// Ex 3 — je lis, j'entoure : 27 lettres, la cible mêlée à des lettres proches
const PROCHES={a:['o','e','c','d','u','q'], i:['l','j','t','f','r'], o:['a','c','e','u','q'],
 u:['n','v','o','y'], m:['n','w','h','u'], l:['i','t','b','f'], r:['n','v','s','z'],
 s:['c','z','e','x'], p:['q','b','d','g'], t:['f','l','i','r'], f:['t','l','j','i'],
 v:['u','w','y','n'], b:['d','p','h'], d:['b','p','q'], n:['m','u','h'], g:['q','p','y'],
 ch:['cl','ph','sh','th'], ou:['on','au','uo','oi'], an:['am','au','ar','na'],
 on:['om','an','ou','no'], 'in':['im','ni','un','ui'], gn:['ng','gh','qn'],
 e:['a','o','c','s'], eu:['ue','en','ou'], oi:['io','ai','ou'], ui:['iu','un','iu']};
function exEntoure(f, graine){
  const cibles=f.graphies||[];
  /* ⚠ LES LETTRES PROCHES SE CHERCHENT SUR LA LETTRE DE BASE (16/09). Les graphies d'un son
     incluent ses variantes accentuées (a, à, â) ; PROCHES n'a d'entrée que pour « a », donc
     à et â tombaient sur le repli ['e','s','n','u','r'] et la grille se remplissait de S, N,
     E, R — des lettres qui ne ressemblent en rien à un a. L'exercice perdait son sens : on
     entoure une lettre au milieu de lettres QU'ON PEUT CONFONDRE AVEC ELLE. */
  const sansAcc=x=>String(x).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const proches=[...new Set(cibles.flatMap(g=>PROCHES[g]||PROCHES[sansAcc(g)]||['o','e','c','u']))]
    .filter(p=>!cibles.includes(p));
  const cell=[];
  const r=alea(graine+13);
  /* Les trois écritures ne rendent pas à la même taille : sans compensation, la grille
     paraissait faite de lettres aléatoirement grandes et petites. */
  const FORMES=[
    {cap:true,  police:'Arial, Helvetica, sans-serif', taille:27},
    {cap:false, police:'Arial, Helvetica, sans-serif', taille:27},
    {cap:false, police:"'BA Script', Arial, sans-serif", taille:31}
  ];
  for(let i=0;i<27;i++){
    const cible=r()<0.42;
    const src=cible?cibles:proches;
    const t=src[Math.floor(r()*src.length)]||'o';
    const fo=FORMES[Math.floor(r()*FORMES.length)];
    const txt=fo.cap?t.toLocaleUpperCase('fr-FR'):t;
    /* Les graphèmes de plus d'une lettre (elle, erre, ette) débordaient de leur case :
       la taille se réduit avec la longueur. */
    const taille=txt.length>3?Math.round(fo.taille*0.52)
      :(txt.length>2?Math.round(fo.taille*0.66)
      :(txt.length>1?Math.round(fo.taille*0.82):fo.taille));
    cell.push('<span style="display:flex;align-items:center;justify-content:center;border:2px solid '+ENCRE+';'
      +'border-radius:9px;height:52px;font-family:'+fo.police+';font-size:'+taille+'px;color:'+ENCRE+'">'
      +esc(txt)+'</span>');
  }
  return CONSIGNE(3,'Je lis. J’entoure les '+(cibles[0]||'')+'.')
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(9,1fr);gap:7px">'+cell.join('')+'</div>';
}

// Ex 4 — je manipule des syllabes : autant de cases que de syllabes
function exSyllabes(mots){
  const LC=window.LECTURE_CODE;
  const lignes=mots.map(m=>{
    const mot=sansArticle(m[0]);
    const n=LC?Math.max(1,(LC.analyser(mot).syllabes||[]).length):1;
    let cases='';
    for(let i=0;i<n;i++) cases+='<span style="width:60px;height:42px;border:2px solid '+ENCRE+';'
      +'border-radius:6px;display:block"></span>';
    return '<div style="display:flex;align-items:center;gap:15px;border-bottom:1px solid #e6eaef;padding:7px 0">'
      +'<img src="'+esc(m[1])+'" alt="" style="width:68px;height:68px;object-fit:contain" />'
      +'<span style="flex:0 0 160px;font-size:20px;font-weight:700;letter-spacing:0.05em;color:'+ENCRE+'">'+esc(CAP(m[0]))+'</span>'
      +'<span style="display:flex;gap:9px">'+cases+'</span></div>';
  }).join('');
  return CONSIGNE(4,'Je tape les syllabes dans mes mains. Je coche une case par syllabe.')
    +'<div style="flex:0 0 auto;display:flex;flex-direction:column">'+lignes+'</div>';
}

// Combinatoire — seulement pour les consonnes : le son ne se prononce pas seul
function pageCombinatoire(f){
  const c=(f.graphies||[])[0]||f.cle;
  const VOY=['a','e','i','o','u','é','ou'];
  const cell=VOY.map(v=>{
    const s=c+v;
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;border:2px solid '+ENCRE+';'
      +'border-radius:9px;padding:11px 8px">'
      +'<span style="font-size:30px;font-weight:700;letter-spacing:0.05em;color:'+ENCRE+'">'+esc(s.toLocaleUpperCase('fr-FR'))+'</span>'
      +'<span style="font-size:27px;color:'+ENCRE+'">'+esc(s)+'</span>'
      +'<span style="font-family:\'BA Cursive\', cursive;font-size:30px;color:'+ENCRE+'">'+esc(s)+'</span></div>';
  }).join('');
  const lignes=VOY.map(v=>'<div style="display:flex;gap:11px;align-items:center;border-bottom:1px solid #e6eaef;'
    +'padding:9px 0"><span style="flex:0 0 84px;font-size:23px;font-weight:700;color:'+ENCRE+'">'
    +esc((c+v).toLocaleUpperCase('fr-FR'))+'</span>'
    +'<span style="flex:1;height:34px;border-bottom:1px solid #c9cfd8;display:block"></span></div>').join('');
  return PAGE('Combinatoire '+f.cle,
    BANDEAU('LE SON '+f.api,'COMBINATOIRE')
    +CORPS(CONSIGNE(1,'Je lis les syllabes à voix haute.')
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:11px">'+cell+'</div>'
    +CONSIGNE(2,'Je lis. Je montre la syllabe que le professeur dit.')
    +'<div style="flex:1;min-height:0;display:flex;flex-direction:column">'+lignes+'</div>'));
}

/* build({son, seed, banque, types}) → pages {id, coll, nom, html} */
function build(opts){
  const o=opts||{}, LS=window.LECTURE_SONS;
  const f=o.fiche || (LS?LS.sonDe(o.son):null);
  if(!f) return [];
  const fiche=Object.assign({cle:o.son, aPhoto:(LS?LS.aPhoto:()=>false)}, f);
  const t=o.tirage || tirer(o.son, o.banque, o.seed||0, 6, 4);
  const mots=t.mots, intrus=t.intrus;
  if(mots.length<3) return [];
  const graine=graineDe(o.son, o.seed||0);
  const slug=String(o.son).replace(/[^a-z0-9]/gi,'')||'son';
  const base='son-'+slug+'-';
  const types=o.types||{};
  const pages=[];
  if(types.seance){
    pages.push({id:base+'seance-'+(o.seed||0)+'-1', coll:'sonfab',
      nom:'Le son '+f.api+' — séance 1',
      html:PAGE('Son '+o.son+' 1', BANDEAU('LE SON '+f.api,'SÉANCE 1')
        /* ⚠ enTete est un FRÈRE de CORPS, jamais dedans : sur ses fiches d'origine l'en-tête
           va d'un bord à l'autre de la page (794 px, left 0). Glissé dans CORPS, il héritait
           de ses 24 px de marge latérale et tombait à 746 px — la bande crème du mot repère
           et le filet sous « JE VOIS » flottaient au lieu de filer à fond perdu. C'est une
           part du « c'est horrible par rapport à ce que j'avais » du 16/09. */
        +enTete(fiche)
        +CORPS(exEcoute(mots)+exCoche(mots,intrus,f.api,graine)))});
    pages.push({id:base+'seance-'+(o.seed||0)+'-2', coll:'sonfab',
      nom:'Le son '+f.api+' — séance 2',
      html:PAGE('Son '+o.son+' 2', BANDEAU('LE SON '+f.api,'SÉANCE 2')
        +CORPS(exEntoure(fiche,graine)+exSyllabes(mots)))});
  }
  if(types.combinatoire && f.famille==='consonne'){
    pages.push({id:base+'combinatoire-'+(o.seed||0)+'-1', coll:'sonfab',
      nom:'Le son '+f.api+' — combinatoire', html:pageCombinatoire(fiche)});
  }
  return pages;
}

const TYPES=[['seance','Séance de phonologie — 2 pages','eleve'],
             ['combinatoire','Combinatoire — je lis les syllabes','eleve']];

window.SONS_FICHES={TYPES, build, tirer, sansArticle};
})();
