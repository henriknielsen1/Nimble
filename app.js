let activeInstanceId = null;
const DEFAULT_GEMINI_IMAGE_MODEL = 'gemini-3.1-flash-image';
const GEMINI_CONFIG_STORAGE_NAME = 'nimble_gemini_user_cfg';
const GEMINI_KEY_STORAGE_NAME = 'nimble_gemini_api_key';
let isUserEditingPrompt = false;

window.addEventListener('DOMContentLoaded', () => {
  populateDropdown();
  renderSavedInstancesList();
  renderRulesView();
  ['f-gp', 'f-sp', 'f-cp'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updateInventorySummary());
  });

  const extraDescEl = document.getElementById('portrait-extra-desc');
  if (extraDescEl) {
    extraDescEl.addEventListener('input', onExtraDescChange);
  }
  const styleEl = document.getElementById('portrait-style');
  if (styleEl) {
    styleEl.addEventListener('change', onExtraDescChange);
  }
  const promptInputEl = document.getElementById('portrait-prompt-input');
  if (promptInputEl) {
    promptInputEl.addEventListener('input', () => {
      isUserEditingPrompt = true;
    });
  }
  const modalEl = document.getElementById('portrait-modal');
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) closePortraitModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePortraitModal();
  });

  const lastId = localStorage.getItem('nimble_last_active');
  if (lastId && getInstanceById(lastId)) {
    loadInstance(lastId);
  }
});

function switchView(viewName) {
  document.getElementById('view-select').style.display = viewName === 'select' ? 'block' : 'none';
  document.getElementById('view-sheet').style.display = viewName === 'sheet' ? 'block' : 'none';
  document.getElementById('view-rules').style.display = viewName === 'rules' ? 'block' : 'none';

  document.getElementById('tab-btn-select').classList.toggle('active', viewName === 'select');
  document.getElementById('tab-btn-sheet').classList.toggle('active', viewName === 'sheet');
  document.getElementById('tab-btn-rules').classList.toggle('active', viewName === 'rules');
}

