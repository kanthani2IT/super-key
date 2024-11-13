import { AddCircle } from '@mui/icons-material'
import { Button, Card, CardContent, CardHeader, Grid2, Stack, Typography } from '@mui/material'
import AppModal from 'components/styledComponents/AppModal'
import { useState } from 'react'
import CommunityAddress from './CommunityAddress'


const index = ({ title = 'Community Address' }) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }


    return (
        <Grid2 container sx={{ mt: 2 }}>
            <Grid2 item size={{ xs: 12 }} container justifyContent="space-between" alignItems="center">
                <Grid2 item>
                    <Typography>Communities</Typography>
                </Grid2>
                <Grid2 item>
                    <Button startIcon={<AddCircle />} variant="contained" onClick={handleOpen}>
                        Add Community
                    </Button>
                </Grid2>
            </Grid2>

            <AppModal open={open} onClose={handleOpen}>
                <Card elevation={0}>
                    {title && <CardHeader title={
                        <Stack flexDirection={"column"} spacing={'8px'} alignItems={"center"}>
                            <Typography variant="h2">{title}</Typography>

                        </Stack>
                    } />}
                    <CardContent>
                        <CommunityAddress />
                    </CardContent>
                </Card>

            </AppModal>

        </Grid2 >

    )
}

export default index