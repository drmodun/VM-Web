import { useState } from "react";
import { User, updateUser, updateUserInfo } from "../../../Api/UserApi";
import classes from "./EditableUserInfo.module.scss";
import LargeInput from "../LargeInput";
export interface Props {
    user: User;
    setUser: Function;
    setEdit: Function;
}

export const EditableUserInfo = ({ user }: Props) => {
    const [name, setName] = useState<string>(user.name);
    const [address, setAddress] = useState<string>(user.address);
    const [email, setEmail] = useState<string>(user.email);
    const [phone, setPhone] = useState<string>(user.phoneNumber);

    const handleSave = () => {
        const userInfo: updateUserInfo = {
            name,
            address,
            email,
            phoneNumber: phone,
        };
        

    };
    return (
        <div className={classes.EditableUserInfo}>
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
            <div className={classes.Buttons}>
                <button
                    className={classes.Save}
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className={classes.Cancel}
                    onClick={() => setEdit(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}