import { TextField } from '@mui/material'
import React from 'react'

const AppTextField = ({ size = 'small', placeholder = '', name = '', onChange, value = '', onBlur, error, helperText, ...props }) => {
    return (
        <TextField placeholder={placeholder} size={size} name={name} onChange={onChange} value={value} onBlur={onBlur} error={error} helperText={helperText} {...props} />
    )
}

export default AppTextField