import { Button, ButtonVariants } from 'components/Button/Button';
import { useCartStore } from 'entities/Cart/CartStore';
import { useLocation, useNavigate } from 'react-router';
import { useUserStore } from 'entities/User/UserStore';
import { Title, TitleVariants } from 'components/Title/Title';
import { v4 as uuidv4 } from 'uuid';
import { Order } from 'entities/Order/OrderTypes';
import { CartItemType } from 'entities/Cart/CartTypes';
import { CartItem } from './CartItem';
import cls from './CartPage.module.scss';
import clsx from 'clsx';

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
      createAt: new Date().toLocaleDateString('ru-Ru'),
    }
  }

  const handleCreateOrderClick = () => {
    if (!isAuth) {
      navigate('/auth', {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    const newOrder = createOrder(cartItems);

    userDispatch({ type: 'createOrder', payload: newOrder });
    cartDispatch({ type: 'clear' });
  }

  return (
    <div className={clsx(cls.cart)}>
      {cartItems.length > 0 ? (
        <>
          <Title variant={TitleVariants.H1}>Корзина</Title>
          <div className={clsx(cls.content)}>
            <div className={clsx(cls.list)}>
              {cartItems.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>

            <div className={clsx(cls.options)}>
              <div className={clsx(cls.total)}>
                <span className={clsx(cls.totalLabel)}>
                  Итого:
                </span>
                <div className={clsx(cls.totalWrapper)}>
                  <span className={clsx(cls.totalValue)}>
                    <strong>
                      {`${cartLength} ${cartLength > 10 ? 'товаров' : 'товар'}`}
                    </strong>
                  </span>
                  <span className={clsx(cls.totalValue)}>
                    <strong>
                      {Math.round(total)} $
                    </strong>
                  </span>
                </div>
              </div>

              <div className={clsx(cls.actions)}>
                <Button padding={true} variant={ButtonVariants.BLUE} onClick={handleCreateOrderClick}>
                  Оформить заказ
                </Button>
                <Button
                  padding={true}
                  variant={ButtonVariants.LIGHT_GREY}
                  className="cartBtn"
                  onClick={() =>
                    cartDispatch({
                      type: 'clear',
                    })
                  }
                >
                  Очистить корзину
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={clsx(cls.empty)}>Корзина пуста</div>
      )}
    </div>
  );
};
