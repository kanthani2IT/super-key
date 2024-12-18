import styled from '@emotion/styled';
import { Card, CardActions, CardHeader, Grid2 as Grid, IconButton, Stack, Typography } from '@mui/material';
import MailIcon from 'assets/images/icons/MailIcon';
import AppToolTip from './AppToolTip';
import AppRowBox from './AppRowBox';
import { ArticleOutlined } from '@mui/icons-material';
import AppGrid from './AppGrid';

const StyledDataCard = styled(Card)(({ fullWidth = false, }) => ({
    borderRadius: 5,
    maxWidth: fullWidth ? "100%" : "200px",
    minWidth: fullWidth ? "100%" : "200px",
    boxShadow: 'none',
    cursor: "pointer",
    backgroundColor: '#F0F0F2',
    '&:hover': {
        border: '0.2px solid',
        borderColor: 'divider',
    },
}))

const DataCard = ({ item, title, count, fullWidth, actionTitle, secondaryText, mail, handleClick }) => {
    const limitedString = !actionTitle ? title?.trim()?.length < 21 ? title : title.substring(0, 20) + '...' : ""
    return (
        <AppToolTip title={title ?? ""}>

            <StyledDataCard mail={mail} fullWidth={fullWidth} onClick={() => handleClick(item)}>
                {!actionTitle && <CardHeader
                    title={
                        <Stack gap={mail ? 1 : 5}>
                            <Typography variant="subtitle1" noWrap >
                                {limitedString}
                            </Typography>
                            <Typography variant="body1"  >
                                {count} {secondaryText}
                            </Typography>
                        </Stack>
                    }

                />}
                {(actionTitle || mail) && <AppRowBox>

                    {actionTitle ? <Stack direction={'coloumn'} columnGap={1} alignItems={'center'}>
                        <ArticleOutlined color='secondary' />
                        <Typography variant="h6" >
                            {title}
                        </Typography>

                    </Stack> : <div></div>}
                    {mail && <IconButton disableRipple >
                        <MailIcon />
                    </IconButton>}
                </AppRowBox>}
            </StyledDataCard>
        </AppToolTip>

    );
};

const CardGrid = ({ data, fullWidth, actionTitle, handleClick, mail = false, secondaryText = '' }) => {

    return (
        <AppGrid container spacing={2}>
            {data.map((item, index) => (
                <AppGrid size={fullWidth && { xs: 12, md: 6, lg: 6 }} item key={index}>
                    <DataCard item={item} handleClick={() => handleClick?.(item, index)} actionTitle={actionTitle} fullWidth={fullWidth} title={item.title} count={item.count} mail={mail} secondaryText={secondaryText} />
                </AppGrid>
            ))}
        </AppGrid>
    );
};

export default CardGrid;
