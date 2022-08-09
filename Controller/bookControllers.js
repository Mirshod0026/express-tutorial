const mongoose = require("mongoose");

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
  const book = await BookModel.findOne({ id });

  return book;
}

async function updateBook(id, data) {
  const { name, authors } = data;

  const updatedBook = await BookModel.updateOne({ id }, { name, authors });

  return updatedBook;
}

async function deleteBook(id) {
  const deletedBook = await BookModel.deleteOne({ id });

  return deletedBook;
}


module.exports = { getBookById, updateBook, deleteBook };
