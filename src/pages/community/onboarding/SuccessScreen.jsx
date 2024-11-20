
import { Grid2 as Grid, Stack, Typography } from '@mui/material';
import completedImg from 'assets/images/icons/completed.png';
import { Image } from 'components/StyledComponents';

const SuccessScreen = () => {
    return (
        <Grid container textAlign={'center'} justifyContent={'center'} rowSpacing={4} >
            <Grid item size={{ xs: 9 }}>
                <Image height={'90%'} width={'30%'} src={completedImg} alt='done' />
            </Grid>
            <Grid item >
                <Stack spacing={4}>
                    <Typography variant="h4">Your Community Onboarded Successfully !</Typography>
                </Stack>

            </Grid>
        </Grid>
    )
}

export default SuccessScreen