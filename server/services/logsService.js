const pool = require('../db/pool');

async function logEvent(eventType, details) {
    await pool.query('INSERT INTO logs (event_type, details) VALUES ($1, $2)', [eventType, details]);
}

module.exports = { logEvent };