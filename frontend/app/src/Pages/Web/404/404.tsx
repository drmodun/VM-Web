import classes from "./404.module.scss";
export const NotFoundPage = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Text}>
        <span className={classes.Title}>404 stranica nije pronađena</span>
        <span className={classes.Subtitle}>
          Stranica koju tražite ne postoji ili je uklonjena.
        </span>
        <a href="/">Povratak na početnu stranicu</a>
      </div>
    </div>
  );
};
