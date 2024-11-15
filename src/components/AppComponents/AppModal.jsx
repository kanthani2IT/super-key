import { Card, CardActions, CardContent, CardHeader, Fade, Modal, Paper, Stack, Typography } from '@mui/material'
import { borderTop } from '@mui/system'
import React from 'react'

const AppModal = ({ open, onClose, children, height = '80vh', width = "700px", noPadding = false, enableCard = false, title, footer }) => {
    return (
        <Modal

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

                <Paper sx={{ width, height, px: noPadding ? '1%' : "2%", py: '1.5%', borderRadius: '10px' }}>
                    {enableCard ? <Card
                        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
                        elevation={0}
                    >
                        {title && <CardHeader
                            title={
                                <Stack alignItems={"center"}>
                                    <Typography variant="h2">
                                        {title}
                                    </Typography>
                                </Stack>
                            }
                        />}
                        <CardContent sx={{ flex: "1 0 80%", overflowY: "auto", marginBottom: 2, borderBottom: "0.5px solid #0000001a", borderTop: "0.5px solid #0000000a", borderRadius: "8px" }}>
                            {children}
                        </CardContent>
                        {footer && <CardActions xs={{ borderTop: "2px solid black" }}>
                            {footer}
                        </CardActions>}
                    </Card> :
                        children
                    }

                </Paper>
            </Fade>
        </Modal>
    )
}

export default AppModal