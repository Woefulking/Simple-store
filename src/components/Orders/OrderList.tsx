import clsx from 'clsx';
import cls from './OrderList.module.scss';
import { useUserStore } from 'entities/User/UserStore';
import { Title, TitleVariants } from 'components/Title/Title';
import { OrderItem } from './OrderItem';

export const OrderList = () => {
    const orders = useUserStore((state) => state.user?.orders);
    return (
        <div className={clsx(cls.orders)}>
            <Title variant={TitleVariants.H1}>Заказы</Title>
            <div className={clsx(cls.list)}>
                {orders?.map((order) => (
                    <OrderItem order={order} />
                ))}
            </div>
        </div>
    )
}