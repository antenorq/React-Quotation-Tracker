const express = require("express");
const path = require("path"); // to use later for directories of images
const cors = require("cors");

const port = 5000;

const app = express();

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("App running port " + port);
});
