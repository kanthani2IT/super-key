import { Fade, Modal, Paper } from '@mui/material'
import React from 'react'

const AppModal = ({ open, onClose, children, height = '70vh', width = "700px", noPadding = false }) => {
    return (
        <Modal sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
            open={open} onClose={onClose}
        // closeAfterTransition
        // disableBackdropClick={true}
        // BackdropProps={{
        //     onClick: (e) => {
        //         // Prevent closing on backdrop click
        //         e.stopPropagation();
        //     },
        // }}
        // slotProps={{
        //     backdrop: {
        //         timeout: 300,
        //     },
        // }}
        >
            <Fade in={open}>

                <Paper sx={{ width, height, px: '1%', py: '1.5%', borderRadius: '10px' }}>

                    {children}
                </Paper>
            </Fade>
        </Modal>
    )
}

export default AppModal