import { Autocomplete, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import AppGrid from 'components/AppComponents/AppGrid'
import AppLabelComponent from 'components/AppComponents/AppLabelComponent'
import { useState } from 'react'
import { cManagers } from 'utils/constants'

const initialValues = {
    propertyManager: null,
    name: "",
    email: "",
    mobile: "",
}
const CoiEmailProcess = ({ formik }) => {
    const { values, setFieldValue, errors, touched, resetForm } = formik
    const [mailDetails, setMailDetails] = useState({
        toPropertyManager: values?.toPropertyManager,
        propertyManager: values?.id ? {
            id: values?.id,
            name: values?.name,
        } : null,
        name: values.name,
        email: values.email,
        sms: values.sms,
        mobile: values.mobile,
    })

    const updateEmailDetails = (key, value) => {
        setMailDetails((preDetails) => ({
            ...preDetails,
            [key]: value
        }))
    }
    const dynamicDataUpdates = (key, value) => {
        if (key == 'toPropertyManager') {
            setMailDetails((preDetails) => ({
                ...preDetails,
                ...initialValues
            }))
            resetForm()


        }

    }
    const handleMailDetails = (event) => {
        const { name, value } = event.target
        updateEmailDetails(name, value)
    }

    const handleBlur = (event) => {
        const { name, value } = event.target
        dynamicDataUpdates(name, value)
        setFieldValue(name, value);

    };

    const dynamicAttributes = (toPropertyManager) => {
        return {
            emailLabel: toPropertyManager == 'yes' ? 'Property Manager Email Id' : "Enter recipient’s email address",
            mobileLabel: toPropertyManager == 'yes' ? 'Property Manager Number' : "Contact Number",

        }
    }
    return (
        <AppGrid container spacing={4}  >
            <AppGrid item size={{ xs: 12 }}>

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
            {values.toPropertyManager == 'yes' && <AppGrid item size={{ xs: 8 }}>
                <AppLabelComponent label={'Select Property Manager'} justifyContent={'space-between'} >
                    <Autocomplete

                        name="propertyManager"
                        options={cManagers}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.label) {
                                return option.label;
                            }
                            return option.name;
                        }}
                        value={mailDetails?.propertyManager || ''}
                        onChange={(event, value) => {
                            updateEmailDetails("propertyManager", value ? value : '');
                            setFieldValue('name', value ? value.name : '');
                            setFieldValue('id', value ? value.id : '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                required
                                {...params}
                                placeholder="Select Property Manager"
                                error={Boolean(touched?.name && errors?.name)}
                                helperText={touched?.name && errors?.name}
                            />
                        )}
                        fullWidth
                    />
                </AppLabelComponent>
            </AppGrid>}

            <AppGrid size={{ xs: 8 }}>
                <AppLabelComponent label={dynamicAttributes(values?.toPropertyManager).emailLabel}>
                    <TextField
                        placeholder={'xxx@gmail.com'}
                        required
                        fullWidth
                        name="email"
                        value={mailDetails?.email}
                        onChange={handleMailDetails}
                        onBlur={handleBlur}
                        error={Boolean(touched?.email && errors?.email)}
                        helperText={touched?.email && errors?.email}
                    />
                </AppLabelComponent>
            </AppGrid>
            <AppGrid item size={{ xs: 12 }}>

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
                    <TextField
                        placeholder={'+123423355'}
                        required
                        fullWidth
                        name="mobile"
                        value={mailDetails?.mobile}
                        onChange={handleMailDetails}
                        onBlur={handleBlur}
                        error={Boolean(touched?.mobile && errors?.mobile)}
                        helperText={touched?.mobile && errors?.mobile}
                    />
                </AppLabelComponent>
            </AppGrid>}
        </AppGrid>
    )
}

export default CoiEmailProcess