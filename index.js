const express = require('express');
const mongoose = require('mongoose');
// execute passport strategy
require('./services/passport');
// generate new app
const app = express();

// call authRoutes (js tricks)
// require return a function, with an immediately invokes app
require('./routes/authRoutes')(app);

/*
app.get('/', (req, res) => {
  res.send({ bye: 'Jean-Claude' });
});
*/

// refactoring this part later
// http://console.developers.google.com

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Bulinator dev server is running on port ${PORT}`);
});
