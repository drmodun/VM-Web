import Inputs from "../FormElements";
import {
  Company,
  createCompany,
  NewCompany,
  updateCompany,
} from "../../../Api/CompanyApi";
import { useState } from "react";
import classes from "./Forms.module.scss";
import { upload } from "@testing-library/user-event/dist/upload";
import { UpdateFile, UploadFile } from "../../../Api/BlobApi";

interface Props {
  isEdit: boolean;
  item?: Company;
  reload: Function;
}

export const CompanyForm = ({ isEdit, reload, item }: Props) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(
    isEdit ? item!.description : ""
  );
  const [website, setWebsite] = useState<string>(isEdit ? item!.website : "");

  const [status, setStatus] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (id: string) => {
    console.log(file);
    if (!file) return false;
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("name", id);
    formData.append("directory", "/companies/");
    try {
      const response = isEdit
        ? await UpdateFile(formData)
        : await UploadFile(formData);
      if (!response) {
        console.log("Something went wrong");
        return false;
      }
      console.log(response);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCompany: NewCompany = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      website,
    };
    setStatus("Loading...");
    const response = isEdit
      ? await updateCompany(newCompany)
      : await createCompany(newCompany);
    if (!response) return;
    const upload: boolean = await handleFileUpload(
      isEdit ? item!.id! : response.id!
    );
    response?.success && (upload || !file)
      ? setStatus((isEdit ? "Edited " : "Created ") + "successfully")
      : setStatus("Something went wrong");
    response && upload && reload();
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
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{isEdit ? "Edit" : "Create"}</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
