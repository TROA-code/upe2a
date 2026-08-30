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

// ── briques de mise en page
const BANDEAU=(titre,sous)=>'<div style="flex:0 0 auto;background:#14213d;color:#fff;border-radius:3mm;'
 +'padding:3.5mm 6mm;display:flex;align-items:baseline;gap:6mm">'
 +'<span style="font-family:Archivo Black, Archivo, sans-serif;font-size:15pt">'+esc(titre)+'</span>'
 +'<span style="flex:1;font-size:9.5pt;opacity:0.75">'+esc(sous||'UPE2A NSA · français langue de scolarisation')+'</span></div>';

const CONSIGNE=(txt,picto)=>'<div style="flex:0 0 auto;display:flex;align-items:center;gap:3.5mm;'
 +'background:#d8e6f4;border-radius:2mm;padding:2.5mm 4mm">'
 +(picto?'<img src="'+picto+'" alt="" style="width:8mm;height:8mm;object-fit:contain" />':'')
 +'<span style="font-family:Verdana, Tahoma, sans-serif;font-size:12.5pt;font-weight:700;color:#14213d">'
 +esc(txt)+'</span></div>';

const PAGE=(label,corps)=>'<section class="page" data-screen-label="'+esc(label)+'" '
 +'style="position:relative;display:flex;flex-direction:column;gap:5mm;background:#fff;overflow:hidden;'
 +'padding:12mm 13mm;box-sizing:border-box;width:210mm;height:297mm;'
 +'font-family:Verdana, Tahoma, sans-serif;color:#14213d">'+corps+'</section>';

const OREILLE='clean/icone-oreille.svg', OEIL='clean/icone-oeil.svg', CRAYON='clean/mot-crayon.png';

// en-tête de la page 1 : mot repère · le son · le geste, puis toutes les graphies
function enTete(f){
  const rep=(f.reperes||[])[0];
  const photoRep=rep && f.aPhoto(rep[1])
    ? '<img src="clean/mot-'+rep[1]+'.png" alt="" style="width:22mm;height:22mm;object-fit:contain" />'
    : '<span style="width:22mm;height:22mm;border:0.5mm dashed #c9b98f;border-radius:2mm;display:flex;'
      +'align-items:center;justify-content:center;font-size:7pt;color:#8a7c55;text-align:center">photo<br />à venir</span>';
  const geste=f.geste
    ? '<img src="'+f.geste+'" alt="" style="width:24mm;height:24mm;object-fit:contain" />'
    : '<span style="width:24mm;height:24mm;border:0.5mm dashed #c9cfd8;border-radius:2mm;display:flex;'
      +'align-items:center;justify-content:center;font-size:7pt;color:#8a91a3;text-align:center">geste<br />à venir</span>';
  const graphies=(f.graphies||[]).map(g=>
    '<span style="display:flex;flex-direction:column;align-items:center;gap:0.5mm;border:0.3mm solid #dde2e9;'
    +'border-radius:1.5mm;padding:1mm 2.5mm;min-width:12mm">'
    +'<span style="font-size:13pt;font-weight:700;letter-spacing:0.05em">'+esc(g.toLocaleUpperCase('fr-FR'))+'</span>'
    +'<span style="font-size:12pt">'+esc(g)+'</span>'
    +'<span style="font-family:\'BA Script\', Verdana, sans-serif;font-size:13pt;color:#1d4e89">'+esc(g)+'</span>'
    +'<span style="font-family:\'BA Cursive\', cursive;font-size:14pt;color:#1d4e89">'+esc(g)+'</span>'
    +'</span>').join('');
  return '<div style="flex:0 0 auto;display:flex;gap:4mm;align-items:stretch">'
    +'<div style="flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:1.5mm;'
    +'background:#f7f2e6;border-radius:2.5mm;padding:3mm 4mm">'+photoRep
    +'<span style="font-size:11pt;font-weight:700">'+esc(rep?sansArticle(rep[0]):'—')+'</span></div>'
    +'<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2mm;'
    +'border:0.5mm solid #14213d;border-radius:2.5mm">'
    +'<img src="'+OREILLE+'" alt="" style="width:11mm;height:11mm;object-fit:contain" />'
    +'<span style="font-family:Archivo Black, Archivo, sans-serif;font-size:30pt;line-height:1">'+esc(f.api)+'</span></div>'
    +'<div style="flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:2mm">'+geste+'</div>'
    +'</div>'
    +'<div style="flex:0 0 auto;display:flex;align-items:center;gap:3mm;border-top:0.3mm solid #dde2e9;'
    +'border-bottom:0.3mm solid #dde2e9;padding:2mm 0">'
    +'<img src="'+OEIL+'" alt="" style="width:9mm;height:9mm;object-fit:contain" />'
    +'<div style="flex:1;display:flex;gap:2.5mm;flex-wrap:wrap">'+graphies+'</div></div>';
}

