import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import Stack from "@mui/material/Stack";
import Logo from "assets/images/login/logo.png";

// project import
import config from "config";
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
  return (
    <ButtonBase disableRipple sx={sx}>
      <Stack direction="row" spacing={1} alignItems="center">
        <img src={Logo} />
      </Stack>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
