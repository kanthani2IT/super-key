import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [activeNav, setActiveNav] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    // Update activeNav when pathname changes
    setActiveNav(pathname);
  }, [pathname]);

  const handleActiveItem = (nav) => {
    setActiveNav(nav);
  };


  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={1}
            collapse
            handleActiveItem={handleActiveItem}
            activeNav={activeNav}
          />
        );
      case 'item':
        return (
          <NavItem
            key={menuItem.id}
            item={menuItem}
            level={1}
            handleActiveItem={handleActiveItem}
            activeNav={activeNav}
          />
        );
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };