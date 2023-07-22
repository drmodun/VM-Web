import { Category, getCategory } from "../../../../Api/CategoryApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";

interface Values {
  [key: string]: string;
}

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [value, setValue] = useState<Values>({});

  useEffect(() => {
    const tryGetCategory = async () => {
      const tryCategory = await getCategory(categoryId as string);
      if (tryCategory) {
        setCategory(tryCategory);
        const tempValue = {} as Values;
        tempValue["name"] = tryCategory.name;
        tempValue["description"] = tryCategory.description;
        Object.keys(tryCategory.schema).forEach((key: string) => {
          tempValue[key] = tryCategory.schema[key] as string;
        });
        setValue(tempValue);
      }
    };
    tryGetCategory();

    // fetch category data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {category && (
          <div className={classes.ItemInfo}>
            <span>Category Info:</span>
            <ItemView item={value} links={[]} />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          <Forms.CategoryForm />
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
