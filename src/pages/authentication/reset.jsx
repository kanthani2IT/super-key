import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppGrid from 'components/AppComponents/AppGrid';
import Logo from 'components/logo';
import { useParams } from 'react-router-dom';
import { useAuthCookies } from 'utils/cookie';
import { CONFIRM_PASSWORD, EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from 'utils/loginUtils';
import AuthWrapper from './AuthWrapper';
import ResetPassword from './auth-forms/ResetPassword';


export default function Reset() {
  const { id } = useParams();
  const { getCookie } = useAuthCookies()
  const user = getCookie("superkey")
  const resetConfig = [
    {
      id: 'email-login',
      name: 'email',
      type: 'email',
      label: 'Email ID',
      placeholder: 'Enter Your Email ID',
      hide: id !== "sendEmail",
      validation: EMAIL_VALIDATION,
    },
    {
      id: 'otp',
      name: 'otp',
      type: 'otp',
      label: 'OTP',
      hide: id !== "otp",
      validation: OTP_VALIDATION,
    },
    {
      id: 'password-reset',
      name: 'password',
      type: 'password',
      label: 'Current Password',
      placeholder: 'Enter Current password',
      validation: PASSWORD_VALIDATION({ name: "Current " }),
      hide: true,
    },
    {
      id: 'newPassword-reset',
      name: 'newPassword',
      type: 'password',
      label: 'New Password',
      placeholder: 'Enter new password',
      validation: PASSWORD_VALIDATION({ name: "New " }),
      hide: true,

    },
    {
      id: 'confirmPassword-reset',
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'Confirm new password',
      validation: CONFIRM_PASSWORD,
      hide: true,

    }
  ].filter(items => !items.hide);

  const getTitle = (id) => {
    if (id == 'sendEmail') {
      return 'Enter your email to reset password'
    } else if (id == 'otp') {
      return `We have send a 6 digit code to your email - ${user?.email}`
    }
  }

  const getButtonText = (id) => {
    if (id == 'sendEmail') {
      return 'Send code to email'
    } else if (id == 'otp') {
      return `Next`
    }
  }

  return (
    <AuthWrapper>
      <AppGrid container spacing={3}>
        <AppGrid item xs={12} justifyContent={"center"} display={"flex"} textAlign={'center'}>
          <Stack direction="column" justifyContent="center" alignItems="center" width="100vw" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Logo />
            <Typography variant="h5" color='success' >{getTitle(id)}</Typography>
          </Stack>
        </AppGrid>
        <AppGrid item xs={12}>
          <ResetPassword fieldsConfig={resetConfig} buttonText={getButtonText(id)} id={id} />
        </AppGrid>
        {/* <Stack direction="column" justifyContent="center" alignItems="center" width="100vw" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography fontSize={'0.6rem'} color='#5B738B'>{PASSWORD_NOTE}</Typography>
        </Stack> */}
      </AppGrid>
    </AuthWrapper>
  );
}