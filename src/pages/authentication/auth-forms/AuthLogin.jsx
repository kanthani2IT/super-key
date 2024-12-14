import PropTypes from "prop-types";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,

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
import AppGrid from "components/AppComponents/AppGrid";

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
  console.log(user?.email)
  return (
    <Formik
      initialValues={{
        email: user?.email,
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
          <AppGrid container spacing={3}>
            {fieldsConfig.map((field) => (
              <AppGrid item size={{ xs: 12 }} key={field.name}>
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
              </AppGrid>
            ))}

            <AppGrid item size={{ xs: 12 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      size="small"
                      color="info"

                    />
                  }
                  label={
                    <Typography variant="h7" color="#5B738B" fontSize="0.75rem">
                      Remember Password
                    </Typography>
                  }
                />
                <Link
                  variant="h7"
                  component={RouterLink}
                  fontWeight={600}
                  underline=""
                  to="/reset/forgot"
                  color="info"

                >
                  Forget Password?
                </Link>
              </Stack>
            </AppGrid>

            {errors.submit && (
              <AppGrid item size={{ xs: 12 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </AppGrid>
            )}

            <AppGrid item size={{ xs: 12 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="info"
                >
                  Login
                </Button>
              </AnimateButton>
            </AppGrid>


          </AppGrid>
        </form>
      )}
    </Formik>
  );
}

AuthLogin.propTypes = {
  isDemo: PropTypes.bool,
};