function populateDropdown() {
  const select = document.getElementById('char-select-in');
  select.innerHTML = '';
  NIMBLE_DATA.characters.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.character_name} - ${c.class} (${c.ancestry})`;
    select.appendChild(opt);
  });
}

function getAllInstances() {
  try {
    return JSON.parse(localStorage.getItem('nimble_instances') || '[]');
  } catch (e) {
    return [];
  }
}

function saveAllInstances(list) {
  localStorage.setItem('nimble_instances', JSON.stringify(list));
}

function getInstanceById(instId) {
  const list = getAllInstances();
  return list.find(x => x.instance_id === instId);
}

function escapePremadeHtml(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function buildPremadeSheetClone(char) {
  const sheet = document.querySelector('#view-sheet .sheet-card');
  populateSheet({ ...char, player_name: '', portrait: '' });
  const clone = sheet.cloneNode(true);
  clone.querySelectorAll('button, .hp-buttons, .screen-only, .screen-only-flex').forEach(el => {
    if (!el.matches('#f-notes, #f-inventory-items, #f-inventory-summary') && !el.querySelector('input, textarea')) el.remove();
  });

  clone.querySelectorAll('input').forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      if (input.checked) input.setAttribute('checked', ''); else input.removeAttribute('checked');
    } else {
      input.setAttribute('value', input.value);
    }
  });
  clone.querySelectorAll('textarea').forEach(t => { t.textContent = t.value; });
  clone.querySelectorAll('select').forEach(s => {
    Array.from(s.options).forEach((o, i) => { if (i === s.selectedIndex) o.setAttribute('selected', ''); else o.removeAttribute('selected'); });
  });

  const inv = clone.querySelector('#f-inventory-print');
  const notes = clone.querySelector('#f-notes-print');
  if (inv) inv.classList.add('premade-print-inventory');
  if (notes) notes.classList.add('premade-print-notes');
  clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  clone.querySelectorAll('button').forEach(b => b.setAttribute('tabindex', '-1'));
  return clone;
}

function openPremadeCharactersPrintView() {
  const existing = document.getElementById('premade-print-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'premade-print-overlay';
  overlay.className = 'premade-print-overlay';
  overlay.innerHTML = `
    <div class="action-bar no-print">
      <div class="button-group">
        <button class="btn btn-secondary" onclick="window.print()">🖨️ Udskriv</button>
        <button class="btn btn-danger" onclick="closePremadeCharactersPrintView()">Luk</button>
      </div>
    </div>
    <div id="premade-print-content"></div>
  `;
  document.body.appendChild(overlay);

  const content = overlay.querySelector('#premade-print-content');
  if (activeInstanceId) saveActiveSheet(false);
  NIMBLE_DATA.characters.forEach(char => content.appendChild(buildPremadeSheetClone(char)));
  if (activeInstanceId) {
    const inst = getAllInstances().find(x => x.instance_id === activeInstanceId);
    if (inst) populateSheet(inst);
  }
}

function closePremadeCharactersPrintView() {
  const overlay = document.getElementById('premade-print-overlay');
  if (overlay) overlay.remove();
}

function cloneAndActivateCharacter() {
  const pName = document.getElementById('player-name-in').value.trim() || 'Ukendt Spiller';
  const charId = document.getElementById('char-select-in').value;
  const template = NIMBLE_DATA.characters.find(c => c.id === charId);

  if (!template) return;

  const instanceId = 'inst_' + Date.now();
  const newInst = JSON.parse(JSON.stringify(template));
  newInst.instance_id = instanceId;
  newInst.player_name = pName;

  const list = getAllInstances();
  list.push(newInst);
  saveAllInstances(list);

  renderSavedInstancesList();
  loadInstance(instanceId);
}

function loadInstance(instanceId) {
  const inst = getInstanceById(instanceId);
  if (!inst) return;

  activeInstanceId = instanceId;
  localStorage.setItem('nimble_last_active', instanceId);

  populateSheet(inst);
  switchView('sheet');
}

function populateSheet(inst) {
  document.getElementById('f-name').textContent = inst.character_name;
  document.getElementById('f-class-meta').textContent = `Level ${inst.level} ${inst.class} | ${inst.ancestry} | ${inst.background}`;
  document.getElementById('f-quote').textContent = `"${inst.quote}"`;
  document.getElementById('f-player').value = inst.player_name || '';

  document.getElementById('f-hp').value = inst.hp;
  document.getElementById('f-hp-max').textContent = inst.hp_max;
  document.getElementById('f-hp-temp').value = inst.hp_temp || 0;
  updateBloodied();
  document.getElementById('f-hitdie').textContent = inst.hit_die;
  document.getElementById('f-defense').textContent = inst.defense;
  document.getElementById('f-defcalc').textContent = `(${inst.defense_calc})`;
  document.getElementById('f-speed').textContent = inst.speed;
  document.getElementById('f-speed').dataset.baseSpeed = parseInt(inst.speed, 10) || 6;
  document.getElementById('f-initiative').textContent = inst.initiative;

  const boxes = document.querySelectorAll('.wb');
  boxes.forEach((b, idx) => {
    b.checked = (idx + 1) <= (inst.wounds || 0);
  });

  const statsBody = document.querySelector('#f-stats-table tbody');
  statsBody.innerHTML = '';
  for (const [key, val] of Object.entries(inst.stats)) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${key}</strong> ${val.key ? '<em style="color:var(--primary); font-size:0.8rem;">(Key)</em>' : ''}</td>
      <td><strong>${val.rating}</strong></td>
      <td>${val.save}</td>
      <td>${val.skills}</td>
    `;
    statsBody.appendChild(tr);
  }

  const attacksBody = document.querySelector('#f-attacks-table tbody');
  attacksBody.innerHTML = '';
  inst.attacks.forEach(att => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><strong>${att.name}</strong></td><td>${att.damage}</td><td>${att.traits}</td>`;
    attacksBody.appendChild(tr);
  });

  const featContainer = document.getElementById('f-features');
  featContainer.innerHTML = '';
  inst.class_features.forEach(f => {
    const d = document.createElement('div');
    d.className = 'feature-item';
    d.innerHTML = `<strong>${f.title}:</strong> ${f.text}`;
    featContainer.appendChild(d);
  });

  const inventory = Array.isArray(inst.inventory) ? inst.inventory : String(inst.inventory || '').split('\n').filter(Boolean);
  renderInventoryEditor(inventory, inst.inventory_slots, inst.stats?.STR?.rating);
  document.getElementById('f-gp').value = inst.gold ? inst.gold.gp : 0;
  document.getElementById('f-sp').value = inst.gold ? inst.gold.sp : 0;
  document.getElementById('f-cp').value = inst.gold ? inst.gold.cp : 0;
  updateInventorySummary();

  document.getElementById('f-notes').value = inst.notes || '';

  renderPortrait(inst.portrait || null);

  syncPrintMirrors();
}

function applyHpChange(hp, temp, max, delta) {
  let newHp = hp;
  let newTemp = Math.max(0, temp);
  if (delta < 0) {
    const absorbed = Math.min(newTemp, -delta);
    newTemp -= absorbed;
    newHp += delta + absorbed;
  } else {
    newHp += delta;
  }
  newHp = Math.max(0, Math.min(max, newHp));
  return { hp: newHp, temp: newTemp };
}

function updateBloodied() {
  const hpEl = document.getElementById('f-hp');
  const flag = document.getElementById('f-bloodied');
  if (!hpEl || !flag) return;
  const max = parseInt(document.getElementById('f-hp-max').textContent, 10) || 0;
  const hp = parseInt(hpEl.value, 10) || 0;
  flag.hidden = !(max > 0 && hp <= max / 2);
  flag.textContent = hp <= 0 ? 'Dying' : 'Bloodied';
}

function adjustHp(delta) {
  const hpEl = document.getElementById('f-hp');
  const tempEl = document.getElementById('f-hp-temp');
  const max = parseInt(document.getElementById('f-hp-max').textContent, 10) || 0;
  const res = applyHpChange(parseInt(hpEl.value, 10) || 0, parseInt(tempEl.value, 10) || 0, max, delta);
  hpEl.value = res.hp;
  tempEl.value = res.temp;
  updateBloodied();
  saveActiveSheet(false);
}

function initHpTracker() {
  document.querySelectorAll('[data-hp-delta]').forEach(btn => {
    btn.addEventListener('click', () => adjustHp(parseInt(btn.dataset.hpDelta, 10)));
  });
  ['f-hp', 'f-hp-temp'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => { updateBloodied(); saveActiveSheet(false); });
  });
}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHpTracker);
  else initHpTracker();
}

function syncPrintMirrors() {
  const notesField = document.getElementById('f-notes');
  const invPrint = document.getElementById('f-inventory-print');
  const notesPrint = document.getElementById('f-notes-print');

  if (notesField && notesPrint) {
    notesPrint.textContent = notesField.value;
  }
}

function inferInventorySlots(item) {
  if (/^Slot \d+:/i.test(item)) return 1;
  if (/\b(lig|kist\w*|monsterdel\w*)\b/i.test(item)) return 3;
  if (/\b(tohånds|two.hand|greataxe|bøddeløkse|quarterstaff|munkestav|egetræsstav|shortbow|kortbue|staff|telt|klatregrej)\b/i.test(item)) return 2;
  if (/\b(våben|weapon|skjold|shield|rustning|armor|mail|hides|kogger|quiver|reb|rope|ration\w*|proviant|pile)\b/i.test(item)) return 1;
  if (/\b(amulet|kridt|chalk|fjerpen|pen|mønt|coin|røgelsespind|bønnesnor)\b/i.test(item)) return 0;
  return 1;
}

function renderInventoryEditor(items, slotCosts = [], strengthRating = '0') {
  const container = document.getElementById('f-inventory-items');
  if (!container) return;
  container.replaceChildren();
  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'inventory-row';

    const name = document.createElement('input');
    name.type = 'text';
    name.className = 'inventory-name';
    name.setAttribute('aria-label', `Genstand ${index + 1}`);
    name.value = item;
    name.addEventListener('input', updateInventorySummary);

    const slots = document.createElement('input');
    slots.type = 'number';
    slots.min = '0';
    slots.step = '1';
    slots.className = 'inventory-slots';
    slots.setAttribute('aria-label', `Slots for genstand ${index + 1}`);
    slots.value = Number.isInteger(slotCosts[index]) && slotCosts[index] >= 0
      ? slotCosts[index]
      : inferInventorySlots(item);
    slots.addEventListener('input', updateInventorySummary);

    const unit = document.createElement('span');
    unit.textContent = 'slots';

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'btn btn-danger inventory-remove screen-only';
    remove.textContent = 'Fjern';
    remove.setAttribute('aria-label', `Fjern ${item || `genstand ${index + 1}`}`);
    remove.addEventListener('click', () => {
      row.remove();
      updateInventorySummary(strengthRating);
    });

    row.append(name, slots, unit, remove);
    container.appendChild(row);
  });
  container.dataset.strength = strengthRating || '0';
  updateInventorySummary();
}

function getInventoryTotals() {
  let assigned = 0;
  let smallItems = 0;
  let freeSmallItemsUsed = 0;
  const printableItems = [];
  document.querySelectorAll('#f-inventory-items .inventory-row').forEach(row => {
    const name = row.querySelector('.inventory-name').value.trim();
    const rawSlots = Number(row.querySelector('.inventory-slots').value);
    const slots = Number.isFinite(rawSlots) ? Math.max(0, Math.floor(rawSlots)) : 0;
    let effectiveSlots = slots;
    if (slots === 0 && name) {
      smallItems++;
      if (freeSmallItemsUsed < 5) {
        freeSmallItemsUsed++;
      } else {
        effectiveSlots = 1;
      }
    }
    if (name) assigned += slots;
    if (name) printableItems.push(`${name} — ${effectiveSlots} ${effectiveSlots === 1 ? 'slot' : 'slots'}`);
  });
  const coins = ['f-gp', 'f-sp', 'f-cp'].reduce((total, id) => total + (parseInt(document.getElementById(id)?.value, 10) || 0), 0);
  const coinSlots = Math.ceil(Math.max(0, coins) / 100);
  const used = assigned + Math.max(0, smallItems - 5) + coinSlots;
  if (coins > 0) printableItems.push(`${coins} mønter — ${coinSlots} ${coinSlots === 1 ? 'slot' : 'slots'}`);
  return { assigned, smallItems, coinSlots, used, printableItems };
}

function updateInventorySummary(strengthRating) {
  const container = document.getElementById('f-inventory-items');
  const strength = parseInt(strengthRating ?? container?.dataset.strength ?? '0', 10) || 0;
  const capacity = 10 + strength;
  const totals = getInventoryTotals();
  const summary = document.getElementById('f-inventory-summary');
  const print = document.getElementById('f-inventory-print');
  if (!summary || !print) return;

  let status = `Normal belastning · ${Math.max(0, capacity - totals.used)} slots tilbage`;
  const baseSpeed = parseInt(document.getElementById('f-speed')?.dataset.baseSpeed || '6', 10);
  if (totals.used > capacity + 5) {
    status = `Immobiliseret · ${totals.used}/${capacity + 5} slots før immobilisering`;
    document.getElementById('f-speed').textContent = '0 felter (Immobiliseret)';
  } else if (totals.used > capacity) {
    status = `Overbelastet · ${totals.used - capacity} slots over grænsen · Ulempe på STR- og DEX-tjek samt saves`;
    document.getElementById('f-speed').textContent = `${Math.max(0, baseSpeed - 2)} felter (-2, Overbelastet)`;
  } else {
    document.getElementById('f-speed').textContent = `${baseSpeed} felter`;
  }
  summary.textContent = `Bæreevne: ${capacity} slots · Belastning: ${totals.used} slots · ${status}`;
  print.textContent = `${totals.printableItems.join('\n')}\n\nBelastning: ${totals.used}/${capacity} slots — ${status}`;
}

function addInventoryItem() {
  const container = document.getElementById('f-inventory-items');
  const items = Array.from(container.querySelectorAll('.inventory-name'), input => input.value);
  const costs = Array.from(container.querySelectorAll('.inventory-slots'), input => Number(input.value));
  items.push('');
  costs.push(1);
  renderInventoryEditor(items, costs, container.dataset.strength);
  container.querySelector('.inventory-row:last-child .inventory-name').focus();
}

function handleWoundToggle(woundVal) {
  const boxes = document.querySelectorAll('.wb');
  let newCount = woundVal;
  if (boxes[woundVal - 1].checked === false) {
    newCount = woundVal - 1;
  }
  boxes.forEach((b, idx) => {
    b.checked = (idx + 1) <= newCount;
  });
  saveActiveSheet(false);
}

function saveActiveSheet(showAlert = true) {
  if (!activeInstanceId) return;

  syncPrintMirrors();

  const list = getAllInstances();
  const idx = list.findIndex(x => x.instance_id === activeInstanceId);
  if (idx === -1) return;

  const current = list[idx];
  current.player_name = document.getElementById('f-player').value.trim();
  current.hp = parseInt(document.getElementById('f-hp').value, 10) || 0;
  current.hp_temp = Math.max(0, parseInt(document.getElementById('f-hp-temp').value, 10) || 0);

  let checkedWounds = 0;
  document.querySelectorAll('.wb').forEach(b => { if (b.checked) checkedWounds++; });
  current.wounds = checkedWounds;

  current.inventory = Array.from(document.querySelectorAll('#f-inventory-items .inventory-name'), input => input.value);
  current.inventory_slots = Array.from(document.querySelectorAll('#f-inventory-items .inventory-slots'), input => {
    const slots = Number(input.value);
    return Number.isFinite(slots) ? Math.max(0, Math.floor(slots)) : 0;
  });
  current.gold = {
    gp: parseInt(document.getElementById('f-gp').value, 10) || 0,
    sp: parseInt(document.getElementById('f-sp').value, 10) || 0,
    cp: parseInt(document.getElementById('f-cp').value, 10) || 0
  };
  current.notes = document.getElementById('f-notes').value;

  list[idx] = current;
  saveAllInstances(list);
  renderSavedInstancesList();

  if (showAlert) alert("Data gemt lokalt!");
}

function renderSavedInstancesList() {
  const container = document.getElementById('saved-instances-list');
  const list = getAllInstances();
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p class="text-muted text-small">Ingen aktive karakterer oprettet i denne browser endnu.</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.style.paddingLeft = '1.2rem';
  list.forEach(item => {
    const li = document.createElement('li');
    li.style.marginBottom = '0.5rem';
    li.innerHTML = `
      <strong>${item.player_name}</strong> - ${item.character_name} (${item.class})
      <button class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.75rem; margin-left: 8px;" onclick="loadInstance('${item.instance_id}')">Åbn</button>
    `;
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

function deleteCurrentInstance() {
  if (!activeInstanceId) return;
  if (!confirm("Vil du slette denne karakterkopi permanent?")) return;

  let list = getAllInstances();
  list = list.filter(x => x.instance_id !== activeInstanceId);
  saveAllInstances(list);
  activeInstanceId = null;
  localStorage.removeItem('nimble_last_active');

  renderSavedInstancesList();
  switchView('select');
}

function exportCurrentInstance() {
  const inst = getInstanceById(activeInstanceId);
  if (!inst) return;
  const blob = new Blob([JSON.stringify(inst, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${inst.character_name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_kopi.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function renderRulesView() {
  const container = document.getElementById('rules-content');
  const r = NIMBLE_DATA.rules;
  const sections = [
    ['actions', r.actions],
    ['attacks', r.attacks],
    ['defense', r.defense],
    ['saves', r.saves],
    ['dying', r.dying],
    ['rest', r.rest],
    ['inventory', r.inventory]
  ];

  container.innerHTML = `
    <p class="rules-intro">Vælg et emne for at folde reglerne ud. Brug hurtigmenuen til at springe direkte til det, du leder efter.</p>
    <nav class="rules-quick-nav" aria-label="Hurtig adgang til regler">
      ${sections.map(([key, section]) => `
        <a class="rules-quick-link" href="#rules-${key}">${section.title}</a>
      `).join('')}
    </nav>
    <div class="rules-grid">
      ${sections.map(([key, section]) => `
        <details class="rules-section" id="rules-${key}">
          <summary>
            <span>${section.title}</span>
            <span class="rules-section-count">${section.items.length} punkter</span>
          </summary>
          <div class="rules-section-content">
            <p>${section.desc}</p>
            <ul>${section.items.map(i => `<li>${i}</li>`).join('')}</ul>
            ${section.refreshNote ? `<div class="rules-box"><strong>${section.refreshNote}</strong></div>` : ''}
          </div>
        </details>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.rules-quick-link').forEach(link => {
    link.addEventListener('click', () => {
      const section = document.getElementById(link.hash.slice(1));
      if (section) section.open = true;
    });
  });
}

/* ===================================================
   PORTRÆT-GENERERING MED GOOGLE GEMINI API
   =================================================== */

function encodeStorageVal(plain) {
  if (!plain) return '';
  try {
    return btoa(encodeURIComponent(plain));
  } catch (e) {
    return plain;
  }
}

function decodeStorageVal(stored) {
  if (!stored) return '';
  try {
    return decodeURIComponent(atob(stored));
  } catch (e) {
    return stored;
  }
}

function getStoredGeminiApiKey() {
  try {
    const primary = localStorage.getItem(GEMINI_CONFIG_STORAGE_NAME);
    if (primary) return decodeStorageVal(primary);
    const legacy = localStorage.getItem(GEMINI_KEY_STORAGE_NAME) || localStorage.getItem('gemini_api_key');
    if (legacy) return legacy;
    return '';
  } catch (e) {
    return '';
  }
}

function setStoredGeminiApiKey(val) {
  try {
    const sanitized = (val || '').trim();
    localStorage.setItem(GEMINI_CONFIG_STORAGE_NAME, encodeStorageVal(sanitized));
  } catch (e) {
    console.warn('Kunne ikke gemme Gemini-konfiguration i localStorage:', e);
  }
}

function isSafeImageDataUrl(url) {
  if (typeof url !== 'string') return false;
  return (
    url.startsWith('data:image/jpeg;base64,') ||
    url.startsWith('data:image/png;base64,') ||
    url.startsWith('data:image/webp;base64,')
  );
}

const PORTRAIT_STYLE_PRESETS = {
  daggerheart: 'bold hand-drawn fantasy illustration, opaque gouache color blocks, confident dark ink contours, a few loose watercolor accents, visible imperfect brush edges, simplified expressive face and silhouette, limited warm palette',
  legends: 'loose storybook fantasy drawing, expressive ink contours with varied line weight, sparse translucent watercolor washes, open paper, simplified playful shapes, only a few broad shadows, limited muted palette',
  oil: 'stylized storybook fantasy illustration painted in matte oil, simplified shapes, loose visible brushwork, expressive features and a restrained earthy palette'
};
const DEFAULT_PORTRAIT_STYLE = 'daggerheart';

function buildCharacterPrompt(inst, extraDesc = '', style = DEFAULT_PORTRAIT_STYLE) {
  if (!inst) return '';

  const styleText = PORTRAIT_STYLE_PRESETS[style] || PORTRAIT_STYLE_PRESETS[DEFAULT_PORTRAIT_STYLE];

  const name = inst.character_name || '';
  const ancestry = inst.ancestry || '';
  const charClass = inst.class || '';
  const level = inst.level ? `Level ${inst.level}` : '';
  const background = inst.background || '';
  const alignment = inst.alignment || '';
  const gender = inst.gender || '';
  const age = inst.age ? `${inst.age} years old` : '';

  // Uddrag visuelle kendetegn fra inst.appearance eller "Kendetegn" i noter
  let visualTraits = inst.appearance || '';
  if (inst.notes) {
    const match = inst.notes.match(/Kendetegn:\s*([^\n]+)/i);
    if (match && match[1]) {
      const traitText = match[1].trim().replace(/\.$/, '');
      visualTraits = visualTraits ? `${visualTraits}, ${traitText}` : traitText;
    }
  }

  // Uddrag udstyr og påklædning fra rygsæk/inventory
  let gearSummary = '';
  const inventory = Array.isArray(inst.inventory)
    ? inst.inventory
    : String(inst.inventory || '').split('\n').filter(Boolean);
  if (inventory.length > 0) {
    const topGear = inventory
      .slice(0, 3)
      .map(item => item.replace(/\(.*?\)/g, '').replace(/Slot \d+:/i, '').replace(/Småting:/i, '').trim())
      .filter(Boolean);
    if (topGear.length > 0) {
      gearSummary = topGear.join(', ');
    }
  }

  const who = [gender, age, ancestry, charClass, level].filter(Boolean).join(' ');
  const sentences = [];
  if (name || who) {
    sentences.push(`The portrait shows ${name ? `${name}, ` : ''}${who ? `a ${who}` : 'an adventurer'}`);
  }
  if (background) sentences.push(`Their background is: ${background}`);
  if (alignment) sentences.push(`Their temperament is ${alignment}`);
  if (visualTraits) sentences.push(`They look like this: ${visualTraits}`);
  if (gearSummary) sentences.push(`They wear and carry everyday adventurer gear made of believable materials such as worn leather, wool and linen: ${gearSummary}`);
  if (inst.quote) sentences.push(`Their expression hints at this personality: "${inst.quote}"`);
  const description = sentences.join('. ');

  const extra = extraDesc && extraDesc.trim()
    ? ` Important additional details from the user, which take priority over everything above: ${extraDesc.trim()}.`
    : '';

  const styleAddendum = style === 'custom'
    ? ''
    : ` Style target: ${styleText}.`;

  return `Create a simple, clearly illustrated fantasy tabletop RPG character bust portrait, chest-up, in this style: ${styleText}. ` +
    `Make it look drawn and painted, not like a photograph: use an instantly readable silhouette, simplified expressive features, confident imperfect outlines, broad flat color areas and just a few clear shadow shapes. ` +
    `Keep it lightly cartoon-like and full of personality, with deliberate hand-made irregularities. Use a plain, quiet background with one or two loose color shapes; keep the character as the focus. ` +
    `Square composition for a small 28x28 mm print: center the face and shoulders and keep important features away from the edges. ` +
    (description ? `${description}. ` : '') +
    `Avoid: photographic or realistic rendering, realistic skin texture or pores, 3D renders, glossy or airbrushed surfaces, intricate micro-detail, dramatic cinematic lighting, lens flare, heavy gradients, bokeh, glow, particles, ornate scenery, generic epic-poster poses, stock-photo faces, text, watermarks, and borders.` +
    styleAddendum +
    extra;
}

async function callGeminiImageApi(apiKey, prompt, model = DEFAULT_GEMINI_IMAGE_MODEL) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Mangler Gemini API-nøgle. Indtast venligst din API-nøgle fra Google AI Studio.');
  }

  const trimmedKey = apiKey.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(trimmedKey)}`;

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': trimmedKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ['IMAGE']
        }
      })
    });
  } catch (netErr) {
    throw new Error('Netværksfejl: Kunne ikke få forbindelse til Google Gemini API. Kontrollér din internetforbindelse.');
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    throw new Error(`Uventet svarformat fra Gemini API (status ${response.status}).`);
  }

  if (!response.ok) {
    const errMsg = data?.error?.message || response.statusText || 'Ukendt fejl';
    if (response.status === 400 && /API_KEY_INVALID|invalid api key/i.test(errMsg)) {
      throw new Error('Ugyldig Gemini API-nøgle (400). Kontrollér at din nøgle fra Google AI Studio er kopieret korrekt.');
    }
    if (response.status === 403) {
      throw new Error(`Adgang nægtet (403): ${errMsg}. Tjek om Gemini API er aktiveret for dit projekt.`);
    }
    if (response.status === 429) {
      throw new Error('Rate limit overskredet (429). Google har midlertidigt begrænset antallet af anmodninger. Vent et øjeblik og prøv igen.');
    }
    if (response.status >= 500) {
      throw new Error(`Google serverfejl (${response.status}). Prøv igen om et øjeblik.`);
    }
    throw new Error(`Fejl fra Gemini API (${response.status}): ${errMsg}`);
  }

  if (data.promptFeedback?.blockReason) {
    throw new Error(`Prompten blev blokeret af Googles sikkerhedsfilter (${data.promptFeedback.blockReason}). Prøv at ændre beskrivelsen.`);
  }

  const candidate = data.candidates?.[0];
  if (!candidate) {
    throw new Error('Gemini API returnerede intet resultat.');
  }

  if (candidate.finishReason && !['STOP', 'MAX_TOKENS'].includes(candidate.finishReason)) {
    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Billedet blev blokeret af Googles sikkerhedsfilter (Safety). Justér venligst prompten.');
    }
    if (candidate.finishReason === 'BLOCKLIST' || candidate.finishReason === 'PROHIBITED_CONTENT') {
      throw new Error(`Genereringen blev afvist (${candidate.finishReason}). Prøv en anden beskrivelse.`);
    }
  }

  let base64 = null;
  let mimeType = 'image/png';
  let textFound = '';

  if (candidate.content?.parts && Array.isArray(candidate.content.parts)) {
    for (const part of candidate.content.parts) {
      const inline = part.inlineData || part.inline_data;
      if (inline && inline.data) {
        base64 = inline.data;
        mimeType = inline.mimeType || inline.mime_type || 'image/png';
        break;
      }
      if (part.text) {
        textFound += part.text;
      }
    }
  }

  if (!base64) {
    if (textFound) {
      throw new Error(`Gemini returnerede tekst i stedet for et billede: "${textFound.slice(0, 150)}..."`);
    }
    throw new Error('Intet billede fundet i svaret fra Gemini API.');
  }

  return `data:${mimeType};base64,${base64}`;
}

