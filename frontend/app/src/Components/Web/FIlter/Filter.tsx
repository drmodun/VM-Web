import { useEffect, useState } from "react";
import { Category, Company, Subcategory } from "../../../Types/Interfaces";
import classes from "./Filter.module.scss";
import Dropdown from "../Dropdown";
import { getCategories } from "../../../Api/CategoryApi";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import { getSubcategories } from "../../../Api/SubcategoryApi";
import Input from "../Input";
import { GetAllProps } from "../../../Api/ProductApi";
import ReactSlider from "react-slider";
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

  useEffect(() => {
    companyGetter();
  }, [category, subcategory]);

  const companyGetter = async () => {
    const response = await getCompanies({
      subcategoryId: subcategory ? subcategory : undefined,
      categoryId: category ? category : undefined,
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
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
          <div className={classes.Name}>
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.Category}>
            <span>Kategorija</span>
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
            <span>Subkategorija</span>
            <Dropdown
              cancel={subcategoryCloser}
              closer={handleSubcategoryCloser}
              options={subcategories
                .filter(
                  (subcategory) =>
                    subcategory.categoryId === category || !category
                )
                .map((subcategory) => ({
                  label: subcategory.name,
                  value: subcategory.id,
                }))}
              onSelect={(value) => {
                setSubcategory(value);
              }}
            />
          </div>
          <div className={classes.Company}>
            <span>Brend</span>
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
              <input
                type="number"
                placeholder={String(minValue)}
                onChange={(event) => setMinPrice(
                  Number(event.target.value) < minValue
                    ? minValue
                    : Number(event.target.value) > maxPrice
                      ? maxPrice
                      : Number(event.target.value)
                )
                }
                value={minPrice}
              />
              <div className={classes.Divider}></div>
              <input
                type="number"
                placeholder={String(maxValue)}
                onChange={(event) => setMaxPrice(Number(event.target.value) > maxValue
                  ? maxValue
                  : Number(event.target.value) < minPrice
                    ? minPrice
                    : Number(event.target.value)
                )}
                value={maxPrice}
              />
            </div>
            <ReactSlider
              className={classes.Slider}
              value={[minPrice, maxPrice]}
              min={minValue}
              max={maxValue}
              thumbClassName={classes.Thumb}
              onChange={
                ([min, max]) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }
              }
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
            Filtriraj
          </button>
        </div>
      </div>
    )) || <></>
  );
};
