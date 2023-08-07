import Register from "../../../Components/Web/Register";
import React, { useState, useEffect} from "react";
import Background from "../../../assets/background2.svg";
import classes from "./RegisterPage.module.scss";
import { createUser, NewUser} from "../../../Api/UserApi";
export const RegisterPage = () => {
    useEffect(() => {
        window.document.title = "Register";
        window.scrollTo(0, 0);
    }, []);
    const CreateAccount = async (data: NewUser) => {
        const response = await createUser(data);
        return response;
    }
    return (
        <div className={classes.RegisterPage}>
            <div className={classes.BackgroundImage}>
                <img src={Background} alt="" />
            </div>
            <div className={classes.Backdrop}></div>
            <div className={classes.RegisterContainer}>
            <Register
                isEdit={false}
                onRegister={CreateAccount}
             />
            </div>            
        </div>

    )
}