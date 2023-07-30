import {
  ShortProduct,
  ShortProductsResponse,
  getFavouriteProducts,
} from "../../../Api/ProductApi";
import { useState, useEffect } from "react";
import classes from "./Favourites.module.scss";
import ProductView from "../../../Components/Web/ProductView";

export const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<ShortProduct[]>();
  const fetchFavourites = async () => {
    const response = await getFavouriteProducts();
    if (response == null) return;
    setFavourites(response.items);
  };
  useEffect(() => {
    fetchFavourites();
  }, []);

  const removeFavourite = (id: string) => {
    setFavourites((prev) => prev?.filter((product) => product.id !== id));
  };

  return (
    <div className={classes.Container}>
      <h1>Favourites</h1>
      <div className={classes.ProductRow}>
        {favourites &&
          favourites.map((product) => (
            <ProductView
              product={product}
              removal={() => removeFavourite(product.id)}
            />
          ))}
      </div>
    </div>
  );
};
