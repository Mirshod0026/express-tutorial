const express = require("express");
const  router = express.Router();

const {
  getAuthors,
  findAuthorByName,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../../Controller/authorControllers");

router
  .route("/")
  .get(async (req, res) => await getAuthors(req,res))
  .post(async (req, res) => await findAuthorByName(req, res));

router
  .route("/:id")
  .put(async (req, res) => await updateAuthor(req, res)) // Xato Id kiritsam if() shartiga tushmayapti.
  .delete(async (req, res) => await deleteAuthor(req, res));


module.exports = router;
