const express = require("express");
const port = 8000;

const db = require("./config/mongoose");
const Expenses = require("./models/expenses");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("assets"));

const expenses = [
  {
    itemName: "Car",
    amount: 50000,
  },
  {
    itemName: "Maruti",
    amount: 80000,
  },
  {
    itemName: "Toy",
    amount: 500,
  },
];

app.get("/", function (req, res) {
  Expenses.find({}, function (err, Expense) {
    if (err) {
      console.log("Error", err);
      return;
    }

    // let TotalArray = [];

    // for (const i of expanse) {
    //   //console.log(i);
    //   TotalArray.push(i.price);
    // }

    // const initialValue = 0;
    // let Total = TotalArray.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   initialValue
    // );

    let sum = 0;
    for (let i = 0; i < Expense.length; i++) {
      // console.log(Expense[i].amount);

      sum = sum + parseInt(Expense[i].amount);
    }
    // console.log(sum);

    return res.render("home.ejs", {
      title: "Expenses",
      expenses_list: Expense,
      total: sum,
    });
  });
});

app.post("/create_list", function (req, res) {
    // console.log('**********'.req);
  Expenses.create(req.body, function (err, data) {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("List is added to database");
    return res.redirect("back");
  });
});

app.get("/delete-item", function (req, res) {
  let id = req.query.id;
    // console.log(id);
  Expenses.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting the item", err);
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log("Server is running on port:", port);
});
