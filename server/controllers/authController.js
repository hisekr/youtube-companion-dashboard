const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

function startAuth(req, res) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.email'],
  });
  res.redirect(authUrl);
}

async function handleCallback(req, res) {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    req.session.userTokens = tokens;
    res.redirect('http://localhost:3000/dashboard');
  } catch (err) {
    res.status(500).json({ error: 'Authentication failed' });
  }
}

function logout(req, res) {
  req.session.destroy();
  res.json({ success: true });
}

function checkAuth(req, res) {
  if (req.session.userTokens) {
    return res.json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
}


module.exports = { startAuth, handleCallback, logout, checkAuth };