const pool = require('../db/pool');

async function addNote(videoId, text) {
  const result = await pool.query(
    'INSERT INTO notes (video_id, text) VALUES ($1, $2) RETURNING *',
    [videoId, text]
  );
  return result.rows[0];
}

async function getNotes(videoId, search) {
  let query = 'SELECT * FROM notes WHERE video_id = $1';
  let params = [videoId];
  if (search) {
    query += ' AND text ILIKE $2';
    params.push(`%${search}%`);
  }
  query += ' ORDER BY created_at DESC';
  const result = await pool.query(query, params);
  return result.rows;
}


module.exports = { addNote, getNotes };