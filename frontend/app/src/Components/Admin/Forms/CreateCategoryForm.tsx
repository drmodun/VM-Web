import { useState } from "react";
import classes from "./Forms.module.scss";
import Inputs from "../FormElements";
import {
  NewCategory,
  Category,
  createCategory,
  updateCategory,
} from "../../../Api/CategoryApi";
import { Indexable } from "../../../Types/Interfaces";
import { UpdateFile, UploadFile } from "../../../Api/BlobApi";

interface Props {
  isEdit?: boolean;
  item?: Category;
  reload: Function;
}

export const CategoryForm = ({ isEdit, item, reload }: Props) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(
    isEdit ? item!.description : ""
  );
  const [website, setWebsite] = useState<string>(item?.website || "");
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
    formData.append("directory", "/categories/");
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

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length < 3 || name.length > 20) {
      setStatus("Error: Name must be between 3 and 20 characters");
      return;
    }
    if (description.length < 3 || description.length > 100) {
      setStatus("Error: Description must be between 3 and 100 characters");
      return;
    }

    setStatus("Loading...");
    const newCategory: NewCategory = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      website,
    };

    const response = isEdit
      ? await updateCategory(newCategory)
      : await createCategory(newCategory);
    if (!response) {
      setStatus("Something went wrong");
      return;
    }
    const upload: boolean = await handleFileUpload(
      isEdit ? item!.id! : response.id!
    );
    console.log(upload, file);
    response?.success && (upload || !file)
      ? setStatus((isEdit ? "Edited " : "Created ") + "successfully")
      : setStatus("Something went wrong");
    response && (upload || !file) && reload();
  };
  //gotta fix the resizing problem

  return (
    <div className={classes.Form}>
      <h1>{isEdit ? "Edit" : "Create"} Category</h1>
      <form onSubmit={handleSumbit}>
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
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{isEdit ? "Edit" : "Create"} Category</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
