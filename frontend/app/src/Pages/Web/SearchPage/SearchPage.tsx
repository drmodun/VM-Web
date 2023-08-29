import { useParams, useSearchParams } from "react-router-dom";
import { ShortProduct, getShortProducts } from "../../../Api/ProductApi";
import { ShortCategory, getShortCategories } from "../../../Api/CategoryApi";
import {
  ShortSubcategory,
  getShortSubcategories,
} from "../../../Api/SubcategoryApi";
import { ShortCompany, getShortCompanies } from "../../../Api/CompanyApi";
import classes from "./SearchPage.module.scss";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import { useState, useEffect } from "react";
import ShortView from "../../../Components/Web/ShortView";
import ProductView from "../../../Components/Web/ProductView";

export const SearchPage = () => {
  const [searchTerm] = useSearchParams();
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [categories, setCategories] = useState<ShortCategory[]>([]);
  const [brands, setBrands] = useState<ShortCompany[]>([]);
  const [subcategories, setSubcategories] = useState<ShortSubcategory[]>([]);
  const [loading, setLoading] = useState(true);

  const productFetcher = async () => {
    const products = await getShortProducts(
      {
        name: searchTerm.get("name") || "",
        "Sorting.Attribute": SortAttributeType.SortByName,
        "Sorting.SortType": SortType.Ascending,
      }
      //maybe add pagination here
    );
    if (!products) return;
    setProducts(products.items);
  };

  const categoryFetcher = async () => {
    const categories = await getShortCategories({
      name: searchTerm.get("name") || "",
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
    });
    if (!categories) return;
    setCategories(categories.items);
  };

  const subcategoryFetcher = async () => {
    const subcategory = await getShortSubcategories({
      name: searchTerm.get("name") || "",
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
    });
    if (!subcategory) return;
    setSubcategories(subcategory.items);
  };
  const brandFetcher = async () => {
    const brands = await getShortCompanies({
      name: searchTerm.get("name") || "",
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
    });
    if (!brands) return;
    setBrands(brands.items);
  };

  useEffect(() => {
    productFetcher();
    categoryFetcher();
    subcategoryFetcher();
    brandFetcher();
  }, []);

  useEffect(() => {
    productFetcher();
    categoryFetcher();
    subcategoryFetcher();
    brandFetcher();
    setLoading(false);
    window.scrollTo(0, 0);
  }, [searchTerm]);

  return (
    <div className={classes.Container}>
      <div className={classes.SearchPage}>
        <h2 className={classes.Title}>
          Search Results for: {searchTerm.get("name")}
        </h2>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>Categories: {categories.length}</h3>
          <div className={classes.SectionList}>
            {categories.map((category) => (
              <ShortView
                subtitle={category.numberOfProducts.toString()}
                directory="categories" 
                titlte={category.name} //TODO: fix all misspellings
                id={category.id}
                link={`/categories/${category.id}`}
              />
            ))}
          </div>
        </div>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>
            Subcategories: {subcategories.length}
          </h3>
          <div className={classes.SectionList}>
            {subcategories.map((subcategory) => (
              <ShortView
                subtitle={subcategory.numberOfProducts.toString()}
                titlte={subcategory.name} //TODO: fix all misspellings
                directory="subcategories"
                link={`/subcategories/${subcategory.id}`}
                id={subcategory.id}
              />
            ))}
          </div>
        </div>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>Brands: {brands.length}</h3>
          <div className={classes.SectionList}>
            {brands.map((brand) => (
              <ShortView
                directory="companies"
                id={brand.id}
                subtitle={brand.numberOfProducts.toString()}
                titlte={brand.name} //TODO: fix all misspellings
                link={`/brands/${brand.id}`}
              />
            ))}
          </div>
        </div>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>Products: {products.length}</h3>
          <div className={classes.ProductList}>
            {products.map((product) => (
              <ProductView product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
