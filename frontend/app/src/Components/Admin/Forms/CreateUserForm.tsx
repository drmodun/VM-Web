import { useState } from "react";
import {
  createUser,
  NewUser,
  toggleAdmin,
  updateUser,
  User,
} from "../../../Api/UserApi";
import Inputs from "../FormElements";
import classes from "./Forms.module.scss";

interface Props {
  isEdit: boolean;
  item?: User | null;
  reload: Function;
}

export const UserForm = ({ isEdit, item, reload }: Props) => {
  const [name, setName] = useState<string>(item?.name || "");
  const [email, setEmail] = useState<string>(item?.email || "");
  const [isAdmin, setIsAdmin] = useState<boolean>(item?.isAdmin || false);
  const [address, setAddress] = useState<string>(item?.address || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    item?.phoneNumber || ""
  );
  const [status, setStatus] = useState<string>("");

  const handleAdminChange = async (value: boolean) => {
    const action = await toggleAdmin(item?.id as string);
    if (!action) {
      alert("Failed to toggle admin");
      return;
    }
    setIsAdmin(value);
    reload();
  };

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
      id: item?.id,
      name,
      email,
      address,
      phoneNumber,
    };

    //later add a ternary desision for adding admins
    const response = !isEdit
      ? await createUser(newUser)
      : await updateUser(newUser);
    response
      ? setStatus("User" + isEdit ? "edited" : "created" + "successfully")
      : setStatus("User creation failed");
    response && reload();
  };

  return (
    <div className={classes.Form}>
      <h1>{isEdit ? "Edit User" : "Create User"}</h1>
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
          onChange={(e) => handleAdminChange(e.target.checked)}
        />
        <button type="submit">Create User</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};

//later add special effects for loading and success and error
