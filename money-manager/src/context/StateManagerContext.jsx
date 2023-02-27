import React, { useContext, useState, createContext, useEffect } from "react";
import moment from "moment";
import { UseAuthContext } from "./authContext";

export const MoneyManagerContext = React.createContext();

export const UseManagerContext = () => {
  return useContext(MoneyManagerContext);
};

export const ManagerContextProvider = ({ children }) => {
  const { user, transactionsArr } = UseAuthContext();
  const [categoriesExpense, setCategoriesExpense] = useState([
    "Food",
    "Health",
    "Households",
    "Other",
  ]);
  const [categoriesIncome, setCategoriesIncome] = useState([
    "Salary",
    "Other",
    "Gift",
  ]);
  const [transactions, setTransactions] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editTransaction, setEditTransaction] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const todaysDate = moment().format("YYYY-MM-DD");
  const firstDateofCurrentMonth = moment()
    .startOf("month")
    .format("YYYY-MM-DD");

  // const oneMonthAgo = moment().subtract(1, "months").format("YYYY-MM-DD");
  // const currentMonth = moment().format("MMMM");

  const [startDate, setStartDate] = useState(firstDateofCurrentMonth);
  const [endDate, setEndDate] = useState(todaysDate);
  const [filterOpen, setFilterOpen] = useState(false);

  // Income Total
  const incomeTotal = incomes.reduce((acc, income) => {
    return acc + parseFloat(income.amount);
  }, 0);

  // Expense Total
  const expenseTotal = expenses.reduce((acc, expense) => {
    return acc + parseFloat(expense.amount);
  }, 0);

  useEffect(() => {
    setFilteredTransactions(transactions);

    if (transactions.length === 0) {
      setEditTransaction([]);
    }
  }, [transactions]);

  useEffect(() => {
    const incomesArr = filteredTransactions.filter((trn) => {
      return trn.type === "income";
    });

    const expensesArr = filteredTransactions.filter((trn) => {
      return trn.type === "expense";
    });

    setIncomes(incomesArr);
    setExpenses(expensesArr);
  }, [filteredTransactions]);

  useEffect(() => {
    setTransactions(transactionsArr);
  }, [user, transactionsArr]);

  useEffect(() => {
    const newFilteredTransactions = transactions.filter((transaction) => {
      const date = moment(transaction.date);
      return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
    });

    setFilteredTransactions(newFilteredTransactions);
  }, [startDate, endDate]);

  const convertToCurrency = (number) => {
    let currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);

    return currency;
  };

  // Adding Transaction
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => {
      return [...prevTransactions, { ...transaction }];
    });
  };

  // Deleting Transactions
  const deleteTransaction = (_id) => {
    const newTransactions = transactions.filter((transaction) => {
      return transaction._id !== _id;
    });

    setTransactions(newTransactions);
  };

  // Getting editable transaction coming from transaction
  const getEditTransaction = (_id) => {
    const transaciton = transactions.filter((trn) => {
      return trn._id === _id;
    });

    setEditTransaction(transaciton);
  };

  // Updated Transaction coming from edit transaction
  const updatedTransaction = (transaction) => {
    // Updating transactions
    const newTransactions = transactions;
    const index = newTransactions.findIndex((trn) => {
      return trn._id === transaction._id;
    });
    newTransactions[index] = transaction;

    setTransactions(newTransactions);

    const newFilteredTransactions = newTransactions.filter((transaction) => {
      const date = moment(transaction.date);
      return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
    });

    setFilteredTransactions(newFilteredTransactions);

    // Updating incomes
    const newIncomes = newTransactions.filter((trn) => {
      return trn.type === "income";
    });

    setIncomes(newIncomes);

    // Updating expenses
    const newExpenses = newTransactions.filter((trn) => {
      return trn.type === "expense";
    });

    setExpenses(newExpenses);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleToggleFilter = () => {
    setFilterOpen((prevState) => !prevState);
  };

  const getTotalByCategory = (objects, category) => {
    let total = 0;
    for (const object of objects) {
      if (object.category === category) {
        total += object.amount;
      }
    }
    return total;
  };

  const MoneyManagerContextValue = {
    categoriesExpense,
    categoriesIncome,
    addTransaction,
    incomeTotal,
    expenseTotal,
    deleteTransaction,
    getEditTransaction,
    editTransaction,
    updatedTransaction,
    todaysDate,
    expenses,
    incomes,
    filteredTransactions,
    handleStartDateChange,
    handleEndDateChange,
    startDate,
    endDate,
    convertToCurrency,
    handleToggleFilter,
    filterOpen,
    getTotalByCategory,
    setEditTransaction,
  };

  return (
    <MoneyManagerContext.Provider value={MoneyManagerContextValue}>
      {children}
    </MoneyManagerContext.Provider>
  );
};
