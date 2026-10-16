import { useMemo } from "react";
import { useParams } from "react-router";
import { Filters } from "Widgets/Filters/ui/Filters";
import { ProductItem } from "Features/ProductItem";
import { useProducts } from "Entities/Product";
import { Loading } from "Shared/ui/Loading/Loading";
import { ErrorMessage } from "Shared/ui/ErrorMessage/ErrorMessage";

const CATEGORY_MAP: Record<string, string> = {
    "men": "men's clothing",
    "women": "women's clothing",
    "electronics": "electronics",
    "jewelery": "jewelery"
};

export const ProductPage = () => {
    const { category } = useParams<{category: string}>();
    const { products, loading, error } = useProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        const currentCategory = category ?? 'all';

        if(currentCategory === 'all') return products;

        const apiCategoryName = CATEGORY_MAP[currentCategory] ?? currentCategory;

        return products.filter((product) => product.category === apiCategoryName);
    }, [products, category])

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