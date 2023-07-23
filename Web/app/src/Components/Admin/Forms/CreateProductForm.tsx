import classes from "./Forms.module.scss";
import React, { FC, useState } from "react";
import { Category, Company, CreateProps, Subcategory } from "../../../Types/Interfaces";
import Inputs from "../FormElements";
import { NewProduct, createProduct } from "../../../Api/ProductApi";

interface Props {
  categories: Category[];
  subCatgories: Subcategory[];
  companies: Company[];
}

export const ProductForm = ({ categories, subCatgories, companies }: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [schema, setSchema] = useState({});
  const [subSchema, setSubSchema] = useState({});
  const [image, setImage] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<object>({});
  const [otherAdditionalInfo, setOtherAdditionalInfo] = useState<object>();
  const [company, setCompany] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 50 || name.length < 3) {
      setStatus("Name is not valid");
      return;
    }
    if (description.length > 500 || description.length < 3) {
      setStatus("Description is not valid");
      return;
    }
    if (price < 0) {
      setStatus("Price is not valid");
      return;
    }
    if (quantity < 0) {
      setStatus("Quantity is not valid");
      return;
    }
    if (category === "") {
      setStatus("Category is not valid");
      return;
    }
    if (subcategory === "") {
      setStatus("Subcategory is not valid");
      return;
    }
    if (image.length > 500 || image.length < 3) {
      setStatus("Image is not valid");
      return;
    }
    if (company === "") {
      setStatus("Company is not valid");
      return;
    }

    const product: NewProduct = {
      name,
      description,
      price,
      quantity,
      categoryId: category,
      image,
      attributes: additionalInfo,
      subAttributes: otherAdditionalInfo!,
      companyId: company,
      subcategoryId: subcategory,
    };

    console.log(product);

    const response = await createProduct(product);
    response
      ? setStatus(
          "An error occured during the making of the entity, for more details look in log"
        )
      : setStatus("Product created");

    //later should also delete the fields, but for now it's fine and gonna make seeding easier
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
    setAdditionalInfo((prev) =>
      subcategoryChange
        ? prev
        : Object.keys(schema).map((key: string) => {
            return { [key]: "" };
          })
    );
  }

  function handleSubcategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSubcategory(e.target.value);
    setSubSchema(
      subCatgories.find(
        (subcategory: Subcategory) => subcategory.id === e.target.value
      )!.subSchema
    );
    setOtherAdditionalInfo(
      Object.keys(subSchema).map((key: string) => {
        return { [key]: "" };
      })
    );
  }
  return (
    <div className={classes.Form}>
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

        <Inputs.NumberInput
          label="Quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <Inputs.SelectInput
          label="Category"
          name="category"
          value={category}
          onChange={handleCategoryChange}
          options={categories.map((category: Category) => ({
            value: category.id,
            label: category.name,
          }))}
        />

        <Inputs.SelectInput
          label="Subcategory"
          name="subcategory"
          value={subcategory}
          onChange={handleSubcategoryChange}
          options={subCatgories
            .filter((sub: Subcategory) => sub.categoryId === category)
            .map((sub: Subcategory) => ({
              value: sub.id,
              label: sub.name,
            }))}
        />

        <Inputs.TextInput
          label="Image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <Inputs.SelectInput
          label="Company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          options={companies.map((company: Company) => ({
            value: company.id,
            label: company.name,
          }))}
        />
        {Object.keys(schema).map((key: string, index: number) => {
          return (
            <Inputs.TextInput
              key={key}
              label={key}
              name={key}
              value={additionalInfo ? Object.keys(additionalInfo)[index] : ""}
              onChange={(e) =>
                setAdditionalInfo((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
            />
          );
        })}

        {Object.keys(subSchema).map((key: string, index: number) => {
          return (
            <Inputs.TextInput
              key={key}
              label={key}
              name={key}
              value={
                otherAdditionalInfo
                  ? Object.keys(otherAdditionalInfo)[index]
                  : ""
              }
              onChange={(e) =>
                setAdditionalInfo((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
            />
          );
        })}

        <button type="submit">Create</button>
      </form>
      <div className={classes.Status}>{status}</div >
    </div>
  );
};
