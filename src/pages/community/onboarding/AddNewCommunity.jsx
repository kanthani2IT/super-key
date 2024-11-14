import { FormControlLabel, Grid2 as Grid, Radio, RadioGroup, Stack } from '@mui/material'
import { StyledTypography } from 'components/StyledComponents'
import React from 'react'

const AddNewCommunity = ({ setOnboardingType, onBoardingType }) => {
    return (
        <Grid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <Grid item size={{ xs: 9 }}>
                <Stack spacing={2} alignItems={'center'}>
                    <StyledTypography variant="h4">What is the name of your community?</StyledTypography>
                    <RadioGroup
                        row
                        value={onBoardingType}
                        onChange={(event) => setOnboardingType(event.target.value)}
                    >
                        <FormControlLabel
                            value="single"
                            control={<Radio color='secondary' />}
                            label="Single Community"
                        />
                        <FormControlLabel
                            value="multiple"
                            control={<Radio color='secondary' />}
                            label="Multiple Communities"
                        />
                    </RadioGroup>

                </Stack>

            </Grid>
        </Grid>
    )
}

export default AddNewCommunity