// Ex 1 — j'écoute, je répète : photo + capitales + script
function exEcoute(mots){
  const cases=mots.map(m=>
    '<div style="display:flex;flex-direction:column;align-items:center;gap:1mm;border:0.4mm solid #14213d;'
    +'border-radius:2mm;padding:2mm">'
    +'<img src="'+esc(m[1])+'" alt="" style="width:100%;height:26mm;object-fit:contain" />'
    +'<span style="font-size:12pt;font-weight:700;letter-spacing:0.05em">'+esc(CAP(m[0]))+'</span>'
    +'<span style="font-size:11pt">'+esc(sansArticle(m[0]))+'</span></div>').join('');
  return CONSIGNE('J’écoute. Je répète.', OREILLE)
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:3mm">'+cases+'</div>';
}

// Ex 2 — j'entends ? je coche : huit images SANS le mot écrit, moitié d'intrus
function exCoche(mots, intrus, api, graine){
  const liste=melange(mots.slice(0,4).concat(intrus.slice(0,4)), graine+7);
  const cases=liste.map(m=>
    '<div style="display:flex;flex-direction:column;align-items:center;gap:1.5mm;border:0.4mm solid #14213d;'
    +'border-radius:2mm;padding:2mm">'
    +'<img src="'+esc(m[1])+'" alt="" style="width:100%;height:24mm;object-fit:contain" />'
    +'<span style="width:7mm;height:7mm;border:0.5mm solid #14213d;border-radius:1mm;display:block"></span></div>').join('');
  return CONSIGNE('J’entends '+api+' ? Je coche.', OREILLE)
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:3mm">'+cases+'</div>';
}

// Ex 3 — je lis, j'entoure : 27 lettres, la cible mêlée à des lettres proches
const PROCHES={a:['o','e','c','d','u','q'], i:['l','j','t','f','r'], o:['a','c','e','u','q'],
 u:['n','v','o','y'], m:['n','w','h','u'], l:['i','t','b','f'], r:['n','v','s','z'],
 s:['c','z','e','x'], p:['q','b','d','g'], t:['f','l','i','r'], f:['t','l','j','i'],
 v:['u','w','y','n'], b:['d','p','h'], d:['b','p','q'], n:['m','u','h'], g:['q','p','y'],
 ch:['cl','ph','sh','th'], ou:['on','au','uo','oi'], an:['am','au','ar','na'],
 on:['om','an','ou','no'], 'in':['im','ni','un','ui'], gn:['ng','gh','qn'],
 'é':['e','è','ê'], 'è':['é','e','ê'], eu:['ue','en','ou'], oi:['io','ai','ou'], ui:['iu','ui','un']};
function exEntoure(f, graine){
  const cibles=f.graphies||[];
  const proches=[];
  cibles.forEach(g=>{ (PROCHES[g]||['e','s','n','u','r']).forEach(p=>proches.push(p)); });
  const cell=[];
  const r=alea(graine+13);
  for(let i=0;i<27;i++){
    const cible=r()<0.42;
    const src=cible?cibles:proches;
    const t=src[Math.floor(r()*src.length)]||'e';
    // trois écritures alternées : capitale, script, script Belle Allure
    const forme=Math.floor(r()*3);
    const txt=forme===0?t.toLocaleUpperCase('fr-FR'):t;
    const police=forme===2?'\'BA Script\', Verdana, sans-serif':'Verdana, Tahoma, sans-serif';
    cell.push('<span style="display:flex;align-items:center;justify-content:center;border:0.3mm solid #dde2e9;'
      +'border-radius:1.5mm;height:14mm;font-family:'+police+';font-size:17pt">'+esc(txt)+'</span>');
  }
  return CONSIGNE('Je lis. J’entoure les '+(cibles[0]||'')+'.', OEIL)
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(9,1fr);gap:2mm">'+cell.join('')+'</div>';
}

