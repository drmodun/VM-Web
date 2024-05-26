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
    window.scrollTo(0, 0);
    previousClientFetcher();
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Cover}>
        <div className={classes.Backdrop} />
        <img src={clients2} alt="clients" />
        <div className={classes.CoverText}>
          <h1>Prijašnji klijenti</h1>
          <p>Pogledajte neke od naših zadovoljnih prijašnjih klijenata</p>
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
          <h2>Nema pronađenih klijenata</h2>
          <p>Trenutno nema pronađenih klijenata, molimo pokušajte kasnije</p>
        </div>
      )}
    </div>
  );
};
