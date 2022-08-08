const express = require('express');
const mongoose  = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://localhost/teamproject')
  .then( () => {
    console.log('Connected database...');
  })
  .catch( (error) => console.log('Mongodb error', error))



app.get('/', (req, res) => {
  res.send('Hello Node.js');
});

const books = [];

// GET /users

app.get('/users', (req, res) => {
  res.send('users');
});
// POST /users

app.post('/users', (req, res) => {
  res.send('Create user');
});
// GET /books

app.get('/books', (req, res) => {
  res.send(books);
});

// POST /books

app.post('/books', (req, res) => {
  res.send('create book logic');
});

// app.listen(3000, () => console.log('server run on port:3000'));
