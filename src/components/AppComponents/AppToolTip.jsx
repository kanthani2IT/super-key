import { Tooltip, Zoom } from '@mui/material'

const AppToolTip = ({ title, children, arrow = true, placement = 'top', }) => {
    return (
        <Tooltip arrow={arrow} placement={placement} TransitionComponent={Zoom} title={title}>
            {children}
        </Tooltip>
    )
}

export default AppToolTip

