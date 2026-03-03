import { useEffect } from 'react';
import { Header } from './Widgets/Header/Header';
import { useProducts } from 'Shared/hooks/useProducts';
import { Outlet } from "react-router";
import './App.css';
import { useFilterStore } from 'Widgets/Filters/model/FiltersStore';
import { Loading } from 'Shared/ui/Loading/Loading';
import { Error } from 'Shared/ui/Error/Error';
import { useUserStore } from 'entities/User';
import { useCartStore } from 'entities/Cart';
import { useFavoritesStore } from 'entities/Favorites';

function App() {
  const { products, loading, error } = useProducts();
  const filterDispatch = useFilterStore((state) => state.dispatch);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    filterDispatch({ type: 'init', payload: products });
  }, [products, filterDispatch]);

  useEffect(() => {
    useCartStore.getState().init(user);
    useFavoritesStore.getState().init(user);
  }, [user]);

  if (loading) {
    return (
      <div className="App">
        <Header />
        <Loading />
      </div>
    )
  }

  if (error) {
    <div className="App">
      <Header />
      <Error />
    </div>
  }

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
