import { Stack, Typography } from '@mui/material'
import React from 'react'

const NoDataMessage = ({ title = "No Data Found" }) => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            height="100%"
            spacing={2}
            sx={{ textAlign: "center", color: "text.secondary" }}
        >
            <Typography variant="h6">{title}</Typography>
            {/* <Typography variant="body2">
                There are no tasks to display. Try adjusting your filters or check back later.
            </Typography> */}
        </Stack >
    )
}

export default NoDataMessage