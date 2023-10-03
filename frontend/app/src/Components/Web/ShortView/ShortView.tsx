import React from "react";
import classes from "./ShortView.module.scss";
import Placeholder from "../../../assets/placeholder.webp";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  link: string;
  isCompany?: boolean;
  directory: string;
  id: string;
}
export const ShortView = ({
  title,
  subtitle,
  link,
  isCompany,
  directory,
  id,
}: Props) => {
  isCompany &&  console.log(link);
  return (
    <Link
      to={
        isCompany
          ? `https://www.microline.hr/EUWeb/StartEU.ashx?_command=showMark&mark=${link}`
          : `https://www.microline.hr/EUWeb/StartEU.ashx?_command=showGroup&group=${link}`
      }
      className={classes.Link}
    >
      <div className={classes.Container}>
        <div className={classes.Item}>
          <div className={classes.Image}>
            <img
              src={`https://media0testing.blob.core.windows.net/vm-racunala/${directory}/${id}`}
              onError={(e) => {
                e.currentTarget.src = Placeholder;
              }}
              alt={title}
            />
          </div>
          <div className={classes.ItemInfo}>
            <span className={classes.Name}>{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
