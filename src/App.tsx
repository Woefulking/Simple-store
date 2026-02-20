import { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { useProducts } from 'hooks/useProducts';
import { Outlet } from "react-router";
import './App.css';
import { useFilterStore } from 'components/Filters/model/FiltersStore';
import { useUserStore } from 'entities/User/UserStore';
import { useFavoritesStore } from 'entities/Favorites/FavoritesStore';
import { useCartStore } from 'entities/Cart/CartStore';

function App() {
  const { products, loading, error } = useProducts();
  const filterDispatch = useFilterStore((state) => state.dispatch);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    filterDispatch({ type: 'init', payload: products });
  }, [products]);

  useEffect(() => {
    useCartStore.getState().init(user);
    useFavoritesStore.getState().init(user);
  }, [user]);

  return (
    <div className="App">
      <Header />
      <div className='main'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
