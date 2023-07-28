import React, { useState } from "react";
import classes from "./Navigation.module.scss";
import Logo from "../../../assets/logo.svg";
import Menu from "../../../assets/menu.svg";
import Search from "../../../assets/search.svg";
import Favourites from "../../../assets/favourite.svg";
import Cart from "../../../assets/shopping_cart.svg";
import { Link } from "react-router-dom";

interface Props {
  setMenuOpen: () => void;
  menuOpen: boolean;
  propSearch?: string;
  isLoggedIn: boolean;
  userName?: string;
}

export const Navigation = ({
  setMenuOpen,
  propSearch,
  isLoggedIn,
  userName,
}: Props) => {
  const [search, setSearch] = useState(propSearch || "");
  return (
    <div className={classes.Navigation}>
      <nav>
        <div className={classes.Logo}>
          <img src={Logo} alt="vm-logo" />
        </div>
        <div className={classes.Menu} onClick={setMenuOpen}>
          <img src={Menu} alt="menu" />
          <span> Menu</span>
        </div>
        <div className={classes.Search}>
          <input
            type="text"
            name="search"
            placeholder="Traži..."
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={classes.SearchButton}
            //TODO: add search funcionality
            onClick={() => {}}
          >
            <img src={Search} alt="search" />
          </button>
        </div>
        <div className={classes.Buttons}>
          <Link className={classes.Favourites} to="/favourites">
            <img src={Favourites} alt="favourites" />
          </Link>
          <Link className={classes.Cart} to="/cart">
            <img src={Cart} alt="favourites" />
          </Link>
        </div>
        {!isLoggedIn ? (
          <Link className={classes.Login} to="/login">
            <span>Login</span>
          </Link>
        ) : (
          <Link className={classes.Profile} to="/profile">
            <span>{userName}</span>
          </Link>
        )}
      </nav>
    </div>
  );
};
