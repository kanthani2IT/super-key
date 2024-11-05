import PropTypes from 'prop-types';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import { IconButton, Typography } from '@mui/material';
import { useGetMenuMaster } from 'api/menu';
import { useMemo } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {




  return (
    <DrawerHeaderStyled open={!!open}>
      <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35 }} />
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
