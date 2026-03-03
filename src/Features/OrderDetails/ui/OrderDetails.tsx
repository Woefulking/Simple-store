import { CartItemType, useCartStore } from 'entities/Cart';
import { useFavoritesStore } from 'entities/Favorites';
import { useNavigate } from 'react-router';
import { getItemById } from 'Shared/lib/getItemById';
import clsx from 'clsx';
import cls from './OrderDetails.module.scss';
import { Title, TitleVariants } from 'Shared/ui/Title/Title';
import { Button, ButtonVariants } from 'Shared/ui/Button/Button';
import { FiHeart } from 'react-icons/fi';

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

    const favoriteDispatch = useFavoritesStore((state) => state.dispatch);

    const handleFavoriteClick = () => {
        favoriteDispatch({
            type: 'remove',
            payload: item.id
        })
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
                        <span className={clsx(cls.label)}>Рейтинг: </span>
                        <strong>{item.rating.rate}</strong>
                    </div>
                    <div className={clsx(cls.comment)}>
                        <span className={clsx(cls.label)}>Отзывов: </span>
                        <strong>{item.rating.count}</strong>
                    </div>
                </div>
            </div>
            <div className={clsx(cls.options)}>
                <div className={clsx(cls.price)}>
                    <span className={clsx(cls.label)}>Цена: </span>
                    <strong>$ {item.price}</strong>
                </div>
                <div className={clsx(cls.actions)}>
                    <Button variant={ButtonVariants.ICON} onClick={handleFavoriteClick}>
                        <FiHeart size={30} />
                    </Button>
                    <Button padding={true} variant={ButtonVariants.BLUE} onClick={handleCartClick}>
                        {!isInCart ? 'Купить' : 'В корзине'}
                    </Button>
                </div>
            </div>
        </div>
    )
}