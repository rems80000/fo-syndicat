/**
 * Flash Info — actualités rapides pour opérateurs de l'industrie
 * métallurgique / automobile / Hauts-de-France · Somme · Picardie
 *
 * Types : alerte | info | conseil | juridique | region | sante
 */

const FLASH_INFO = [
  // ── CCN Métallurgie ──────────────────────────────────────────────
  {
    id: 'fi01', date: '2026-04-25', type: 'juridique',
    titre: 'CCN Métallurgie 2026 : nouvelle grille de salaires minima',
    texte: 'Depuis le 1er janvier 2026, la nouvelle convention collective nationale de la Métallurgie impose une grille de minima révisée. Vérifiez que votre coefficient et votre salaire sont bien conformes — contactez votre délégué FO si vous avez le moindre doute.',
    lien: 'https://www.fo-metaux.fr',
    source: 'FO Métaux',
  },
  {
    id: 'fi02', date: '2026-04-18', type: 'conseil',
    titre: 'Recoté ? Votre classification a peut-être changé',
    texte: 'La CCN Métallurgie entrée en vigueur en 2024 a introduit un nouveau système de pesée des emplois (6 critères). Beaucoup de postes d\'opérateurs n\'ont pas encore été correctement requalifiés. Demandez à votre employeur le détail de la pesée de votre poste.',
    lien: null,
    source: 'CCN Métallurgie',
  },
  {
    id: 'fi03', date: '2026-04-10', type: 'info',
    titre: 'Temps de trajet domicile-travail : ce qui a changé',
    texte: 'La CCN Métallurgie 2024 précise que le temps de déplacement domicile-lieu de travail habituel n\'est pas du temps de travail effectif, mais tout dépassement lors de déplacements professionnels doit être compensé. Renseignez-vous si vous effectuez des missions hors site.',
    lien: null,
    source: 'CCN Métallurgie',
  },

  // ── Valeo / Amiens ───────────────────────────────────────────────
  {
    id: 'fi04', date: '2026-04-22', type: 'region',
    titre: 'Valeo Amiens : vigilance sur la transition électrique',
    texte: 'Les résultats mondiaux du groupe Valeo au T1 2026 maintiennent une pression sur les sites européens dans un contexte de transition vers les véhicules électriques. FO Métaux suit de près les annonces concernant le site d\'Amiens et ses effectifs.',
    lien: 'https://www.fo-metaux.fr',
    source: 'FO Métaux Valeo Amiens',
  },
  {
    id: 'fi05', date: '2026-04-15', type: 'alerte',
    titre: 'Projet de réorganisation de nuit — FO demande une réunion d\'urgence',
    texte: 'FO Métaux Valeo Amiens a demandé la tenue d\'une réunion extraordinaire du CSE suite au projet de réorganisation des équipes de nuit. Nous exigeons une consultation complète avant toute mise en œuvre. Rejoignez-nous à la permanence du mercredi 12h–13h.',
    lien: null,
    source: 'FO Métaux Valeo Amiens',
  },

  // ── Secteur auto Hauts-de-France ─────────────────────────────────
  {
    id: 'fi06', date: '2026-04-20', type: 'region',
    titre: 'Stellantis Douvrin (62) : accord de maintien dans l\'emploi prolongé',
    texte: 'L\'accord de performance collective signé à l\'usine de Douvrin est prolongé jusqu\'en 2027, maintenant les effectifs actuels en échange d\'adaptations des horaires. Une décision surveillée de près par les syndicats de la région.',
    lien: null,
    source: 'Actualité HdF',
  },
  {
    id: 'fi07', date: '2026-04-12', type: 'region',
    titre: 'Toyota Valenciennes (TPCA) : production Yaris Cross en hausse',
    texte: 'Le site TPCA de Valenciennes affiche une hausse de 8 % de production au T1 2026 grâce au Yaris Cross hybride. Les effectifs sont stabilisés à 2 800 salariés. Un signal positif pour l\'emploi industriel du Hainaut.',
    lien: null,
    source: 'Actualité HdF',
  },
  {
    id: 'fi08', date: '2026-04-05', type: 'region',
    titre: 'Renault Douai/Maubeuge : 1 000 recrutements prévus pour l\'électrique',
    texte: 'L\'usine de Douai (ElectriCity) prévoit 1 000 embauches en 2026 pour la production de véhicules 100 % électriques sous la marque Ampere. Des formations CAP/BTS en électrotechnique sont financées par la Région Hauts-de-France.',
    lien: null,
    source: 'Actualité HdF',
  },

  // ── Droits salariés ──────────────────────────────────────────────
  {
    id: 'fi09', date: '2026-04-17', type: 'info',
    titre: 'Prime de partage de la valeur (PPV) : vérifiez vos droits',
    texte: 'Depuis la loi du 29 novembre 2023, toutes les entreprises de 11 à 49 salariés réalisant du bénéfice doivent négocier ou mettre en place un dispositif de partage de la valeur. Pour les +50 salariés, la PPV est obligatoirement proposée aux salariés. Montant exonéré de charges : jusqu\'à 3 000 € (6 000 € avec accord d\'intéressement).',
    lien: null,
    source: 'Code du travail',
  },
  {
    id: 'fi10', date: '2026-04-08', type: 'juridique',
    titre: 'Intérim : après 18 mois, vous pouvez exiger un CDI',
    texte: 'La règle est ferme : après 18 mois de mission d\'intérim sur le même poste de travail (hors remplacement congé maternité/maladie), l\'employeur est en faute. Vous pouvez saisir le Conseil de Prud\'hommes pour requalification en CDI avec rappel de salaires.',
    lien: null,
    source: 'Code du travail – Art. L.1251-40',
  },
  {
    id: 'fi11', date: '2026-04-02', type: 'info',
    titre: 'SMIC au 1er novembre 2025 : 1 801,80 € brut/mois',
    texte: 'Le SMIC a été revalorisé à 1 801,80 € brut mensuel (base 35h) depuis le 1er novembre 2025, soit 11,88 € brut/heure. Tout salarié payé en-dessous est en droit d\'exiger un rappel de salaire. Vérifiez votre bulletin de paie !',
    lien: null,
    source: 'DARES / Gouvernement',
  },
  {
    id: 'fi12', date: '2026-03-28', type: 'conseil',
    titre: 'CPF : participez à votre formation sans avancer 100 €',
    texte: 'Depuis mai 2024, une participation de 100 € est exigée pour les formations CPF, SAUF si un accord de branche ou d\'entreprise en dispense le salarié. Dans la Métallurgie, vérifiez si votre accord d\'entreprise prévoit cette dispense avant de payer.',
    lien: null,
    source: 'France Compétences',
  },
  {
    id: 'fi13', date: '2026-03-20', type: 'conseil',
    titre: 'Forfait mobilités durables : cumulez les avantages',
    texte: 'Vous venez au travail à vélo, trottinette ou covoiturage ? Le forfait mobilités durables (jusqu\'à 700 €/an exonéré) est cumulable avec le remboursement 50 % de votre abonnement transport en commun. Demandez à votre employeur si ce forfait est en place dans votre accord d\'entreprise.',
    lien: null,
    source: 'Code du travail',
  },

  // ── Santé au travail ─────────────────────────────────────────────
  {
    id: 'fi14', date: '2026-04-14', type: 'sante',
    titre: 'Bruit en usine : vos droits et les seuils légaux',
    texte: 'En France, le seuil d\'action est fixé à 80 dB(A) sur 8h — votre employeur doit vous informer et vous proposer des protections. Au-delà de 85 dB(A), le port des EPI (bouchons, casques) est OBLIGATOIRE. En cas de non-respect, signalez-le à votre représentant FO ou à l\'Inspection du travail.',
    lien: null,
    source: 'Code du travail – R.4432',
  },
  {
    id: 'fi15', date: '2026-04-07', type: 'sante',
    titre: 'TMS : 1 salarié sur 2 en industrie est touché',
    texte: 'Les troubles musculo-squelettiques sont la 1ère cause d\'arrêt de travail en industrie métallurgique. FO rappelle que le Document Unique d\'Évaluation des Risques Professionnels (DUERP) doit être mis à jour annuellement et accessible à tout salarié. Consultez-le ou exigez-y l\'accès.',
    lien: null,
    source: 'CARSAT Hauts-de-France',
  },
  {
    id: 'fi16', date: '2026-03-15', type: 'sante',
    titre: 'Médecine du travail : vous pouvez demander une visite à tout moment',
    texte: 'Tout salarié peut solliciter une visite spontanée auprès du Service de Prévention et de Santé au Travail (SPST) à tout moment, sans passer par l\'employeur. Ce droit est garanti par la loi et ne peut pas vous être refusé. Contactez directement votre SPST.',
    lien: null,
    source: 'Code du travail – L.4624-1',
  },
  {
    id: 'fi17', date: '2026-03-05', type: 'sante',
    titre: 'Exposition aux solvants en atelier : le point réglementaire',
    texte: 'Toluène, xylène, MEK… De nombreux produits utilisés en atelier sont classés CMR (cancérogènes, mutagènes, reprotoxiques). L\'employeur a une obligation de substitution ou, à défaut, de mise à disposition d\'EPI adaptés. Demandez les Fiches de Données de Sécurité (FDS) des produits que vous manipulez.',
    lien: null,
    source: 'INRS / Code du travail',
  },

  // ── Discrimination / Défense syndicale ───────────────────────────
  {
    id: 'fi18', date: '2026-04-03', type: 'alerte',
    titre: 'Discrimination syndicale : tolérance zéro, recours possibles',
    texte: 'Tout salarié pénalisé (évolution de carrière, mutation, sanctions) en raison de son appartenance ou de son activité syndicale peut saisir les Prud\'hommes. La charge de la preuve est partagée : vous devez présenter des faits laissant supposer la discrimination, l\'employeur doit prouver des raisons objectives.',
    lien: null,
    source: 'Code du travail – L.1132-1',
  },
  {
    id: 'fi19', date: '2026-03-25', type: 'juridique',
    titre: 'Forfait jours cadres : votre charge de travail doit être suivie',
    texte: 'La Cour de cassation rappelle régulièrement que le forfait jours ne dispense pas l\'employeur d\'un suivi effectif de la charge de travail. Un entretien annuel spécifique est obligatoire. S\'il n\'est pas tenu, le forfait est inopposable et vous pouvez réclamer des heures supplémentaires.',
    lien: null,
    source: 'Cass. soc. – Art. L.3121-60',
  },

  // ── Région / Économie ────────────────────────────────────────────
  {
    id: 'fi20', date: '2026-04-01', type: 'region',
    titre: 'Plan France 2030 : 500 M€ pour l\'industrie Hauts-de-France',
    texte: 'Le CPER 2021-2027 (Contrat de Plan État-Région) prévoit 500 M€ dédiés à la modernisation industrielle et à la formation professionnelle en Hauts-de-France. La métallurgie et la mobilité électrique sont des secteurs prioritaires. Des formations financées à 100 % sont disponibles via les OPCO.',
    lien: null,
    source: 'Région Hauts-de-France',
  },
  {
    id: 'fi21', date: '2026-03-18', type: 'region',
    titre: 'Activité partielle longue durée (APLD) : un filet de sécurité à connaître',
    texte: 'En cas de difficultés économiques durables, l\'APLD permet de réduire le temps de travail jusqu\'à 40 % en contrepartie du maintien de 70 % du salaire net (85 % pour les bas salaires). FO négocie systématiquement les clauses d\'interdiction de licenciements pendant la durée de l\'accord.',
    lien: null,
    source: 'Ministère du Travail',
  },
  {
    id: 'fi22', date: '2026-03-10', type: 'info',
    titre: 'Index égalité femmes-hommes : votre entreprise a-t-elle publié sa note ?',
    texte: 'Toute entreprise de plus de 50 salariés est tenue de publier son index égalité professionnelle avant le 1er mars chaque année. En cas de note inférieure à 75/100, un plan de correction est obligatoire. Consultez la publication sur le site de votre entreprise ou demandez-la à votre CSE.',
    lien: 'https://index-egapro.travail.gouv.fr',
    source: 'Ministère du Travail',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Configuration des types
// ─────────────────────────────────────────────────────────────────────────────
const FLASH_TYPES = {
  alerte:   { label: 'Alerte',     icon: 'fa-exclamation-triangle', color: '#dc3545', bg: '#fff5f5', border: '#f5c2c7' },
  info:     { label: 'Info',       icon: 'fa-info-circle',          color: '#0d6efd', bg: '#f0f4ff', border: '#b6d4fe' },
  conseil:  { label: 'Conseil',    icon: 'fa-lightbulb',            color: '#198754', bg: '#f0fff4', border: '#a3cfbb' },
  juridique:{ label: 'Juridique',  icon: 'fa-balance-scale',        color: '#6f42c1', bg: '#f8f0ff', border: '#d3b8ff' },
  region:   { label: 'Région',     icon: 'fa-map-marker-alt',       color: '#fd7e14', bg: '#fff8f0', border: '#ffc69a' },
  sante:    { label: 'Santé',      icon: 'fa-heartbeat',            color: '#20c997', bg: '#f0fffc', border: '#9ef0da' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Fonctions de rendu
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Rendu d'une carte flash info.
 * @param {object} fi  - un élément de FLASH_INFO
 * @param {boolean} compact - mode compact (sans texte long)
 */
function renderFlashCard(fi, compact = false) {
  const t = FLASH_TYPES[fi.type] || FLASH_TYPES.info;
  const date = new Date(fi.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  return `
    <div class="flash-card" style="border-left:4px solid ${t.color};background:${t.bg};">
      <div class="flash-card-head">
        <span class="flash-badge" style="background:${t.color}15;color:${t.color};border:1px solid ${t.border};">
          <i class="fas ${t.icon}"></i> ${t.label}
        </span>
        <span class="flash-date">${date}</span>
      </div>
      <h4 class="flash-title">${fi.titre}</h4>
      ${compact ? '' : `<p class="flash-text">${fi.texte}</p>`}
      <div class="flash-footer">
        <span class="flash-source"><i class="fas fa-tag"></i> ${fi.source}</span>
        ${fi.lien ? `<a href="${fi.lien}" target="_blank" rel="noopener" class="flash-link">En savoir plus <i class="fas fa-arrow-right"></i></a>` : ''}
        ${compact ? `<button onclick="openFlashModal('${fi.id}')" class="flash-link" style="background:none;border:none;cursor:pointer;padding:0;">Lire <i class="fas fa-arrow-right"></i></button>` : ''}
      </div>
    </div>`;
}

/**
 * Injecte la section complète Flash Info dans un conteneur.
 * @param {string} containerId - id de l'élément cible
 * @param {object} opts - { max, showFilter, compact, showTicker }
 */
function loadFlashInfo(containerId, opts = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { max = 6, showFilter = true, compact = false, showTicker = false } = opts;

  // Ticker (bandeau défilant)
  const tickerHtml = showTicker ? buildTicker() : '';

  // Filtres
  const filterHtml = showFilter ? `
    <div class="flash-filters" id="flashFilters">
      <button class="flash-filter-btn active" onclick="filterFlash('', this)">Tout</button>
      ${Object.entries(FLASH_TYPES).map(([k, v]) =>
        `<button class="flash-filter-btn" onclick="filterFlash('${k}', this)" style="--fc:${v.color}">
          <i class="fas ${v.icon}"></i> ${v.label}
        </button>`
      ).join('')}
    </div>` : '';

  container.innerHTML = `
    ${tickerHtml}
    ${filterHtml}
    <div class="flash-grid" id="flashGrid"></div>
    <div style="text-align:center;margin-top:20px;" id="flashMoreWrap">
      <button onclick="showMoreFlash()" class="btn btn-outline-red btn-sm" id="flashMoreBtn">
        <i class="fas fa-chevron-down"></i> Voir plus d'informations
      </button>
    </div>`;

  renderFlashGrid(max, compact);
  buildFlashModal();
}

// État courant du filtre et du nombre affiché
let _flashFilter = '';
let _flashShown  = 6;

function filterFlash(type, btn) {
  _flashFilter = type;
  _flashShown  = 6;
  document.querySelectorAll('.flash-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderFlashGrid(6, false);
}

function showMoreFlash() {
  _flashShown += 6;
  renderFlashGrid(_flashShown, false);
}

function renderFlashGrid(max, compact) {
  const grid = document.getElementById('flashGrid');
  if (!grid) return;
  const items = _flashFilter
    ? FLASH_INFO.filter(f => f.type === _flashFilter)
    : FLASH_INFO;
  const shown = items.slice(0, max);
  grid.innerHTML = shown.map(fi => renderFlashCard(fi, compact)).join('');
  const moreBtn = document.getElementById('flashMoreWrap');
  if (moreBtn) moreBtn.style.display = items.length > max ? 'block' : 'none';
}

// Ticker défilant
function buildTicker() {
  const items = FLASH_INFO.slice(0, 5);
  const text = items.map(fi => {
    const t = FLASH_TYPES[fi.type] || FLASH_TYPES.info;
    return `<span style="margin:0 32px;"><i class="fas ${t.icon}" style="color:${t.color};margin-right:6px;"></i>${fi.titre}</span>`;
  }).join('<span style="color:#cc0000;margin:0 8px;">•</span>');
  return `
    <div class="flash-ticker">
      <span class="flash-ticker-label"><i class="fas fa-bolt"></i> Flash</span>
      <div class="flash-ticker-track">
        <div class="flash-ticker-inner">${text}${text}</div>
      </div>
    </div>`;
}

// Modal détail
function buildFlashModal() {
  if (document.getElementById('flashModal')) return;
  const div = document.createElement('div');
  div.id = 'flashModal';
  div.className = 'modal-overlay';
  div.style.display = 'none';
  div.onclick = e => { if (e.target === div) div.style.display = 'none'; };
  div.innerHTML = `
    <div class="modal-box" style="max-width:640px;">
      <div class="modal-header">
        <h3 id="flashModalTitle" style="font-size:.98rem;"></h3>
        <button onclick="document.getElementById('flashModal').style.display='none'" class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body" id="flashModalBody"></div>
      <div class="modal-footer">
        <a id="flashModalLink" href="#" target="_blank" rel="noopener" class="btn btn-sm btn-red" style="display:none;">
          <i class="fas fa-external-link-alt"></i> Source
        </a>
        <button onclick="document.getElementById('flashModal').style.display='none'" class="btn btn-outline-red">Fermer</button>
      </div>
    </div>`;
  document.body.appendChild(div);
}

function openFlashModal(id) {
  const fi = FLASH_INFO.find(f => f.id === id);
  if (!fi) return;
  const t = FLASH_TYPES[fi.type] || FLASH_TYPES.info;
  const date = new Date(fi.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('flashModalTitle').innerHTML =
    `<span style="color:${t.color};margin-right:8px;"><i class="fas ${t.icon}"></i></span>${fi.titre}`;
  document.getElementById('flashModalBody').innerHTML = `
    <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
      <span class="flash-badge" style="background:${t.color}15;color:${t.color};border:1px solid ${t.border};">
        <i class="fas ${t.icon}"></i> ${t.label}
      </span>
      <span style="font-size:.82rem;color:#888;"><i class="fas fa-calendar-alt"></i> ${date}</span>
      <span style="font-size:.82rem;color:#888;"><i class="fas fa-tag"></i> ${fi.source}</span>
    </div>
    <p style="font-size:.92rem;line-height:1.7;color:#333;">${fi.texte}</p>`;
  const linkEl = document.getElementById('flashModalLink');
  if (fi.lien) { linkEl.href = fi.lien; linkEl.style.display = 'inline-flex'; }
  else { linkEl.style.display = 'none'; }
  document.getElementById('flashModal').style.display = 'flex';
}
