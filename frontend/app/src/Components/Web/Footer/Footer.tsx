import React from "react";
import classes from "./Footer.module.scss";
import { Link } from "react-router-dom";
import Facebook from "../../../assets/facebook.svg";
import Instagram from "../../../assets/Instagram.svg";
import Telegram from "../../../assets/Telegram.svg";
import Tiktok from "../../../assets/Tiktok.svg";
export const Footer = () => {
  return (
    <div className={classes.Footer}>
      <footer>
        <div className={classes.FooterContent}>
          <div className={classes.FooterSection}>
            <h3>Kompanija</h3>
            <ul>
              <Link className={classes.Link} to={"/about"}>
                <li>O nama</li>
              </Link>
              <Link className={classes.Link} to={"/contact"}>
                <li>Kontakt</li>
              </Link>
              <Link className={classes.Link} to={"/faq"}>
                <li>FAQ</li>
              </Link>
              <Link className={classes.Link} to="/temrs">
                <li>Uslovi korišćenja</li>
              </Link>
            </ul>
          </div>
          <div className={classes.FooterSection}>
            <h3>Što nudimo?</h3>
            <ul>
              <Link className={classes.Link} to={"/"}>
                <li>Početna stranica</li>
              </Link>
              <Link className={classes.Link} to={"/products"}>
                <li>Svi proizvodi</li>
              </Link>
              <Link className={classes.Link} to={"/services"}>
                <li>Servisi</li>
              </Link>
              <Link className={classes.Link} to={"/previous-clients"}>
                <li>Prijašnji klijenti</li>
              </Link>
            </ul>
          </div>
          <div className={classes.InfoSection}>
            <h3>Info</h3>
            <ul>
              <li>
                <a
                  className={classes.Link}
                  href="mailto:
                    jan.modun.st@gmail.com?subject=Kontakt sa stranice"
                >
                  jan.modun.st@gmail.com
                </a>
              </li>
              <li>
                <a className={classes.Link} href="tel:+38761548123">
                  +387 61 548 123
                </a>
              </li>
              <li>
                <a className={classes.Link} href="tel:+38761548123">
                  +385 99 999 9999
                </a>
              </li>
              <li>
                adresa: <br /> ulica 1 <br /> 71000 Sarajevo <br /> HR
              </li>
            </ul>
            <div className={classes.Social}>
              <a href="https://www.facebook.com/">
                <img src={Facebook} alt="" />
              </a>
              <a href="https://www.instagram.com/">
                <img src={Instagram} alt="" />
              </a>
              <a href="https://www.telegram.com/">
                <img src={Telegram} alt="" />
              </a>
              <a href="https://www.tiktok.com/">
                <img src={Tiktok} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className={classes.Divider}></div>
        <div className={classes.Author}>
          <p>Made by</p>
          <a href="/about">Jan Modun</a>
        </div>
      </footer>
    </div>
  );
};
