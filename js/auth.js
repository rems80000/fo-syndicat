/* Authentication module
 * Si API_URL est renseigné → appel au vrai backend Railway
 * Sinon → comptes démo locaux
 */
const API_URL = 'https://fo-syndicat-backend-production.up.railway.app';

const Auth = (() => {
  // Comptes de secours (utilisés uniquement si le backend est inaccessible)
  const FALLBACK_USERS = [
    { email: 'membre@demo.fr',      password: 'membre123', role: 'membre',     name: 'Jean Dupont',    matricule: 'V-1042' },
    { email: 'secretaire@demo.fr',  password: 'secr123',   role: 'secretaire', name: 'Marie Martin',   matricule: 'V-0218' },
    { email: 'admin@demo.fr',       password: 'admin123',  role: 'admin',      name: 'Pierre Lambert', matricule: 'V-0001' },
    { email: 'tresorier@demo.fr',   password: 'tresor123', role: 'tresorier',  name: 'Le Trésorier',   matricule: 'V-0002' },
  ];

  async function login(email, password) {
    // Essai via le vrai backend Railway
    if (API_URL) {
      try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const data = await res.json();
          const session = { name: data.name, role: data.role, token: data.token, loginAt: Date.now() };
          sessionStorage.setItem('fo_user', JSON.stringify(session));
          sessionStorage.setItem('fo_token', data.token);
          return { success: true, role: data.role };
        }
        if (res.status === 401) return { success: false };
      } catch (e) {
        console.warn('Backend inaccessible, bascule sur comptes démo', e);
      }
    }
    // Fallback démo
    const user = FALLBACK_USERS.find(u => u.email === email && u.password === password);
    if (!user) return { success: false };
    const session = { name: user.name, role: user.role, matricule: user.matricule, loginAt: Date.now() };
    sessionStorage.setItem('fo_user', JSON.stringify(session));
    return { success: true, role: user.role };
  }

  function logout() {
    sessionStorage.removeItem('fo_user');
    sessionStorage.removeItem('fo_token');
    window.location.href = '/login.html';
  }

  function getUser() {
    try { return JSON.parse(sessionStorage.getItem('fo_user')); } catch { return null; }
  }

  function getToken() {
    return sessionStorage.getItem('fo_token') || null;
  }

  function requireAuth(allowedRoles) {
    const user = getUser();
    if (!user) { window.location.href = '../login.html'; return null; }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      alert('Accès non autorisé pour votre rôle.');
      window.location.href = '../login.html';
      return null;
    }
    return user;
  }

  function isLoggedIn() { return !!getUser(); }

  return { login, logout, getUser, getToken, requireAuth, isLoggedIn };
})();
