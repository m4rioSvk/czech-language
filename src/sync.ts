import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  writeBatch,
  type DocumentReference,
  type FieldValue,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';

/*
  Firestore layout
    users/{uid}                     profile, xp, streak, level, lessonsCompleted, days, settings, lastActive
    users/{uid}/progress/{lessonId} words (Leitner box per word), mastery, completed
  A lesson is one chapter of the course. Firestore is the source of truth; the SDK's persistent
  cache keeps it usable offline and queues writes until the connection is back.
*/

export interface WordState { b: number; d: number; c: number; w: number }
export interface Progress {
  v: number;
  updated: number;
  xp: number;
  words: Record<string, WordState>;
  days: Record<string, number>;
  settings: Record<string, unknown>;
}
export interface Summary {
  streak: number;
  level: number;
  chapters: { id: string; wordIds: string[]; mastery: number }[];
}
export type SyncStatus = 'cloud' | 'saving' | 'offline' | 'error';

const LS_KEY = 'orloj-czech-v1'; // where the app kept progress before the cloud version
const MIGRATED_KEY = 'orloj-czech-v1:migrated-to';
const COMPLETE_AT = 0.6; // same threshold the app uses to move on to the next chapter

let ctx: {
  user: User;
  root: DocumentReference;
  createdAt: unknown;
  migratedFromLocal: boolean;
  onStatus: (s: SyncStatus) => void;
} | null = null;
let lastSaved = new Map<string, string>(); // lessonId -> JSON of what Firestore has
let latest: { S: Progress; summary: Summary } | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let inflight: Promise<void> | null = null;

/** Old progress from this browser, unless it was already moved into another account. */
function readLocal(uid: string): Progress | null {
  try {
    const owner = localStorage.getItem(MIGRATED_KEY);
    if (owner && owner !== uid) return null;
    const raw = localStorage.getItem(LS_KEY);
    const o = raw ? JSON.parse(raw) : null;
    return o && typeof o === 'object' && (o.xp || Object.keys(o.words || {}).length) ? o : null;
  } catch {
    return null;
  }
}

/**
 * Loads the signed-in user's progress. On the very first login (no users/{uid} yet) it returns
 * this browser's localStorage progress instead and marks it for migration: the first save then
 * writes all of it to Firestore.
 */
export async function loadProgress(user: User, onStatus: (s: SyncStatus) => void): Promise<{ state: Progress | null; isNew: boolean; migrated: boolean }> {
  if (!db) throw new Error('Firestore not configured');
  const root = doc(db, 'users', user.uid);
  const snap = await getDoc(root);
  lastSaved = new Map();
  latest = null;

  if (!snap.exists()) {
    const local = readLocal(user.uid);
    ctx = { user, root, createdAt: serverTimestamp(), migratedFromLocal: !!local, onStatus };
    return { state: local, isNew: true, migrated: !!local };
  }

  const d = snap.data();
  const words: Record<string, WordState> = {};
  const lessons = await getDocs(collection(root, 'progress'));
  lessons.forEach((p) => {
    const data = p.data();
    Object.assign(words, data.words || {});
    lastSaved.set(p.id, JSON.stringify({ words: data.words || {}, mastery: data.mastery ?? 0 }));
  });
  ctx = { user, root, createdAt: d.createdAt ?? serverTimestamp(), migratedFromLocal: !!d.migratedFromLocal, onStatus };
  return {
    state: { v: 1, updated: d.updated || 0, xp: d.xp || 0, words, days: d.days || {}, settings: d.settings || {} },
    isNew: false,
    migrated: false,
  };
}

/** Debounced save, called by the app after every change. */
export function scheduleSave(S: Progress, summary: Summary, delay = 1200) {
  latest = { S: JSON.parse(JSON.stringify(S)), summary };
  clearTimeout(timer);
  timer = setTimeout(() => void flush(), delay);
}

/** Writes whatever is pending right now (also used before sign-out and when the tab is hidden). */
export async function flush(): Promise<void> {
  clearTimeout(timer);
  if (!latest || !ctx || !db) return;
  const { S, summary } = latest;
  const c = ctx;
  latest = null;

  const batch = writeBatch(db);
  const written: [string, string][] = [];
  for (const ch of summary.chapters) {
    const words: Record<string, WordState> = {};
    for (const id of ch.wordIds) if (S.words[id]) words[id] = S.words[id];
    const mastery = Math.round(ch.mastery * 1000) / 1000;
    const json = JSON.stringify({ words, mastery });
    if (lastSaved.get(ch.id) === json) continue;
    batch.set(doc(c.root, 'progress', ch.id), {
      words,
      mastery,
      completed: mastery >= COMPLETE_AT,
      total: ch.wordIds.length,
      updatedAt: serverTimestamp(),
    });
    written.push([ch.id, json]);
  }
  const u = c.user;
  batch.set(c.root, {
    v: 1,
    profile: { name: u.displayName || '', email: u.email || '', photoURL: u.photoURL || '' },
    xp: S.xp,
    streak: summary.streak,
    level: summary.level,
    lessonsCompleted: summary.chapters.filter((ch) => ch.mastery >= COMPLETE_AT).length,
    days: S.days,
    settings: S.settings,
    updated: S.updated,
    lastActive: serverTimestamp(),
    createdAt: c.createdAt as FieldValue,
    migratedFromLocal: c.migratedFromLocal,
  });
  written.forEach(([id, json]) => lastSaved.set(id, json));

  c.onStatus(navigator.onLine ? 'saving' : 'offline');
  // Batches commit in order. Offline, commit() only resolves once the server has the data; the
  // write is already safe in the local cache, so nothing waits for it.
  const p: Promise<void> = batch
    .commit()
    .then(() => {
      if (c.migratedFromLocal) try { localStorage.setItem(MIGRATED_KEY, c.user.uid); } catch { /* private mode */ }
      if (ctx === c && inflight === p) c.onStatus('cloud');
    })
    .catch((e) => {
      console.error('Saving progress failed', e);
      written.forEach(([id]) => lastSaved.delete(id)); // retry these lessons on the next save
      if (ctx === c) c.onStatus('error');
    })
    .finally(() => { if (inflight === p) inflight = null; });
  inflight = p;
}

/** Forget the signed-in user (after flushing). */
export async function stopSync() {
  await flush();
  ctx = null;
  latest = null;
  lastSaved = new Map();
}

addEventListener('online', () => ctx?.onStatus(inflight ? 'saving' : 'cloud'));
addEventListener('offline', () => ctx?.onStatus('offline'));
addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') void flush(); });
