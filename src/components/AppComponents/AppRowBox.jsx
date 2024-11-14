import React from 'react';
import { Box } from '@mui/material';

const AppRowBox = ({ justifyContent = 'space-between', children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: justifyContent,
                alignItems: 'center',
                width: '100%',

            }}
        >
            {children}
        </Box>
    );
};

export default AppRowBox;
