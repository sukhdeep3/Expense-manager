const mongoose = require("mongoose");

// // connect to database
mongoose.connect("mongodb://localhost/expenses_list_db");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));

db.once("open", function () {
  console.log("Connected to db:: MongoDB");
});

exports = db;
