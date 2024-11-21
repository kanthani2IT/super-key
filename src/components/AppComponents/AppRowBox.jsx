import React from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/system';

const AppRowBox = ({ justifyContent = 'space-between', width = '100%', children }) => {
    return (
        <Grid container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: justifyContent,
                alignItems: 'center',
                width: width,
                padding: 0.5
            }}
        >
            {children}
        </Grid>
    );
};

export default AppRowBox;
