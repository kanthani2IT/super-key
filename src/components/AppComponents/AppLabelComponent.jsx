import { Stack } from '@mui/material'
import { StyledTypography } from 'components/StyledComponents'
import React from 'react'

const AppLabelComponent = ({ label, color, variant = 'h5', justifyContent, align, gap = 1, children }) => {
    return (
        <Stack rowGap={gap} justifyContent={justifyContent} alignItems={align}>
            <StyledTypography color={color} variant={variant}> {label}</StyledTypography>
            {children}
        </Stack>
    )
}

export default AppLabelComponent