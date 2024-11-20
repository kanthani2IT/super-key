import { Modal } from '@mui/material';
import AppModalContainer from './AppModalContainer';
import AppStepper from './AppStepper';


const AppModal = ({ open, onClose, children, activeStep, steps, ...props }) => {
    const stepper = () => (
        steps && <AppStepper activeStep={activeStep} steps={steps} />

    )
    console.log(props)
    return (
        <Modal

            open={open} onClose={onClose}
        >
            {/* <Fade in={open}> */}
            <AppModalContainer stepper={stepper}{...props} >
                {children}
            </AppModalContainer>


            {/* </Fade> */}
        </Modal>
    )
}

export default AppModal