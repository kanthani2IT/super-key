import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queryClient';
import http from 'http/http';
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
