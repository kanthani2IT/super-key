import {
    Box,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    styled,
    Typography
} from '@mui/material';



const CustomConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
        height: 9,
        border: 0,
        borderRadius: 10,
        backgroundColor: '#B0B0B0',
    },
    '&.Mui-active, &.Mui-completed': {
        '& .MuiStepConnector-line': {
            backgroundColor: theme.palette.success.dark,
        },
    },
}));



const CustomStepIcon = () => null;



const AppStepper = ({ activeStep, steps }) => {

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<CustomConnector />}
            >
                {steps.map((label, index) => (
                    <Step key={index} completed={activeStep > index}>
                        <StepLabel
                            StepIconComponent={(props) => (
                                <CustomStepIcon
                                    {...props}
                                    active={activeStep === index}
                                    completed={activeStep > index}
                                />
                            )}
                        >
                            {/* <Typography variant="body2" >
                                {steps.title}
                            </Typography> */}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>


        </Box>
    );
};

export default AppStepper;