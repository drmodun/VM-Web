import { Product, getProducts } from '../../../Api/ProductApi';
import ProductView from '../../../Components/Web/ProductView';
import { SortAttributeType, SortType } from '../../../Types/Enums';
import classes from './Homepage.module.scss';
import { useEffect, useState } from 'react';
export const Homepage = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const productFetcher = async () => {
        const response = await getProducts(
            {
                "Sorting.Attribute": SortAttributeType.SortByProfit,
                "Sorting.SortType": SortType.Descending,
            }
        );
        setProducts(response?.items!);
    }

    useEffect(() => {
        productFetcher();
    }, []);


    return (
        <div>
            <h1>Homepage</h1>
            <div className={classes.ProductRow}>
                {products.map((product) => (
                    <ProductView product={product} />
                ))}
            </div>
        </div>
    )
    
}