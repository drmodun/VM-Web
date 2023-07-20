import { NewService, createService } from "../../../Api/ServiceApi";
import { useState } from "react";
import classes from "./Forms.module.scss";
import Inputs from "../FormElements";
import { ServiceType } from "../../../Types/Enums";
//later fix all instances of wrong rounding
//possiblz fix names too
export const ServiceForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<ServiceType>(ServiceType.Computer);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newService: NewService = {
      name,
      description,
      price,
      serviceType: type,
    };
    setLoading(true);
    const response = await createService(newService);
    response
      ? setSuccess("Service created successfully")
      : setError("Something went wrong");
    setLoading(false);
  };

  return (
    <div className={classes.FormContainer}>
      <h1>Create Service</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Inputs.LargeTextInput
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Inputs.DecimalNumberInput
          label="Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Inputs.SelectInput
          label="Type"
          name="type"
          value={type}
          options={[
            { value: ServiceType.Computer, label: "Computer" },
            { value: ServiceType.Device, label: "Device" },
            { value: ServiceType.Network, label: "Network" },
            { value: ServiceType.Other, label: "Other" },
          ]}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button type="submit">Create</button>
      </form>
      {error && <p className={classes.Error}>{error}</p>}
      {success && <p className={classes.Success}>{success}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};
