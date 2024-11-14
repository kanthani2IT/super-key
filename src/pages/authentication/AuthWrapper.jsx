import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project import
import AuthCard from './AuthCard';
export default function AuthWrapper({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Stack justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Stack
          alignItems="center"
          justifyContent="center"
        >
          <AuthCard>{children}</AuthCard>
        </Stack>
      </Stack>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
