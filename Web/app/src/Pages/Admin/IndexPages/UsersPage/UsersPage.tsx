import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  User,
  deleteUser,
  getUser,
  getUsers,
} from "../../../../Api/UserApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
//implement filter and sorting TODO
export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const userGetter = async () => {
    setStatus("Loading...");
    const users = await getUsers();
    console.log(users);
    if (users?.items) {
      setUsers(users.items);
      setTotalPages(users.pageInfo.totalPages || 1);
      setTotalItems(users.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${users.pageInfo.page} of ${users.pageInfo.totalPages!}`
      );
      setStatus("Users fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const userSearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const users = await getUsers(parameters);
    if (users?.items) {
      setUsers(users.items);
      console.log(users);
      setTotalPages(users.pageInfo.totalPages || 1);
      setTotalItems(users.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${users.pageInfo.page} of ${users.pageInfo.totalPages!}`
      );
      setStatus("Users fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    userGetter();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const result = await deleteUser(id);
    if (result) {
      setUsers(users.filter((user) => user.id !== id));
      setStatus("User deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  //TODO: add filters and sorting

  return (
    <div className={classes.Page}>
      <h1>Users</h1>
      <p>The page where you can edit, view, delete and create users</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={users.map((user) => {
            const date = new Date(user.lastUpdate);
            const lastUpdate = `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`;
            return {
              id: user.id,
              name: user.name,
              address: user.address,
              lastUpdate: lastUpdate,
              email: user.email,
            };
          })}
          links={[]}
          important={["name", "lastUpdate", "email"]}
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
      <div className={classes.PageActions}>
        <div className={classes.UserPageSearch}>
          <Search.UserSearch search={userSearch} />
        </div>
        <div className={classes.UserPageCreate}>
          <h2>Create User</h2>
          <Forms.UserForm
            isEdit={false} 
           />
        </div>
      </div>
    </div>
  );
};
