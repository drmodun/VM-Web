import classes from "./Forms.module.scss";
import { NewSubcategory, createSubcategory } from "../../../Api/SubcategoryApi";
import { Category, getCategories } from "../../../Api/CategoryApi";
import { useEffect, useState } from "react";
import Inputs from "../FormElements";
//TODO: add forms for orders and transactions, but thats for later
export const SubcategoryForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [schema, setSchema] = useState<{ [key: string]: string }>({});
  const [categoryId, setCategoryId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoryGetter = async () => {
      const response = await getCategories();
      setCategories(response?.items || []);
    };
    categoryGetter();
  }, []);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    if (categoryId === "") {
      setError("Category is not valid");
      return;
    }
    setLoading(true);
    const newSubcategory: NewSubcategory = {
      name,
      description,
      subSchema: schema,
      categoryId,
    };

    const response = await createSubcategory(newSubcategory);
    response
      ? setSuccess("Subcategory created successfully")
      : setError("Something went wrong");
    setLoading(false);
    console.log(name, description, schema);
  };

  return (
    <div className={classes.Form}>
      <h1> Create Subcategory</h1>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
