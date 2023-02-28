import { createContext, useContext, useEffect, useState } from "react";
import axios from "@bundled-es-modules/axios/axios.js";

export const AuthContext = createContext();

export const UseAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [transactionsArr, setTransactionsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSucess] = useState(false);

   const API_URL = "/api/transactions/";
  const REGISTER_URL = "/api/user/";
  const LOGIN_URL = "/api/user/login/";

  const config = {
    headers: {
      Authorization: `Bearer ${user ? user.token : ""}`,
    },
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (data) {
      setUser(data);
    }
  }, []);

  async function login(userData) {
    try {
      const response = await axios.post(LOGIN_URL, userData);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setIsSucess(true);
        setIsError(false);
        setMessage("Logged in Sucessfully");
      }
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
      setIsSucess(false);
      console.log(error);
    }
  }

  async function register(userData) {
    try {
      const response = await axios.post(REGISTER_URL, userData);

      if (response.data) {
        setMessage("Registered Sucessfuly");
        setIsSucess(true);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setIsSucess(false);
      console.log(error);
    }
  }

  function logOut() {
    localStorage.removeItem("user");
    setUser(null);
    setIsError(false);
    setIsSucess(false);
    setMessage("");
    setTransactionsArr([]);
  }

  async function getTransactions() {
    try {
      const response = await axios.get(API_URL, config);

      if (response.data) {
        setTransactionsArr(response.data);
        setIsError(false);
        setMessage("");
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.log(error);
      setIsLoading(false);
    }
  }

  async function createTransaction(transactionData) {
    try {
      const response = await axios.post(API_URL, transactionData, config);

      if (response.data) {
        setIsError(false);
        setMessage("Transaction Added");
        setIsSucess(true);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.log(error);
    }
  }

  async function deleteTransactionDB(id) {
    try {
      const response = await axios.delete(API_URL + id, config);

      if (response.data) {
        setIsError(false);
        setMessage("");
        setIsSucess(true);

        return response.data;
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.log(error);
    }
  }

  async function updateTransactionDB(id, transactionData) {
    try {
      const response = await axios.put(API_URL + id, transactionData, config);

      if (response.data) {
        setIsError(false);
        setMessage("Transaction Updated");
        setIsSucess(true);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getTransactions();
    }
  }, [user]);

  const resetState = () => {
    setIsError(false);
    setIsSucess(false);
    setMessage("");
  };

  const AuthContextValues = {
    register,
    user,
    isError,
    message,
    login,
    logOut,
    transactionsArr,
    createTransaction,
    deleteTransactionDB,
    updateTransactionDB,
    isLoading,
    isSucess,
    resetState,
  };

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
