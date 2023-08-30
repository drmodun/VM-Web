import React, { useEffect, useState } from "react";
import { Service, getServices } from "../../../Api/ServiceApi";
import ServiceView from "../../../Components/Web/Service";
import classes from "./ServicesPage.module.scss";
import { SortAttributeType } from "../../../Types/Enums";

const serviceTypeDict: { [key: string]: string } = {
  0: "Network",
  1: "Computer",
  2: "Device",
  3: "Other",
};

export const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>();
  const fetchServices = async () => {
    const response = await getServices({
      "Sorting.Attribute": SortAttributeType.SortByType,
    });
    if (response == null) return;
    setServices(response.items);
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div className={classes.Container}>
      <h1>Services</h1>
      {services && services.length > 0 ? (
        <div className={classes.Services}>
          {services &&
            Object.keys(serviceTypeDict).map((key) => (
              <div className={classes.ServiceType}>
                <h2>{serviceTypeDict[key]}</h2>
                <div className={classes.ServicesColumn}>
                  {services.map(
                    (service) =>
                      service.serviceType === parseInt(key) && (
                        <ServiceView service={service} />
                      )
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={classes.Empty}>
          <h2>No Services found</h2>
          <p>There are no services at the moment, please come back later.</p>
        </div>
      )}
    </div>
  );
};
