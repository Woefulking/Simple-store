import { CartItemType, useCartStore } from "..";
import clsx from "clsx";
import cls from './CartItem.module.scss';
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface CartItemProps {
    item: CartItemType;
    className?: string;
}

export const CartItem = (props: CartItemProps) => {
    const { item, className } = props;

    const dispatch = useCartStore((state) => state.dispatch);

    return (
        <div className={clsx(cls.item, className)}>
            <div className={clsx(cls.preview)}>
                <img src={item.image} alt={item.title} className={clsx(cls.img)} />
            </div>
            <div className={clsx(cls.details)}>
                <Title variant={TitleVariants.H3}>{item.title}</Title>
                <div className={clsx(cls.quantity)}>
                    <Button
                        className={clsx(cls.quantityButton)}
                        variant={ButtonVariants.ICON}
                        onClick={() => dispatch({ type: 'decrease', payload: item.id })}
                    >
                        <FaMinus size={16} />
                    </Button>
                    <span className={clsx(cls.count)}>{item.count}</span>
                    <Button
                        className={clsx(cls.quantityButton)}
                        variant={ButtonVariants.ICON}
                        onClick={() => dispatch({ type: 'increase', payload: item.id })}
                    >
                        <FaPlus size={16} />
                    </Button>
                </div>
            </div>
            <div className={clsx(cls.price)}>
                <span className={clsx(cls.label)}>Цена: </span>
                <strong>{item.price} $</strong>
            </div>
            <Button
                variant={ButtonVariants.ICON}
                className={clsx(cls.remove)}
                onClick={() => dispatch({ type: 'remove', payload: item.id })}
            >
                <MdDelete size={24} />
            </Button>
        </div>
    )
}