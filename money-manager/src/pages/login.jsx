import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;
  const { login, user, message, isSucess, isError, resetState } =
    UseAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSucess || user) {
      toast.success(message);
      navigate("/");
    }

    resetState();
  }, [user, isError, isSucess, message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(formData);
    setIsLoading(false);
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
      <div className="login-register__container">
        <PageHeader to={"/"} heading={"Login"} />
        <form onSubmit={handleSubmit} className="login-register__form">
          <div className="login-register__form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
              required
              autoComplete="off"
            />
          </div>
          <div className="login-register__form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={password}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn__form-login-register">
            Login
          </button>

          <div className="form__link-group">
            Don't have an account ? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
