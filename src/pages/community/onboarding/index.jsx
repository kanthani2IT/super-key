import { AddCircle } from "@mui/icons-material";
import {
    Button,
    Grid2 as Grid,
    Typography
} from "@mui/material";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import { useFormik } from "formik";
import UserTable from "pages/dashboard/UserTable";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import * as Yup from 'yup';
import AddNewCommunity from "./AddNewCommunity";
import CommunityName from "./CommunituyName";
import CommunityAddress from "./CommunityAddress";
import CommunityDetails from "./CommunityDetails";
import InsuranceUpload from "./InsuranceTable";
import SuccessScreen from "./SuccessScreen";

const initialValues = {
    onBoardingType: "single",
    communityAddress: "",
    communityName: "",
    communityManager: {
        name: '',
        email: '',
        mobile: '',
        address: ""
    },
    propertyManager: {
        name: '',
        email: '',
        mobile: '',
        address: ""
    },


}


const onBoardingStepper = [
    {
        title: "Add New Community",
        component: (props) => <AddNewCommunity {...props} />,
        initialValues: {
            onBoardingType: "single"
        }
    },
    {
        title: "Community Address",
        component: (props) => <CommunityAddress {...props} />,
        initialValues: {
            communityAddress: ""
        },
        initialValidationSchema: {
            communityAddress: Yup.string().required('Community Address is required'),

        }
    },
    {
        title: "Community Name",
        component: (props) => <CommunityName {...props} />,
        initialValues: {
            communityName: ""
        },
        initialValidationSchema: {
            communityName: Yup.string().required('Community Name is required'),

        }
    },
    {
        title: "Community Details",
        component: (props) => <CommunityDetails {...props} />,
        initialValues: {
            communityManager: {
                name: '',
                email: '',
                mobile: '',
                address: ""
            },
            propertyManager: {
                name: '',
                email: '',
                mobile: '',
                address: ""
            },
        },
        initialValidationSchema: {
            communityManager: Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email format').required('Email is required'),
                mobile: Yup.string()
                    .min(10, "Mobile number must be at least 10 digits.")
                    .max(15, "Mobile number cannot exceed 15 digits.")
                    .required('Mobile number is required'),
                address: Yup.string().required('Address is required'),
            }),
            propertyManager: Yup.object().shape({
                name: Yup.string().required('Name is required'),
                email: Yup.string().email('Invalid email format').required('Email is required'),
                mobile: Yup.string()
                    .min(10, "Mobile number must be at least 10 digits.")
                    .max(15, "Mobile number cannot exceed 15 digits.")
                    .required('Mobile number is required'),
                address: Yup.string().required('Address is required'),
            }),
        },

    },
    {
        title: "Insurance Documentation",
        component: (props) => <InsuranceUpload {...props} />
    }, {
        title: "",
        component: () => <SuccessScreen />,
        initialValues: {}
    }
];
const defaultValue = {
    onBoardingType: "single",
    activeStep: 0,
    modalOpen: false
}
const CommunityOnboarding = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const currentOnboradingType = searchParams.get("type");
    const currentStep = Number(searchParams.get("cs"));
    const modalOpen = Boolean(searchParams.get("onboarding"));
    const [show, setShow] = useState("true")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [activeStep, setActiveStep] = useState(currentStep);
    const [open, setOpen] = useState(modalOpen);
    const [onBoardingType, setOnboardingType] = useState(
        currentOnboradingType || defaultValue.onBoardingType
    );
    const [validationSchema, setValidationSchema] = useState(onBoardingStepper[activeStep]?.initialValidationSchema || null);
    const [community, setCommunity] = useState({
        manager: true,
        propertyManager: true,
    })
    const finalStep =
        activeStep == onBoardingStepper?.length - 1;

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
        setValidationSchema(null)
        setCommunity({
            manager: true,
            propertyManager: true,
        })
        setShow("true")
        setSelectedFiles([])
        resetForm()
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
            setValidationSchema(onBoardingStepper[activeStep + 1]?.initialValidationSchema || null)
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            handleQueryParams(activeStep - 1);
            setValidationSchema(onBoardingStepper[activeStep - 1]?.initialValidationSchema || null)
            setActiveStep((prevStep) => prevStep - 1);

        }
    };

    const handleCommunityDetails = (key, value) => {

        const initialValidationSchema = onBoardingStepper[activeStep]?.initialValidationSchema
        setCommunity({ ...community, [key]: value === 'true' })

        if (key === 'manager') {
            setValidationSchema((prevSchema) => {
                const updatedSchema = { ...prevSchema };
                value !== 'true' ? delete updatedSchema.communityManager : updatedSchema.communityManager = initialValidationSchema.communityManager
                return updatedSchema;
            });
        }

        if (key === 'propertyManager') {
            setValidationSchema((prevSchema) => {
                const updatedSchema = { ...prevSchema };
                value !== 'true' ? delete updatedSchema.propertyManager : updatedSchema.propertyManager = initialValidationSchema.communityManager
                return updatedSchema;
            });
        }
    }



    const footer = () => {
        return (
            <AppRowBox>
                {activeStep && !finalStep ? (
                    <Button color="info" onClick={handleBack} variant="outlined" size="large">
                        Back
                    </Button>
                ) : (
                    <div></div>
                )}
                <Button color="info" type="submit" onClick={() => handleSubmit()} // Trigger Formik handleSubmit here
                    variant="contained" size="large">
                    {finalStep ? "Done" : "Next"}
                </Button>
            </AppRowBox>)
    }


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema ? Yup.object().shape(
            validationSchema
        ) : null,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleNext(values);
            setTouched({});
            console.log(values);
        }
    });
    const { values, errors, touched, setFieldValue, setValues, handleSubmit, handleChange, setTouched, setErrors, resetForm } = formik;

    return (
        <Grid container spacing={4}>
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

            <AppModal height={finalStep ? "50vh" : undefined} open={open} onClose={handleClose} enableCard={!finalStep} title={onBoardingStepper[activeStep].title} activeStep={activeStep} footer={!finalStep && footer()} steps={onBoardingStepper} align={finalStep ? 'center' : ""}>

                {onBoardingStepper[activeStep]?.component && onBoardingStepper[activeStep]?.component({
                    setOnboardingType,
                    onBoardingType,
                    formValues: values,
                    errors,
                    touched,
                    setFieldValue,
                    setValues,
                    handleChange,
                    community,
                    handleCommunityDetails,
                    setShow,
                    show,
                    setSelectedFiles,
                    selectedFiles
                })}

            </AppModal>
        </Grid >
    );
};

export default CommunityOnboarding;
