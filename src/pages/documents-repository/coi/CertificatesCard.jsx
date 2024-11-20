import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material'
import CardGrid from 'components/AppComponents/AppDataCard'
import AppModalContainer from 'components/AppComponents/AppModalContainer'
import AppRowBox from 'components/AppComponents/AppRowBox'
import React from 'react'


const header = (title, onClick, certificates) => {
    return (
        <AppRowBox >
            <Stack alignItems={'baseLine'} direction={'row'} rowGap={2}>

                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">&nbsp; {certificates} COI  </Typography>
            </Stack>
            <Button onClick={() => onClick()} disableTouchRipple variant="text" size="small" color="secondary">Close </Button>
        </AppRowBox>)
}

const CertificatesCard = ({ title, certificateData, handleCertificates, handleEmail }) => {


    return (
        <AppModalContainer enableCard height='auto' width={'100%'}
            header={header(title, handleCertificates, certificateData?.length)} padding='1%'>
            <Grid container rowSpacing={2}>
                <Grid item size={{ xs: 12 }}>
                    <Typography variant="h5">Certificates</Typography>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                    <CardGrid handleClick={handleEmail} fullWidth data={certificateData} actionTitle />
                </Grid>
            </Grid>
        </AppModalContainer>
    )
}

export default CertificatesCard