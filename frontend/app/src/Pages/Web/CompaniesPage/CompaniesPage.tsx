import { useEffect, useState } from "react";
import classes from "./CompaniesPage.module.scss";

import companies1 from "../../../assets/companies2.png";
import ShortView from "../../../Components/Web/ShortView";
import { ShortCompany, getShortCompanies } from "../../../Api/CompanyApi";
import { SortAttributeType, SortType } from "../../../Types/Enums";

export const CompaniesPage = () => {
  // const [sortAttribute, setSortAttribute] = useState<SortAttributeType>(SortAttributeType.SortByName);
  // const [sortOrder, setSortOrder] = useState<SortType>(SortType.Ascending);

  const [companies, setCompanies] = useState<ShortCompany[]>([]);

  const companiesFetcher = async () => {
    const response = await getShortCompanies({
      "Sorting.Attribute" : SortAttributeType.SortByName,
      "Sorting.SortType" : SortType.Ascending
    });
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
            classes.CoverText
          }
        >
          <h1>Brendovi</h1>
          <p>
            Pronađite brend koji vas zanima i pronađite proizvode koji su vam potrebni.
          </p>
        </div>
      </div>
      <div className={classes.CompaniesPage}>
        {companies && companies.length > 0 ?<div className={classes.Companies}>
          {companies &&
            companies.map((company) => (
              <ShortView
                title={company.name}
                subtitle={company.numberOfProducts.toString()}
                directory="companies"
                id={company.id}
                link={`/brands/${company.id}`}
              />
            ))}
        </div> : <div className={classes.Empty}>
            <h2>Nema pronađenih brendova</h2>
            <p>
              Molimo vas da se vratite kasnije.
            </p>
          </div>
        }
      </div>
    </div>
  );
};
