import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UseManagerContext } from "../context/StateManagerContext";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function Overview() {
  const { incomeTotal, expenseTotal, convertToCurrency } = UseManagerContext();

  const navigate = useNavigate();

  const [dataIncomeAndExpense, setDataIncomeAndExpense] = useState({
    labels: ["Income", "Expense", "Total"],
    datasets: [
      {
        label: "Amount ($)",
        backgroundColor: ["#5dafe8", "#715fe7", "#f36262"],
        data: [incomeTotal, expenseTotal, incomeTotal - expenseTotal],
      },
    ],
  });

  return (
    <div className="page__container">
      <div className="overview__transaction--container">
        <PageHeader to={"/"} heading={"Overview"} />
        <div className="total__amount--container">
          <div className="total__amount--group-container">
            <div
              className="total__amount--group total__amount--income total__amount--hover"
              onClick={() => navigate("/overview-income")}
            >
              <div className="total__amount--group-small">
                <label>Income</label>
                <FaChevronCircleRight />
              </div>
              <span>{convertToCurrency(incomeTotal)}</span>
            </div>
            <div
              className="total__amount--group total__amount--expense total__amount--hover"
              onClick={() => navigate("/overview-expense")}
            >
              <div className="total__amount--group-small">
                <label>Expense</label>
                <FaChevronCircleRight />
              </div>
              <span>{convertToCurrency(expenseTotal)}</span>
            </div>
          </div>
        </div>
        <div className="chart--container">
          <Pie
            data={dataIncomeAndExpense}
            options={{
              responsive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
