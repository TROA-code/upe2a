/**
 * DRIVEDESK - Logique applicative CRUD & Synchronisation Google Drive
 * Compatible exécution locale clé USB (file://) et Web classique.
 */

// ============================================================================
// ÉTAT DE L'APPLICATION (STATE)
// ============================================================================
const state = {
  items: [],
  filteredItems: [],
  settings: {
    apiUrl: "https://script.google.com/macros/s/AKfycbyY_BItgYNHNEdjvC640obZtsZMovl6hJI_ivRUInoGo6GxGctAwnChIfRh7rLQIt_r/exec",
    fileName: "drivedesk_data.json",
    lastSync: null
  },
  currentView: "cards", // 'cards' ou 'table'
  searchTerm: "",
  selectedCategory: "ALL",
  selectedStatus: "ALL",
  isSyncing: false
};

// Clés LocalStorage
const STORAGE_KEYS = {
  ITEMS: "drivedesk_items_v1",
  SETTINGS: "drivedesk_settings_v1",
  VIEW_MODE: "drivedesk_view_mode"
};

// ============================================================================
// INITIALISATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initEventListeners();
  renderApp();

  // Si une URL d'API est déjà configurée, lancer une synchronisation automatique
  if (state.settings.apiUrl) {
    syncWithGoogleDrive(false);
  }
});

// ============================================================================
// GESTION DU STOCKAGE LOCAL (LocalStorage)
// ============================================================================
function loadFromLocalStorage() {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
    }

    const savedView = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
    if (savedView) {
      state.currentView = savedView;
    }

    const savedItems = localStorage.getItem(STORAGE_KEYS.ITEMS);
    if (savedItems) {
      state.items = JSON.parse(savedItems);
    } else {
      // Données de démonstration lors du tout premier démarrage
      state.items = [
        {
          id: "demo-1",
          title: "Bienvenue sur DriveDesk",
          category: "Guide",
          status: "Actif",
          content: "Cette application fonctionne depuis une clé USB ou un navigateur.\nPour synchroniser vos données avec un dossier Google Drive, cliquez sur l'icône d'engrenage (Paramètres) en haut à droite.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "demo-2",
          title: "Exemple de données CRUD",
          category: "Projet",
          status: "En cours",
          content: "Titre, catégories, statuts, notes textuelles ou données JSON/CSV peuvent être créés, modifiés et supprimés facilement.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      saveItemsToLocalStorage();
    }
  } catch (err) {
    console.error("Erreur lors de la lecture du LocalStorage :", err);
    showToast("Erreur d'accès au stockage local du navigateur.", "error");
  }
}

function saveItemsToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(state.items));
  } catch (err) {
    console.error("Erreur d'écriture dans le LocalStorage :", err);
  }
}

function saveSettingsToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
  } catch (err) {
    console.error("Erreur d'écriture des paramètres :", err);
  }
}

// ============================================================================
// COMMUNICATION AVEC GOOGLE DRIVE (GOOGLE APPS SCRIPT)
// ============================================================================

/**
 * Lit ou synchronise les données avec le dossier Google Drive via Google Apps Script.
 * Utilise Content-Type text/plain pour éviter les blocages CORS preflight (OPTIONS).
 */
