import { Service } from "../../../Api/ServiceApi";
import classes from "./ServiceView.module.scss";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";

const serviceTypeDict: { [key: string]: string } = {
  0: "Network",
  1: "Computer",
  2: "Device",
  3: "Other",
};

interface Props {
  service: Service;
}
export const ServiceView = ({ service }: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Service}>
        <div className={classes.Image}>
          <img
            onError={(e) => {
              e.currentTarget.src = Placeholder;
            }}
            src={
              "https://media0testing.blob.core.windows.net/vm-racunala/services/" +
              service.id
            }
            alt="service"
          />
        </div>
        <div className={classes.Info}>
          <div className={classes.Name}>
            <span>{service.name}</span>
          </div>
          <div className={classes.Type}>
            <span>{serviceTypeDict[service.serviceType]}</span>
          </div>
          <div className={classes.Description}>
            <span>{service.description}</span>
          </div>
          <div className={classes.Bottom}>
            <div className={classes.Price}>
              <span>{service.price}€</span>
            </div>
            <Link className={classes.Button} to={`/services/${service.id}`}>
              Naruči
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
