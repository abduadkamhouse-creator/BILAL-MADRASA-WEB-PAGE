# Madrasa Manager

A single-file web app for managing a madrasa: admin dashboard (create teacher
logins, register students), teacher dashboard (attendance, homework), and a
student portal (attendance %, homework, fee status). Backend is Firebase
(Auth + Firestore + Storage) — everything lives in `index.html`, no build step.

---

## 1. Put this on GitHub

**Option A — GitHub's website (no command line):**
1. Go to **github.com** → click **+** (top right) → **New repository**.
2. Name it (e.g. `madrasa-manager`) → **Create repository**.
3. On the empty repo page, click **uploading an existing file**.
4. Drag in `index.html` (and this `README.md`) → **Commit changes**.

**Option B — command line, if you have git installed:**
```bash
cd madrasa-manager          # the folder containing index.html
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/madrasa-manager.git
git push -u origin main
```

---

## 2. Host it with GitHub Pages (free, directly from the repo)

1. In your repo → **Settings** tab → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. **Branch**: `main`, folder `/ (root)` → **Save**.
4. Wait ~1 minute, then refresh — GitHub shows your live URL, something like:
   `https://YOUR_USERNAME.github.io/madrasa-manager/`

That's it — `index.html` at the repo root automatically becomes the homepage.

*(Prefer Netlify instead? Same repo works there too: Netlify → Add new site →
Import from Git → pick this repo → no build command needed → Deploy.)*

---

## 3. Connect Firebase (required before anyone can log in)

The app won't work until it has your Firebase project's credentials:
1. Open `index.html` in any text editor (or GitHub's own file editor: click the
   pencil icon on the file in your repo).
2. Find the `firebaseConfig` object near the bottom (`<script type="module">`
   section) and replace the `PASTE_YOUR_...` placeholders with your real
   Firebase project values (Firebase Console → ⚙️ Project settings → Your apps).
3. Commit the change — GitHub Pages/Netlify redeploys automatically.

**Full Firebase setup, including creating your first admin login and the
security rules**, was covered earlier — ask me to resend it if you don't have
it handy, and I'll drop `firestore.rules` / `storage.rules` into this repo too.

**Important:** after deploying, add your live URL as an authorized domain in
Firebase Console → Authentication → Settings → Authorized domains
(e.g. `your-username.github.io`), or logins will be blocked.
