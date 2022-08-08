const mongoose = require("mongoose");

const authorSchem = {
  name: String,
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Books",
    },
  ],
};

const AuthorModel = mongoose.model("Author", authorSchem);

async function createAuthor(name) {
  const author = new AuthorModel({
    name,
    books,
  });

  await author.save();
}

async function getAuthor() {
  const author = await AuthorModel.find();

  // console.log(author);
}

async function getAuthorById(id) {
  const author = await AuthorModel.findById(id);

  if (!author) {
    return console.log("Author not found!");
  }

  // console.log(author);
}

async function updeteAuthorById() {
  const author = await AuthorModel.findOneAndUpdate(filter, updete, {
    new: true,
    upsert: true,
  });
}

async function deleteAuthorById() {
  const author = AuthorModel
    .findOneAndDelete(filter)
    .then(console.log("Successful"))
    .catch((err) => next(err));
}
