import { useEffect } from 'react';
import { Header } from 'src/Widgets/Header/Header';
import { Outlet } from "react-router";
import { useUserStore } from 'src/Entities/User';
import { useCartStore } from 'src/Entities/Cart';
import { useFavoritesStore } from 'src/Entities/Favorites';

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
