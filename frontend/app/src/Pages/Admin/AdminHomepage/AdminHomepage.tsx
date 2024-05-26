import React from "react";
import classes from "./Homepage.module.scss";
export const AdminHomepage = () => {
  return (
    <div className={classes.Homepage}>
      <h1>Admin Homepage</h1>
      <div className={classes.Paragraph}>
        Stranica sa svim proizvodima, kategorijama, podkategorijama,
        kompanijama, korisnicima, narudžbama, transakcijama, prethodnim
        klijentima i uslugama.
      </div>
      <div className={classes.Divider} />
      <h2>Kako koristiti</h2>
      <div className={classes.Paragraph}>
        Klikom na link na navigaciji (gore) možete pristupiti stranici sa svim
        entitetima, na kojoj možete detaljno prertraživati i filtrirati
        entitete, kao i kreirati nove ze brisati stare. Klikom na edit botun
        možete pristupiti stranici za editiranje entiteta, a tamo imate detaljni
        prikay toga eniteta i mogućnost brisanja.
      </div>
      <div className={classes.Divider} />
      <h2>Tehnička podrška</h2>
      <div className={classes.Paragraph}>
        U slučaju da se pojave problemi pri korištenju ove stranice ili
        neočekivane greške, javite se na idući kontakt:
      </div>
      <div className={classes.ContactInfo}>
        <div className={classes.Contact}>Jan Modun</div>
        <div className={classes.Contact}>jan.modun.st@gmail.com</div>
        <div className={classes.Contact}>+0996615935</div>
      </div>
    </div>
  );
};
