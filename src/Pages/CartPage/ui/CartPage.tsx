import { Button, ButtonVariants } from 'src/Shared/ui/Button/Button';
import { useLocation, useNavigate } from 'react-router';
import { Title, TitleVariants } from 'src/Shared/ui/Title/Title';
import { v4 as uuidv4 } from 'uuid';
import { CartItem, type CartItemType, useCartStore } from 'src/Entities/Cart';
import { useUserStore } from 'src/Entities/User';
import type { Order } from 'src/Entities/Order';

export const CartPage = () => {
  const cartItems = useCartStore((state) => state.items);
  const cartLength = cartItems.length;
  const cartDispatch = useCartStore((state) => state.dispatch);
  const total = cartItems?.reduce((sum, item) => sum + item.price * item.count, 0);

  const isAuth = useUserStore((state) => state.isAuth);
  const userDispatch = useUserStore((state) => state.dispatch);

  const navigate = useNavigate();
  const location = useLocation();

  const createOrder = (items: CartItemType[]): Order => {
    return {
      id: uuidv4(),
      items,
      createAt: Date.now(),
    }
  }

  const handleCheckoutClick = () => {
    if (!isAuth) {
      navigate('/auth', {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    const newOrder = createOrder(cartItems);

    userDispatch({ type: 'createOrder', payload: newOrder });
    navigate(`/orders/${newOrder.id}`);
    cartDispatch({ type: 'clear' });
  }

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col px-4 md:px-0 text-primary">
      {cartItems.length > 0 ? (
        <>
          <Title variant={TitleVariants.H1}>Cart</Title>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>

            <div className="w-full h-fit flex flex-col gap-5 bg-secondary rounded-2xl px-4 py-6 md:p-8 shadow-soft shrink-0 lg:w-90">
              <div>
                <span className="inline-block mb-2 text-sm text-muted">
                  Subtotal:
                </span>
                <div className="flex flex-row justify-between text-lg md:text-xl font-semibold">
                  <span className="text-secondary-text">
                    <strong>
                      {`${cartLength} ${cartLength > 10 ? 'items' : 'item'}`}
                    </strong>
                  </span>
                  <span>
                    <strong>
                      {Math.round(total)} $
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Button padding={true} variant={ButtonVariants.BLUE} onClick={handleCheckoutClick} className="w-full max-w-80">
                  Checkout
                </Button>
                <Button
                  padding={true}
                  variant={ButtonVariants.LIGHT_GREY}
                  className="w-full max-w-80"
                  onClick={() =>
                    cartDispatch({
                      type: 'clear',
                    })
                  }
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center text-2xl md:text-4xl text-secondary-text font-medium py-20">Your cart is empty</div>
      )}
    </div>
  );
};
