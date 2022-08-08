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

async function updateBook(id, name, authorId) {
  const book = await BookModel.findById({ _id: id });

  if (!book) {
    return console.log('Book not found!');
  }

  book.name = name,
  book.author.ObjectId = authorId

  const bookSave = await book.save();

  console.log(bookSave);
}

async function deleteBook(id) {
  const result = await BookModel.deleteOne({ _id: id }); // findByIdAndRemove -- aynan delete bo'lgan bookni qaytaradi

  return result
}

// updateBook()