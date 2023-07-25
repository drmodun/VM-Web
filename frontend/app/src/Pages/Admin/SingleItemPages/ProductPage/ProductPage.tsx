import { Product, getProduct } from "../../../../Api/ProductApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";
import { getCategories } from "../../../../Api/CategoryApi";
import { Category, Company, Subcategory } from "../../../../Types/Interfaces";
import { getSubcategories } from "../../../../Api/SubcategoryApi";
import { getCompanies } from "../../../../Api/CompanyApi";

interface Values {
  [key: string]: string | number;
}

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [value, setValue] = useState<Values>({});
  useEffect(() => {
    tryGetProduct();
    tryGetCategories();
    tryGetSubcategories();
    tryGetCompanies();

    // fetch product data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  const tryGetProduct = async () => {
    const tryProduct = await getProduct(productId as string);
    if (tryProduct) {
      setProduct(tryProduct);
      const date = new Date(tryProduct.lastUpdated);
      const tempValue = {} as Values;
      tempValue["id"] = tryProduct.id;
      tempValue["name"] = tryProduct.name;
      tempValue["Category"] = tryProduct.categoryName;
      tempValue["Subcategory"] = tryProduct.subcategoryName;
      tempValue["Company"] = tryProduct.companyName;
      tempValue["date"] = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      tempValue["description"] = tryProduct.description;
      tempValue["price"] = tryProduct.price;
      Object.keys(tryProduct.attributes).forEach((key: string) => {
        tempValue[key] = tryProduct.attributes[key] as string;
      });
      Object.keys(tryProduct.subAttributes).forEach((key: string) => {
        tempValue[key] = tryProduct.subAttributes[key] as string;
      });
      tempValue["image"] = tryProduct.image;
      tempValue["quantity"] = tryProduct.quantity.toString();

      setValue(tempValue);
    }
  };
  const tryGetCategories = async () => {
    const tryCategories = await getCategories();
    if (tryCategories?.items) {
      setCategories(tryCategories.items);
      return;
    }
    setCategories([]);
  };

  const tryGetSubcategories = async () => {
    const trySubcategories = await getSubcategories();
    if (trySubcategories?.items) {
      setSubcategories(trySubcategories.items);
      return;
    }
    setSubcategories([]);
  };

  const tryGetCompanies = async () => {
    const tryCompanies = await getCompanies();
    if (tryCompanies?.items) {
      setCompanies(tryCompanies.items);
      return;
    }
    setCompanies([]);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {product &&
         (
          <div className={classes.ItemInfo}>
            <span>Product Info:</span>
            <ItemView
              item={value}
              links={[
                {
                  name: "Company",
                  link: `/admin/companies/${product.companyId}`,
                },
                {
                  name: "Category",
                  link: `/admin/categories/${product.categoryId}`,
                },
                {
                  name: "Subcategory",
                  link: `/admin/subcategories/${product.subcategoryId}`,
                },
              ]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          {product && categories && subcategories && companies.length > 0 && (
            <Forms.ProductForm
              categories={categories
                .filter((category) => 
                subcategories.filter((subcategory) => subcategory.categoryId === category.id).length > 0
                )
              }
              isEdit={true}
              item={product}
              reload={tryGetProduct}
              subCatgories={subcategories}
              companies={companies}
            />
          )}
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
