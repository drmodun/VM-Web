import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Company,
  deleteCompany,
  getCompany,
  getCompanies,
} from "../../../../Api/CompanyApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
export const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const companyGetter = async () => {
    setStatus("Loading...");
    const companies = await getCompanies();
    console.log(companies);
    if (companies?.items) {
      setCompanies(companies.items);
      setTotalPages(companies.pageInfo.totalPages || 1);
      setTotalItems(companies.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${companies.pageInfo.page} of ${companies.pageInfo.totalPages!}`
      );
      setStatus("Companies fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const companySearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const companies = await getCompanies(parameters);
    if (companies?.items) {
      setCompanies(companies.items);
      console.log(companies);
      setTotalPages(companies.pageInfo.totalPages || 1);
      setTotalItems(companies.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${companies.pageInfo.page} of ${companies.pageInfo.totalPages!}`
      );
      setStatus("Companies fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    companyGetter();
  }, []);

  const handleDeleteCompany = async (id: string) => {
    const result = await deleteCompany(id);
    if (result) {
      setCompanies(companies.filter((company) => company.id !== id));
      setStatus("Company deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };


  return (
    <div className={classes.Page}>
      <h1>Companies</h1>
      <p>The page where you can edit, view, delete and create companies</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={companies.map((company) => {
            return {
              id: company.id,
              name: company.name,
              description : company.description,
              website : company.website,

              
            };
          })}
          links={[]}
          important={["name", "description", "website"]}
          deleteItem={handleDeleteCompany} 
          type="companies"
        />
        <div className={classes.CompanyPagePagination}>
          
        </div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.CompanyPageSearch}>
          <Search.CompanySearch search={companySearch} />
        </div>
        <div className={classes.CompanyPageCreate}>
          <Forms.CompanyForm 
          isEdit={false}
          reload={companyGetter}
          />
        </div>
      </div>
    </div>
  );
};
