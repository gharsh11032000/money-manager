const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Please select a type"],
    },
    date: {
      type: String,
      required: [true, "Please select a date"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
    },
    note: {
      type: String,
      required: [true, "Please add some note"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", transactionsSchema);
