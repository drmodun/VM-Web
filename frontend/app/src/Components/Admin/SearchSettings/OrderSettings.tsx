import { useState } from "react";
import classes from "./Settings.module.scss";
import Inputs from "../FormElements";
import { GetAllProps } from "../../../Api/OrderApi";
import { ServiceType, SortAttributeType, SortType, StatusType } from "../../../Types/Enums";
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
  const [serviceType, setServiceType] = useState<number>(-1);
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
      serviceName,
      userName,
      serviceType: serviceType !== -1 ? serviceType : undefined,
      status: type !== -1 ? type : undefined,
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
      <h1>Search orders</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Service"
          name="service"
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
          label="Service Type"
          name="service type"
          value={serviceType}
          options={[
            { value: -1, label: "None" },
            { value: ServiceType.Network, label: "Network" },
            { value: ServiceType.Computer, label: "Computer" },
            { value: ServiceType.Device, label: "Device" },
            { value: ServiceType.Other, label: "Other" },
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
            { value: SortAttributeType.SortByType, label: "Type" },
          ]}
          onChange={(e) => setSortBy(Number(e.target.value))}
        />
        <Inputs.SelectInput
          label="Sort Type"
          name="sortType"
          value={sortType}
          options={[
            { value: -1, label: "None" },
            { value: SortType.Ascending, label: "Rastuće" },
            { value: SortType.Descending, label: "Padajuće" },
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
