import {
  NewService,
  Service,
  createService,
  updateService,
} from "../../../Api/ServiceApi";
import { useState } from "react";
import classes from "./Forms.module.scss";
import Inputs from "../FormElements";
import { ServiceType } from "../../../Types/Enums";
import { UpdateFile, UploadFile } from "../../../Api/BlobApi";
interface Props {
  isEdit: boolean;
  item?: Service;
  reload: Function;
}

export const ServiceForm = ({ reload, isEdit, item }: Props) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(
    isEdit ? item!.description : ""
  );
  const [price, setPrice] = useState<number>(isEdit ? item!.price : 0);
  const [type, setType] = useState<ServiceType>(
    isEdit ? item!.serviceType : ServiceType.Computer
  );
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
    formData.append("directory", "/services/");
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
    const newService: NewService = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      price,
      serviceType: type,
    };
    setStatus("Loading...");
    const response = isEdit
      ? await updateService(newService)
      : await createService(newService);
      if (!response) return;
      const upload: boolean = await handleFileUpload(
        isEdit ? item!.id! : response.id!
      );
      response?.success && (upload || !file)
        ? setStatus((isEdit ? "Edited " : "Created ") + "successfully")
        : setStatus("Something went wrong");
      response && (upload || !file) && reload();
  };

  return (
    <div className={classes.Form}>
      <h1>{isEdit ? "Edit" : "Create"} Service</h1>
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
          onChange={(e) => setType(Number(e.target.value))}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Create</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
