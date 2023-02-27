import React from "react";
import { UseManagerContext } from "../context/StateManagerContext";
import "../styles/filteredTransaction.css";

function FilterTransactions({ handleChange, handleSelect, handleCheck }) {
  const {
    filterOpen,
    handleStartDateChange,
    handleEndDateChange,
    startDate,
    endDate,
    todaysDate,
  } = UseManagerContext();
  let active = filterOpen ? "active" : null;
  return (
    <div className={`filtered__transaction--container ${active}`}>
      <div className="set__date--container">
        <div className="set__date--group">
          <label htmlFor="start-date">From</label>
          <input
            type="date"
            name="start-date"
            id="start-date"
            value={startDate}
            max={todaysDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="set__date--group">
          <label htmlFor="end-date">To</label>
          <input
            type="date"
            name="end-date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div className="filtered__transaction--container-small">
        <input
          type="text"
          placeholder="Search transaction's"
          className="filtered__transaction--search"
          onChange={handleChange}
        />
        <select
          name="filter-transactions"
          className="filtered__transaction--select"
          onChange={handleSelect}
        >
          <option value="all" className="filtered__transaction--option">
            All
          </option>
          <option value="today" className="filtered__transaction--option">
            Today's
          </option>
          <option value="previous" className="filtered__transaction--option">
            Previous
          </option>
        </select>
      </div>
      <div className="filtered__transaction--types">
        <div className="filtered__transaction--types-group">
          <input
            type="radio"
            value="income"
            name="transaction-type"
            id="income"
            onChange={handleCheck}
          />
          <label
            htmlFor="income"
            className="filtered__transaction--types-label"
          >
            Income
          </label>
        </div>
        <div className="filtered__transaction--types-group">
          <input
            type="radio"
            value="expense"
            name="transaction-type"
            id="expense"
            onChange={handleCheck}
          />
          <label
            htmlFor="expense"
            className="filtered__transaction--types-label"
          >
            Expense
          </label>
        </div>
        <div className="filtered__transaction--types-group">
          <input
            type="radio"
            value="both"
            name="transaction-type"
            id="both"
            onChange={handleCheck}
          />
          <label htmlFor="both" className="filtered__transaction--types-label">
            Both
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterTransactions;
