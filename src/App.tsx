import { useEffect } from 'react';
import { Header } from 'Widgets/Header/Header';
import { Outlet } from "react-router";
import { useCartStore } from 'Entities/Cart';
import { useFavoritesStore } from 'Entities/Favorites';
import { useUserStore, type UserState } from 'Entities/User';

function App() {
  const user = useUserStore((state: UserState) => state.user);

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
