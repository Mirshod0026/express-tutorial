const mongoose = require('mongoose');

const authorControllers = require('./authorControllers');

const bookSchema = {
  name: String,
  authors: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Author',
    },
  ],
};

const BookModel = mongoose.model('Book', bookSchema);

async function getBookById(id) {
  const book = await BookModel.findById(id);

  return book;
}

async function getBooks(req, res) {
  const authors = await BookModel.find().populate('authors');

  res.status(201).send(authors);
}

async function createBook(name, authors) {
  const book = new BookModel({ name, authors });
  const bookSaved = await book.save();

  return bookSaved;
}

async function findBookByName(req, res) {
  const { name, authors } = req.body;

  const book = await BookModel.findOne({ name: name });

  if (book) {
    return res.status(400).send('Book is exsist!');
  }

  const newBook = await createBook(name, authors);

  res.status(200).send(newBook);
}

async function updateBook(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const book = await getBookById(id);

  if (!book) {
    return res.status(404).send('Book not found!');
  }
  const updatedBook = await BookModel.updateOne({ id }, { name });

  return res
    .status(201)
    .send({ msg: 'Successfully updated', data: updatedBook });
}

async function deleteBook(req, res) {
  const { id } = req.params;
  const book = await getBookById(id);

  if (!book) {
    return res.status(404).send('Book not found!');
  }
  const deletedBook = await BookModel.deleteOne({ _id: id });

  return res
    .status(201)
    .send({ msg: 'Successfully deleted', data: deletedBook });
}

async function addAuthortoBook(req, res) {
  const { id } = req.params;

  const { authorId } = req.body;

  const book = await getBookById(id);
  if (!book) {
    return res.status(404).send('Book not found!');
  }

  const author = await authorControllers.getAuthorById(authorId);

  if (!author) {
    return res.status(201).send('Author not found!');
  }

  await BookModel.updateOne(
    { id },
    {
      $push: { authors: authorId },
    }
  );

  await author.books.push(id);

  await author.save();

  return res.status(201).send('Added book');
}
module.exports = {
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  addAuthortoBook,
  findBookByName,
};