let currentPortraitObjectUrl = null;

function dataUrlToBlob(dataUrl) {
  try {
    const parts = (dataUrl || '').split(',');
    if (parts.length < 2) return null;
    const match = parts[0].match(/:(.*?);/);
    const mime = match ? match[1] : 'image/jpeg';
    if (!mime.startsWith('image/')) return null;
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    return null;
  }
}

function compressImage(dataUrl, maxDimension = 360, quality = 0.85) {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined' || typeof document === 'undefined') {
      return resolve(dataUrl);
    }
    if (!isSafeImageDataUrl(dataUrl)) {
      return resolve(dataUrl);
    }
    const blob = dataUrlToBlob(dataUrl);
    if (!blob || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
      return resolve(dataUrl);
    }
    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        URL.revokeObjectURL(objectUrl);
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;
        if (!width || !height) return resolve(dataUrl);

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(dataUrl);

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (err) {
        console.warn('Canvas compression error:', err);
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(dataUrl);
    };
    img.src = objectUrl;
  });
}

function renderPortrait(portraitDataUrl) {
  const frame = document.getElementById('sheet-portrait-frame');
  const imgEl = document.getElementById('f-portrait-img');
  const displayBox = document.getElementById('portrait-display');
  const placeholderBox = document.getElementById('portrait-placeholder');
  const loadingBox = document.getElementById('portrait-loading');
  const errorBox = document.getElementById('portrait-error');
  const actionsBar = document.getElementById('portrait-actions-bar');

  if (!frame) return;

  if (loadingBox) loadingBox.style.display = 'none';
  if (errorBox) errorBox.style.display = 'none';

  if (currentPortraitObjectUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
    try {
      URL.revokeObjectURL(currentPortraitObjectUrl);
    } catch (e) {}
    currentPortraitObjectUrl = null;
  }

  const blob = isSafeImageDataUrl(portraitDataUrl) ? dataUrlToBlob(portraitDataUrl) : null;
  if (blob && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    frame.classList.remove('has-no-portrait');
    currentPortraitObjectUrl = URL.createObjectURL(blob);
    if (imgEl) imgEl.src = currentPortraitObjectUrl;
    if (displayBox) displayBox.style.display = 'block';
    if (placeholderBox) placeholderBox.style.display = 'none';
    if (actionsBar) actionsBar.style.display = 'flex';
  } else {
    frame.classList.add('has-no-portrait');
    if (imgEl) imgEl.src = '';
    if (displayBox) displayBox.style.display = 'none';
    if (placeholderBox) placeholderBox.style.display = 'flex';
    if (actionsBar) actionsBar.style.display = 'none';
  }
}

