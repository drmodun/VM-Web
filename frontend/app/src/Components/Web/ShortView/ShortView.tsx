import React from "react";
import classes from "./ShortView.module.scss";
import Placeholder from "../../../assets/placeholder.webp";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  link: string;
  isShort?: boolean;
  directory: string;
  id: string;
}
export const ShortView = ({
  title,
  subtitle,
  link,
  isShort,
  directory,
  id,
}: Props) => {
  return (
    <Link to={link} className={classes.Link}>
      <div className={isShort ? classes.ShortContainer : classes.Container}>
        <div className={classes.Item}>
          <div className={classes.Image}>
            <img
              src={
                `https://media0testing.blob.core.windows.net/vm-racunala/${directory}/${id}`
              }
              onError={
                (e) => {
                  e.currentTarget.src = Placeholder;
                }
              }
              alt={title}
            />
          </div>
          <div className={classes.ItemInfo}>
            <span className={classes.Name}>{title}</span>
            <span className={classes.Subtitle}>Produkti: ({subtitle})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
