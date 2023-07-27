import React from "react";
import { Category } from "../../../Api/CategoryApi";
import classes from "./CategoryView.module.scss";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";

interface Props {
  category: Category;
  isShort: boolean;
}
//TODO: add images support for categories
export const CategoryView = ({ category, isShort }: Props) => {
  return (
    <Link to={`/categories/${category.id}`} className={classes.Link}>
      <div className={classes.Container}>
        <div className={classes.Category}>
          <div className={classes.Image}>
            <img src={Placeholder} alt={category.name} />
          </div>
          <div className={classes.CategoryInfo}>
            <span className={classes.Name}>{category.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
