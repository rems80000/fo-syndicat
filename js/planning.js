/**
 * planning.js — Gestion du planning des activités FO Métaux Valeo Amiens
 *
 * Stockage : localStorage → clé 'fo_planning'
 * Géré par la secrétaire depuis admin.html
 * Affiché sur index.html (cette semaine / ce mois) et dans les espaces adhérents
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types d'événements
// ─────────────────────────────────────────────────────────────────────────────
const PLANNING_TYPES = {
  permanence:    { label: 'Permanence FO',   icon: 'fa-handshake',      color: '#28a745', bg: '#f0fff4' },
  reunion_fo:    { label: 'Réunion FO',      icon: 'fa-users',          color: '#cc0000', bg: '#fff5f5' },
  reunion_cse:   { label: 'Réunion CSE',     icon: 'fa-building',       color: '#007bff', bg: '#f0f4ff' },
  formation:     { label: 'Formation',       icon: 'fa-graduation-cap', color: '#6f42c1', bg: '#f8f0ff' },
  manifestation: { label: 'Manifestation',   icon: 'fa-fist-raised',    color: '#fd7e14', bg: '#fff8f0' },
  ud_fo:         { label: 'UD FO Picardie',  icon: 'fa-map-marker-alt', color: '#20c997', bg: '#f0fffc' },
  federation:    { label: 'Fédération FO',   icon: 'fa-sitemap',        color: '#6c3483', bg: '#fdf0ff' },
  evenement:     { label: 'Événement',       icon: 'fa-star',           color: '#e83e8c', bg: '#fff0f7' },
  autre:         { label: 'Autre',           icon: 'fa-calendar-alt',   color: '#6c757d', bg: '#f8f9fa' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Permanences récurrentes (mercredi 12h–13h) — générées dynamiquement
// ─────────────────────────────────────────────────────────────────────────────
function genPermanences(nbWeeks = 12) {
  const list = [];
  const today = new Date();
  // Prochain mercredi (ou aujourd'hui si on est mercredi)
  const day = today.getDay(); // 0=dim, 3=mer
  const daysUntilWed = (3 - day + 7) % 7;
  const first = new Date(today);
  first.setDate(today.getDate() + (daysUntilWed === 0 ? 7 : daysUntilWed));
  first.setHours(0, 0, 0, 0);

  for (let i = 0; i < nbWeeks; i++) {
    const d = new Date(first);
    d.setDate(first.getDate() + i * 7);
    const iso = d.toISOString().substring(0, 10);
    list.push({
      id: `perm_${iso}`,
      titre: 'Permanence syndicale FO',
      date: iso,
      heure: '12:00',
      heureFin: '13:00',
      lieu: 'Bureau FO – Site Valeo Amiens',
      type: 'permanence',
      description: 'Permanence hebdomadaire ouverte à tous les salariés. Renseignements, conseils juridiques, questions cotisations.',
      source: 'FO Métaux Valeo Amiens',
      lien: '',
      recurrent: true,
    });
  }
  return list;
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUD localStorage
// ─────────────────────────────────────────────────────────────────────────────
function getPlanningEvents() {
  try {
    return JSON.parse(localStorage.getItem('fo_planning') || '[]');
  } catch { return []; }
}

function savePlanningEvents(events) {
  localStorage.setItem('fo_planning', JSON.stringify(events));
}

/** Fusionne les permanences auto + les événements manuels, triés par date */
function getAllEvents(includeRecurrent = true) {
  const manual = getPlanningEvents();
  const recurrent = includeRecurrent ? genPermanences(16) : [];
  // Eviter doublons si l'admin a supprimé une permanence
  const deleted = JSON.parse(localStorage.getItem('fo_planning_deleted') || '[]');
  const filteredRec = recurrent.filter(r => !deleted.includes(r.id));
  const all = [...manual, ...filteredRec];
  all.sort((a, b) => (a.date + (a.heure || '')).localeCompare(b.date + (b.heure || '')));
  return all;
}

function deleteRecurrent(id) {
  const del = JSON.parse(localStorage.getItem('fo_planning_deleted') || '[]');
  if (!del.includes(id)) { del.push(id); localStorage.setItem('fo_planning_deleted', JSON.stringify(del)); }
}

function addEvent(ev) {
  const events = getPlanningEvents();
  ev.id = ev.id || `ev_${Date.now()}`;
  events.push(ev);
  events.sort((a, b) => a.date.localeCompare(b.date));
  savePlanningEvents(events);
  return ev;
}

