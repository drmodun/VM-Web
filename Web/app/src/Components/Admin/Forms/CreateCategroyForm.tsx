import { useState } from "react";
import classes from "./Forms.module.scss";
import Inputs from "../FormElements";
import { NewCategory, createCategory } from "../../../Api/CategoryApi";
export const CategoryForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [schema, setSchema] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const handleSumbit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.length < 3 || name.length > 20) {
            setError("Name must be between 3 and 20 characters");
            return;
        }
        if (description.length < 3 || description.length > 100) {
            setError("Description must be between 3 and 100 characters");
            return;
        }
        if (Object.keys(schema).length < 1) {
            setError("Schema must have at least one attribute");
            return;
        }
        setLoading(true);
        const newCategory: NewCategory = {
            name,
            description,
            schema,
        };

        const response = await createCategory(newCategory);
        response
            ? setSuccess("Category created successfully")
            : setError("Something went wrong");
        setLoading(false);
        console.log(name, description, schema);
    }


  return (
    <div className={classes.Form}>
      <h1>Create Category</h1>
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
      <button type="submit">Create</button>
        </form>
    </div>
  );
};
