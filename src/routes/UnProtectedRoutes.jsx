import { Navigate } from 'react-router-dom';
import { useAuthCookies } from 'utils/cookie';
import { logoutUser } from 'utils/helpers';

const useAuth = () => {
    const { getCookie } = useAuthCookies()

    const token = getCookie("token");
    return !!token;
};



const UnProtectedRoute = ({ children }) => {
    const isAuth = useAuth();

    return isAuth ? logoutUser()

        : children;
};

export default UnProtectedRoute;
