import { useEffect, useState } from "react";
import { Category, Company, Subcategory } from "../../../Types/Interfaces";
import classes from "./Filter.module.scss";
import Dropdown from "../Dropdown";
import { getCategories } from "../../../Api/CategoryApi";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import { getSubcategories } from "../../../Api/SubcategoryApi";
import Slider from "../Slider";
import Input from "../Input";
import { GetAllProps } from "../../../Api/ProductApi";
import { getCompanies } from "../../../Api/CompanyApi";

interface Props {
  minValue: number;
  maxValue: number;
  filter: (value: GetAllProps) => void;
}

export const Filter = ({ minValue, maxValue, filter }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(minValue);
  const [maxPrice, setMaxPrice] = useState<number>(maxValue);
  const [name, setName] = useState<string>("");
  const [categoryCloser, setCategoryCloser] = useState<boolean>(false);
  const [subcategoryCloser, setSubcategoryCloser] = useState<boolean>(false);
  const [companyCloser, setCompanyCloser] = useState<boolean>(false);

  const handleCategoryCloser = () => {
    setSubcategoryCloser((prev) => !prev);
    setCompanyCloser((prev) => !prev);
  };

  const handleSubcategoryCloser = () => {
    setCategoryCloser((prev) => !prev);
    setCompanyCloser((prev) => !prev);
  };

  //add better ways to filtrate

  const handleCompanyCloser = () => {
    setSubcategoryCloser((prev) => !prev);
    setCategoryCloser((prev) => !prev);
  };
  const categoryGetter = async () => {
    const response = await getCategories({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
    });
    setCategories(response?.items!);
  };

  const subcategoryGetter = async () => {
    const response = await getSubcategories({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
      categoryId: category ? category : undefined,
    });
    setSubcategories(response?.items!);
  };

  const companyGetter = async () => {
    //TODO: add special wa to sort companies on backend
    const response = await getCompanies({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
      categoryId: category ? category : undefined,
    });
    setCompanies(response?.items!);
  };

  useEffect(() => {
    categoryGetter();
    subcategoryGetter();
    companyGetter();
  }, []);

  return (
    (categories && subcategories && companies && (
      <div className={classes.Container}>
        <div className={classes.Filter}>
          <div className={classes.Category}>
            <span>Category</span>
            <Dropdown
              cancel={categoryCloser}
              closer={handleCategoryCloser}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              onSelect={(value) => {
                setCategory(value);
                setSubcategory("");
              }}
            />
          </div>
          <div className={classes.Subcategory}>
            <span>Subcategory</span>
            <Dropdown
              cancel={subcategoryCloser}
              closer={handleSubcategoryCloser}
              options={subcategories
                .filter((subcategory) =>
                  subcategory.categoryId === category || !category
                )
                .map((subcategory) => ({
                  label: subcategory.name,
                  value: subcategory.id,
                }))}
              onSelect={(value) => {
                setSubcategory(value);
              }}
              //TODO: fix slider minimal value
            />
          </div>
          <div className={classes.Company}>
            <span>Company</span>
            <Dropdown
              cancel={companyCloser}
              closer={handleCompanyCloser}
              options={companies.map((company) => ({
                label: company.name,
                value: company.id,
              }))}
              onSelect={(value) => {
                setCompany(value);
              }}
            />
          </div>
          <div className={classes.Price}>
            <div className={classes.Input}>
              <Slider
                label="Price"
                minValue={minValue}
                maxValue={maxValue}
                onBottomChange={(value) => setMinPrice(value)}
                onTopChange={(value) => setMaxPrice(value)}
              />
            </div>
          </div>
          <div className={classes.Name}>
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            className={classes.Button}
            onClick={() =>
              filter({
                categoryId: category ? category : undefined,
                subcategoryId: subcategory ? subcategory : undefined,
                companyId: company ? company : undefined,
                minPrice: minPrice ? minPrice : undefined,
                maxPrice: maxPrice ? maxPrice : undefined,
                name: name ? name : undefined,
              })
            }
          >
            Filter
          </button>
        </div>
      </div>
    )) || <></>
  );
};
