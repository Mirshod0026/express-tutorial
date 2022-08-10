const mongoose = require("mongoose");
const { getBookById } = require("./bookControllers");

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
  const authors = await AuthorModel.find().populate('books');

  res.status(201).send(authors);
}

async function findAuthorByName(req, res) {
  const { name, books } = req.body;
  const author = await AuthorModel.findOne({ name: name });

  if (author) {
    return res.status(400).send("Author is exists!");
  }

  const newAuthor = await createAuthor(name, books);

  res.status(201).send(newAuthor);
}

async function createAuthor(name, books) {
  const newAuthor = new AuthorModel({ name, books });

  await newAuthor.save();

  return newAuthor;
}

async function getAuthorById(id) {
  const author = await AuthorModel.findOne({ _id: id });

  return author;
}

async function updateAuthor(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const author = await getAuthorById(id);
  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const authorName = await AuthorModel.findOne({name});
  if (authorName){
    return res.status(400).send("Author is exsise!");
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

  // agar ikkalasi mavjud bo'lsa va autorning books lar ro'yxatida bookId topilmasa 
  // autorning booksga bookni qo'shaman
  
  await author.books.push(book);
  const updatedAuthor = await author.save()

  res.status(201).send({ msg: "Created Book", data: updateAuthor });

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
