import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import AppAutoComplete from 'components/AppComponents/AppAutoComplete'
import AppGrid from 'components/AppComponents/AppGrid'
import AppLabelComponent from 'components/AppComponents/AppLabelComponent'
import AppModal from 'components/AppComponents/AppModal'
import AppRowBox from 'components/AppComponents/AppRowBox'
import AppTextField from 'components/AppComponents/AppTextField'
import { useFormik } from 'formik'
import { usePropertyManagersQuery } from 'hooks/useDropDown'
import { useState } from 'react'
import { EMAIL_VALIDATION, MOBILE_VALIDATION } from 'utils/loginUtils'
import * as Yup from "yup";

const initialValues = {
    toPropertyManager: "yes",
    propertyManager: null,
    name: null,
    email: "",
    sms: "yes",
    mobile: "",
};

const getValidationSchema = (isPropertyManagerRequired) =>
    Yup.object().shape({
        // propertyManager: isPropertyManagerRequired
        //     ? Yup.object().required("Property Manager is required")
        //     : Yup.object().nullable(),
        name: Yup.string().min(3, "Name be at least 3 characters").required("Name is required"),
        email: EMAIL_VALIDATION,
        mobile: MOBILE_VALIDATION,
    });
const CoiEmailProcess = ({ open, setOpen }) => {
    const [validationSchema, setValidationSchema] = useState(getValidationSchema(true))

    const { data: propertyManageData, isLoading } = usePropertyManagersQuery()

    const footer = () => {
        return (
            <AppRowBox justifyContent="end">
                <AppGrid item size={{ xs: 2 }}>
                    <Button
                        fullWidth
                        size="large"
                        color="info"
                        type="submit"
                        onClick={() => handleSubmit()} // Trigger Formik handleSubmit here
                        variant="contained"
                    >
                        {"Send"}
                    </Button>
                </AppGrid>
            </AppRowBox>
        );
    };

    const handleEmailModalClose = () => {
        setOpen(false);
        resetForm();
    };


    const dynamicDataUpdates = (key, value) => {

        if (key == 'toPropertyManager') {
            resetForm()
            const updatedValidationSchema = getValidationSchema(value == 'yes')
            setValidationSchema(updatedValidationSchema)
        }
        if (key == 'propertyManager') {
            setFieldValue('name', value?.username)
            setFieldValue('email', value?.email)
            setFieldValue('mobile', value?.phone)
        }

    }
    const handleBlur = (event) => {
        const { name, value } = event.target
        dynamicDataUpdates(name, value)
        setFieldValue(name, value);
    };

    const dynamicAttributes = (toPropertyManager) => {
        return {
            nameLabel: toPropertyManager == 'yes' ? 'Property Manager Name' : "Enter recipient’s Name",
            emailLabel: toPropertyManager == 'yes' ? 'Property Manager Email Id' : "Enter recipient’s email address",
            mobileLabel: toPropertyManager == 'yes' ? 'Property Manager Number' : "Contact Number",
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const { values, setFieldValue, setValues, errors, dirty, touched, resetForm, handleSubmit, handleChange } = formik


    return (
        <AppModal
            confirmModal={dirty}
            cardHeight={"50vh"}
            enableCard
            title={'Add Recipient '}
            open={open}
            onClose={handleEmailModalClose}
            footer={footer()}
        >
            <AppGrid container spacing={4} justifyContent='center'>
                <AppGrid item size={{ xs: 8 }}>

                    <AppLabelComponent label={`Do you want to send ${values?.certificate?.title} to Property Manager ?`} justifyContent={'space-between'} >
                        <RadioGroup
                            sx={{ gap: 5 }}
                            name='toPropertyManager'
                            row
                            value={values.toPropertyManager}
                            onClick={handleBlur}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color='success' />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio color='success' />}
                                label="No"
                            />
                        </RadioGroup>
                    </AppLabelComponent>

                </AppGrid>
                {values.toPropertyManager == 'yes' &&
                    <AppGrid item size={{ xs: 8 }}>
                        <AppLabelComponent label={'Select Property Manager'}  >
                            <AppAutoComplete name="propertyManager"
                                loading={isLoading}
                                options={propertyManageData?.data}
                                valueParam='userId'
                                nameParam='username'
                                value={values?.propertyManager}
                                onChange={handleBlur}
                                placeholder="Select Property Manager"
                                error={touched?.name && errors?.name}

                            />

                        </AppLabelComponent>
                    </AppGrid>}
                {!values?.propertyManager && <AppGrid size={{ xs: 8 }}>
                    <AppLabelComponent label={dynamicAttributes(values?.toPropertyManager).nameLabel}>
                        <AppTextField
                            placeholder={'Allen'}
                            required
                            fullWidth
                            name="name"
                            value={values?.name}
                            onChange={handleChange}
                            error={Boolean(touched?.name && errors?.name)}
                            helperText={touched?.name && errors?.name}
                        />
                    </AppLabelComponent>
                </AppGrid>}
                <AppGrid size={{ xs: 8 }}>
                    <AppLabelComponent label={dynamicAttributes(values?.toPropertyManager).emailLabel}>
                        <AppTextField
                            placeholder={'xxx@gmail.com'}
                            required
                            fullWidth
                            name="email"
                            value={values?.email}
                            onChange={handleChange}

                            error={Boolean(touched?.email && errors?.email)}
                            helperText={touched?.email && errors?.email}
                        />
                    </AppLabelComponent>
                </AppGrid>
                <AppGrid item size={{ xs: 8 }}>

                    <AppLabelComponent label={`Do you want to send an alert over SMS as well ?`} justifyContent={'space-between'} >
                        <RadioGroup
                            sx={{ gap: 5 }}
                            name='sms'
                            row
                            value={values.sms}
                            onClick={handleBlur}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color='success' />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio color='success' />}
                                label="No"
                            />
                        </RadioGroup>
                    </AppLabelComponent>

                </AppGrid>
                {values?.sms == 'yes' && <AppGrid size={{ xs: 8 }}>
                    <AppLabelComponent label={dynamicAttributes(values?.toPropertyManager).mobileLabel}>
                        <AppTextField
                            placeholder={'+123423355'}
                            required
                            fullWidth
                            name="mobile"
                            value={values?.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched?.mobile && errors?.mobile)}
                            helperText={touched?.mobile && errors?.mobile}
                        />
                    </AppLabelComponent>
                </AppGrid>}
            </AppGrid>
        </AppModal>
    )
}

export default CoiEmailProcess