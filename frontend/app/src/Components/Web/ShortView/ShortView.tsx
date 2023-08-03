import React from "react";
import classes from "./ShortView.module.scss";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";

interface Props {
  titlte: string;
  subtitle: string;
  link: string;
  isShort?: boolean;
}
//TODO: add images support for categories
export const ShortView = ({ titlte, subtitle, link, isShort}: Props) => {
  return (
    <Link to={link} className={classes.Link}>
      <div className={ isShort ? classes.ShortContainer :
        classes.Container}>
        <div className={classes.Item}>
          <div className={classes.Image}>
            <img src={Placeholder} alt={titlte} />
          </div>
          <div className={classes.ItemInfo}>
            <span className={classes.Name}>{titlte}</span>
            <span className={classes.Subtitle}>Produkti: ({subtitle})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
