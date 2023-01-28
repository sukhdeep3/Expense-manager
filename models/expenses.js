const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
