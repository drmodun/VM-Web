import { forgotPassword, login } from "../../../Api/UserApi";
import Logo from "../../../assets/logo.svg";
import Show from "../../../assets/Show.svg";
import Hide from "../../../assets/Hide.svg";
import { Link } from "react-router-dom";
import Email from "../../../assets/Email.svg";
import classes from "./Login.module.scss";
import Input from "../Input";
import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response) {
      window.location.href = "/";
      return;
    }
    setError("Invalid credentials");
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await forgotPassword(email);
    if (response) {
      alert("Email poslan");
      window.location.href = "/#/login";
      return;
    }
    setError("Invalid credentials");
  }


  return (
    <div className={classes.Container}>
      <div className={classes.Login}>
        <div className={classes.LoginForm}>
          <div className={classes.LoginFormHeader}>
            <img src={Logo} alt="VM-racunala" />
            <h1>Login</h1>
            <Link to="/register" className={classes.Link}>
              Sign Up
            </Link>
          </div>
          <div className={classes.LoginFormBody}>
            <form className={classes.LoginFormBodyInput} onSubmit={tab ? handleForgotPassword :
              handleLogin}>
              {!tab && (
                <>
                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon1={Email}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon1={Hide}
                    icon2={Show}
                  />
                  <div
                    className={classes.Switch}
                    onClick={() => setTab((prev) => !prev)}
                  >
                    Zaboravili lozinku?
                  </div>
                </>
              )}
              {tab && (
                <>
                  <Input
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon1={Email}
                  />
                  <div
                    className={classes.Switch}
                    onClick={() => setTab((prev) => !prev)}
                  >
                    Prijavi se
                  </div>
                </>
              )}
              <div className={classes.Error}>
                <p>{error}</p>
              </div>
              <button className={classes.Button}>
                {tab ? "Pošalji email" : "Prijavi se"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
