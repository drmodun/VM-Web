import { useEffect, useState } from "react";
import classes from "./PreviousClientsPage.module.scss";
import {
  PreviousClient,
  getPreviousClients,
} from "../../../Api/PreviousClientApi";
import clients2 from "../../../assets/clients2.webp";
import PreviousClientView from "../../../Components/Web/PreviousClient";

export const PreviousClientsPage = () => {
  const [clients, setClients] = useState<PreviousClient[]>([]);
  const previousClientFetcher = async () => {
    const clients = await getPreviousClients();
    if (!clients) return;
    setClients(clients.items!);
  };
  useEffect(() => {
    previousClientFetcher();
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Cover}>
        <div className={classes.Backdrop}></div>
        <img src={clients2} alt="clients" />
        <div
          className={
            classes.CoverText
          }
        >
          <h1>Previous Clients</h1>
          <p>Take a look at some of our previous clients</p>
        </div>
      </div>{" "}
      {clients && clients.length > 0 ? (
        <div className={classes.ClientsContainer}>
          {clients.map((client) => (
            <PreviousClientView client={client} />
          ))}
        </div>
      ) : (
        <div className={classes.Empty}>
          <h2>No Clients found</h2>
          <p>There are no clients at the moment, please come back later.</p>
        </div>
      )}
    </div>
  );
};
