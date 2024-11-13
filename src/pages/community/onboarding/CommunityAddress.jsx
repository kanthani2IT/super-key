import { Grid2 as Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import AppDropDown from 'components/styledComponents/AppDropDown'
import styled from '@emotion/styled';
import mapImg from 'assets/images/icons/map.png'

export const Image = styled('img')`
  height: 20vh;
  width: 100%;
`;
export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.grey,
}));

const CommunityAddress = () => {

    const [address, setAddress] = useState({
        searchTerm: "",
        value: "",
    })
    const handleSearch = (searchTerm = '') => {
        setAddress(prevAdd => ({
            ...prevAdd,
            searchTerm
        }))
    }


    return (
        <Grid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <Grid item size={{ xs: 9 }}>
                <Image src={mapImg} alt='map' />
            </Grid>
            <Grid item size={{ xs: 9 }}>
                <Stack spacing={4}>
                    <StyledTypography variant="h4">What is the address of your Community ?</StyledTypography>
                    <AppDropDown onSearch={handleSearch} searchString={address.searchTerm} />
                </Stack>

            </Grid>
        </Grid>
    )
}

export default CommunityAddress