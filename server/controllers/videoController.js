const youtubeService = require('../services/youtubeService');
const logsService = require('../services/logsService');

async function listVideos(req, res) {
  try {
    const videos = await youtubeService.listVideos();
    await logsService.logEvent('videos_list', { count: videos.length });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getVideoDetails(req, res) {
  const { id } = req.params;
  try {
    const video = await youtubeService.getVideoDetails(id);
    await logsService.logEvent('video_fetch', { videoId: id });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateVideo(req, res) {
  const { id, title, description } = req.body;
  try {
    const video = await youtubeService.updateVideo(id, title, description);
    await logsService.logEvent('video_update', { videoId: id, title, description });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { listVideos, getVideoDetails, updateVideo };