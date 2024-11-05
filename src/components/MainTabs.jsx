import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const MainTabs = ({ tabs = [], handleChange, value }) => {


    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                {tabs?.map((tab) => <Tab value={tab.value} label={tab.label} />)}
            </Tabs>
        </Box>
    );
}


export default MainTabs