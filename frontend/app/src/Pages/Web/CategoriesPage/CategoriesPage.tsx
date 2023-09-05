import { useEffect, useState } from "react";
import classes from "./CategoriesPage.module.scss";
import {
  ShortCategory,
  getCategories,
  getShortCategories,
} from "../../../Api/CategoryApi";
import categories2 from "../../../assets/categories1.webp";
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
        <div className={classes.CoverText}>
          <h1>Kategorije</h1>
          <p>
            Pronađite kategoriju koja vas zanima i pronađite proizvode koji su vam potrebni.
          </p>
        </div>
      </div>
      <div className={classes.CategoriesPage}>
        {categories && categories.length > 0 ? (
          <div className={classes.Categories}>
            {categories &&
              categories.map((category) => (
                <ShortView
                  title={category.name}
                  id={category.id}
                  subtitle={category.numberOfProducts.toString()}
                  link={`/categories/${category.id}`}
                  directory="categories"
                />
              ))}
          </div>
        ) : (
          <div className={classes.Empty}>
            <h2>Nema kategorija trenutno, molimo vas da se vratite kasnije.</h2>
          </div>
        )}
      </div>
    </div>
  );
};
