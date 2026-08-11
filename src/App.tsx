import { useEffect } from 'react';
import { Header } from './widgets/Header/Header';
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
      <div className='w-full max-w-300 mx-auto px-4 my-8 flex flex-col flex-1 bg-main pb-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
