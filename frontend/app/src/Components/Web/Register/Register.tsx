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
      setError(
        "Sva polja moraju biti popunjena, adresa služi kao dostavna adresa, a broj mobitel kao kontakt broj"
      );
      return;
    }
    const passwordCheck = password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    );
    if (!passwordCheck) {
      setError(
        "Lozinka mora sadržavati barem 8 znakova, jedno veliko slovo, jedno malo slovo i jedan broj"
      );
      return;
    }

    if (
      !email.match(
        // eslint-disable-next-line no-control-regex
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      )
    ) {
      setError("Mail nije validan");
      return;
    }
    if (name.length < 3 || name.length > 20) {
      setError("Ime mora biti između 3 i 20 znakova i sadržavati samo slova");
      return;
    }
    if (address.length < 3 || address.length > 20) {
      setError(
        "Adresa mora biti između 3 i 20 znakova i sadržavati samo slova"
      );
      return;
    }
    if (
      phoneNumber.length < 3 ||
      phoneNumber.length > 20 ||
      !phoneNumber.match(/^[0-9]+$/)
    ) {
      setError(
        "Broj mobitela mora biti između 3 i 20 znakova i sadržavati samo brojeve"
      );
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
      alert(
        "Registracija uspješna, provjerite svoj email za potvrdu registracije, ako ne vidite mail provjerite spam folder i neželjenu poštu"
      );
      window.location.href = "/#/login";
      return;
    }
    setError("Greška pri registraciji");
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Register}>
        <div className={classes.RegisterForm}>
          <div className={classes.RegisterFormHeader}>
            <img src={Logo} alt="VM-racunala" />
            <h1>Registracija</h1>
            <Link to="/login" className={classes.Link}>
              Prijavi se
            </Link>
          </div>
          <div className={classes.RegisterFormBody}>
            <form
              className={classes.RegisterFormBodyInput}
              onSubmit={handleRegister}
            >
              <Input
                label="Name"
                name="name"
                type="text"
                placeholder="Ime"
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
                label="Šifra"
                name="password"
                type="password"
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon1={Hide}
                icon2={Show}
              />
              <Input
                label="Potvrdi lozinku"
                name="confirmPassword"
                type="password"
                placeholder="Potvrdi lozinku"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon1={Hide}
                icon2={Show}
              />
              <Input
                label="Adresa"
                name="address"
                type="text"
                placeholder="Adresa"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                icon1={Address}
              />
              <Input
                label="Broj mobitela"
                name="phoneNumber"
                type="text"
                placeholder="Broj mobitela"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                icon1={Phone}
              />

              <div className={classes.Error}>
                <p>{error}</p>
              </div>
              <button className={classes.Button}>Registracija</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
