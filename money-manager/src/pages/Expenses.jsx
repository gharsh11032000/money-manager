import React from "react";
import Transaction from "../components/Transaction";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaChevronCircleRight } from "react-icons/fa";
import { UseManagerContext } from "../context/StateManagerContext";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function Incomes() {
  const { expenses, expenseTotal, convertToCurrency } = UseManagerContext();

  const navigate = useNavigate();

  return (
    <div className="page__container">
      <div className="expenses__transaction--container">
        <PageHeader to={"/"} heading={"Expense"} />
        <div className="total__amount--container">
          <div className="total__amount--group-container">
            <div
              className="total__amount--group total__amount--expense total__amount--hover"
              onClick={() => navigate("/overview-expense")}
            >
              <div className="total__amount--group-small">
                <label>Expense Overview</label>
                <FaChevronCircleRight />
              </div>
              <h2>{convertToCurrency(expenseTotal)}</h2>
            </div>
          </div>
        </div>
        <div className="group__transactions--container group__expenses--container ">
          {expenses &&
            expenses
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((transaction) => {
                return (
                  <div className="transaction__container" key={transaction._id}>
                    <Transaction {...transaction} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default Incomes;
