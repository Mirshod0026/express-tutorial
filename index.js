const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser());

mongoose
  .connect('mongodb://localhost/teamproject')
  .then(() => {
    console.log('Connected database...');
  })
  .catch((error) => console.log('Mongodb error', error));

const {
  getAuthors,
  findAuthorByName,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require('./authors');

app.get('/authors', async (req, res) => {
  const authors = await getAuthors();

  res.send(authors);
});

app.post('/authors', async (req, res) => {
  const { name } = req.body;
  const author = await findAuthorByName(name); // bu fuksiya bizga authorni qaytarishi kerak

  if (author) {
    return res.status(400).send('Author is exists!');
  }

  const newAuthor = await createAuthor(name);

  res.status(201).send(newAuthor);
});

app.put('/authors/:id', async (req, res) => {
  const { id } = req.params;

  const author = await getAuthorById(id);

  if (!author) {
    return res.status(404).send('Author not found!');
  }

  const updatedAuthor = await updateAuthor(id, req.body);

  res.status(200).send({ msg: 'Successfully updated', data: updatedAuthor });
});

app.delete('/authors/:id', async (req, res) => {
  const { id } = req.params;

  const author = await getAuthorById(id);

  if (!author) {
    return res.status(404).send('Author not found!');
  }

  const deletedAuthor = await deleteAuthor(id);

  res.status(200).send({ msg: 'Successfully deleted', data: deletedAuthor });
});

app.listen(3000, () => console.log('server run on port:3000'));
