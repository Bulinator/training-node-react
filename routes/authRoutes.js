const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  // req = request, incoming, res = outgoing, response
  app.get('/api/logout', (req, res) => {
    req.logout(); // attached to express server, erase cookie stored
    res.send(req.user); // proove user is no longer signed
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
