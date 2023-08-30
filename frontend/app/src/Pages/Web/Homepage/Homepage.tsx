import { ShortCategory, getShortCategories } from "../../../Api/CategoryApi";
import {
  GetAllProps,
  ShortProduct,
  getShortProducts,
} from "../../../Api/ProductApi";
import brands2 from "../../../assets/companies2.webp";
import ProductView from "../../../Components/Web/ProductView";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import classes from "./Homepage.module.scss";
import { useEffect, useState } from "react";
import products2 from "../../../assets/product2.webp";
import products3 from "../../../assets/products4.webp";
import categories1 from "../../../assets/categories2.webp";
import services1 from "../../../assets/services1.webp";
//perhaps later do some stuff with pictures again
import ShortView from "../../../Components/Web/ShortView";
import { Link } from "react-router-dom";
import { ShortCompany, getShortCompanies } from "../../../Api/CompanyApi";
const enum Tabs {
  Products,
  Categories,
  Services,
  Brands,
}
export const Homepage = () => {
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [categories, setCategories] = useState<ShortCategory[]>([]);
  const [tab, setTab] = useState<Tabs>(Tabs.Products);
  const [brands, setBrands] = useState<ShortCompany[]>([]);

  const productFetcher = async (params?: GetAllProps) => {
    const response = await getShortProducts({
      "Sorting.Attribute": SortAttributeType.SortByTotalSold,
      "Sorting.SortType": SortType.Descending,
      "Pagination.PageNumber": 1,
      "Pagination.PageSize": 20,
      ...params,
    });
    setProducts(response?.items!);
  };

  const categoryFetcher = async () => {
    const response = await getShortCategories({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Descending,
    });
    setCategories(response?.items!);
  };

  const brandFetcher = async () => {
    const response = await getShortCompanies({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Descending,
    });
    setBrands(response?.items!);
  };

  useEffect(() => {
    productFetcher();
    categoryFetcher();
    brandFetcher();
    window.scrollTo(0, 0);
    //TODO: look into performance issues with pictures
    window.document.title = "VM | Home";
  }, []);

  return (
    <div className={classes.Container}>
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href={products2}
        type="image/webp"
      ></link>
      <div className={classes.Cover}>
        <div className={classes.Backdrop}></div>
        <img src={products2} alt="" />
        <div
          className={
            //TODO: write a brader description
            classes.CoverText
          }
        >
          <h1>VM računala</h1>
          <p>Business solutions for IT</p>
        </div>
      </div>
      <div className={classes.Homepage}>
        <div className={classes.Cards}>
          <div
            className={classes.Arrow}
            onClick={() => setTab((prev) => (prev !== 0 ? prev - 1 : 0))}
          >
            {"<"}
          </div>
          <div className={classes.Upper}>
            {tab === Tabs.Categories && (
              <Link to={"/categories"} className={classes.Section}>
                <div className={classes.Title}>Categories</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={categories1} alt="kategorije" />
                </div>
              </Link>
            )}
            {tab === Tabs.Products && (
              <Link className={classes.Section} to="/products">
                <div className={classes.Title}>Products</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={products3} alt="kategorije" />
                </div>
              </Link>
            )}
            {tab === Tabs.Services && (
              <Link to="/services" className={classes.Section}>
                <div className={classes.Title}>Services</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={services1} alt="Servisi" />
                </div>
              </Link>
            )}
            {tab === Tabs.Brands && (
              <Link className={classes.Section} to="/brands">
                <div className={classes.Title}>Brands</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={brands2} alt="Brendovi" />
                </div>
              </Link>
            )}
            <div className={classes.DotRow}>
              <div
                className={
                  tab === Tabs.Products ? classes.ActiveDot : classes.Dot
                }
                onClick={() => setTab(Tabs.Products)}
              />
              <div
                className={
                  tab === Tabs.Categories ? classes.ActiveDot : classes.Dot
                }
                onClick={() => setTab(Tabs.Categories)}
              />
              <div
                className={
                  tab === Tabs.Services ? classes.ActiveDot : classes.Dot
                }
                onClick={() => setTab(Tabs.Services)}
              />
              <div
                onClick={() => setTab(Tabs.Brands)}
                className={
                  tab === Tabs.Brands ? classes.ActiveDot : classes.Dot
                }
              />
            </div>
          </div>
          <div
            className={classes.Arrow}
            onClick={() =>
              setTab((prev) => (prev !== Tabs.Brands ? prev + 1 : 3))
            }
          >
            {">"}
          </div>
        </div>
        <div className={classes.Row}>
          <span>Categories</span>
          {categories && categories.length ? (
            <div className={classes.List}>
              {categories &&
                categories.map((category) => {
                  return (
                    <ShortView
                      directory="categories"
                      id={category.id}
                      key={category.id}
                      link={`/categories/${category.id}`}
                      titlte={category.name}
                      subtitle={category.numberOfProducts.toString()}
                    />
                  );
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>No categories founds</span>
          )}
          <Link className={classes.ViewAll} to={"/categories"}>
            View all
          </Link>
        </div>
        <div className={classes.Row}>
          <span>Brands</span>
          {brands && brands.length ? (
            <div className={classes.List}>
              {brands &&
                brands.map((brand) => {
                  return (
                    <ShortView
                      key={brand.id}
                      link={`/brands/${brand.id}`}
                      directory="companies"
                      id={brand.id}
                      titlte={brand.name}
                      subtitle={brand.numberOfProducts.toString()}
                    />
                  );
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>No brands founds</span>
          )}
          <Link className={classes.ViewAll} to={"/brands"}>
            View all
          </Link>
        </div>
        <div className={classes.Row}>
          <span>Popularni produkti</span>
          {products && products.length ? (
            <div className={classes.ProductList}>
              {products &&
                products.map((product) => {
                  return <ProductView key={product.id} product={product} />;
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>No products founds</span>
          )}
        </div>
      </div>
    </div>
  );
};
