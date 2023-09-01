import { User, deleteUserAdmin, getUser } from "../../../../Api/UserApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";
import StripeCheckout from "react-stripe-checkout";
export const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);

  const reload = async () => {
    tryGetUser();
  };

  const tryGetUser = async () => {
    const tryUser = await getUser(userId as string);
    tryUser?.lastUpdate && (tryUser.lastUpdate = new Date(tryUser.lastUpdate));
    if (tryUser) {
      setUser(tryUser);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmation) return;
    const tryAction = await deleteUserAdmin(userId as string);
    if (!tryAction) return;
    alert("User successfully deleted");
    window.location.href = "/#/admin/users";
  };
  useEffect(() => {
    tryGetUser();
    // fetch user data
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {user && (
          <div className={classes.ItemInfo}>
            <span>User Info:</span>
            <ItemView
              item={{
                id: user.id,
                name: user.name,
                email: user.email,
                lastUpdate: `${user.lastUpdate.getDate()}/${
                  user.lastUpdate.getMonth() + 1
                }/${user.lastUpdate.getFullYear()}`,
                address: user.address,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin ? "Yes" : "No",
              }}
              links={[]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          {user && <Forms.UserForm isEdit={true} reload={reload} item={user} />}
          <button onClick={handleDelete} className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
