const express = require("express");

// IMPORTANT: check path is correct
const {
  addExpense,
  getExpenses,
  deleteExpense,
   updateExpense,

} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;