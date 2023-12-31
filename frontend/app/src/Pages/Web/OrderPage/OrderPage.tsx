import classes from "./OrderPage.module.scss";
import { Service, getService } from "../../../Api/ServiceApi";
import ServiceView from "../../../Components/Web/Service";
import LargeInput from "../../../Components/Web/LargeInput";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AreaInput from "../../../Components/Web/TextAreaInput";
import { createOrder } from "../../../Api/OrderApi";
import { accountInfo } from "../../../Api/Shared";

export const OrderPage = () => {
  const [error, setError] = useState<string>("");
  const [service, setService] = useState<Service>();
  const { serviceId } = useParams();
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    fetchService();
    window.document.title = "Order";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchService();
    window.scrollTo(0, 0);
  }, [serviceId]);

  const fetchService = async () => {
    const service = await getService(serviceId as string);
    if (service == null) {
      window.location.href = "/#/404";
      return;
    }
    console.log(service);
    setService(service);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(description);
    if (
      !email.match(
        // eslint-disable-next-line no-control-regex
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      )
    ) {
      setError("Email is not valid");
      return;
    }
    const newOrder = {
      serviceId: serviceId as string,
      description,
      email,
    };
    const action = await createOrder(newOrder);
    if (!action) alert("Something went wrong");
    alert("Success");
    console.log(action);
    window.location.href = "/#/";
  };

  const [email, setEmail] = useState<string>("");
  return service ? (
    <div className={classes.Container}>
      <span className={classes.Title}>
        Jeli ovo servis koji želite naručiti?
      </span>
      <div className={classes.Service}>
        <ServiceView service={service} />
      </div>
      {accountInfo ? (
        <form onSubmit={handleSubmit} className={classes.Form}>
          <LargeInput
            label="Your Email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <AreaInput
            label="Your problem description"
            name="description"
            value={description}
            placeholder="Enter your problem description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={classes.Button}>Naruči</button>
        </form>
      ) : (
        <div className={classes.NotFound}>
          Morate biti prijavljeni, prijavite se na {" "}
          <a href="/#/login">login</a>
        </div>
      )}
      <div className={classes.Error}>{error}</div>
    </div>
  ) : (
    <div></div>
  );
};