function updateEvent(id, patch) {
  const events = getPlanningEvents();
  const idx = events.findIndex(e => e.id === id);
  if (idx >= 0) { events[idx] = { ...events[idx], ...patch }; savePlanningEvents(events); return true; }
  return false;
}

function deleteEvent(id) {
  if (id.startsWith('perm_')) { deleteRecurrent(id); return; }
  savePlanningEvents(getPlanningEvents().filter(e => e.id !== id));
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilitaires de date
// ─────────────────────────────────────────────────────────────────────────────
function isoToDate(iso) { return new Date(iso + 'T00:00:00'); }

function weekBounds() {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const day = now.getDay();
  const monday = new Date(now); monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6); sunday.setHours(23, 59, 59);
  return { monday, sunday };
}

function monthBounds() {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return { start: now, end };
}

function formatEventDate(iso, heure, heureFin) {
  const d = isoToDate(iso);
  const opts = { weekday: 'long', day: 'numeric', month: 'long' };
  let str = d.toLocaleDateString('fr-FR', opts);
  str = str.charAt(0).toUpperCase() + str.slice(1);
  if (heure) {
    str += ` · ${heure}`;
    if (heureFin) str += `–${heureFin}`;
  }
  return str;
}

function daysUntil(iso) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const ev = isoToDate(iso);
  const diff = Math.round((ev - today) / 86400000);
  if (diff === 0) return '<span style="color:#cc0000;font-weight:700;">Aujourd\'hui</span>';
  if (diff === 1) return '<span style="color:#e67e00;font-weight:700;">Demain</span>';
  if (diff <= 7) return `<span style="color:#007bff;">Dans ${diff} j.</span>`;
  return `<span style="color:#888;">Dans ${diff} jours</span>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rendu d'une carte événement
// ─────────────────────────────────────────────────────────────────────────────
function renderEventCard(ev, showEdit = false) {
  const t = PLANNING_TYPES[ev.type] || PLANNING_TYPES.autre;
  const dateStr = formatEventDate(ev.date, ev.heure, ev.heureFin);
  const dl = daysUntil(ev.date);
  return `
    <div class="plan-card" id="plan-${ev.id}" style="border-left:4px solid ${t.color};background:${t.bg};">
      <div class="plan-card-head">
        <span class="plan-badge" style="background:${t.color}18;color:${t.color};border:1px solid ${t.color}40;">
          <i class="fas ${t.icon}"></i> ${t.label}
        </span>
        <span class="plan-countdown">${dl}</span>
      </div>
      <h4 class="plan-title">${ev.titre}</h4>
      <div class="plan-meta">
        <span><i class="fas fa-calendar-day" style="color:${t.color};"></i> ${dateStr}</span>
        ${ev.lieu ? `<span><i class="fas fa-map-pin" style="color:${t.color};"></i> ${ev.lieu}</span>` : ''}
      </div>
      ${ev.description ? `<p class="plan-desc">${ev.description}</p>` : ''}
      <div class="plan-footer">
        <span class="plan-source">${ev.source || ''}</span>
        <div style="display:flex;gap:6px;align-items:center;">
          ${ev.lien ? `<a href="${ev.lien}" target="_blank" rel="noopener" class="plan-link"><i class="fas fa-external-link-alt"></i> Lien</a>` : ''}
          ${showEdit ? `
            <button onclick="openEditEvent('${ev.id}')" class="btn btn-sm btn-outline-red" style="padding:3px 8px;font-size:.75rem;"><i class="fas fa-edit"></i></button>
            <button onclick="confirmDeleteEvent('${ev.id}')" class="btn btn-sm btn-outline-red" style="padding:3px 8px;font-size:.75rem;color:#dc3545;border-color:#dc3545;"><i class="fas fa-trash"></i></button>
          ` : ''}
        </div>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rendu de la section planning sur la page d'accueil
