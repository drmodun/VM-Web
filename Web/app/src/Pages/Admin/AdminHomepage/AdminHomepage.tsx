import React from "react";
import classes from "./AdminHomepage.module.scss";
export const AdminHomepage = () => {
  return (
    <div>
      <h1>Admin Homepage</h1>
      <div className={classes.Main}>
        Stranica sa svim proizvodima, kategorijama, podkategorijama,
        kompanijama, korisnicima, narudžbama, transakcijama, prethodnim
        klijentima i uslugama.
      </div>
    </div>
  );
};
