import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useGlobalStore } from "store/store";

import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import AppCustomButton from "components/AppComponents/Button";
import { useSnackbar } from "components/AppComponents/SnackBarProvider";
import CircularLoader from "components/CircularLoader";
import { RadiusStyledButton } from "components/StyledComponents";
import { useFormik } from "formik";
import {
  useCreateMultiCommunity,
  useOnboardCommunity,
} from "hooks/useCommunity";
import React, { Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthCookies } from "utils/cookie";
import { SEVERITY } from "utils/message";
import * as Yup from "yup";
import { transformDocuments } from "./utils";

const bulkUploadValidationSchema = Yup.object({
  editedList: Yup.array().of(
    Yup.object().shape({
      communityName: Yup.string().trim().required("Community Name is required"),
      communityEmail: Yup.string()
        .trim()
        .required("Community Email is required"),
      communityManagerName: Yup.object().required(
        "Community Manager Name is required"
      ),
      propertyManagerName: Yup.object().required(
        "Property Manager Name is required"
      ),
      address: Yup.string().trim().required("Address is required"),
    })
  ),
});

const AddNewCommunity = React.lazy(() => import("./AddNewCommunity"));
const CommunityAddress = React.lazy(() => import("./CommunityAddress"));
const CommunityDetails = React.lazy(() => import("./CommunityDetails"));
const CommunityName = React.lazy(() => import("./CommunityName"));
const InsuranceUpload = React.lazy(() => import("./InsuranceTable"));
const SuccessScreen = React.lazy(() => import("./SuccessScreen"));
const UploadCommunity = React.lazy(() => import("./UploadCommunity"));
const UploadCommunityList = React.lazy(() => import("./UploadCommunityList"));

const onBoardingStepper = [
  { title: "Add New Community", component: AddNewCommunity, height: "25vh" },
  {
    title: "Community Address",
    component: CommunityAddress,
    initialValidationSchema: {
      communityAddress: Yup.object().required("Community Address is required"),
    },
    height: "60vh",
  },
  {
    title: "Community Name",
    component: CommunityName,
    initialValidationSchema: {
      communityName: Yup.object().required("Community Name is required"),
    },
    height: "40vh",
  },
  {
    title: "Community Details",
    component: CommunityDetails,
    initialValidationSchema: {
      communityManager: Yup.object().shape({
        username: Yup.string().required("Please enter Name"),
        email: Yup.string()
          .email("Invalid Email format")
          .required("Please enter Email"),
        phone: Yup.string()
          .min(10, "Mobile number must be at least 10 digits.")
          .max(15, "Mobile number cannot exceed 15 digits.")
          .required("Please enter Mobile number"),
      }),
      propertyManager: Yup.object().shape({
        username: Yup.string().required("Please enter Name"),
        email: Yup.string()
          .email("Invalid Email format")
          .required("Please enter Email"),
        phone: Yup.string()
          .min(10, "Mobile number must be at least 10 digits.")
          .max(15, "Mobile number cannot exceed 15 digits.")
          .required("Please enter Mobile number"),
      }),
    },
    height: "60vh",
  },
  {
    title: "Insurance Documents",
    component: InsuranceUpload,
    height: "auto",
    width: "60%",
  },
  // {
  //   title: "",
  //   component: ({ handleClose }) => (
  //     <SuccessScreen
  //       title="Your Community Onboarded Successfully!"
  //       handleClose={handleClose}
  //     />
  //   ),
  //   height: "100vh",
  // },
];

const multiOnBoardingStepper = [
  { title: "Add New Community", component: AddNewCommunity, height: "25vh" },
  {
    title: "Add New Community",
    component: UploadCommunity,
    height: "60vh",
  },
  {
    title: "Add New Community",
    component: UploadCommunityList,
    height: "50vh",
    width: "90%",
  },
];

const defaultValue = {
  modalOpen: false,
  onboardingType: "single",
  activeStep: 0,
};

const multiDefaultValue = {
  modalOpen: false,
  onboardingType: "multiple",
  activeStep: 1,
};

const initialBulkUploadValues = {
  fileData: [],
  editedList: [],
  draftData: [],
  errorResponse: [],
  fileCount: { uploadDataCount: 0, draftDataCount: 0 },
  isPagination: true,
};

