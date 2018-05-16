const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
// load User model
require('./models/User');
// execute passport strategy
const passport = require('passport');

// connect mongoodb
mongoose.connect(keys.mongoURI);

// generate new app
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in seconds
    keys: [keys.cookieKey]
  })
);

// load cookie session in passport
app.use(passport.initialize());
app.use(passport.session());

// call authRoutes (js tricks)
// require return a function, with an immediately invokes app
require('./routes/authRoutes')(app);


// refactoring this part later
// http://console.developers.google.com
// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Bulinator dev server is running on port ${PORT}`);
});
