const mongoose = require("mongoose");

const bookSchema = {
  name: String,
  author: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Author",
    },
  ],
};

const BookModel = mongoose.model("Books", bookSchema);

async function createBook(name, author) {
  const books = new BookModel({
    name,
    author,
  });

  await books.save();
}

async function getBooks() {
  const book = await BookModel.find();

  console.log(book);
}

async function getBookById(id) {
  const book = await BookModel.findById(id);

  if (!book) {
    return console.log("Book not found!");
  }

  console.log(book);
}
