import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UseManagerContext } from "../context/StateManagerContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/transaction.css";
import { toast } from "react-toastify";
import { UseAuthContext } from "../context/authContext";

function Transaction(transaction) {
  const { category, amount, note, _id, type, date } = transaction;
  const { deleteTransaction, getEditTransaction, convertToCurrency } =
    UseManagerContext();
  const { deleteTransactionDB, isError, isSucess, message, resetState } =
    UseAuthContext();

  const handleDelete = async () => {
    const res = await deleteTransactionDB(_id);

    if (res.message) {
      toast.error(res.message);
      deleteTransaction(_id);
    } else {
      toast.error("Something went wrong");
    }

    resetState();
  };

  const handleEdit = () => {
    getEditTransaction(_id);
  };

  return (
    <div className={`transaction ${type}`}>
      <div className="transaction__header--container">
        <div className="transaction__group">
          <span
            style={{
              opacity: "0.4",
            }}
          >
            Note
          </span>
          <span className="transaction--note">{note}</span>
        </div>
        <div className="transaction__buttons--container">
          <Link
            to="/edit-transaction"
            className="transaction__btn--edit"
            onClick={handleEdit}
          >
            <FaEdit />
          </Link>
          <button className="transaction__btn--delete" onClick={handleDelete}>
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="transaction__details--container">
        <div className="transaction__group--2">
          <p className="transaction--category">{category} </p>
          <p className="transaction--date">{date}</p>
        </div>
        <h3 className="transaction--amount">{convertToCurrency(amount)}</h3>
      </div>
    </div>
  );
}

export default Transaction;
