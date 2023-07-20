import { useEffect, useState } from "react";
import classes from "./UserPage.module.scss";
import { SortType, SortAttributeType } from "../../../../Types/Enums";
import { User, deleteUser, getUser, getUsers } from "../../../../Api/UserApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import { Item } from "../../../../Components/Admin/ItemTable/ItemTable";
//implement filter and sorting TODO
export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [show, setShow] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sorting, setSorting] = useState<string>();
  const [sortingType, setSortingType] = useState<string>();
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const userGetter = async () => {
    setLoading(true);
    const users = await getUsers({
      name: search,
      address,
      email,
      pagination: {
        page,
        limit,
      },
      sorting: {
        attribute: sorting,
        type: sortingType,
      },
    });
    console.log(users);
    if (users?.items) {
      setUsers(users.items);
      setTotalPages(users.pageInfo.totalPages!);
      setTotalItems(users.pageInfo.totalItems!);
      setPageInfo(
        `Page ${users.pageInfo.page} of ${users.pageInfo.totalPages!}`
      );
      setSuccess("Users fetched successfully");
    } else {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    userGetter();
  }, [page, limit, search, address, email, sorting, sortingType]);

  useEffect(() => {
    userGetter();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const result = await deleteUser(id);
    if (result) {
      setUsers(users.filter((user) => user.id !== id));
      setSuccess("User deleted successfully");
    } else {
      setError("Something went wrong");
    }
  };

  //TODO: add filters and sorting

  return (
    <div className={classes.UsersPage}>
      <h1>Users</h1>
      <p>The page where you can edit, view, delete and create users</p>
      <div className={classes.UserPageContainer}>
        <div className={classes.UserPageFilters}>
          <div className={classes.UserPageFilter}>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={classes.UserPageFilter}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={classes.UserPageFilter}>
            <label htmlFor="email">Email</label>

            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.UserPageFilter}>
            <label htmlFor="sorting">Sorting</label>
            <select
              name="sorting"
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value={""}>None</option>
              <option value={SortAttributeType.SortByName}>Name</option>
              <option value={SortAttributeType.SortByAddress}>Address</option>
            </select>
          </div>
          <div className={classes.UserPageFilter}>
            <label htmlFor="sortingType">Sorting Type</label>
            <select
              name="sortingType"
              value={sortingType}
              onChange={(e) => setSortingType(e.target.value)}
            >
              <option value="">None</option>
              <option value={SortType.Ascending}>Ascending</option>
              <option value={SortType.Descending}>Descending</option>
            </select>
          </div>
          <div className={classes.UserPageFilter}>
            <label htmlFor="limit">Limit</label>
            <select
              name="limit"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <ItemTable
          items={users.map((user) => {
            return {
              id: user.id,
              name: user.name,
              address: user.address,
              email: user.email,
            };
          })}
          links={[]}
          important={["name", "lastUpdated", "email"]}
          deleteItem={handleDeleteUser} //TODO
          type="users"
        />
        <div className={classes.UserPagePagination}>
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
      <div className={classes.UserPageCreate}>
        <h2>Create User</h2>
        <Forms.UserForm />
      </div>
    </div>
  );
};
