const Expense = require("../models/Expense");

// ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET EXPENSES
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ IMPORTANT EXPORT
module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};