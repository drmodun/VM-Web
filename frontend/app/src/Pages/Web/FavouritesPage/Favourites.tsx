import {
  ShortProduct,
  ShortProductsResponse,
  getFavouriteProducts,
} from "../../../Api/ProductApi";
import { useState, useEffect } from "react";
import classes from "./Favourites.module.scss";
import ProductView from "../../../Components/Web/ProductView";
import { accountInfo } from "../../../Api/Shared";

export const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<ShortProduct[]>();
  const fetchFavourites = async () => {
    const response = await getFavouriteProducts();
    if (response == null) return;
    setFavourites(response.items);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    window.document.title = "Favourites";
    fetchFavourites();
  }, []);

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev?.filter((product) => product.id !== id));
  };

  return accountInfo ? (
    <div className={classes.Container}>
      <h1>Favourites</h1>
      {favourites?.length ? (
        <div className={classes.ProductRow}>
          {favourites &&
            favourites.map((product) => (
              <ProductView
                product={product}
                removal={() => removeFavourite(product.id)}
              />
            ))}
        </div>
      ) : (
        <div className={classes.Empty}>
          <h2>No Favourites</h2>
          <p>
            You have no favourite products, add some to your favourites to see
            them here.
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className={classes.Container}>
      <div className={classes.Empty}>
        <h1>You are not logged in</h1>
        <p>
          You need to be logged in to see your favourites and add items to your
          favourites. Go to the <a href="/#/login">login page</a> or{" "}
          <a href="/#/register">the register page</a> to log in or register
        </p>
      </div>
    </div>
  );
};
