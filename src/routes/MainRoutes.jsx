import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import PageNotFound from 'pages/extra-pages/PageNotFound';
import ProtectedRoute from './ProtectedRoutes';
import Task from 'pages/task';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));


const CommunityOnboarding = Loadable(lazy(() => import('pages/community/index')));
const AllDocuments = Loadable(lazy(() => import('pages/documents-repository/all-documents/index')));
const COI = Loadable(lazy(() => import('pages/documents-repository/coi/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>,
  children: [

    {
      path: 'home',
      element: <DashboardDefault />
    },
    {
      path: 'community',
      children: [{
        path: 'onboarding',
        element: <CommunityOnboarding />
      },
      {
        path: 'assets',
        element: <CommunityOnboarding />
      }]
    },
    {
      path: 'documents',
      children: [
        // {
        //   path: 'all-documents',
        //   element: <AllDocuments />
        // },
        {
          path: 'coi',
          element: <COI />
        }
      ]
    },
    {
      path: 'tasks',
      element: <Task />
    },
    {
      path: "*",
      element: <PageNotFound />
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
