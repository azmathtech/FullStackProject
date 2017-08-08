const passport = require('passport'); //npm module

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // used to test authentication - will return user id if successfully logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
