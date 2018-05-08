const express = require('express');
// generate new app
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// run server
app.listen(5000);
