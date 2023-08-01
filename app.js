const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// IMPORT THE MODEL
const Book = require("./models/Book.model");


// CONNECT TO THE DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-example-dev")
  .then((x) => {
    console.log(`Connected to Database: "${x.connections[0].name}"`);
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));


const app = express();


// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES
// const cities = ["Miami", "Madrid", "Barcelona"];

// app.get("/city-list", (req, res) => {
//   res.json({ cities: cities });
// });


//  GET  /books - Retrieve all books from the database
app.get("/books", (req, res) => {
  Book.find({})
    .then((books) => {
      console.log("Retrieved books ->", books);
      res.json(books);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).send({ error: "Failed to retrieve books" });
    });
});


app.listen(3000, () => console.log("App listening on port 3000!"));
