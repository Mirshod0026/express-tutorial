const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Node.js');
});

const books = [];

// GET /users

// POST /users

// GET /books

app.get('/books', (req, res) => {
  res.send(books);
});

// POST /books

app.post('/books', (req, res) => {
  res.send('create book logic');
});

app.listen(3000, () => console.log('server run on port:3000'));
