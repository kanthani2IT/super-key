import PropTypes from 'prop-types';

// material-ui
import Stack from '@mui/material/Stack';
import Logo from 'assets/images/login/logo.png';

// project import
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <Stack sx={sx} direction="row" spacing={1} alignItems="center">
      <img src={Logo} />
    </Stack>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
