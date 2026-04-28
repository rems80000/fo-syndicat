/* Main frontend application logic */

// ── NAVIGATION ──
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// ── CHATBOT ──
function toggleChatbot() {
  const panel = document.getElementById('chatbotPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}
document.getElementById('chatbotToggle')?.addEventListener('click', toggleChatbot);

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  addChatMsg(msg, 'user');
  input.value = '';
  setTimeout(() => {
    const reply = getChatbotReply(msg);
    addChatMsg(reply, 'bot');
  }, 600);
}
document.getElementById('chatInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });

function addChatMsg(text, type) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function getChatbotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('cotis') || m.includes('cotisation')) return 'Pour consulter vos cotisations, connectez-vous à votre espace adhérent.';
  if (m.includes('contact') || m.includes('joindre')) return 'Vous pouvez nous contacter à fo.metaux.valeo.amiens@gmail.com ou lors de nos permanences le mercredi 12h–13h.';
  if (m.includes('adhér') || m.includes('adherer') || m.includes('rejoindre')) return 'Pour adhérer à FO Métaux, remplissez le formulaire de contact en bas de page ou contactez-nous directement.';
  if (m.includes('document') || m.includes('statut')) return 'Les documents sont accessibles depuis votre espace personnel selon votre niveau d\'accès.';
  if (m.includes('bonjour') || m.includes('salut') || m.includes('hello')) return '👋 Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
  return 'Je vous invite à consulter votre espace adhérent ou à nous contacter directement pour plus d\'informations.';
}

// ── TIMELINE RÉSEAUX SOCIAUX + PUBLICATIONS FÉDÉRALES ──
const ALL_POSTS = [
  // Publications fédérales FO Métaux (fo-metaux.fr)
  { ts: 20260420, date: '20 Avr 2026', network: 'federation', content: '🏛️ 26ème Congrès Confédéral FO — FO Métaux représente la voix des travailleurs de la métallurgie au congrès confédéral.', link: 'https://www.fo-metaux.fr' },
  { ts: 20260416, date: '16 Avr 2026', network: 'federation', content: '🏭 Stellantis – Garanties d\'emploi obtenues : maintien des investissements et protections pour le site de Poissy au-delà de 2028. FO Métaux continue la mobilisation.', link: 'https://www.fo-metaux.fr' },
  { ts: 20260415, date: '15 Avr 2026', network: 'federation', content: '📢 Tribune – Protection industrielle : FO Métaux signe un appel pour un référendum sur la protection de l\'industrie française.', link: 'https://www.fo-metaux.fr' },
  { ts: 20260415, date: '15 Avr 2026', network: 'federation', content: '⚠️ Alerte Daher Industries — FO Métaux tire la sonnette d\'alarme sur l\'avenir et la viabilité du site industriel.', link: 'https://www.fo-metaux.fr' },
  { ts: 20260407, date: '7 Avr 2026',  network: 'federation', content: '🔧 Réindustrialisation : « Réindustrialiser exige un projet collectif » — analyse et commentaires de FO Métaux sur la stratégie nationale.', link: 'https://www.fo-metaux.fr' },
  // Publications locales section Valeo Amiens
  { ts: 20260425, date: '25 Avr 2026', network: 'whatsapp', content: '✅ Rappel : permanence syndicale mercredi 12h–13h. N\'hésitez pas à venir avec vos questions !' },
  { ts: 20260422, date: '22 Avr 2026', network: 'facebook', content: '🔔 Résultats des élections professionnelles 2023 — FO Métaux confirme sa représentativité sur le site Valeo Amiens. Merci pour votre confiance !' },
  { ts: 20260418, date: '18 Avr 2026', network: 'instagram', content: '🤝 Réunion avec la direction : amélioration des conditions de travail de l\'atelier obtenue. Votre syndicat agit !' },
  { ts: 20260415, date: '15 Avr 2026', network: 'facebook', content: '⚠️ Projet de réorganisation de nuit — FO Métaux Valeo Amiens demande une réunion d\'urgence avec la direction.' },
  { ts: 20260410, date: '10 Avr 2026', network: 'instagram', content: '📋 Nouvelle formation syndicale disponible. Montant des cotisations 2024 inchangé. Inscrivez-vous via votre espace adhérent !' },
  { ts: 20260405, date: '5 Avr 2026',  network: 'whatsapp', content: '📄 PV de l\'AG novembre disponible dans votre espace adhérent. Bilan 2023 approuvé à l\'unanimité. Merci à tous les présents !' },
];

