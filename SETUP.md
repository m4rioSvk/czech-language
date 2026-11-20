# Setup: Firebase login + GitHub Pages

The steps below are the ones only you can do (they need your Google and GitHub accounts).
Replace `<user>` with your GitHub username and `<repo>` with the repository name. For this repo
(`m4rioSvk/czech-language`) that means the site will be at
`https://m4riosvk.github.io/czech-language/` and the domain to authorize is `m4riosvk.github.io`.

## 1. Firebase project

1. Go to <https://console.firebase.google.com> → **Add project** (Google Analytics is not needed).
2. **Project settings → General → Your apps → Web (`</>`)** → register an app (no Hosting).
   Keep the `firebaseConfig` values it shows; you need them in steps 4 and 5.
3. **Build → Authentication → Get started → Sign-in method → Google → Enable**, pick a support email, **Save**.
4. **Authentication → Settings → Authorized domains → Add domain**:
   - `<user>.github.io`
   - your custom domain, if you use one
   - `localhost` is already in the list by default; leave it there for local testing.
5. **Build → Firestore Database → Create database**
   - Location: **europe-west3 (Frankfurt)**. This cannot be changed later.
   - Start in **production mode**.

## 2. Security rules

1. Open `firestore.rules` and replace `you@gmail.com` and `wife@gmail.com` with your two Google
   addresses, in lower case. (To allow any Google account instead, make `allowedEmail()` return `true`.)
2. Deploy them, either way works:
   - **Console:** Firestore Database → **Rules** → paste the whole file → **Publish**.
   - **CLI:** `npx firebase-tools login`, then
     `npx firebase-tools deploy --only firestore:rules --project <your-project-id>`.

## 3. Local `.env`

```bash
cp .env.example .env
```

Fill in the six `VITE_FIREBASE_*` values from step 1.2, and set `VITE_ALLOWED_EMAILS` to the same
two addresses as in `firestore.rules`. Leave it empty to allow every account. `.env` is git-ignored.

## 4. Test on localhost

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. Use `localhost`, not `127.0.0.1`, because only `localhost` is an
authorized domain.
- Click **Přihlásit se přes Google** and pick your account in the popup.
- The app opens with your photo in the header.
- Finish a quiz question, then check Firestore Database → Data: you should see
  `users/{uid}` and `users/{uid}/progress/{lessonId}`.
- Sign out (avatar → Odhlásit se) and sign in again: the progress comes back.

`npm run build && npm run preview` serves the production build on <http://localhost:4173>.

## 5. GitHub repository

1. Create the repo and push this folder to the `main` branch.
2. **Settings → Pages → Build and deployment → Source = GitHub Actions.**
3. **Settings → Secrets and variables → Actions → New repository secret**, one for each:
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
   `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`,
   `VITE_ALLOWED_EMAILS`.
4. Push to `main` (or **Actions → Deploy to GitHub Pages → Run workflow**). The site appears at
   `https://<user>.github.io/<repo>/`.

### Custom domain (optional)

- **Settings → Pages → Custom domain**: enter the domain and create the DNS record GitHub shows.
- **Settings → Secrets and variables → Actions → Variables**: add `VITE_BASE` = `/`, because the
  site is then served from the domain root. The same applies to a repo named `<user>.github.io`.
- Add the domain to Firebase **Authorized domains** (step 1.4).

## 6. Nessie reminder emails (Cloud Functions)

Every evening at 19:00 Prague time, `functions/index.js` checks who has not practised and sends
one of Nessie's emails: after 1, 3 and 7 days away, plus "Vítej zpět!" when someone comes back
after a streak break. Each email is sent only once per absence. The copy is in `functions/nessie.js`.

It reads `users/{uid}.days` (written by the app) and keeps its own notes in `nessie/{uid}`, which
the app itself can't read or write. The emails go out through a Gmail account.

### 6.1 Switch the project to the Blaze plan

Scheduled functions need Blaze (pay-as-you-go). One run a day stays inside the free allowance.

1. Firebase console → bottom-left **Spark** → **Upgrade** → **Blaze** → pick or create a billing
   account (this is where the card goes).
