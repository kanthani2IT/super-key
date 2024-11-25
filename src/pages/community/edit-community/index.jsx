import {
  Autocomplete,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppCard from "components/AppComponents/AppCard";
import { useFormik } from "formik";
import { useGetUserById } from "hooks/useOnboard";
import * as Yup from "yup";
const initialValues = {
  addressDetails: {
    communityName: "",
    city: "",
    state: "",
    zipcode: "",
  },
  communityDetails: {
    communityManager: "",
    contactNumber: "",
    communityType: "",
    email: "",
  },
  insuranceDetails: {
    insuranceValue: "",
    insuranceCoverage: "",
  },
};

const initialValidationSchema = {
  addressDetails: Yup.object().shape({
    communityName: Yup.string().required("Name is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipcode: Yup.string().required("Zipcode is required"),
  }),
  communityDetails: Yup.object().shape({
    communityManager: Yup.string().required("Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    communityType: Yup.string().required("Community Type is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  insuranceDetails: Yup.object().shape({
    insuranceValue: Yup.string().required("Insurance Value is required"),
    insuranceCoverage: Yup.string().required("Insurance Coverage is required"),
  }),
};

const EditCommunity = ({ onClose }) => {
  const { data: userData, isLoading } = useGetUserById("98765432345678");
  console.log(userData, "userdata");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(initialValidationSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setValues,
    handleSubmit,
    handleChange,
    setTouched,
    setErrors,
  } = formik;
  const onReset = () => {
    formik.resetForm();
    onClose();
  };
  const Footer = () => {
    return (
      <>
        <Button onClick={onReset}>Discard</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </>
    );
  };

  return (
    <AppCard title={"Desert Springs"} footer={<Footer />} onClose={onClose}>
      <Grid
        container
        size={{ xs: 12 }}
        padding={1}
        spacing={2}
        direction={"column"}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"AddressDetails"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Community Name</FormLabel>
              <TextField
                value={formik.values.addressDetails.communityName}
                placeholder="Eg : Desert Springs"
                fullWidth
                onChange={formik.handleChange}
                name="addressDetails.communityName"
                error={Boolean(
                  formik.touched.addressDetails?.communityName &&
                    formik.errors.addressDetails?.communityName
                )}
                helperText={
                  formik.touched.addressDetails?.communityName &&
                  formik.errors.addressDetails?.communityName
                }
              />
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>City</FormLabel>

              <TextField
                value={formik.values.addressDetails.city}
                fullWidth
                placeholder="Eg : Flushing"
                onChange={formik.handleChange}
                name="addressDetails.city"
                error={Boolean(
                  formik.touched.addressDetails?.city &&
                    formik.errors.addressDetails?.city
                )}
                helperText={
                  formik.touched.addressDetails?.city &&
                  formik.errors.addressDetails?.city
                }
              />
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>State</FormLabel>

              <TextField
                value={formik.values.addressDetails.state}
                fullWidth
                onChange={formik.handleChange}
                name="addressDetails.state"
                placeholder="Eg : New York"
                error={Boolean(
                  formik.touched.addressDetails?.state &&
                    formik.errors.addressDetails?.state
                )}
                helperText={
                  formik.touched.addressDetails?.state &&
                  formik.errors.addressDetails?.state
                }
              />
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>ZipCode</FormLabel>
              <TextField
                value={formik.values.addressDetails.zipcode}
                fullWidth
                onChange={formik.handleChange}
                name="addressDetails.zipcode"
                placeholder="Eg : NY 11402"
                error={Boolean(
                  formik.touched.addressDetails?.zipcode &&
                    formik.errors.addressDetails?.zipcode
                )}
                helperText={
                  formik.touched.addressDetails?.zipcode &&
                  formik.errors.addressDetails?.zipcode
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ xs: 12 }}
        padding={1}
        spacing={2}
        direction={"column"}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"CommunityDetails"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Community Property Manager</FormLabel>

              <AppAutoComplete
                value={values.communityDetails.communityManager}
                fullWidth
                freeSolo
                placeholder="Select Community Manager"
                onChange={(event, newValue) =>
                  setFieldValue(
                    "communityDetails.communityManager",
                    newValue?.value || ""
                  )
                }
                options={[
                  { label: "Sarah Johnson", value: "SarahJohnson" },
                  { label: "Desert Eagle", value: "DesertEagle" },
                  { label: "Jacksonville", value: "Jacksonville" },
                ]}
                name="communityDetails.communityManager"
                error={Boolean(
                  touched.communityDetails?.communityManager &&
                    errors.communityDetails?.communityManager
                )}
                helperText={
                  touched.communityDetails?.communityManager &&
                  errors.communityDetails?.communityManager
                }
              />
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Contact Number</FormLabel>

              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 2 }}>
                  <Autocomplete
                    value={values.communityDetails.communityManager}
                    fullWidth
                    onChange={(event, newValue) =>
                      setFieldValue(
                        "communityDetails.communityManager",
                        newValue?.value || ""
                      )
                    }
                    options={[
                      { label: "+1", value: "SarahJohnson" },
                      { label: "91", value: "DesertEagle" },
                      { label: "+11", value: "Jacksonville" },
                    ]}
                    name="communityDetails.communityManager"
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        placeholder="+1"
                        error={Boolean(
                          touched.communityDetails?.communityManager &&
                            errors.communityDetails?.communityManager
                        )}
                        helperText={
                          touched.communityDetails?.communityManager &&
                          errors.communityDetails?.communityManager
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 10 }}>
                  <TextField
                    value={values.communityDetails.contactNumber}
                    fullWidth
                    onChange={handleChange}
                    name="communityDetails.contactNumber"
                    error={Boolean(
                      touched.communityDetails?.contactNumber &&
                        errors.communityDetails?.contactNumber
                    )}
                    helperText={
                      touched.communityDetails?.contactNumber &&
                      errors.communityDetails?.contactNumber
                    }
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Community Type</FormLabel>

              <AppAutoComplete
                value={values.communityDetails.communityType}
                fullWidth
                onChange={(event, newValue) =>
                  setFieldValue(
                    "communityDetails.communityType",
                    newValue?.value || ""
                  )
                }
                placeholder="Select Community Type"
                freeSolo
                options={[
                  { label: "CommunityType 1", value: 10 },
                  { label: "Community Type 2", value: 20 },
                  { label: "CommunityType 3", value: 30 },
                ]}
                name="communityDetails.communityType"
                error={Boolean(
                  touched.communityDetails?.communityType &&
                    errors.communityDetails?.communityType
                )}
                helperText={
                  touched.communityDetails?.communityType &&
                  errors.communityDetails?.communityType
                }
              />
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Email ID</FormLabel>

              <TextField
                value={values.communityDetails.email}
                fullWidth
                onChange={handleChange}
                name="communityDetails.email"
                placeholder="Eg : SarahJohnson@gmail.com"
                error={Boolean(
                  touched.communityDetails?.email &&
                    errors.communityDetails?.email
                )}
                helperText={
                  touched.communityDetails?.email &&
                  errors.communityDetails?.email
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ xs: 12 }}
        padding={1}
        spacing={2}
        direction={"column"}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"InsuranceDetails"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Insurance Value</FormLabel>

              <AppAutoComplete
                value={values.insuranceDetails.insuranceValue}
                fullWidth
                freeSolo
                onChange={(event, newValue) =>
                  setFieldValue(
                    "insuranceDetails.insuranceValue",
                    newValue?.value || ""
                  )
                }
                options={[
                  { label: "1,500,300", value: 15000000 },
                  { label: "3,500,000", value: 3500000 },
                  { label: "5,500,000", value: 5500000 },
                ]}
                name="insuranceDetails.insuranceValue"
                placeholder="Select Community Manager"
                error={Boolean(
                  touched.insuranceDetails?.insuranceValue &&
                    errors.insuranceDetails?.insuranceValue
                )}
                helperText={
                  touched.insuranceDetails?.insuranceValue &&
                  errors.insuranceDetails?.insuranceValue
                }
              />
            </Stack>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <FormLabel>Insurance Coverage</FormLabel>

              <TextField
                value={values.insuranceDetails.insuranceCoverage}
                placeholder="Eg : 1,00,000"
                fullWidth
                onChange={handleChange}
                name="insuranceDetails.insuranceCoverage"
                error={Boolean(
                  touched.insuranceDetails?.insuranceCoverage &&
                    errors.insuranceDetails?.insuranceCoverage
                )}
                helperText={
                  touched.insuranceDetails?.insuranceCoverage &&
                  errors.insuranceDetails?.insuranceCoverage
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default EditCommunity;
