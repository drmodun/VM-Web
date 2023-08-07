import { User, getUser } from "../../../../Api/UserApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";
export const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const reload = async () => {
    tryGetUser();
  }

    const tryGetUser = async () => {
      const tryUser = await getUser(userId as string);
      tryUser?.lastUpdate &&
        (tryUser.lastUpdate = new Date(tryUser.lastUpdate));
      if (tryUser) {
        setUser(tryUser);
      }
    };
  useEffect(() => {
    tryGetUser();
    // fetch user data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {user && (<div className={classes.ItemInfo}>
            <span>User Info:</span>
            <ItemView
            item={{
              id: user.id,
              name: user.name,
              email: user.email,
              lastUpdate: `${user.lastUpdate.getDate()}/${user.lastUpdate.getMonth() + 1}/${user.lastUpdate.getFullYear()}`,
              address: user.address,
            }}
            links={[]}
          />
        </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          { user &&
            <Forms.UserForm
          isEdit={true}
          reload={reload}
          item={user}

           />}
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
