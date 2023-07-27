import classes from "./SideMenu.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import close from "../../../assets/close.svg";

interface Props {
  closeMenu: () => void;
  menuOpen: boolean;
  isLoggedIn: boolean;
  userName?: string;
}

export const SideMenu = ({
  closeMenu,
  menuOpen,
  isLoggedIn,
  userName,
}: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.SideMenu}>
        <div className={classes.Close} onClick={closeMenu}>
          <img src={close} alt="close" />
        </div>
        <div className={classes.Menu}>
          {isLoggedIn ? (
            <Link className={classes.User} to="/me">
              <span>{userName}</span>
            </Link>
          ) : (
            <Link className={classes.User} to="/login">
              Login
            </Link>
          )}
          <div className={classes.Divider}></div>
          <div className={classes.Links}>
            <h3>Stranice</h3>
            <Link className={classes.Link} to="/products">
              <span>Proizvodi</span>
            </Link>
            <Link className={classes.Link} to="/services">
              <span>Servisi</span>
            </Link>
            <Link className={classes.Link} to="/previous-clients">
              <span>Prijašnji klijenti</span>
            </Link>
            <Link className={classes.Link} to="/categories">
              <span>Kategorije</span>
            </Link>
            <Link className={classes.Link} to="/brands">
              <span>Brendovi</span>
            </Link>
          </div>
          <div className={classes.Divider}></div>
          <div className={classes.Links}>
            <h3>Info</h3>
            <Link className={classes.Link} to="/about">
              <span>O nama</span>
            </Link>
            <Link className={classes.Link} to="/contact">
              <span>Kontakt</span>
            </Link>
            <Link className={classes.Link} to="/faq">
              <span>FAQ</span>
            </Link>
            <Link className={classes.Link} to="/terms">
              <span>Uslovi korišćenja</span>
            </Link>
          </div>
          <div className={classes.Divider}></div>
          <div className={classes.Info}>
            <h3>Contact</h3>
            <a
              href="mailto:
                jan.modun.st@gmail.com
                ?subject=Kontakt sa stranice"
            >
              jan.modun.st@gmail.com
              <br />
            </a>
            <a href="tel:+38761548123">+387 61 548 123</a>
          </div>
        </div>
      </div>
      <div
        className={classes.Backdrop}
        onClick={closeMenu}
        style={{ display: menuOpen ? "block" : "none" }}
      ></div>
    </div>
  );
};