function setPortraitLoading(isLoading) {
  const displayBox = document.getElementById('portrait-display');
  const placeholderBox = document.getElementById('portrait-placeholder');
  const loadingBox = document.getElementById('portrait-loading');
  const errorBox = document.getElementById('portrait-error');
  const actionsBar = document.getElementById('portrait-actions-bar');

  if (isLoading) {
    if (loadingBox) loadingBox.style.display = 'flex';
    if (displayBox) displayBox.style.display = 'none';
    if (placeholderBox) placeholderBox.style.display = 'none';
    if (errorBox) errorBox.style.display = 'none';
    if (actionsBar) actionsBar.style.display = 'none';
  } else {
    if (loadingBox) loadingBox.style.display = 'none';
  }
}

function setPortraitError(errorMsg) {
  const loadingBox = document.getElementById('portrait-loading');
  const errorBox = document.getElementById('portrait-error');
  const errorMsgEl = document.getElementById('portrait-error-msg');
  const placeholderBox = document.getElementById('portrait-placeholder');
  const displayBox = document.getElementById('portrait-display');
  const actionsBar = document.getElementById('portrait-actions-bar');

  if (loadingBox) loadingBox.style.display = 'none';
  if (displayBox) displayBox.style.display = 'none';
  if (placeholderBox) placeholderBox.style.display = 'none';
  if (actionsBar) actionsBar.style.display = 'none';

  if (errorBox) {
    errorBox.style.display = 'flex';
    if (errorMsgEl) errorMsgEl.textContent = errorMsg;
  }
}

