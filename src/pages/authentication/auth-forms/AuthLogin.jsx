import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";

// third party
import { Formik } from "formik";

// project imports
import AnimateButton from "components/@extended/AnimateButton";
import { FormOutLinedField } from "components/AppComponents/FormOutLinedField";
import { useLoginUser } from "hooks/useLogin";
import { useAuthCookies } from "utils/cookie";
import { createValidationSchema } from "utils/loginUtils";

export default function AuthLogin(props) {
  const { fieldsConfig } = props;
  const [checked, setChecked] = useState(false);
  const loginMutation = useLoginUser();
  const { getCookie } = useAuthCookies();
  const user = getCookie("superkey");
  const validationSchema = createValidationSchema(fieldsConfig);
  const handleFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    loginMutation.mutate({ values, checked });
  };
  return (
    <Formik
      initialValues={{
        email: !!user?.password ? user?.email : "",
        password: user?.password,
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {fieldsConfig.map((field) => (
              <Grid item xs={12} key={field.name}>
                <FormOutLinedField
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  value={values[field.name]}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  placeholder={field.placeholder}
                  label={field.label}
                  // touched={touched[field.name]}
                  error={touched[field.name] && errors[field.name]}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Typography variant="h7" color="#5B738B" fontSize="0.75rem">
                    Remember Password
                  </Typography>
                }
              />
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </AnimateButton>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="h7" color="#5B738B" fontSize="0.75rem">
                  Forgot Password?
                </Typography>
                <Link
                  variant="h7"
                  component={RouterLink}
                  color="red"
                  fontWeight={600}
                  to="/reset/forgot"
                >
                  Reset Password
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthLogin.propTypes = {
  isDemo: PropTypes.bool,
};
