const express = require("express");
const router = express.Router();
const {
  updateBook,
  deleteBook,
  addBookAuthor,
  getBooks,
  findBookByName,
} = require("../../Controller/bookControllers");

router
  .route('/')
  .get(async (req, res) => await getBooks(req, res))
  .post(async (req, res) => await findBookByName(req, res));

router
  .route("/:id")
  .put(async (req, res) => await updateBook(req, res))
  .delete(async (req, res) => await deleteBook(req, res))
  .post(async (req, res) => await addBookAuthor(req, res));

module.exports = router;
