import './style.css';
import { configured } from './firebase';
import { AuthProvider, useAuth } from './auth';
import { flush, loadProgress, scheduleSave, stopSync } from './sync';
import { gateHTML, mountApp, saveAll, setSync, unmountApp } from './app.js';
import type { User } from 'firebase/auth';

const auth = useAuth();
const $ = <T extends HTMLElement>(s: string) => document.querySelector(s) as T;
let mountedUid: string | null = null;
let startingUid: string | null = null;
let loadSeq = 0;

function showGate(mode: string, extra: { error?: string; email?: string } = {}) {
  document.body.classList.add('signed-out');
  $('#app').innerHTML = gateHTML({ mode, ...extra });
}

function showUser(u: User) {
  const photo = $<HTMLImageElement>('#userPhoto');
  if (u.photoURL) photo.src = u.photoURL;
  photo.hidden = !u.photoURL;
  $('#userInitial').textContent = u.photoURL ? '' : (u.displayName || u.email || '?').trim()[0].toUpperCase();
  $('#userName').textContent = u.displayName || '';
  $('#userEmail').textContent = u.email || '';
  $('#userBtn').title = u.displayName || u.email || '';
}

async function start(u: User) {
  const seq = ++loadSeq;
  startingUid = u.uid;
  showGate('loading');
  try {
    const { state, isNew } = await loadProgress(u, setSync);
    if (seq !== loadSeq) return; // signed out or switched account meanwhile
    mountedUid = u.uid;
    showUser(u);
    document.body.classList.remove('signed-out');
    setSync(navigator.onLine ? 'cloud' : 'offline');
    mountApp(state, {
      save: scheduleSave,
      account: { name: u.displayName || '', email: u.email || '', photo: u.photoURL || '' },
    });
    if (isNew) saveAll(); // creates users/{uid}; carries over this browser's old progress if any
  } catch (e) {
    console.error('Loading progress failed', e);
    if (seq !== loadSeq) return;
    const code = (e as { code?: string })?.code;
    showGate('error', {
      error: code === 'permission-denied'
        ? 'Firestore のルールでアクセスが拒否されました（許可リストのメールアドレスを確認してください）。'
        : navigator.onLine ? `読み込みエラー（${code || 'unknown'}）` : 'オフラインです。',
    });
  } finally {
    if (seq === loadSeq) startingUid = null;
  }
}

auth.subscribe((s) => {
  if (!configured) return showGate('noconfig');
  if (s.loading) return showGate('loading');
  if (!s.user) {
    loadSeq++;
    startingUid = null;
    if (mountedUid) { mountedUid = null; unmountApp(); }
    return showGate('signin', { error: s.error });
  }
  if (!s.allowed) { loadSeq++; startingUid = null; return showGate('denied', { email: s.user.email || '' }); }
  if (mountedUid !== s.user.uid && startingUid !== s.user.uid) void start(s.user);
});

function closeMenu() {
  $('#userMenu').hidden = true;
  $('#userBtn').setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', async (e) => {
  const t = (e.target as Element).closest('button');
  if (!t) { if (!(e.target as Element).closest('#userMenu')) closeMenu(); return; }
  if (t.id === 'userBtn') {
    const open = $('#userMenu').hidden;
    $('#userMenu').hidden = !open;
    t.setAttribute('aria-expanded', String(open));
    return;
  }
  closeMenu();
  if (t.dataset.signin !== undefined) {
    t.setAttribute('disabled', '');
    await auth.signIn();
    t.removeAttribute('disabled');
  } else if (t.dataset.signout !== undefined) {
    await stopSync();
    await auth.signOut();
  } else if (t.dataset.retry !== undefined && auth.user) {
    void start(auth.user);
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
addEventListener('pagehide', () => void flush());

AuthProvider();
