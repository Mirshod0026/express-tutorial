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
  const { name, books } = req.body;

  const author = await getAuthorById(id);

  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const updatedAuthor = await AuthorModel.updateOne(
    { _id: id },
    { name, books }
  );

  res.status(200).send({ msg: "Successfully updated", data: updatedAuthor });
}

async function deleteAuthor(req, res) {
  const { id } = req.params;
  console.log(id);
  const author = await getAuthorById(id);

  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const deletedAuthor = await AuthorModel.deleteOne({ id });

  res.status(200).send({ msg: "Successfully deleted", data: deletedAuthor });

  // return deleteAuthor;
  return deletedAuthor;
}

module.exports = {
  getAuthors,
  findAuthorByName,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  AuthorModel,
};
