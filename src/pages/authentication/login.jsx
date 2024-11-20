// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { Grid2 } from '@mui/material';
import Logo from 'components/logo';
import { LOGIN_CONFIG } from 'utils/loginUtils';
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

export default function Login() {

  return (
    <AuthWrapper>
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} justifyContent={"center"} display={"flex"}>
          <Stack direction="column" justifyContent="center" alignItems="center" width="100vw" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Logo />
            <Typography variant="h1" color="success" fontSize={"2rem"} fontWeight={700} lineHeight={'3rem'}>Welcome !</Typography>
            <Typography variant="h7" color="secondary" fontSize={"0.75rem"}>Login to your account</Typography>
          </Stack>
        </Grid2>
        <Grid2 item xs={12}>
          <AuthLogin fieldsConfig={LOGIN_CONFIG} />
        </Grid2>
      </Grid2>
    </AuthWrapper>
  );
}