import { CategoryType } from "Shared/constants/categories";
import { useEffect } from "react";
import { useParams } from "react-router";
import cls from './ProductsPage.module.scss';
import clsx from "clsx";
import { useFilterStore } from "Widgets/Filters/model/FiltersStore";
import { Filters } from "Widgets/Filters/ui/Filters";
import { ProductItem } from "Features/ProductItem";
import { useProducts } from "entities/Product";
import { Loading } from "Shared/ui/Loading/Loading";
import { ErrorMessage } from "Shared/ui/ErrorMessage/ErrorMessage";

export const ProductPage = () => {
    const { category } = useParams();
    const { products, loading, error } = useProducts();
    const filterDispatch = useFilterStore((state) => state.dispatch);

    useEffect(() => {
        filterDispatch({ type: 'init', payload: products });
    }, [products, filterDispatch]);

    const filteredProducts = useFilterStore((state) => state.filtered);

    useEffect(() => {
        filterDispatch({
            type: (category ?? 'all') as CategoryType,
        });
    }, [category]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <>
            <Filters />
            <div className={clsx(cls.list)}>
                {filteredProducts &&
                    filteredProducts.map((filteredProduct) => (
                        <ProductItem
                            key={filteredProduct.id}
                            product={filteredProduct}
                        />
                    ))}
            </div>
        </>
    );
};