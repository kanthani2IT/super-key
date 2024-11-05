import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import ChangePassword from 'pages/login/ChangePassword';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
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
    }
  ]
};

export default LoginRoutes;
