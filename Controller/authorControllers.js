const mongoose = require("mongoose");
const { getBookById, BookModel } = require("./bookControllers");


const authorSchem = {
  name: String,
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
  ],
};

const AuthorModel = mongoose.model("Author", authorSchem);

async function getAuthors(req, res) {
  const authors = await AuthorModel.find();

  res.status(201).send(authors);
}

async function findAuthorByName(req, res) {
  const { name } = req.body;
  const author = await AuthorModel.findOne({ name: name });

  if (author) {
    return res.status(400).send("Author is exists!");
  }

  const newAuthor = await createAuthor(name);

  res.status(201).send(newAuthor);
}

async function createAuthor(name) {
  const newAuthor = new AuthorModel({ name: name });

  await newAuthor.save();

  return newAuthor;
}

async function getAuthorById(id) {
  const author = await AuthorModel.findOne({ _id: id });
  
  return author;
}

async function updateAuthor(req, res) {
  const { id } = req.params;
  console.log(id);
  const { name } = req.body;
  console.log(name);

  const author = await getAuthorById(id);
  console.log(author);

  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const updatedAuthor = await AuthorModel.updateOne({ _id: id }, { name });

  res.status(200).send({ msg: "Successfully updated", data: updatedAuthor });
}

async function deleteAuthor(req, res) {
  const { id } = req.params;
  const author = await getAuthorById(id);

  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const deletedAuthor = await AuthorModel.deleteOne({ _id: id });

  res.status(200).send({ msg: "Successfully deleted", data: deletedAuthor });

}

async function addBookToAuthor(req, res) {
  const { id } = req.params
  const { bookId } = req.body;

  // author bor yo'qligini tekshiraman 
  const author = await getAuthorById(id);
  if (!author) {
    res.status(404).send("Author not found!");
  }

  // kitob bor yoqligini bazadan tekshiraman
  const book = await getBookById(bookId);
  if (!book) {
    res.status(404).send("Book not found!");
  }


  // agar ikkalasi mavjud bo'lsa autorning booksga ro'yxatiga bookni qo'shaman
  const addetBook = await author.books.push(book);
  addetBook.save();

  res.status(201).send(addetBook);
}

module.exports = {
  getAuthors,
  findAuthorByName,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  addBookToAuthor
};
