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
            <h3>Korisnik</h3>
            <ul>
              <Link className={classes.Link} to={"/user"}>
                <li>Korisnička stranica</li>
              </Link>
            </ul>
          </div>
          <div className={classes.FooterSection}>
            <h3>Što nudimo?</h3>
            <ul>
              <Link className={classes.Link} to={"/"}>
                <li>Početna stranica</li>
              </Link>
              <Link className={classes.Link} to={"/services"}>
                <li>Servisi</li>
              </Link>
              <Link className={classes.Link} to={"/categories"}>
                <li>Kategorije</li>
              </Link>
              <Link className={classes.Link} to={"/brands"}>
                <li>Brendovi</li>
              </Link>

              <Link className={classes.Link} to={"/clients"}>
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
                  vm-mail@vm-racunala.store?subject=Kontakt sa stranice"
                >
                  vm-mail@vm-racunala.store
                </a>
              </li>
              <li>
                <a className={classes.Link} href="tel:+021/543-318">
                  021/543-318
                </a>
              </li>
              <li>Adresa: Vukovarska ulica 127</li>
              <li>Prodajno mjesto: Velebitska ulica 71</li>
            </ul>
          </div>
        </div>
        <div className={classes.Divider}></div>
        <div className={classes.Author}>
          <p>Made by</p>
          <a href="https://www.linkedin.com/in/jan-modun-020779260">
            Jan Modun
          </a>
        </div>
      </footer>
    </div>
  );
};
