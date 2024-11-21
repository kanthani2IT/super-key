import React from 'react'
import { Grid2 as Grid } from '@mui/material'

const AppGrid = ({ children, ...props }) => {
    return (
        <Grid  {...props} >
            {children}
        </Grid>
    )
}

export default AppGrid