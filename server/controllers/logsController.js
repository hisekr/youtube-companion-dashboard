const pool = require('../db/pool');

async function getLogs(req, res) {
  try {
    const result = await pool.query('SELECT * FROM logs ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Get logs error:', err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getLogs };