// js/audit.js — Journal immuable des opérations de pointage de cotisations
// FO Métaux Valeo Amiens — lecture seule pour admin, secrétaire, trésorier

const AuditLog = (() => {
  const KEY = 'fo_audit_log';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  }

  function add(entry) {
    const log = getAll();
    log.unshift({
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ts: new Date().toISOString(),
      auteur: entry.auteur || '—',
      role: entry.role || '—',
      action: entry.action || 'inconnu',
      adherent: entry.adherent || null,
      montant: (entry.montant !== null && entry.montant !== undefined) ? parseFloat(entry.montant) : null,
      mois: entry.mois || null,
      details: entry.details || null,
    });
    // Conserver max 2000 entrées (FIFO)
    if (log.length > 2000) log.splice(2000);
    localStorage.setItem(KEY, JSON.stringify(log));
  }

  const ACTION_META = {
    'valide_auto':    { label: 'Pointage automatique', color: '#28a745', icon: 'fa-check-circle' },
    'valide_manuel':  { label: 'Validation manuelle',  color: '#007bff', icon: 'fa-user-check' },
    'attribution':    { label: 'Attribution adhérent', color: '#6f42c1', icon: 'fa-user-tag' },
    'repartition':    { label: 'Répartition chèque',   color: '#fd7e14', icon: 'fa-cut' },
    'modif_pointage': { label: 'Modification pointage', color: '#dc3545', icon: 'fa-edit' },
    'import':         { label: 'Import relevé',         color: '#17a2b8', icon: 'fa-file-import' },
  };

  function render(containerId, opts) {
    opts = opts || {};
    const container = document.getElementById(containerId);
    if (!container) return;

    const log = getAll();
    const max = opts.max || 500;
    const filterText = (opts.filterText || '').toLowerCase().trim();

    let entries = filterText
      ? log.filter(e =>
          (e.adherent || '').toLowerCase().includes(filterText) ||
          (e.auteur   || '').toLowerCase().includes(filterText) ||
          (e.details  || '').toLowerCase().includes(filterText) ||
          (e.action   || '').toLowerCase().includes(filterText))
      : log;
    entries = entries.slice(0, max);

    if (!entries.length) {
      container.innerHTML = '<p style="color:#aaa;text-align:center;padding:32px;"><i class="fas fa-history" style="font-size:2rem;margin-bottom:8px;display:block;opacity:.3;"></i>Aucune opération tracée pour le moment.</p>';
      return;
    }

    container.innerHTML = `
      <div class="table-container" style="max-height:520px;overflow-y:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:.82rem;">
          <thead style="position:sticky;top:0;background:#f5f5f5;z-index:2;">
            <tr>
              <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #ddd;white-space:nowrap;">Date / Heure</th>
              <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #ddd;">Auteur</th>
              <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #ddd;">Action</th>
              <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #ddd;">Adhérent</th>
              <th style="padding:8px 10px;text-align:right;border-bottom:2px solid #ddd;">Montant</th>
              <th style="padding:8px 10px;text-align:left;border-bottom:2px solid #ddd;">Détails</th>
            </tr>
          </thead>
          <tbody>
            ${entries.map(e => {
              const dt = new Date(e.ts);
              const dateStr = dt.toLocaleDateString('fr-FR') + ' ' + dt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
              const act = ACTION_META[e.action] || { label: e.action, color: '#666', icon: 'fa-circle' };
              const montantStr = (e.montant !== null && e.montant !== undefined)
                ? e.montant.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
                : '—';
              return `<tr style="border-bottom:1px solid #f5f5f5;">
                <td style="padding:7px 10px;color:#777;white-space:nowrap;font-size:.78rem;">${dateStr}</td>
                <td style="padding:7px 10px;font-weight:600;">${e.auteur}<br><small style="color:#aaa;font-weight:400;">${e.role}</small></td>
                <td style="padding:7px 10px;">
                  <span style="display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:12px;background:${act.color}18;color:${act.color};font-size:.76rem;font-weight:700;white-space:nowrap;">
                    <i class="fas ${act.icon}"></i>${act.label}
                  </span>
                </td>
                <td style="padding:7px 10px;max-width:160px;font-size:.82rem;">${e.adherent || '—'}</td>
                <td style="padding:7px 10px;text-align:right;font-weight:700;color:${e.montant ? '#28a745' : '#999'};">${montantStr}</td>
                <td style="padding:7px 10px;color:#666;font-size:.76rem;max-width:240px;">${e.details || ''}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid #f0f0f0;">
        <span style="font-size:.76rem;color:#aaa;">
          <i class="fas fa-lock" style="margin-right:4px;"></i>Journal en lecture seule · ${entries.length} entrée(s) affichée(s) sur ${log.length} au total
        </span>
        <button class="btn btn-sm btn-outline-red" onclick="AuditLog.exportCSV()">
          <i class="fas fa-download"></i> Export CSV journal
        </button>
      </div>`;
  }

  function exportCSV() {
    const log = getAll();
    if (!log.length) return alert('Journal vide — aucune donnée à exporter.');
    const rows = [['Date', 'Heure', 'Auteur', 'Rôle', 'Action', 'Adhérent', 'Montant (€)', 'Détails']];
    log.forEach(e => {
      const dt = new Date(e.ts);
      rows.push([
        dt.toLocaleDateString('fr-FR'),
        dt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        e.auteur || '',
        e.role || '',
        e.action || '',
        e.adherent || '',
        e.montant !== null && e.montant !== undefined ? String(e.montant).replace('.', ',') : '',
        e.details || ''
      ]);
    });
    const csv = rows.map(r => r.map(c => '"' + (c + '').replace(/"/g, '""') + '"').join(';')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,﻿' + encodeURIComponent(csv);
    a.download = 'journal_pointage_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
  }

  return { add, getAll, render, exportCSV };
})();
