import Inputs from "../FormElements";
import { Company, createCompany, NewCompany, updateCompany } from "../../../Api/CompanyApi";
import { useState } from "react";
import classes from "./Forms.module.scss";

interface Props {
  isEdit: boolean;
  item?: Company;
  reload: Function;
}

export const CompanyForm = ({ isEdit, reload, item }: Props) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(isEdit ? item!.description : "");
  const [website, setWebsite] = useState<string>(isEdit ? item!.website : "");
  const [logo, setLogo] = useState<string>(isEdit ? item!.logo : "");

  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCompany: NewCompany = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      website,
      logo,
    };
    setStatus("Loading...");
    const response =
      isEdit ? await updateCompany(newCompany) :
     await createCompany(newCompany);
    response
      ? setStatus((isEdit ? "Edited " : "Created ") + "successfully")
      : setStatus("Something went wrong");
    response && reload();
  };

  return (
    <div className={classes.Form}>
      <h1>{isEdit ? "Edit" : "Create"} Company</h1>
      <form onSubmit={handleSubmit}>
        <Inputs.TextInput
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Inputs.TextInput
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
        <button type="submit">{isEdit ? "Edit" : "Create"}</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
