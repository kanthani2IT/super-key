import { Navigate } from 'react-router-dom';
import { useAuthCookies } from 'utils/cookie';

const useAuth = () => {
  const { getCookie } = useAuthCookies()

  const token = getCookie("token");
  return !!token;
};

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
