import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid2 } from '@mui/material';
import Logo from 'components/logo';
import { CONFIRM_PASSWORD, EMAIL_VALIDATION, PASSWORD_NOTE, PASSWORD_VALIDATION } from 'utils/loginUtils';
import AuthWrapper from './AuthWrapper';
import ResetPassword from './auth-forms/ResetPassword';


export default function Reset() {
  const { id } = useParams();

  const resetConfig = [
    {
      id: 'email-login',
      name: 'email',
      type: 'email',
      label: 'Email ID',
      placeholder: 'Enter Your Email ID',
      validation: EMAIL_VALIDATION,
    },
    {
      id: 'password-reset',
      name: 'password',
      type: 'password',
      label: 'Current Password',
      placeholder: 'Enter Current password',
      validation: PASSWORD_VALIDATION({ name: "Current " }),
      hide: id === "forgot",
    },
    {
      id: 'newPassword-reset',
      name: 'newPassword',
      type: 'password',
      label: 'New Password',
      placeholder: 'Enter new password',
      validation: PASSWORD_VALIDATION({ name: "New " }),
    },
    {
      id: 'confirmPassword-reset',
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm new password',
      validation: CONFIRM_PASSWORD,
    }
  ].filter(items => !items.hide);

  return (
    <AuthWrapper>
      <Grid2 container spacing={3}>
        <Grid2 item xs={12} justifyContent={"center"} display={"flex"}>
          <Stack direction="column" justifyContent="center" alignItems="center" width="100vw" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Logo />
            <Typography variant="h6" color="#5B738B" fontSize={"0.8rem"} fontWeight={700}>Reset your password</Typography>
          </Stack>
        </Grid2>
        <Grid2 item xs={12}>
          <ResetPassword fieldsConfig={resetConfig} />
        </Grid2>
        <Stack direction="column" justifyContent="center" alignItems="center" width="100vw" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography fontSize={'0.6rem'} color='#5B738B'>{PASSWORD_NOTE}</Typography>
        </Stack>
      </Grid2>
    </AuthWrapper>
  );
}