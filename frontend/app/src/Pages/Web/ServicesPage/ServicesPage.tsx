import React, { useEffect, useState } from "react";
import { Service, getServices } from "../../../Api/ServiceApi";
import ServiceView from "../../../Components/Web/Service";
import classes from "./ServicesPage.module.scss";
import { SortAttributeType } from "../../../Types/Enums";
import services4 from "../../../assets/services4.webp";
const serviceTypeDict: { [key: string]: string } = {
  0: "Mreža",
  1: "Računalo",
  2: "Uređaj",
  3: "Ostalo",
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
    window.scrollTo(0, 0);
    window.document.title = "Services";
    fetchServices();
  }, []);
  return (
    <div className={classes.Container}>
      <div className={classes.Cover}>
        <div className={classes.Backdrop} />
        <img src={services4} alt="services" />
        <div className={classes.CoverText}>
          <h1>Servisi</h1>
          <p>
            Pregledajte našu ponudu servisa i odaberite onaj koji vam najviše
            odgovara
          </p>
        </div>
      </div>
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
          <h2>Nema pronađenih usluga</h2>
          <p>
            Trenutno nema usluga na stranici. Pokušajte ponovno kasnije ili
            kontaktirajte podršku
          </p>
        </div>
      )}
    </div>
  );
};
