import { AddCircle } from "@mui/icons-material";
import {
    Button,
    Typography
} from "@mui/material";
import AppGrid from "components/AppComponents/AppGrid";
import AppModal from "components/AppComponents/AppModal";
import AppRowBox from "components/AppComponents/AppRowBox";
import { useFormik } from "formik";
import UserTable from "pages/dashboard/UserTable";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGlobalStore } from "store/store";
import * as Yup from 'yup';
import AddNewCommunity from "./onboarding/AddNewCommunity";
import CommunityAddress from "./onboarding/CommunityAddress";
import CommunityDetails from "./onboarding/CommunityDetails";
import CommunityName from "./onboarding/CommunityName";
import InsuranceUpload from "./onboarding/InsuranceTable";
import SuccessScreen from "./onboarding/SuccessScreen";

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
        },
        height: "25vh",
    },
    {
        title: "Community Address",
        component: (props) => <CommunityAddress {...props} />,
        initialValues: {
            communityAddress: ""
        },
        initialValidationSchema: {
            communityAddress: Yup.object().required('Community Address is required'),

        },
        height: "60vh",

    },
    {
        title: "Community Name",
        component: (props) => <CommunityName {...props} />,
        initialValues: {
            communityName: ""
        },
        initialValidationSchema: {
            communityName: Yup.object().required('Community Name is required'),

        },
        height: "40vh",

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
                name: Yup.object().required('Name is required'),
                email: Yup.string().email('Invalid email format').required('Email is required'),
                mobile: Yup.string()
                    .min(10, "Mobile number must be at least 10 digits.")
                    .max(15, "Mobile number cannot exceed 15 digits.")
                    .required('Mobile number is required'),
            }),
            propertyManager: Yup.object().shape({
                name: Yup.object().required('Name is required'),
                email: Yup.string().email('Invalid email format').required('Email is required'),
                mobile: Yup.string()
                    .min(10, "Mobile number must be at least 10 digits.")
                    .max(15, "Mobile number cannot exceed 15 digits.")
                    .required('Mobile number is required'),
            }),
        },
        height: "60vh",

    },
    {
        title: "Insurance Documentation",
        component: (props) => <InsuranceUpload {...props} />,
        height: "auto",

    }, {
        title: "",
        component: ({ handleClose }) => <SuccessScreen title={'Your Community Onboarded Successfully !'} handleClose={handleClose} />,
        initialValues: {},
        height: "auto",
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
    const { onboarding, updateOnboarding, resetOnboarding } = useGlobalStore();

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
        resetOnboarding()

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
            updateOnboarding(values);

        }
    };

    const handleOnboardingType = (value) => {
        setOnboardingType(value)
        setFieldValue('onBoardingType', value)
    }


    const footer = () => {
        return (
            <AppRowBox>
                <AppGrid item size={{ xs: 2 }} >
                    {activeStep && !finalStep ? (
                        <Button fullWidth color="secondary" onClick={handleBack} variant="outlined" >
                            Back
                        </Button>
                    ) : (
                        <div></div>
                    )}
                </AppGrid>
                <AppGrid item size={{ xs: 2 }} >

                    <Button fullWidth color="info" type="submit" onClick={() => handleSubmit()} // Trigger Formik handleSubmit here
                        variant="contained" >
                        {finalStep ? "Done" : "Next"}
                    </Button>
                </AppGrid>
            </AppRowBox >)
    }


    const formik = useFormik({
        initialValues: onboarding ?? initialValues,
        validationSchema: validationSchema ? Yup.object().shape(
            validationSchema
        ) : null,
        enableReinitialize: true,
        onSubmit: (values) => {
            updateOnboarding(values);
            handleNext(values);
            setTouched({});
        }
    });
    const { values, errors, touched, setFieldValue, setValues, handleSubmit, handleChange, setTouched, setErrors, resetForm } = formik;


    return (
        <AppGrid container spacing={4}>
            <AppGrid
                item
                size={{ xs: 12 }}
                container
                justifyContent="space-between"
                alignItems="center"
            >
                <AppGrid item>
                    <Typography variant="h4">Communities</Typography>
                </AppGrid>
                <AppGrid item>
                    <Button
                        size="large"
                        color="info"
                        startIcon={<AddCircle />}
                        variant="contained"
                        onClick={handleOpen}
                    >
                        Add Community
                    </Button>
                </AppGrid>
            </AppGrid>
            <AppGrid item size={{ xs: 12 }}>
                <UserTable height={'80vh'} />
            </AppGrid>

            <AppModal height={finalStep ? "30vh" : 'auto'} cardHeight={onBoardingStepper[activeStep].height || undefined} open={open} onClose={handleClose} enableCard={!finalStep} title={onBoardingStepper[activeStep].title} activeStep={activeStep} footer={!finalStep && footer()} steps={onBoardingStepper} align={finalStep ? 'center' : ""}>

                {onBoardingStepper[activeStep]?.component && onBoardingStepper[activeStep]?.component({
                    handleOnboardingType,
                    onBoardingType,
                    formValues: values,
                    errors,
                    touched,
                    setFieldValue,
                    setValues,
                    handleChange,
                    community,
                    setShow,
                    show,
                    setSelectedFiles,
                    selectedFiles,
                    handleClose
                })}

            </AppModal>
        </AppGrid >
    );
};

export default CommunityOnboarding;
