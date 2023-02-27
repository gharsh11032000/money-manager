import React from "react";
import Transaction from "../components/Transaction";
import { Link } from "react-router-dom";
import { FaChevronCircleRight, FaArrowLeft } from "react-icons/fa";
import { UseManagerContext } from "../context/StateManagerContext";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function Incomes() {
  const { incomes, incomeTotal, convertToCurrency } = UseManagerContext();

  const navigate = useNavigate();

  return (
    <div className="page__container">
      <div className="incomes__transaction--container">
        <PageHeader to={"/"} heading={"Income"} />

        <div className="total__amount--container">
          <div className="total__amount--group-container">
            <div
              className="total__amount--group total__amount--income total__amount--hover"
              onClick={() => navigate("/overview-income")}
            >
              <div className="total__amount--group-small">
                <label>Income Overview</label>
                <FaChevronCircleRight />
              </div>
              <h2>{convertToCurrency(incomeTotal)}</h2>
            </div>
          </div>
        </div>
        <div className="group__transactions--container group__incomes--container ">
          {incomes &&
            incomes
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
