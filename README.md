# Madrasa Student Records

A small web app for a madrasa with two areas:

- **Ustad (teacher) panel** — `/admin` — secure, login required. Add, edit, and delete student records: attendance, Qur'an progress, exam marks, conduct, and remarks.
- **Parent portal** — `/` — public, no login. Parents search by student ID or name and see a read-only status page.

Built with Node.js + Express and JSON-file storage, so it runs with zero external database setup. You can swap the storage layer for MongoDB/MySQL later without changing the frontend.

## 1. Requirements

- Node.js 16 or newer ([download](https://nodejs.org))

## 2. Setup

```bash
git clone https://github.com/yourusername/madrasa-web.git
cd madrasa-web
npm install
npm start
```

The server starts at `http://localhost:3000`:

- Parent portal: `http://localhost:3000/`
- Ustad login: `http://localhost:3000/admin/login.html`

## 3. Default login (CHANGE THIS)

```
Username: ustad
Password: ustad123
```

This is a demo credential seeded in `data/admin.json`. **Change it before putting this online.**

To generate a new password hash, run:

```bash
node -e "
const { hashPassword } = require('./middleware/passwordUtils');
console.log(hashPassword('your-new-password'));
"
```

Then paste the printed value into `data/admin.json` as `passwordHash`, and set your own `username`.

## 4. How data is stored

Student records live in `data/students.json` as plain JSON — easy to inspect and back up. Each student record:

```json
{
  "id": "MD001",
  "name": "Ahmad Fauzi",
  "className": "Hifz - Year 2",
  "guardianName": "Ismail Rahman",
  "guardianPhone": "9876543210",
  "attendance": 92,
  "quranProgress": "Juz 12 - Surah Yusuf",
  "lastExamMarks": 88,
  "conduct": "Good",
  "remarks": "...",
  "updatedAt": "2026-07-10"
}
```

## 5. Security notes before going live

- Set a strong, random `SESSION_SECRET` environment variable (don't use the default in `server.js`).
- Serve over HTTPS (most hosts like Render, Railway, or a VPS with Let's Encrypt handle this for you).
- Consider rate-limiting the login route to prevent brute-force attempts.
- The public routes (`/api/students/search`, `/api/students/public/:id`) intentionally expose only non-sensitive fields — guardian phone numbers are never returned publicly.

## 6. Project structure

```
madrasa-web/
├── server.js                 # Express app entry point
├── routes/
│   ├── auth.js                # Login/logout/session check
│   └── students.js            # Public + protected student endpoints
├── middleware/
│   ├── authCheck.js           # Blocks unauthenticated admin requests
│   └── passwordUtils.js       # Password hashing (Node crypto, no dependency)
├── data/
│   ├── students.json          # Student records
│   └── admin.json             # Ustad login credentials (hashed)
├── public-page/                # Parent portal (public)
│   ├── index.html              # Search
│   ├── status.html             # Status view
│   ├── css/style.css
│   └── js/status.js
└── admin-panel/                 # Ustad panel (protected)
    ├── login.html
    ├── dashboard.html
    ├── css/admin.css
    └── js/{auth.js, dashboard.js}
```

## 7. Deploying

Any Node-friendly host works: Render, Railway, Fly.io, or a basic VPS.

1. Push this repo to GitHub.
2. Connect the repo to your host of choice.
3. Set the `SESSION_SECRET` environment variable.
4. Set the start command to `npm start`.

If you'd rather use free static hosting (GitHub Pages, Netlify) for the frontend, you'll need to host `server.js` separately (e.g. on Render's free tier) and point the frontend's `fetch()` calls at that server's URL.

## 8. Next steps you may want

- Add more staff accounts in `data/admin.json`.
- Add a "forgot password" flow.
- Move from JSON storage to MongoDB/MySQL once record counts grow.
- Add SMS/WhatsApp notifications to parents when remarks are updated.
