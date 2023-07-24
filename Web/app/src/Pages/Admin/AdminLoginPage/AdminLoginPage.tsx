import { useState } from "react";
import { login } from "../../../Api/UserApi";
import classes from "./AdminLoginPage.module.scss";
import Inputs from "../../../Components/Admin/FormElements";

export const AdminLoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Loading...");
    setLoading(true);
    const response = await login(email, password);
    if (response) {
      setStatus("Login successful");
      setLoading(false);
      alert("Login successful");
      window.location.href = "/admin";
    } else {
      setStatus("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className={classes.Login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Inputs.TextInput
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {status}
    </div>
  );
};
