import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import pageNotFound from 'assets/images/icons/pageNotFound.jpg';
import { Image } from 'components/StyledComponents';
export default function PageNotFound() {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2} justifyItems={'center'} alignItems={'center'} textAlign={'center'}>
                    <Grid size={{ xs: 12 }}>
                        <Image src={pageNotFound} alt='404' />

                    </Grid>
                    <Grid size={{ xs: 12 }}>

                        <Typography variant="h6">
                            oops..!  The page you’re looking for doesn’t exist.
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}