import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queryClient';
import { SnackbarProvider } from 'components/AppComponents/SnackBarProvider';
import SuccessSnackbar from 'components/AppComponents/SnackBar';
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          </QueryClientProvider>
          <SuccessSnackbar />

        </SnackbarProvider>
      </ScrollTop>
    </ThemeCustomization>
  );
}
