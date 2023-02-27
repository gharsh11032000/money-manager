const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transactions = require("../models/transactionModel");

const getTransactions = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transactions = await Transactions.find({ user: req.user.id });

  res.status(200).json(transactions);
});

const getTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transaction = await Transactions.findById(req.params.id);

  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(transaction);
});

const deleteTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transaction = await Transactions.findById(req.params.id);

  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await transaction.remove();

  res.status(200).json({ message: "Transaction Deleted" });
});

const updateTransaction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transaction = await Transactions.findById(req.params.id);

  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTransaction = await Transactions.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTransaction);
});

const createTransactions = asyncHandler(async (req, res) => {
  const { type, note, amount, category, date, _id } = req.body;

  if (!type || !note || !amount || !category || !date) {
    res.status(401);
    throw new Error("All fields are required");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const transaction = await Transactions.create({
    type,
    note,
    amount,
    category,
    date,
    _id,
    user: req.user.id,
  });

  res.status(200).json(transaction);
});

module.exports = {
  getTransactions,
  createTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
