const Expense = require("../models/Expense");

// ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      userId: req.body.userId,
      date: req.body.date,
      description: req.body.description,
      category: req.body.category,
      paymentMethod: req.body.paymentMethod,
      amount: req.body.amount,
    });

    res.status(201).json(expense);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET USER EXPENSES
const getExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json(updatedExpense);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};

