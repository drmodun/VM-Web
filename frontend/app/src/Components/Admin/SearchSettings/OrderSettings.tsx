import { useState } from "react";
import classes from "./Settings.module.scss";
import Inputs from "../FormElements";
import { GetAllProps } from "../../../Api/OrderApi";
import { SortAttributeType, SortType, StatusType } from "../../../Types/Enums";
import { Category } from "../../../Types/Interfaces";
import { Product } from "../../../Api/ProductApi";
import { User } from "../../../Api/UserApi";

interface Props {
  search: Function;
}

export const OrderSearch = ({ search }: Props) => {
    const [serviceName, setServiceName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [type, setType] = useState<number>(-1);
  const [sortBy, setSortBy] = useState<number>(-1);
  const [sortType, setSortType] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (page < 0 || limit < 0 ) {
      return;
    }
    search({
        serviceName,
        userName,
        servicetype : type !== -1 ? type : undefined,
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
          label="Product"
          name="product"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
       <Inputs.TextInput
          label="User"
          name="user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <Inputs.SelectInput
            label="Type"
            name="type"
            value={type}
            options={[
                { value: -1, label: "None" },
                { value: StatusType.Accepted, label: "Accepted" },
                { value: StatusType.Pending, label: "Pending" },
                { value: StatusType.Failed, label: "Failed" },
                { value: StatusType.InProgress, label: "In Progress" },
                { value: StatusType.Completed, label: "Completed" },
            ]}
            onChange={(e) => setType(Number(e.target.value))}
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
