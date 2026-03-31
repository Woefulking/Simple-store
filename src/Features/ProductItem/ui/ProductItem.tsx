import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { FiHeart } from "react-icons/fi";
import cls from './ProductItem.module.scss';
import clsx from "clsx";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { Product } from "entities/Product";
import { useCartStore } from "entities/Cart";
import { getItemById } from "Shared/lib/getItemById";
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
        <div className={clsx(cls.item)}>
            <Title variant={TitleVariants.H2} className={clsx(cls.title)}>
                {product.title}
            </Title>
            <div className={clsx(cls.preview)}>
                <img src={product.image} alt="preview" />
            </div>
            <p className={clsx(cls.description)}>{product.description}</p>
            <div className={clsx(cls.additional)}>
                <div className={clsx(cls.rating)}>
                    <span className={clsx(cls.label)}>
                        Rating: <strong className={clsx(cls.value)}>{product.rating.rate}</strong>
                    </span>
                    <span className={clsx(cls.label)}>
                        Reviews : <strong className={clsx(cls.value)}>{product.rating.count}</strong>
                    </span>
                </div>
                <span className={clsx(cls.label)}>
                    Price: <strong className={clsx(cls.value)}>{product.price} $</strong>
                </span>
            </div>
            <div className={clsx(cls.actions)}>
                <Button
                    variant={ButtonVariants.ICON}
                    className={clsx(cls.favorite, { [cls.filled]: isInFavorite })}
                    onClick={() => handleFavoriteClick(product)}
                >
                    <FiHeart size={30} />
                </Button>
                <Button
                    padding={true}
                    variant={ButtonVariants.BLUE}
                    onClick={() => handleCartClick(product)}
                >
                    {!isInCart ? 'Add to Cart' : 'Added'}
                </Button>
            </div>
        </div >
    );
};
