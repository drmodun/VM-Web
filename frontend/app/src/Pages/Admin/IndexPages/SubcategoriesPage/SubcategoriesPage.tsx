import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Subcategory,
  deleteSubcategory,
  getSubcategory,
  getSubcategories,
} from "../../../../Api/SubcategoryApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
import { getCategories } from "../../../../Api/CategoryApi";
import { Category } from "../../../../Types/Interfaces";
export const SubcategoriesPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const subcategoryGetter = async () => {
    setStatus("Loading...");
    const subcategories = await getSubcategories();
    console.log(subcategories);
    if (subcategories?.items) {
      setSubcategories(subcategories.items);
      setTotalPages(subcategories.pageInfo.totalPages || 1);
      setTotalItems(subcategories.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${subcategories.pageInfo.page} of ${subcategories.pageInfo
          .totalPages!}`
      );
      setStatus("Subcategorys fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const subcategorySearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const subcategories = await getSubcategories(parameters);
    if (subcategories?.items) {
      setSubcategories(subcategories.items);
      console.log(subcategories);
      setTotalPages(subcategories.pageInfo.totalPages || 1);
      setTotalItems(subcategories.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${subcategories.pageInfo.page} of ${subcategories.pageInfo
          .totalPages!}`
      );
      setStatus("Subcategories fetched successfully");
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

  useEffect(() => {
    categoryGetter();
    subcategoryGetter();
  }, []);

  const handleDeleteSubcategory = async (id: string) => {
    const result = await deleteSubcategory(id);
    if (result) {
      setSubcategories(subcategories.filter((category) => category.id !== id));
      setStatus("Subcategory deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };


  return (
    <div className={classes.Page}>
      <h1>Subkategorije</h1>
      <p>The page where you can edit, view, delete and create subcategories</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={subcategories.map((subcategory) => {
            return {
              id: subcategory.id,
              name: subcategory.name,
              categoryName: subcategory.categoryName,
              description: subcategory.description,
              categoryId: subcategory.categoryId,
            };
          })}
          links={[
            { name: "categoryName", link: "categoryId", type: "categories" },
          ]}
          important={["name", "categoryName", "description"]}
          deleteItem={handleDeleteSubcategory} 
          type="subcategories"
        />
        <div className={classes.SubcategoryPagePagination}></div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.SubcategoryPageSearch}>
          <Search.SubcategorySearch
            search={subcategorySearch}
            categories={categories}
          />
        </div>
        <div className={classes.SubcategoryPageCreate}>
          <Forms.SubcategoryForm
            isEdit={false}
            reload={subcategoryGetter}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};
