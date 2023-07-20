import { useState } from "react";
import { createUser, NewUser } from "../../../Api/UserApi";
import Inputs from "../FormElements";
import classes from "./Forms.module.scss";
export const UserForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (name.length > 50 || name.length < 3) {
      setError("Name is not valid");
      setLoading(false);
      return;
    }

    if (email.length > 50 || email.length < 3) {
      setError("Email is not valid");
      setLoading(false);
      return;

      //later add a regex for email validation
    }

    if (password.length > 50 || password.length < 3) {
      setError("Password is not valid");
      setLoading(false);
      return;

      //later add a regex for password validation, at least 1 number, 1 uppercase, 1 lowercase, 1 special character
    }

    if (address.length > 50 || address.length < 3) {
      setError("Address is not valid");
      setLoading(false);
      return;
    }

    if (phoneNumber.length > 50 || phoneNumber.length < 3 || isNaN(Number(phoneNumber))) {
      setError("Phone Number is not valid");
      setLoading(false);
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
      ? setSuccess("User created successfully")
      : setError("User creation failed");
    setLoading(false);
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
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

//later add special effects for loading and success and error