async function syncWithGoogleDrive(showUserFeedback = true) {
  if (!state.settings.apiUrl) {
    updateSyncBadge("unconfigured", "Non configuré");
    if (showUserFeedback) {
      showToast("Veuillez configurer l'URL de votre Google Apps Script dans les paramètres.", "warning");
      openSettingsModal();
    }
    return;
  }

  setSyncLoading(true);
  updateSyncBadge("syncing", "Synchronisation...");

  try {
    const readUrl = `${state.settings.apiUrl}?action=read&file=${encodeURIComponent(state.settings.fileName)}&t=${Date.now()}`;
    const response = await fetch(readUrl, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result && result.status === "not_found") {
      // Le fichier n'existe pas encore sur Drive : on envoie les données locales existantes
      await pushDataToDrive();
      updateSyncBadge("connected", "Drive Connecté (créé)");
      if (showUserFeedback) showToast("Fichier créé sur Google Drive avec vos données locales.", "success");
    } else if (result && result.data && Array.isArray(result.data)) {
      // Données récupérées avec succès depuis Google Drive
      state.items = result.data;
      saveItemsToLocalStorage();
      state.settings.lastSync = new Date().toISOString();
      saveSettingsToLocalStorage();
      updateSyncBadge("connected", "Drive Connecté");
      if (showUserFeedback) showToast(`Synchronisé avec succès (${state.items.length} éléments reçus)`, "success");
    } else {
      updateSyncBadge("connected", "Drive Connecté");
    }
  } catch (err) {
    console.error("Échec de synchronisation Google Drive :", err);
    updateSyncBadge("error", "Erreur réseau");
    if (showUserFeedback) {
      showToast("Impossible de joindre Google Drive. Vérifiez l'URL ou votre connexion.", "error");
    }
  } finally {
    setSyncLoading(false);
    renderApp();
  }
}

/**
 * Envoie l'ensemble des données actuelles vers le fichier sur Google Drive.
 */
async function pushDataToDrive() {
  if (!state.settings.apiUrl) return;

  const payload = {
    action: "write",
    fileName: state.settings.fileName || "drivedesk_data.json",
    data: state.items
  };

  try {
    const response = await fetch(state.settings.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.status === "success") {
      state.settings.lastSync = new Date().toISOString();
      saveSettingsToLocalStorage();
      updateSyncBadge("connected", "Drive Connecté");
    } else {
      throw new Error(result.message || "Erreur inconnue");
    }
  } catch (err) {
    console.error("Erreur lors de l'enregistrement sur Drive :", err);
    updateSyncBadge("error", "Erreur de sauvegarde");
    showToast("Sauvegardé en local, mais échec d'envoi vers Google Drive.", "warning");
  }
}

// ============================================================================
// OPÉRATIONS CRUD
// ============================================================================

function createOrUpdateItem(id, title, category, status, content) {
  const now = new Date().toISOString();

  if (id) {
    // Modification (Update)
    const index = state.items.findIndex(item => item.id === id);
    if (index !== -1) {
      state.items[index] = {
        ...state.items[index],
        title,
        category: category || "Général",
        status: status || "Actif",
        content: content || "",
        updatedAt: now
      };
      showToast("Élément modifié avec succès.", "success");
    }
  } else {
    // Création (Create)
    const newItem = {
      id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      title,
      category: category || "Général",
      status: status || "Actif",
      content: content || "",
      createdAt: now,
      updatedAt: now
    };
    state.items.unshift(newItem);
    showToast("Nouvel élément créé avec succès.", "success");
  }

  saveItemsToLocalStorage();
  renderApp();

  // Synchronisation avec Drive en arrière-plan
  if (state.settings.apiUrl) {
    pushDataToDrive();
  }
}

function deleteItem(id) {
  const item = state.items.find(i => i.id === id);
  if (!item) return;

  if (confirm(`Êtes-vous sûr de vouloir supprimer "${item.title}" ?`)) {
    state.items = state.items.filter(i => i.id !== id);
    saveItemsToLocalStorage();
    renderApp();
    showToast("Élément supprimé.", "info");

    if (state.settings.apiUrl) {
      pushDataToDrive();
    }
  }
}

