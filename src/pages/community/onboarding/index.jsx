import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useGlobalStore } from "store/store";

import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import CircularLoader from "components/CircularLoader";
import { RadiusStyledButton } from "components/StyledComponents";
import { useFormik } from "formik";
import { useOnboardCommunity } from "hooks/useCommunity";
import React, { Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";
import { transformDocuments } from "./utils";

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
        username: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string()
          .min(10, "Mobile number must be at least 10 digits.")
          .max(15, "Mobile number cannot exceed 15 digits.")
          .required("Mobile number is required"),
      }),
      propertyManager: Yup.object().shape({
        username: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string()
          .min(10, "Mobile number must be at least 10 digits.")
          .max(15, "Mobile number cannot exceed 15 digits.")
          .required("Mobile number is required"),
      }),
    },
    height: "60vh",
  },
  {
    title: "Insurance Documentation",
    component: InsuranceUpload,
    height: "auto",
    width: "60%",
  },
  {
    title: "",
    component: ({ handleClose }) => (
      <SuccessScreen
        title="Your Community Onboarded Successfully!"
        handleClose={handleClose}
      />
    ),
    height: "100vh",
  },
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
  const finalStep = activeStep == onBoardingStepper?.length - 1;

  const multiCommunityFormik = useFormik({
    initialValues: initialBulkUploadValues,
  });

  const { values: bulkUploadValues, setFieldValue: setBulkUploadFieldValue } =
    multiCommunityFormik;

  const successHandler = () => {
    resetOnboarding();
    handleNext();
    refetch();
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
      handleCloseMultiModal();
    } else {
      handleQueryParams(multiActiveStep + 1);
      setMultiActiveStep((prevStep) => prevStep + 1);
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
    setOnboardingType(defaultValue.onboardingType);
    setActiveStep(defaultValue.activeStep);
    setMultiActiveStep(multiDefaultValue.activeStep);
    setOpenMulti(false);
  };

  const multiFooter = () => {
    return (
      <AppRowBox>
        <AppGrid item size={{ xs: 2 }}>
          <Button
            fullWidth
            color="secondary"
            onClick={handleBackMulti}
            variant="outlined"
          >
            Back
          </Button>
        </AppGrid>
        <AppGrid item size={{ xs: 2 }}>
          <Button
            fullWidth
            color="info"
            type="submit"
            onClick={handleNextMulti}
            variant="contained"
            disabled={bulkUploadValues.fileData.length === 0 ? true : false}
          >
            {multiActiveStep === 2 ? "Save" : "Next"}
          </Button>
        </AppGrid>
      </AppRowBox>
    );
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
      if (activeStep == onBoardingStepper?.length - 2) {
        const formData = new FormData();

        let payload = {
          name: values?.communityName?.name,
          contactInfo: values?.communityAddress?.label,
          propertyManagerId: values?.propertyManager?.userId,
          communityManagerId: values?.communityManager?.managerId,
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
                { bulkUploadValues, setBulkUploadFieldValue }
              )}
          </Suspense>
        </div>
      </AppModal>
    );
  };

  const renderSingleModal = () => {
    return (
      <AppModal
        height={finalStep ? "40vh" : "auto"}
        cardHeight={onBoardingStepper[activeStep]?.height || undefined}
        open={open}
        onClose={handleClose}
        enableCard={!finalStep}
        title={onBoardingStepper[activeStep]?.title}
        activeStep={activeStep}
        footer={!finalStep && footer()}
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
