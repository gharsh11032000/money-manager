import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UseManagerContext } from "../context/StateManagerContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronCircleRight } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

function Overview() {
  const {
    expenseTotal,
    categoriesExpense,
    expenses,
    convertToCurrency,
    getTotalByCategory,
  } = UseManagerContext();

  const navigate = useNavigate();

  const expenseTotalByCategory = categoriesExpense.map((category) => {
    return getTotalByCategory(expenses, category);
  });

  const [dataExpenseByCategory, setDataExpenseByCategory] = useState({
    labels: categoriesExpense,
    datasets: [
      {
        label: "Amount ($)",
        data: expenseTotalByCategory,
      },
    ],
  });

  return (
    <div className="page__container">
      <div className="overview__transaction--container">
        <PageHeader to={"/overview"} heading={"Expense Overview"} />
        <div className="total__amount--container">
          <div className="total__amount--group-container">
            <div
              className="total__amount--group total__amount--expense total__amount--hover"
              onClick={() => navigate("/expenses")}
            >
              <div className="total__amount--group-small">
                <label>Expense Transaction's</label>
                <FaChevronCircleRight />
              </div>
              <h2>{convertToCurrency(expenseTotal)}</h2>
            </div>
          </div>
        </div>
        <div className="chart--container">
          <Pie
            data={dataExpenseByCategory}
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
