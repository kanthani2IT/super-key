import { EditFilled } from "@ant-design/icons";
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppCard from "components/AppComponents/AppCard";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import AppModal from "components/AppComponents/AppModal";
import { useFormik } from "formik";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import { useGetUserById } from "hooks/useOnboard";
import { useEffect, useState } from "react";
import { cManagers, pManagers } from "utils/constants";
import * as Yup from "yup";
import { OnBoardButton } from "../StyledComponents";
const initialValues = {
  addressDetails: {
    communityName: "",
    city: "",
    state: "",
    zipcode: "",
  },
  communityManager: {
    name: "",
    code: "",
    contactNumber: "",

    email: "",
  },
  propertyManager: {
    name: "",
    code: "",
    contactNumber: "",

    email: "",
  },
  insuranceDetails: {
    insuranceValue: "",
    insuranceCoverage: "",
  },
};
const res = [
  {
    onBoardingType: "single",
    communityAddress: {
      label:
        "Phoenix North Estates, Phoenix, AZ 85023, USAPhoenix North Estates, Phoenix, AZ 85023, USA",
      value: "AZ",
    },
    communityName: {
      label: "Naples",
    },
    communityManager: {
      name: {
        id: "jahnavi",
        name: "Jahnavi",
      },
      email: "john@gmail.com",
      mobile: "6876545689",
      address: "",
    },
    propertyManager: {
      name: {
        id: "rohan",
        name: "Rohan",
      },
      email: "kjhjk@gmail.com",
      mobile: "6876545899",
      address: "",
    },
  },
];

