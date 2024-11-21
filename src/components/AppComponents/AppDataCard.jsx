import styled from '@emotion/styled';
import { Card, CardActions, CardHeader, Grid2 as Grid, IconButton, Stack, Typography } from '@mui/material';
import MailIcon from 'assets/images/icons/MailIcon';
import AppToolTip from './AppToolTip';
import AppRowBox from './AppRowBox';
import { ArticleOutlined } from '@mui/icons-material';

const StyledDataCard = styled(Card)(({ fullWidth = false }) => ({
    borderRadius: 5,
    maxWidth: fullWidth ? "100%" : "200px",
    minWidth: fullWidth ? "100%" : "200px",
    boxShadow: 'none',
    backgroundColor: '#F0F0F2',
    '&:hover': {
        border: '0.2px solid',
        borderColor: 'divider',
    },
}))

const DataCard = ({ item, title, count, fullWidth, actionTitle, handleClick }) => {
    const limitedString = !actionTitle ? title?.length < 20 ? title : title.substring(0, 20) + '...' : ""
    return (
        <AppToolTip title={title ?? ""}>

            <StyledDataCard fullWidth={fullWidth}>
                {!actionTitle && <CardHeader
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
                />}
                <CardActions

                >
                    <AppRowBox>

                        {actionTitle ? <Stack direction={'coloumn'} columnGap={1} alignItems={'center'}>
                            <ArticleOutlined color='secondary' />
                            <Typography variant="h6" >
                                {title}
                            </Typography>

                        </Stack> : <div></div>}
                        <IconButton onClick={() => handleClick(item)} disableRipple >
                            <MailIcon />
                        </IconButton>
                    </AppRowBox>
                </CardActions>
            </StyledDataCard>
        </AppToolTip>

    );
};

const CardGrid = ({ data, fullWidth, actionTitle, handleClick }) => {

    return (
        <Grid container spacing={2}>
            {data.map((item, index) => (
                <Grid size={fullWidth && { xs: 12, md: 6, lg: 6 }} item key={index}>
                    <DataCard item={item} handleClick={() => handleClick(item, index)} actionTitle={actionTitle} fullWidth={fullWidth} title={item.title} count={item.count} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardGrid;
