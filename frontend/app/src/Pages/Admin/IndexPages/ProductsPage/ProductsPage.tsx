import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Product,
  deleteProduct,
  getProduct,
  getProducts,
} from "../../../../Api/ProductApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
import { getCategories } from "../../../../Api/CategoryApi";
import { Category, Company, Subcategory } from "../../../../Types/Interfaces";
import { getSubcategories } from "../../../../Api/SubcategoryApi";
import { getCompanies } from "../../../../Api/CompanyApi";
export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const productGetter = async () => {
    setStatus("Loading...");
    const products = await getProducts();
    console.log(products);
    if (products?.items) {
      setProducts(products.items);
      setTotalPages(products.pageInfo.totalPages || 1);
      setTotalItems(products.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${products.pageInfo.page} of ${products.pageInfo.totalPages!}`
      );
      setStatus("Products fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const productSearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const products = await getProducts(parameters);
    if (products?.items) {
      setProducts(products.items);
      console.log(products);
      setTotalPages(products.pageInfo.totalPages || 1);
      setTotalItems(products.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${products.pageInfo.page} of ${products.pageInfo.totalPages!}`
      );
      setStatus("Products fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const categoryGetter = async () => {
    setStatus("Loading...");
    const categories = await getCategories();
    if (categories?.items) {
      setCategories(categories.items);
      setStatus("Categories fetched successfully");
    }
  };

  const subcategoryGetter = async () => {
    setStatus("Loading...");
    const subcategories = await getSubcategories();
    if (subcategories?.items) {
      setSubcategories(subcategories.items);
      setStatus("Subcategories fetched successfully");
    }
  };
  const companyGetter = async () => {
    setStatus("Loading...");
    const companies = await getCompanies();
    if (companies?.items) {
      setCompanies(companies.items);
      setStatus("Companies fetched successfully");
    }
  };

  useEffect(() => {
    categoryGetter();
    subcategoryGetter();
    companyGetter();
    productGetter();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    const result = await deleteProduct(id);
    if (result) {
      setProducts(products.filter((category) => category.id !== id));
      setStatus("Product deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };


  return (
    <div className={classes.Page}>
      <h1>Products</h1>
      <p>The page where you can edit, view, delete and create products</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={products.map((product) => {
            return {
              id: product.id,
              name: product.name,
              categoryName: product.categoryName,
              description: product.description,
              categoryId: product.categoryId,
              subcategoryId: product.subcategoryId,
              subcategoryName: product.subcategoryName,
              companyId: product.companyId,
              companyName: product.companyName,
              price: product.price,
              quantity: product.quantity,
            };
          })}
          links={[
            { name: "categoryName", link: "categoryId", type: "categories" },
            {
              name: "subcategoryName",
              link: "subcategoryId",
              type: "subcategories",
            },
            { name: "companyName", link: "companyId", type: "companies" },
          ]}
          important={[
            "name",
            "categoryName",
            "subcategoryName",
            "companyName",
            "price",
            "quantity",
          ]}
          deleteItem={handleDeleteProduct} 
          type="products"
        />
        <div className={classes.ProductPagePagination}>
          
        </div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.ProductPageSearch}>
          <Search.ProductSearch
            search={productSearch}
            companies={companies}
            subcategories={subcategories}
            categories={categories}
          />
        </div>
        <div className={classes.ProductPageCreate}>
          { subcategories && companies && categories &&
            <Forms.ProductForm
           isEdit={false}
           reload={productGetter}
            subCatgories={subcategories}
            companies={companies}
            categories={categories
                .filter((category) => subcategories.filter
                ((subcategory) => subcategory.categoryId === category.id).length
                 > 0)
            }
          />}
        </div>
      </div>
    </div>
  );
};
