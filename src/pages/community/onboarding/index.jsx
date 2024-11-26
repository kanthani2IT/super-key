import { AddCircle } from "@mui/icons-material";
import { Button, Grid2 as Grid } from "@mui/material";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import UserTable from "pages/dashboard/UserTable";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AddNewCommunity from "./AddNewCommunity";
import CommunityName from "./CommunituyName";
import CommunityAddress from "./CommunityAddress";
import CommunityDetails from "./CommunityDetails";
import { RadiusStyledButton, StyledButton } from "pages/dashboard/TaskTable";

const onBoardingStepper = [
  {
    title: "Add New Community",
    component: (props) => <AddNewCommunity {...props} />,
  },
  {
    title: "Community Address",
    component: (props) => <CommunityAddress {...props} />,
  },
  {
    title: "Community Name",
    component: (props) => <CommunityName {...props} />,
  },
  {
    title: "Community Details",
    component: (props) => <CommunityDetails {...props} />,
  },
];
const defaultValue = {
  onBoardingType: "single",
  activeStep: 0,
  modalOpen: false,
};
const index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentOnboradingType = searchParams.get("type");
  const currentStep = Number(searchParams.get("cs"));
  const modalOpen = Boolean(searchParams.get("onboarding"));

  const [activeStep, setActiveStep] = useState(currentStep);
  const [open, setOpen] = useState(modalOpen);
  const [onBoardingType, setOnboardingType] = useState(
    currentOnboradingType || defaultValue.onBoardingType
  );

  const nextLabel =
    activeStep == onBoardingStepper?.length - 1 ? "Done" : "Next";

  const handleOpen = () => {
    setOpen(true);

    let queryParams = "?onboarding=true";
    if (!currentStep) {
      queryParams = "?onboarding=true&cs=0";
    }
    navigate({
      pathname: location.pathname,
      search: !open ? queryParams : "",
    });
  };

  const handleClose = () => {
    setActiveStep(0);
    setOnboardingType(defaultValue.onBoardingType);
    navigate({
      pathname: location.pathname,
      search: "",
    });
    setOpen(false);
  };

  const handleQueryParams = (step) => {
    searchParams.set("cs", step);

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleNext = () => {
    if (activeStep == 0) {
      searchParams.set("type", onBoardingType);

      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
    if (activeStep < onBoardingStepper.length - 1) {
      handleQueryParams(activeStep + 1);
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      handleQueryParams(activeStep - 1);
      setActiveStep((prevStep) => prevStep - 1);
    }
  };
  const footer = () => {
    return (
      <AppRowBox>
        {activeStep ? (
          <Button
            color="info"
            onClick={handleBack}
            variant="outlined"
            size="large"
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          color="info"
          onClick={handleNext}
          variant="contained"
          size="large"
        >
          {nextLabel}
        </Button>
      </AppRowBox>
    );
  };
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selected) => {
    setSelectedRows(selected); 
  };
  return (
    <Grid container sx={{ mt: 2, backgroundColor: "#FFF" }} spacing={4}>
      <Grid item
        size={{ xs: 12 }}
        container
        justifyContent="space-between"
        alignItems="center"
      >
         <Grid item sx={{ display: 'flex', gap: 2 }}>
      <RadiusStyledButton variant="contained">
        Communities
      </RadiusStyledButton>
      <RadiusStyledButton
        color="#E9E9E9"
        height="50px"
        width="100px"
        textColor="#7B828F"
        variant="contained"
      >
        Assets
      </RadiusStyledButton>
    </Grid>
    <Grid item sx={{ display: 'flex', gap: 2 }}>
    {selectedRows.length > 0 && (
    <RadiusStyledButton
        color="#FFFFFF"
        textColor="#E12929" 
        width="227px" 
        height="50px" 
        borderRadius="10px" 
        sx={{
          border: "0.5px solid #E12929", 
        }}
      >
    Off Board Community
      </RadiusStyledButton>
       )}
          <Button
            color="info"
            startIcon={<AddCircle />}
            variant="contained"
            onClick={handleOpen}
          >
            Add Community
          </Button>
        </Grid>
      </Grid>
      <Grid item size={{ xs: 12 }}>
        <UserTable height={"80vh"} onSelectionChange={handleSelectionChange} />
      </Grid>

      <AppModal
        open={open}
        onClose={handleClose}
        enableCard
        title={onBoardingStepper[activeStep].title}
        footer={footer()}
      >
        {onBoardingStepper[activeStep].component({
          setOnboardingType,
          onBoardingType,
        })}
      </AppModal>
    </Grid>
  );
};

export default index;