const NETWORK_META = {
  instagram:  { icon: 'fab fa-instagram',    label: 'Instagram',      color: '#e1306c' },
  facebook:   { icon: 'fab fa-facebook',     label: 'Facebook',       color: '#1877f2' },
  whatsapp:   { icon: 'fab fa-whatsapp',     label: 'WhatsApp',       color: '#25d366' },
  federation: { icon: 'fas fa-fist-raised',  label: 'FO Métaux Fédération', color: '#cc0000' },
};

function loadSocialFeed() {
  const feed = document.getElementById('socialFeed');
  if (!feed) return;
  feed.innerHTML = '<div class="feed-loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';
  setTimeout(() => {
    const sorted = [...ALL_POSTS].sort((a, b) => b.ts - a.ts);
    feed.innerHTML = `<div class="timeline">${sorted.map(p => {
      const m = NETWORK_META[p.network];
      return `
        <div class="timeline-item">
          <div class="timeline-icon" style="background:${m.color}">
            <i class="${m.icon}"></i>
          </div>
          <div class="timeline-card">
            <div class="timeline-meta">
              <span class="timeline-source" style="color:${m.color}">${m.label}</span>
              <span class="timeline-date">${p.date}</span>
            </div>
            <p class="timeline-content">${p.content}</p>
            ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="timeline-link">Lire sur fo-metaux.fr <i class="fas fa-external-link-alt"></i></a>` : ''}
          </div>
        </div>`;
    }).join('')}</div>`;
  }, 300);
}

// ── ACTUS ──
const DEMO_ACTUS = [
  {
    title: '26ème Congrès Confédéral FO',
    date: '20 Avr 2026', tag: 'Fédération',
    excerpt: 'FO Métaux représente la voix des travailleurs de la métallurgie au 26ème Congrès Confédéral FO. Retour sur les résolutions adoptées.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=220&fit=crop&auto=format',
    link: 'https://www.fo-metaux.fr'
  },
  {
    title: 'Élections professionnelles 2023 : FO confirme sa représentativité',
    date: '15 Nov 2023', tag: 'Élections',
    excerpt: 'FO Métaux Valeo Amiens confirme sa représentativité lors des élections professionnelles 2023. Résultats détaillés disponibles dans votre espace adhérent.',
    img: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=220&fit=crop&auto=format'
  },
  {
    title: 'AG novembre 2023 — Bilan approuvé à l\'unanimité',
    date: '15 Nov 2023', tag: 'Assemblée Générale',
    excerpt: 'L\'Assemblée Générale a approuvé le bilan de l\'exercice 2022 à l\'unanimité. Le rapport d\'activité et le bilan financier sont disponibles dans votre espace adhérent.',
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=220&fit=crop&auto=format'
  },
];

function loadActus() {
  const grid = document.getElementById('actusGrid');
  if (!grid) return;
  grid.innerHTML = DEMO_ACTUS.map(a => `
    <div class="actu-card">
      <div class="actu-card-thumb">
        <img src="${a.img}" alt="${a.title}" loading="lazy"
             onerror="this.parentElement.innerHTML='<div class=actu-thumb-fallback><i class=\'fas fa-newspaper\'></i></div>'" />
        <span class="actu-thumb-tag">${a.tag}</span>
      </div>
      <div class="actu-card-body">
        <div class="actu-card-meta"><span>${a.date}</span></div>
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        ${a.link ? `<a href="${a.link}" target="_blank" rel="noopener" class="actu-link">Lire la suite <i class="fas fa-arrow-right"></i></a>` : ''}
      </div>
    </div>`).join('');
  if (document.getElementById('statActus')) document.getElementById('statActus').textContent = DEMO_ACTUS.length;
}

// ── HELPERS ──
function requireLogin(e) {
  if (e) e.preventDefault();
  if (!Auth.isLoggedIn()) {
    alert('Veuillez vous connecter pour accéder à ce document.');
    window.location.href = 'login.html';
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadActus();
  loadSocialFeed();

  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Votre message a bien été envoyé. Nous vous répondrons sous 48h.');
    e.target.reset();
  });
});
