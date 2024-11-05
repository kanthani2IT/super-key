import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// project import
import getColors from 'utils/getColors';

export default function Dot({ color, size, variant, sx }) {
  const theme = useTheme();
  const colors = getColors(theme, color || 'primary');
  const { main } = colors;
  return (
    <>
      <FiberManualRecordIcon sx={{ color: main }} fontSize='small' />
    </>
  );
}

Dot.propTypes = { color: PropTypes.any, size: PropTypes.number, variant: PropTypes.string, sx: PropTypes.any };
