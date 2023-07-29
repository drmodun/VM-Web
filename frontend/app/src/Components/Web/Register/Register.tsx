import { NewUser, User, login } from "../../../Api/UserApi";
import Logo from "../../../assets/logo.svg";
import Show from "../../../assets/Show.svg";
import Hide from "../../../assets/Hide.svg";
import { Link } from "react-router-dom";
import Email from "../../../assets/Email.svg";
import classes from "./Register.module.scss";
import Phone from "../../../assets/phone.svg";
import Address from "../../../assets/address.svg";
import username from "../../../assets/username.svg";
import Input from "../Input";
import React, { useState } from "react";

//TODO: add editing accoutn wihtout changing password

interface Props {
  isEdit: boolean;
  user?: User;
  onRegister: (data: NewUser) => boolean | Promise<boolean>;
}

export const Register = ({ isEdit, user, onRegister }: Props) => {
  const [name, setName] = useState(isEdit ? user?.name! : "");
  const [email, setEmail] = useState(isEdit ? user?.email! : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState(isEdit ? user?.address! : "");
  const [phoneNumber, setPhoneNumber] = useState(
    isEdit ? user?.phoneNumber! : ""
  );
  const [error, setError] = useState("");
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !email ||
      !name ||
      !address ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (
      !email.match(
        // eslint-disable-next-line no-control-regex
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      )
    ) {
      setError("Email is not valid");
      return;
    }
    if (name.length < 3 || name.length > 20 || !name.toLowerCase().match(/^[a-zA-Z]+$/)) {
      setError(
        "Name must be between 3 and 20 characters and contain only letters"
      );
      return;
    }
    if (
      address.length < 3 ||
      address.length > 20 ||
      !address.toLocaleLowerCase().match(/^[a-zA-Z]+$/)
    ) {
      setError(
        "Address must be between 3 and 20 characters and contain only letters"
      );
      return;
    }
    if (
      phoneNumber.length < 3 ||
      phoneNumber.length > 20 ||
      !phoneNumber.match(/^[0-9]+$/)
    ) {
      setError(
        "Phone number must be between 3 and 20 characters and contain only numbers"
      );
      return;
    }
    if (password.length < 6) {
      setError("Password must be longer than 6 characters");
      return;
    }

    const newUser: NewUser = {
      name,
      email,
      password,
      address,
      phoneNumber,
    };

    const response = await onRegister(newUser);
    if (response) {
      alert("Registration successful, please log in");
      window.location.href = "/login";
      return;
    }
    setError("Invalid credentials");
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Register}>
        <div className={classes.RegisterForm}>
          <div className={classes.RegisterFormHeader}>
            <img src={Logo} alt="VM-racunala" />
            <h1>Register</h1>
            <Link to="/login" className={classes.Link}>
              Log in
            </Link>
          </div>
          <div className={classes.RegisterFormBody}>
            <form className={classes.RegisterFormBodyInput} onSubmit={handleRegister}>
              <Input
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon1={username}
              />
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
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon1={Hide}
                icon2={Show}
              />
              <Input
                label="Address"
                name="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                icon1={Address}
              />
              <Input
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                icon1={Phone}
              />

              <div className={classes.Error}>
                <p>{error}</p>
              </div>
              <button className={classes.Button}>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
