# YouTube Dashboard Backend

Backend for the YouTube Dashboard application built with **Node.js, Express, and Neon Postgres**.  
Provides APIs for managing **videos, notes, comments, and logs**.

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/auth/login` | Returns Google OAuth URL |
| GET    | `/auth/callback` | Handles OAuth callback, sets session |
| POST   | `/auth/logout` | Destroys session |

### Videos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/videos` | List YouTube videos |
| GET    | `/videos/:id` | Get video details |
| POST   | `/videos/update` | Update video title/description |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/notes/add` | Add a note `{ videoId, text }` |
| GET    | `/notes/:videoId` | Get notes for a video, supports `?search=query` |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/comments/add` | Add a comment `{ videoId, text }` |
| POST   | `/comments/reply` | Reply to a comment `{ parentId, text }` |
| DELETE | `/comments/:id` | Delete a comment |
| GET    | `/comments/:videoId` | List comments for a video |

### Logs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/logs` | Get logs with timestamps in IST (UTC+5:30) |

---

## Project Structure

server/
├── app.js
├── server.js
├── controllers/
│   ├── authController.js
│   ├── commentsController.js
│   ├── logsController.js
│   ├── notesController.js
│   └── videoController.js
├── db/
│   ├── pool.js
│   └── migrate.js
├── middleware/
│   └── authMiddleware.js
├── migrations/
│   ├── 001_create_notes.sql
│   └── 002_create_logs.sql
├── routes/
│   ├── auth.js
│   ├── comments.js
│   ├── logs.js
│   ├── notes.js
│   └── videos.js
├── services/
│   ├── logsService.js
│   ├── notesService.js
│   └── youtubeService.js
└── utils/
    ├── logger.js
    └── validation.js

# Database Schema

### Notes Table (migrations/001_create_notes.sql)

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notes_video_id ON notes(video_id);

### Logs Table (migrations/002_create_logs.sql)

CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(255) NOT NULL,
    details JSONB,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_logs_event_type ON logs(event_type);

### Session table(migration/003_create_session.sql)

CREATE TABLE IF NOT EXISTS session (
    sid VARCHAR(255) NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);