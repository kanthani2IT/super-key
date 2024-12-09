import { AddCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import AppModal from 'components/AppComponents/AppModal'
import React, { useState } from 'react'

const TaskCreation = () => {
    const [modal, setModal] = useState(false)
    const handleOpen = () => {
        setModal(true)
    }
    const handleClose = () => {
        setModal(false)
    }
    return (
        <>
            <Button startIcon={<AddCircle />} size='large' color='info' variant='contained' onClick={handleOpen}>
                Create New Task
            </Button>
            <AppModal title={'Assign Task'} enableCard open={modal} onClose={handleClose}
            >

            </AppModal>
        </>
    )
}

export default TaskCreation