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
