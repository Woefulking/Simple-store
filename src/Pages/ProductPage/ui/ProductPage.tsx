import { CategoryType } from "Shared/constants/categories";
import { useEffect } from "react";
import { useParams } from "react-router";
import cls from './ProductsPage.module.scss';
import clsx from "clsx";
import { useFilterStore } from "Widgets/Filters/model/FiltersStore";
import { Filters } from "Widgets/Filters/ui/Filters";
import { ProductItem } from "Features/ProductItem";

export const ProductPage = () => {
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