import { CheckCircleTwoTone, EditNotifications, ExpandLess, ExpandMore, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Card, Fade, IconButton, Menu, MenuItem, Stack, styled, Typography } from '@mui/material';
import { fontWeight } from '@mui/system';
import Dot from 'components/@extended/Dot';
import { useState } from 'react';

const rows = [
    {
        "task": "Boiler room coverage is expiring on 25th October due to non-payment of new quotation",
        "property": "Rose Dale",
        status: 2
    },
    {
        "task": "Add coverage for 2 Assets in GRT Layout",
        "property": "GRT",
        status: 0
    },
    {
        "task": "Community has requested to review boiler plate quotation",
        "property": "ArtScape",
        status: 0
    },
    {
        "task": "Upload policy documents for recently added communities",
        "property": "",
        status: 2
    },
    {
        "task": "Add coverage for 3 Assets in GRT Layout",
        "property": "",
        status: 2
    }
]
const getStatus = (status) => {
    let color;

    switch (status) {
        case 0:
            color = 'warning';
            break;
        case 1:
            color = 'success';

            break;
        case 2:
            color = 'error';
            break;
        default:
            color = 'grey';
    }

    return color
}

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '0.625rem', // Setting border radius
    border: `0.5px solid ${theme.palette.primary.main}`, // Border style
    background: ' #FFF', // Background color
    color: theme.palette.primary.main, // Optional: text color based on theme
    padding: '8px 16px', // Optional: padding for the button
    '&:hover': {
        border: '0.5px solid #ffffff',
        color: ' #FFF',
        background: theme.palette.primary.main, // Optional: change background on hover
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {               // Target the menu's paper (content) area
        borderRadius: '8px',
        backgroundColor: theme.palette.secondary.light,  // Background color for the menu content only
        boxShadow: theme.shadows[2],                    // Subtle box shadow
    },
    color: theme.palette.secondary.main,
    boxShadow: theme.shadows[2],   // Subtle box shadow
    '& .MuiMenuItem-root': {
        fontSize: '0.875rem',
        fontWeight: '600',
        borderBottom: `1px solid ${theme.palette.common.white}`, // White divider
        '&:last-child': {
            borderBottom: 'none', // Remove divider for the last item
        },
    },
}));

export const ColorRow = ({ bgcolor, title, data, dark, main, borderRadius = '15px', status = '', property = '' }) => {
    return (
        <Card sx={{ '&.MuiPaper-root': { borderRadius, boxShadow: '0 0 !important' } }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: ' 0.5rem 0.9375rem 0.5rem 1.125rem',
                    bgcolor,
                    color: dark ? 'grey.800' : '#ffffff',
                    border: main ? '1px dashed' : '1px solid transparent'
                }}
            >
                {title && (
                    <>

                        <Typography variant="subtitle1" color="#323C4D" sx={{ flexBasis: '80%' }}>
                            {title}
                        </Typography>

                        <Box variant="h3" color="#323C4D" sx={{ flexBasis: '20%', textAlign: 'center' }}>
                            <Dot color={status} />
                        </Box>


                        <Typography variant="h3" color="#323C4D" sx={{ flexBasis: '20%', textAlign: 'center' }}>
                            {property}
                        </Typography>

                        <StyledButton size='small' variant="contained" sx={{ flexBasis: '15%' }}>
                            View Info
                        </StyledButton>

                        <IconButton sx={{ flexBasis: '5%' }}>
                            <CheckCircleTwoTone fontSize='medium' color='grey' />
                        </IconButton>

                    </>
                )}
            </Box>
        </Card >
    );
}
const TableHeader = ({ open, handleClick }) => {


    return (<Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '15px',
            p: '0.5rem 1rem',
            fontWeight: 'bold',
        }}
    >
        <Typography variant="subtitle1" color="#323C4D" sx={{ flexBasis: '80%', textAlign: 'left' }}>
        </Typography>
        <Button size='large' sx={{ flexBasis: '20%', textAlign: 'center' }} onClick={handleClick} endIcon={open ? <ExpandLess color={'secondary'} fontSize='medium' /> : <ExpandMore color={'secondary'} fontSize='medium' />} disableRipple disableElevation disableFocusRipple color="#323C4D" >
            Status
        </Button>
        <Typography variant="h6" color="#323C4D" sx={{ flexBasis: '20%', textAlign: 'center' }}>
            Property
        </Typography>
        <Box sx={{ flexBasis: '11%' }} />
        <Typography variant="h6" color="#323C4D" sx={{ flexBasis: '10%', textAlign: 'right' }}>
            Action
        </Typography>
        <Box sx={{ flexBasis: '3%' }} />

    </Box>
    )
};
const TaskTable = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <Stack sx={{ mt: 1 }}>
            <TableHeader open={open} handleClick={handleClick} handleClose={handleClose} />
            <Box sx={{ overflow: "auto", height: "15rem", p: 2 }}>
                <Stack rowGap={1.5} >

                    {rows?.map((row) => {
                        const status = getStatus(row?.status)
                        return <ColorRow
                            key={row.task}
                            title={row.task}
                            status=
                            {
                                status
                            }
                            property={row.property}
                            bgcolor={row?.status < 2 ? "grey.300" : `${status}.lighter`}
                            borderRadius={'15px'}
                        />

                    })}
                </Stack>
            </Box>
            <StyledMenu

                sx={{ borderRadius: '5px', boxShadow: "none" }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}

            >
                <MenuItem onClick={handleClose} >   <Stack direction="row" alignItems="center" spacing={1}>
                    <Dot color="error" />
                    <span>Todo</span>
                </Stack></MenuItem>
                <MenuItem onClick={handleClose}>   <Stack direction="row" alignItems="center" spacing={1}>
                    <Dot color="warning" />
                    <span>Inprogress</span>
                </Stack></MenuItem>
            </StyledMenu>
        </Stack >
    )

}

export default TaskTable