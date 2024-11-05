// material-ui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

// project import
import MobileSection from './MobileSection';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';

// project import
import { SettingOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: 'transparent' }}
        aria-label="open profile"
        aria-haspopup="true"
      >
        <SettingOutlined />
      </IconButton>
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
