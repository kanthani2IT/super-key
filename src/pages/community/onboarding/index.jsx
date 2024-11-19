import { AddCircle, Clear } from "@mui/icons-material";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid2 as Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import AppModal from "components/AppComponents/AppModal";
import { useState } from "react";
import CommunityAddress from "./CommunityAddress";
import AppRowBox from "components/AppComponents/AppRowBox";
import AddNewCommunity from "./AddNewCommunity";
import CommunityName from "./CommunituyName";
import { useLocation, useNavigate } from "react-router";
import UserTable from "pages/dashboard/UserTable";
import ImportPolicy from "./InsuranceDocument";
import InsuranceDocuments from "./InsuranceTable";

const onBoardingStepper = [
    {
        title: "Add New Community",
        component: (props) => <InsuranceDocuments {...props} />,
    },
    {
        title: "Community Address",
        component: (props) => <CommunityAddress {...props} />,
    },
    {
        title: "Community Name",
        component: (props) => <CommunityName {...props} />,
    },
];

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
        currentOnboradingType || "single"
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
        setOnboardingType(0);

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

            <AppModal open={open} onClose={handleClose}>
                <Card
                    sx={{ display: "flex", flexDirection: "column", height: "100%" }}
                    elevation={0}
                >
                    <CardHeader
                        title={
                            <Stack alignItems={"center"}>
                                <Typography variant="h2">
                                    {onBoardingStepper[activeStep].title}
                                </Typography>
                            </Stack>
                        }
                    />
                    <CardContent sx={{ flex: "1 0 70%", overflowY: "auto" }}>
                        {onBoardingStepper[activeStep].component({
                            setOnboardingType,
                            onBoardingType,
                        })}
                    </CardContent>
                    <CardActions>
                        <AppRowBox>
                            {activeStep ? (
                                <Button onClick={handleBack} variant="outlined" size="large">
                                    Back
                                </Button>
                            ) : (
                                <div></div>
                            )}
                            <Button onClick={handleNext} variant="contained" size="large">
                                {nextLabel}
                            </Button>
                        </AppRowBox>
                    </CardActions>
                </Card>
            </AppModal>
        </Grid>
    );
};

export default index;
