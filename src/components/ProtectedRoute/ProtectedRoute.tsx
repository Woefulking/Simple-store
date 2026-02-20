import { useUserStore } from 'entities/User/UserStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
    const location = useLocation();
    const isAuth = useUserStore((state) => state.isAuth);

    if (!isAuth && location.pathname !== '/') {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
