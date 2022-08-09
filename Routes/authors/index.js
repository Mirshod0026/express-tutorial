const express = require("express");
const router = express.Router();
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
  .post(async (req, res) => {
    const { name } = req.body;
    const author = await findAuthorByName(name); // bu fuksiya bizga authorni qaytarishi kerak

    if (author) {
      return res.status(400).send("Author is exists!");
    }

    const newAuthor = await createAuthor(name);

    res.status(201).send(newAuthor);
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const { id } = req.params;

    const author = await getAuthorById(id);

    if (!author) {
      return res.status(404).send("Author not found!");
    }

    const updatedAuthor = await updateAuthor(id, req.body);

    res.status(200).send({ msg: "Successfully updated", data: updatedAuthor });
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    const author = await getAuthorById(id);

    if (!author) {
      return res.status(404).send("Author not found!");
    }

    const deletedAuthor = await deleteAuthor(id);

    res.status(200).send({ msg: "Successfully deleted", data: deletedAuthor });
  });

module.exports = router;
