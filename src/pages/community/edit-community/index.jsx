import { EditFilled } from "@ant-design/icons";
import { Box, Typography } from "@mui/material";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppCard from "components/AppComponents/AppCard";
import ConfirmationModal from "components/AppComponents/AppConfirmationModal";
import AppGrid from "components/AppComponents/AppGrid";
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import AppRowBox from "components/AppComponents/AppRowBox";
import { RadiusStyledButton } from "components/StyledComponents";
import { useFormik } from "formik";
import {
  useGetCommunityById,
  useOffBoardCommunity,
  useUpdateCommunityById,
} from "hooks/useCommunity";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";

import { useEffect, useState } from "react";

import AppTextField from "components/AppComponents/AppTextField";
import { countryPhoneCodes, insuranceOptions } from "utils/constants";
import { useDebounceFn } from "utils/helpers";
import * as Yup from "yup";
import { getContactInfo, removeExtraSpaces } from "../onboarding/utils";

const initialValues = {
  addressDetails: {
    communityName: "",
    city: "",
    state: "",
    zipcode: "",
  },
  communityManager: {
    username: "",
    code: "+1",
    phone: "",

    email: "",
  },
  propertyManager: {
    username: "",
    code: "+1",
    phone: "",

    email: "",
  },
  insuranceDetails: {
    premiumAmount: null,
    insuredCoverage: "",
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
    code: Yup.string().required("Country Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  propertyManager: Yup.object().shape({
    username: Yup.string().required("Name is required"),
    phone: Yup.string().required("Contact Number is required"),
    code: Yup.string().required("Country Code is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  insuranceDetails: Yup.object().shape({
    premiumAmount: Yup.object().required("Insurance Value is required"),
    insuredCoverage: Yup.string().required("Insurance Coverage is required"),
  }),
};

const EditCommunity = ({ onClose, communityData, refetch, cmcId }) => {
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
  const { data: communityInfo } = useGetCommunityById(
    communityData?.communityId
  );
  const { mutate: updateCommunity, isLoading: isUpdating } =
    useUpdateCommunityById(successHandler);

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
      let contactInfo = getContactInfo(values?.addressDetails);
      const payload = {
        communityId: communityData?.communityId,
        name: values?.addressDetails?.communityName,
        contactInfo,
        communityManagerId: values?.communityManager?.managerId,
        companyId: values?.communityManager?.managementCompanyId,
        propertyManagerId: values?.propertyManager?.userId,
        insuredCoverage: values?.insuranceDetails?.insuredCoverage,
        premiumAmount: values?.insuranceDetails?.premiumAmount.name,
        status: "ACTIVE",
      };

      updateCommunity({ id: communityData?.communityId, body: payload });
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
  } = formik;
  const onReset = () => {
    setModal(true);
    setOffBoard(true);
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };
  const onChange = (event) => {
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

    if (value) {
      value.code = value.code ?? initialValues[id].code;
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
      setFieldValue(id, initialValues[id]);
      setValues((prevState) => ({
        ...prevState,
        [id]: initialValues[id],
      }));
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
      updateCommunityFields(data);
    }
  }, [communityInfo]);
  const updateCommunityFields = (data) => {
    setValues((prevValues) => ({
      ...prevValues,
      addressDetails: {
        communityName: data?.name || "",
        city: data?.contactInfo ? data?.contactInfo.split(",")[1]?.trim() : "",
        state: data?.contactInfo ? data?.contactInfo.split(",")[0]?.trim() : "",
        zipcode: data?.contactInfo
          ? data?.contactInfo.split(",")[2]?.trim()
          : "",
      },
      communityManager: {
        username: data?.communityManager?.username,
        userId: data?.communityManager?.managerId,
        email: data?.communityManager?.email,
        phone: data?.communityManager?.phone,
        code: data?.communityManager?.region,
      },
      propertyManager: {
        username: data?.propertyManager?.username,
        userId: data?.propertyManager?.managerId,
        email: data?.propertyManager?.email,
        phone: data?.propertyManager?.phone,
        code: data?.propertyManager?.region ?? "+1",
      },
      insuranceDetails: {
        premiumAmount: data?.premiumAmount
          ? { id: data?.premiumAmount, name: data?.premiumAmount?.toString() }
          : "",
        insuredCoverage: data?.insuredCoverage || 10000000,
      },
    }));
  };
  const onDiscard = () => {
    setOffBoard(false);
    setModal(true);
  };
  const handleModal = () => {
    setModal(false);
  };
  const handleModalDiscard = () => {
    const data = communityInfo?.data;
    updateCommunityFields(data);
    setModal(false);
  };

  const { mutate } = useOffBoardCommunity();
  const handleOffBoard = () => {
    console.log("You try to off-board", communityData, communityManagerData);
    const payload = {
      mappings: [
        {
          communityId: communityData?.communityId,
          cmcId: cmcId,
        },
      ],
    };
    mutate(payload);
    setModal(false);
    successHandler();
  };

  const countryCodeSize = { xs: 3, sm: 3, md: 3, lg: 2, xl: 2 };
  const mobileSize = { xs: 8, sm: 8, md: 9, lg: 4, xl: 4 };
  const size = { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 };

  const Footer = () => {
    return (
      <>
        <AppRowBox>
          <AppGrid item size={{ xs: 5, sx: 5, lg: 8 }}>
            <RadiusStyledButton
              color="#FFFFFF"
              textColor="#E12929"
              width="auto"
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
                  height="50px"
                  width="auto"
                  borderRadius="10px"
                >
                  Discard
                </RadiusStyledButton>

                <RadiusStyledButton
                  color="info"
                  type="submit"
                  width="auto"
                  onClick={handleSubmit}
                  variant="contained"
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
          // onClose={handleModal}
          message={
            offBoard
              ? "Do you want to off-board the community?"
              : "Are you sure you want to discard the changes?"
          }
          confirmLabel={offBoard ? "Yes" : "Yes,Discard"}
          cancelLabel={"No"}
          onConfirm={offBoard ? handleOffBoard : handleModalDiscard}
          onCancel={handleModal}
        />
      </>
    );
  };
  const handleEdit = () => {
    setEnableEdit(true);
  };
  return (
    <AppCard
      title={communityInfo?.data?.name || "Company Name"}
      footer={<Footer />}
      onClose={onClose}
    >
      <AppGrid container size={{ xs: 12 }} rowSpacing={4}>
        <AppGrid
          item
          size={{ xs: 12 }}
          container
          justifyContent={"space-between"}
        >
          <Typography variant="h3">{"Address Details"}</Typography>

          <RadiusStyledButton
            onClick={handleEdit}
            variant="outlined"
            textColor="blue"
            color="white"
            startIcon={<EditFilled />}
            width="180px"
            height="45px"
            borderRadius="10px"
          >
            Edit Details
          </RadiusStyledButton>
        </AppGrid>
        {/* Community Manager */}

        <AppGrid container columnSpacing={4} rowSpacing={2}>
          <AppGrid item size={size}>
            <AppLabelComponent
              label="Community Name"
              color={"secondary"}
              variant="body2"
            >
              <AppTextField
                value={removeExtraSpaces(values?.addressDetails?.communityName)}
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
              <AppTextField
                value={removeExtraSpaces(values?.addressDetails?.city)}
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
              <AppTextField
                value={removeExtraSpaces(values?.addressDetails?.state)}
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
              <AppTextField
                value={removeExtraSpaces(values?.addressDetails?.zipcode)}
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
        <AppGrid container size={{ xs: 12 }} spacing={1}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {"Community Manager"}
            </Typography>
          </AppGrid>
          <AppGrid
            item
            container
            size={{ xs: 12 }}
            columnSpacing={4}
            rowSpacing={2}
          >
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
                <AppTextField
                  inputProps={{ readOnly: true }}
                  value={values?.communityManager?.email || ""}
                  fullWidth
                  onChange={handleChange}
                  name="communityManager.email"
                  placeholder="communitymanager@gmail.com"
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
            <AppGrid item size={{ xs: 12 }} container spacing={2}>
              <AppGrid item size={countryCodeSize}>
                <AppLabelComponent label={"Code"}>
                  <AppAutoComplete
                    readOnly
                    name="communityManager.code"
                    freeSolo={false}
                    disabled={!enableEdit}
                    error={
                      touched.communityManager?.code &&
                      errors.communityManager?.code
                    }
                    onChange={onChange}
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
                  <AppTextField
                    inputProps={{ readOnly: true }}
                    value={values?.communityManager?.phone}
                    fullWidth
                    onChange={handleChange}
                    placeholder="14123423355"
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
        {/* Property Manager */}

        <AppGrid item container size={{ xs: 12 }} rowSpacing={3}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h3">{"Property Manager"}</Typography>
          </AppGrid>
          <AppGrid
            item
            size={{ xs: 12 }}
            container
            columnSpacing={4}
            rowSpacing={2}
          >
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
                <AppTextField
                  inputProps={{ readOnly: true }}
                  value={values?.propertyManager?.email}
                  fullWidth
                  onChange={handleChange}
                  name="propertyManager.email"
                  placeholder="propertymanager@gmail.com"
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
                    readOnly
                    name="propertyManager.code"
                    freeSolo={false}
                    disabled={!enableEdit}
                    error={
                      touched.propertyManager?.code &&
                      errors.propertyManager?.code
                    }
                    onChange={onChange}
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
                  <AppTextField
                    inputProps={{ readOnly: true }}
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
        {/* Insurance Details */}
        <AppGrid item container size={{ xs: 12 }} spacing={1}>
          <AppGrid item size={{ xs: 12 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {"Insurance Details"}
            </Typography>
          </AppGrid>
          <AppGrid
            item
            size={{ xs: 12 }}
            container
            columnSpacing={4}
            rowSpacing={2}
          >
            <AppGrid item size={size}>
              <AppLabelComponent
                label="Insurance Premium"
                color={"secondary"}
                variant="body2"
              >
                <AppAutoComplete
                  name="insuranceDetails.premiumAmount"
                  freeSolo={false}
                  disabled={!enableEdit}
                  error={
                    touched.insuranceDetails?.premiumAmount &&
                    errors.insuranceDetails?.premiumAmount
                  }
                  onChange={onChange}
                  onBlur={handleBlur}
                  nameParam="name"
                  value={values?.insuranceDetails?.premiumAmount || null}
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
                <AppTextField
                  value={values?.insuranceDetails?.insuredCoverage}
                  placeholder="Eg : 1,00,000"
                  fullWidth
                  onChange={handleChange}
                  name="insuranceDetails.insuredCoverage"
                  disabled={!enableEdit}
                  error={Boolean(
                    touched.insuranceDetails?.insuredCoverage &&
                    errors.insuranceDetails?.insuredCoverage
                  )}
                  helperText={
                    touched.insuranceDetails?.insuredCoverage &&
                    errors.insuranceDetails?.insuredCoverage
                  }
                />
              </AppLabelComponent>
            </AppGrid>
          </AppGrid>
        </AppGrid>
      </AppGrid>
    </AppCard>
  );
};

export default EditCommunity;
