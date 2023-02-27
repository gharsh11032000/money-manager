import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTransaction from "./pages/EditTransaction";
import Overview from "./pages/Overview";
import IncomeOverview from "./pages/IncomeOverview";
import ExpenseOverview from "./pages/ExpenseOverview";
import Incomes from "./pages/incomes";
import Expenses from "./pages/Expenses";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-transaction" element={<PrivateRoute />}>
            <Route path="/add-transaction" element={<AddTransaction />} />
          </Route>
          <Route path="/edit-transaction" element={<EditTransaction />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/overview-income" element={<IncomeOverview />} />
          <Route path="/overview-expense" element={<ExpenseOverview />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} theme="light" />
    </>
  );
}

export default App;
