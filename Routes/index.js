const express = require("express");
const router = express.Router();

const authorRoutes = require("./authors/index");
const bookRoutes = require("./books/index");

router.use("/authors", authorRoutes);
router.use("/books", authorRoutes);

