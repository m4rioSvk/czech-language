import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';

const env = import.meta.env;

const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

/** False when .env (or the GitHub secrets) are missing, so the UI can say so instead of crashing. */
export const configured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

export const app: FirebaseApp | null = configured ? initializeApp(config) : null;
export const auth: Auth | null = app ? getAuth(app) : null;

// Offline persistence: reads come from IndexedDB when offline and writes are queued until the
// connection returns. The multi-tab manager lets two open tabs share the same cache.
export const db: Firestore | null = app
  ? initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) })
  : null;

/** Lower-cased emails from VITE_ALLOWED_EMAILS; empty means everyone who can sign in is allowed. */
export const allowedEmails: string[] = (env.VITE_ALLOWED_EMAILS || '')
  .split(',')
  .map((s: string) => s.trim().toLowerCase())
  .filter(Boolean);