// ─────────────────────────────────────────────────────────────────────────────
function loadPlanningPublic(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const all = getAllEvents();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const { monday, sunday } = weekBounds();
  const { start: mStart, end: mEnd } = monthBounds();

  const thisWeek = all.filter(e => {
    const d = isoToDate(e.date);
    return d >= monday && d <= sunday;
  });
  const thisMonth = all.filter(e => {
    const d = isoToDate(e.date);
    return d >= mStart && d <= mEnd;
  });
  const upcoming = all.filter(e => isoToDate(e.date) >= today).slice(0, 20);

  container.innerHTML = `
    <div class="plan-tabs" id="planTabs">
      <button class="plan-tab active" onclick="switchPlanTab('week', this)">
        <i class="fas fa-calendar-week"></i> Cette semaine
        <span class="plan-tab-count">${thisWeek.length}</span>
      </button>
      <button class="plan-tab" onclick="switchPlanTab('month', this)">
        <i class="fas fa-calendar-alt"></i> Ce mois
        <span class="plan-tab-count">${thisMonth.length}</span>
      </button>
      <button class="plan-tab" onclick="switchPlanTab('all', this)">
        <i class="fas fa-list"></i> À venir
        <span class="plan-tab-count">${upcoming.length}</span>
      </button>
    </div>
    <div id="planView"></div>`;

  // Données pour les onglets
  window._planData = { week: thisWeek, month: thisMonth, all: upcoming };
  renderPlanView('week');
}

