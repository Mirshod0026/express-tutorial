const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Node.js');
});

// GET /users

// POST /users

// GET /books

// POST /books

app.listen(3000, () => console.log('server run on port:3000'));
