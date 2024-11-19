import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const Community = Loadable(lazy(() => import('pages/community/onboarding/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [

    {
      path: 'home',
      element: <DashboardDefault />


    },
    {
      path: 'community-onboarding',
      element: <Community />
    },
    {
      path: 'community-assets',
      element: <Community />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
