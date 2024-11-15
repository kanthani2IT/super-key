import { Divider, FormControlLabel, Grid2 as Grid, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import { StyledTypography } from 'components/StyledComponents'
import { Formik } from 'formik'
import React, { useState } from 'react'

const initialValues = {
    communnityManager: {
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

}


const CommunityDetails = () => {
    const [community, setCommunity] = useState({
        manager: true,
        projectManager: true,
    })
    const handleCommunityDetails = (key, value) => {
        setCommunity({ ...community, [key]: value === 'true' })
    }
    return (
        <Formik initialValues={initialValues}>

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
                        {/* <Grid item size={{ xs: 12 }}  >
                            <Stack spacing={4}>
                                <StyledTypography variant="h5">Add details about your community</StyledTypography>
                            </Stack>
                        </Grid> */}
                        <Grid item size={{ xs: 12 }} >
                            <Typography variant="h4">Add details about your Community Manager</Typography>
                        </Grid>
                        <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Community Manager Name</StyledTypography>

                                <Select fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Email</StyledTypography>

                                <TextField fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Mobile Number</StyledTypography>

                                <TextField fullWidth />
                            </Stack>

                        </Grid> <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Address</StyledTypography>

                                <TextField fullWidth />
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
                        {/* <Grid item size={{ xs: 12 }}  >
                            <Stack spacing={4}>
                                <StyledTypography variant="h4">Add details about your community</StyledTypography>
                            </Stack>
                        </Grid> */}
                        <Grid item size={{ xs: 12 }} >
                            <Typography variant="h4">Add details about your Project Manager</Typography>
                        </Grid>
                        <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Project Manager Name</StyledTypography>

                                <Select fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Email</StyledTypography>

                                <TextField fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Mobile Number</StyledTypography>

                                <TextField fullWidth />
                            </Stack>

                        </Grid> <Grid item size={{ xs: 6 }} >
                            <Stack rowGap={1}>
                                <StyledTypography variant="h5"> Address</StyledTypography>

                                <TextField fullWidth />
                            </Stack>

                        </Grid>
                    </Grid> : null}

                </Grid>
            </Grid>
        </Formik>
    )
}

export default CommunityDetails