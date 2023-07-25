import { PreviousClient, getPreviousClient } from "../../../../Api/PreviousClientApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";
export const PreviousClientPage = () => {
  const { previousClientId } = useParams();
  const [previousClient, setPreviousClient] = useState<PreviousClient | null>(null);
  
  const tryGetPreviousClient = async () => {
    const tryPreviousClient = await getPreviousClient(previousClientId as string);
    if (tryPreviousClient) {
      setPreviousClient(tryPreviousClient);
    }
  };
  useEffect(() => {
    tryGetPreviousClient();

    // fetch previousClient data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {previousClient && (
          <div className={classes.ItemInfo}>
            <span>PreviousClient Info:</span>
            <ItemView
              item={{
                Id: previousClient.id,
                Name: previousClient.name,
                Description: previousClient.description,
                Rating: previousClient.rating,
                Logo: previousClient.image,
                Website: previousClient.website,
              }}
              links={[]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
         {previousClient && <Forms.PreviousClientForm
            isEdit={true}
            reload={tryGetPreviousClient}
            item={previousClient}
          />}
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
