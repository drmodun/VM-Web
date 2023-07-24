import { useState } from "react";
import classes from "./Forms.module.scss";
import {
  NewPreviousClient,
  PreviousClient,
  createPreviousClient,
  updatePreviousClient,
} from "../../../Api/PreviousClientApi";
import Inputs from "../FormElements";

interface Props {
  isEdit: boolean;
  item?: PreviousClient;
  reload: Function;
}

export const PreviousClientForm = ({ reload, isEdit, item }: Props) => {
  const [name, setName] = useState<string>(isEdit ? item?.name! : "");
  const [description, setDescription] = useState<string>(
    isEdit ? item?.description! : ""
  );
  const [website, setWebsite] = useState<string>(isEdit ? item?.website! : "");
  const [logo, setLogo] = useState<string>(isEdit ? item?.image! : "");
  const [rating, setRating] = useState<number>(isEdit ? item?.rating! : 0);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPreviousClient: NewPreviousClient = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      website,
      image: logo,
      rating,
    };
    setStatus("Loading...");
    const response = isEdit
      ? await updatePreviousClient(newPreviousClient)
      : await createPreviousClient(newPreviousClient);
    response
      ? setStatus(`Previous Client ${isEdit ? "edited" : "created"} successfully`)
      : setStatus("Something went wrong");
    response && reload();
  };

  return (
    <div className={classes.Form}>
      <h1>{isEdit ? "Edit" : "Create"} Previous Client</h1>
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
        <button type="submit">{isEdit ? "Edit" : "Create"}</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
