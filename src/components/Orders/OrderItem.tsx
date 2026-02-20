import clsx from 'clsx';
import cls from './OrderItem.module.scss';
import { Order } from 'entities/Order/OrderTypes';
import { Title, TitleVariants } from 'components/Title/Title';
import { useNavigate } from 'react-router';

interface OrderItemProps {
    order: Order;
    className?: string;
}

export const OrderItem = (props: OrderItemProps) => {
    const { order, className } = props;
    const navigate = useNavigate();

    const items = order.items.slice(0, 4);
    const count = items.length;

    return (
        <div
            className={clsx(cls.order, className)}
            onClick={() => navigate(`/orders/${order.id}`)}
        >
            <div
                className={clsx(cls.preview)}
                style={{
                    gridTemplateColumns:
                        count === 1 ? '1fr' :
                            count === 2 ? '1fr 1fr' :
                                '1fr 1fr',
                }}
            >
                {items.map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} />
                ))}
            </div>
            <div className={clsx(cls.details)}>
                <Title variant={TitleVariants.H3}>{`Заказ ${order.id}`}</Title>
                <span className={clsx(cls.date)}>
                    Дата оформления заказа: <strong className={clsx(cls.dateValue)}>{order.createAt}</strong>
                </span>
            </div>
        </div>
    )
}