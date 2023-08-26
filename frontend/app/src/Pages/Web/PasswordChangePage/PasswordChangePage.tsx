import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import classes from "./PasswordChangePage.module.scss";
import { activateUser, changePassword } from "../../../Api/UserApi";
import Show from "../../../assets/Show.svg";
import Hide from "../../../assets/Hide.svg";
import Input from "../../../Components/Web/Input";

export const PasswordChangePage = () => {
  const [activationCode] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordChanger = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Lozinke se ne podudaraju");
      return;
    }
    const response = await changePassword(
      activationCode.get("code") || "",
      password
    );
    if (!response) {
      alert("Neuspješna promjena šifre");
      return;
    }
    setSuccess(response);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.PasswordChangePage}>
        <div className={classes.Title}>Promijeni šifru</div>
        <form className={classes.Form} onSubmit={passwordChanger}>
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
            name="Confirm password"
            type="password"
            placeholder="Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            icon1={Hide}
            icon2={Show}
          />
          <button className={classes.Button}>Promijenji šifru</button>
        </form>
        {success && (
          <div className={classes.Success}>
            <span>Uspješno promijenjenja šifra</span>
            <Link className={classes.Link} to={"/login"}>
              Idi na prijavu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
