const express = require("express");
const mongoose = require("mongoose");
const { port } = require("./config/index");
const Routes = require("./Routes/index");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(Routes);

mongoose
  .connect("mongodb://localhost/teamproject")
  .then(() => {
    console.log("Connected database...");
  })
  .catch((error) => console.log("Mongodb error", error));

app.listen(port, () => {
  console.log(`Server is run on port: ${port}`);
});