function duplicateItem(id) {
  const original = state.items.find(i => i.id === id);
  if (!original) return;

  const duplicated = {
    ...original,
    id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    title: `${original.title} (Copie)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  state.items.unshift(duplicated);
  saveItemsToLocalStorage();
  renderApp();
  showToast("Élément dupliqué.", "success");

  if (state.settings.apiUrl) {
    pushDataToDrive();
  }
}

// ============================================================================
// RENDU & INTERFACE UTILISATEUR
// ============================================================================

function renderApp() {
  applyFilters();
  renderCategoriesDropdown();
  renderItems();
  updateFooterStats();
  updateViewButtons();
}

function applyFilters() {
  let list = [...state.items];

  // Filtre recherche textuelle
  if (state.searchTerm.trim() !== "") {
    const q = state.searchTerm.toLowerCase();
    list = list.filter(item => 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q))
    );
  }

  // Filtre catégorie
  if (state.selectedCategory !== "ALL") {
    list = list.filter(item => item.category === state.selectedCategory);
  }

  // Filtre statut
  if (state.selectedStatus !== "ALL") {
    list = list.filter(item => item.status === state.selectedStatus);
  }

  state.filteredItems = list;
}

function renderCategoriesDropdown() {
  const categorySelect = document.getElementById("filter-category");
  const datalist = document.getElementById("categories-list");
  
  // Extraire les catégories uniques
  const categories = Array.from(new Set(state.items.map(i => i.category || "Général"))).sort();

  // Mettre à jour le select
  const currentVal = state.selectedCategory;
  categorySelect.innerHTML = `<option value="ALL">Toutes les catégories</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    if (cat === currentVal) opt.selected = true;
    categorySelect.appendChild(opt);
  });

  // Mettre à jour la datalist du formulaire
  datalist.innerHTML = "";
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    datalist.appendChild(opt);
  });
}

