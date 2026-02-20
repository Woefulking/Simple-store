import { useUserStore } from "entities/User/UserStore";
import { useNavigate, useParams } from "react-router";
import { Title, TitleVariants } from "components/Title/Title";
import clsx from "clsx";
import cls from './OrderPage.module.scss';
import { OrderPageItem } from "./OrderPageItem";
import { Button, ButtonVariants } from "components/Button/Button";
import { FaArrowLeftLong } from "react-icons/fa6";

export const OrderPage = () => {
    const { id } = useParams();
    const orders = useUserStore((state) => state.user?.orders);
    const order = orders?.find((order) => order.id === id);

    const navigate = useNavigate();

    return (
        <div className={clsx(cls.order)}>
            <Button variant={ButtonVariants.ICON_TEXT} className={clsx(cls.back)} onClick={() => navigate(-1)}>
                <FaArrowLeftLong size={24} />
                Вернуться назад
            </Button>
            <div className={clsx(cls.details)}>
                <Title variant={TitleVariants.H2}>{`Заказ ${order?.id}`}</Title>
                <span className={clsx(cls.date)}>
                    Дата оформления заказа: <strong className={clsx(cls.dateValue)}>{order?.createAt}</strong>
                </span>
            </div>
            <div className={clsx(cls.list)}>
                {order?.items.map((item) => <OrderPageItem key={item.id} item={item} />)}
            </div>
        </div>
    )
}