import { useEffect } from 'react';
import { Header } from './Widgets/Header/Header';
import { Outlet } from "react-router";
import { useUserStore } from 'entities/User';
import { useCartStore } from 'entities/Cart';
import { useFavoritesStore } from 'entities/Favorites';

function App() {
  const user = useUserStore((state) => state.user);

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
