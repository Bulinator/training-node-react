const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// execute passport strategy
require('./services/passport');

// connect mongoodb
mongoose.connect(keys.mongoURI);

// generate new app
const app = express();

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
