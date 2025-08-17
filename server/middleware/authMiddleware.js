function checkAuth(req, res, next) {
  if (!req.session.userTokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

module.exports = { checkAuth };