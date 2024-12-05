import { Box, Stepper } from "@mui/material";
import { CustomConnector, CustomStep } from "./StyledComponent";

const AppStepper = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: "100%", mb: 2, mt: 0 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {steps.map((_, index) => (
          <CustomStep key={index} completed={activeStep > index}></CustomStep>
        ))}
      </Stepper>
    </Box>
  );
};

export default AppStepper;
