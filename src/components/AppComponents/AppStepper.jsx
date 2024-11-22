import {
  Box,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    height: 9,
    border: 0,
    borderRadius: 10,
    backgroundColor: "#B0B0B0",
    width: "150%",
  },
  "&.Mui-active, &.Mui-completed": {
    "& .MuiStepConnector-line": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const CustomStepIcon = () => null;

const AppStepper = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: "100%", height: "1vh" }}>
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
            ></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default AppStepper;
