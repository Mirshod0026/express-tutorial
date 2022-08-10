const mongoose = require("mongoose");

const { getAuthorById } = require("./authorControllers");


const bookSchema = {
  name: String,
  authors: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Author",
    },
  ],
};

const BookModel = mongoose.model("Book", bookSchema);

async function getBookById(id) {
  const book = await BookModel.findOne({ _id: id });

  return book;
}

async function getBooks(req, res) {
  const authors = await BookModel.find().populate("authors");

  res.status(201).send(authors);
}

async function createBook(name) {

  const book = new BookModel({ name })
  const bookSaved = await book.save();

  return bookSaved;
}

async function findBookByName(req, res) {
  const { name, authorId } = req.body;

  const book = await BookModel.findOne({ name: name });

  if (book) {
    return res.status(400).send('Author is exsist!')
  }

  const newBook = await createBook(name);

  res.status(200).send(newBook);
}

async function getBookById(id) {
  const book = await BookModel.findOne({ id });

  return book;
}

async function updateBook(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const book = await getBookById(id);

  if (!book) {
    return res.status(404).send("Book not found!");
  }
  const updatedBook = await BookModel.updateOne({ id }, { name });

  return res
    .status(201)
    .send({ msg: "Successfully updated", data: updatedBook });
}

async function deleteBook(req, res) {
  const { id } = req.params;

  const book = await getBookById(id);

  if (!book) {
    return res.status(404).send("Book not found!");
  }
  const deletedBook = await BookModel.deleteOne({ id });

  return res
    .status(201)
    .send({ msg: "Successfully deleted", data: deletedBook });
}

async function addBookAuthor(req, res) {
  const { id } = req.params;
  const author = getAuthorById(id);

  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const { book } = req.body;
  await AuthorModel.author.books.insert(book);

  return res.status(201).send("Added book");
}
module.exports = { getBooks, getBookById, updateBook, deleteBook, addBookAuthor, findBookByName, BookModel };
