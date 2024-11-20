import EmailIcon from '@mui/icons-material/Email';
import { Card, CardActions, CardHeader, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import AppToolTip from './AppToolTip';
import MailIcon from 'assets/images/icons/MailIcon';

const DataCard = ({ title, count }) => {
    const limitedString = title?.length < 20 ? title : title.substring(0, 20) + '...'
    return (
        <AppToolTip title={title}>

            <Card
                sx={{
                    borderRadius: 2,
                    maxWidth: "200px",
                    minWidth: "200px",
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: '#f5f5f5',
                    '&:hover': {
                        borderColor: 'secondary.main',
                    },
                }}
            >
                <CardHeader
                    title={
                        <Typography variant="subtitle1" noWrap >
                            {limitedString}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body1"  >
                            {count} COI
                        </Typography>
                    }
                    sx={{ paddingBottom: 1 }}
                />
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >

                    <IconButton>
                        <MailIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </AppToolTip>

    );
};

const CardGrid = ({ data }) => {

    return (
        <Grid container spacing={3}>
            {data.map((item, index) => (
                <Grid item key={index}>
                    <DataCard title={item.title} count={item.count} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardGrid;
