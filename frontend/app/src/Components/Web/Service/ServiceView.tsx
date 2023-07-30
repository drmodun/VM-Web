import { Service } from "../../../Api/ServiceApi";
import classes from "./ServiceView.module.scss";
import Placeholder from "../../../assets/placeholder.png";

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
                    <img src={Placeholder} alt="service" />
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
                    <div className={classes.Price}>
                        <span>{service.price}€</span>
                    </div>
                    <button className={classes.Button}>
                        Naruči
                    </button>
                </div>
            </div>
        </div>
    )
}
    