const initialValidationSchema = {
  addressDetails: Yup.object().shape({
    communityName: Yup.string().required("Name is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipcode: Yup.string().required("Zipcode is required"),
  }),
  communityManager: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    code: Yup.string().required("Country Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  propertyManager: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    code: Yup.string().required("Country Code is required"),
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
  const [enableEdit, setEnableEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const { data: userData, isLoading } = useGetUserById("98765432345678");
  const { data: communityManagerData } = useCommunityManagersQuery({
    search: "",
  });
  const { data: propertyManagerData } = usePropertyManagersQuery({
    search: "",
  });

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
  useEffect(() => {
    if (res?.[0]?.name?.name?.name) {
      setValues((prevValues) => ({
        ...prevValues,
        addressDetails: {
          ...prevValues.addressDetails,
          communityName: res[0].communityName.label,
        },
        communityManager: {
          ...prevValues.communityManager,
          name: res[0].name.name.name,
          email: res[0].name.email,
          contactNumber: res[0].name.mobile,
        },
        propertyManager: {
          ...prevValues.propertyManager,
          name: res[0].propertyManager.name.name,
          email: res[0].propertyManager.email,
          contactNumber: res[0].propertyManager.mobile,
        },
      }));
    }
  }, []);
  const onDiscard = () => {
    setModal(true);
  };
  const handleModal = () => {
    setModal(false);
  };

  const Footer = () => {
    return (
      <>
        <AppGrid item size={{ sx: 8 }}>
          <OnBoardButton onClick={onReset}>Off Board Community</OnBoardButton>
        </AppGrid>
        <AppGrid
          item
          size={{ sx: 4 }}
          container
          sx={{
            gap: 2,
          }}
        >
          <Button onClick={onDiscard} color="secondary" variant="outlined">
            Discard
          </Button>
          <Button
            color="info"
            type="submit"
            onClick={handleSubmit}
            variant="contained"
          >
            Save Changes
          </Button>
        </AppGrid>

        <AppModal
          open={modal}
          onclose={handleModal}
          height={"30vh"}
          align={"center"}
        >
          <Card
            sx={{
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5">
                Are you sure that you want to do discard the changes
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                onClick={handleSubmit}
                color="secondary"
                variant="outlined"
              >
                Save
              </Button>
              <Button onClick={handleModal} color="info" variant="contained">
                Yes,Discard
              </Button>
            </CardActions>
          </Card>
        </AppModal>
      </>
    );
  };
  const handleEdit = () => {
    setEnableEdit(true);
  };

  return (
    <AppCard title={"Desert Springs"} footer={<Footer />} onClose={onClose}>
      <AppGrid
        container
        size={{ xs: 12 }}
        padding={1}
        spacing={1}
        direction={"column"}
      >
        <AppGrid container sx={{ justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {"AddressDetails"}
          </Typography>

          <Button
            onClick={handleEdit}
            color="primary"
            variant="outlined"
            startIcon={<EditFilled />}
          >
            Edit Details
          </Button>
        </AppGrid>
        <AppGrid container spacing={5}>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent
                label="Community Name"
                color={"secondary"}
                variant="body2"
              >
                <TextField
                  value={formik.values.addressDetails.communityName}
                  placeholder="Eg : Desert Springs"
                  fullWidth
                  onChange={formik.handleChange}
                  disabled={!enableEdit}
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
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent
                label="City"
                color={"secondary"}
                variant="body2"
              >
                <TextField
                  value={formik.values.addressDetails.city}
                  fullWidth
                  placeholder="Eg : Flushing"
                  onChange={formik.handleChange}
                  name="addressDetails.city"
                  disabled={!enableEdit}
                  error={Boolean(
                    formik.touched.addressDetails?.city &&
                      formik.errors.addressDetails?.city
                  )}
                  helperText={
                    formik.touched.addressDetails?.city &&
                    formik.errors.addressDetails?.city
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent
                label="State"
                color={"secondary"}
                variant="body2"
              >
                <TextField
                  value={formik.values.addressDetails.state}
                  fullWidth
                  onChange={formik.handleChange}
                  name="addressDetails.state"
                  placeholder="Eg : New York"
                  disabled={!enableEdit}
                  error={Boolean(
                    formik.touched.addressDetails?.state &&
                      formik.errors.addressDetails?.state
                  )}
                  helperText={
                    formik.touched.addressDetails?.state &&
                    formik.errors.addressDetails?.state
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent
                label="Zipcode"
                color={"secondary"}
                variant="body2"
              >
                <TextField
                  value={formik.values.addressDetails.zipcode}
                  fullWidth
                  onChange={formik.handleChange}
                  name="addressDetails.zipcode"
                  placeholder="Eg : NY 11402"
                  disabled={!enableEdit}
                  error={Boolean(
                    formik.touched.addressDetails?.zipcode &&
                      formik.errors.addressDetails?.zipcode
                  )}
                  helperText={
                    formik.touched.addressDetails?.zipcode &&
                    formik.errors.addressDetails?.zipcode
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
        </AppGrid>
      </AppGrid>
      <AppGrid
        container
        size={{ xs: 12 }}
        padding={1}
        spacing={1}
        direction={"column"}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"CommunityManager"}
        </Typography>
        <AppGrid container spacing={5}>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent label={"Name"}>
                <AppAutoComplete
                  name="communityManager.name"
                  freeSolo={false}
                  fullWidth
                  onChange={setFieldValue}
                  nameParam="name"
                  disabled={!enableEdit}
                  value={values.communityManager.name || ""}
                  options={cManagers}
                  placeholder="Select Community Manager"
                  error={Boolean(
                    touched.communityManager?.name &&
                      errors.communityManager?.name
                  )}
                  helperText={
                    touched.communityManager?.name &&
                    errors.communityManager?.name
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent label={"Email"}>
                <TextField
                  value={values.communityManager.email}
                  fullWidth
                  onChange={handleChange}
                  name="communityManager.email"
                  placeholder="Eg : SarahJohnson@gmail.com"
                  disabled={!enableEdit}
                  error={Boolean(
                    touched.communityManager?.email &&
                      errors.communityManager?.email
                  )}
                  helperText={
                    touched.communityManager?.email &&
                    errors.communityManager?.email
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppGrid container spacing={2}>
                <AppGrid item size={{ xs: 12, sm: 2 }}>
                  <AppLabelComponent label={"Code"}>
                    <Autocomplete
                      value={values.communityManager.code}
                      fullWidth
                      disabled={!enableEdit}
                      onChange={(event, newValue) =>
                        setFieldValue(
                          "communityManager.code",
                          newValue?.value || ""
                        )
                      }
                      options={[
                        { label: "+1", value: "SarahJohnson" },
                        { label: "91", value: "DesertEagle" },
                        { label: "+11", value: "Jacksonville" },
                      ]}
                      name="communityManager.code"
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          placeholder="+1"
                          error={Boolean(
                            touched.communityManager?.code &&
                              errors.communityManager?.code
                          )}
                          helperText={
                            touched.communityManager?.code &&
                            errors.communityManager?.code
                          }
                        />
                      )}
                    />
                  </AppLabelComponent>
                </AppGrid>
                <AppGrid item size={{ xs: 12, sm: 10 }}>
                  <AppLabelComponent label={"Mobile Number"}>
                    <TextField
                      value={values.communityManager.contactNumber}
                      fullWidth
                      onChange={handleChange}
                      placeholder={"Eg : 124575588"}
                      name="communityManager.contactNumber"
                      disabled={!enableEdit}
                      error={Boolean(
                        touched.communityManager?.contactNumber &&
                          errors.communityManager?.contactNumber
                      )}
                      helperText={
                        touched.communityManager?.contactNumber &&
                        errors.communityManager?.contactNumber
                      }
                    />
                  </AppLabelComponent>
                </AppGrid>
              </AppGrid>
            </Stack>
          </AppGrid>
        </AppGrid>
      </AppGrid>
      <AppGrid
        container
        size={{ xs: 12 }}
        padding={1}
        // spacing={2}
        direction={"column"}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"PropertyManager"}
        </Typography>
        <AppGrid container spacing={5}>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent label={"Name"}>
                <AppAutoComplete
                  value={values.propertyManager.name || ""}
                  fullWidth
                  freeSolo={false}
                  placeholder="Select Property Manager"
                  disabled={!enableEdit}
                  nameParam="name"
                  onChange={setFieldValue}
                  options={pManagers}
                  name="propertyManager.name"
                  error={Boolean(
                    touched.propertyManager?.name &&
                      errors.propertyManager?.name
                  )}
                  helperText={
                    touched.propertyManager?.name &&
                    errors.propertyManager?.name
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent label={"Email"}>
                <TextField
                  value={values.propertyManager.email}
                  fullWidth
                  onChange={handleChange}
                  name="propertyManager.email"
                  placeholder="Eg : SarahJohnson@gmail.com"
                  disabled={!enableEdit}
                  error={Boolean(
                    touched.propertyManager?.email &&
                      errors.propertyManager?.email
                  )}
                  helperText={
                    touched.propertyManager?.email &&
                    errors.propertyManager?.email
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppGrid container spacing={2}>
                <AppGrid item size={{ xs: 12, sm: 2 }}>
                  <AppLabelComponent label={"Code"}>
                    <Autocomplete
                      value={values.propertyManager.code}
                      fullWidth
                      disabled={!enableEdit}
                      onChange={(event, newValue) =>
                        setFieldValue(
                          "propertyManager.code",
                          newValue?.value || ""
                        )
                      }
                      options={[
                        { label: "+1", value: "SarahJohnson" },
                        { label: "91", value: "DesertEagle" },
                        { label: "+11", value: "Jacksonville" },
                      ]}
                      name="propertyManager.code"
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          placeholder="+1"
                          error={Boolean(
                            touched.propertyManager?.code &&
                              errors.propertyManager?.code
                          )}
                          helperText={
                            touched.propertyManager?.code &&
                            errors.propertyManager?.code
                          }
                        />
                      )}
                    />
                  </AppLabelComponent>
                </AppGrid>
                <AppGrid item size={{ xs: 12, sm: 10 }}>
                  <AppLabelComponent label={"Mobile Number"}>
                    <TextField
                      value={values.propertyManager.contactNumber}
                      fullWidth
                      onChange={handleChange}
                      placeholder={"Eg : 124575588"}
                      name="propertyManager.contactNumber"
                      disabled={!enableEdit}
                      error={Boolean(
                        touched.propertyManager?.contactNumber &&
                          errors.propertyManager?.contactNumber
                      )}
                      helperText={
                        touched.propertyManager?.contactNumber &&
                        errors.propertyManager?.contactNumber
                      }
                    />
                  </AppLabelComponent>
                </AppGrid>
              </AppGrid>
            </Stack>
          </AppGrid>
        </AppGrid>
      </AppGrid>
      <AppGrid
        container
        size={{ xs: 12 }}
        padding={1}
        spacing={1}
        direction={"column"}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"InsuranceDetails"}
        </Typography>
        <AppGrid container spacing={5}>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent
                label="Insurance Value"
                color={"secondary"}
                variant="body2"
              >
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
                    { label: "1,500,300", value: "15000000" },
                    { label: "3,500,000", value: "3500000" },
                    { label: "5,500,000", value: "5500000" },
                  ]}
                  name="insuranceDetails.insuranceValue"
                  placeholder="Eg,1,500,300"
                  error={Boolean(
                    touched.insuranceDetails?.insuranceValue &&
                      errors.insuranceDetails?.insuranceValue
                  )}
                  helperText={
                    touched.insuranceDetails?.insuranceValue &&
                    errors.insuranceDetails?.insuranceValue
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <Stack rowGap={1}>
              <AppLabelComponent
                label="Insurance Coverage"
                color={"secondary"}
                variant="body2"
              >
                <TextField
                  value={values.insuranceDetails.insuranceCoverage}
                  placeholder="Eg : 1,00,000"
                  fullWidth
                  onChange={handleChange}
                  name="insuranceDetails.insuranceCoverage"
                  disabled={!enableEdit}
                  error={Boolean(
                    touched.insuranceDetails?.insuranceCoverage &&
                      errors.insuranceDetails?.insuranceCoverage
                  )}
                  helperText={
                    touched.insuranceDetails?.insuranceCoverage &&
                    errors.insuranceDetails?.insuranceCoverage
                  }
                />
              </AppLabelComponent>
            </Stack>
          </AppGrid>
        </AppGrid>
      </AppGrid>
    </AppCard>
  );
};

export default EditCommunity;
