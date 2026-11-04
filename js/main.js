/**
 * MediGuide India — Core Interactive Utilities, Dark Mode & UI Enhancements
 */

const THEME_STORAGE_KEY = 'mediguide_theme';

// ── Dark / Light Theme Engine ──
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(activeTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeToggleLabels(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';

  localStorage.setItem(THEME_STORAGE_KEY, next);
  applyTheme(next);
  showToast(next === 'dark' ? '🌙 Dark theme enabled' : '☀️ Light theme enabled', 'info');
}

function updateThemeToggleLabels(theme) {
  const btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span>Light Mode</span>`;
    } else {
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span>Dark Mode</span>`;
    }
  });
}

// Immediately apply theme on script load to prevent light-flash
initTheme();

// ── Mobile Navigation Drawer ──
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const toggleBtn = document.getElementById('mobileMenuBtn');
  if (drawer) {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer && drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ── Header Scroll Elevation ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.site-nav');
  if (nav) {
    if (window.scrollY > 15) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// ── Toast Notification System ──
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-msg toast-${type}`;
  
  let iconSvg = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`;
    
  if (type === 'success') {
    iconSvg = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>`;
  } else if (type === 'danger') {
    iconSvg = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`;
  } else if (type === 'warning') {
    iconSvg = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`;
  }

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 3500);
}

// Backward compatibility helper
window.toast = (msg, type = 'g') => {
  const map = { g: 'info', s: 'success', e: 'danger', w: 'warning' };
  showToast(msg, map[type] || 'info');
};

// ═══ Nav User Pill ═══
function initNavUser() {
  const SESSION_KEY = 'mediguide_user_session';
  const sess = localStorage.getItem(SESSION_KEY);
  const actionsDesktop = document.querySelector('.nav-actions-desktop');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (!actionsDesktop) return;

  // Remove static Portal link (now dynamic)
  actionsDesktop.querySelectorAll('a[href="login.html"]').forEach(el => el.remove());

  const sosBtn = actionsDesktop.querySelector('a[href="emergency.html"]');

  if (sess) {
    try {
      const u = JSON.parse(sess);
      const initials = (u.name || 'U').charAt(0).toUpperCase();
      const avatarHTML = u.photo
        ? `<img src="${u.photo}" referrerpolicy="no-referrer" alt="${initials}" style="width:30px;height:30px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
        : `<div style="width:30px;height:30px;border-radius:50%;background:var(--theme-gradient);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:0.8rem;flex-shrink:0;">${initials}</div>`;

      const pill = document.createElement('a');
      pill.href = 'profile.html';
      pill.title = 'View Profile';
      pill.style.cssText = 'display:flex;align-items:center;gap:8px;text-decoration:none;padding:4px 12px 4px 4px;border:1.5px solid var(--border);border-radius:40px;background:var(--bg-surface);transition:all 0.2s;';
      pill.innerHTML = `${avatarHTML}<span style="font-size:0.82rem;font-weight:700;color:var(--text-main);max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${u.name.split(' ')[0]}</span>`;
      pill.addEventListener('mouseenter', () => { pill.style.borderColor = 'var(--theme-primary)'; pill.style.boxShadow = '0 2px 10px var(--theme-glow)'; });
      pill.addEventListener('mouseleave', () => { pill.style.borderColor = 'var(--border)'; pill.style.boxShadow = 'none'; });

      if (sosBtn) actionsDesktop.insertBefore(pill, sosBtn);
      else actionsDesktop.appendChild(pill);

      // Mobile drawer user pill
      if (mobileDrawer) {
        const existing = mobileDrawer.querySelector('.mobile-user-pill');
        if (existing) existing.remove();
        const mPill = document.createElement('a');
        mPill.href = 'profile.html';
        mPill.className = 'mobile-user-pill';
        mPill.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;background:var(--bg-surface);border:1.5px solid var(--border);text-decoration:none;margin-bottom:12px;';
        mPill.innerHTML = `${avatarHTML}<div><div style="font-size:0.9rem;font-weight:700;color:var(--text-main);">${u.name}</div><div style="font-size:0.75rem;color:var(--text-faint);">${u.role === 'doctor' ? 'Clinician' : 'Patient'} &bull; View Profile</div></div>`;
        mobileDrawer.insertBefore(mPill, mobileDrawer.querySelector('a'));
      }
    } catch (ignore) {}
  } else {
    const link = document.createElement('a');
    link.href = 'login.html';
    link.className = 'btn-rect btn-rect-secondary btn-rect-sm';
    link.textContent = 'Portal';
    if (sosBtn) actionsDesktop.insertBefore(link, sosBtn);
    else actionsDesktop.appendChild(link);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavUser();
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });
});
