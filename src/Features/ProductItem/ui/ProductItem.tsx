import { Button, ButtonVariants } from "shared/ui/Button/Button";
import { FiHeart } from "react-icons/fi";
import { Title, TitleVariants } from "shared/ui/Title/Title";
import type { Product } from "entities/Product";
import { useCartStore } from "entities/Cart";
import { getItemById } from "shared/lib/getItemById";
import { useFavoritesStore } from "entities/Favorites";

interface ProductItemProps {
    product: Product;
}

export const ProductItem = (props: ProductItemProps) => {
    const { product } = props;

    const cartItems = useCartStore((state) => state.items);
    const cartTargetItem = getItemById(cartItems, product.id);
    const isInCart = Boolean(cartTargetItem);
    const cartDispatch = useCartStore((state) => state.dispatch)

    const favoriteItems = useFavoritesStore((state) => state.items);
    const favorireTargetItem = getItemById(favoriteItems, product.id);
    const isInFavorite = Boolean(favorireTargetItem);
    const favoriteDispatch = useFavoritesStore((state) => state.dispatch);

    const handleFavoriteClick = (product: Product) => {
        if (isInFavorite) {
            favoriteDispatch({
                type: 'remove',
                payload: product.id,
            })
        } else {
            favoriteDispatch({
                type: 'add',
                payload: product,
            })
        }
    }

    const handleCartClick = (product: Product) => {
        if (isInCart) {
            cartDispatch({ type: 'remove', payload: product.id })
        } else {
            cartDispatch({ type: 'add', payload: product });
        }
    }

    return (
        <div className="w-full flex flex-col p-5 rounded-2xl bg-secondary text-primary shadow-soft transition-all duration-200 md:hover:-translate-y-0.5 md:hover:shadow-soft-hover">
            <Title variant={TitleVariants.H2} className="text-center min-h-20">
                {product.title}
            </Title>
            <div className="flex-1 max-h-40 md:max-h-60 flex items-center justify-center mb-4">
                <img src={product.image} alt="preview" className="max-w-full max-h-full object-contain" />
            </div>
            <p className="line-clamp-3 mb-5 text-sm leading-relaxed text-secondary-text">{product.description}</p>
            <div className="flex flex-col gap-2 mb-4 text-sm sm:flex-row sm:justify-between sm:items-center sm:text-base">
                <div className="flex gap-3 text-secondary-text">
                    <span>
                        Rating: <strong className="text-primary font-semibold">{product.rating.rate}</strong>
                    </span>
                    <span>
                        Reviews : <strong className="text-primary font-semibold">{product.rating.count}</strong>
                    </span>
                </div>
                <span className="text-secondary-text">
                    Price: <strong className="text-primary font-bold text-lg sm:text-base">{product.price} $</strong>
                </span>
            </div>
            <div className="flex justify-end items-center gap-4 mt-auto">
                <Button
                    variant={ButtonVariants.ICON}
                    className={`p-2 transition-colors ${!isInFavorite && "[&_svg]:fill-transparent [&_svg]:stroke-secondary-text hover:[&_svg]:stroke-primary"} ${isInFavorite && "[&_svg]:fill-secondary-text [&_svg]:stroke-secondary-text"}`}
                    onClick={() => handleFavoriteClick(product)}
                >
                    <FiHeart size={30} />
                </Button>
                <Button
                    padding={true}
                    variant={ButtonVariants.BLUE}
                    onClick={() => handleCartClick(product)}
                     className="sm:w-auto"
                >
                    {!isInCart ? 'Add to Cart' : 'Added'}
                </Button>
            </div>
        </div >
    );
};
