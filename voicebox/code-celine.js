// À COLLER dans la console de la page voicebox (F12 → Console), puis Entrée.
// Fabrique les 25 mots repères + les 26 noms de lettres avec la voix de Céline,
// et télécharge chaque son avec le bon nom (mot-ananas.wav, lettre-b.wav…).
(async () => {
  const MOTS = [['ananas','ananas'],['ballon','ballon'],['carotte','carotte'],['deux','deux'],['je','je'],['fenetre','fenêtre'],['gateau','gâteau'],
    ['immeuble','immeuble'],['jaune','jaune'],['kiwi','kiwi'],['lit','lit'],['moto','moto'],['nuage','nuage'],['ordinateur','ordinateur'],['pied','pied'],
    ['quatre','quatre'],['robot','robot'],['salade','salade'],['table','table'],['usine','usine'],['velo','vélo'],['wagon','wagon'],
    ['xylophone','xylophone'],['pyjama','pyjama'],['zero','zéro']].map(([f, t]) => ['mot-' + f, t]);
  const NOMS = ['a','bé','cé','dé','e','èfe','gé','hache','i','ji','ka','èle','ème','ène','o','pé','ku','ère','èsse','té','u','vé','double vé','iksse','i grec','zède'];
  const LETTRES = 'abcdefghijklmnopqrstuvwxyz'.split('').map((l, i) => ['lettre-' + l, NOMS[i]]);
  const TOUT = MOTS.concat(LETTRES);
  const b = location.origin, pause = ms => new Promise(r => setTimeout(r, ms));
  const pr = await (await fetch(b + '/profiles')).json();
  const voix = (Array.isArray(pr) ? pr : (pr.profiles || pr.items || []));
  const celine = voix.find(v => (v.name || '').toLowerCase().includes('celine') || (v.name || '').toLowerCase().includes('céline'));
  if (!celine) { console.log('Céline introuvable. Voix :', voix.map(v => v.name)); return; }
  for (const [nom, texte] of TOUT) {
    try {
      const r = await fetch(b + '/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_id: celine.id, text: texte, language: 'fr', seed: 42, normalize: true }) });
      let g = await r.json();
      for (let k = 0; k < 120 && g.status !== 'completed'; k++) {
        if (g.status === 'failed' || g.status === 'error') throw new Error(g.error || 'échec');
        await pause(1500);
        for (const u of ['/generate/' + g.id, '/history/' + g.id]) { try { const x = await fetch(b + u); if (x.ok) { g = await x.json(); break; } } catch (e) {} }
      }
      let bl = null;
      for (const u of ['/audio/' + g.id, '/history/' + g.id + '/audio', '/generations/' + g.id + '/audio']) {
        try { const x = await fetch(b + u); if (x.ok) { const y = await x.blob(); if (y.size > 500) { bl = y; break; } } } catch (e) {}
      }
      if (!bl) throw new Error('son introuvable');
      const a = document.createElement('a'); a.href = URL.createObjectURL(bl); a.download = nom + '.wav'; document.body.appendChild(a); a.click(); a.remove();
      console.log('✓', nom, '—', texte);
      await pause(400);
    } catch (e) { console.log('✗', nom, e.message); }
  }
  console.log('FINI :', TOUT.length, 'sons.');
})();
