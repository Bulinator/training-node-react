const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');
// generate new app
const app = express();

/*
app.get('/', (req, res) => {
  res.send({ bye: 'Jean-Claude' });
});
*/

// refactoring this part later
// http://console.developers.google.com

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken) => {
    console.log('token: ', accessToken);
  })
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
