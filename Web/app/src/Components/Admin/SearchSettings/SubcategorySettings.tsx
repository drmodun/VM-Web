import { useState } from "react";
import classes from "./Settings.module.scss";
import Inputs from "../FormElements";
import { GetAllProps } from "../../../Api/SubcategoryApi";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import { Category } from "../../../Types/Interfaces";

interface Props {
  search: Function;
  categories: Category[];
}

export const SubcategorySearch = ({ search, categories }: Props) => {
  const [name, setName] = useState<string>("");
  const [sortBy, setSortBy] = useState<number>(-1);
  const [sortType, setSortType] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (page < 0 || limit < 0 || category === "") {
      return;
    }
    search({
      name,
      description,
      categoryId: category,
      "Sorting.Attribute":
        sortBy !== -1 && sortType !== -1 ? sortBy : undefined,
      "Sorting.SortType":
        sortBy !== -1 && sortType !== -1 ? sortType : undefined,
      "Pagination.PageNumber": page,
      "Pagination.PageSize": limit,
    } as GetAllProps);
  };

  return (
    <div className={classes.FormContainer}>
      <h1>Search Categories</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Inputs.TextInput
          label="Description"
          name="Email"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Inputs.SelectInput
          label="Category"
          name="category"
          value={-1}
          options={[
            { value: -1, label: "None" },
            ...categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
          onChange={(e) => console.log(e.target.value)}
        />

        <Inputs.SelectInput
          label="Sort By"
          name="sortBy"
          value={sortBy}
          options={[
            { value: -1, label: "None" },
            { value: SortAttributeType.SortByName, label: "Name" },
            {
              value: SortAttributeType.SortByCategoryName,
              label: "Category Name",
            },
          ]}
          onChange={(e) => setSortBy(Number(e.target.value))}
        />
        <Inputs.SelectInput
          label="Sort Type"
          name="sortType"
          value={sortType}
          options={[
            { value: -1, label: "None" },
            { value: SortType.Ascending, label: "Ascending" },
            { value: SortType.Descending, label: "Descending" },
          ]}
          onChange={(e) => setSortType(Number(e.target.value))}
        />
        <Inputs.NumberInput
          label="Page"
          name="page"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        />
        <Inputs.NumberInput
          label="Limit"
          name="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};
