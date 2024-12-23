import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Link } from '@mui/material';

// third party
import { Formik } from 'formik';
import { Link as RouterLink } from "react-router-dom";

// project imports
import AppGrid from 'components/AppComponents/AppGrid';
import { FormOutLinedField } from 'components/AppComponents/FormOutLinedField';
import AppOtpInput from 'components/AppOtpInput';
import { useNewPassword, useRequestReset, useResetPassword } from 'hooks/useLogin';
import { useAuthCookies } from 'utils/cookie';
import { createValidationSchema } from 'utils/loginUtils';

export default function ResetPassword(props) {
  const { fieldsConfig, buttonText = 'Reset Password', id } = props
  const navigate = useNavigate()
  const { getCookie, setAuthCookie } = useAuthCookies()
  const user = getCookie("superkey")
  const token = getCookie("t")
  const newPasswordMutation = useNewPassword();
  const resetPasswordMutation = useResetPassword();
  const forgotPassword = useRequestReset();
  const validationSchema = createValidationSchema(fieldsConfig);

  const handleFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (id == 'sendEmail') {
      console.log(values)
      navigate('/reset/otp')
    } else if (id == "change") {
      let payload = {
        email: values?.email,
        password: values.password,
        newPassword: values.newPassword,
      }
      newPasswordMutation.mutate(payload);
    } else if (id == 'forgot') {
      forgotPassword.mutate(values?.email);
    } else {
      let payload = {
        email: values?.email,
        password: values.newPassword,

        newPassword: values.newPassword,

      };
      resetPasswordMutation.mutate(payload);
      values?.email && setAuthCookie("superkey", { email: values.email });
    }
  };

  const handleOtpChange = (key, value) => {
    console.log(key, value)
  }
  { console.log(id) }

  return (
    <Formik
      initialValues={{
        email: user?.email || "",
        password: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={handleFormSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <AppGrid container spacing={3} >
            {fieldsConfig.map((field) => (
              <AppGrid item size={{ xs: 12 }} key={field.name}>
                {id == 'otp' ? <AppOtpInput onComplete={handleOtpChange} name={field.name} error={errors[field.name]} /> :
                  <FormOutLinedField
                    id={field.id}
                    type={field.type}
                    name={field.name}
                    value={values[field.name]}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder={field.placeholder}
                    label={field.label}
                    error={errors[field.name]}
                  />}
              </AppGrid>
            ))}

            {errors.submit && (
              <AppGrid item size={{ xs: 12 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </AppGrid>
            )}

            <AppGrid item size={{ xs: 12 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="info" fontWeight={500}>
                {buttonText}
              </Button>
            </AppGrid>
            <AppGrid item size={{ xs: 12 }} textAlign='center'>
              <Link variant="h7"

                component={RouterLink}
                fontWeight={600}
                underline=""
                to="/login"
                color="info">
                Back to login
              </Link>
            </AppGrid>
          </AppGrid>
        </form>
      )}
    </Formik>
  );
}

ResetPassword.propTypes = {
  isDemo: PropTypes.bool
};
