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
            <Link className={classes.User} onClick={closeMenu} to="/me">
              <span>{userName}</span>
            </Link>
          ) : (
            <Link className={classes.User} onClick={closeMenu} to="/login">
              Login
            </Link>
          )}
          <div className={classes.Divider}></div>
          <div className={classes.Links}>
            <h3>Stranice</h3>
            <Link className={classes.Link} onClick={closeMenu} to="/">
              <span>Početna stranica</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/products">
              <span>Proizvodi</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/services">
              <span>Servisi</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/clients">
              <span>Prijašnji klijenti</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/categories">
              <span>Kategorije</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/brands">
              <span>Brendovi</span>
            </Link>
          </div>
          <div className={classes.Divider}></div>
          <div className={classes.Links}>
            <h3>Info</h3>
            <Link className={classes.Link} onClick={closeMenu} to="/about">
              <span>O nama</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/contact">
              <span>Kontakt</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/faq">
              <span>FAQ</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/terms">
              <span>Uslovi korišćenja</span>
            </Link>
          </div>
          <div className={classes.Divider}></div>
          <div className={classes.Info}>
            <h3>Contact</h3>
            <a
              href="mailonClick={closeMenu} to:
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
