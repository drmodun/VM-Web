import { useEffect, useState } from "react";
import classes from "./PreviousClientsPage.module.scss";
import {
  PreviousClient,
  getPreviousClients,
} from "../../../Api/PreviousClientApi";
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
      <h1>Previous Clients</h1>
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
