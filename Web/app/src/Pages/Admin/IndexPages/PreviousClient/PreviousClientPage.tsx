import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  PreviousClient,
  deletePreviousClient,
  getPreviousClient,
  getPreviousClients,
} from "../../../../Api/PreviousClientApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
//implement filter and sorting TODO

const previousClientTypeDict: { [key: string]: string } = {
  0: "Network",
  1: "Computer",
  2: "Device",
  3: "Other",
};

export const PreviousClientsPage = () => {
  const [previousClients, setPreviousClients] = useState<PreviousClient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const previousClientGetter = async () => {
    setStatus("Loading...");
    const previousClients = await getPreviousClients();
    console.log(previousClients);
    if (previousClients?.items) {
      setPreviousClients(previousClients.items);
      setTotalPages(previousClients.pageInfo.totalPages || 1);
      setTotalItems(previousClients.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${previousClients.pageInfo.page} of ${previousClients.pageInfo
          .totalPages!}`
      );
      setStatus("PreviousClients fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const previousClientSearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const previousClients = await getPreviousClients(parameters);
    if (previousClients?.items) {
      setPreviousClients(previousClients.items);
      console.log(previousClients);
      setTotalPages(previousClients.pageInfo.totalPages || 1);
      setTotalItems(previousClients.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${previousClients.pageInfo.page} of ${previousClients.pageInfo
          .totalPages!}`
      );
      setStatus("PreviousClients fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    previousClientGetter();
  }, []);

  const handleDeletePreviousClient = async (id: string) => {
    const result = await deletePreviousClient(id);
    if (result) {
      setPreviousClients(
        previousClients.filter((previousClient) => previousClient.id !== id)
      );
      setStatus("PreviousClient deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  //TODO: add filters and sorting

  return (
    <div className={classes.Page}>
      <h1>Previous Clients</h1>
      <p>
        The page where you can edit, view, delete and create previous clients
      </p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={previousClients.map((previousClient) => {
            return {
              id: previousClient.id,
              name: previousClient.name,
              description: previousClient.description,
              rating: previousClient.rating,
            };
          })}
          links={[]}
          important={["name", "rating"]}
          deleteItem={handleDeletePreviousClient} //TODO
          type="previousClients"
        />
        <div className={classes.PreviousClientPagePagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <p>{pageInfo}</p>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.PreviousClientPageSearch}>
          <Search.PreviousClientSearch search={previousClientSearch} />
        </div>
        <div className={classes.PreviousClientPageCreate}>
          <Forms.PreviousClientForm />
        </div>
      </div>
    </div>
  );
};
