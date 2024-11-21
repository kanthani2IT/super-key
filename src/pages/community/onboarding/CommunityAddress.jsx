import { Grid2 as Grid, Stack } from '@mui/material';
import mapImg from 'assets/images/icons/map.png';
import AppDropDown from 'components/AppComponents/AppDropDown';
import AppLabelComponent from 'components/AppComponents/AppLabelComponent';
import { Image, StyledTypography } from 'components/StyledComponents';
import { useState } from 'react';

const options = [
    { label: "Phoenix North Estates, Phoenix, AZ 85023, USA", value: "AZ" },
    { label: "New York, Phoenix, NY 54321, USA", value: " " },
    { label: "India, Phoenix", value: "LA" },
];

const CommunityAddress = ({ setFieldValue, formValues, touched, errors }) => {

    const [address, setAddress] = useState({
        searchTerm: null,
        value: formValues?.communityAddress || null,
    })
    const handleAddressChange = (key = 'searchTerm', value = null, reset = false) => {
        if (!reset) {
            setAddress(prevAdd => ({
                ...prevAdd,
                [key]: value
            }))
            if (key == 'value') {
                setFieldValue('communityAddress', value)
            }
        } else {
            setAddress({
                searchTerm: '',
                value: null,
            })
            setFieldValue('communityAddress', null)
        }
    }
    return (
        <Grid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <Grid item size={{ xs: 10 }}>
                <Image height={'20vh'} src={mapImg} alt='map' />
            </Grid>
            <Grid item >
                <AppLabelComponent gap={2} variant="h4" label={'What is the address of your community?'}>
                    <AppDropDown error={touched.communityAddress && errors.communityAddress} onChange={handleAddressChange} searchString={address.searchTerm} value={address.value} options={options} />
                </AppLabelComponent>


            </Grid>
        </Grid>
    )
}

export default CommunityAddress