import { CartItemType, useCartStore } from 'entities/Cart';
import { useFavoritesStore } from 'entities/Favorites';
import { useNavigate } from 'react-router';
import { getItemById } from 'Shared/lib/getItemById';
import clsx from 'clsx';
import cls from './OrderDetails.module.scss';
import { Title, TitleVariants } from 'Shared/ui/Title/Title';
import { Button, ButtonVariants } from 'Shared/ui/Button/Button';
import { FiHeart } from 'react-icons/fi';
import { Product } from 'entities/Product';

interface OrderDetailsProps {
    item: CartItemType;
    className?: string;
}
export const OrderDetails = (props: OrderDetailsProps) => {
    const { item, className } = props;

    const navigate = useNavigate();

    const cartItems = useCartStore((state) => state.items);
    const cartTargetItem = getItemById(cartItems, item.id);
    const isInCart = Boolean(cartTargetItem);
    const cartDispatch = useCartStore((state) => state.dispatch)

    const favoriteItems = useFavoritesStore((state) => state.items);
    const favorireTargetItem = getItemById(favoriteItems, item.id);
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

    const handleCartClick = () => {
        const cartTargetItem = getItemById(cartItems, item.id);
        const isInCart = Boolean(cartTargetItem);

        if (isInCart) {
            navigate('/cart');
        } else {
            cartDispatch({ type: 'add', payload: item })
        }
    }

    return (
        <div className={clsx(cls.item, className)}>
            <div className={clsx(cls.preview)}>
                <img src={item.image} alt={item.title} className={clsx(cls.img)} />
            </div>
            <div className={clsx(cls.details)}>
                <Title variant={TitleVariants.H3}>{item.title}</Title>
                <div className={clsx(cls.additional)}>
                    <div className={clsx(cls.rating)}>
                        <span className={clsx(cls.label)}>Rating: </span>
                        <strong>{item.rating.rate}</strong>
                    </div>
                    <div className={clsx(cls.comment)}>
                        <span className={clsx(cls.label)}>Reviews: </span>
                        <strong>{item.rating.count}</strong>
                    </div>
                </div>
            </div>
            <div className={clsx(cls.options)}>
                <div className={clsx(cls.price)}>
                    <span className={clsx(cls.label)}>Price: </span>
                    <strong>$ {item.price}</strong>
                </div>
                <div className={clsx(cls.actions)}>
                    <Button variant={ButtonVariants.ICON} onClick={() => handleFavoriteClick(item)} className={clsx(cls.favorite, { [cls.filled]: isInFavorite })}>
                        <FiHeart size={30} />
                    </Button>
                    <Button padding={true} variant={ButtonVariants.BLUE} onClick={handleCartClick}>
                        {!isInCart ? 'Buy' : 'Added to cart'}
                    </Button>
                </div>
            </div>
        </div>
    )
}