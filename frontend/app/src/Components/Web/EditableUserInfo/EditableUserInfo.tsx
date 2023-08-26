import { useState } from "react";
import {
  EditUser,
  User,
  deleteUser,
  updateUser,
  updateUserInfo,
} from "../../../Api/UserApi";
import classes from "./EditableUserInfo.module.scss";
import LargeInput from "../LargeInput";
export interface Props {
  user: User;
  reload: () => void;
}

export const EditableUserInfo = ({ user, reload }: Props) => {
  const [name, setName] = useState<string>(user.name);
  const [address, setAddress] = useState<string>(user.address);
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phoneNumber);
  const handleSave = async () => {
    const userInfo: updateUserInfo = {
      name,
      address,
      email,
      phoneNumber: phone,
    };
    const action = await EditUser(userInfo);
    action && reload();
  };

  const handleDelete = async () => {
    const action = await deleteUser();
    const confirmation = window.confirm("Are you sure you want to delete user?");
    //TODO: possibly add another verification check for deletion
    if (!confirmation) return;
    if (!action) {
      alert("Failed to delete user");
      return;
    }
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
  }; 
  return (
    <div className={classes.Container}>
      <LargeInput
        label="Name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LargeInput
        label="Address"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <LargeInput
        label="Email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <LargeInput
        label="Phone"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className={classes.Button}>
        <button className={classes.Save} onClick={handleSave}>
          Save
        </button>
      </div>
      <div className={classes.Button}>
        <button className={classes.Delete} onClick={handleDelete}>
          Delete account
        </button>
      </div>
    </div>
  );
};
