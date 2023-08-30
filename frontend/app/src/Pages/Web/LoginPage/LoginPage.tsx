import React, { useState, useEffect } from "react";
import Login from "../../../Components/Web/Login";
import Background from "../../../assets/background.webp";
import classes from "./LoginPage.module.scss";

export const LoginPage = () => {
    useEffect(() => {
        window.document.title = "Login";
        window.scrollTo(0, 0);
    }, []);

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