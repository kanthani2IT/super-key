import { Search } from "@mui/icons-material";
import { Button, Grid2 as Grid, InputAdornment, Typography } from "@mui/material";
import CardGrid from "components/AppComponents/AppDataCard";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import { StyledTextField } from "components/StyledComponents";
import { useState } from "react";
import { certificateData, COIData } from "utils/constants";
import CertificatesCard from "./CertificatesCard";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CoiEmailProcess from "./CoiEmailProcess";
import SuccessScreen from "pages/community/onboarding/SuccessScreen";


const initialValues = {

  toPropertyManager: 'yes',
  id: "",
  name: "",
  email: "",
  sms: 'yes',
  mobile: "",

}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string().min(10, "Mobile number must be at least 10 digits.")
    .max(15, "Mobile number cannot exceed 15 digits.")
    .required("Mobile number is required"),
})

const coiMailSteps = [
  {
    title: "Select Recipient",
    component: (props) => <CoiEmailProcess {...props} />
  },
  {
    title: "",
    component: () => <SuccessScreen title={'Email sent successfully!'} />
  }
]
let intialValues = {
  community: {},
  certificate: {},
}

const COI = () => {
  const [showCertificates, setShowCertificates] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [open, setOpen] = useState(false)
  const [coi, setCoi] = useState(intialValues)
  const finalStep =
    activeStep == coiMailSteps?.length - 1;
  const updateCoi = (key, value) => {
    setCoi({ ...coi, [key]: value })
  }
  const handleCertificates = (community) => {
    updateCoi('community', community)
    setShowCertificates(!showCertificates);
  };

  const handleEmailModal = (certificate) => {
    updateCoi('certificate', certificate)
    setOpen(true);
  }
  const handleEmailModalClose = () => {
    setOpen(false);

    resetForm();
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log({ values })
      if (values) {
        setActiveStep(1)
      }
    },
  })
  const { handleSubmit, resetForm, } = formik;

  const footer = () => {
    return (
      <AppRowBox>

        <div></div>

        <Button color="info" type="submit" onClick={() => handleSubmit()} // Trigger Formik handleSubmit here
          variant="contained" size="large">
          {"Send"}
        </Button>
      </AppRowBox>)
  }
  return (
    <Grid container spacing={5}>
      <AppRowBox >
        <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <StyledTextField fullWidth placeholder="Search COI" slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="success" />
                </InputAdornment>
              )
            }
          }} />
        </Grid>
      </AppRowBox>
      <AppRowBox>
        <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
          <AppRowBox >
            <Typography variant="h5">Communities</Typography>
            <Typography variant="body1">{COIData?.length} Communities &nbsp; |&nbsp; {COIData?.length * 10} COI  </Typography>
          </AppRowBox>
        </Grid>
      </AppRowBox>
      {!showCertificates ? <Grid item size={{ xs: 12 }}>
        <CardGrid handleClick={handleCertificates} data={COIData} />
      </Grid> :
        <Grid item size={{ xs: 12 }}>

          <CertificatesCard title={coi?.community?.title} handleEmail={handleEmailModal} handleCertificates={handleCertificates} certificateData={certificateData} />
        </Grid>}

      <AppModal height={finalStep ? "30vh" : '70vh'} enableCard={!finalStep} title={coiMailSteps[activeStep].title} open={open} onClose={handleEmailModalClose} footer={!finalStep && footer()} align={finalStep ? 'center' : ""}  >
        {coiMailSteps[activeStep].component({ formik: formik })}
      </AppModal>
    </Grid>

  );
};

export default COI;
