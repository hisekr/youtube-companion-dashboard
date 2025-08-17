const youtubeService = require('../services/youtubeService');
const logsService = require('../services/logsService');

async function addComment(req, res) {
  const { videoId, text } = req.body;
  try {
    const comment = await youtubeService.addComment(videoId, text);
    await logsService.logEvent('comment_add', { videoId, text });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function replyToComment(req, res) {
  const { parentId, text } = req.body;
  try {
    const reply = await youtubeService.replyToComment(parentId, text);
    await logsService.logEvent('comment_reply', { parentId, text });
    res.json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteComment(req, res) {
  const { id } = req.params;
  try {
    const result = await youtubeService.deleteComment(id);
    await logsService.logEvent('comment_delete', { commentId: id });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listComments(req, res) {
  const { videoId } = req.params;
  try {
    const comments = await youtubeService.listComments(videoId);
    await logsService.logEvent('comments_fetch', { videoId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addComment, replyToComment, deleteComment, listComments };