const logsService = require('../services/logsService');

async function log(eventType, details) {
    await logsService.logEvent(eventType, details);
}

module.exports = { log };