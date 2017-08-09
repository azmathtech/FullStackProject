const passport = require('passport'); //npm module

module.exports = app => {
  // used to send user to google for authentication
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // used to process the response from google and route authenticated user to a protected page
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // used to log the user out and redirect them back to the initial landing page
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // used to test authentication - will return user id if successfully logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

//----------------------------------Notes--------------------------------------

//Refactor the logout Route
//Initally the response sent the user object to confirm that it was empty after logout
//No longer need the user object so instead we just use the redirect method
// app.get('/api/logout', (req, res) => {
//   req.logout();
//   res.send(req.user);
// });
// res.send(req.user); becomes res.redirect('/');
