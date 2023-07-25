import { Service, getService } from "../../../../Api/ServiceApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";

const serviceTypeDict: { [key: string]: string } = {
  0: "Network",
  1: "Computer",
  2: "Device",
  3: "Other",
};

export const ServicePage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);

  const reload = async () => {
    tryGetService();
  };

  const tryGetService = async () => {
    const tryService = await getService(serviceId as string);
    if (tryService) {
      setService(tryService);
    }
  };
  useEffect(() => {
    tryGetService();

    // fetch service data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {service && (
          <div className={classes.ItemInfo}>
            <span>Service Info:</span>
            <ItemView
              item={{
                Id: service.id,
                Name: service.name,
                Description: service.description,
                Price: service.price,
                type: serviceTypeDict[service.serviceType],
              }}
              links={[]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          {service && (
            <Forms.ServiceForm isEdit={true} item={service} reload={reload} />
          )}
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
