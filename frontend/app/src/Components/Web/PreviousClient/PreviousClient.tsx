import classes from "./PreviousCLient.module.scss";
import placeholder from "../../../assets/placeholder.png";
import { PreviousClient } from "../../../Api/PreviousClientApi";
import { Link } from "react-router-dom";

export interface Props {
  client: PreviousClient;
}

export const PreviousClientView = ({ client }: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.PreviousClient}>
        <div className={classes.Image}>
          <img src={placeholder} alt="" />
        </div>
        <div className={classes.OtherInfo}>
          <div className={classes.Name}>{client.name}</div>
          <div className={classes.Rating}>
            {[...Array(client.rating)].map((e, i) => (
              <span key={i} className={classes.Star}>
                ★
              </span>
            ))}
          </div>
          <div className={classes.Description}>{client.description}</div>
          <a
            target="_blank"
            rel="noreferrer noopener"
            referrerPolicy="no-referrer"
            href={client.website}
            className={classes.Site}
          >
            Posjeti stranicu
          </a>
        </div>
      </div>
    </div>
  );
};
