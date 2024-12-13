import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// project import
import AuthCard from './AuthCard';
export default function AuthWrapper({ children }) {
  return (
    <Box minHeight={'100vh'}>

      <Stack minHeight={'100vh'} alignItems={'center'} justifyContent="center">
        <Stack justifyContent={'center'} alignItems={'center'} justifySelf={'center'} justifyItems={'center'}>
          <AuthCard>{children}</AuthCard>
        </Stack>
        {/* <Image width={'50%'} height={'100vh'} src={loginBanner} /> */}
      </Stack>
      {/* <Fab disabled sx={{ position: "absolute", top: "50%", right: "49%" }}>
        <Image height={'75'} width={'80'} src={logo} />
      </Fab> */}
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
