import { logoutUser, useAuth } from 'utils/helpers';



const handlleRoutes = (children) => {
    logoutUser(true)
    return children
}

const UnProtectedRoute = ({ children }) => {
    const isAuth = useAuth();

    return isAuth ? handlleRoutes(children)

        : children;
};

export default UnProtectedRoute;
