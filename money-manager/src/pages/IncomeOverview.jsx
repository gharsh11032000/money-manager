import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UseManagerContext } from "../context/StateManagerContext";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronCircleRight } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

function Overview() {
  const {
    incomeTotal,
    categoriesIncome,
    incomes,
    convertToCurrency,
    getTotalByCategory,
  } = UseManagerContext();

  const navigate = useNavigate();

  const incomeTotalByCategory = categoriesIncome.map((category) => {
    return getTotalByCategory(incomes, category);
  });

  const [dataIncomeByCategory, setDataIncomeByCategory] = useState({
    labels: categoriesIncome,
    datasets: [
      {
        label: "Amount ($)",
        data: incomeTotalByCategory,
      },
    ],
  });

  return (
    <div className="page__container">
      <div className="overview__transaction--container">
        <PageHeader to={"/overview"} heading={"Income Overview"} />
        <div className="total__amount--container">
          <div className="total__amount--group-container">
            <div
              className="total__amount--group total__amount--income total__amount--hover"
              onClick={() => navigate("/incomes")}
            >
              <div className="total__amount--group-small">
                <label>Income Transaction's</label>
                <FaChevronCircleRight />
              </div>
              <h2>{convertToCurrency(incomeTotal)}</h2>
            </div>
          </div>
        </div>
        <div className="chart--container">
          <Pie
            data={dataIncomeByCategory}
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
