import { Company, getCompany } from "../../../../Api/CompanyApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";


export const CompanyPage = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const tryGetCompany = async () => {
      const tryCompany = await getCompany(companyId as string);
      if (tryCompany) {
        setCompany(tryCompany);
      }
    };
    tryGetCompany();

    // fetch company data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {company && (
          <div className={classes.ItemInfo}>
            <span>Company Info:</span>
            <ItemView item={{
                Id: company.id,
                Name: company.name,
                Description: company.description,
                Website: company.website,
                Logo: company.logo
            }
            } links={[]} />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          <Forms.CompanyForm />
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
