import { useState } from "react";
import classes from "./Settings.module.scss";
import Inputs from "../FormElements";
import { SortAttributeType } from "../../../Types/Enums";
import { GetAllProps } from "../../../Api/UserApi";
import { Sorting } from "../../../Api/Shared";


interface Props {
  search: Function;
}

export const UserSearch = ({ search }: Props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
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
      email,
      address,
      "Sorting.Attribute": (sortBy!==-1 && sortType !== -1) ? sortBy : undefined,
      "Sorting.SortType": (sortBy!==-1 && sortType !== -1) ? sortType : undefined,
      "Pagination.PageNumber": page,
      "Pagination.PageSize": limit,
    } as GetAllProps);
  };

  return (
    <div className={classes.FormContainer}>
      <h1>Search Users</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Inputs.EmailInput
          label="Email"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Inputs.TextInput
          label="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Inputs.TextInput
          label="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Inputs.SelectInput
          label="Sort By"
          name="sortBy"
          value={sortBy}
          options={[
            { value: -1, label: "None" },
            { value: SortAttributeType.SortByName, label: "Name" },
            { value: SortAttributeType.SortByEmail, label: "Email" },
            { value: SortAttributeType.SortByAddress, label: "Address" },
          ]}
          onChange={(e) => setSortBy(Number(e.target.value))}
        />
        <Inputs.SelectInput
          label="Sort Type"
          name="sortType"
          value={sortType}
          options={[
            { value: -1, label: "None" },
            { value: 0, label: "Rastuće" },
            { value: 1, label: "Padajuće" },
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
