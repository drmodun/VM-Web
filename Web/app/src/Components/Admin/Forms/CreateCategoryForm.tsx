import { useState } from "react";
import classes from "./Forms.module.scss";
import Inputs from "../FormElements";
import { NewCategory, Category, createCategory, updateCategory } from "../../../Api/CategoryApi";
import { Indexable } from "../../../Types/Interfaces";

interface Props {
  isEdit?: boolean;
  item?: Category;
  reload: Function;
}

export const CategoryForm = ({isEdit, item, reload} : Props ) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(isEdit ? item!.description : "");
  const [schema, setSchema] = useState<Indexable>(isEdit ? item!.schema : {});
  const [status, setStatus] = useState<string>("");

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
    if (Object.keys(schema).length < 1) {
      setStatus("Error: Schema must have at least one attribute");
      return;
    }
    setStatus("Loading...");
    const newCategory: NewCategory = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      schema,
    };

    const response =
    isEdit ? await updateCategory(newCategory) :
    await createCategory(newCategory);
    response
      ? setStatus("Action performed successfully")
      : setStatus("Something went wrong");
    console.log(name, description, schema);
    response && reload();
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
        <Inputs.SchemaInput
          label="Schema"
          name="schema"
          value={schema}
          onChange={setSchema}
        />
        <button type="submit">
          {isEdit ? "Edit" : "Create"} Category
        </button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
