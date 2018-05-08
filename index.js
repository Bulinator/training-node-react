const express = require('express');
// generate new app
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// run server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
