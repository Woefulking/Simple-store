import { Title, TitleVariants } from 'Shared/ui/Title/Title';
import { Button, ButtonVariants } from 'Shared/ui/Button/Button';
import { FiHeart } from "react-icons/fi";
import { useNavigate } from 'react-router';
import type { Product } from 'Entities/Product';
import { useCartStore } from 'Entities/Cart';
import { getItemById } from 'Shared/lib/getItemById';
import { useFavoritesStore } from 'Entities/Favorites';

interface FavoriteItemProps {
    item: Product;
    className?: string;
}

export const FavoriteItem = (props: FavoriteItemProps) => {
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
        if (isInCart) {
            navigate('/cart');
        } else {
            cartDispatch({ type: 'add', payload: item })
        }
    }

    return (
        <div className={`flex flex-col gap-4 p-4 rounded-l bg-tertiary shadow-soft text-primary sm:flex-row sm:gap-0 ${className}`}> 
            <div className="p-3 rounded-m bg-secondary self-center sm:self-auto sm:mr-5 shrink-0">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-contain" 
                />
            </div>
            <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-0">
                <div>
                    <Title variant={TitleVariants.H3} className='text-center'>
                        {item.title}
                    </Title>
                    
                    <div className="flex flex-row gap-6 text-sm justify-center sm:justify-start">
                        <div>
                            <span className="text-secondary-text">Rating: </span>
                            <strong className="font-semibold">{item.rating.rate}</strong>
                        </div>
                        <div>
                            <span className="text-secondary-text">Reviews: </span>
                            <strong className="font-semibold">{item.rating.count}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center mt-2 pt-2 border-t border-primary-border/40 sm:mt-0 sm:pt-0 sm:border-none sm:items-end sm:pl-4">
                
                <div className="text-center sm:text-right text-lg mb-3 sm:mb-0">
                    <span className="text-secondary-text text-sm sm:text-base">Price: </span>
                    <strong className="font-bold text-xl sm:text-lg">$ {item.price}</strong>
                </div>
                
                <div className="flex flex-row items-center gap-4 w-full justify-center sm:w-auto sm:justify-end">
                    <Button 
                        variant={ButtonVariants.ICON} 
                        onClick={handleFavoriteClick} 
                        className="p-1.5 transition-all text-accent hover:text-muted active:scale-95 [&_svg]:fill-accent hover:[&_svg]:fill-transparent hover:[&_svg]:stroke-muted"
                    >
                        <FiHeart size={30} />
                    </Button>
                    
                    <Button 
                        padding 
                        variant={isInCart ? ButtonVariants.GREY : ButtonVariants.BLUE} 
                        onClick={handleCartClick}
                        className="flex-1 sm:flex-none sm:min-w-30"
                    >
                        {!isInCart ? 'Buy' : 'Added to cart'}
                    </Button>
                </div>

            </div>

        </div>
    )
}