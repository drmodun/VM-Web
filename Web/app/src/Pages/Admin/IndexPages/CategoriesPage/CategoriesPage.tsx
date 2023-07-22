import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Category,
  deleteCategory,
  getCategory,
  getCategories,
} from "../../../../Api/CategoryApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
//implement filter and sorting TODO
export const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const categoryGetter = async () => {
    setStatus("Loading...");
    const categories = await getCategories();
    console.log(categories);
    if (categories?.items) {
      setCategories(categories.items);
      setTotalPages(categories.pageInfo.totalPages || 1);
      setTotalItems(categories.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${categories.pageInfo.page} of ${categories.pageInfo.totalPages!}`
      );
      setStatus("Categorys fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const categorySearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const categories = await getCategories(parameters);
    if (categories?.items) {
      setCategories(categories.items);
      console.log(categories);
      setTotalPages(categories.pageInfo.totalPages || 1);
      setTotalItems(categories.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${categories.pageInfo.page} of ${categories.pageInfo.totalPages!}`
      );
      setStatus("Categorys fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    categoryGetter();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteCategory(id);
    if (result) {
      setCategories(categories.filter((category) => category.id !== id));
      setStatus("Category deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  //TODO: add filters and sorting

  return (
    <div className={classes.Page}>
      <h1>Categorys</h1>
      <p>The page where you can edit, view, delete and create categories</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={categories.map((category) => {
            return {
              id: category.id,
              name: category.name,
              description: category.description,
            };
          })}
          links={[]}
          important={["id", "name", "description"]}
          deleteItem={handleDeleteCategory} //TODO
          type="categories"
        />
        <div className={classes.CategoryPagePagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <p>{pageInfo}</p>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.CategoryPageSearch}>
          <Search.CategorySearch search={categorySearch} />
        </div>
        <div className={classes.CategoryPageCreate}>
          <h2>Create Category</h2>
          <Forms.CategoryForm />
        </div>
      </div>
    </div>
  );
};
