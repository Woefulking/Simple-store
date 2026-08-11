import { formatOrderDate, type Order } from "src/Entities/Order";
import { Title, TitleVariants } from "src/Shared/ui/Title/Title";

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
            className={`${className} flex flex-row gap-6 p-4 rounded-l bg-tertiary cursor-pointer transition-all duration-200 md:hover:-translate-y-0.5 md:hover:shadow-soft`}
            onClick={onClick}
        >
            <div className="grid grid-cols-2 grid-rows-[repeat(auto-fill,1fr)] place-items-center gap-1 w-27.5 h-27.5 p-3 rounded-m bg-secondary shrink-0 has-[img:only-child]:grid-cols-1">
                {items.map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} className="w-10 h-10 object-contain parent-has-[img:only-child]:w-20 parent-has-[img:only-child]:h-20" />
                ))}
            </div>
            <div className="flex flex-col justify-center">
                <Title variant={TitleVariants.H3}>
                    <span className="text-muted">Order: </span>
                    {order.id}
                </Title>
                <span className="text-xs md:text-sm text-muted">
                    Order Date: <strong className="text-primary font-semibold">{formatOrderDate(order.createAt)}</strong>
                </span>
            </div>
        </div>
    )
}