import { EditFilled } from "@ant-design/icons";
import { Box, TextField, Typography } from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppCard from "components/AppComponents/AppCard";
import ConfirmationModal from "components/AppComponents/AppConfirmationModal";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import AppRowBox from "components/AppComponents/AppRowBox";
import { useFormik } from "formik";
import {
  useDeleteCommunityById,
  useGetCommunityById,
  useUpdateCommunityById,
} from "hooks/useCommunity";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import { RadiusStyledButton } from "pages/dashboard/StyledComponent";

import { useEffect, useState } from "react";

import { countryPhoneCodes, insuranceOptions } from "utils/constants";
import { useDebounceFn } from "utils/helpers";
import * as Yup from "yup";
import { getContactInfo } from "../onboarding/utils";
const defaultCountryCode = { label: "+1", value: "+1" };

const initialValues = {
  addressDetails: {
    communityName: "",
    city: "",
    state: "",
    zipcode: "",
  },
  communityManager: {
    username: "",
    code: defaultCountryCode,
    phone: "",

    email: "",
  },
  propertyManager: {
    username: "",
    code: defaultCountryCode,
    phone: "",

    email: "",
  },
  insuranceDetails: {
    insuranceValue: null,
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
  communityManager: Yup.object().shape({
    username: Yup.string().required("Name is required"),
    phone: Yup.string().required("Contact Number is required"),
    code: Yup.object().required("Country Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  propertyManager: Yup.object().shape({
    username: Yup.string().required("Name is required"),
    phone: Yup.string().required("Contact Number is required"),
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

const EditCommunity = ({ onClose, communityData, refetch }) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [offBoard, setOffBoard] = useState(false);
  const [seachString, setSearchString] = useState({
    communityManager: "",
    propertyManager: "",
  });
  const successHandler = () => {
    refetch();
    onClose();
  };
  const {
    data: communityInfo,
    isLoading,
    isError,
  } = useGetCommunityById(communityData?.communityId);
  const { mutate: updateCommunity, isLoading: isUpdating } =
    useUpdateCommunityById(successHandler);
  const { mutate: deleteUserById } = useDeleteCommunityById();

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
      let contactInfo = getContactInfo(values?.addressDetails)
      const payload = {
        communityId: communityData?.communityId,
        name: values?.addressDetails?.communityName,
        contactInfo,
        communityManagerId: values?.communityManager?.managerId,
        companyId: values?.communityManager?.managementCompanyId,
        propertyManagerId: values?.propertyManager?.userId,
        insuredCoverage: values?.insuranceDetails?.insuranceCoverage,
        status:"ACTIVE"
      };

      updateCommunity({ id: communityData?.communityId, body: payload });
    },
  });
  console.log(communityData, "communityData");
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
  const handleManager = (event) => {
    const { name, value } = event.target;

    const [id, key] = name.split(".");
    let exitingValue = values[id];

    if (!value?.isCustom) {
      exitingValue = {
        ...exitingValue,
        ...value,
      };
      setValues((prevState) => ({
        ...prevState,
        [id]: exitingValue,
      }));

      setFieldValue(id, exitingValue);
    } else {
      handleChange(event);
    }
  };
  const onSearch = useDebounceFn((searchString, key) => {
    setSearchString((prev) => ({
      ...prev,
      [key]: searchString,
    }));
  });
  useEffect(() => {
    if (communityInfo?.data) {
      const data = communityInfo?.data;

      setValues((prevValues) => ({
        ...prevValues,
        addressDetails: {
          communityName: data?.name || "",
          city: data?.contactInfo
            ? data?.contactInfo.split(",")[1]
            : "Sacramento",
          state: data?.contactInfo
            ? data?.contactInfo.split(",")[0]
            : "California",
          zipcode: data?.contactInfo
            ? data?.contactInfo.split(",")[2]
            : "96162",
        },
        communityManager: {
          username: data?.communityManager?.username || "Henry",
          userId:data?.communityManager?.managerId,
          email: data?.communityManager?.email || "henry@gmaiol.com",
          phone: data?.communityManager?.phone || "718 222 2222",
          code: data?.communityManager?.region || defaultCountryCode,
        },
        propertyManager: {
          username: data?.propertyManager?.username || "Lucas",
          userId:data?.propertyManager?.userId,
          email: data?.propertyManager?.email || "lucas@gmail.com",
          phone: data?.propertyManager?.phone || "717 222 2222",
          code: data?.propertyManager?.region || defaultCountryCode,
        },
        insuranceDetails: {
          insuranceValue: data?.insuranceValue || "",
          insuranceCoverage: data?.insuranceCoverage || "10000000",
        },
      }));
    }
  }, [communityInfo]);

  const onDiscard = () => {
    setOffBoard(false);
    setModal(true);
  };
  const handleModal = () => {
    setModal(false);
    onClose();
  };
  const handleOffBoard = () => {
    const payload = {
      mappings: [
        {
          communityId: communityData?.communityId,
          cmcId: communityData?.communityManager?.managementCompanyId,
        },
      ],
    };
    deleteUserById({ id: communityData?.communityId, body: payload });
  };
  const countryCodeSize = { xs: 3, sm: 3, md: 3, lg: 2, xl: 2 };
  const mobileSize = { xs: 9, sm: 9, md: 9, lg: 4, xl: 4 };
  const size = { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 };

  const Footer = () => {
    return (
      <>
        <AppRowBox>
          <AppGrid item size={{ xs: 6, sx: 6, lg: 8 }}>
            <RadiusStyledButton
              color="#FFFFFF"
              textColor="#E12929"
              width="30%"
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
          {enableEdit && (
            <AppGrid item size={{ xs: 6, sx: 6, lg: 4 }}>
              <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                <RadiusStyledButton
                  onClick={onDiscard}
                  color="secondary"
                  variant="outlined"
                  textColor="#8c8c8c"
                  width="50%"
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
                  width="50%"
                  height="50px"
                  borderRadius="10px"
                >
                  Save Changes
                </RadiusStyledButton>
              </Box>
            </AppGrid>
          )}
        </AppRowBox>
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
          onConfirm={offBoard ? handleOffBoard : handleModal}
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
            {"Address Details"}
          </Typography>

          <RadiusStyledButton
            onClick={handleEdit}
            variant="outlined"
            textColor="blue"
            color="white"
            startIcon={<EditFilled />}
            width="170px"
            height="45px"
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
          {"Community Manager"}
        </Typography>
        <AppGrid container columnSpacing={5} rowSpacing={2}>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="communityManager.username"
                freeSolo={false}
                disabled={!enableEdit}
                error={
                  touched.communityManager?.username &&
                  errors.communityManager?.username
                }
                onChange={handleManager}
                // onBlur={handleBlur}
                nameParam="username"
                searchKey="communityManager"
                value={values?.communityManager?.username}
                options={communityManagerData?.data}
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
                  value={values?.communityManager?.phone}
                  fullWidth
                  onChange={handleChange}
                  placeholder="+123423355"
                  name="communityManager.phone"
                  disabled={!enableEdit}
                  error={Boolean(
                    touched.communityManager?.phone &&
                      errors.communityManager?.phone
                  )}
                  helperText={
                    touched.communityManager?.phone &&
                    errors.communityManager?.phone
                  }
                />
              </AppLabelComponent>
            </AppGrid>
          </AppGrid>
        </AppGrid>
      </AppGrid>
      <AppGrid container size={{ xs: 12 }} padding={1} direction={"column"}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {"Property Manager"}
        </Typography>
        <AppGrid container columnSpacing={5} rowSpacing={2}>
          <AppGrid item size={size}>
            <AppLabelComponent label={"Name"}>
              <AppAutoComplete
                name="propertyManager.username"
                freeSolo={false}
                disabled={!enableEdit}
                error={
                  touched.propertyManager?.username &&
                  errors.propertyManager?.username
                }
                onChange={handleManager}
                // onBlur={handleBlur}
                nameParam="username"
                valueParam="userId"
                searchKey="propertyManager"
                value={values?.propertyManager?.username}
                options={propertyManagerData?.data}
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
                  value={values?.propertyManager?.phone}
                  fullWidth
                  onChange={handleChange}
                  placeholder="+123423355"
                  name="propertyManager.phone"
                  disabled={!enableEdit}
                  error={Boolean(
                    touched.propertyManager?.phone &&
                      errors.propertyManager?.phone
                  )}
                  helperText={
                    touched.propertyManager?.phone &&
                    errors.propertyManager?.phone
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
          {"Insurance Details"}
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
