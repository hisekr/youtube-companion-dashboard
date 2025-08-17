const notesService = require('../services/notesService');
const logsService = require('../services/logsService');

async function addNote(req, res) {
  const { videoId, text, tags } = req.body;
  try {
    const note = await notesService.addNote(videoId, text);
    await logsService.logEvent('note_add', { noteId: note.id, videoId, text });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getNotes(req, res) {
  const { videoId } = req.params;
  const { search } = req.query;
  try {
    const notes = await notesService.getNotes(videoId, search);
    await logsService.logEvent('notes_search', { videoId, search });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addNote, getNotes };