function dismissPortraitError() {
  const inst = getInstanceById(activeInstanceId);
  renderPortrait(inst?.portrait || null);
}

function openPortraitModal() {
  const inst = getInstanceById(activeInstanceId);
  if (!inst) {
    alert('Vælg eller opret venligst en karakter først.');
    return;
  }

  const modal = document.getElementById('portrait-modal');
  const settingInput = document.getElementById('gemini-user-setting');
  const extraDescInput = document.getElementById('portrait-extra-desc');
  const promptInput = document.getElementById('portrait-prompt-input');
  const errorBox = document.getElementById('modal-error-box');

  if (!modal) return;

  if (settingInput) {
    settingInput.value = getStoredGeminiApiKey();
  }

  const savedExtra = inst.portrait_extra_desc || '';
  if (extraDescInput) {
    extraDescInput.value = savedExtra;
  }
  const styleInput = document.getElementById('portrait-style');
  const savedStyle = PORTRAIT_STYLE_PRESETS[inst.portrait_style] ? inst.portrait_style : DEFAULT_PORTRAIT_STYLE;
  if (styleInput) {
    styleInput.value = savedStyle;
  }

  isUserEditingPrompt = false;
  if (promptInput) {
    promptInput.value = buildCharacterPrompt(inst, savedExtra, savedStyle);
  }

  if (errorBox) {
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  }

  modal.style.display = 'flex';

  if (settingInput && !settingInput.value) {
    settingInput.focus();
  } else if (extraDescInput) {
    extraDescInput.focus();
  }
}

