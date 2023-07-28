import Register from "../../../Components/Web/Register";
import React, { useState } from "react";
import Background from "../../../assets/background2.svg";
import classes from "./RegisterPage.module.scss";
import { createUser, NewUser} from "../../../Api/UserApi";
export const RegisterPage = () => {
    const CreateAccount = async (data: NewUser) => {
        const response = await createUser(data);
        return response;
    }
    return (
        <div className={classes.LoginPage}>
            <div className={classes.BackgroundImage}>
                <img src={Background} alt="" />
            </div>
            <div className={classes.Backdrop}></div>
            <div className={classes.LoginContainer}>
            <Register
                isEdit={false}
                onRegister={CreateAccount}
             />
            </div>            
        </div>

    )
}