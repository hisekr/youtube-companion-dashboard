const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });

async function getYouTubeClient() {
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);
    return google.youtube({ version: 'v3', auth: oauth2Client });
  } catch (err) {
    console.error('Error refreshing YouTube token:', err.message, err.stack);
    throw new Error(`Failed to refresh YouTube token: ${err.message}`);
  }
}

async function listVideos() {
  try {
    const youtube = await getYouTubeClient();
    const channelRes = await youtube.channels.list({
      part: 'contentDetails',
      mine: true,
    });
    const uploadsPlaylistId = channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;
    const videosRes = await youtube.playlistItems.list({
      part: 'snippet,contentDetails',
      playlistId: uploadsPlaylistId,
      maxResults: 50,
    });
    return videosRes.data.items;
  } catch (err) {
    console.error('List videos error:', err.message, err.stack);
    throw new Error(`Failed to list videos: ${err.message}`);
  }
}

async function getVideoDetails(videoId) {
  const youtube = await getYouTubeClient();
  const response = await youtube.videos.list({
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  });
  return response.data.items[0];
}

async function updateVideo(videoId, title, description) {
  const youtube = await getYouTubeClient();
  const response = await youtube.videos.update({
    part: 'snippet',
    resource: {
      id: videoId,
      snippet: { title, description, categoryId: 22 },
    },
  });
  return response.data;
}

async function addComment(videoId, text) {
  const youtube = await getYouTubeClient();
  const response = await youtube.commentThreads.insert({
    part: 'snippet',
    resource: {
      snippet: {
        videoId,
        topLevelComment: { snippet: { textOriginal: text } },
      },
    },
  });
  return response.data;
}

async function replyToComment(parentId, text) {
  const youtube = await getYouTubeClient();
  const response = await youtube.comments.insert({
    part: 'snippet',
    resource: {
      snippet: { parentId, textOriginal: text },
    },
  });
  return response.data;
}

async function deleteComment(commentId) {
  const youtube = await getYouTubeClient();
  await youtube.comments.delete({ id: commentId });
  return { success: true };
}

async function listComments(videoId) {
  const youtube = await getYouTubeClient();
  const response = await youtube.commentThreads.list({
    part: 'snippet,replies',
    videoId,
  });
  return response.data.items;
}

module.exports = {
  listVideos,
  getVideoDetails,
  updateVideo,
  addComment,
  replyToComment,
  deleteComment,
  listComments,
};