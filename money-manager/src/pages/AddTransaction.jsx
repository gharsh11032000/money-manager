import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UseManagerContext } from "../context/StateManagerContext";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { UseAuthContext } from "../context/authContext";
import PageHeader from "../components/PageHeader";
import { v4 as uuidV4 } from "uuid";

function AddTransaction() {
  const { addTransaction, categoriesExpense, categoriesIncome, todaysDate } =
    UseManagerContext();
  const { user, isError, message, isSucess, resetState, createTransaction } =
    UseAuthContext();
  const [incomeCategories, setIncomeCategories] = useState(categoriesIncome);
  const [expenseCategories, setExpenseCategories] = useState(categoriesExpense);
  const [transaction, setTransaction] = useState({
    date: todaysDate,
    category: "",
    amount: "",
    note: "",
    type: "",
  });
  const selectTypeRef = useRef("expense");
  const categoryRef = useRef();
  const { date, category, amount, note } = transaction;
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSucess) {
      toast.success(message);
    }

    resetState();
  }, [isError, isSucess, message]);

  const handleChange = (e) => {
    setTransaction((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      category: categoryRef.current.value,
      type: selectTypeRef.current.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _id = uuidV4();

    await createTransaction({ ...transaction, amount: +amount, _id });

    addTransaction({ ...transaction, amount: +amount, _id });

    setTransaction({
      date: todaysDate,
      category: "",
      amount: "",
      note: "",
      type: "",
    });
  };

  return (
    <div className="page__container">
      <div className="add__transaction--container">
        <PageHeader to={"/"} heading={"Add Transaction"} />
        <form onSubmit={handleSubmit} className="form__transaction">
          <div className="form__transaction-group">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              required
              ref={selectTypeRef}
              defaultValue="expense"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form__transaction-group--1">
            <div className="form__transaction-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
                id="date"
                required
              />
            </div>
            <div className="form__transaction-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                required
                ref={categoryRef}
              >
                <option value="">Select one</option>
                {(selectTypeRef.current.value === "income"
                  ? incomeCategories
                  : expenseCategories
                ).map((ctg, i) => {
                  return (
                    <option value={ctg} key={i}>
                      {ctg}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form__transaction-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              id="amount"
              min={1}
              step="any"
              required
            />
          </div>
          <div className="form__transaction-group">
            <label htmlFor="note">Note</label>
            <input
              type="text"
              name="note"
              value={note}
              onChange={handleChange}
              id="note"
              required
            />
          </div>
          <button className="btn__transaction--save" type="submit">
            <span>Add</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
