/* Les sons — table des phonèmes de la progression, colonne vertébrale de la partie Lecture.
   UPE2A NSA. Logique écrite pour ce projet, aucun code externe.
   Mots repères : liste Retz (affichage classe) — voir lecture-code.js pour les 52 graphies.
   Chaque entrée : [clé (ce qu'elle tape dans la progression), notation, graphies,
                    mots repères [[mot, fichier image]], geste (fichier ou ''),
                    lot de pages de la séance de phonologie ('sonA'…) ou '',
                    famille] */
(function(){

const T=[
 // ── Voyelles
 ['a','[a]',['a','à','â'],[['ananas','ananas']],'a','sonA','voyelle'],
 ['i','[i]',['i','î','ï','y'],[['gris','gris']],'i','sonI','voyelle'],
 ['o','[o]',['o','ô','au','eau'],[['pot','pot'],['pomme','pomme']],'o','sonO','voyelle'],
 ['u','[y]',['u','û'],[['rue','rue']],'','','voyelle'],
 ['é','[e]',['é','er','ez','et'],[['épée','epee']],'','','voyelle'],
 ['è','[ɛ]',['è','ê','ai','aî','aï','ei','elle','erre','ette'],[['règle','regle']],'','','voyelle'],
 ['eu','[ø]',['eu','œu'],[['bleu','bleu']],'','','voyelle'],
 ['ou','[u]',['ou','oû','aoû','aou'],[['rouge','rouge']],'','','voyelle'],
 ['e','[ə]',['e'],[],'','','voyelle'],
 // ── Voyelles nasales
 ['an','[ɑ̃]',['an','am','en','em'],[['banc','banc']],'','','nasale'],
 ['on','[ɔ̃]',['on','om','ion'],[['bonbon','bonbon']],'','','nasale'],
 ['in','[ɛ̃]',['in','im','ain','ein'],[['lapin','lapin'],['main','main']],'','','nasale'],
 // ── Semi-voyelles
 ['oi','[wa]',['oi'],[['oiseau','oiseau']],'','','voyelle'],
 ['ui','[ɥi]',['ui'],[['huit','huit']],'','','voyelle'],
 ['y','[j]',['y','ill','ion'],[['pyjama','pyjama'],['fille','fille']],'','','consonne'],
 // ── Consonnes
 ['m','[m]',['m'],[['moto','moto']],'','','consonne'],
 ['l','[l]',['l'],[['lit','lit']],'','','consonne'],
 ['r','[ʁ]',['r'],[['robot','robot']],'','','consonne'],
 ['s','[s]',['s','ss','ç','c','t'],[['salade','salade'],['rose','rose']],'','','consonne'],
 ['z','[z]',['z','s'],[['zèbre','zebre']],'','','consonne'],
 ['p','[p]',['p'],[['pied','pied']],'','','consonne'],
 ['t','[t]',['t'],[['table','table']],'','','consonne'],
 ['d','[d]',['d'],[['date','date']],'','','consonne'],
 ['f','[f]',['f','ph'],[['fantôme','fantome']],'','','consonne'],
 ['v','[v]',['v'],[['vélo','velo']],'','','consonne'],
 ['b','[b]',['b'],[['ballon','ballon']],'','','consonne'],
 ['n','[n]',['n'],[['nuage','nuage']],'','','consonne'],
 ['ch','[ʃ]',['ch'],[['chat','chat']],'','','consonne'],
 ['j','[ʒ]',['j','g','ge'],[['jupe','jupe']],'','','consonne'],
 ['g','[g]',['g','gu'],[['gâteau','gateau']],'','','consonne'],
 ['k','[k]',['c','k','qu'],[['carotte','carotte'],['cinq','cinq']],'','','consonne'],
 ['gn','[ɲ]',['gn'],[['peigne','peigne']],'','','consonne'],
 ['w','[w]',['w'],[['wagon','wagon']],'','','consonne'],
 ['x','[ks]',['x'],[['xylophone','xylophone']],'','','consonne']
];

const SONS=T.map(r=>({cle:r[0], api:r[1], graphies:r[2], reperes:r[3],
  geste:r[4]?'clean/geste-son-'+r[4]+'.png':'', seance:r[5], famille:r[6]}));
const MAP={}; SONS.forEach(x=>{ MAP[x.cle]=x; });

// toutes les graphies connues, du plus long au plus court : « eau » gagne sur « e »
const ALL=[...new Set(SONS.reduce((a,x)=>a.concat(x.graphies),[]))]
  .sort((a,b)=>b.length-a.length);

const VOY='aàâäeéèêëiîïoôöuùûüyœ';
const DOUX=/[eéèêiîy]/;
const NASALES=new Set(['an','am','en','em','on','om','in','im','ain','ein','ien','ion']);

function decouper(mot){
  const m=String(mot).toLowerCase();
  const out=[];
  for(let i=0;i<m.length;){
    const g=ALL.find(x=>m.startsWith(x,i));
    if(g){ out.push({g:g, i:i}); i+=g.length; }
    else { out.push({g:m[i], i:i}); i+=1; }
  }
  return {m:m, gs:out};
}

// une même lettre ne dit pas toujours le même son : s entre deux voyelles, c et g devant e/i
function attribue(cle, mot, o){
  const son=MAP[cle];
  if(!son || son.graphies.indexOf(o.g)<0) return false;
  const suiv=mot[o.i+o.g.length]||'', prec=mot[o.i-1]||'';
  if(o.g==='s'){
    const inter=VOY.indexOf(prec)>=0 && VOY.indexOf(suiv)>=0;
    return cle==='z' ? inter : !inter;
  }
  if(o.g==='c') return DOUX.test(suiv) ? cle==='s' : cle==='k';
  if(o.g==='g') return DOUX.test(suiv) ? cle==='j' : cle==='g';
  if(o.g==='t') return cle==='s' ? /^ion/.test(mot.slice(o.i+1)) : true;
  // y devant une voyelle est une semi-voyelle : yaourt, yeux — pas le [i] de pyjama
  if(o.g==='y'){
    const semi=VOY.indexOf(suiv)>=0;
    return cle==='y' ? semi : !semi;
  }
  if(o.g==='ion' && cle==='y') return true;   // avion : le [j] reste, même dans « lionne »
  /* Une graphie nasale ne l'est que si rien ne « rouvre » la voyelle :
     gomme, pomme, homme, comme = [ɔm] et non [ɔ̃] ; banane, ami = pas de nasale ;
     femme = [fam]. On rejette donc devant une voyelle ou devant m/n. */
  if(NASALES.has(o.g)){
    if(suiv==='' ) return true;
    if(VOY.indexOf(suiv)>=0 || suiv==='m' || suiv==='n') return false;
    return true;
  }
  return true;
}

// le mot contient-il ce son ? (approximation assumée : on ne devine pas les cas rares)
function contient(cle, mot){
  const d=decouper(mot);
  return d.gs.some(o=>attribue(cle, d.m, o));
}

// pages de la séance de phonologie déjà recopiées, s'il y en a
function pagesSeance(cle){
  const son=MAP[cle], src=window.FICHES_SRC;
  if(!son || !son.seance || !src) return [];
  return src.pages.filter(p=>p.id.indexOf('sonsF-'+son.seance+'-')===0);
}

// photos de mots repères présentes dans clean/ — les autres attendent la photo
const PRESENTES=new Set(['ananas','gris','pot','pomme','rue','epee','regle','bleu','rouge','banc',
 'bonbon','main','oiseau','pyjama','fille','moto','lit','robot','salade','rose','zebre','pied',
 'table','date','fantome','velo','ballon','nuage','chat','jupe','gateau','carotte','cinq','wagon',
 'xylophone','lait','jaune']);

/* Mots à orthographe piégeuse : le son y est, mais la graphie est une exception.
   On ne les propose pas comme exemples d'un son (août pour [ou], plaît pour [è]…). */
const ECARTES=new Set(['aout','août','plait','plaît','silvousplait','femme','monsieur',
 'oignon','automne','faisan','paon','second','album','examen','parfum','aquarium']);
const nu=t=>String(t).toLowerCase().replace(/^(une|un|le|la|les|des|du|de la|de l'|d'|l')\s+/,'')
  .replace(/[^a-zàâäéèêëîïôöùûüçœ]/g,'');
const ecarte=t=>ECARTES.has(nu(t));

const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* « Aider un texte » : le texte en grand, avec les aides cochées, sans lignage d'écriture.
   Ici l'interligne est réglé à la main — c'est un texte à lire, pas un mot à écrire. */
function pageTexte(opts){
  const o=opts||{}, LC=window.LECTURE_CODE;
  const txt=(o.texte||'').trim();
  const aides=o.aides||{};
  const actif=LC && Object.keys(aides).some(k=>aides[k]);
  const corps=actif ? LC.texteHTML(txt, aides)
    : esc(txt).replace(/\n/g,'<br />');
  const consigne=(o.consigne||'Je lis le texte.').trim();
  const html='<section class="page" data-screen-label="Texte" style="position:relative;display:flex;'
    +'flex-direction:column;background:#fff;overflow:hidden;padding:14mm 15mm;box-sizing:border-box;'
    +'width:210mm;height:297mm;font-family:Verdana, Tahoma, sans-serif">'
    +'<div style="flex:0 0 auto;background:#14213d;color:#fff;border-radius:3mm;padding:4mm 6mm;'
    +'display:flex;align-items:baseline;gap:6mm">'
    +'<span style="font-family:Archivo Black, Archivo, sans-serif;font-size:16pt">'+esc(o.titre||'Je lis')+'</span>'
    +'<span style="font-size:10pt;opacity:0.75">UPE2A NSA</span></div>'
    +'<div style="flex:0 0 auto;margin-top:5mm;background:#d8e6f4;border-radius:2mm;padding:3mm 5mm;'
    +'font-size:13pt;font-weight:700;color:#14213d">'+esc(consigne)+'</div>'
    +'<div style="flex:1;min-height:0;margin-top:6mm;font-size:'+(o.taille||18)+'pt;font-weight:700;'
    +'line-height:'+(o.interligne||2)+';color:#14213d;overflow:hidden;text-wrap:pretty">'+corps+'</div>'
    +'</section>';
  return {id:'texte-aide', coll:'texte', nom:o.titre||'Texte aidé', html:html};
}

window.LECTURE_SONS={SONS, MAP, sonDe:c=>MAP[c]||null, contient, decouper,
  pagesSeance, pageTexte, ecarte,
  aPhoto:f=>PRESENTES.has(f),
  imageRepere:f=>'clean/mot-'+f+'.png'};
})();
