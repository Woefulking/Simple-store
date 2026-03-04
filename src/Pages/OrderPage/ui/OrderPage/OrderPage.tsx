import { useNavigate, useParams } from "react-router";
import { Title, TitleVariants } from "Shared/ui/Title/Title";
import clsx from "clsx";
import cls from './OrderPage.module.scss';
import { Button, ButtonVariants } from "Shared/ui/Button/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useUserStore } from "entities/User";
import { CartItemType } from "entities/Cart";
import { formatOrderDate } from "entities/Order";
import { OrderDetails } from "Features/OrderDetails";

export const OrderPage = () => {
    const { id } = useParams();
    const orders = useUserStore((state) => state.user?.orders);
    const order = orders?.find((order) => order.id === id);

    const navigate = useNavigate();

    return (
        <div className={clsx(cls.order)}>
            <Button variant={ButtonVariants.ICON_TEXT} className={clsx(cls.back)} onClick={() => navigate('/')}>
                <FaArrowLeftLong size={24} />
                Back to Home
            </Button>
            <div className={clsx(cls.details)}>
                <Title variant={TitleVariants.H2}>{`Order ${order?.id}`}</Title>
                <span className={clsx(cls.date)}>
                    Order Date: <strong className={clsx(cls.dateValue)}>{formatOrderDate(order?.createAt!)}</strong>
                </span>
            </div>
            <div className={clsx(cls.list)}>
                {order?.items.map((item: CartItemType) => <OrderDetails key={item.id} item={item} />)}
            </div>
        </div>
    )
}