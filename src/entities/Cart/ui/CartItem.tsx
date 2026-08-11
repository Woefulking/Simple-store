import { useCartStore, type CartItemType } from "..";
import { Title, TitleVariants } from "shared/ui/Title/Title";
import { Button, ButtonVariants } from "shared/ui/Button/Button";
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
   <div className={`relative flex flex-col gap-4 p-4 rounded-2xl bg-tertiary shadow-soft text-primary sm:flex-row sm:justify-between sm:gap-5 ${className}`}>
      <Button
        variant={ButtonVariants.ICON}
        className="absolute top-3 right-3 p-2 text-muted hover:text-danger active:scale-95 transition-all [&_svg]:fill-muted hover:[&_svg]:fill-danger"
        onClick={() => dispatch({ type: 'remove', payload: item.id })}
      >
        <MdDelete className="size-6" />
      </Button>

      <div className="flex flex-row items-center sm:items-stretch flex-1 gap-4 sm:gap-0">
        <div className="p-3 rounded-m bg-secondary shrink-0 sm:mr-5">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-20 h-20 object-contain" 
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-between pr-8 sm:pr-0">
          <Title variant={TitleVariants.H3}>
            {item.title}
          </Title>
          
          <div className="flex items-center gap-2">
            <Button
              className="p-1 text-muted hover:text-primary [&_svg]:fill-muted hover:[&_svg]:fill-primary transition-colors"
              variant={ButtonVariants.ICON}
              onClick={() => dispatch({ type: 'decrease', payload: item.id })}
            >
              <FaMinus size={14} />
            </Button>
            
            <span className="min-w-6 text-center text-sm font-medium">
              {item.count}
            </span>
            
            <Button
              className="p-1 text-muted hover:text-primary [&_svg]:fill-muted hover:[&_svg]:fill-primary transition-colors"
              variant={ButtonVariants.ICON}
              onClick={() => dispatch({ type: 'increase', payload: item.id })}
            >
              <FaPlus size={14} />
            </Button>
          </div>
        </div>

      </div>
      <div className="flex justify-between items-center pt-3 border-t border-primary-border/30 sm:pt-0 sm:border-none sm:flex-col sm:justify-end sm:items-end shrink-0">
        <span className="text-secondary-text text-sm sm:hidden">Price:</span>
        <div className="text-lg font-bold sm:self-end">
          {item.price} $
        </div>
      </div>

    </div>
    )
}