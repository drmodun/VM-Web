import React, { useState } from "react";
import Login from "../../../Components/Web/Login";
import Background from "../../../assets/background.svg";
import classes from "./LoginPage.module.scss";

export const LoginPage = () => {
    return (
        <div className={classes.LoginPage}>
            <div className={classes.BackgroundImage}>
                <img src={Background} alt="" />
            </div>
            <div className={classes.Backdrop}></div>
            <div className={classes.LoginContainer}>
            <Login />
            </div>            
        </div>

    )
}