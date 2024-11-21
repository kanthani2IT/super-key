import { Autocomplete, Divider, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import AppGrid from 'components/AppComponents/AppGrid';
import AppLabelComponent from 'components/AppComponents/AppLabelComponent';
import { useEffect, useState } from 'react';
import { cManagers } from 'utils/constants';


const CommunityDetails = ({
    formValues,
    errors,
    touched,
    setFieldValue,
    community, handleCommunityDetails }) => {

    const { communityManager, propertyManager } = formValues

    const [values, setValues] = useState({
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
    })

    useEffect(() => {
        setValues({ communityManager, propertyManager })
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        const [id, key] = name.split('.')
        setValues(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [key]: value
            }
        }))
    }


    const handleBlur = (event) => {
        const { name, value } = event.target
        setFieldValue(name, value);
    };
    const size = { xs: 12, sm: 12, md: 6, lg: 6, xl: 6, }

    return (
        <AppGrid container spacing={4} >

            <AppGrid item container size={{ xs: 12 }} rowSpacing={3} >

                <AppGrid item container spacing={2} >

                    <AppGrid item size={{ xs: 12 }} >
                        <Typography variant="h4">Community Manager</Typography>
                    </AppGrid>
                    <AppGrid item size={size} >
                        <AppLabelComponent label={'Community Manager Name'}>

                            <Autocomplete

                                name="communityManager.name"
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
                                value={communityManager?.name || ''}
                                onChange={(event, value) => {

                                    setFieldValue("communityManager.name", value ? value.name : '');
                                }}

                                renderInput={(params) => (
                                    <TextField
                                        required
                                        {...params}
                                        placeholder="Select Manager"
                                        error={Boolean(touched.communityManager?.name && errors.communityManager?.name)}
                                        helperText={touched.communityManager?.name && errors.communityManager?.name}
                                    />
                                )}
                                fullWidth
                            />
                        </AppLabelComponent>

                    </AppGrid>
                    <AppGrid item size={size} >
                        <AppLabelComponent label={'Email'}>
                            <TextField
                                required
                                id='communityManager'
                                placeholder='communityManager@gmail.com'
                                fullWidth
                                name="communityManager.email"
                                value={values.communityManager?.email}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.communityManager?.email && errors.communityManager?.email)}
                                helperText={touched.communityManager?.email && errors.communityManager?.email}
                            />
                        </AppLabelComponent>                    </AppGrid>

                    <AppGrid item size={size} >
                        <AppLabelComponent label={'Mobile Number'}>

                            <TextField
                                placeholder='+123423355'
                                required
                                fullWidth
                                name="communityManager.mobile"
                                value={values.communityManager?.mobile}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.communityManager?.mobile && errors.communityManager?.mobile)}
                                helperText={touched.communityManager?.mobile && errors.communityManager?.mobile}
                            />
                        </AppLabelComponent>
                    </AppGrid>


                </AppGrid>
            </AppGrid>


            <AppGrid item container size={{ xs: 12 }} rowSpacing={3} >



                <AppGrid item container spacing={2} >

                    <AppGrid item size={{ xs: 12 }} >
                        <Typography variant="h4">Property Manager</Typography>
                    </AppGrid>
                    <AppGrid item size={size} >
                        <AppLabelComponent label={'Property Manager Name'}>

                            <Autocomplete
                                name="propertyManager.name"
                                options={cManagers}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.label) {
                                        return option.label;
                                    }
                                    // Regular option
                                    return option.name;
                                }}
                                value={propertyManager.name || ''} // Only use the name here
                                onChange={(event, value) => {
                                    setFieldValue("propertyManager.name", value ? value.name : '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        placeholder="Select Property Manager"
                                        error={Boolean(touched.propertyManager?.name && errors.propertyManager?.name)}
                                        helperText={touched.propertyManager?.name && errors.propertyManager?.name}
                                    />
                                )}
                                fullWidth
                            />
                        </AppLabelComponent>
                    </AppGrid>
                    <AppGrid item size={size} >
                        <AppLabelComponent label={'Email'}>
                            <TextField
                                required
                                placeholder='propertyManager@gmail.com'
                                fullWidth
                                name="propertyManager.email"
                                value={values.propertyManager.email}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.propertyManager?.email && errors.propertyManager?.email)}
                                helperText={touched.propertyManager?.email && errors.propertyManager?.email}
                            />

                        </AppLabelComponent>
                    </AppGrid>

                    <AppGrid item size={size} >
                        <AppLabelComponent label={'Mobile Number'}>
                            <TextField
                                fullWidth
                                placeholder='+14128373933'
                                required
                                name="propertyManager.mobile"
                                value={values.propertyManager.mobile}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.propertyManager?.mobile && errors.propertyManager?.mobile)}
                                helperText={touched.propertyManager?.mobile && errors.propertyManager?.mobile}
                            />
                        </AppLabelComponent>
                    </AppGrid>


                </AppGrid>

            </AppGrid>
        </AppGrid>


    )
}

export default CommunityDetails