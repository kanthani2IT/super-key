import { Modal } from "@mui/material";
import AppModalContainer from "./AppModalContainer";
import AppStepper from "./AppStepper";

const AppModal = ({ open, onClose, children, activeStep, steps, ...props }) => {
  const stepper = () =>
    steps && <AppStepper activeStep={activeStep} steps={steps} />;

  return (
    <Modal open={open}>
      <AppModalContainer stepper={stepper} {...props} onClose={onClose}>
        {children}
      </AppModalContainer>
    </Modal>
  );
};

export default AppModal;
