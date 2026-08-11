import { useNavigate, useParams } from "react-router";
import { Title, TitleVariants } from "src/Shared/ui/Title/Title";
import { Button, ButtonVariants } from "src/Shared/ui/Button/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useUserStore } from "src/Entities/User";
import { formatOrderDate } from "src/Entities/Order";
import { OrderDetails } from "src/Features/OrderDetails";
import type { CartItemType } from "src/Entities/Cart";

export const OrderPage = () => {
    const { id } = useParams();
    const orders = useUserStore((state) => state.user?.orders);
    const order = orders?.find((order) => order.id === id);

    const navigate = useNavigate();

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-start gap-6 px-4 md:px-0">
            <Button variant={ButtonVariants.ICON_TEXT} className="text-muted hover:text-primary transition-colors text-sm md:text-base" onClick={() => navigate('/')}>
                <FaArrowLeftLong size={24} className="md:size-6" />
                 <span>Back to Home</span>
            </Button>
            <div className="flex flex-col gap-1 w-full">
                <Title variant={TitleVariants.H2}>{`Order ${order?.id}`}</Title>
                <span className="text-sm text-muted">
                    Order Date: <strong className="text-primary font-semibold">{formatOrderDate(order?.createAt!)}</strong>
                </span>
            </div>
            <div className="w-full flex flex-col gap-4">
                {order?.items.map((item: CartItemType) => <OrderDetails key={item.id} item={item} />)}
            </div>
        </div>
    )
}