function closePortraitModal() {
  const modal = document.getElementById('portrait-modal');
  if (modal) modal.style.display = 'none';
}

function toggleApiKeyVisibility() {
  const input = document.getElementById('gemini-user-setting');
  const btn = document.getElementById('toggle-key-visibility');
  if (!input || !btn) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Skjul';
  } else {
    input.type = 'password';
    btn.textContent = 'Vis';
  }
}

function resetPromptToDefault() {
  const inst = getInstanceById(activeInstanceId);
  if (!inst) return;
  const extraDesc = document.getElementById('portrait-extra-desc')?.value || '';
  const promptInput = document.getElementById('portrait-prompt-input');
  if (promptInput) {
    promptInput.value = buildCharacterPrompt(inst, extraDesc, document.getElementById('portrait-style')?.value || DEFAULT_PORTRAIT_STYLE);
  }
  isUserEditingPrompt = false;
}

function onExtraDescChange() {
  if (isUserEditingPrompt) return;
  const inst = getInstanceById(activeInstanceId);
  if (!inst) return;
  const extraDesc = document.getElementById('portrait-extra-desc')?.value || '';
  const promptInput = document.getElementById('portrait-prompt-input');
  if (promptInput) {
    promptInput.value = buildCharacterPrompt(inst, extraDesc, document.getElementById('portrait-style')?.value || DEFAULT_PORTRAIT_STYLE);
  }
}

