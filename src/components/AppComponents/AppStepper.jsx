import {
  Box,
  Step,
  StepConnector,
  Stepper,
  styled,
} from "@mui/material";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    height: 9,
    border: 0,
    borderRadius: 10,
    backgroundColor: "#B0B0B0",
    width: "5vw",
  },
  "&.Mui-active, &.Mui-completed": {
    "& .MuiStepConnector-line": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

const CustomStep = styled(Step)(({ theme }) => ({
  "&:not(:last-of-type)": {
    marginRight: "2px",
  },
}));

const AppStepper = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {steps.map((_, index) => (
          <CustomStep key={index} completed={activeStep > index}>
          </CustomStep>
        ))}
      </Stepper>
    </Box>
  );
};

export default AppStepper;
