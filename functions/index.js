/**
 * Cloud Functions for Orloj Česky.
 *
 * nessieNightly: every evening, checks who has not practised and sends one of Nessie's
 * reminder emails through Gmail (1, 3 and 7 days away, plus "welcome back").
 * Setup and deployment: see SETUP.md, section 6.
 */
import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';
import { defineBoolean, defineSecret, defineString } from 'firebase-functions/params';
import { onSchedule } from 'firebase-functions/scheduler';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import { dayInZone, decide, IMAGE_CID, parseRecipients, renderEmail } from './nessie.js';

initializeApp();

// Must match where you and Nami practise: the app records days in the browser's local time.
const TIME_ZONE = 'Europe/Prague';
// Same region as the Firestore database (SETUP.md step 1.5).
const REGION = 'europe-west3';

// Non-secret settings live in functions/.env (git-ignored); see functions/.env.example.
const GMAIL_USER = defineString('GMAIL_USER', { description: 'Gmail address the reminders are sent from' });
const NESSIE_TO = defineString('NESSIE_TO', { description: 'Who gets reminders: "email=Name", comma-separated' });
const APP_URL = defineString('APP_URL', { description: 'Link in the email button' });
const DRY_RUN = defineBoolean('NESSIE_DRY_RUN', { default: true, description: 'true = only log, send nothing' });
// The Gmail app password is a real secret: stored in Secret Manager, never in a file.
const GMAIL_APP_PASSWORD = defineSecret('GMAIL_APP_PASSWORD');

export const nessieNightly = onSchedule(
  {
    schedule: 'every day 19:00',
    timeZone: TIME_ZONE,
    region: REGION,
    secrets: [GMAIL_APP_PASSWORD],
    retryCount: 0, // a retry could send the same email twice
    memory: '256MiB',
  },
  async () => {
    const db = getFirestore();
    const recipients = parseRecipients(NESSIE_TO.value());
    const dryRun = DRY_RUN.value();
    const today = dayInZone(new Date(), TIME_ZONE);

    if (!recipients.size) {
      logger.warn('NESSIE_TO is empty, nobody to remind');
      return;
    }

    const transport = dryRun
      ? null
      : nodemailer.createTransport({
          service: 'gmail',
          auth: { user: GMAIL_USER.value(), pass: GMAIL_APP_PASSWORD.value() },
        });

    const users = await db.collection('users').get();
    for (const userDoc of users.docs) {
      const data = userDoc.data();
      const email = String(data.profile?.email || '').toLowerCase();
      if (!recipients.has(email)) continue;

      const stateRef = db.collection('nessie').doc(userDoc.id);
      const state = (await stateRef.get()).data();
      const result = decide({ days: data.days, state, today });
      logger.info('Nessie decision', { uid: userDoc.id, today, daysAway: result.daysAway, send: result.send, dryRun });

      if (result.send && !dryRun) {
        const mail = renderEmail(result.send, { name: recipients.get(email), appUrl: APP_URL.value() });
        await transport.sendMail({
          from: `"Nessie 🐾" <${GMAIL_USER.value()}>`,
          to: email,
          subject: mail.subject,
          text: mail.text,
          html: mail.html,
          // The picture travels inside the email, so it shows even if the website is down.
          attachments: [
            {
              filename: mail.image,
              path: fileURLToPath(new URL(`./images/${mail.image}`, import.meta.url)),
              cid: IMAGE_CID,
              contentDisposition: 'inline',
            },
          ],
        });
        logger.info('Nessie email sent', { uid: userDoc.id, kind: result.send });
      }

      // In a dry run, leave Nessie's memory alone so the real run starts fresh.
      if (!dryRun) {
        await stateRef.set({ ...result.state, lastSent: result.send, checkedAt: FieldValue.serverTimestamp() }, { merge: true });
      }
    }
  },
);
