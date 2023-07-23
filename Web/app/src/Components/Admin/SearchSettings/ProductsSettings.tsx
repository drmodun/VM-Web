import { useState } from "react";
import classes from "./Settings.module.scss";
import Inputs from "../FormElements";
import { SortAttributeType } from "../../../Types/Enums";
import { GetAllProps } from "../../../Api/ProductApi";
import { Sorting } from "../../../Api/Shared";
import { Category } from "../../../Api/CategoryApi";
import { Subcategory } from "../../../Api/SubcategoryApi";
import { Company } from "../../../Types/Interfaces";

interface Props {
  search: Function;
  categories: Category[];
  subcategories: Subcategory[];
  companies: Company[];
}

export const ProductSearch = ({
  search,
  categories,
  subcategories,
  companies,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [sortBy, setSortBy] = useState<number>(-1);
  const [sortType, setSortType] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (page < 0 || limit < 0) {
      return;
    }
    search({
      name,
        company : company === "" ? null : company,
        category : category === "" ? null : category,
        subcategory : subcategory === "" ? null : subcategory,
        minPrice : minPrice < 1 ? null : minPrice,
        maxPrice : maxPrice < 1 ? null : maxPrice,
        minQuantity : minQuantity < 1 ? null : minQuantity,
        maxQuantity : maxQuantity < 1 ? null : maxQuantity,
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
      <h1>Search Products</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Inputs.SelectInput
          label="Category"
          name="category"
          value={category}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          onChange={(e) => setCategory(e.target.value)}
        />

        <Inputs.SelectInput
            label="Subcategory"
            name="subcategory"
            value={subcategory}
            options={subcategories.map((subcategory) => ({
                value: subcategory.id,
                label: subcategory.name,
            }))}
            onChange={(e) => setSubcategory(e.target.value)}
        />

        <Inputs.SelectInput
            label="Company"
            name="company"
            value={company}
            options={companies.map((company) => ({
                value: company.id,
                label: company.name,
            }))}
            onChange={(e) => setCompany(e.target.value)}
        />

        <Inputs.DecimalNumberInput
            label="Min Price"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
        />

        <Inputs.DecimalNumberInput
            label="Max Price"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <Inputs.NumberInput
            label="Min Quantity"
            name="minQuantity"
            value={minQuantity}
            onChange={(e) => setMinQuantity(Number(e.target.value))}
        />

        <Inputs.NumberInput
            label="Max Quantity"
            name="maxQuantity"
            value={maxQuantity}
            onChange={(e) => setMaxQuantity(Number(e.target.value))}
        />
        <Inputs.SelectInput
          label="Sort By"
          name="sortBy"
          value={sortBy}
          options={[
            { value: -1, label: "None" },
            { value: SortAttributeType.SortByName, label: "Name" },
            { value: SortAttributeType.SortByPrice, label: "Price" },
            { value: SortAttributeType.SortByQuantity, label: "Quantity" },
            { value: SortAttributeType.SortByCategoryName, label: "Category" },
            { value: SortAttributeType.SortBySubcategoryName, label: "Subcategory" },
            { value: SortAttributeType.SortByCompanyName, label: "Company" },
            { value: SortAttributeType.SortByUpdated, label: "Last Update"},
            { value: SortAttributeType.SortByProfit, label: "Profit"},
            { value: SortAttributeType.SortByTotalSold, label: "Total Sold"},
          ]}
          onChange={(e) => setSortBy(Number(e.target.value))}
        />
        <Inputs.SelectInput
          label="Sort Type"
          name="sortType"
          value={sortType}
          options={[
            { value: -1, label: "None" },
            { value: 0, label: "Ascending" },
            { value: 1, label: "Descending" },
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
