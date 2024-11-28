import { EditFilled } from "@ant-design/icons";
import { TextField, Typography } from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppCard from "components/AppComponents/AppCard";
import ConfirmationModal from "components/AppComponents/AppConfirmationModal";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import { useFormik } from "formik";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import {
  useDeleteUserById,
  useGetUserById,
  useUpdateUserById,
} from "hooks/useOnboard";
import { RadiusStyledButton } from "pages/dashboard/StyledComponent";

import { useEffect, useState } from "react";

import {
  countryPhoneCodes,
  insuranceOptions,
  pManagers,
} from "utils/constants";
import { useDebounceFn } from "utils/helpers";
import * as Yup from "yup";
const defaultCountryCode = { label: "+1", value: "+1" };

const initialValues = {
  addressDetails: {
    communityName: "",
    city: "",
    state: "",
    zipcode: "",
  },
  communityManager: {
    name: null,
    code: defaultCountryCode,
    contactNumber: "",

    email: "",
  },
  propertyManager: {
    name: null,
    code: defaultCountryCode,
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
    communityId: "345679056",
    name: "Carson City",
    contactInfo: "string",
    state: "California",
    city: "Sacramento",
    zipcode: "96162",
    communityManager: {
      managerId: "string",
      name: "Henry",
      email: "henry@gmaiol.com",
      phone: "718 222 2222",
      region: defaultCountryCode,
      managementCompanyId: "234567890",
    },
    propertyManager: {
      managerId: "234567890",
      name: "Lucas",
      email: "lucas@gmail.com",
      phone: "717 222 2222",
      region: defaultCountryCode,
      managementCompanyId: "123456789",
    },
    insuranceValue: { id: "5000000", name: "500000" },
    insuranceCoverage: "5000000",
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
  const [offBoard, setOffBoard] = useState(false);
  const [seachString, setSearchString] = useState({
    communityManager: "",
    propertyManager: "",
  });
  const userId = "87654321234567";
  const { data: userData, isLoading, isError } = useGetUserById(userId);
  const { mutate: updateUserById, isLoading: isUpdating } = useUpdateUserById();
  const { mutate: deleteUserById } = useDeleteUserById();

  const { data: communityManagerData } = useCommunityManagersQuery(
    seachString.communityManager
  );
  const { data: propertyManagerData } = usePropertyManagersQuery(
    seachString.propertyManager
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(initialValidationSchema),
    onSubmit: (values) => {
      const payload = {
        communityId: "",
        name: values?.addressDetails?.communityName,
        contactInfo: "",
        communityManager: {
          managerId: "string",
          name: values?.communityManager?.name?.name,
          email: values?.communityManager?.email,
          phone: values?.communityManager?.contactNumber,
          region: values?.communityManager?.code,
          managementCompanyId: "string",
        },
        propertyManager: {
          managerId: "string",
          name: values?.propertyManager?.name,
          email: values?.propertyManager?.email,
          phone: values?.propertyManager?.contactNumber,
          region: values?.propertyManager?.code,
          managementCompanyId: "string",
        },
      };
      {
        console.log(payload, "payload");
      }
      updateUserById({ id: userId, body: payload });
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
    setModal(true);
    setOffBoard(true);
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    const [id, key] = name.split(".");

    setValues((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [key]: value,
      },
    }));
  };

  const onSearch = useDebounceFn((searchString, key) => {
    setSearchString((prev) => ({
      ...prev,
      [key]: searchString,
    }));
  });

  useEffect(() => {
    if (res?.[0]) {
      const communityData = res[0];
      setValues((prevValues) => ({
        ...prevValues,
        addressDetails: {
          ...prevValues.addressDetails,
          communityName: communityData?.name || "",

          city: communityData?.city || "",
          state: communityData?.state || "",
          zipcode: communityData?.zipcode || "",
        },
        communityManager: {
          ...prevValues.communityManager,
          name: {
            id: communityData?.communityManager?.managerId,
            name: communityData?.communityManager?.name,
          },
          email: communityData?.communityManager?.email || "",
          contactNumber: communityData?.communityManager?.phone || "",
          code: communityData?.communityManager?.region || "",
        },
        propertyManager: {
          ...prevValues.propertyManager,
          name: {
            id: communityData?.propertyManager?.managerId,
            name: communityData?.propertyManager?.name,
          },
          email: communityData?.propertyManager?.email || "",
          contactNumber: communityData?.propertyManager?.phone || "",
          code: communityData?.propertyManager?.region || "",
        },
        insuranceDetails: {
          ...prevValues.insuranceDetails,
          insuranceValue: communityData?.insuranceValue || "",
          insuranceCoverage: communityData?.insuranceCoverage || "",
        },
      }));
    }
  }, [res]);
  const onDiscard = () => {
    setOffBoard(false);
    setModal(true);
  };
  const handleModal = () => {
    setModal(false);
  };
  const handleOffBoard = () => {
    const userId = "98765432345";
    const payload = {
      mappings: [
        {
          communityId: "567890987",
          cmcId: "34567890",
        },
      ],
    };
    deleteUserById({ id: userId, body: payload });
  };
  const countryCodeSize = { xs: 3, sm: 3, md: 3, lg: 2, xl: 2 };
  const mobileSize = { xs: 9, sm: 9, md: 9, lg: 4, xl: 4 };
  const size = { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 };
  const communityManagerOptions = communityManagerData?.data;
  const Footer = () => {
    return (
      <>
        <AppGrid item size={{ sx: 12, lg: 8 }}>
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
          size={{ sx: 12, lg: 4 }}
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
            width="140px"
            height="50px"
            borderRadius="10px"
          >
            Discard
          </RadiusStyledButton>
          <RadiusStyledButton
            color="info"
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            width="181px"
            height="50px"
            borderRadius="10px"
          >
            Save Changes
          </RadiusStyledButton>
        </AppGrid>

        <ConfirmationModal
          open={modal}
          onClose={handleModal}
          message={
            offBoard
              ? "Do you want to off-board the community?"
              : "Are you sure you want to discard the changes?"
          }
          confirmLabel={offBoard ? "Yes" : "Save"}
          cancelLabel={offBoard ? "No" : "Yes, Discard"}
          onConfirm={handleOffBoard}
          onCancel={handleModal}
        />
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
            width="181px"
            height="50px"
            borderRadius="10px"
          >
            Edit Details
          </RadiusStyledButton>
        </AppGrid>
        <AppGrid container columnSpacing={5} rowSpacing={2}>
          <AppGrid item size={size}>
            <AppLabelComponent
              label="Community Name"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values?.addressDetails?.communityName}
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
          <AppGrid item size={size}>
            <AppLabelComponent label="City" color={"secondary"} variant="body2">
              <TextField
                value={values?.addressDetails?.city}
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
          <AppGrid item size={size}>
            <AppLabelComponent
              label="State"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values?.addressDetails?.state}
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
          <AppGrid item size={size}>
            <AppLabelComponent
              label="Zipcode"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values?.addressDetails?.zipcode}
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
        <AppGrid container columnSpacing={5} rowSpacing={2}>
          <AppGrid item size={size}>
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
                options={communityManagerOptions || []}
                valueParam="managerId"
                placeholder="Select Manager"
                onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
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
                  disableClearable
                  nameParam="label"
                  searchKey="communityManager"
                  value={values?.communityManager?.code || ""}
                  options={countryPhoneCodes}
                  placeholder="+1"
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
        <AppGrid container columnSpacing={5} rowSpacing={2}>
          <AppGrid item size={size}>
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
                onSearch={onSearch}
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Email"}>
              <TextField
                value={values?.propertyManager?.email}
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
                  disableClearable
                  searchKey="propertyManager"
                  value={values?.propertyManager?.code || ""}
                  options={countryPhoneCodes}
                  placeholder="+1"
                />
              </AppLabelComponent>
            </AppGrid>
            <AppGrid item size={mobileSize}>
              <AppLabelComponent label={"Mobile Number"}>
                <TextField
                  value={values?.propertyManager?.contactNumber}
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
        <AppGrid container columnSpacing={5} rowSpacing={2}>
          <AppGrid item size={size}>
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
              />
            </AppLabelComponent>
          </AppGrid>
          <AppGrid item size={size}>
            <AppLabelComponent
              label="Insurance Coverage"
              color={"secondary"}
              variant="body2"
            >
              <TextField
                value={values?.insuranceDetails?.insuranceCoverage}
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
