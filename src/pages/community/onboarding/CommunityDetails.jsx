import { Autocomplete, Divider, FormControlLabel, Grid2 as Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { StyledTypography } from 'components/StyledComponents';
import { useEffect, useState } from 'react';
import { cManagers } from 'utils/constants';


const CommunityDetails = ({
    formValues,
    errors,
    touched,
    setFieldValue,
    community, handleCommunityDetails }) => {

    const { communityManager, projectManager } = formValues

    const [values, setValues] = useState({
        communityManager: {
            name: '',
            email: '',
            mobile: '',
            address: ""
        },
        projectManager: {
            name: '',
            email: '',
            mobile: '',
            address: ""
        },
    })

    useEffect(() => {
        setValues({ communityManager, projectManager })
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


    return (
        <Grid container spacing={4} >

            <Grid item container size={{ xs: 12 }} rowSpacing={3} >
                <Grid item size={{ xs: 12 }} >
                    <Stack spacing={2} justifyContent={'space-between'}>
                        <StyledTypography variant="h5">Do you have the Community Manager in your community?</StyledTypography>
                        <RadioGroup
                            row

                            sx={{ gap: 5 }}
                            name='manager'
                            value={community.manager}
                            onChange={(event, value) => handleCommunityDetails(event.target.name, value)}
                        >
                            <FormControlLabel
                                value={'true'}
                                control={<Radio color='success' />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value={'false'}
                                control={<Radio color='success' />}
                                label="No"
                            />
                        </RadioGroup>

                    </Stack>

                </Grid>
                {community.manager ? <Grid item container spacing={2} >

                    <Grid item size={{ xs: 12 }} >
                        <Typography variant="h4">Add details about your Community Manager</Typography>
                    </Grid>
                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5"> Community Manager Name</StyledTypography>

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
                        </Stack>
                    </Grid>
                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5">Email</StyledTypography>
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
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5">Mobile Number</StyledTypography>
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
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5">Address</StyledTypography>
                            <TextField
                                required
                                fullWidth
                                placeholder='Los angels'
                                multiline
                                name="communityManager.address"
                                value={values.communityManager.address}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.communityManager?.address && errors.communityManager?.address)}
                                helperText={touched.communityManager?.address && errors.communityManager?.address}
                            />
                        </Stack>
                    </Grid>
                </Grid> : null}
            </Grid>
            <Grid size={{ xs: 12 }}>

                <Divider sx={{ color: "GrayText" }} />
            </Grid>

            <Grid item container size={{ xs: 12 }} rowSpacing={3} >

                <Grid item size={{ xs: 12 }} >
                    <Stack spacing={2} justifyContent={'space-between'}>
                        <StyledTypography variant="h5">Do you have the Project Manager in your community?</StyledTypography>
                        <RadioGroup
                            row

                            sx={{ gap: 5 }}
                            name='projectManager'
                            value={community.projectManager}
                            onChange={(event, value) => handleCommunityDetails(event.target.name, value)}
                        >
                            <FormControlLabel
                                value={'true'}
                                control={<Radio color='success' />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value={'false'}
                                control={<Radio color='success' />}
                                label="No"
                            />
                        </RadioGroup>

                    </Stack>

                </Grid>

                {community.projectManager ? <Grid item container spacing={2} >

                    <Grid item size={{ xs: 12 }} >
                        <Typography variant="h4">Add details about your Project Manager</Typography>
                    </Grid>
                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5"> Project Manager Name</StyledTypography>

                            <Autocomplete
                                name="projectManager.name"
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
                                value={projectManager.name || ''} // Only use the name here
                                onChange={(event, value) => {
                                    setFieldValue("projectManager.name", value ? value.name : '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        placeholder="Select Project Manager"
                                        error={Boolean(touched.projectManager?.name && errors.projectManager?.name)}
                                        helperText={touched.projectManager?.name && errors.projectManager?.name}
                                    />
                                )}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5">Email</StyledTypography>
                            <TextField
                                required
                                placeholder='projectManager@gmail.com'
                                fullWidth
                                name="projectManager.email"
                                value={values.projectManager.email}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.projectManager?.email && errors.projectManager?.email)}
                                helperText={touched.projectManager?.email && errors.projectManager?.email}
                            />
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5">Mobile Number</StyledTypography>
                            <TextField
                                fullWidth
                                placeholder='+14128373933'
                                required
                                name="projectManager.mobile"
                                value={values.projectManager.mobile}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.projectManager?.mobile && errors.projectManager?.mobile)}
                                helperText={touched.projectManager?.mobile && errors.projectManager?.mobile}
                            />
                        </Stack>
                    </Grid>

                    <Grid item size={{ xs: 6 }} >
                        <Stack rowGap={1}>
                            <StyledTypography variant="h5">Address</StyledTypography>
                            <TextField
                                fullWidth
                                placeholder='New Jersey'
                                required
                                name="projectManager.address"
                                value={values.projectManager.address}
                                onChange={(event) => handleChange(event)}
                                onBlur={handleBlur}
                                error={Boolean(touched.projectManager?.address && errors.projectManager?.address)}
                                helperText={touched.projectManager?.address && errors.projectManager?.address}
                                multiline
                            />
                        </Stack>
                    </Grid>
                </Grid> : null}

            </Grid>
        </Grid>


    )
}

export default CommunityDetails