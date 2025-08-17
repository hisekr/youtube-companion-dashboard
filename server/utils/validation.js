function validateVideoUpdate(req, res, next) {
  const { id, title, description } = req.body;
  if (!id || !title || typeof description !== 'string') {
    return res.status(400).json({ error: 'Invalid input: id, title, and description required' });
  }
  next();
}

function validateComment(req, res, next) {
  const { videoId, text } = req.body;
  if (!videoId || !text) {
    return res.status(400).json({ error: 'Invalid input: videoId and text required' });
  }
  next();
}

function validateReply(req, res, next) {
  const { parentId, text } = req.body;
  if (!parentId || !text) {
    return res.status(400).json({ error: 'Invalid input: parentId and text required' });
  }
  next();
}

function validateNote(req, res, next) {
  const { videoId, text } = req.body;
  if (!videoId || !text ) {
    return res.status(400).json({ error: 'Invalid input: videoId, text required' });
  }
  next();
}

module.exports = { validateVideoUpdate, validateComment, validateReply, validateNote };