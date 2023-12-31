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
    if (searchTerm.get("name") === "") return;
    window.scrollTo(0, 0);
    window.document.title = "Search";
    productFetcher();
    categoryFetcher();
    subcategoryFetcher();
    brandFetcher();
  }, []);

  useEffect(() => {
    if (searchTerm.get("name") === "") return;
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
          Rezultati pretrage za: {searchTerm.get("name")}
        </h2>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>Kategorije: {categories.length}</h3>
          {categories.length ? (
            <div className={classes.SectionList}>
              {categories.map((category) => (
                <ShortView
                  subtitle={category.numberOfProducts.toString()}
                  directory="categories"
                  title={category.name}
                  id={category.id}
                  link={`/categories/${category.id}`}
                />
              ))}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih kategorija</span>
          )}
        </div>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>
            Subkategorije: {subcategories.length}
          </h3>
          {subcategories.length ? (
            <div className={classes.SectionList}>
              {subcategories.map((subcategory) => (
                <ShortView
                  subtitle={subcategory.numberOfProducts.toString()}
                  title={subcategory.name}
                  directory="subcategories"
                  link={`/subcategories/${subcategory.id}`}
                  id={subcategory.id}
                />
              ))}
            </div>
          ) : (
            <span className={classes.NotFound}>
              Nema pronađenih subkategorija
            </span>
          )}
        </div>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>Brendovi: {brands.length}</h3>
          {brands.length ? (
            <div className={classes.SectionList}>
              {brands.map((brand) => (
                <ShortView
                  directory="companies"
                  id={brand.id}
                  subtitle={brand.numberOfProducts.toString()}
                  title={brand.name}
                  link={`/brands/${brand.id}`}
                />
              ))}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih brendova</span>
          )}
        </div>
        <div className={classes.Section}>
          <h3 className={classes.Subtitle}>Proizvodi: {products.length}</h3>
          {products.length ? (
            <div className={classes.ProductList}>
              {products.map((product) => (
                <ProductView product={product} />
              ))}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih proizvoda</span>
          )}
        </div>
      </div>
    </div>
  );
};
