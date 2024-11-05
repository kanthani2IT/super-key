import { CheckCircleTwoTone } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Stack, styled, Typography } from '@mui/material';
import Dot from 'components/@extended/Dot';

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
const TableHeader = () => (
    <Box
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
        <Typography variant="subtitle1" color="#323C4D" sx={{ flexBasis: '20%', textAlign: 'center' }}>
            Status
        </Typography>
        <Typography variant="subtitle1" color="#323C4D" sx={{ flexBasis: '20%', textAlign: 'center' }}>
            Property
        </Typography>
        <Box sx={{ flexBasis: '11%' }} />
        <Typography variant="subtitle1" color="#323C4D" sx={{ flexBasis: '10%', textAlign: 'right' }}>
            Action
        </Typography>
        <Box sx={{ flexBasis: '3%' }} />

    </Box>
);
const TaskTable = () => {
    return (

        <Stack spacing={2} sx={{ mt: 1 }}>
            <TableHeader />
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
        </Stack >
    )

}

export default TaskTable