import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Service,
  deleteService,
  getService,
  getServices,
} from "../../../../Api/ServiceApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";

const serviceTypeDict: { [key: string]: string } = {
  0: "Network",
  1: "Computer",
  2: "Device",
  3: "Other",
};

export const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const reload = async () => {
    serviceGetter();
  };

  const serviceGetter = async () => {
    setStatus("Loading...");
    const services = await getServices();
    console.log(services);
    if (services?.items) {
      setServices(services.items);
      setTotalPages(services.pageInfo.totalPages || 1);
      setTotalItems(services.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${services.pageInfo.page} of ${services.pageInfo.totalPages!}`
      );
      setStatus("Services fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const serviceSearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const services = await getServices(parameters);
    if (services?.items) {
      setServices(services.items);
      console.log(services);
      setTotalPages(services.pageInfo.totalPages || 1);
      setTotalItems(services.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${services.pageInfo.page} of ${services.pageInfo.totalPages!}`
      );
      setStatus("Services fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    serviceGetter();
  }, []);

  const handleDeleteService = async (id: string) => {
    const result = await deleteService(id);
    if (result) {
      setServices(services.filter((service) => service.id !== id));
      setStatus("Service deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };


  return (
    <div className={classes.Page}>
      <h1>Services</h1>
      <p>The page where you can edit, view, delete and create services</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={services.map((service) => {
            return {
              id: service.id,
              name: service.name,
              price: service.price,
              serviceType: serviceTypeDict[service.serviceType],
            };
          })}
          links={[]}
          important={["name", "price", "serviceType"]}
          deleteItem={handleDeleteService}
          type="services"
        />
        <div className={classes.ServicePagePagination} />
      </div>
      <div className={classes.PageActions}>
        <div className={classes.ServicePageSearch}>
          <Search.ServiceSearch search={serviceSearch} />
        </div>
        <div className={classes.ServicePageCreate}>
          <Forms.ServiceForm
            isEdit={false}
           reload={reload} />

        </div>
      </div>
    </div>
  );
};