function renderItems() {
  const gridContainer = document.getElementById("items-grid");
  const tableContainer = document.getElementById("items-table-container");
  const tableBody = document.getElementById("table-body");
  const emptyState = document.getElementById("empty-state");

  if (state.filteredItems.length === 0) {
    gridContainer.style.display = "none";
    tableContainer.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  if (state.currentView === "cards") {
    gridContainer.style.display = "grid";
    tableContainer.style.display = "none";
    gridContainer.innerHTML = state.filteredItems.map(item => createCardHTML(item)).join("");
  } else {
    gridContainer.style.display = "none";
    tableContainer.style.display = "block";
    tableBody.innerHTML = state.filteredItems.map(item => createTableRowHTML(item)).join("");
  }

  attachDynamicActionListeners();
}

function createCardHTML(item) {
  const dateFormatted = formatDate(item.updatedAt || item.createdAt);
  const statusSlug = (item.status || "Actif").replace(/\s+/g, "-");

  return `
    <article class="data-card" data-id="${item.id}">
      <div>
        <div class="card-header">
          <div>
            <h3 class="card-title">${escapeHTML(item.title)}</h3>
            <span class="card-category">${escapeHTML(item.category || "Général")}</span>
          </div>
          <span class="badge-tag badge-tag-${statusSlug}">${escapeHTML(item.status || "Actif")}</span>
        </div>
        <div class="card-body" style="margin-top: 14px;">
          ${formatContentPreview(item.content)}
        </div>
      </div>
      <div class="card-footer">
        <span>${dateFormatted}</span>
        <div class="card-actions">
          <button class="btn-action-small btn-edit" data-id="${item.id}" title="Modifier">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
          <button class="btn-action-small btn-duplicate" data-id="${item.id}" title="Dupliquer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="btn-action-small btn-action-delete btn-delete" data-id="${item.id}" title="Supprimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function createTableRowHTML(item) {
  const dateFormatted = formatDate(item.updatedAt || item.createdAt);
  const statusSlug = (item.status || "Actif").replace(/\s+/g, "-");

  return `
    <tr data-id="${item.id}">
      <td><strong>${escapeHTML(item.title)}</strong></td>
      <td><span class="card-category">${escapeHTML(item.category || "Général")}</span></td>
      <td><span class="badge-tag badge-tag-${statusSlug}">${escapeHTML(item.status || "Actif")}</span></td>
      <td><div style="max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(item.content || "-")}</div></td>
      <td style="color: var(--text-muted); font-size: 0.8rem;">${dateFormatted}</td>
      <td class="text-right">
        <div class="card-actions" style="justify-content: flex-end;">
          <button class="btn-action-small btn-edit" data-id="${item.id}" title="Modifier">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
          <button class="btn-action-small btn-duplicate" data-id="${item.id}" title="Dupliquer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="btn-action-small btn-action-delete btn-delete" data-id="${item.id}" title="Supprimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `;
}

function attachDynamicActionListeners() {
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.onclick = () => openItemModal(btn.getAttribute("data-id"));
  });

  document.querySelectorAll(".btn-duplicate").forEach(btn => {
    btn.onclick = () => duplicateItem(btn.getAttribute("data-id"));
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.onclick = () => deleteItem(btn.getAttribute("data-id"));
  });
}

function updateFooterStats() {
  document.getElementById("stat-count").textContent = state.filteredItems.length;
  const lastSyncEl = document.getElementById("stat-last-sync");
  if (state.settings.lastSync) {
    lastSyncEl.textContent = `Dernière synchro : ${formatDate(state.settings.lastSync)}`;
  } else {
    lastSyncEl.textContent = "Dernière synchro : Jamais";
  }
}

function updateSyncBadge(type, text) {
  const badge = document.getElementById("sync-badge");
  const textEl = document.getElementById("sync-text");

  badge.className = "badge-status";
  if (type === "connected") badge.classList.add("badge-connected");
  else if (type === "syncing") badge.classList.add("badge-syncing");
  else if (type === "error") badge.classList.add("badge-error");
  else badge.classList.add("badge-unconfigured");

  textEl.textContent = text;
}

function setSyncLoading(isLoading) {
  state.isSyncing = isLoading;
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.style.display = isLoading ? "block" : "none";
  }
}

function updateViewButtons() {
  document.getElementById("btn-view-cards").classList.toggle("active", state.currentView === "cards");
  document.getElementById("btn-view-table").classList.toggle("active", state.currentView === "table");
}

// ============================================================================
// GESTION DES MODALES
// ============================================================================

function openItemModal(itemId = null) {
  const modal = document.getElementById("modal-item");
  const modalTitle = document.getElementById("modal-item-title");
  const inputId = document.getElementById("item-id");
  const inputTitle = document.getElementById("item-title");
  const inputCategory = document.getElementById("item-category");
  const selectStatus = document.getElementById("item-status");
  const inputContent = document.getElementById("item-content");

  if (itemId) {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
    modalTitle.textContent = "Modifier l'entrée";
    inputId.value = item.id;
    inputTitle.value = item.title;
    inputCategory.value = item.category || "";
    selectStatus.value = item.status || "Actif";
    inputContent.value = item.content || "";
  } else {
    modalTitle.textContent = "Nouvelle entrée";
    inputId.value = "";
    inputTitle.value = "";
    inputCategory.value = state.selectedCategory !== "ALL" ? state.selectedCategory : "";
    selectStatus.value = "Actif";
    inputContent.value = "";
  }

  modal.style.display = "flex";
  inputTitle.focus();
}

function closeItemModal() {
  document.getElementById("modal-item").style.display = "none";
}

function openSettingsModal() {
  const modal = document.getElementById("modal-settings");
  document.getElementById("input-api-url").value = state.settings.apiUrl || "";
  document.getElementById("input-file-name").value = state.settings.fileName || "drivedesk_data.json";
  
  const statusMsg = document.getElementById("connection-status-msg");
  statusMsg.style.display = "none";
  modal.style.display = "flex";
}

function closeSettingsModal() {
  document.getElementById("modal-settings").style.display = "none";
}

// ============================================================================
// EXPORTATION & IMPORTATION (JSON & CSV)
// ============================================================================

function exportToJson() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.items, null, 2));
  const downloadAnchor = document.createElement("a");
  const fileName = (state.settings.fileName || "drivedesk_data.json").replace(/\.[^/.]+$/, "") + ".json";
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Fichier JSON exporté avec succès.", "success");
}

function exportToCsv() {
  if (state.items.length === 0) {
    showToast("Aucune donnée à exporter.", "warning");
    return;
  }

  const headers = ["id", "title", "category", "status", "content", "createdAt", "updatedAt"];
  const csvRows = [];
  csvRows.push(headers.join(","));

  for (const item of state.items) {
    const row = headers.map(header => {
      let val = item[header] || "";
      // Échappement des guillemets et retour à la ligne pour le format CSV standard
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    });
    csvRows.push(row.join(","));
  }

  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csvRows.join("\r\n"));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", csvContent);
  downloadAnchor.setAttribute("download", "drivedesk_export.csv");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Fichier CSV exporté avec succès.", "success");
}

function importFromJson(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        state.items = importedData;
        saveItemsToLocalStorage();
        renderApp();
        showToast(`${importedData.length} éléments importés avec succès !`, "success");
        if (state.settings.apiUrl) {
          pushDataToDrive();
        }
      } else {
        showToast("Format invalide : le fichier JSON doit être un tableau d'éléments.", "error");
      }
    } catch (err) {
      showToast("Erreur lors de la lecture du fichier JSON.", "error");
    }
  };
  reader.readAsText(file);
}

// ============================================================================
// GESTIONNAIRES D'ÉVÉNEMENTS
// ============================================================================

function initEventListeners() {
  // Navigation par onglets du template
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.onclick = () => {
      const tabId = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => {
        c.style.display = "none";
        c.classList.remove("active");
      });

      btn.classList.add("active");
      const target = document.getElementById(tabId);
      if (target) {
        target.style.display = "block";
        target.classList.add("active");
      }
    };
  });

  // Copier le prompt LLM en 1 clic
  const copyPromptBtn = document.getElementById("btn-copy-prompt");
  if (copyPromptBtn) {
    copyPromptBtn.onclick = () => {
      const codeEl = document.getElementById("llm-prompt-code");
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.textContent).then(() => {
          const label = document.getElementById("copy-prompt-label");
          label.textContent = "Copié dans le presse-papier ! ✓";
          showToast("Prompt copié ! Prêt à donner au LLM.", "success");
          setTimeout(() => {
            label.textContent = "Copier le prompt LLM";
          }, 2500);
        }).catch(() => {
          showToast("Impossible de copier automatiquement.", "warning");
        });
      }
    };
  }

  // Boutons d'en-tête et création
  const btnCreate = document.getElementById("btn-create-item");
  if (btnCreate) btnCreate.onclick = () => openItemModal();

  const btnEmptyCreate = document.getElementById("btn-empty-create");
  if (btnEmptyCreate) btnEmptyCreate.onclick = () => openItemModal();

  document.getElementById("btn-sync-now").onclick = () => syncWithGoogleDrive(true);
  document.getElementById("btn-open-settings").onclick = () => openSettingsModal();

  // Soumission du formulaire d'entrée (CRUD)
  document.getElementById("form-item").onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("item-id").value;
    const title = document.getElementById("item-title").value.trim();
    const category = document.getElementById("item-category").value.trim();
    const status = document.getElementById("item-status").value;
    const content = document.getElementById("item-content").value;

    if (!title) return;
    createOrUpdateItem(id, title, category, status, content);
    closeItemModal();
  };

  // Fermetures de modales
  document.getElementById("btn-close-item-modal").onclick = closeItemModal;
  document.getElementById("btn-cancel-item").onclick = closeItemModal;
  document.getElementById("btn-close-settings").onclick = closeSettingsModal;

  // Clic sur l'overlay pour fermer la modale
  window.onclick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.style.display = "none";
    }
  };

  // Enregistrement des paramètres Google Drive
  document.getElementById("btn-save-settings").onclick = () => {
    const apiUrl = document.getElementById("input-api-url").value.trim();
    const fileName = document.getElementById("input-file-name").value.trim() || "drivedesk_data.json";

    state.settings.apiUrl = apiUrl;
    state.settings.fileName = fileName;
    saveSettingsToLocalStorage();

    closeSettingsModal();
    showToast("Paramètres sauvegardés.", "success");

    if (apiUrl) {
      syncWithGoogleDrive(true);
    } else {
      updateSyncBadge("unconfigured", "Non configuré");
    }
  };

  // Tester la connexion Google Drive
  document.getElementById("btn-test-connection").onclick = async () => {
    const apiUrl = document.getElementById("input-api-url").value.trim();
    const fileName = document.getElementById("input-file-name").value.trim() || "drivedesk_data.json";
    const msgEl = document.getElementById("connection-status-msg");

    if (!apiUrl) {
      msgEl.className = "connection-msg error";
      msgEl.textContent = "Veuillez saisir une URL Google Apps Script valide.";
      msgEl.style.display = "block";
      return;
    }

    msgEl.className = "connection-msg";
    msgEl.style.backgroundColor = "rgba(59, 130, 246, 0.2)";
    msgEl.style.color = "#60a5fa";
    msgEl.textContent = "Test de communication en cours...";
    msgEl.style.display = "block";

    try {
      const res = await fetch(`${apiUrl}?action=read&file=${encodeURIComponent(fileName)}&t=${Date.now()}`);
      if (!res.ok) throw new Error(`Code HTTP ${res.status}`);
      const data = await res.json();

      msgEl.className = "connection-msg success";
      msgEl.textContent = "Connexion réussie avec Google Apps Script & Google Drive !";
    } catch (err) {
      msgEl.className = "connection-msg error";
      msgEl.textContent = "Échec du test : impossible de joindre le script. Vérifiez les autorisations de déploiement.";
    }
  };

  // Recherche & Filtres
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("btn-clear-search");

  searchInput.oninput = (e) => {
    state.searchTerm = e.target.value;
    clearSearchBtn.style.display = state.searchTerm ? "block" : "none";
    applyFilters();
    renderItems();
    updateFooterStats();
  };

  clearSearchBtn.onclick = () => {
    searchInput.value = "";
    state.searchTerm = "";
    clearSearchBtn.style.display = "none";
    applyFilters();
    renderItems();
    updateFooterStats();
  };

  document.getElementById("filter-category").onchange = (e) => {
    state.selectedCategory = e.target.value;
    applyFilters();
    renderItems();
    updateFooterStats();
  };

  document.getElementById("filter-status").onchange = (e) => {
    state.selectedStatus = e.target.value;
    applyFilters();
    renderItems();
    updateFooterStats();
  };

  // Bascule du mode d'affichage
  document.getElementById("btn-view-cards").onclick = () => {
    state.currentView = "cards";
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, "cards");
    renderApp();
  };

  document.getElementById("btn-view-table").onclick = () => {
    state.currentView = "table";
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, "table");
    renderApp();
  };

  // Export / Import
  document.getElementById("btn-export-json").onclick = exportToJson;
  document.getElementById("btn-export-csv").onclick = exportToCsv;
  document.getElementById("input-import-json").onchange = (e) => {
    if (e.target.files && e.target.files[0]) {
      importFromJson(e.target.files[0]);
      e.target.value = ""; // Réinitialiser le champ
    }
  };

  // Effacer le cache local
  document.getElementById("btn-clear-local").onclick = () => {
    if (confirm("Voulez-vous vraiment vider les données en cache sur ce navigateur ?")) {
      localStorage.removeItem(STORAGE_KEYS.ITEMS);
      state.items = [];
      renderApp();
      closeSettingsModal();
      showToast("Cache local vidé.", "info");
    }
  };
}

// ============================================================================
// OUTILS & HELPERS
// ============================================================================

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatContentPreview(content) {
  if (!content) return "<em style='color: var(--text-muted);'>Aucune note</em>";
  // Détection si c'est du JSON valide
  if (typeof content === "string" && (content.trim().startsWith("{") || content.trim().startsWith("["))) {
    try {
      const parsed = JSON.parse(content);
      return `<code>${escapeHTML(JSON.stringify(parsed, null, 2))}</code>`;
    } catch (e) {
      // Ignorer, rendu texte standard
    }
  }
  return escapeHTML(content);
}

function formatDate(isoString) {
  if (!isoString) return "-";
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    return isoString;
  }
}
