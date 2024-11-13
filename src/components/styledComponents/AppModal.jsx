import { Modal, Paper } from '@mui/material'
import React from 'react'

const AppModal = ({ open, onClose, children }) => {
    return (
        <Modal sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} open={open} onClose={onClose}>
            <Paper sx={{ width: "695px", height: "80vh", px: '3%', py: '1.5%', borderRadius: '10px' }}>

                {children}
            </Paper>
        </Modal>
    )
}

export default AppModal