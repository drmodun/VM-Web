import classes from "./CreateForm.module.scss";
import React, { FC, useState } from "react";
import { Category, CreateProps, Subcategory } from "../../../Types/Interfaces";
import { AdminInputs } from "../../../Types/Enums";

interface Props {
  categories: Category[];
  subCatgories: Subcategory[];
  companies: Category[];
}

const CreateForm = ({ categories, subCatgories, companies }: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [schema, setSchema] = useState({});
  const [subSchema, setSubSchema] = useState({});
  const [image, setImage] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<object>();
  const [otherAdditionalInfo, setOtherAdditionalInfo] = useState<object>();
  const [company, setCompany] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 50 || name.length < 3) {
      setError("Name is not valid");
      return;
    }
    if (description.length > 500 || description.length < 3) {
        setError("Description is not valid");
        return;
    }
    if (price < 0) {
        setError("Price is not valid");
        return;
    }
    if (quantity < 0) {
        setError("Quantity is not valid");
        return;
    }
    if (category === "") {
        setError("Category is not valid");
        return;
    }
    if (subcategory === "") {
        setError("Subcategory is not valid");
        return;
    }
    if (image.length > 500 || image.length < 3) {
        setError("Image is not valid");
        return;
    }
    if (company === "") {
        setError("Company is not valid");
        return;
    }


    const product = {
      name,
      description,
      price,
      quantity,
      category,
      image,
      additionalInfo,
      otherAdditionalInfo,
      company,
    };
    console.log(product);
  };

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setCategory(e.target.value);
    setSchema(
      categories.find((category: Category) => category.id === e.target.value)!
    );
    const subcategoryChange: boolean =
      subCatgories.find((sub: Subcategory) => sub.id === subcategory) != null;
    setSubcategory((prev) => (subcategoryChange ? prev : ""));
    setSubSchema((prev) => (subcategoryChange ? prev : {}));
  }

  function handleSubcategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSubcategory(e.target.value);
    setSubSchema(
      subCatgories.find(
        (subcategory: Subcategory) => subcategory.id === e.target.value
      )!.schema
    );
  }
  return (
    <div className={classes.Form}>
      <form onSubmit={handleSubmit}>
        <div className={classes.TextInput}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.TextInput}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={classes.PriceInput}>
          <label htmlFor="price">Price</label>
          <input
            type="string"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <div className={classes.IntInput}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div className={classes.Select}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => handleCategoryChange(e)}
          >
            {categories.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.Select}>
          <label htmlFor="subcategory">Subcategory</label>
          <select
            name="subcategory"
            id="subcategory"
            onChange={(e) => handleSubcategoryChange(e)}
          >
            {subCatgories
              .filter(
                (subcategory: Subcategory) =>
                  subcategory.categoryId === category
              )
              .map((subcategory: Subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>
        <div className={classes.Select}>
          <label htmlFor="company">Company</label>
          <select
            name="company"
            id="company"
            onChange={(e) => setCompany(e.target.value)}
          >
            {companies.map((company: Category) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.Image}>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className={classes.Additional}>
          <label htmlFor="additional">Additional Info</label>
          {Object.keys(schema).map((key: string) => (
            <div key={key} className={classes.TextInput}>
              <label htmlFor={key}>{key}</label>
              <input
                type={schema[key as keyof typeof schema]}
                name={key}
                id={key}
                onChange={(e) => {
                  setAdditionalInfo((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}
        </div>
        <div className={classes.Additional}>
          <label htmlFor="additional">Other Additional Info</label>
          {Object.keys(subSchema).map((key: string) => (
            <div key={key} className={classes.TextInput}>
              <label htmlFor={key}>{key}</label>
              <input
                type={subSchema[key as keyof typeof setSubSchema]}
                name={key}
                id={key}
                onChange={(e) => {
                  setOtherAdditionalInfo((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }));
                }}
              />
            </div>
          ))}
        </div>
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};
