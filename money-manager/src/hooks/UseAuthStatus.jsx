import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../context/authContext";

function UseAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { user } = UseAuthContext();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return {
    isLoggedIn,
    checkingStatus,
  };
}

export default UseAuthStatus;
