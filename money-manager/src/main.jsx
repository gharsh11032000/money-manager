import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ManagerContextProvider } from "./context/StateManagerContext";
import { AuthContextProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ManagerContextProvider>
        <App />
      </ManagerContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
