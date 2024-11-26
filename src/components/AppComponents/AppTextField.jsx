import { TextField } from '@mui/material'
import React from 'react'

const AppTextField = ({ size = 'medium', props }) => {
    return (
        <TextField size={size}{...props} />
    )
}

export default AppTextField