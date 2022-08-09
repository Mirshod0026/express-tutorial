const mongoose = require("mongoose");

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

async function getAuthors(req,res) {
  const authors = await AuthorModel.find();

  res.status(201).send(authors);
}

async function findAuthorByName(name) {
  const author = await AuthorModel.findOne({ name: name });

  return author;
}

async function createAuthor(name) {
  const newAuthor = new AuthorModel({ name: name });

  await newAuthor.save();

  return newAuthor;
}

async function getAuthorById(id) {
  const author = await AuthorModel.findOne({ id });

  return author;
}

async function updateAuthor(id, data) {
  const { name, books } = data;

  const updatedAuthor = await AuthorModel.updateOne({ id }, { name, books });

  return updatedAuthor;
}

async function deleteAuthor(id) {
  const deletedAuthor = await AuthorModel.deleteOne({ id });

  return deleteAuthor;
}

module.exports = {
  getAuthors,
  findAuthorByName,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
