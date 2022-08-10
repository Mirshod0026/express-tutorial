const express = require("express");
const  router = express.Router();

const {
  getAuthors,
  findAuthorByName,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  addBookToAuthor
} = require("../../Controller/authorControllers");

router
  .route("/")
  .get(async (req, res) => await getAuthors(req,res))
  .post(async (req, res) => await findAuthorByName(req, res));

router
  .route("/:id")
  // .get(async (req, res) => await getAuthorById(req, res))
  .put(async (req, res) => await updateAuthor(req, res)) // Xato Id kiritsam if() shartiga tushmayapti.
  .delete(async (req, res) => await deleteAuthor(req, res))
  .post(async (req, res) => await addBookToAuthor(req, res));


module.exports = router;
