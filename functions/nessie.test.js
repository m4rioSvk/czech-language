import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';
import { dayInZone, daysBetween, decide, lastPracticeDay, parseRecipients, renderEmail } from './nessie.js';

const days = (...keys) => Object.fromEntries(keys.map((k) => [k, 10]));

test('dayInZone uses the Prague calendar date', () => {
  // 23:30 UTC on 20 Nov is already 21 Nov in Prague (UTC+1).
  assert.equal(dayInZone(new Date('2026-11-20T23:30:00Z'), 'Europe/Prague'), '2026-11-21');
});

test('daysBetween counts calendar days across months and DST', () => {
  assert.equal(daysBetween('2026-10-24', '2026-10-26'), 2);
  assert.equal(daysBetween('2026-11-30', '2026-12-01'), 1);
});

test('lastPracticeDay ignores zero-XP days and junk keys', () => {
  assert.equal(lastPracticeDay({ '2026-11-18': 5, '2026-11-19': 0, junk: 3 }), '2026-11-18');
  assert.equal(lastPracticeDay({}), null);
});

test('no email when she practised today', () => {
  const r = decide({ days: days('2026-11-20'), state: undefined, today: '2026-11-20' });
  assert.equal(r.send, null);
});

test('never practised: nothing to send', () => {
  assert.equal(decide({ days: {}, state: undefined, today: '2026-11-20' }).send, null);
});

test('escalates 1 -> 3 -> 7 days, each email only once', () => {
  const d = days('2026-11-10');
  let state;
  const sent = [];
  for (let day = 11; day <= 20; day++) {
    const r = decide({ days: d, state, today: `2026-11-${day}` });
    if (r.send) sent.push(`${day}:${r.send}`);
    state = r.state;
  }
  assert.deepEqual(sent, ['11:away1', '13:away3', '17:away7']);
});

test('first run after a long gap jumps straight to the right tier', () => {
  const r = decide({ days: days('2026-11-01'), state: undefined, today: '2026-11-20' });
  assert.equal(r.send, 'away7');
});

test('welcome back after a streak break (3+ days)', () => {
  const r = decide({
    days: days('2026-11-10', '2026-11-16'),
    state: { level: 3, lastPracticeDay: '2026-11-10' },
    today: '2026-11-16',
  });
  assert.equal(r.send, 'welcome');
  assert.deepEqual(r.state, { level: 0, lastPracticeDay: '2026-11-16' });
});

test('practising again after only the 1-day nudge resets quietly', () => {
  const r = decide({
    days: days('2026-11-18', '2026-11-19'),
    state: { level: 1, lastPracticeDay: '2026-11-18' },
    today: '2026-11-19',
  });
  assert.equal(r.send, null);
  assert.equal(r.state.level, 0);
});

test('after a reset the next absence starts again at 1 day', () => {
  const r = decide({ days: days('2026-11-19'), state: { level: 0, lastPracticeDay: '2026-11-19' }, today: '2026-11-20' });
  assert.equal(r.send, 'away1');
});

test('emails render with the name escaped and the app link', () => {
  const m = renderEmail('away1', { name: 'Nami <3', appUrl: 'https://example.com/app/' });
  assert.equal(m.subject, 'Nessie noticed. 🐾');
  assert.match(m.html, /Ahoj Nami &lt;3!/);
  assert.match(m.html, /href="https:\/\/example.com\/app\/"/);
  assert.match(m.text, /^Ahoj Nami <3! \(Hi!\)/);
  assert.match(m.html, /src="cid:nessie-picture"/);
  for (const kind of ['away1', 'away3', 'away7', 'welcome']) {
    const e = renderEmail(kind, { name: 'N', appUrl: 'x' });
    assert.ok(existsSync(new URL(`./images/${e.image}`, import.meta.url)), `missing picture for ${kind}`);
  }
});

test('parseRecipients reads "email=Name" pairs', () => {
  const r = parseRecipients(' Nami@Gmail.com=Nami , other@x.cz ');
  assert.equal(r.get('nami@gmail.com'), 'Nami');
  assert.equal(r.get('other@x.cz'), 'other');
});
