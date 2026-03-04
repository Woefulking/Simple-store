import { formatOrderDate, Order } from "entities/Order";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import clsx from 'clsx';
import cls from './OrderPreview.module.scss';

interface OrderPreviewProps {
    order: Order;
    onClick: () => void;
    className?: string;
}
export const OrderPreview = (props: OrderPreviewProps) => {
    const { order, onClick, className } = props;
    const items = order.items.slice(0, 4);

    return (
        <div
            className={clsx(cls.preview, className)}
            onClick={onClick}
        >
            <div className={clsx(cls.products)}>
                {items.map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} />
                ))}
            </div>
            <div className={clsx(cls.details)}>
                <Title variant={TitleVariants.H3}>{`Order ${order.id}`}</Title>
                <span className={clsx(cls.date)}>
                    Order Date: <strong className={clsx(cls.dateValue)}>{formatOrderDate(order.createAt)}</strong>
                </span>
            </div>
        </div>
    )
}