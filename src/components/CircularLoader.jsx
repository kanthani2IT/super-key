import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const CircularLoader = ({ color = "success" }) => {
    return (
        <Box sx={{ textAlign: "center" }}>
            <CircularProgress color={color} />
        </Box>
    )
}

export default CircularLoader