import type { CategoryType } from "shared/constants/categories";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useFilterStore } from "widgets/Filters/model/FiltersStore";
import { Filters } from "widgets/Filters/ui/Filters";
import { ProductItem } from "features/ProductItem";
import { useProducts } from "entities/Product";
import { Loading } from "shared/ui/Loading/Loading";
import { ErrorMessage } from "shared/ui/ErrorMessage/ErrorMessage";

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
    }, [category, filterDispatch]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <>
            <Filters />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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