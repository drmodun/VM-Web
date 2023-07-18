import Inputs from "../FormElements";
import { createCompany, NewCompany } from "../../../Api/CompanyApi";
import { useState } from "react";
import classes from "./Forms.module.scss";

export const CompanyForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [logo, setLogo] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCompany: NewCompany = {
      name,
      description,
      website,
      logo,
    };
    setLoading(true);
    const response = await createCompany(newCompany);
    response
      ? setSuccess("Company created successfully")
      : setError("Something went wrong");
    setLoading(false);
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
        <button type="submit">Create</button>
      </form>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        {loading && <p>Loading...</p>}
    </div>
  );
};
