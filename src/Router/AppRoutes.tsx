import { ReactNode } from "react";
import { CartPage } from "Pages/CartPage/CartPage";
import { AuthPage } from "Pages/AuthPage/ui/AuthPage";
import { ProfilePage } from "Pages/ProfilePage/ui/ProfilePage";
import { Route, Routes } from "react-router-dom";
import App from "App";
import { ProductList } from "Pages/ProductPage/ProductList/ProductList";
import { FavoritesPage } from "Pages/FavoritesPage/FavoritesPage";
import { ProtectedRoute } from "components/ProtectedRoute/ProtectedRoute";
import { OrderPage } from "Pages/OrderPage/OrderPage";

export type AppRoute = {
  path: string;
  element: ReactNode;
};

export const routeConfig: AppRoute[] = [
  { path: '/', element: <ProductList /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/:category?', element: <ProductList /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/orders/:id', element: <div></div> }
];

export const AppRoutes = () => (
  <Routes>
    <Route element={<App />}>
      <Route path="/" element={<ProductList />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      {/* Защищённые маршруты */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders/:id" element={<OrderPage />} />
      </Route>

      <Route path="/:category?" element={<ProductList />} />
    </Route>
  </Routes>
);