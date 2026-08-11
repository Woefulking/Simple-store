import { useUserStore } from 'src/Entities/User';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const isAuth = useUserStore((state) => state.isAuth);

    if (!isAuth && location.pathname !== '/') {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