async function submitGeneratePortrait() {
  const settingInput = document.getElementById('gemini-user-setting');
  const promptInput = document.getElementById('portrait-prompt-input');
  const extraDescInput = document.getElementById('portrait-extra-desc');
  const errorBox = document.getElementById('modal-error-box');

  const apiVal = (settingInput?.value || '').trim();
  const prompt = (promptInput?.value || '').trim();
  const extraDesc = (extraDescInput?.value || '').trim();
  const style = document.getElementById('portrait-style')?.value || DEFAULT_PORTRAIT_STYLE;

  if (!apiVal) {
    if (errorBox) {
      errorBox.textContent = 'Indtast venligst din Google Gemini API-nøgle for at generere et portræt.';
      errorBox.style.display = 'block';
    }
    if (settingInput) settingInput.focus();
    return;
  }

  if (!prompt) {
    if (errorBox) {
      errorBox.textContent = 'Prompten må ikke være tom.';
      errorBox.style.display = 'block';
    }
    return;
  }

  setStoredGeminiApiKey(apiVal);

  const inst = getInstanceById(activeInstanceId);
  if (inst) {
    inst.portrait_extra_desc = extraDesc;
    inst.portrait_style = style;
    const list = getAllInstances();
    const idx = list.findIndex(x => x.instance_id === activeInstanceId);
    if (idx !== -1) {
      list[idx].portrait_extra_desc = extraDesc;
      list[idx].portrait_style = style;
      saveAllInstances(list);
    }
  }

  closePortraitModal();
  setPortraitLoading(true);

  try {
    const rawDataUrl = await callGeminiImageApi(apiVal, prompt);
    const compressedDataUrl = await compressImage(rawDataUrl, 360, 0.85);

    const list = getAllInstances();
    const idx = list.findIndex(x => x.instance_id === activeInstanceId);
    if (idx !== -1) {
      list[idx].portrait = compressedDataUrl;
      try {
        saveAllInstances(list);
      } catch (quotaErr) {
        if (quotaErr.name === 'QuotaExceededError') {
          alert('Lagerpladsen i din browser (localStorage) er fuld. Billedet vises på arket, men kunne ikke gemmes permanent.');
        }
      }
      renderSavedInstancesList();
    }
    renderPortrait(compressedDataUrl);
  } catch (err) {
    console.error('Portrait generation failed:', err);
    setPortraitError(err.message || 'Der opstod en uventet fejl under genereringen.');
  }
}

function removePortrait() {
  if (!confirm('Vil du fjerne portrættet for denne karakter?')) return;
  if (!activeInstanceId) return;

  const list = getAllInstances();
  const idx = list.findIndex(x => x.instance_id === activeInstanceId);
  if (idx !== -1) {
    delete list[idx].portrait;
    saveAllInstances(list);
    renderSavedInstancesList();
  }
  renderPortrait(null);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    openPremadeCharactersPrintView,
    closePremadeCharactersPrintView,
    buildPremadeSheetClone,
    applyHpChange,
    DEFAULT_GEMINI_IMAGE_MODEL,
    GEMINI_KEY_STORAGE_NAME,
    buildCharacterPrompt,
    callGeminiImageApi,
    compressImage,
    getStoredGeminiApiKey,
    setStoredGeminiApiKey,
    renderPortrait,
    setPortraitLoading,
    setPortraitError
  };
}
