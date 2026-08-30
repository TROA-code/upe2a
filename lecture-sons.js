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
  const taille=o.taille||18, inter=o.interligne||2;
  const consigne=(o.consigne||'Je lis le texte.').trim();
  // découpage en lignes puis en pages A4 : un texte long ne doit rien perdre
  const maxCar=Math.max(16, Math.floor(180/(taille*0.3528*0.60)));
  const par={n:1};
  const lignes=[];
  txt.split(/\n+/).forEach((para,ip)=>{
    if(ip) lignes.push({vide:true});
    let cour=[];
    const pousser=()=>{ if(!cour.length) return;
      const t=cour.join(' ');
      lignes.push({html:actif?LC.texteHTML(t,Object.assign({},aides,{_par:par})):esc(t)});
      cour=[]; };
    para.trim().split(/\s+/).filter(Boolean).forEach(m=>{
      if(cour.concat([m]).join(' ').length>maxCar && cour.length) pousser();
      cour.push(m); });
    pousser();
  });
  const hLigne=taille*inter*0.3528, hVide=taille*0.5*0.3528;
  const hPage1=222, hSuite=248;
  const pagesL=[]; let cour=[], h=0, prem=true;
  lignes.forEach(l=>{ const dh=l.vide?hVide:hLigne;
    if(h+dh>(prem?hPage1:hSuite) && cour.length){ pagesL.push(cour); cour=[]; h=0; prem=false; }
    if(l.vide && !cour.length) return;
    cour.push(l); h+=dh; });
  if(cour.length) pagesL.push(cour);
  if(!pagesL.length) pagesL.push([]);
  const rendu=ls=>ls.map(l=>l.vide?'<div style="height:'+(taille*0.5)+'pt"></div>'
    :'<div>'+l.html+'</div>').join('');
  const pages=pagesL.map((ls,ip)=>({
    id:'texte-aide-'+(ip+1), coll:'texte',
    nom:(o.titre||'Texte aidé')+(pagesL.length>1?' — page '+(ip+1):''),
    html:'<section class="page" data-screen-label="Texte" style="position:relative;display:flex;'
      +'flex-direction:column;background:#fff;overflow:hidden;padding:14mm 15mm;box-sizing:border-box;'
      +'width:210mm;height:297mm;font-family:Verdana, Tahoma, sans-serif">'
      +(ip===0
        ? '<div style="flex:0 0 auto;background:#14213d;color:#fff;border-radius:3mm;padding:4mm 6mm;'
          +'display:flex;align-items:baseline;gap:6mm">'
          +'<span style="font-family:Archivo Black, Archivo, sans-serif;font-size:16pt">'+esc(o.titre||'Je lis')+'</span>'
          +'<span style="flex:1"></span><span style="font-size:10pt;opacity:0.75">UPE2A NSA</span></div>'
          +'<div style="flex:0 0 auto;margin-top:5mm;background:#d8e6f4;border-radius:2mm;padding:3mm 5mm;'
          +'font-size:13pt;font-weight:700;color:#14213d">'+esc(consigne)+'</div>'
        : '<div style="flex:0 0 auto;display:flex;align-items:baseline;gap:6mm;font-size:10pt;color:#8a91a3;'
          +'border-bottom:0.3mm solid #dde2e9;padding-bottom:2mm">'
          +'<span style="font-weight:700;color:#14213d">'+esc(o.titre||'Je lis')+'</span>'
          +'<span style="flex:1"></span><span>UPE2A NSA</span></div>')
      +'<div style="flex:1;min-height:0;margin-top:6mm;font-size:'+taille+'pt;font-weight:700;'
      +'line-height:'+inter+';color:#14213d;overflow:hidden;text-wrap:pretty">'+rendu(ls)+'</div>'
      +(pagesL.length>1?'<div style="flex:0 0 auto;font-size:9pt;color:#9aa4b2;text-align:right">page '
        +(ip+1)+' / '+pagesL.length+'</div>':'')
      +'</section>'}));
  return {id:'texte-aide', coll:'texte', nom:o.titre||'Texte aidé',
    html:pages[0].html, pages:pages};
}

/* Fiche de fluence : le texte en lignes fixes, avec le nombre de mots cumulé en marge.
   L'enseignante note où l'élève s'arrête au bout d'une minute → nombre de mots lus.
   Deux versions imprimées ensemble : une aidée (couleurs) et une nue. */
