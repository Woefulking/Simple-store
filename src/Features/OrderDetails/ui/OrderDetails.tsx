import { type CartItemType, useCartStore } from 'src/Entities/Cart';
import { useFavoritesStore } from 'src/Entities/Favorites';
import { useNavigate } from 'react-router';
import { getItemById } from 'src/Shared/lib/getItemById';
import { Title, TitleVariants } from 'src/Shared/ui/Title/Title';
import { Button, ButtonVariants } from 'src/Shared/ui/Button/Button';
import { FiHeart } from 'react-icons/fi';
import type { Product } from 'src/Entities/Product';

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
          <div className={`flex flex-col gap-4 p-4 rounded-2xl bg-tertiary shadow-soft text-primary sm:flex-row sm:gap-0 ${className}`}>
            <div className="p-3 rounded-m bg-secondary self-center sm:self-auto sm:mr-5 shrink-0">
                <img src={item.image} alt={item.title} className="w-40 h-40 object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-0">
                <Title variant={TitleVariants.H3}>{item.title}</Title>
                <div className="flex flex-row gap-6 text-sm justify-center sm:justify-start">
                    <div>
                        <span className="text-secondary-text">Rating: </span>
                        <strong className="font-semibold">{item.rating.rate}</strong>
                    </div>
                    <div>
                        <span className="text-secondary-text">Reviews: </span>
                        <strong  className="font-semibold">{item.rating.count}</strong>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center mt-2 pt-2 border-t border-primary-border/40 sm:mt-0 sm:pt-0 sm:border-none sm:items-end sm:pl-4">
                <div className="text-center sm:text-right text-lg mb-3 sm:mb-0">
                    <span className="text-secondary-text text-sm sm:text-base">Price: </span>
                    <strong className="font-bold text-xl sm:text-lg">$ {item.price}</strong>
                </div>
                <div className="flex flex-row items-center gap-4 w-full justify-center sm:w-auto sm:justify-end">
                    <Button variant={ButtonVariants.ICON} onClick={() => handleFavoriteClick(item)} className={`p-1.5 transition-colors ${!isInFavorite && "[&_svg]:fill-transparent [&_svg]:stroke-secondary-text hover:[&_svg]:stroke-primary"} ${isInFavorite && "[&_svg]:fill-secondary-text [&_svg]:stroke-secondary-text"}`}>
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