import { Tooltip, Zoom } from '@mui/material'
import React from 'react'

const AppToolTip = ({ title, children }) => {
    console.log(title)
    return (
        <Tooltip arrow placement='top' TransitionComponent={Zoom} title={title}>
            {children}
        </Tooltip>
    )
}

export default AppToolTip