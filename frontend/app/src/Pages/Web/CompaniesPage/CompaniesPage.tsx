import { useEffect, useState } from "react";
import classes from "./CompaniesPage.module.scss";

import companies1 from "../../../assets/companies.svg";
import { Category } from "../../../Types/Interfaces";
import Switch from "../../../Components/Web/Switch";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import ShortView from "../../../Components/Web/ShortView";
import { ShortCompany, getShortCompanies } from "../../../Api/CompanyApi";

export const CompaniesPage = () => {
  // const [sortAttribute, setSortAttribute] = useState<SortAttributeType>(SortAttributeType.SortByName);
  // const [sortOrder, setSortOrder] = useState<SortType>(SortType.Ascending);

  const [companies, setCompanies] = useState<ShortCompany[]>([]);

  const companiesFetcher = async () => {
    const response = await getShortCompanies();
    if (!response?.items) return;
    setCompanies(response?.items);
  };

  useEffect(() => {
    companiesFetcher();
    window.scrollTo(0, 0);
    window.document.title = "Brands";
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Cover}>
        <div className={classes.Backdrop}></div>
        <img src={companies1} alt="" />
        <div
          className={
            //TODO: write a brader description
            classes.CoverText
          }
        >
          <h1>Brands</h1>
          <p>Find your favorite brand</p>
        </div>
      </div>
      <div className={classes.CompaniesPage}>
        <div className={classes.Companies}>
          {companies &&
            companies.map((company) => (
              <ShortView
                titlte={company.name}
                subtitle={company.numberOfProducts.toString()}
                link={`/brands/${company.id}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};