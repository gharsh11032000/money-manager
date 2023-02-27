import React from "react";
import {
  FaFilter,
  FaPlus,
  FaTimes,
  FaChevronCircleRight,
  FaChartPie,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { UseManagerContext } from "../context/StateManagerContext";
import TransactionGroup from "../components/TransactionGroup";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../context/authContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function Home() {
  const {
    incomeTotal,
    expenseTotal,
    convertToCurrency,
    handleToggleFilter,
    filterOpen,
  } = UseManagerContext();
  const navigate = useNavigate();

  const { user, logOut, isLoading } = UseAuthContext();

  const handleLogout = () => {
    toast.success("Logged out Sucessfully");
    logOut();
  };

  if (isLoading) {
    return (
      <div className="page__container">
        <div className="loader__container">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="page__container">
      <div className="fixed__home-header--container">
        {user ? (
          <div className="home__header--container">
            <h2>Welcome Back !</h2>
            <button
              className="btn__transaction--save btn__login"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="home__header--container">
            <h2>Hey! Buddy</h2>
            <button
              className="btn__transaction--save btn__login"
              onClick={() => navigate("/login")}
            >
              <span>Login</span>
            </button>
          </div>
        )}
        <div className="total__amount--container">
          <div className="total__amount--group-container">
            <div
              className="total__amount--group total__amount--income total__amount--hover"
              onClick={() => navigate("/incomes")}
            >
              <div className="total__amount--group-small">
                <label>Income</label>
                <FaChevronCircleRight />
              </div>
              <span>{convertToCurrency(incomeTotal)}</span>
            </div>
            <div
              className="total__amount--group total__amount--expense total__amount--hover"
              onClick={() => navigate("/expenses")}
            >
              <div className="total__amount--group-small">
                <label>Expense</label>
                <FaChevronCircleRight />
              </div>
              <span>{convertToCurrency(expenseTotal)}</span>
            </div>
          </div>
          <div className="total__amount--group total__amount--remaining">
            <label>Total</label>
            <span>{convertToCurrency(incomeTotal - expenseTotal)}</span>
          </div>
        </div>
      </div>
      <div className="buttons__home--container">
        <button
          className="btn__filter--transaction"
          onClick={handleToggleFilter}
        >
          {filterOpen ? <FaTimes /> : <FaFilter />}
        </button>
        <Link to="/add-transaction" className="btn__add--transaction">
          <FaPlus />
        </Link>
        <Link to="/overview" className="btn__overview--transaction">
          <FaChartPie />
        </Link>
      </div>
      <TransactionGroup />
    </div>
  );
}

export default Home;
