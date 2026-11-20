/**
 * Nessie's reminder emails: which one to send, and what it says.
 * No Firebase in here, so it can be unit-tested with plain `node --test`.
 *
 * Inputs come from users/{uid}.days, the map the app writes as { 'YYYY-MM-DD': xpEarnedThatDay }.
 * Nessie's own memory lives in nessie/{uid} (see index.js): { level, lastPracticeDay }.
 */

/** Nag tiers in days away, highest first. */
export const TIERS = [7, 3, 1];

/** Calendar date (YYYY-MM-DD) of `date` in `timeZone`. */
export function dayInZone(date, timeZone) {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

/** Whole days from day key `a` to day key `b` (both YYYY-MM-DD). */
export function daysBetween(a, b) {
  const toUtc = (k) => {
    const [y, m, d] = k.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

/** Latest day with any XP, or null if she has never practised. */
export function lastPracticeDay(days) {
  const keys = Object.keys(days || {}).filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k) && Number(days[k]) > 0);
  return keys.length ? keys.sort().at(-1) : null;
}

/**
 * Decides what to do tonight.
 * @param {{ days: Record<string, number>, state: { level?: number, lastPracticeDay?: string } | undefined, today: string }} input
 * @returns {{ send: 'away1' | 'away3' | 'away7' | 'welcome' | null, state: { level: number, lastPracticeDay: string | null }, daysAway: number | null }}
 */
export function decide({ days, state, today }) {
  const last = lastPracticeDay(days);
  const level = state?.level ?? 0;
  if (!last) return { send: null, state: { level: 0, lastPracticeDay: null }, daysAway: null };

  const daysAway = daysBetween(last, today);
  const cameBack = level > 0 && state?.lastPracticeDay && last > state.lastPracticeDay;

  if (cameBack) {
    // Only a real streak break (she had already had the 3-day email) earns the welcome back.
    return { send: level >= 3 ? 'welcome' : null, state: { level: 0, lastPracticeDay: last }, daysAway };
  }

  const tier = TIERS.find((t) => daysAway >= t);
  if (tier && tier > level) {
    return { send: `away${tier}`, state: { level: tier, lastPracticeDay: last }, daysAway };
  }
  return { send: null, state: { level, lastPracticeDay: last }, daysAway };
}

// ---------- Email copy ----------

const COPY = {
  away1: {
    image: 'nessie-away1.jpg',
    alt: 'Nessie at the laptop, waiting',
    subject: 'Nessie noticed. 🐾',
    paragraphs: (name) => [
      `<b>Ahoj ${name}!</b> <i>(Hi!)</i> It's been a whole day.`,
      'Nessie sat on your keyboard waiting, but nothing happened. Just one tiny lesson?',
      "She's promising not to knock anything off the table. (She's lying.)",
    ],
    button: 'One tiny lesson',
  },
  away3: {
    image: 'nessie-away3.jpg',
    alt: 'Nessie with her petition, sad coffee and flat beer',
    subject: 'Nessie has started a petition',
    paragraphs: (name) => [
      `${name}, the Czech words are getting lonely.`,
      '<b>"Káva"</b> <i>(coffee)</i> is going cold and <b>"pivo"</b> <i>(beer)</i> has gone flat.',
      'Nessie has collected 1 signature (her own). 5 minutes, <b>prosím?</b> <i>(please?)</i>',
    ],
    button: 'Sign the petition',
  },
  away7: {
    image: 'nessie-away7.jpg',
    alt: 'Nessie crying into her memoir',
    subject: 'Nessie is writing her memoir',
    paragraphs: () => [
      '<b>Chapter 1:</b> I waited. <b>Chapter 2:</b> I ate. <b>Chapter 3:</b> I learned Czech by myself out of spite.',
      '<b>Děkuji</b> <i>(thanks)</i> for nothing. 😾',
      "...Okay, fine, she misses you. Come back and she'll pretend it never happened.",
    ],
    button: 'Come back to Nessie',
  },
  welcome: {
    image: 'nessie-welcome.jpg',
    alt: 'Nessie waving hello',
    subject: 'Vítej zpět! (Welcome back!)',
    paragraphs: () => ["She's back! Nessie is purring at full volume. 😻", "Let's go!"],
    button: 'Keep going',
  },
};

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const stripTags = (s) => s.replace(/<[^>]+>/g, '');

/** Content-ID the picture is embedded under (index.js attaches it with this cid). */
export const IMAGE_CID = 'nessie-picture';

/**
 * Subject, HTML and plain-text body for one email, plus the picture file it shows
 * (in functions/images/). `imageSrc` overrides the embedded cid: link, for local previews.
 */
export function renderEmail(kind, { name, appUrl, imageSrc }) {
  const c = COPY[kind];
  if (!c) throw new Error(`Unknown email kind: ${kind}`);
  const safeName = escapeHtml(name || 'there');
  const paras = c.paragraphs(safeName);
  const url = escapeHtml(appUrl);

  const html = `<!doctype html>
<html><body style="margin:0;background:#f6f1ea;font-family:Helvetica,Arial,sans-serif;color:#222">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#fff;border:2px solid #222;border-radius:14px">
        <tr><td style="padding:0"><img src="${escapeHtml(imageSrc || `cid:${IMAGE_CID}`)}" width="476" alt="${escapeHtml(c.alt)}" style="display:block;width:100%;max-width:476px;height:auto;border:0;border-radius:12px 12px 0 0"></td></tr>
        <tr><td style="padding:18px 24px 0;font-size:20px;font-weight:bold;text-align:center">${escapeHtml(c.subject)}</td></tr>
        <tr><td style="padding:14px 24px 4px;font-size:16px;line-height:1.55">
          ${paras.map((p) => `<p style="margin:0 0 12px">${p}</p>`).join('\n          ')}
        </td></tr>
        <tr><td align="center" style="padding:6px 24px 24px">
          <a href="${url}" style="display:inline-block;background:#e8404f;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px">${escapeHtml(c.button)} →</a>
        </td></tr>
      </table>
      <p style="font-size:12px;color:#888;margin:14px 0 0">Sent with love by Nessie from Orloj Česky.</p>
    </td></tr>
  </table>
</body></html>`;

  // Strip the tags first, then put the raw name in, so a "<" in a name survives.
  const NAME = '\u0000name\u0000';
  const textParas = c.paragraphs(NAME).map((p) => stripTags(p).replaceAll(NAME, name || 'there'));
  const text = `${textParas.join('\n\n')}\n\n${c.button}: ${appUrl}\n\n- Nessie 🐾`;
  return { subject: c.subject, html, text, image: c.image };
}

/** Parses "a@x.com=Nami, b@y.com=Mario" into a Map of lower-case email -> name. */
export function parseRecipients(raw) {
  const out = new Map();
  for (const part of String(raw || '').split(',')) {
    const [email, name] = part.split('=').map((s) => s?.trim());
    if (email) out.set(email.toLowerCase(), name || email.split('@')[0]);
  }
  return out;
}
