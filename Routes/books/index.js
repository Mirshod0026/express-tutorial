const express = require("express");
const router = express.Router();
const {
  getBookById,
  updateBook,
  deleteBook,
} = require("../../Controller/bookControllers");

router
  .route("/:id")
  .put(async (req, res) => {
    const { id } = req.params;

    const book = await getBookById(id);

    if (!book) {
      return res.status(404).send("Book not found!");
    }

    const updatedBook = await updateBook(id, req.body);

    res.status(201).send({ msg: "Successfully updated", data: updatedBook });
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    const book = await getBookById(id);

    if (!book) {
      return res.status(404).send("Book not found!");
    }

    const deletedBook = await deleteBook(id);

    res.status(201).send({ msg: "Successfully deleted", data: deletedBook });
  })
  .post(async (req,res)=> {
    
  })

module.exports = router;