// Ex 4 — je manipule des syllabes : autant de cases que de syllabes
function exSyllabes(mots){
  const LC=window.LECTURE_CODE;
  const lignes=mots.map(m=>{
    const mot=sansArticle(m[0]);
    const n=LC?Math.max(1,(LC.analyser(mot).syllabes||[]).length):1;
    let cases='';
    for(let i=0;i<n;i++) cases+='<span style="width:16mm;height:11mm;border:0.4mm solid #14213d;'
      +'border-radius:1.5mm;display:block"></span>';
    return '<div style="display:flex;align-items:center;gap:4mm;border-bottom:0.3mm solid #e6eaef;padding:2mm 0">'
      +'<img src="'+esc(m[1])+'" alt="" style="width:18mm;height:18mm;object-fit:contain" />'
      +'<span style="flex:0 0 42mm;font-size:12pt;font-weight:700;letter-spacing:0.05em">'+esc(CAP(m[0]))+'</span>'
      +'<span style="display:flex;gap:2.5mm">'+cases+'</span></div>';
  }).join('');
  return CONSIGNE('Je tape les syllabes dans mes mains. Je coche une case par syllabe.', CRAYON)
    +'<div style="flex:0 0 auto;display:flex;flex-direction:column">'+lignes+'</div>';
}

// Combinatoire — seulement pour les consonnes : le son ne se prononce pas seul
function pageCombinatoire(f){
  const c=(f.graphies||[])[0]||f.cle;
  const VOY=['a','e','i','o','u','é','ou'];
  const cell=VOY.map(v=>{
    const s=c+v;
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:1mm;border:0.4mm solid #14213d;'
      +'border-radius:2mm;padding:3mm 2mm">'
      +'<span style="font-size:20pt;font-weight:700;letter-spacing:0.05em">'+esc(s.toLocaleUpperCase('fr-FR'))+'</span>'
      +'<span style="font-size:18pt">'+esc(s)+'</span>'
      +'<span style="font-family:\'BA Cursive\', cursive;font-size:20pt;color:#1d4e89">'+esc(s)+'</span></div>';
  }).join('');
  const lignes=VOY.map(v=>'<div style="display:flex;gap:3mm;align-items:center;border-bottom:0.3mm solid #e6eaef;'
    +'padding:2.5mm 0"><span style="flex:0 0 22mm;font-size:15pt;font-weight:700">'
    +esc((c+v).toLocaleUpperCase('fr-FR'))+'</span>'
    +'<span style="flex:1;height:9mm;border-bottom:0.3mm solid #c9cfd8;display:block"></span></div>').join('');
  return PAGE('Combinatoire '+f.cle,
    BANDEAU('Le son '+f.api+' — je lis les syllabes')
    +CONSIGNE('Je lis les syllabes à voix haute.', OEIL)
    +'<div style="flex:0 0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:3mm">'+cell+'</div>'
    +CONSIGNE('Je lis. Je montre la syllabe que le professeur dit.', OREILLE)
    +'<div style="flex:1;min-height:0;display:flex;flex-direction:column">'+lignes+'</div>');
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
      html:PAGE('Son '+o.son+' 1', BANDEAU('Le son '+f.api)+enTete(fiche)
        +exEcoute(mots)+exCoche(mots,intrus,f.api,graine))});
    pages.push({id:base+'seance-'+(o.seed||0)+'-2', coll:'sonfab',
      nom:'Le son '+f.api+' — séance 2',
      html:PAGE('Son '+o.son+' 2', BANDEAU('Le son '+f.api)
        +exEntoure(fiche,graine)+exSyllabes(mots))});
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
