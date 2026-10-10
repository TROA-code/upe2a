// Voice Educ-AI Web Studio Application — Mode API Stream Éphémère
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const voiceSelect = document.getElementById('voice-select');
  const voiceChips = document.getElementById('voice-chips');
  const refreshVoicesBtn = document.getElementById('refresh-voices-btn');
  const textInput = document.getElementById('text-input');
  const charCount = document.getElementById('char-count');
  const clearTextBtn = document.getElementById('clear-text-btn');
  const generateBtn = document.getElementById('generate-btn');
  const instructInput = document.getElementById('instruct-input');
  const langSelect = document.getElementById('lang-select');
  
  const loadingCard = document.getElementById('loading-card');
  const loadingTimer = document.getElementById('loading-timer');
  const resultCard = document.getElementById('result-card');
  const resVoiceTag = document.getElementById('res-voice-tag');
  const resDuration = document.getElementById('res-duration');
  const resTextPreview = document.getElementById('res-text-preview');
  const directDownloadBtn = document.getElementById('direct-download-btn');

  // Player Elements
  const audioElement = document.getElementById('audio-element');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const waveform = document.getElementById('waveform');
  const currentTimeDisplay = document.getElementById('current-time');
  const totalTimeDisplay = document.getElementById('total-time');
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('progress-container');
  const speedBtn = document.getElementById('speed-btn');

  // History Elements
  const historySection = document.getElementById('history-section');
  const historyList = document.getElementById('history-list');

  // State
  let profiles = [];
  let timerInterval = null;
  let currentBlobUrl = null;
  const playbackSpeeds = [1.0, 1.25, 1.5, 2.0];
  let currentSpeedIndex = 0;
  const sessionAudios = []; // In-memory only (lost on page close / refresh)

  // Initialize
  loadVoices();

  // --- Voice Management ---
  async function loadVoices() {
    voiceSelect.innerHTML = '<option value="" disabled selected>Chargement des profils de voix...</option>';
    voiceChips.innerHTML = '';

    try {
      const res = await fetch('/api/profiles');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      profiles = await res.json();

      voiceSelect.innerHTML = '';
      if (!profiles || profiles.length === 0) {
        voiceSelect.innerHTML = '<option value="" disabled>Aucune voix disponible</option>';
        return;
      }

      profiles.forEach((profile, index) => {
        // Dropdown option
        const opt = document.createElement('option');
        opt.value = profile.id;
        const desc = profile.description ? ` (${profile.description})` : '';
        opt.textContent = `${profile.name} [${profile.language.toUpperCase()}]${desc}`;
        voiceSelect.appendChild(opt);

        // Visual Chip
        const chip = document.createElement('div');
        chip.className = `voice-chip ${index === 0 ? 'active' : ''}`;
        chip.dataset.id = profile.id;
        chip.innerHTML = `
          <div class="voice-chip-name">
            <span>${escapeHtml(profile.name)}</span>
            <span class="voice-chip-lang">${profile.language.toUpperCase()}</span>
          </div>
          <div class="voice-chip-desc">${escapeHtml(profile.description || 'Profil vocal')}</div>
        `;
        chip.addEventListener('click', () => selectVoice(profile.id));
        voiceChips.appendChild(chip);
      });

      // Select first voice by default
      if (profiles.length > 0) {
        selectVoice(profiles[0].id);
      }
    } catch (err) {
      console.error('Erreur chargement voix:', err);
      voiceSelect.innerHTML = '<option value="" disabled>Erreur de connexion à l\'API</option>';
      alert('Impossible de contacter l\'API voice.educ-ai.fr.');
    }
  }

  function selectVoice(profileId) {
    voiceSelect.value = profileId;
    document.querySelectorAll('.voice-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.id === profileId);
    });
    const profile = profiles.find(p => p.id === profileId);
    if (profile && profile.language) {
      langSelect.value = profile.language;
    }
  }

  voiceSelect.addEventListener('change', (e) => {
    selectVoice(e.target.value);
  });

  refreshVoicesBtn.addEventListener('click', () => {
    loadVoices();
  });

  // --- Text Input & Prompt Chips ---
  textInput.addEventListener('input', () => {
    charCount.textContent = textInput.value.length;
  });

  clearTextBtn.addEventListener('click', () => {
    textInput.value = '';
    charCount.textContent = '0';
    textInput.focus();
  });

  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      textInput.value = chip.dataset.prompt;
      charCount.textContent = textInput.value.length;
      textInput.focus();
    });
  });

  // --- Speech Generation in Stream Mode (Zero Server Storage) ---
  generateBtn.addEventListener('click', startStreamGeneration);

  async function startStreamGeneration() {
    const profileId = voiceSelect.value;
    const text = textInput.value.trim();

    if (!profileId) {
      alert('Veuillez choisir une voix.');
      return;
    }
    if (!text) {
      alert('Veuillez saisir un texte.');
      textInput.focus();
      return;
    }

    const profile = profiles.find(p => p.id === profileId) || { name: 'Voix' };

    setLoading(true);
    let seconds = 0;
    loadingTimer.textContent = `Synthèse directe en streaming (0s) — Rien n'est enregistré sur le serveur`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      seconds++;
      loadingTimer.textContent = `Synthèse directe en streaming (${seconds}s) — Rien n'est enregistré sur le serveur`;
    }, 1000);

    try {
      const payload = {
        profile_id: profileId,
        text: text,
        language: langSelect.value || 'fr',
        engine: 'qwen'
      };

      const instruct = instructInput.value.trim();
      if (instruct) {
        payload.instruct = instruct;
      }

      // We call /api/generate/stream directly:
      // Educ-AI generates and streams WAV directly WITHOUT saving to disk or history!
      const res = await fetch('/api/generate/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let errMessage = `Erreur HTTP ${res.status}`;
        try {
          const errJson = await res.json();
          if (errJson.detail) errMessage = errJson.detail;
        } catch (_) {}
        throw new Error(errMessage);
      }

      // Convert raw stream to binary Blob in memory
      const audioBlob = await res.blob();
      if (audioBlob.size === 0) {
        throw new Error('Le flux audio retourné est vide.');
      }

      setLoading(false);

      // Create temporary ephemeral Object URL in client RAM
      if (currentBlobUrl) {
        // previous audio can be cleaned if replaced, but we keep track in session array
      }
      currentBlobUrl = URL.createObjectURL(audioBlob);

      displayAudioResult(currentBlobUrl, profile.name, text, audioBlob.size);
    } catch (err) {
      console.error('Erreur génération streaming:', err);
      setLoading(false);
      alert(`Erreur de génération : ${err.message}`);
    }
  }

  function setLoading(isLoading) {
    generateBtn.disabled = isLoading;
    if (isLoading) {
      loadingCard.classList.remove('hidden');
      resultCard.classList.add('hidden');
    } else {
      loadingCard.classList.add('hidden');
      clearInterval(timerInterval);
    }
  }

  // --- Display Result & Audio Player ---
  function displayAudioResult(blobUrl, voiceName, text, sizeInBytes) {
    resVoiceTag.textContent = `Voix : ${voiceName}`;
    resTextPreview.textContent = `« ${text} »`;

    const sizeKb = (sizeInBytes / 1024).toFixed(0);
    const filename = `voix-${voiceName.toLowerCase()}-${Date.now().toString().slice(-6)}.wav`;

    // Direct download configuration (fetches directly from memory blob)
    directDownloadBtn.href = blobUrl;
    directDownloadBtn.setAttribute('download', filename);

    // Audio element setup
    audioElement.src = blobUrl;
    audioElement.playbackRate = playbackSpeeds[currentSpeedIndex];
    audioElement.load();

    audioElement.onloadedmetadata = () => {
      const dur = audioElement.duration;
      resDuration.textContent = dur ? `${dur.toFixed(1)}s (${sizeKb} Ko)` : `${sizeKb} Ko`;
    };

    audioElement.play().catch(() => {
      // Autoplay blocked by browser policy without user gesture
    });

    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Store in session (in-memory only, will be lost on page reload)
    addToSessionHistory({
      blobUrl: blobUrl,
      voiceName: voiceName,
      text: text,
      filename: filename,
      sizeKb: sizeKb,
      time: new Date().toLocaleTimeString()
    });
  }

  // --- Audio Player Controls ---
  playPauseBtn.addEventListener('click', togglePlay);

  function togglePlay() {
    if (audioElement.paused || audioElement.ended) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  audioElement.addEventListener('play', () => {
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    waveform.classList.add('playing');
  });

  audioElement.addEventListener('pause', () => {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    waveform.classList.remove('playing');
  });

  audioElement.addEventListener('ended', () => {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    waveform.classList.remove('playing');
    progressBar.style.width = '0%';
  });

  audioElement.addEventListener('timeupdate', () => {
    const current = audioElement.currentTime;
    const total = audioElement.duration || 0;
    currentTimeDisplay.textContent = formatTime(current);
    totalTimeDisplay.textContent = formatTime(total);

    if (total > 0) {
      const percent = (current / total) * 100;
      progressBar.style.width = `${percent}%`;
    }
  });

  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    if (audioElement.duration) {
      audioElement.currentTime = clickPos * audioElement.duration;
    }
  });

  speedBtn.addEventListener('click', () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % playbackSpeeds.length;
    const speed = playbackSpeeds[currentSpeedIndex];
    audioElement.playbackRate = speed;
    speedBtn.textContent = `${speed.toFixed(1)}x`;
  });

  function formatTime(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // --- Ephemeral Session History (Memory Only) ---
  function addToSessionHistory(item) {
    sessionAudios.unshift(item);
    renderSessionHistory();
  }

  function renderSessionHistory() {
    if (sessionAudios.length === 0) {
      historySection.classList.add('hidden');
      return;
    }
    historySection.classList.remove('hidden');
    historyList.innerHTML = '';

    sessionAudios.forEach((item) => {
      const el = document.createElement('div');
      el.className = 'history-item';
      el.innerHTML = `
        <div class="history-item-info">
          <div class="history-item-header">
            <span class="history-item-voice">${escapeHtml(item.voiceName)}</span>
            <span class="history-item-time">${item.time} &bull; ${item.sizeKb} Ko (En mémoire)</span>
          </div>
          <div class="history-item-text" title="${escapeHtml(item.text)}">${escapeHtml(item.text)}</div>
        </div>
        <div class="history-item-actions">
          <button class="history-icon-btn play-item-btn" title="Écouter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </button>
          <a href="${item.blobUrl}" download="${item.filename}" class="history-icon-btn" title="Télécharger le WAV">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      `;

      el.querySelector('.play-item-btn').addEventListener('click', () => {
        audioElement.src = item.blobUrl;
        audioElement.play();
        resVoiceTag.textContent = `Voix : ${item.voiceName}`;
        resTextPreview.textContent = `« ${item.text} »`;
        directDownloadBtn.href = item.blobUrl;
        directDownloadBtn.setAttribute('download', item.filename);
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });

      historyList.appendChild(el);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