function pageFluence(opts){
  const o=opts||{}, LC=window.LECTURE_CODE;
  const inter=o.interligne||2;
  const aides=o.aides||{};
  const actif=!!(o.avecAides && LC && Object.keys(aides).some(k=>aides[k]));
  const par={n:1};
  const police=o.police||'Verdana, Tahoma, sans-serif';
  /* Largeur mesurée pour de vrai (canvas), pas estimée : c'est ce qui faisait tenir
     7 mots par ligne au lieu de 11. Largeur utile = 180 mm − la colonne du compteur. */
  const LARGEUR=160;
  const mesure=(()=>{
    try{ const c=document.createElement('canvas').getContext('2d');
      // measureText rend des px : 1 px = 0,2646 mm (96 dpi). Convertir en pt donnait
      // des lignes un tiers trop courtes, d'où le blanc à droite.
      return (t,pt)=>{ c.font='400 '+(pt*96/72)+'px '+police; return c.measureText(t).width*0.2646; }; }
    catch(e){ return (t,pt)=>t.length*pt*0.3528*0.55; }
  })();
  const MOTS_MAX=16, MOTS_VISE=10, T_MIN=13;
  /* Comptage des mots : par défaut « l'ami » et « arc-en-ciel » comptent pour 1 mot.
     Deux options séparent l'un ou l'autre — le découpage des lignes suit le comptage. */
  const paras=(o.texte||'').trim().split(/\n+/).map(p=>{
    let t=p.trim();
    if(o.apostrophe) t=t.replace(/([’'])/g,'$1 ');
    if(o.trait) t=t.replace(/-/g,'- ');
    return t.split(/\s+/).filter(Boolean);
  });
  const decouper=t=>{
    const out=[];
    paras.forEach((mots,ip)=>{
      if(ip) out.push(null);
      let cour=[];
      mots.forEach(m=>{
        if(cour.length && (cour.length>=MOTS_MAX || mesure(cour.concat([m]).join(' '),t)>LARGEUR)){
          out.push(cour); cour=[];
        }
        cour.push(m);
      });
      if(cour.length) out.push(cour);
    });
    return out;
  };
  const impose=typeof o.taille==='number' && o.taille>0;
  let taille=impose?o.taille:20, brut=decouper(taille);
  while(!impose && taille>T_MIN){
    const pleines=brut.filter((l,i)=>l && brut[i+1]);   // lignes suivies : elles vont au bout
    const mini=pleines.length?Math.min.apply(null,pleines.map(l=>l.length)):MOTS_VISE;
    if(mini>=MOTS_VISE) break;
    taille--; brut=decouper(taille);
  }
  const lignes=[]; let cumul=0;
  brut.forEach(l=>{
    if(!l){ lignes.push({vide:true}); return; }
    cumul+=l.length;
    const t=l.join(' ').replace(/([’'-]) /g,'$1');   // recoller ce que le comptage a séparé
    lignes.push({n:cumul, html:actif?LC.texteHTML(t,Object.assign({},aides,{_par:par})):esc(t)});
  });
  // pagination : on remplit chaque A4 en hauteur réelle
  const hLigne=taille*inter*0.3528, hVide=taille*0.5*0.3528;
  const hPage1=228, hSuite=248;
  const pagesL=[]; const hauts=[]; let cour=[], h=0, prem=true;
  lignes.forEach(l=>{
    const dh=l.vide?hVide:hLigne;
    if(h+dh>(prem?hPage1:hSuite) && cour.length){ pagesL.push(cour); hauts.push(h); cour=[]; h=0; prem=false; }
    if(l.vide && !cour.length) return;   // pas de ligne vide en tête de page
    cour.push(l); h+=dh;
  });
  if(cour.length){ pagesL.push(cour); hauts.push(h); }
  if(!pagesL.length){ pagesL.push([]); hauts.push(0); }
  // en entraînement, le tableau des trois essais va en bas de la dernière page,
  // ou sur une page de plus s'il n'y tient pas
  const H_ESSAIS=46, H_BILAN=30;
  let pageEssais=-1;
  // le bilan (mots lus / mots du texte) va toujours en bas de la dernière page
  {
    const der=pagesL.length-1;
    const budget=(pagesL.length===1?hPage1:hSuite);
    const besoin=H_BILAN+(o.mode==='entrainement'?H_ESSAIS:0);
    if(hauts[der]+besoin>budget){ pagesL.push([]); hauts.push(0); }
  }
  if(o.mode==='entrainement') pageEssais=pagesL.length-1;
  // trois essais : une case par lecture, l'élève voit sa progression sur la même feuille
  const blocBilan=()=>'<div style="flex:0 0 auto;margin-top:6mm;display:flex;flex-direction:column;'
    +'align-items:flex-end;gap:3mm;font-family:'+police+';color:#14213d">'
    +'<div style="display:flex;align-items:center;gap:4mm">'
    +'<span style="font-size:11pt;font-weight:700">Nombre de mots lus correctement :</span>'
    +'<div style="display:flex;gap:3mm">'
    +[1,2,3].map(i=>'<div style="display:flex;flex-direction:column;align-items:center;gap:1mm">'
      +'<span style="width:20mm;height:9mm;border:0.4mm solid #14213d;border-radius:1mm"></span>'
      +'<span style="font-size:8pt;color:#8a91a3">essai '+i+'</span></div>').join('')
    +'</div></div>'
    +'<div style="display:flex;align-items:center;gap:4mm">'
    +'<span style="font-size:11pt;font-weight:700">Nombre de mots du texte :</span>'
    +'<span style="width:72mm;text-align:center;font-size:11pt;font-weight:700">'+cumul+'</span></div>'
    +'</div>';
  const blocEssais=()=>{
    const cell=(t,g)=>'<div style="flex:'+(g||1)+';border-left:0.3mm solid #c9cfd8;padding:2.5mm 3mm;'
      +'font-size:10pt;color:#14213d">'+t+'</div>';
    const ligne=(t,fond)=>'<div style="display:flex;background:'+fond+';border-top:0.3mm solid #c9cfd8">'
      +'<div style="flex:0 0 24mm;padding:2.5mm 3mm;font-size:10pt;font-weight:700;color:#14213d">'+t+'</div>'
      +cell('&nbsp;')+cell('&nbsp;')+cell('&nbsp;')+'</div>';
    return '<div style="flex:0 0 auto;margin-top:6mm;border:0.3mm solid #c9cfd8;border-radius:2mm;overflow:hidden">'
      +'<div style="display:flex;background:#14213d;color:#fff">'
      +'<div style="flex:0 0 24mm;padding:2.5mm 3mm;font-size:10pt;font-weight:700">Je relis</div>'
      +'<div style="flex:1;border-left:0.3mm solid #46536b;padding:2.5mm 3mm;font-size:10pt">Date</div>'
      +'<div style="flex:1;border-left:0.3mm solid #46536b;padding:2.5mm 3mm;font-size:10pt">Mots lus</div>'
      +'<div style="flex:1;border-left:0.3mm solid #46536b;padding:2.5mm 3mm;font-size:10pt">Erreurs</div></div>'
      +ligne('1<sup>er</sup> essai','#fff')+ligne('2<sup>e</sup> essai','#f6f8fb')+ligne('3<sup>e</sup> essai','#fff')
      +'</div>';
  };

  const rendu=ls=>ls.map(l=>l.vide
    ? '<div style="height:'+(taille*0.5)+'pt"></div>'
    : '<div style="display:flex;align-items:baseline;gap:5mm">'
      +'<span style="flex:1;min-width:0">'+l.html+'</span>'
      +'<span style="flex:0 0 14mm;text-align:right;font-family:'+police+';'
      +'font-size:9pt;font-weight:400;color:#9aa4b2">'+l.n+'</span></div>').join('');

  const suffixe=o.avecAides?'aidee':'nue';
  const pages=pagesL.map((ls,ip)=>{
    const entete = ip===0
      ? '<div style="flex:0 0 auto;display:flex;gap:6mm;font-size:11pt;color:#14213d">'
        +'<span style="flex:1;border-bottom:0.4mm solid #14213d;padding-bottom:1.5mm">Nom : '
        +'<b>'+esc(o.eleve||'')+'</b></span>'
        +'<span style="flex:0 0 55mm;border-bottom:0.4mm solid #14213d;padding-bottom:1.5mm">Date :</span></div>'
        +'<div style="flex:0 0 auto;margin-top:8mm;text-align:center;font-size:15pt;font-weight:700;'
        +'font-family:'+police+';color:#14213d">'+esc(o.titre||'')+'</div>'
      : '<div style="flex:0 0 auto;display:flex;align-items:baseline;gap:6mm;font-size:10pt;color:#9aa4b2;'
        +'border-bottom:0.3mm solid #dde2e9;padding-bottom:2mm">'
        +'<span style="font-weight:700;color:#14213d">'+esc(o.titre||'')+'</span>'
        +'<span style="flex:1"></span><span>'+esc(o.eleve||'')+'</span></div>';
    return {id:'fluence-'+suffixe+'-'+(ip+1), coll:'texte',
      nom:'Fluence '+(o.avecAides?'(aidée)':'(nue)')+(pagesL.length>1?' — page '+(ip+1):''),
      html:'<section class="page" data-screen-label="Fluence" style="position:relative;display:flex;'
        +'flex-direction:column;background:#fff;overflow:hidden;padding:14mm 15mm;box-sizing:border-box;'
        +'width:210mm;height:297mm;font-family:'+police+'">'
        +entete
        +'<div style="flex:1;min-height:0;margin-top:6mm;font-size:'+taille+'pt;font-weight:400;'
        +'line-height:'+inter+';color:#14213d;overflow:hidden">'+rendu(ls)+'</div>'
        +(ip===pageEssais?blocEssais():'')
        +(ip===pagesL.length-1?blocBilan():'')
        +'<div style="flex:0 0 auto;margin-top:4mm;font-size:9pt;color:#9aa4b2;display:flex;gap:6mm">'
        +'<span style="flex:1"></span>'
        +(pagesL.length>1?'<span>page '+(ip+1)+' / '+pagesL.length+'</span>':'')
        +'</div></section>'};
  });
  return {id:'fluence-'+suffixe, coll:'texte', nom:'Fluence '+(o.avecAides?'(aidée)':'(nue)'),
    html:pages[0].html, pages:pages, nbMots:cumul};
}

window.LECTURE_SONS={SONS, MAP, sonDe:c=>MAP[c]||null, contient, decouper,
  pagesSeance, pageTexte, pageFluence, ecarte,
  aPhoto:f=>PRESENTES.has(f),
  imageRepere:f=>'clean/mot-'+f+'.png'};
})();
