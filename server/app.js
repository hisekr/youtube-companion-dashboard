const express = require("express");
const cors = require("cors");
const session = require("express-session");
const PGSession = require("connect-pg-simple")(session);
require("dotenv").config();
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const notesRoutes = require('./routes/notes');
const commentsRoutes = require('./routes/comments');
const logsRoutes = require('./routes/logs');

const pool = require("./db/pool");

const app = express();

app.use(
  cors({
    origin: "https://youtube-companion-dashboard-client.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    store: new PGSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 48 * 60 * 60 * 1000 },
  })
);

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/notes', notesRoutes);
app.use('/comments', commentsRoutes);
app.use('/logs', logsRoutes);

module.exports = app;
