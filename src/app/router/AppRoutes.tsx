import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import App from "App";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProductPage } from "Pages/ProductPage";
import { AuthPage } from "Pages/AuthPage";
import { CartPage } from "Pages/CartPage";
import { ProfilePage } from "Pages/ProfilePage";
import { FavoritesPage } from "Pages/FavoritesPage";
import { OrderPage } from "Pages/OrderPage";

export type AppRoute = {
  path: string;
  element: ReactNode;
  authOnly?: boolean;
};

export const routeConfig: AppRoute[] = [
  { path: '/', element: <ProductPage /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/profile', element: <ProfilePage />, authOnly: true },
  { path: '/:category?', element: <ProductPage /> },
  { path: '/favorites', element: <FavoritesPage /> },
  { path: '/orders/:id', element: <OrderPage />, authOnly: true },
];

export const AppRoutes = () => (
  <Routes>
    <Route element={<App />}>
      {routeConfig.map(({ path, element, authOnly }) => {
        const routeElement = authOnly ? (
          <ProtectedRoute>{element}</ProtectedRoute>
        ) : (
          element
        );
        return <Route key={path} path={path} element={routeElement} />;
      })}
    </Route>
  </Routes>
);