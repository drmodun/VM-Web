import { Company, deleteCompany, getCompany } from "../../../../Api/CompanyApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";

export const CompanyPage = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company>();

  const tryGetCompany = async () => {
    const tryCompany = await getCompany(companyId as string);
    if (tryCompany) {
      setCompany(tryCompany);
    }
  };
  useEffect(() => {
    tryGetCompany();

    // fetch company data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmation) return;
    const tryAction = await deleteCompany(companyId as string);
    if (!tryAction) return;
    alert("Company successfully deleted");
    window.location.href = "/admin/companies";
  };

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {company && (
          <div className={classes.ItemInfo}>
            <span>Company Info:</span>
            <ItemView
              item={{
                Id: company.id,
                Name: company.name,
                Description: company.description,
                Website: company.website,
              }}
              links={[]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          {company && <Forms.CompanyForm
            isEdit={true}
            item={company}
            reload={tryGetCompany}
          />}
          <button onClick={handleDelete} className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
