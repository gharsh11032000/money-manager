const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  getTransactions,
  createTransactions,
  updateTransaction,
  getTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

router
  .route("/")
  .get(protect, getTransactions)
  .post(protect, createTransactions);

router
  .route("/:id")
  .get(protect, getTransaction)
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
