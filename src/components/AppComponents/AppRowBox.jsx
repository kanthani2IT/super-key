import React from 'react';
import AppGrid from './AppGrid';

const AppRowBox = ({ justifyContent = 'space-between', width = '100%', children }) => {
    return (
        <AppGrid container
            justifyContent={justifyContent}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: width,
                padding: 2
            }}
        >
            {children}
        </AppGrid>
    );
};

export default AppRowBox;
