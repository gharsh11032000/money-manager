import React, { useEffect, useState } from "react";
import { UseAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const { register, user, isError, message, isSucess, resetState } =
    UseAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSucess) {
      toast.success(message);
      navigate("/login");
    }

    resetState();
  }, [isError, isSucess, navigate, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("Password not match");
    }

    setIsLoading(true);
    await register(formData);
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
        <PageHeader to={"/"} heading={"Register"} />
        <form onSubmit={handleSubmit} className="login-register__form">
          <div className="login-register__form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={name}
              autoComplete="off"
            />
          </div>
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
          <div className="login-register__form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={handleChange}
              value={password2}
              autoComplete="off"
              required
            />
          </div>
          <button type="submit" className="btn__form-login-register">
            Register
          </button>

          <div className="form__link-group">
            Already have an account ? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
