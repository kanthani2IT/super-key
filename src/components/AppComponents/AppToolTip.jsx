import { Tooltip, Zoom } from '@mui/material'
import React from 'react'

const AppToolTip = ({ title, children, placement = 'top' }) => {
    return (
        <Tooltip arrow placement={placement} TransitionComponent={Zoom} title={title}>
            {children}
        </Tooltip>
    )
}

export default AppToolTip