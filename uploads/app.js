/**
 * Moteur Linguistique & Application d'Aide à la Lecture / Écriture
 * Découpage phonémique et syllabique de haute précision pour la langue française
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. ÉTAT DE L'APPLICATION
  // =========================================================================
  const state = {
    text: "Bonjour a tous , je m'appel steeve et je suis cool",
    spacing: 'petit', // 'petit' | 'moyen' | 'grand'
    imageType: 'none',
    customImageUrl: null,
    aids: {
      etiquettes: false,
      couleurSyllabes: true,
      lettresMuettes: true,
      arcsSyllabes: false,
      motsReperes: false
    }
  };

  // Couleurs fondamentales pour les mots repères
  const COLOR_WORDS_MAP = {
    'rouge': '#ef4444', 'rouges': '#ef4444',
    'bleu': '#2563eb', 'bleue': '#2563eb', 'bleus': '#2563eb', 'bleues': '#2563eb',
    'vert': '#16a34a', 'verte': '#16a34a', 'verts': '#16a34a', 'vertes': '#16a34a',
    'jaune': '#eab308', 'jaunes': '#eab308',
    'noir': '#0f172a', 'noire': '#0f172a', 'noirs': '#0f172a', 'noires': '#0f172a',
    'blanc': '#ffffff', 'blanche': '#ffffff', 'blancs': '#ffffff', 'blanches': '#ffffff',
    'orange': '#ea580c', 'oranges': '#ea580c',
    'rose': '#ec4899', 'roses': '#ec4899',
    'violet': '#9333ea', 'violette': '#9333ea', 'violets': '#9333ea', 'violettes': '#9333ea',
    'marron': '#78350f', 'marrons': '#78350f',
    'gris': '#64748b', 'grise': '#64748b', 'grises': '#64748b'
  };

  // =========================================================================
  // 2. ÉLÉMENTS DU DOM
  // =========================================================================
  const textInput = document.getElementById('text-input');
  const lineSpacingControl = document.getElementById('line-spacing-control');
  const segmentBtns = lineSpacingControl.querySelectorAll('.segment-btn');
  
  const radioNoImage = document.getElementById('radio-no-image');
  const radioCustomImage = document.getElementById('radio-custom-image');
  const imageFileInput = document.getElementById('image-file-input');
  const sheetImageContainer = document.getElementById('sheet-image-container');
  const sheetImagePreview = document.getElementById('sheet-image-preview');

  const openAidsModalBtn = document.getElementById('open-aids-modal-btn');
  const aidsStatusSummary = document.getElementById('aids-status-summary');
  const aidsModal = document.getElementById('aids-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');

  const aidCheckboxEtiquettes = document.getElementById('aid-etiquettes');
  const aidCheckboxCouleurSyllabes = document.getElementById('aid-couleur-syllabes');
  const aidCheckboxLettresMuettes = document.getElementById('aid-lettres-muettes');
  const aidCheckboxArcsSyllabes = document.getElementById('aid-arcs-syllabes');
  const aidCheckboxMotsReperes = document.getElementById('aid-mots-reperes');

  const writingSheet = document.getElementById('writing-sheet');
  const sheetTextRendered = document.getElementById('sheet-text-rendered');
  const seyesLinesContainer = document.getElementById('seyes-lines-container');

  const btnPrint = document.getElementById('btn-print');
  const btnSave = document.getElementById('btn-save');
  const btnStar = document.getElementById('btn-star');

  // =========================================================================
  // 3. MOTEUR PHONÉMIQUE & SYLLABIQUE DU FRANÇAIS (RÈGLES LIRECOULEUR)
  // =========================================================================

  // Mots où la consonne finale se prononce obligatoirement
  const PRONOUNCED_FINAL_CONSONANTS = new Set([
    'tous', 'bus', 'os', 'mars', 'ours', 'plus', 'sens', 'lis', 'vis', 'fils',
    'direct', 'correct', 'contact', 'exact', 'test', 'toast', 'ouest', 'est', 'brest', 'zest',
    'sept', 'huit', 'net', 'internet', 'brut', 'dot', 'fret', 'kit', 'scout', 'but',
    'cap', 'slip', 'stop', 'top', 'cool', 'sud', 'gaz', 'golf', 'cerf', 'clef', 'chef',
    'six', 'dix', 'coq', 'sac', 'lac', 'sec', 'choc', 'parc', 'duc', 'bac', 'roc', 'flic',
    'zinc', 'donc', 'avec', 'public'
  ]);

  // Mots grammaticaux ou cas spécifiques
  const GRAMMATICAL_WORDS_MAP = {
    'et': [{ text: 'et', isMute: false, isVowel: true }],
    'steeve': [{ text: 'steeve', isMute: false, isVowel: true }],
    'steve': [{ text: 'steve', isMute: false, isVowel: true }],
    'cool': [{ text: 'cool', isMute: false, isVowel: true }]
  };

  /**
   * Analyse un mot pour en extraire les graphèmes et les lettres muettes
   */
  function analyzeWordGraphemes(word) {
    const clean = word.toLowerCase();
    
    // Cas particuliers directs
    if (GRAMMATICAL_WORDS_MAP[clean]) {
      return GRAMMATICAL_WORDS_MAP[clean].map(g => ({
        text: word,
        isMute: g.isMute,
        isVowel: g.isVowel
      }));
    }

    const graphemes = [];
    let i = 0;
    const len = word.length;

    while (i < len) {
      const rest = clean.slice(i);
      const originalRest = word.slice(i);

      // Digraphes / trigraphes
      if (rest.startsWith('eaux') || rest.startsWith('eaus')) {
        graphemes.push({ text: originalRest.slice(0, 3), isMute: false, isVowel: true });
        graphemes.push({ text: originalRest.slice(3, 4), isMute: true, isVowel: false });
        i += 4;
      } else if (rest.startsWith('eau')) {
        graphemes.push({ text: originalRest.slice(0, 3), isMute: false, isVowel: true });
        i += 3;
      } else if (rest.startsWith('aux')) {
        graphemes.push({ text: originalRest.slice(0, 2), isMute: false, isVowel: true });
        graphemes.push({ text: originalRest.slice(2, 3), isMute: true, isVowel: false });
        i += 3;
      } else if (rest.startsWith('oin') || rest.startsWith('ain') || rest.startsWith('ein')) {
        graphemes.push({ text: originalRest.slice(0, 3), isMute: false, isVowel: true });
        i += 3;
      } else if (rest.startsWith('ou') || rest.startsWith('au') || rest.startsWith('ai') || 
                 rest.startsWith('ei') || rest.startsWith('oi') || rest.startsWith('eu') || 
                 rest.startsWith('œu') || rest.startsWith('an') || rest.startsWith('en') || 
                 rest.startsWith('in') || rest.startsWith('on') || rest.startsWith('un') ||
                 rest.startsWith('oo') || rest.startsWith('ee') || rest.startsWith('ea') ||
                 rest.startsWith('ui')) {
        
        // Vérifier si nasal suivi d'une voyelle
        const isNasal = (rest.startsWith('an') || rest.startsWith('en') || rest.startsWith('in') || rest.startsWith('on') || rest.startsWith('un'));
        const nextChar = rest[2];
        const followedByVowel = nextChar && /[aeiouyàâäéèêëîïôöùûü]/.test(nextChar);

        if (isNasal && followedByVowel) {
          graphemes.push({ text: originalRest.slice(0, 1), isMute: false, isVowel: true });
          i += 1;
        } else {
          graphemes.push({ text: originalRest.slice(0, 2), isMute: false, isVowel: true });
          i += 2;
        }
      } else if (rest.startsWith('ch') || rest.startsWith('ph') || rest.startsWith('gn') || 
                 rest.startsWith('th') || rest.startsWith('qu') || rest.startsWith('gu')) {
        graphemes.push({ text: originalRest.slice(0, 2), isMute: false, isVowel: false });
        i += 2;
      } else {
        const char = originalRest[0];
        const isVowelChar = /[aeiouyàâäéèêëîïôöùûü]/.test(char.toLowerCase());
        graphemes.push({ text: char, isMute: false, isVowel: isVowelChar });
        i += 1;
      }
    }

    // Détection des lettres muettes en fin de mot
    if (!PRONOUNCED_FINAL_CONSONANTS.has(clean) && graphemes.length > 0) {
      if (clean.length >= 4 && clean.endsWith('ent') && !['vent', 'cent', 'dent', 'lent', 'gent', 'serpent', 'moment', 'patient', 'souvent'].includes(clean)) {
        for (let idx = graphemes.length - 1; idx >= 0; idx--) {
          const g = graphemes[idx];
          if (['nt', 't', 'n', 'e'].includes(g.text.toLowerCase())) {
            g.isMute = true;
          }
        }
      } else {
        const last = graphemes[graphemes.length - 1];
        const lastClean = last.text.toLowerCase();
        
        if (!last.isVowel) {
          if (['d', 's', 't', 'p', 'x', 'z', 'g', 'b'].includes(lastClean)) {
            last.isMute = true;
            if (graphemes.length >= 2) {
              const prev = graphemes[graphemes.length - 2];
              if (['p', 'g', 'd', 't'].includes(prev.text.toLowerCase())) {
                prev.isMute = true;
              }
            }
          }
        } else if (lastClean === 'e' && clean.length > 2) {
          const isMonosyllable = ['le', 'de', 'me', 'te', 'se', 'ce', 'ne', 'je', 'que'].includes(clean);
          if (!isMonosyllable) {
            last.isMute = true;
          }
        }
      }
    }

    return graphemes;
  }

  /**
   * Découpe un mot en syllabes
   */
  function splitWordIntoSyllables(word) {
    if (!word || word.length === 0) return [];
    
    // Mots avec élision (ex: m'appel, l'arbre)
    const apoIdx = word.indexOf("'") !== -1 ? word.indexOf("'") : word.indexOf("’");
    if (apoIdx !== -1 && apoIdx < word.length - 1) {
      const prefix = word.slice(0, apoIdx + 1);
      const root = word.slice(apoIdx + 1);
      const rootSyllables = splitWordIntoSyllables(root);
      if (rootSyllables.length > 0) {
        rootSyllables[0].graphemes.unshift({ text: prefix, isMute: false, isVowel: false });
        return rootSyllables;
      }
    }

    const graphemes = analyzeWordGraphemes(word);
    
    const vowelIndices = [];
    graphemes.forEach((g, idx) => {
      if (g.isVowel) vowelIndices.push(idx);
    });

    if (vowelIndices.length <= 1) {
      return [{ graphemes: graphemes }];
    }

    const syllables = [];
    let startIdx = 0;

    for (let v = 0; v < vowelIndices.length - 1; v++) {
      const currentVowelIdx = vowelIndices[v];
      const nextVowelIdx = vowelIndices[v + 1];
      const consonantsBetween = nextVowelIdx - currentVowelIdx - 1;

      let splitAt = currentVowelIdx + 1;

      if (consonantsBetween === 0) {
        splitAt = nextVowelIdx;
      } else if (consonantsBetween === 1) {
        splitAt = currentVowelIdx + 1;
      } else if (consonantsBetween === 2) {
        const c1 = graphemes[currentVowelIdx + 1].text.toLowerCase();
        const c2 = graphemes[currentVowelIdx + 2].text.toLowerCase();
        const cluster = c1 + c2;

        const inseparable = [
          'bl', 'cl', 'fl', 'gl', 'pl',
          'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr', 'vr',
          'ch', 'gn', 'ph', 'th', 'qu', 'gu'
        ];

        if (inseparable.includes(cluster)) {
          splitAt = currentVowelIdx + 1;
        } else {
          splitAt = currentVowelIdx + 2;
        }
      } else {
        splitAt = currentVowelIdx + 2;
      }

      syllables.push({ graphemes: graphemes.slice(startIdx, splitAt) });
      startIdx = splitAt;
    }

    syllables.push({ graphemes: graphemes.slice(startIdx) });
    return syllables;
  }

  // =========================================================================
  // 4. RENDU VISUEL SUR LA FEUILLE D'ÉCRITURE
  // =========================================================================

  /**
   * Construit le DOM pour une syllabe avec les aides activées
   */
  function createSyllableElement(syllable, colorClass, aids) {
    const sylWrapper = document.createElement('span');
    sylWrapper.className = 'syllable-span';
    
    if (aids.couleurSyllabes && colorClass) {
      sylWrapper.classList.add(colorClass);
    }

    // Conteneur horizontal pour les caractères de la syllabe
    const charsContainer = document.createElement('span');
    charsContainer.className = 'syllable-chars';

    syllable.graphemes.forEach(g => {
      const gSpan = document.createElement('span');
      gSpan.textContent = g.text;
      if (aids.lettresMuettes && g.isMute) {
        gSpan.className = 'mute-char';
      }
      charsContainer.appendChild(gSpan);
    });

    sylWrapper.appendChild(charsContainer);

    // Arc SVG sous la syllabe si activé
    if (aids.arcsSyllabes) {
      const arcSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arcSvg.setAttribute('class', 'syllable-arc-curve');
      arcSvg.setAttribute('viewBox', '0 0 100 14');
      arcSvg.setAttribute('preserveAspectRatio', 'none');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M 3,2 Q 50,15 97,2');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#334155');
      path.setAttribute('stroke-width', '2.8');
      path.setAttribute('stroke-linecap', 'round');

      arcSvg.appendChild(path);
      sylWrapper.appendChild(arcSvg);
    }

    return sylWrapper;
  }

  /**
   * Rendu complet du texte
   */
  function renderDocument() {
    sheetTextRendered.innerHTML = '';
    const rawText = state.text.trim();

    if (!rawText) {
      sheetTextRendered.innerHTML = '<span class="empty-placeholder">(aucun texte saisi)</span>';
      renderSeyesLines(14);
      return;
    }

    const tokens = rawText.split(/([ \t\n\r]+|[.,!?;:«»"()])/g).filter(t => t.length > 0);

    let syllableCounter = 0; // Alternance des 2 couleurs (bleu/rouge)

    tokens.forEach(token => {
      if (/^\s+$/.test(token)) {
        const space = document.createElement('span');
        space.className = 'text-space';
        space.innerHTML = '&nbsp;';
        sheetTextRendered.appendChild(space);
        return;
      }

      if (/^[.,!?;:«»"()]$/.test(token)) {
        const punct = document.createElement('span');
        punct.className = 'text-punctuation';
        punct.textContent = token;
        sheetTextRendered.appendChild(punct);
        return;
      }

      const cleanWord = token.toLowerCase();
      const syllables = splitWordIntoSyllables(token);

      const wordContainer = document.createElement('span');
      wordContainer.className = 'word-tag-item';

      // Mot repère
      if (state.aids.motsReperes && COLOR_WORDS_MAP[cleanWord]) {
        const swatchColor = COLOR_WORDS_MAP[cleanWord];
        const cueBadge = document.createElement('div');
        cueBadge.className = 'mot-repere-swatch';
        cueBadge.style.backgroundColor = swatchColor;
        if (swatchColor === '#ffffff') {
          cueBadge.style.border = '1px solid #94a3b8';
        }
        wordContainer.appendChild(cueBadge);
      }

      const wordBox = document.createElement('span');
      wordBox.className = 'word-inner-box';

      syllables.forEach(syllable => {
        const colorClass = (syllableCounter % 2 === 0) ? 'lc-blue' : 'lc-red';
        const sylElem = createSyllableElement(syllable, colorClass, state.aids);
        wordBox.appendChild(sylElem);
        syllableCounter++;
      });

      wordContainer.appendChild(wordBox);
      sheetTextRendered.appendChild(wordContainer);
    });

    writingSheet.classList.toggle('has-etiquettes', state.aids.etiquettes);
    writingSheet.classList.toggle('has-arcs', state.aids.arcsSyllabes);
    writingSheet.classList.toggle('has-reperes', state.aids.motsReperes);

    renderSeyesLines(14);
  }

  /**
   * Génère les lignes de cahier Seyès
   */
  function renderSeyesLines(count = 14) {
    seyesLinesContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const block = document.createElement('div');
      block.className = 'seyes-line-block';

      for (let j = 0; j < 3; j++) {
        const inter = document.createElement('div');
        inter.className = 'seyes-line interline';
        block.appendChild(inter);
      }

      const base = document.createElement('div');
      base.className = 'seyes-line baseline';
      block.appendChild(base);

      seyesLinesContainer.appendChild(block);
    }
  }

  /**
   * Met à jour le résumé des badges d'aides
   */
  function updateAidsStatusSummary() {
    const activeList = [];
    if (state.aids.etiquettes) activeList.push('Étiquettes');
    if (state.aids.couleurSyllabes) activeList.push('Couleurs');
    if (state.aids.lettresMuettes) activeList.push('Lettres muettes');
    if (state.aids.arcsSyllabes) activeList.push('Arcs');
    if (state.aids.motsReperes) activeList.push('Mots repères');

    if (activeList.length === 0) {
      aidsStatusSummary.textContent = 'aucune aide';
    } else {
      aidsStatusSummary.innerHTML = activeList.map(a => `<span class="active-aid-pill">${a}</span>`).join(' ');
    }
  }

  // =========================================================================
  // 5. GESTION DES ÉVÉNEMENTS
  // =========================================================================

  textInput.addEventListener('input', (e) => {
    state.text = e.target.value;
    renderDocument();
  });

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const spacing = btn.dataset.spacing;
      state.spacing = spacing;

      writingSheet.classList.remove('spacing-petit', 'spacing-moyen', 'spacing-grand');
      writingSheet.classList.add(`spacing-${spacing}`);
      
      renderDocument();
    });
  });

  radioNoImage.addEventListener('change', () => {
    if (radioNoImage.checked) {
      state.imageType = 'none';
      sheetImageContainer.style.display = 'none';
      sheetImagePreview.src = '';
    }
  });

  radioCustomImage.addEventListener('change', () => {
    if (radioCustomImage.checked) {
      imageFileInput.click();
    }
  });

  imageFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        state.customImageUrl = event.target.result;
        state.imageType = 'custom';
        sheetImagePreview.src = state.customImageUrl;
        sheetImageContainer.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    } else {
      radioNoImage.checked = true;
      state.imageType = 'none';
      sheetImageContainer.style.display = 'none';
    }
  });

  openAidsModalBtn.addEventListener('click', () => {
    aidCheckboxEtiquettes.checked = state.aids.etiquettes;
    aidCheckboxCouleurSyllabes.checked = state.aids.couleurSyllabes;
    aidCheckboxLettresMuettes.checked = state.aids.lettresMuettes;
    aidCheckboxArcsSyllabes.checked = state.aids.arcsSyllabes;
    aidCheckboxMotsReperes.checked = state.aids.motsReperes;

    aidsModal.style.display = 'flex';
  });

  function closeModal() {
    aidsModal.style.display = 'none';
  }

  modalCloseBtn.addEventListener('click', closeModal);

  aidsModal.addEventListener('click', (e) => {
    if (e.target === aidsModal) {
      closeModal();
    }
  });

  document.querySelectorAll('.aid-option-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') {
        const checkbox = card.querySelector('.aid-checkbox');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      }
    });
  });

  modalSubmitBtn.addEventListener('click', () => {
    state.aids.etiquettes = aidCheckboxEtiquettes.checked;
    state.aids.couleurSyllabes = aidCheckboxCouleurSyllabes.checked;
    state.aids.lettresMuettes = aidCheckboxLettresMuettes.checked;
    state.aids.arcsSyllabes = aidCheckboxArcsSyllabes.checked;
    state.aids.motsReperes = aidCheckboxMotsReperes.checked;

    updateAidsStatusSummary();
    renderDocument();
    closeModal();
  });

  btnPrint.addEventListener('click', () => {
    window.print();
  });

  btnSave.addEventListener('click', () => {
    const exportData = {
      text: state.text,
      spacing: state.spacing,
      aids: state.aids,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fiche-ecriture-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  btnStar.addEventListener('click', () => {
    btnStar.classList.toggle('active');
  });

  updateAidsStatusSummary();
  renderDocument();
});
