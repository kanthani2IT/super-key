import { EditFilled } from "@ant-design/icons";
import {
  Button,
  Card,
  CardActions,
  CardContent,
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
import { RadiusStyledButton } from "pages/dashboard/TaskTable";
import { useEffect, useState } from "react";
import {
  cManagers,
  countryPhoneCodes,
  insuranceOptions,
  pManagers,
} from "utils/constants";
import * as Yup from "yup";
const initialValues = {
  addressDetails: {
    communityName: "",
    city: "",
    state: "",
    zipcode: "",
  },
  communityManager: {
    name: null,
    code: null,
    contactNumber: "",

    email: "",
  },
  propertyManager: {
    name: null,
    code: null,
    contactNumber: "",

    email: "",
  },
  insuranceDetails: {
    insuranceValue: null,
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
      zipcode: "NY 11402",
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
      code: {
        label: "355",
        name: "355",
      },
    },
    propertyManager: {
      name: {
        id: "preeti",
        name: "Preeti",
      },
      email: "kjhjk@gmail.com",
      mobile: "6876545899",
      address: "",
      code: {
        label: "+1",
        name: "+1",
      },
    },
    insuranceDetails: {
      insuranceValue: {
        id: "4000000",
        name: "400000",
      },
      insuranceCoverage: "20,000,000",
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
    name: Yup.object().required("Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    code: Yup.object().required("Country Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  propertyManager: Yup.object().shape({
    name: Yup.object().required("Name is required"),
    contactNumber: Yup.string().required("Contact Number is required"),
    code: Yup.object().required("Country Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  insuranceDetails: Yup.object().shape({
    insuranceValue: Yup.object().required("Insurance Value is required"),
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
    setTouched,
    setErrors,
  } = formik;
  const onReset = () => {
    resetForm();
    onClose();
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    const [field, subField] = name.split(".");

    setFieldValue(name, value);
  };

  useEffect(() => {
    if (res?.[0]) {
      const communityData = res[0];
      setValues((prevValues) => ({
        ...prevValues,
        addressDetails: {
          ...prevValues.addressDetails,
          communityName: communityData?.communityName?.label || "",
          city: communityData?.communityAddress?.label || "",
          state: communityData?.communityAddress?.value || "",
          zipcode: communityData?.communityAddress?.zipcode || "",
        },
        communityManager: {
          ...prevValues.communityManager,
          name: communityData.communityManager?.name || "",
          email: communityData.communityManager?.email || "",
          contactNumber: communityData?.communityManager?.mobile || "",
          code: communityData?.communityManager?.code || "",
        },
        propertyManager: {
          ...prevValues.propertyManager,
          name: communityData.propertyManager?.name || "",
          email: communityData.propertyManager?.email || "",
          contactNumber: communityData.propertyManager?.mobile || "",
          code: communityData?.propertyManager?.code || "",
        },
        insuranceDetails: {
          ...prevValues.insuranceDetails,
          insuranceValue: communityData?.insuranceDetails?.insuranceValue || "",
          insuranceCoverage:
            communityData?.insuranceDetails?.insuranceCoverage || "",
        },
      }));
    }
  }, [res]);
  const onDiscard = () => {
    setModal(true);
  };
  const handleModal = () => {
    setModal(false);
  };
  const countryCodeSize = { xs: 3, sm: 3, md: 3, lg: 2, xl: 2 };
  const mobileSize = { xs: 9, sm: 9, md: 9, lg: 4, xl: 4 };

  const Footer = () => {
    return (
      <>
        <AppGrid item size={{ sx: 8 }}>
          <RadiusStyledButton
            color="#FFFFFF"
            textColor="#E12929"
            width="227px"
            height="50px"
            borderRadius="10px"
            onClick={onReset}
            sx={{
              border: "0.5px solid #E12929",
            }}
          >
            Off Board Community
          </RadiusStyledButton>
        </AppGrid>
        <AppGrid
          item
          size={{ sx: 4 }}
          container
          sx={{
            gap: 2,
          }}
        >
          <RadiusStyledButton
            onClick={onDiscard}
            color="secondary"
            variant="outlined"
            textColor="#8c8c8c"
          >
            Discard
          </RadiusStyledButton>
          <RadiusStyledButton
            color="info"
            type="submit"
            onClick={handleSubmit}
            variant="contained"
          >
            Save Changes
          </RadiusStyledButton>
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
                Are you sure that you want to do discard the changes?
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                onClick={handleModal}
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

          <RadiusStyledButton
            onClick={handleEdit}
            variant="outlined"
            textColor="blue"
            color="white"
            startIcon={<EditFilled />}
          >
            Edit Details
          </RadiusStyledButton>
        </AppGrid>
        <AppGrid container spacing={5}>
          <AppGrid item size={{ xs: 6 }}>
            <AppLabelComponent
              label="Community Name"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values.addressDetails.communityName}
                placeholder="Eg : Desert Springs"
                fullWidth
                onChange={handleChange}
                disabled={!enableEdit}
                name="addressDetails.communityName"
                error={
                  touched.addressDetails?.communityName &&
                  errors.addressDetails?.communityName
                }
                helperText={
                  touched.addressDetails?.communityName &&
                  errors.addressDetails?.communityName
                }
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <AppLabelComponent label="City" color={"secondary"} variant="body2">
              <TextField
                value={values.addressDetails.city}
                fullWidth
                placeholder="Eg : Flushing"
                onChange={handleChange}
                name="addressDetails.city"
                disabled={!enableEdit}
                error={Boolean(
                  touched.addressDetails?.city && errors.addressDetails?.city
                )}
                helperText={
                  touched.addressDetails?.city && errors.addressDetails?.city
                }
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <AppLabelComponent
              label="State"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values.addressDetails.state}
                fullWidth
                onChange={handleChange}
                name="addressDetails.state"
                placeholder="Eg : New York"
                disabled={!enableEdit}
                error={Boolean(
                  touched.addressDetails?.state && errors.addressDetails?.state
                )}
                helperText={
                  touched.addressDetails?.state && errors.addressDetails?.state
                }
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <AppLabelComponent
              label="Zipcode"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values.addressDetails.zipcode}
                fullWidth
                onChange={handleChange}
                name="addressDetails.zipcode"
                placeholder="Eg : NY 11402"
                disabled={!enableEdit}
                error={Boolean(
                  touched.addressDetails?.zipcode &&
                    errors.addressDetails?.zipcode
                )}
                helperText={
                  touched.addressDetails?.zipcode &&
                  errors.addressDetails?.zipcode
                }
              />
            </AppLabelComponent>
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
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="communityManager.name"
                freeSolo={false}
                disabled={!enableEdit}
                error={
                  touched.communityManager?.name &&
                  errors.communityManager?.name
                }
                onChange={handleChange}
                onBlur={handleBlur}
                nameParam="name"
                searchKey="communityManager"
                value={values?.communityManager?.name || ""}
                options={cManagers}
                placeholder="Select Manager"
                // onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
            <AppLabelComponent label={"Email"}>
              <TextField
                value={values?.communityManager?.email || ""}
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
          </AppGrid>
          <AppGrid item size={{ xs: 12 }} spacing={2} container>
            <AppGrid item size={countryCodeSize}>
              <AppLabelComponent label={"Code"}>
                <AppAutoComplete
                  name="communityManager.code"
                  freeSolo={false}
                  disabled={!enableEdit}
                  error={
                    touched.communityManager?.code &&
                    errors.communityManager?.code
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  nameParam="label"
                  searchKey="communityManager"
                  value={values?.communityManager?.code || ""}
                  options={countryPhoneCodes}
                  placeholder="+1"
                  // onSearch={onSearch}
                />
              </AppLabelComponent>
            </AppGrid>
            <AppGrid item size={mobileSize}>
              <AppLabelComponent label={"Mobile Number"}>
                <TextField
                  value={values?.communityManager?.contactNumber}
                  fullWidth
                  onChange={handleChange}
                  placeholder="+123423355"
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
        </AppGrid>
      </AppGrid>
      <AppGrid container size={{ xs: 12 }} padding={1} direction={"column"}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"PropertyManager"}
        </Typography>
        <AppGrid container spacing={5}>
          <AppGrid item size={{ xs: 6 }}>
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="propertyManager.name"
                freeSolo={false}
                disabled={!enableEdit}
                error={
                  touched.propertyManager?.name && errors.propertyManager?.name
                }
                onChange={handleChange}
                onBlur={handleBlur}
                nameParam="name"
                searchKey="propertyManager"
                value={values?.propertyManager?.name || ""}
                options={pManagers}
                placeholder="Select Manager"
                // onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
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
          </AppGrid>
          <AppGrid item size={{ xs: 12 }} spacing={2} container>
            <AppGrid item size={countryCodeSize}>
              <AppLabelComponent label={"Code"}>
                <AppAutoComplete
                  name="propertyManager.code"
                  freeSolo={false}
                  disabled={!enableEdit}
                  error={
                    touched.propertyManager?.code &&
                    errors.propertyManager?.code
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  nameParam="label"
                  searchKey="propertyManager"
                  value={values?.propertyManager?.code || ""}
                  options={countryPhoneCodes}
                  placeholder="+1"
                  // onSearch={onSearch}
                />
              </AppLabelComponent>
            </AppGrid>
            <AppGrid item size={mobileSize}>
              <AppLabelComponent label={"Mobile Number"}>
                <TextField
                  value={values.propertyManager.contactNumber}
                  fullWidth
                  onChange={handleChange}
                  placeholder="+123423355"
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
            <AppLabelComponent
              label="Insurance Value"
              color={"secondary"}
              variant="body2"
            >
              <AppAutoComplete
                name="insuranceDetails.insuranceValue"
                freeSolo={false}
                disabled={!enableEdit}
                error={
                  touched.insuranceDetails?.insuranceValue &&
                  errors.insuranceDetails?.insuranceValue
                }
                onChange={handleChange}
                onBlur={handleBlur}
                nameParam="name"
                searchKey="propertyManager"
                value={values?.insuranceDetails?.insuranceValue || ""}
                options={insuranceOptions}
                placeholder="Select Insurance Value"
                // onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={{ xs: 6 }}>
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
          </AppGrid>
        </AppGrid>
      </AppGrid>
    </AppCard>
  );
};

export default EditCommunity;
