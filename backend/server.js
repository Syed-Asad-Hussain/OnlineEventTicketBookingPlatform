const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const Event = require('./models/Event');
const User = require('./models/User');

const app = express();

// CORS configuration (not strictly needed if frontend served from same port)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve frontend files directly from the existing frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.get('/api', (req, res) => res.send('🎉 EventBright Backend API is running'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('📦 Database synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error('❌ Sync error:', err));
// At the bottom of server.js
module.exports = app;