2. Set a budget alert: <https://console.cloud.google.com/billing> → your billing account →
   **Budgets & alerts** → **Create budget** → amount e.g. **€1**, keep the 50 / 90 / 100 % emails.
   An alert only warns you; it does not stop anything.

### 6.2 Gmail app password

Use the Gmail account the emails should come from.

1. <https://myaccount.google.com/security> → turn on **2-Step Verification** (required).
2. <https://myaccount.google.com/apppasswords> → name it `Nessie` → **Create**.
3. Copy the 16-character password. You need it once in step 6.4; Google won't show it again.

### 6.3 Settings file

```bash
cp functions/.env.example functions/.env
```

Fill in `functions/.env` (git-ignored):

- `GMAIL_USER`: the Gmail address from 6.2.
- `NESSIE_TO`: who gets reminders, as `email=Name`, comma-separated, e.g. `nami@gmail.com=Nami`.
  Use the Google account they sign in to the app with.
- `APP_URL`: the site link for the email button.
- Leave `NESSIE_DRY_RUN=true` for the first deploy.

### 6.4 Deploy

Run these from the repo root. Replace `<project-id>` with your Firebase project ID.

```bash
cd functions && npm install && npm test && cd ..
npx firebase-tools login
npx firebase-tools functions:secrets:set GMAIL_APP_PASSWORD --project <project-id>
npx firebase-tools deploy --only functions --project <project-id>
```

- `secrets:set` asks for the value: paste the app password. It is stored in Google Secret
  Manager, never in the repo.
- The first deploy enables a few Google Cloud APIs (Cloud Functions, Cloud Build, Artifact
  Registry, Cloud Scheduler, Secret Manager). Answer **y** if asked. It can take a few minutes.
- If it asks about a **cleanup policy** for container images, answer **y** (e.g. 1 day). This
  stops old build images piling up in storage.

### 6.5 Test it

1. Open <https://console.cloud.google.com/cloudscheduler> (pick your project). There is a job
   named like `firebase-schedule-nessieNightly-europe-west3`. Click **⋮ → Force run**.
2. Firebase console → **Functions** → `nessieNightly` → **Logs**. With the dry run on, you see a
   `Nessie decision` line per person, with `daysAway` and which email it **would** send.
3. When that looks right, set `NESSIE_DRY_RUN=false` in `functions/.env` and deploy again
   (`npx firebase-tools deploy --only functions --project <project-id>`).

Tip: to see a real email before Nami does, put your own address in `NESSIE_TO` for one test,
skip a day of practice, and force a run. Then switch it back to Nami and deploy again.

### Changing things later

- **Wording:** edit `COPY` in `functions/nessie.js`, run `npm test` in `functions/`, deploy.
- **See the emails:** `npm run preview` in `functions/`, then open `functions/preview.html`.
- **Pictures:** one per email in `functions/images/` (`nessie-away1.jpg`, `-away3`, `-away7`,
  `-welcome`). They are embedded in the email, so keep them around 100 KB (about 960 px wide).
- **Time:** `schedule` in `functions/index.js` (`every day 19:00`), then deploy.
- **Pause it:** Cloud Scheduler → the job → **Pause**.
- **Reset Nessie's memory for someone:** delete their `nessie/{uid}` document in Firestore.

## Notes

- **Existing progress:** the first time someone signs in on a browser that has old progress
  (from before the cloud version), that progress is copied into their account. It is copied only
  once, and only into that first account.
- **Offline:** progress is cached in the browser. Changes made offline are uploaded when the
  connection comes back.
- **Login on phones:** login uses a popup, which also works on phones. If the popup can't open
  (for example, the app was added to the iPhone home screen), the app switches to a full-page
  redirect instead. On GitHub Pages that redirect can fail in Safari, because it has to pass
  through `<project>.firebaseapp.com`. If that happens, open the site in the normal browser.
- **Two devices at once:** progress is loaded when you sign in. If both devices are open at the
  same time, the one that saves last wins. Reload the page to pick up changes made on the other
  device.