const OnboardingIndex = ({ refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentOnboradingType =
    searchParams.get("type") || defaultValue.onboardingType;
  const currentStep = Number(searchParams.get("cs")) || defaultValue.activeStep;
  const currentMultiStep =
    (currentOnboradingType == "multiple" && Number(searchParams.get("cs"))) ||
    multiDefaultValue.activeStep;
  const modalOpen =
    Boolean(searchParams.get("onboarding")) || defaultValue.modalOpen;
  const multiModalOpen =
    Boolean(searchParams.get("onboarding-multi")) ||
    multiDefaultValue.modalOpen;

  const { onboarding, updateOnboarding, resetOnboarding } = useGlobalStore();
  const { updateSnackbar } = useSnackbar();
  const [open, setOpen] = useState(modalOpen);
  const [openMulti, setOpenMulti] = useState(multiModalOpen);
  const [show, setShow] = useState("true");
  const [selectedFiles, setSelectedFiles] = useState([]);

  //for handling onboarding flow
  const [activeStep, setActiveStep] = useState(currentStep);
  const [multiActiveStep, setMultiActiveStep] = useState(currentMultiStep);
  const [onBoardingType, setOnboardingType] = useState(currentOnboradingType);
  const [validationSchema, setValidationSchema] = useState(
    onBoardingStepper[activeStep]?.initialValidationSchema || null
  );
  const { getCookie } = useAuthCookies();

  const cmcId = getCookie("cmcId");
  const finalStep = activeStep == onBoardingStepper?.length - 1;

  const { mutateAsync: createMultiCommunity, isLoading: saveMultiLoading } =
    useCreateMultiCommunity();

  const multiCommunityFormik = useFormik({
    initialValues: initialBulkUploadValues,
    validationSchema: bulkUploadValidationSchema,
  });

  const {
    values: bulkUploadValues,
    setFieldValue: setBulkUploadFieldValue,
    setValues: setBulkUploadValues,
    handleBlur: handleBulkUploadBlur,
    handleChange: handleBulkUploadChange,
    handleSubmit: handleBulkUploadSubmit,
    submitForm: bulkUploadFormSubmit,
    errors: bulkUploadError,
    touched: bulkUploadTouched,
    isValid: isBulkUploadValid,
  } = multiCommunityFormik;

  const successHandler = () => {
    resetOnboarding();
    handleNext();
    refetch();
    handleClose();
  };

  const handleQueryParams = (step) => {
    searchParams.set("cs", step);
    navigate({
      pathname: location.pathname,
      search: searchParams?.toString(),
    });
  };

  const handleNextMulti = () => {
    if (multiActiveStep === 2) {
      handleCreateMultiCommunity();
    } else {
      handleQueryParams(multiActiveStep + 1);
      setMultiActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleCreateMultiCommunity = async () => {
    try {
      const reqBody = bulkUploadValues.fileData.map((item) => {
        return {
          id: item?.documentId,
          name: item?.communityName,
          contactInfo: item?.address,
          propertyManagerId: item?.propertyManagerName?.userId ?? null,
          communityManagerId: item?.communityManagerName?.managerId ?? null,
          companyId: item?.communityManagerName?.managementCompanyId ?? null,
          status: "ACTIVE",
          cmcId: cmcId,
        };
      });
      const response = await createMultiCommunity(reqBody);
      if (response.status === 200) {
        const filterResponseData = response?.data?.filter((el) => !el?.created);
        if (filterResponseData?.length > 0) {
          const filterRemainingData = filterResponseData?.map((item) => {
            const findFileData = bulkUploadValues.fileData.find(
              (el) => el.documentId === item.id
            );
            return findFileData;
          });
          setBulkUploadValues((prev) => ({
            ...prev,
            fileData: filterRemainingData,
            errorResponse: response?.data,
            fileCount: {
              ...prev?.fileCount,
              uploadDataCount: filterRemainingData.length,
            },
          }));
        } else if (bulkUploadValues.draftData.length > 0) {
          const mapFileData = handleApplyAutoValidation(
            bulkUploadValues.draftData
          );
          setBulkUploadValues((prev) => ({
            ...prev,
            fileData: mapFileData,
            editedList: bulkUploadValues.draftData,
            draftData: initialBulkUploadValues.draftData,
            isPagination: false,
            fileCount: {
              draftDataCount: mapFileData.length,
              uploadDataCount: 0,
            },
          }));
        } else {
          refetch();
          updateSnackbar({
            message: "Community created successfully.",
            severity: SEVERITY.success,
          });
          handleCloseMultiModal();
        }
      } else {
        updateSnackbar({
          message: response.data.message,
          severity: SEVERITY.error,
        });
      }
    } catch (err) {
      updateSnackbar({
        message: err.message,
        severity: SEVERITY.error,
      });
    }
  };

  const handleNext = () => {
    if (activeStep == 0) {
      searchParams.set("type", onBoardingType);

      navigate({
        pathname: location.pathname,
        search: searchParams?.toString(),
      });
    }
    if (activeStep < onBoardingStepper?.length - 1) {
      handleQueryParams(activeStep + 1);
      setValidationSchema(
        onBoardingStepper[activeStep + 1]?.initialValidationSchema || null
      );
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      handleQueryParams(activeStep - 1);
      setValidationSchema(
        onBoardingStepper[activeStep - 1]?.initialValidationSchema || null
      );
      setActiveStep((prevStep) => prevStep - 1);
      updateOnboarding(values);
    }
  };

  const handleBackMulti = () => {
    if (multiActiveStep === 1) {
      setActiveStep(defaultValue.activeStep);
      setValidationSchema(null);
      navigate({
        pathname: location.pathname,
        search: `?onboarding=true&cs=0`,
      });
      setOpen(true);
      setOpenMulti(false);
    } else {
      handleQueryParams(multiActiveStep - 1);
      setMultiActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleOnboardingType = (value) => {
    setOnboardingType(value);
    setFieldValue("onBoardingType", value);
  };

  const handleClose = () => {
    setOpen(false);
    navigate({
      pathname: location.pathname,
      search: "",
    });
    setActiveStep(defaultValue.activeStep);
    setOnboardingType(defaultValue.onboardingType);

    setValidationSchema(null);
    setShow("true");
    setSelectedFiles([]);
    resetForm();
    resetOnboarding();
  };

  const handleCloseMultiModal = () => {
    navigate({
      pathname: location.pathname,
      search: "",
    });
    setValidationSchema(null);
    setBulkUploadValues(initialBulkUploadValues);
    setOnboardingType(defaultValue.onboardingType);
    setActiveStep(defaultValue.activeStep);
    setMultiActiveStep(multiDefaultValue.activeStep);
    setOpenMulti(false);
  };

  const handleApplyAutoValidation = (fileData) => {
    const mapTableData = fileData?.map((item) => {
      return {
        ...item,
        isEdit: true,
        index: fileData?.findIndex((el) => el?.documentId === item?.documentId),
      };
    });
    return mapTableData;
  };

  const multiCommunityButtonDisable = () => {
    switch (multiActiveStep) {
      case 1: {
        if (bulkUploadValues?.fileData?.length === 0) {
          return true;
        } else return false;
      }
      case 2: {
        if (
          bulkUploadValues?.fileData?.length === 0 ||
          bulkUploadValues?.editedList?.length > 0
        ) {
          return true;
        } else return false;
      }
      default:
        return false;
    }
  };

  const handleMultiCommunityContinue = () => {
    setBulkUploadFieldValue("errorResponse", []);
  };

  const multiFooter = () => {
    if (bulkUploadValues.errorResponse.length > 0) {
      return (
        <AppRowBox>
          <AppGrid item size={{ xs: 2 }}>
            <AppCustomButton
              fullWidth
              color="secondary"
              onClick={() => handleCloseMultiModal()}
              variant="outlined"
            >
              Close
            </AppCustomButton>
          </AppGrid>
          <AppGrid item size={{ xs: 2 }}>
            <AppCustomButton
              fullWidth
              color="info"
              type="submit"
              onClick={handleMultiCommunityContinue}
              variant="contained"
            >
              {"Continue"}
            </AppCustomButton>
          </AppGrid>
        </AppRowBox>
      );
    } else {
      return (
        <AppRowBox>
          <AppGrid item size={{ xs: 2 }}>
            <AppCustomButton
              fullWidth
              color="secondary"
              onClick={handleBackMulti}
              variant="outlined"
            >
              Back
            </AppCustomButton>
          </AppGrid>
          <AppGrid item size={{ xs: 2 }}>
            <AppCustomButton
              fullWidth
              color="info"
              type="submit"
              onClick={handleNextMulti}
              variant="contained"
              disabled={multiCommunityButtonDisable()}
              loading={saveMultiLoading}
            >
              {multiActiveStep === 2 ? "Save" : "Next"}
            </AppCustomButton>
          </AppGrid>
        </AppRowBox>
      );
    }
  };

  const footer = () => {
    return (
      <AppRowBox>
        <AppGrid item size={{ xs: 2 }}>
          {activeStep && !finalStep ? (
            <Button
              fullWidth
              color="secondary"
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
        </AppGrid>
        <AppGrid item size={{ xs: 2 }}>
          <Button
            fullWidth
            color="info"
            type="submit"
            onClick={() => handleSubmit()}
            variant="contained"
            disabled={
              activeStep === 4 && show == "true" && selectedFiles.length == 0
            }
          >
            {finalStep ? "Done" : "Next"}
          </Button>
        </AppGrid>
      </AppRowBox>
    );
  };
  const { mutate, isLoading: communityCreationLoading } =
    useOnboardCommunity(successHandler);

  const formik = useFormik({
    initialValues: onboarding,
    validationSchema: validationSchema
      ? Yup.object().shape(validationSchema)
      : null,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (finalStep) {
        const formData = new FormData();
        let payload = {
          name: values?.communityName?.name,
          contactInfo: values?.communityAddress?.description || "",
          propertyManagerId: values?.propertyManager?.userId,
          communityManagerId: values?.communityManager?.managerId,
          cmcId: cmcId,
          companyId: values?.communityManager?.managementCompanyId,
          documents: transformDocuments(selectedFiles),
          status: "ACTIVE",
        };
        formData.append("community", JSON.stringify(payload));
        selectedFiles.forEach((item) => formData.append("file", item.file));
        mutate(formData);
      } else {
        if (onBoardingType === "multiple") {
          searchParams.set("type", onBoardingType);
          navigate({
            pathname: location.pathname,
            search: `?onboarding-multi=true&type=${onBoardingType}&cs=${multiActiveStep}`,
          });
          setOpen(false);
          setOpenMulti(true);
        } else {
          handleNext(values);
          updateOnboarding(values);
        }
      }
      setTouched({});
    },
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    setTouched,
    resetForm,
    dirty,
  } = formik;

  const handleOpen = () => {
    setOpen(true);
    resetOnboarding();
    let queryParams = "?onboarding=true";
    if (!currentStep) {
      queryParams = "?onboarding=true&cs=0";
    }

    navigate({
      pathname: location.pathname,
      search: !open ? queryParams : "",
    });
  };

  const renderMultiModal = () => {
    return (
      <AppModal
        height={"auto"}
        cardHeight={multiOnBoardingStepper[multiActiveStep].height || undefined}
        open={openMulti}
        onClose={handleCloseMultiModal}
        enableCard={!finalStep}
        title={multiOnBoardingStepper[multiActiveStep]?.title}
        activeStep={multiActiveStep}
        footer={multiFooter()}
        steps={multiOnBoardingStepper}
        align={"center"}
        width={multiOnBoardingStepper[multiActiveStep]?.width || undefined}
      >
        <div
          style={{ pointerEvents: communityCreationLoading ? "none" : "auto" }}
        >
          <Suspense fallback={<CircularLoader />}>
            {multiOnBoardingStepper[multiActiveStep]?.component &&
              React.createElement(
                multiOnBoardingStepper[multiActiveStep]?.component,
                {
                  bulkUploadValues,
                  setBulkUploadFieldValue,
                  handleBulkUploadBlur,
                  handleBulkUploadChange,
                  handleBulkUploadSubmit,
                  bulkUploadError,
                  bulkUploadTouched,
                  isBulkUploadValid,
                  setBulkUploadValues,
                  handleApplyAutoValidation,
                  bulkUploadFormSubmit,
                }
              )}
          </Suspense>
        </div>
      </AppModal>
    );
  };

  const renderSingleModal = () => {
    return (
      <AppModal
        confirmModal={dirty || activeStep}
        cardHeight={onBoardingStepper[activeStep]?.height || undefined}
        open={open}
        onClose={handleClose}
        enableCard
        title={onBoardingStepper[activeStep]?.title}
        activeStep={activeStep}
        footer={footer()}
        steps={onBoardingStepper}
        align={finalStep ? "center" : ""}
        width={onBoardingStepper[activeStep]?.width || undefined}
      >
        <div
          style={{ pointerEvents: communityCreationLoading ? "none" : "auto" }}
        >
          <Suspense fallback={<CircularLoader />}>
            {onBoardingStepper[activeStep]?.component &&
              React.createElement(onBoardingStepper[activeStep]?.component, {
                handleOnboardingType,
                onBoardingType,
                formValues: values,
                errors,
                touched,
                setFieldValue,
                handleChange,
                setShow,
                show,
                setSelectedFiles,
                selectedFiles,
                handleClose,
              })}
          </Suspense>
        </div>
      </AppModal>
    );
  };

  const renderStepperModal = () => {
    switch (currentOnboradingType) {
      case "single":
        return renderSingleModal();
      case "multiple":
        return renderMultiModal();
      default:
        return <></>;
    }
  };

  return (
    <>
      <RadiusStyledButton
        borderRadius="10px"
        color="info"
        startIcon={<AddCircle />}
        variant="contained"
        onClick={handleOpen}
      >
        Add Community
      </RadiusStyledButton>
      {renderStepperModal()}
    </>
  );
};

export default OnboardingIndex;
