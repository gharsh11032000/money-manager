import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import { UseManagerContext } from "../context/StateManagerContext";
import FilterTransactions from "./FilterTransactions";
import { UseAuthContext } from "../context/authContext";

function TransactionGroup() {
  const { filteredTransactions, todaysDate } = UseManagerContext();
  const [searchValue, setSearchValue] = useState("");
  const [localTransactions, setLocalTransactions] = useState([]);
  const [selectValue, setSelectValue] = useState("all");
  const [selectTransactionType, setSelectTransactionType] = useState("both");

  useEffect(() => {
    setLocalTransactions(filteredTransactions);
  }, [filteredTransactions, localTransactions]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const handleCheck = (e) => {
    setSelectTransactionType(e.target.value);
  };

  const props = {
    handleChange,
    handleSelect,
    handleCheck,
  };

  return (
    <div className="group__transactions--container">
      <FilterTransactions {...props} />
      {localTransactions &&
        localTransactions
          .filter((transaction) => {
            if (selectTransactionType === "income")
              return transaction.type === "income";
            if (selectTransactionType === "expense")
              return transaction.type === "expense";
            return transaction;
          })
          .filter((transaction) => {
            if (selectValue === "today") return transaction.date === todaysDate;
            if (selectValue === "previous")
              return transaction.date !== todaysDate;
            return transaction;
          })
          .filter((transaction) =>
            searchValue.toLowerCase() === ""
              ? transaction
              : Object.values(transaction)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((transaction) => {
            return (
              <div className="transaction__container" key={transaction._id}>
                <Transaction {...transaction} />
              </div>
            );
          })}
    </div>
  );
}

export default TransactionGroup;
