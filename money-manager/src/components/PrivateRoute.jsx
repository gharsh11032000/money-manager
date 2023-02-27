import React from "react";
import UseAuthStatus from "../hooks/UseAuthStatus";
import Loader from "./Loader";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { checkingStatus, isLoggedIn } = UseAuthStatus();

  if (checkingStatus) {
    return (
      <div className="page__container">
        <div className="loader__container">
          <Loader />
        </div>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
