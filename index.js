const express = require('express');
// generate new app
const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'Jean-Claude' });
});

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
