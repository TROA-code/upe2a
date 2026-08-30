/* Moteur d'aide au décodage — UPE2A NSA
   Analyse un mot : graphies complexes, syllabes, lettres muettes.
   Table des mots repères : affichage classe (Retz, Boîte à outils pour l'apprentissage du code).
   Logique écrite pour ce projet — aucun code externe. */
(function(){

// ── Mots repères : [graphie, mot, fichier image] dans l'ordre de l'affichage classe
const REPERES=[
 ['ou','rouge','rouge'],['é','épée','epee'],['au','jaune','jaune'],['ai','lait','lait'],
 ['on','bonbon','bonbon'],['an','banc','banc'],['in','lapin','lapin'],['oi','oiseau','oiseau'],
 ['ch','chat','chat'],['er','cahier','cahier'],['eau','chapeau','chapeau'],['è','règle','regle'],
 ['ion','lion','lion'],['en','cent','cent'],['ain','main','main'],['oin','point','point'],
 ['ph','phoque','phoque'],['ez','nez','nez'],['ette','lunettes','lunettes'],['ê','tête','tete'],
 ['or','tortue','tortue'],['eu','bleu','bleu'],['ein','ceinture','ceinture'],['ui','huit','huit'],
 ['qu','quatre','quatre'],['et','bonnet','bonnet'],['elle','pelle','pelle'],['ei','reine','reine'],
 ['eur','fleur','fleur'],['euille','feuille','feuille'],['ien','chien','chien'],['ill','fille','fille'],
 ['gu','guitare','guitare'],['gn','peigne','peigne'],['erre','terre','terre'],['er','vert','vert'],
 ['es','escargot','escargot'],['aille','médaille','medaille'],['ouille','citrouille','citrouille'],
 ['eille','abeille','abeille'],
 ['em','embrasser','embrasser'],['am','jambe','jambe'],['y','yaourt','yaourt'],['ç','garçon','garcon'],
 ['ss','tasse','tasse'],['t','addition','addition'],['œu','nœud','noeud'],['esse','princesse','princesse'],
 ['ge','pigeon','pigeon'],['om','pompier','pompier'],['œu','œuf','oeuf'],['im','timbre','timbre']
];

const COUL_A='#1d4e89', COUL_B='#cc2222', COUL_MUET='#9aa4b2';
// photos présentes dans clean/ : les autres graphies restent colorées, sans vignette
const PHOTOS=new Set(['rouge','epee','jaune','lait','bonbon','banc','oiseau','chat','cahier','regle',
 'main','phoque','nez','lunettes','bleu','quatre','fleur','feuille','fille','vert','jambe','yaourt',
 'garcon','oeuf']);

// graphies triées du plus long au plus court : « eille » doit gagner sur « ei »
// graphies qui ne sont pas des mots repères mais qui doivent rester d'un bloc
const EXTRA=['th','aî','oî','aill','eill','ouill','euill'];
const GRAPHIES=[...new Set(REPERES.map(r=>r[0]).concat(EXTRA))].sort((a,b)=>b.length-a.length);
const repereDe=g=>REPERES.filter(r=>r[0]===g);
const DISPO=new Set(REPERES.filter(r=>PHOTOS.has(r[2])).map(r=>r[0]));

const VOY='aàâäeéèêëiîïoôöuùûüyœ';
const estVoy=c=>VOY.indexOf(c)>=0;
// groupes consonantiques qui ne se coupent pas
const INSEP=['bl','br','ch','cl','cr','dr','fl','fr','gl','gn','gr','ph','pl','pr','th','tr','vr'];

const NASALES=['an','en','in','on','un','am','em','im','om','ain','ein','oin','ien','ion'];

// ── Découpage en graphèmes : voyelles complexes, digraphes, puis lettres simples
function graphemes(mot){
  const m=mot.toLowerCase(), out=[];
  let i=0;
  while(i<m.length){
    let pris=null;
    for(const g of GRAPHIES){
      if(g.length<2) continue;               // les graphies d'une lettre ne segmentent pas
      if(m.substr(i,g.length)!==g) continue;
      if(NASALES.indexOf(g)>=0){            // nasale seulement si suivie d'une consonne autre que n/m
        const ap=m[i+g.length];
        if(ap && (estVoy(ap) || ap==='n' || ap==='m')) continue;   // canard, gomme, année
      }
      const fin=i+g.length>=m.length;
      if((g==='et'||g==='ez') && !fin) continue;                   // petit n'est pas p-et-it
      if(g==='er' && !fin && estVoy(m[i+2])) continue;             // cerise n'est pas c-er-ise
      if(g==='es' && !(i===0 && m.length>3 && m[2] && !estVoy(m[2]))) continue;   // escargot, pas est
      pris=g; break;
    }
    if(pris){ out.push({t:pris, i, complexe:true}); i+=pris.length; }
    else { out.push({t:m[i], i, complexe:false}); i++; }
  }
  return out;
}

// ── Le « er » a deux repères : cahier (final) / vert (suivi d'une consonne)
function choixRepere(g, mot, pos){
  const l=repereDe(g).filter(r=>PHOTOS.has(r[2]));
  if(!l.length) return null;
  if(l.length===1) return l[0];
  if(g==='er'){
    const fin=pos+2>=mot.length;
    return fin ? (l.find(r=>r[1]==='cahier')||l[0]) : (l.find(r=>r[1]==='vert')||l[0]);
  }
  return l[0];
}

// ── Mots dont la consonne finale se prononce : elle ne doit pas être grisée
const FINALE_SONNE=new Set(['bus','mars','os','ours','tous','plus','sens','fils','lis','vis',
 'sud','gaz','golf','cerf','chef','clef','coq','sac','lac','sec','choc','parc','bac','roc','duc',
 'flic','zinc','donc','avec','public','stop','cap','slip','top','cool','net','internet','brut',
 'but','kit','scout','test','ouest','est','toast','direct','correct','exact','contact','six','dix',
 'huit','août','bref','neuf','sept','tarif','actif','sportif','maïs','mépris','tennis','virus',
 'campus','couscous','autobus','index','sms','fax']);

// ── Lettres muettes : finales, -ent verbal, et muettes internes. Le e final reste normal.
function muettes(mot){
  const m=mot.toLowerCase(), n=m.length, out=new Set();
  if(n<3) return out;
  const der=m[n-1];
  if(m==='sept'){ out.add(2); return out; }            // sep(t) : le p est muet, le t se dit
  if(/[dtsxzpg]/.test(der) && !FINALE_SONNE.has(m) && !/ed$/.test(m)) out.add(n-1);   // canard, petit, les chiens
  if(der==='c' && m[n-2]==='n' && !FINALE_SONNE.has(m)) out.add(n-1);  // blanc, franc, banc, tronc
  // le « ed » final se lit [e] : pied, trépied — le d reste noir
  // le e final n'est grisé que s'il suit une voyelle : phar-ma-ci(e), la vi(e) — pas pomme, table
  if(der==='e' && n>=3 && estVoy(m[n-2])) out.add(n-1);
  if(/ent$/.test(m) && n>=5){ out.add(n-3); out.add(n-2); }  // ils mangent
  // h toujours muet, sauf dans ch, ph, th, sh qui sont des graphies
  for(let i=0;i<n;i++){
    if(m[i]!=='h') continue;
    if(i>0 && 'cpst'.indexOf(m[i-1])>=0) continue;   // chat, phoque, mathématiques, schéma
    out.add(i);
  }
  if(/ou[pt]$/.test(m)) out.add(n-1);                  // beaucoup, loup
  if(/ng$/.test(m)) out.add(n-1);                      // long
  return out;
}

// ── Syllabes : coupe après la voyelle, sauf groupe insécable ou voyelle isolée
function syllabes(grIn){
  // règle validée : la consonne double ne se coupe jamais, elle attaque la syllabe
  // suivante — chau-ssu-re, cla-sseur, go-mme, pou-be-lle, pro-fe-sseur, fi-lle
  // les graphies-repères qui contiennent une double consonne se rouvrent ici :
  // pou-be-lle, te-rre, chau-sse-tte, pro-fe-sseur, fi-lle
  const ROUVRE={elle:['e','ll','e'],erre:['e','rr','e'],ette:['e','tt','e'],esse:['e','ss','e'],
                ill:['i','ll'],ge:['g','e'],
                aill:['a','ill'],eill:['e','ill'],ouill:['ou','ill'],euill:['eu','ill'],
                aille:['a','ille'],ouille:['ou','ille'],eille:['e','ille'],euille:['eu','ille'],
                ion:['i','on'],ien:['i','en']};
  const plat=[];
  grIn.forEach(g=>{
    const d=ROUVRE[g.t.toLowerCase()];
    if(d){ let dec=0; d.forEach((p,n)=>{ plat.push({t:p,i:g.i+dec,ouvert:n===d.length-1}); dec+=p.length; }); }
    else plat.push(g);
  });
  // puis les consonnes doublées redeviennent un seul bloc : go-mme, ba-llon
  const gr=[];
  for(let k=0;k<plat.length;k++){
    const a=plat[k], b=plat[k+1];
    if(b && a.t.toLowerCase()==='ill' && estVoy(b.t[0])){
      gr.push({t:a.t+b.t,i:a.i}); k++;              // tra-va-illons, fa-mi-lle reste \u00e0 part
    } else if(b && a.t.length===1 && b.t.length===1 && a.t===b.t && !estVoy(a.t)){
      gr.push({t:a.t+b.t,i:a.i}); k++;
    } else if(b && a.ouvert && estVoy(a.t) && estVoy(b.t[0])){
      gr.push({t:a.t+b.t,i:a.i}); k++;              // pro-fe-sseur : le « e » de esse + « u »
    } else gr.push(a);
  }
  const noy=[];                                // indices des graphèmes-voyelles
  gr.forEach((g,k)=>{
    const t=g.t.toLowerCase();
    if(!estVoy(t[0])) return;
    if(t==='y' && k>0 && estVoy(gr[k-1].t.slice(-1))) return;      // cra-yon : y fait consonne
    if(t==='i' && gr[k+1] && estVoy(gr[k+1].t[0])){
      // le « i » prend sa syllabe devant une voyelle : li-on, pi-ed, chi-en, me-nui-si-er,
      // ca-hi-er — sauf devant le « e » final : phar-ma-cie
      const suivant=gr[k+1];
      if(suivant.t.toLowerCase()==='e' && k+2>=gr.length) return;
    }
    if((t==='u'||t==='ou') && gr[k+1] && estVoy(gr[k+1].t[0]) && gr[k+1].t.toLowerCase()!=='ille') return;  // l-ui, n-oui
    noy.push(k);
  });
  if(noy.length<=1) return [gr.map(g=>g.t).join('')];
  const coupes=[];
  for(let p=0;p<noy.length-1;p++){
    const a=noy[p], b=noy[p+1];
    const gap=[];
    for(let k=a+1;k<b;k++) gap.push(k);
    const cons=gap.filter(k=>!estVoy(gr[k].t[0]));
    if(!cons.length) coupes.push(gap.length?gap[0]:b);            // V-V, semi-voyelle avec la suite
    else if(cons.length===1) coupes.push(cons[0]);                // ca-hier, ba-teau
    else {
      // la consonne double compte pour sa dernière lettre : le-ttre, a-ppren-dre
      const pair=(gr[cons[0]].t.slice(-1)+gr[cons[1]].t[0]).toLowerCase();
      coupes.push(INSEP.indexOf(pair)>=0 ? cons[0] : cons[0]+1);  // ta-bleau / tor-tue
    }
  }
  const parts=[]; let deb=0;
  coupes.forEach(c=>{ if(c>deb){ parts.push(gr.slice(deb,c)); deb=c; } });
  parts.push(gr.slice(deb));
  const sorties=parts.filter(p=>p.length).map(p=>p.map(g=>g.t).join(''));
  // un « e » final seul ne fait pas syllabe : jour-née, i-dée
  if(sorties.length>1 && /^e[sz]?$/i.test(sorties[sorties.length-1]))
    sorties.splice(sorties.length-2,2,sorties[sorties.length-2]+sorties[sorties.length-1]);
  return sorties;
}

// ── Cas où la règle ne suffit pas : on préfère avertir plutôt qu'imprimer une erreur
function doutes(mot, forceCoupe){
  const m=(mot||'').toLowerCase(), d=[];
  if(forceCoupe) return d;
  if(/[^s]ent$/.test(m) && m.length>=5) d.push('le « ent » final : muet (ils mangent) ou prononcé (le ciment) ?');
  if(/ill/.test(m)) d.push('le « ill » : comme fille ou comme ville ?');
  if(/(us|is|as|os|ur|ir|ar|or|il|al|ul)$/.test(m)) d.push('la consonne finale : prononcée (un bus) ou muette (un puits) ?');
  if(/^(gu|gue)/.test(m)===false && /gu[ei]/.test(m)) d.push('le « gu » : un seul son (guitare) ou deux (aiguille) ?');
  if(/[éeè]e?s?$/.test(m)===false && /x$/.test(m)) d.push('le « x » final : muet (des ciseaux) ou prononcé (six) ?');
  if(m.length>12) d.push('mot long : vérifie le découpage.');
  return d;
}

// ── Analyse d'un mot. Tirets = coupe forcée. (lettre) = muette forcée.
function analyser(brut){
  const forceCoupe=/-/.test(brut);
  const forceMuet=[];
  let mot='', i=0;
  brut.split('').forEach(c=>{
    if(c==='('||c===')') return;
    mot+=c;
  });
  // positions marquées entre parenthèses dans le texte d'origine
  let p=0, dedans=false;
  brut.split('').forEach(c=>{
    if(c==='('){ dedans=true; return; }
    if(c===')'){ dedans=false; return; }
    if(dedans) forceMuet.push(p);
    p++;
  });
  const propre=mot.replace(/-/g,'');
  const gr=graphemes(propre.toLowerCase());
  const syl=forceCoupe ? mot.split('-').filter(Boolean) : syllabes(gr);
  const mu=muettes(propre.toLowerCase());
  forceMuet.forEach(k=>{ if(!forceCoupe) mu.add(k); });
  return {mot:propre, graphemes:gr, syllabes:syl, muettes:[...mu].sort((a,b)=>a-b),
    doutes:doutes(propre, forceCoupe)};
}

// ── Rendu HTML d'un mot selon les aides cochées
function motHTML(brut, opt){
  const o=opt||{}, a=analyser(brut);
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const mu=new Set(a.muettes);
  // alternance continue d'un mot au suivant (comme LireCouleur) : o._par porte la parité
  const base = o._par ? o._par.n : 0;
  // reconstitue les graphèmes syllabe par syllabe pour connaître la parité
  let pos=0, syl=0, reste=a.syllabes[0]?a.syllabes[0].length:0;
  const pieces=[];
  a.graphemes.forEach(g=>{
    if(reste<=0 && syl<a.syllabes.length-1){ syl++; reste=a.syllabes[syl].length; }
    // la couleur des syllabes grise toujours les muettes, comme LireCouleur
    const couleur = ((o.muettes||o.couleurSyllabes) && mu.has(g.i)) ? COUL_MUET
      : (o.couleurSyllabes ? ((base+syl)%2 ? COUL_B : COUL_A) : (o.muettes||o.repere ? '#14213d' : null));
    const rep = (o.repere && g.complexe && g.t.length>1 && g.i+g.t.length<=a.mot.length && DISPO.has(g.t) ) ? choixRepere(g.t, a.mot.toLowerCase(), g.i) : null;
    pieces.push({t:a.mot.substr(g.i,g.t.length), couleur, rep, syl});   // casse d'origine
    reste-=g.t.length; pos+=g.t.length;
  });
  if(o._par) o._par.n = base + a.syllabes.length;
  const lettres=pieces.map(p=>{
    const st=p.couleur?'color:'+p.couleur:'';
    const txt='<span style="'+st+'">'+esc(p.t)+'</span>';
    if(!p.rep) return txt;
    return '<span style="position:relative;display:inline-block">'+
      '<span style="position:absolute;left:50%;bottom:100%;transform:translateX(-50%);width:7mm;height:7mm;'+
      'background-image:url(\'clean/mot-'+p.rep[2]+'.png\');background-size:contain;background-repeat:no-repeat;'+
      'background-position:bottom center;display:block"></span>'+txt+'</span>';
  });
  // regroupement par syllabe : l'arc épouse exactement la largeur de sa syllabe
  const parSyl=[];
  pieces.forEach((p,k)=>{
    if(!parSyl.length || parSyl[parSyl.length-1].syl!==p.syl) parSyl.push({syl:p.syl, html:''});
    parSyl[parSyl.length-1].html+=lettres[k];
  });
  const aVignette=pieces.some(p=>p.rep);
  let html=o.arcs
    ? parSyl.map(s=>'<span style="display:inline-block;border-bottom:1.4px solid #6b7386;'+
        'border-radius:0 0 55% 55%;padding-bottom:0.6mm">'+s.html+'</span>').join(
        '<span style="display:inline-block;width:0.06em"></span>')
    : lettres.join('');
  if(aVignette) html='<span style="display:inline-block;padding-top:7.6mm">'+html+'</span>';
  if(o.etiquettes){
    html='<span style="display:inline-block;border:1.2px solid #b9c6d6;border-radius:1.5mm;padding:0.6mm 1.6mm;'+
      'background:#fff">'+html+'</span>';
  }
  return html;
}

// ── Rendu d'un texte entier (mots + ponctuation conservée)
function texteHTML(texte, opt){
  const o=Object.assign({}, opt||{});
  o._par=(opt&&opt._par)||{n:1};   // comme LireCouleur : la toute première syllabe est rouge
  // _par transmis : l'alternance continue d'un appel au suivant (fiche de fluence, ligne à ligne)
  return String(texte||'').split(/\n/).map(ligne=>{
    const bouts=ligne.split(/(\s+)/);
    return '<span style="display:inline-flex;flex-wrap:wrap;align-items:flex-end;gap:'+
      (o.etiquettes?'1.6mm 2mm':(o.arcs?'1mm 0.28em':'0 0.28em'))+'">'+
      bouts.filter(b=>b.trim()).map(b=>{
        const m=b.match(/^([«"'(]*)(.*?)([,.;:!?»"')…]*)$/);
        const av=m?m[1]:'', coeur=m?m[2]:b, ap=m?m[3]:'';
        if(!coeur) return '<span>'+av+ap+'</span>';
        return '<span style="display:inline-block">'+av+motHTML(coeur,o)+ap+'</span>';
      }).join('')+'</span>';
  }).join('<br />');
}

// ── Mots douteux d'un texte : [[mot, raison], …]
function doutesTexte(texte){
  const out=[];
  String(texte||'').split(/[\s]+/).forEach(b=>{
    const m=b.match(/^[«"'(]*(.*?)[,.;:!?»"')…]*$/);
    const mot=m?m[1]:b;
    if(!mot || mot.length<3) return;
    const a=analyser(mot);
    if(a.doutes.length) out.push([a.mot, a.syllabes.join('-'), a.doutes[0]]);
  });
  return out;
}

window.LECTURE_CODE={REPERES, GRAPHIES, COUL_A, COUL_B, COUL_MUET, analyser, motHTML, texteHTML, doutesTexte,
  imageDe:g=>{const r=repereDe(g)[0]; return r?'clean/mot-'+r[2]+'.png':'';}};
})();
