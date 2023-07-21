import { useState } from "react";
import { createUser, NewUser } from "../../../Api/UserApi";
import Inputs from "../FormElements";
import classes from "./Forms.module.scss";
export const UserForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Loading...");
    if (name.length > 50 || name.length < 3) {
      setStatus("Name is not valid");
      return;
    }

    if (email.length > 50 || email.length < 3) {
      setStatus("Email is not valid");
      return;

      //later add a regex for email validation
    }

    if (password.length > 50 || password.length < 3) {
      setStatus("Password is not valid");
      return;

      //later add a regex for password validation, at least 1 number, 1 uppercase, 1 lowercase, 1 special character
    }

    if (address.length > 50 || address.length < 3) {
      setStatus("Address is not valid");
      return;
    }

    if (
      phoneNumber.length > 50 ||
      phoneNumber.length < 3 ||
      isNaN(Number(phoneNumber))
    ) {
      setStatus("Phone Number is not valid");
      return;
    }

    const newUser: NewUser = {
      name,
      email,
      password,
      address,
      phoneNumber,
    };

    //later add a ternary desision for adding admins
    const response = await createUser(newUser);
    response
      ? setStatus("User created successfully")
      : setStatus("User creation failed");
  };

  return (
    <div className={classes.Form}>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Inputs.EmailInput
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
        <Inputs.TextInput
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Inputs.TextInput
          label="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Inputs.CheckboxInput
          label="Is Admin"
          name="isAdmin"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <button type="submit">Create User</button>
      </form>
      <div className={classes.Status}>{status}</div >
    </div>
  );
};

//later add special effects for loading and success and error
