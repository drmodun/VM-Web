import { Subcategory, deleteSubcategory, getSubcategory } from "../../../../Api/SubcategoryApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";
import { Category, getCategories } from "../../../../Api/CategoryApi";

interface Values {
  [key: string]: string;
}

export const SubcategoryPage = () => {
  const { subcategoryId } = useParams();
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [value, setValue] = useState<Values>({});
  const [categories, setCategories] = useState<Category[]>([]);

  const tryGetSubcategory = async () => {
    const trySubcategory = await getSubcategory(subcategoryId as string);
    if (trySubcategory) {
      setSubcategory(trySubcategory);
      const tempValue = {} as Values;
      tempValue["name"] = trySubcategory.name;
      tempValue["categoryId"] = trySubcategory.categoryId;
      tempValue["categoryName"] = trySubcategory.categoryName;
      tempValue["description"] = trySubcategory.description;
      Object.keys(trySubcategory.subSchema).forEach((key: string) => {
        tempValue[key] = trySubcategory.subSchema[key] as string;
      });
      setValue(tempValue);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (!confirmation) return;
    const tryAction = await deleteSubcategory(subcategoryId as string);
    if (!tryAction) return;
    alert("Subcategory successfully deleted");
    window.location.href = "/admin/subcategories";
  };
  useEffect(() => {
    tryGetCategories();
    tryGetSubcategory();

    // fetch category data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  const tryGetCategories = async () => {
    const tryCategories = await getCategories();
    if (tryCategories?.items) {
      setCategories(tryCategories.items);
      return;
    }
    setCategories([]);
  };
  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {subcategory && (
          <div className={classes.ItemInfo}>
            <span>Subcategory Info:</span>
            <ItemView
              item={value}
              links={[
                {
                  name: "categoryName",
                  link: `/admin/categories/${subcategory.categoryId}`,
                },
              ]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          {subcategory && categories && (
            <Forms.SubcategoryForm
              isEdit={true}
              reload={tryGetSubcategory}
              item={subcategory!}
              categories={categories}
            />
          )}
          <button onClick={handleDelete} className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
