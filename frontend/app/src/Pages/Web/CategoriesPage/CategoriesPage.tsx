import { useEffect, useState } from "react";
import classes from "./CategoriesPage.module.scss";
import {
  ShortCategory,
  getCategories,
  getShortCategories,
} from "../../../Api/CategoryApi";
import categories1 from "../../../assets/categories1.svg";
import categories2 from "../../../assets/categories2.svg";
import { Category } from "../../../Types/Interfaces";
import Switch from "../../../Components/Web/Switch";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import ShortView from "../../../Components/Web/ShortView";

export const CategoriesPage = () => {
  // const [sortAttribute, setSortAttribute] = useState<SortAttributeType>(SortAttributeType.SortByName);
  // const [sortOrder, setSortOrder] = useState<SortType>(SortType.Ascending);

  const [categories, setCategories] = useState<ShortCategory[]>([]);

  const categoriesFetcher = async () => {
    const response = await getShortCategories();
    if (!response?.items) return;
    setCategories(response?.items);
  };

  useEffect(() => {
    categoriesFetcher();
    window.scrollTo(0, 0);
    window.document.title = "Categories";
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Cover}>
        <div className={classes.Backdrop}></div>
        <img src={categories2} alt="" />
        <div
          className={
            //TODO: write a brader description
            classes.CoverText
          }
        >
          <h1>Categories</h1>
          <p>Find your favorite category</p>
        </div>
      </div>
      <div className={classes.CategoriesPage}>
        <div className={classes.Categories}>
          {categories &&
            categories.map((category) => (
              <ShortView
                titlte={category.name}
                subtitle={category.numberOfProducts.toString()}
                link={`/categories/${category.id}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
