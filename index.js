const express = require('express');
const app = express();

// Route Handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000; //either use what heroku assigns or 5000 for the port
app.listen(PORT);
