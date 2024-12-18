import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import ChangePassword from 'pages/login/ChangePassword';
import Reset from 'pages/authentication/reset';
import UnProtectedRoute from './UnProtectedRoutes';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <UnProtectedRoute><MinimalLayout /></UnProtectedRoute>,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" replace /> // Redirect root path to /login
    },
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/changePassword/:id',
      element: <ChangePassword />
    },
    {
      path: '/reset/:id',
      element: <Reset />
    }
  ]
};

export default LoginRoutes;
