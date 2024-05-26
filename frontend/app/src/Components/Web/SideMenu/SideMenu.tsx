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
            <Link className={classes.User} onClick={closeMenu} to="/user">
              <span>{userName}</span>
            </Link>
          ) : (
            <Link className={classes.User} onClick={closeMenu} to="/login">
              Login
            </Link>
          )}
          <div className={classes.Divider} />
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
          <div className={classes.Divider} />
          <div className={classes.Links}>
            <h3>Korisnik</h3>
            <Link className={classes.Link} onClick={closeMenu} to="/user">
              <span>Korisnička stranica</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/favourites">
              <span>Favoriti</span>
            </Link>
            <Link className={classes.Link} onClick={closeMenu} to="/cart">
              <span>Košarica</span>
            </Link>
          </div>
          <div className={classes.Divider} />
          <div className={classes.Info}>
            <h3>Contact</h3>
            <a
              href="mailonClick={closeMenu} to:
                vm-mail@vm-racunala.store
                ?subject=Kontakt sa stranice"
            >
              vm-mail@vm-racunala.store
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
       />
    </div>
  );
};