window._planData = {};
function switchPlanTab(tab, btn) {
  document.querySelectorAll('.plan-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPlanView(tab);
}

function renderPlanView(tab) {
  const view = document.getElementById('planView');
  if (!view) return;
  const events = (window._planData[tab] || []);
  if (!events.length) {
    const msgs = {
      week:  'Aucun événement programmé cette semaine.',
      month: 'Aucun événement programmé ce mois-ci.',
      all:   'Aucun événement à venir.',
    };
    view.innerHTML = `<div class="plan-empty">
      <i class="fas fa-calendar-check"></i>
      <p>${msgs[tab] || 'Aucun événement.'}</p>
      <p style="font-size:.82rem;color:#aaa;">Les permanences du mercredi 12h–13h sont maintenues chaque semaine.</p>
    </div>`;
    return;
  }

  // Grouper par date
  const groups = {};
  events.forEach(e => {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  });

  view.innerHTML = Object.entries(groups).map(([date, evs]) => {
    const d = isoToDate(date);
    const dayLabel = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const isToday = date === new Date().toISOString().substring(0, 10);
    return `
      <div class="plan-day-group">
        <div class="plan-day-label ${isToday ? 'plan-day-today' : ''}">
          <span>${dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1)}</span>
          ${isToday ? '<span class="plan-today-badge">Aujourd\'hui</span>' : ''}
        </div>
        <div class="plan-day-events">
          ${evs.map(e => renderEventCard(e, false)).join('')}
        </div>
      </div>`;
  }).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// Rendu compact (widget espaces adhérents / admin)
// ─────────────────────────────────────────────────────────────────────────────
function loadPlanningWidget(containerId, max = 5) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const events = getAllEvents().filter(e => isoToDate(e.date) >= today).slice(0, max);
  if (!events.length) {
    container.innerHTML = '<p style="color:#aaa;font-size:.85rem;padding:8px 0;">Aucun événement à venir.</p>';
    return;
  }
  container.innerHTML = events.map(ev => {
    const t = PLANNING_TYPES[ev.type] || PLANNING_TYPES.autre;
    const d = isoToDate(ev.date);
    const dateStr = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
    return `<div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid #f0f0f0;">
      <div style="text-align:center;min-width:42px;background:${t.bg};border-radius:8px;padding:6px 4px;border:1px solid ${t.color}30;">
        <i class="fas ${t.icon}" style="color:${t.color};font-size:.85rem;display:block;margin-bottom:2px;"></i>
        <span style="font-size:.68rem;font-weight:700;color:${t.color};white-space:nowrap;">${dateStr}</span>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:.84rem;font-weight:700;color:#1a1a2e;line-height:1.3;">${ev.titre}</div>
        ${ev.heure ? `<div style="font-size:.75rem;color:#888;">${ev.heure}${ev.heureFin?'–'+ev.heureFin:''} ${ev.lieu?'· '+ev.lieu:''}</div>` : (ev.lieu ? `<div style="font-size:.75rem;color:#888;">${ev.lieu}</div>` : '')}
      </div>
    </div>`;
  }).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// Gestion ADMIN (appelé depuis admin.html)
// ─────────────────────────────────────────────────────────────────────────────
function loadPlanningAdmin(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const all = getAllEvents();
  const future = all.filter(e => isoToDate(e.date) >= today);
  const past   = all.filter(e => isoToDate(e.date) < today).reverse().slice(0, 5);

  container.innerHTML = `
    <div style="margin-bottom:12px;">
      <strong style="font-size:.85rem;color:#666;">PROCHAINS ÉVÉNEMENTS</strong>
    </div>
    ${future.length ? future.map(e => renderEventCard(e, true)).join('') :
      '<p style="color:#aaa;font-size:.88rem;padding:12px 0;">Aucun événement à venir (hormis les permanences auto-générées).</p>'}
    ${past.length ? `
    <div style="margin:16px 0 8px;"><strong style="font-size:.85rem;color:#aaa;">PASSÉS (5 derniers)</strong></div>
    ${past.map(e => `<div style="opacity:.5;">${renderEventCard(e, false)}</div>`).join('')}
    ` : ''}`;
}

function confirmDeleteEvent(id) {
  const all = getAllEvents();
  const ev  = all.find(e => e.id === id);
  if (!ev) return;
  if (!confirm(`Supprimer "${ev.titre}" (${ev.date}) ?`)) return;
  deleteEvent(id);
  // Refresh
  if (document.getElementById('adminPlanningList')) loadPlanningAdmin('adminPlanningList');
  if (typeof toastPlanning === 'function') toastPlanning('Événement supprimé', '#dc3545');
  else if (typeof toast === 'function') toast('Événement supprimé', '#dc3545');
}

let _editingEventId = null;

function openAddEvent() {
  _editingEventId = null;
  resetEventForm();
  document.getElementById('modalEventTitle').textContent = 'Nouvel événement';
  document.getElementById('modalEvent').style.display = 'flex';
}

function openEditEvent(id) {
  const all = getAllEvents();
  const ev  = all.find(e => e.id === id);
  if (!ev) return;
  _editingEventId = id;
  document.getElementById('modalEventTitle').textContent = 'Modifier l\'événement';
  document.getElementById('evTitre').value     = ev.titre      || '';
  document.getElementById('evDate').value      = ev.date       || '';
  document.getElementById('evHeure').value     = ev.heure      || '';
  document.getElementById('evHeureFin').value  = ev.heureFin   || '';
  document.getElementById('evLieu').value      = ev.lieu       || '';
  document.getElementById('evType').value      = ev.type       || 'autre';
  document.getElementById('evDescription').value = ev.description || '';
  document.getElementById('evSource').value    = ev.source     || '';
  document.getElementById('evLien').value      = ev.lien       || '';
  document.getElementById('modalEvent').style.display = 'flex';
}

function resetEventForm() {
  ['evTitre','evDate','evHeure','evHeureFin','evLieu','evDescription','evSource','evLien'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const sel = document.getElementById('evType');
  if (sel) sel.value = 'permanence';
}

function saveEventForm() {
  const titre = document.getElementById('evTitre').value.trim();
  const date  = document.getElementById('evDate').value;
  if (!titre || !date) {
    if (typeof toast === 'function') toast('Titre et date obligatoires', '#dc3545');
    return;
  }
  const ev = {
    titre,
    date,
    heure:       document.getElementById('evHeure').value.trim(),
    heureFin:    document.getElementById('evHeureFin').value.trim(),
    lieu:        document.getElementById('evLieu').value.trim(),
    type:        document.getElementById('evType').value || 'autre',
    description: document.getElementById('evDescription').value.trim(),
    source:      document.getElementById('evSource').value.trim(),
    lien:        document.getElementById('evLien').value.trim(),
  };

  if (_editingEventId) {
    // Si on édite une permanence récurrente → créer un événement manuel qui "remplace"
    if (_editingEventId.startsWith('perm_')) {
      deleteRecurrent(_editingEventId);
      addEvent(ev);
    } else {
      updateEvent(_editingEventId, ev);
    }
    if (typeof toast === 'function') toast('✅ Événement modifié');
  } else {
    addEvent(ev);
    if (typeof toast === 'function') toast('✅ Événement ajouté');
  }

  closeEventModal();
  if (document.getElementById('adminPlanningList')) loadPlanningAdmin('adminPlanningList');
}

function closeEventModal() {
  const m = document.getElementById('modalEvent');
  if (m) m.style.display = 'none';
}

// Export planning CSV
function exportPlanning() {
  const events = getAllEvents();
  const rows = [['Titre','Date','Heure','Heure fin','Lieu','Type','Description','Source','Lien'],
    ...events.map(e => [e.titre, e.date, e.heure||'', e.heureFin||'', e.lieu||'',
      (PLANNING_TYPES[e.type]||{}).label||e.type, e.description||'', e.source||'', e.lien||''])
  ];
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(';')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,﻿' + encodeURIComponent(csv);
  a.download = 'planning_fo_valeo.csv';
  a.click();
}
