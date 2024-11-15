import { AddCircle } from "@mui/icons-material";
import {
    Button,
    Grid2 as Grid,
    Typography
} from "@mui/material";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import UserTable from "pages/dashboard/UserTable";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AddNewCommunity from "./AddNewCommunity";
import CommunityName from "./CommunituyName";
import CommunityAddress from "./CommunityAddress";
import CommunityDetails from "./CommunityDetails";

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
    modalOpen: false
}
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
                    <Button color="info" onClick={handleBack} variant="outlined" size="large">
                        Back
                    </Button>
                ) : (
                    <div></div>
                )}
                <Button color="info" onClick={handleNext} variant="contained" size="large">
                    {nextLabel}
                </Button>
            </AppRowBox>)
    }
    return (
        <Grid container sx={{ mt: 2 }} spacing={4}>
            <Grid
                item
                size={{ xs: 12 }}
                container
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h4">Communities</Typography>
                </Grid>
                <Grid item>
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
                <UserTable height={'80vh'} />
            </Grid>

            <AppModal open={open} onClose={handleClose} enableCard title={onBoardingStepper[activeStep].title} footer={footer()}>

                {onBoardingStepper[activeStep].component({
                    setOnboardingType,
                    onBoardingType,
                })}

            </AppModal>
        </Grid >
    );
};

export default index;
