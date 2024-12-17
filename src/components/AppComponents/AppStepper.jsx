import { Box } from "@mui/material";
import { CustomConnector, CustomStep, Customstepper } from "./StyledComponent";

const AppStepper = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: "auto", mb: 2, mt: 1 }}>
      <Customstepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {steps.map((_, index) => (
          <CustomStep key={index} completed={activeStep > index}></CustomStep>
        ))}
      </Customstepper>
    </Box>
  );
};

export default AppStepper;
