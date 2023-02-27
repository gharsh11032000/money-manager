import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageHeader = ({ to, heading }) => {
  return (
    <>
      <div className="page__header--container">
        <Link to={to} className="btn__back">
          <FaArrowLeft />
        </Link>
        <h2 className="add__transaction--heading">{heading}</h2>
      </div>
    </>
  );
};

export default PageHeader;
