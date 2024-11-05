import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ExpandAltOutlined } from '@ant-design/icons';

// header style
const headerSX = {
  px: 3,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

function MainCard(
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  },
  ref
) {
  const theme = useTheme();
  boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderRadius: 2,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
        boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
        ':hover': {
          boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
        },
        p: 0,
        '& pre': {
          m: 0,
          // p: '15px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        ...sx
      }}
    >
      {title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary && <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
        <ExpandAltOutlined style={{ marginRight: 2 }} fontSize="medium" />   {secondary}
      </Typography>} />}

      {/* card content */}
      {content && <CardContent sx={{
        py: 1,
        px: 3,
        mb: 2,
        overflow: 'scroll', ...contentSX
      }}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
}

export default forwardRef(MainCard);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  subheader: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.any,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  modal: PropTypes.bool,
  others: PropTypes.any
};
