import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import loginBanner from 'assets/images/login/loginBanner.jpeg'
import logo from 'assets/images/login/logoIcon.svg'
// project import
import AuthCard from './AuthCard';
import { Image } from 'components/StyledComponents';
import { Fab, useMediaQuery } from '@mui/material';
export default function AuthWrapper({ children }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('850'));

  return (
    <Box minHeight={'100vh'} alignContent={'center'}>
      <Stack flexDirection={'row'} justifyContent="space-between">
        <Stack width={isMobile ? '100%' : '50%'} justifyContent={'center'} maxHeight={'100vh'} alignItems={'center'} justifySelf={'center'} justifyItems={'center'}>
          <AuthCard>{children}</AuthCard>
        </Stack>
        {!isMobile && <Image width={'50%'} height={'100vh'} src={loginBanner} />}
      </Stack>
      {!isMobile && (
        <Fab disabled sx={{ position: "absolute", top: "50%", right: "49%" }}>
          <Image height={'75'} width={'80'} src={logo} />
        </Fab>
      )}
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
