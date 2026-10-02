let activeInstanceId = null;

window.addEventListener('DOMContentLoaded', () => {
  populateDropdown();
  renderSavedInstancesList();
  renderRulesView();
  ['f-gp', 'f-sp', 'f-cp'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => updateInventorySummary());
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

  document.getElementById('f-name').textContent = inst.character_name;
  document.getElementById('f-class-meta').textContent = `Level ${inst.level} ${inst.class} | ${inst.ancestry} | ${inst.background}`;
  document.getElementById('f-quote').textContent = `"${inst.quote}"`;
  document.getElementById('f-player').value = inst.player_name || '';

  document.getElementById('f-hp').value = inst.hp;
  document.getElementById('f-hp-max').textContent = inst.hp_max;
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

  syncPrintMirrors();
  switchView('sheet');
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
    status = `Overbelastet · ${totals.used - capacity} slots over grænsen · Ulempe på STY- og BEV-checks samt saves`;
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

  container.innerHTML = `
    <h3>${r.actions.title}</h3>
    <p>${r.actions.desc}</p>
    <ul>${r.actions.items.map(i => `<li>${i}</li>`).join('')}</ul>
    <div class="rules-box">
      <strong>${r.actions.refreshNote}</strong>
    </div>

    <h3>${r.attacks.title}</h3>
    <p>${r.attacks.desc}</p>
    <ul>${r.attacks.items.map(i => `<li>${i}</li>`).join('')}</ul>

    <h3>${r.defense.title}</h3>
    <p>${r.defense.desc}</p>
    <ul>${r.defense.items.map(i => `<li>${i}</li>`).join('')}</ul>

    <h3>${r.saves.title}</h3>
    <p>${r.saves.desc}</p>
    <ul>${r.saves.items.map(i => `<li>${i}</li>`).join('')}</ul>

    <h3>${r.dying.title}</h3>
    <p>${r.dying.desc}</p>
    <ul>${r.dying.items.map(i => `<li>${i}</li>`).join('')}</ul>

    <h3>${r.inventory.title}</h3>
    <p>${r.inventory.desc}</p>
    <ul>${r.inventory.items.map(i => `<li>${i}</li>`).join('')}</ul>
  `;
}
