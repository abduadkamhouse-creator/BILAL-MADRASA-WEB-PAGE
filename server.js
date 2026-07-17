const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 4 // 4 hours
    }
  })
);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Static sites
app.use('/', express.static(path.join(__dirname, 'public-page')));
app.use('/admin', express.static(path.join(__dirname, 'admin-panel')));

app.listen(PORT, () => {
  console.log(`Madrasa server running at http://localhost:${PORT}`);
  console.log(`  Parent (public) page: http://localhost:${PORT}/`);
  console.log(`  Ustad (admin) login:  http://localhost:${PORT}/admin/login.html`);
});
