import React from 'react';
import { Box } from '@mui/material';

const AppRowBox = ({ justifyContent = 'space-between', width = '100%', children }) => {
    return (
        <Box
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
        </Box>
    );
};

export default AppRowBox;
