
import { CheckCircle } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import AppGrid from 'components/AppComponents/AppGrid';

const SuccessScreen = ({ title, handleClose }) => {
    return (
        <AppGrid container textAlign={'center'} alignItems={'center'} justifyContent={'center'} spacing={4} >
            <AppGrid item size={{ xs: 9 }}>
                <CheckCircle color='success' sx={{ fontSize: 100 }} />
                {/* <Image height={'90%'} width={'30%'} src={<CheckCircle />} alt='done' /> */}
            </AppGrid>
            <AppGrid item size={{ xs: 12 }} >
                <Stack spacing={4}>
                    <Typography variant="h4">{title}</Typography>

                </Stack>
            </AppGrid>
            <AppGrid item size={{ xs: 12 }}  >
                <Button variant='contained'
                    color="info"
                    size='large' onClick={handleClose}>Done</Button>
            </AppGrid>
        </AppGrid>
    )
}

export default SuccessScreen