import React, { useState } from "react";
import classes from "./Navigation.module.scss";
import Logo from "../../../assets/logo.svg";
import Menu from "../../../assets/menu.svg";
import Search from "../../../assets/search.svg";
import Favourites from "../../../assets/favourite.svg";
import Cart from "../../../assets/shopping_cart.svg";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className={classes.Navigation}>
      <nav>
        <Link className={classes.Logo} to={"/"}>
          <img src={Logo} alt="vm-logo" />
        </Link>
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
            //TODO: add elastic search
            onClick={() => search && navigate(`/search/?name=${search}`)}
          >
            <img src={Search} alt="search" />
          </button>
        </div>

        {!isLoggedIn ? (
          <Link className={classes.Login} to="/login">
            <span>Login</span>
          </Link>
        ) : (
          <Link className={classes.Profile} to="/user">
            <span>{userName}</span>
          </Link>
        )}
      </nav>
    </div>
  );
};
