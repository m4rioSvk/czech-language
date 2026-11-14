import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
  type User,
} from 'firebase/auth';
import { auth, allowedEmails } from './firebase';

export interface AuthState {
  user: User | null;
  loading: boolean;
  /** false when an allow-list is set and the signed-in account is not on it */
  allowed: boolean;
  error: string;
}

type Listener = (s: AuthState) => void;

let state: AuthState = { user: null, loading: true, allowed: false, error: '' };
const listeners = new Set<Listener>();

function set(patch: Partial<AuthState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

const isAllowed = (u: User | null) =>
  !!u && (allowedEmails.length === 0 || (!!u.email && allowedEmails.includes(u.email.toLowerCase())));

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Popups are the reliable path on GitHub Pages, phones included: a redirect has to come back
// through <project>.firebaseapp.com, which browsers that block third-party storage (Safari,
// newer Chrome) can break. So redirect is only the fallback when a popup can't open at all,
// e.g. a home-screen app on iOS or an in-app browser.
const POPUP_UNAVAILABLE = new Set([
  'auth/popup-blocked',
  'auth/operation-not-supported-in-environment',
  'auth/web-storage-unsupported',
]);
const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || (navigator as { standalone?: boolean }).standalone === true;

const MESSAGES: Record<string, string> = {
  'auth/network-request-failed': 'ネットに接続できません。接続を確認してもう一度どうぞ。',
  'auth/unauthorized-domain': 'このドメインは Firebase の「承認済みドメイン」に入っていません（SETUP.md 参照）。',
  'auth/too-many-requests': '試行回数が多すぎます。少し待ってからもう一度どうぞ。',
};
const message = (e: unknown) => {
  const code = (e as { code?: string })?.code || '';
  return MESSAGES[code] || `ログインできませんでした（${code || 'unknown'}）`;
};

/** Starts listening to Firebase Auth. Call once at startup (the AuthProvider of this app). */
export function AuthProvider() {
  if (!auth) {
    set({ loading: false });
    return;
  }
  getRedirectResult(auth).catch((e) => set({ error: message(e) }));
  onAuthStateChanged(auth, (user) => set({ user, loading: false, allowed: isAllowed(user) }));
}

async function signIn() {
  if (!auth) return;
  set({ error: '' });
  if (isStandalone()) return signInWithRedirect(auth, provider);
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    const code = (e as { code?: string })?.code || '';
    if (POPUP_UNAVAILABLE.has(code)) return signInWithRedirect(auth, provider);
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return;
    set({ error: message(e) });
  }
}

async function signOut() {
  if (auth) await fbSignOut(auth);
}

/** Current auth state plus actions; `subscribe` returns an unsubscribe function. */
export function useAuth() {
  return {
    get user() { return state.user; },
    get loading() { return state.loading; },
    get allowed() { return state.allowed; },
    get error() { return state.error; },
    signIn,
    signOut,
    subscribe(l: Listener) {
      listeners.add(l);
      l(state);
      return () => listeners.delete(l);
    },
  };
}
