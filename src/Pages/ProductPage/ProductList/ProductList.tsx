import { CategoryType } from "constants/categories";
import { useEffect } from "react";
import { useParams } from "react-router";
import cls from './ProductsList.module.scss';
import { ProductItem } from "../ProductItem/ProductItem";
import clsx from "clsx";
import { useFilterStore } from "components/Filters/model/FiltersStore";
import { Filters } from "components/Filters/ui/Filters";

export const ProductList = () => {
    const products = useFilterStore((state) => state.filtered);

    const { category } = useParams();
    const filterDispatch = useFilterStore((state) => state.dispatch);

    useEffect(() => {
        filterDispatch({
            type: (category ?? 'all') as CategoryType,
        });
    }, [category]);

    return (
        <>
            <Filters />
            <div className={clsx(cls.list)}>
                {products &&
                    products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        />
                    ))}
            </div>
        </>
    );
};