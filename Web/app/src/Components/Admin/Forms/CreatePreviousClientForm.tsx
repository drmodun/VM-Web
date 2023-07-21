import { useState } from "react";
import classes from "./Forms.module.scss";
import {
  NewPreviousClient,
  createPreviousClient,
} from "../../../Api/PreviousClientApi";
import Inputs from "../FormElements";

export const PreviousClientForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPreviousClient: NewPreviousClient = {
      name,
      description,
      website,
      image: logo,
      rating,
    };
    setStatus("Loading...");
    const response = await createPreviousClient(newPreviousClient);
    response
      ? setStatus("Company created successfully")
      : setStatus("Something went wrong");
  };

  return (
    <div className={classes.FormContainer}>
      <h1>Create Company</h1>
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
        <Inputs.TextInput
          label="Website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <Inputs.TextInput
          label="Logo"
          name="logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <Inputs.NumberInput
          label="Rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button type="submit">Create</button>
      </form>
      <div className={classes.Status}>{status}</div >
    </div>
  );
};
