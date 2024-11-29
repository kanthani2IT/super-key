import PropTypes from 'prop-types';

// material-ui
import Stack from '@mui/material/Stack';
import Logo from 'assets/images/login/logo.png';

// project import
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    // <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
    <Stack direction="row" spacing={1} alignItems="center">
      <img src={Logo} />

    </Stack>
    // </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
