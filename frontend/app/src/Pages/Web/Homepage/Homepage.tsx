import { ShortCategory, getShortCategories } from "../../../Api/CategoryApi";
import {
  GetAllProps,
  ShortProduct,
  getShortProducts,
} from "../../../Api/ProductApi";
import brands2 from "../../../assets/companies2.webp";
import chevronLeft from "../../../assets/chevron-left.svg";
import chevronRight from "../../../assets/chevron-right.svg";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import classes from "./Homepage.module.scss";
import { useEffect, useState } from "react";
import products2 from "../../../assets/product2.webp";
import products3 from "../../../assets/products4.webp";
import categories1 from "../../../assets/categories2.webp";
import services1 from "../../../assets/services1.webp";
import ShortView from "../../../Components/Web/ShortView";
import { Link } from "react-router-dom";
import { ShortCompany, getShortCompanies } from "../../../Api/CompanyApi";
import { Service, getServices } from "../../../Api/ServiceApi";
import ServiceView from "../../../Components/Web/Service";
import PreviousClientView from "../../../Components/Web/PreviousClient";
import {
  PreviousClient,
  getPreviousClients,
} from "../../../Api/PreviousClientApi";
const enum Tabs {
  Services = 0,
  Categories = 1,
  Brands = 2,
  Products = 3,
}
export const Homepage = () => {
  const [categories, setCategories] = useState<ShortCategory[]>([]);
  const [tab, setTab] = useState<Tabs>(Tabs.Services);
  const [brands, setBrands] = useState<ShortCompany[]>([]);
  const [previousClients, setPreviousClients] = useState<PreviousClient[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const previousClientsFetcher = async () => {
    const response = await getPreviousClients({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Descending,
      "Pagination.PageSize": 3,
      "Pagination.PageNumber": 2,
    });
    setPreviousClients(response?.items!);
  };

  const categoryFetcher = async () => {
    const response = await getShortCategories({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
      "Pagination.PageSize": 20,
      "Pagination.PageNumber": 1,
    });
    setCategories(response?.items!);
  };

  const serviceFetcher = async () => {
    const response = await getServices({
      "Sorting.Attribute": SortAttributeType.SortByPrice,
      "Sorting.SortType": SortType.Ascending,
      "Pagination.PageSize": 3,
      "Pagination.PageNumber": 1,
    });
    setServices(response?.items!);
  };

  const brandFetcher = async () => {
    const response = await getShortCompanies({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Ascending,
      "Pagination.PageSize": 20,
      "Pagination.PageNumber": 1,
    });
    console.log(response);
    setBrands(response?.items!);
  };

  useEffect(() => {
    categoryFetcher();
    brandFetcher();
    serviceFetcher();
    previousClientsFetcher();
    window.scrollTo(0, 0);
    window.document.title = "VM Računala d.o.o";
  }, []);

  return (
    <div className={classes.Container}>
      <link
        rel="preload"
        fetchpriority="high"
        as="image"
        href={products2}
        type="image/webp"
      ></link>
      <div className={classes.Cover}>
        <div className={classes.Backdrop}></div>
        <img src={products2} alt="Cover-VM" />
        <div className={classes.CoverText}>
          <h1>VM računala</h1>
          <p>Poslovna rješenja za IT</p>
        </div>
      </div>
      <div className={classes.Homepage}>
        <div className={classes.Description}>
          Kupujte na najjednostavniji način. Koristite VM računala webshop.
          Imate pristup svim kategorijama, brendovima, proizvodima i uslugama na
          jednom mjestu.
          <div className={classes.Row}>
            <Link
              className={classes.BlueLink}
              to={"https://www.microline.hr/EUWeb/StartEU.ashx"}
            >
              Pogledaj sve proizvode
            </Link>
          </div>
        </div>
        <div className={classes.Cards}>
          <div
            className={classes.Arrow}
            onClick={() => setTab((prev) => (prev !== 0 ? prev - 1 : 3))}
          >
            <img src={chevronLeft} alt="" />
          </div>
          <div className={classes.Upper}>
            {tab === Tabs.Categories && (
              <Link to={"/categories"} className={classes.Section}>
                <div className={classes.Title}>Kategorije</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={categories1} alt="kategorije" />
                </div>
              </Link>
            )}
            {tab === Tabs.Services && (
              <Link to="/services" className={classes.Section}>
                <div className={classes.Title}>Servisi</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={services1} alt="Servisi" />
                </div>
              </Link>
            )}
            {tab === Tabs.Brands && (
              <Link className={classes.Section} to="/brands">
                <div className={classes.Title}>Brendovi</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={brands2} alt="Brendovi" />
                </div>
              </Link>
            )}
            {tab === Tabs.Products && (
              <Link
                className={classes.Section}
                to="https://www.microline.hr/EUWeb/StartEU.ashx"
              >
                <div className={classes.Title}>Proizvodi</div>
                <div className={classes.Cover}></div>
                <div className={classes.Image}>
                  <img src={products3} alt="proizvodi" />
                </div>
              </Link>
            )}
            <div className={classes.DotRow}>
              <div
                className={
                  tab === Tabs.Services ? classes.ActiveDot : classes.Dot
                }
                onClick={() => setTab(Tabs.Services)}
              />
              <div
                className={
                  tab === Tabs.Categories ? classes.ActiveDot : classes.Dot
                }
                onClick={() => setTab(Tabs.Categories)}
              />
              <div
                onClick={() => setTab(Tabs.Brands)}
                className={
                  tab === Tabs.Brands ? classes.ActiveDot : classes.Dot
                }
              />
              <div
                className={
                  tab === Tabs.Products ? classes.ActiveDot : classes.Dot
                }
                onClick={() => setTab(Tabs.Products)}
              />
            </div>
          </div>
          <div
            className={classes.Arrow}
            onClick={() =>
              setTab((prev) => (prev !== Tabs.Products ? prev + 1 : 0))
            }
          >
            <img src={chevronRight} alt="" />
          </div>
        </div>
        <div className={classes.Row}>
          <span>Kategorije</span>
          {categories && categories.length ? (
            <div className={classes.List}>
              {categories &&
                categories.map((category) => {
                  return (
                    <ShortView
                      directory="categories"
                      id={category.id}
                      key={category.id}
                      link={category.website ?? ""}
                      title={category.name}
                      subtitle={category.numberOfProducts.toString()}
                    />
                  );
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih kategorija</span>
          )}
          <Link className={classes.ViewAll} to={"/categories"}>
            Pogledaj sve
          </Link>
        </div>
        <div className={classes.Row}>
          <span>Brendovi</span>
          {brands && brands.length ? (
            <div className={classes.List}>
              {brands &&
                brands.map((brand) => {
                  return (
                    <ShortView
                      key={brand.id}
                      link={brand.website ?? ""}
                      directory="companies"
                      id={brand.id}
                      title={brand.name}
                      isCompany
                      subtitle={brand.numberOfProducts.toString()}
                    />
                  );
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih brendova</span>
          )}
          <Link className={classes.ViewAll} to={"/brands"}>
            Pogledaj sve
          </Link>
        </div>
        <div className={classes.Row}>
          <span>Popularni servisi</span>
          {services && services.length ? (
            <div className={classes.Services}>
              {services &&
                services.map((service) => {
                  return <ServiceView key={service.id} service={service} />;
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih servisa</span>
          )}
          <Link className={classes.ViewAll} to={"/services"}>
            Pogledaj sve
          </Link>
        </div>
        <div className={classes.Row}>
          <span>Top prijašnji klijenti</span>
          {previousClients && previousClients.length ? (
            <div>
              {previousClients &&
                previousClients.map((previousClient) => {
                  return (
                    <PreviousClientView
                      key={previousClient.id}
                      client={previousClient}
                    />
                  );
                })}
            </div>
          ) : (
            <span className={classes.NotFound}>
              Nema pronađenih prijašnjih klijenata
            </span>
          )}
          <Link className={classes.ViewAll} to={"/clients"}>
            Pogledaj sve
          </Link>
        </div>
      </div>
    </div>
  );
};
