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

  const newAuthor = await createAuthor(name);

  res.status(201).send(newAuthor);
}

async function createAuthor(name) {
  const newAuthor = new AuthorModel({ name: name });

  await newAuthor.save();

  return newAuthor;
}

async function getAuthorById(id) {
<<<<<<< HEAD
  const author = await AuthorModel.findOne({_id: id});
=======
  const author = await AuthorModel.findOne({ _id: id });
>>>>>>> 3ccd43f3ea5391e4a434456af5dbf82352d824a5

  return author;
}

async function updateAuthor(req, res) {
  const { id } = req.params;
  const { name, books } = req.body;

  const author = await getAuthorById(id);

  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const updatedAuthor = await AuthorModel.updateOne({ _id: id }, { name, books });

  res.status(200).send({ msg: "Successfully updated", data: updatedAuthor });
}

async function deleteAuthor(req,res) {
  const { id } = req.params;
  console.log(id);
  const author = await getAuthorById(id);

<<<<<<< HEAD
  if (!author) {
    return res.status(404).send("Author not found!");
  }

  const deletedAuthor = await AuthorModel.deleteOne({id});
  
  res.status(200).send({ msg: "Successfully deleted", data: deletedAuthor });

  // return deleteAuthor;
=======
  return deletedAuthor;
>>>>>>> 3ccd43f3ea5391e4a434456af5dbf82352d824a5
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
