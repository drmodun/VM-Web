import classes from "./Forms.module.scss";
import React, { FC, useState, useEffect } from "react";
import {
  Category,
  Company,
  CreateProps,
  Indexable,
  Subcategory,
} from "../../../Types/Interfaces";
import Inputs from "../FormElements";
import {
  NewProduct,
  Product,
  createProduct,
  updateProduct,
} from "../../../Api/ProductApi";

interface Props {
  isEdit?: boolean;
  item?: Product;
  reload: Function;
  categories: Category[];
  subCatgories: Subcategory[];
  companies: Company[];
}

export const ProductForm = ({
  isEdit,
  item,
  reload,
  categories,
  subCatgories,
  companies,
}: Props) => {
  const [name, setName] = useState<string>(isEdit ? item!.name : "");
  const [description, setDescription] = useState<string>(
    isEdit ? item!.description : ""
  );
  const [price, setPrice] = useState<number>(isEdit ? item!.price : 0);
  const [quantity, setQuantity] = useState<number>(isEdit ? item!.quantity : 0);
  const [category, setCategory] = useState<string>(
    isEdit ? item!.categoryId : categories[0] ? categories[0].id : ""
  );
  const [subcategory, setSubcategory] = useState<string>(
    isEdit ? item!.subcategoryId : subCatgories[0] ? subCatgories[0].id : ""
  );
  const [schema, setSchema] = useState({});
  const [subSchema, setSubSchema] = useState({});
  const [image, setImage] = useState<string>(isEdit ? item!.image : "");
  const [additionalInfo, setAdditionalInfo] = useState<Indexable>(
    isEdit ? item!.attributes : {}
  );
  const [otherAdditionalInfo, setOtherAdditionalInfo] = useState<Indexable>(
    isEdit ? item!.subAttributes : {}
  );
  const [company, setCompany] = useState<string>(
    isEdit ? item!.companyId : companies[0] ? companies[0].id : ""
  );
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const subcategory = isEdit
      ? subCatgories.find((sub) => sub.id === item!.subcategoryId)
      : subCatgories.filter((sub) => {
          return sub.categoryId === categories[0]?.id;
        })[0]
      ? subCatgories.filter((sub) => {
          return sub.categoryId === categories[0]?.id;
        })[0]
      : null;
    const schema = isEdit
      ? categories.find((cat) => cat.id === item!.categoryId)?.schema!
      : categories[0]
      ? categories[0].schema
      : {};
    if (!isEdit) {
      const tempAdditionalInfo = {} as Indexable;
      Object.keys(schema).forEach((key: string) => {
        tempAdditionalInfo[key] = "";
      });
      const tempOtherAdditionalInfo = {} as Indexable;
      Object.keys(subcategory ? subcategory.subSchema : {}).forEach(
        (key: string) => {
          tempOtherAdditionalInfo[key] = "";
        }
      );
      setCategory(categories[0] ? categories[0].id : "");
      setSubcategory(subcategory ? subcategory.id : "");
      setCompany(companies[0] ? companies[0].id : "");
      setAdditionalInfo(tempAdditionalInfo);
      setOtherAdditionalInfo(tempOtherAdditionalInfo);
    }
    setSchema(isEdit ? schema : categories[0] ? categories[0].schema : {});
    setSubSchema(subcategory ? subcategory.subSchema : {});
  }, [categories, subCatgories, companies]);
  //TODO: think of a better way to do this, now it resets on every new category

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
      id: isEdit ? item!.id : undefined,
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

    const response = isEdit
      ? await updateProduct(product)
      : await createProduct(product);
    await createProduct(product);
    !response
      ? setStatus(
          "An error occured during the making of the entity, for more details look in log"
        )
      : setStatus(
          "Product " + `${isEdit ? "edited" : "created"}` + "successfully"
        );
    response && reload();

    //later should also delete the fields, but for now it's fine and gonna make seeding easier
  };

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    if (e.target.value === category) {
      return;
    }
    const tempSchema = categories.find(
      (category: Category) => category.id === e.target.value
    )?.schema!;
    setCategory(e.target.value);
    setSchema(tempSchema);
    const tempSubcategory = subCatgories.filter(
      (subcategory: Subcategory) => subcategory.categoryId === e.target.value
    )[0];
    setSubcategory(tempSubcategory?.id!);
    setSubSchema(tempSubcategory?.subSchema!);
    const tempAdditionalInfo = {} as Indexable;
    Object.keys(tempSchema).forEach((key: string) => {
      tempAdditionalInfo[key] = "";
    });
    setAdditionalInfo(tempAdditionalInfo);
    if (!tempSubcategory) {
      return;
    }
    const tempOtherAdditionalInfo = {} as Indexable;
    Object.keys(tempSubcategory?.subSchema!).forEach((key: string) => {
      tempOtherAdditionalInfo[key] = "";
    });
    setOtherAdditionalInfo(tempOtherAdditionalInfo);
  }

  function handleSubcategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    if (e.target.value === subcategory) {
      return;
    }
    const tempSubSchema = subCatgories.find(
      (subcategory: Subcategory) => subcategory.id === e.target.value
    )!.subSchema;
    setSubcategory(e.target.value);
    setSubSchema(tempSubSchema);
    const tempOtherAdditionalInfo = {} as Indexable;
    Object.keys(tempSubSchema).forEach((key: string) => {
      tempOtherAdditionalInfo[key] = "";
    });
    setOtherAdditionalInfo(tempOtherAdditionalInfo);
  }
  return (
    (categories.length > 0 &&
      subCatgories.length > 0 &&
      companies.length > 0 && (
        <div className={classes.Form}>
          <h1>{isEdit ? "Edit" : "Create"} Product</h1>
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

            <Inputs.TextInput
              label="Image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
              options={categories
                .map((category: Category) => ({
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
              //IMportant TODO: fix the problem of editing the categories and subcategory schemas here
            />
            <Inputs.SelectInput
              label="Company"
              //TODO: fix this and make it cleaner
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              options={companies
                .filter((comp: Company) => comp != null && comp != undefined)
                .map((comp: Company) => ({
                  value: comp.id,
                  label: comp.name,
                }))}
            />

            {schema && Object.keys(schema).map((key: string) => {
              return (
                <Inputs.TextInput
                  key={key}
                  label={key}
                  name={key}
                  value={additionalInfo ? additionalInfo[key] : ""}
                  onChange={(e) =>
                    setAdditionalInfo((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              );
            })}

            {Object.keys(subSchema).map((key: string) => {
              return (
                <Inputs.TextInput
                  key={key}
                  label={key}
                  name={key}
                  value={otherAdditionalInfo ? otherAdditionalInfo[key] : ""}
                  onChange={(e) =>
                    setOtherAdditionalInfo((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              );
            })}

            <button type="submit">{isEdit ? "Edit" : "Create"}</button>
          </form>
          <div className={classes.Status}>{status}</div>
        </div>
      )) || <div>Loading...</div>
  );
};
