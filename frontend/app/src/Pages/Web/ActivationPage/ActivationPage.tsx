import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import classes from "./ActivationPage.module.scss";
import { activateUser } from "../../../Api/UserApi";
export const ActivationPage = () => {
  const [activationCode] = useSearchParams();
  const [success, setSuccess] = useState(false);

  const activationFetcher = async () => {
    const response = await activateUser(activationCode.get("code") || "");
    if (!response) {
      alert("Neuspješna aktivacija");
      return;
    }
    setSuccess(response);
  };

  useEffect(() => {
    activationFetcher();
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.ActivationPage}>
        <div className={classes.Title}>Aktiviraj račun</div>
        {success && (
          <div className={classes.Success}>
            <span>Uspješno potvrđen account</span>
            <Link className={classes.Link} to={"/login"}>
              Idi na prijavu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
