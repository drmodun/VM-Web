import classes from "./Forms.module.scss";
import {
  NewSubcategory,
  createSubcategory,
  updateSubcategory,
} from "../../../Api/SubcategoryApi";
import { Category, getCategories } from "../../../Api/CategoryApi";
import { useEffect, useState } from "react";
import Inputs from "../FormElements";
import { Indexable, Subcategory } from "../../../Types/Interfaces";
//TODO: add forms for orders and transactions, but thats for later

interface Props {
  isEdit: boolean;
  item?: Subcategory;
  categories: Category[];
  reload: Function;
}

export const SubcategoryForm = ({
  categories,
  reload,
  isEdit,
  item,
}: Props) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(
    isEdit ? item!.description : ""
  );
  const [schema, setSchema] = useState<Indexable>(
    isEdit ? item?.subSchema! : {}
  );
  const [categoryId, setCategoryId] = useState<string>(
    isEdit ? item?.categoryId! : categories[0] ? categories[0].id : ""
  );
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (isEdit) return;
    setCategoryId(categories[0] ? categories[0].id : "");
  }, [categories]);
  //TODO: think of a better way to do this, now it resets on every new category

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
      setStatus("Schema must have at least one attribute");
      return;
    }
    if (categoryId === "") {
      setStatus("Category is not valid");
      return;
    }
    setStatus("Loading...");
    const newSubcategory: NewSubcategory = {
      id: isEdit ? item!.id : undefined,
      name,
      description,
      subSchema: schema,
      categoryId,
    };

    const response = isEdit
      ? await updateSubcategory(newSubcategory)
      : await createSubcategory(newSubcategory);
    response
      ? setStatus(`Subcategory ${isEdit ? "edited" : "created"} successfully`)
      : setStatus("Something went wrong");
    response && reload();
    console.log(name, description, schema);
  };

  return (
    <div className={classes.Form}>
      <h1> {isEdit ? "Edit" : "Create"} Subcategory</h1>
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
        <Inputs.SelectInput
          label="Category"
          name="category"
          value={categoryId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <button type="submit">{isEdit ? "Edit" : "Create"}</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
