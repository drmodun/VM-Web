import { User, getUser } from "../../../../Api/UserApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "./UserPage.module.scss";
export const UserPage = (id: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tryGetUser = async () => {
      const tryUser = await getUser(id);
      if (tryUser) {
        setUser(tryUser);
      }
    };
    tryGetUser();

    // fetch user data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.ItemPage}>
      {user && (
        <ItemView
          item={{
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
          }}
          links={[]}
        />
      )}
      <div className={classes.EditAndDelete}>
        <span>Edit and delete</span>
        <Forms.UserForm />
        <button className={classes.DeleteButton}>Delete</button>
      </div>
    </div>
  );
};
