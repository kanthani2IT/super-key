import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useGetMenuMaster } from 'api/menu';

export default function NavItem({ item, level, collapse = false, handleActiveItem, activeNav }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { pathname } = useLocation();

  const itemTarget = item.target ? '_blank' : '_self';
  const listItemProps = !collapse
    ? { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) }
    : {};

  const textColor = theme.palette.common.black;
  const iconSelectedColor = theme.palette.text.success;
  const isSelected = activeNav;
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon fill={isSelected ? iconSelectedColor : textColor} /> : null;
  const handleCollapseMenu = (open) => {
    setCollapseOpen(open)
    if (!open && !pathname.includes(item.url)) {
      handleActiveItem(pathname)
    }
  }
  const handleMenuClick = () => {
    handleActiveItem(item.url);
    if (collapse) handleCollapseMenu(!collapseOpen);
  };

  return (
    <>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        onClick={handleMenuClick}
        selected={isSelected}
        sx={{
          margin: "5%",
          gap: 2,
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': {
              bgcolor: 'success.light',
              borderRadius: "0.625rem",
            },
            '&.Mui-selected': {
              bgcolor: 'success.light',
              borderRadius: "0.625rem",
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                bgcolor: 'success.light'
              }
            }
          }),
          ...(!drawerOpen && {
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': {
              '&:hover': { bgcolor: 'transparent' },
              bgcolor: 'transparent'
            }
          })
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                justifyContent: 'center',
                '&:hover': { bgcolor: 'success.light' },
              }),
              ...(!drawerOpen && isSelected && {
                bgcolor: 'success.light',
                '&:hover': { bgcolor: 'success.light' },
              })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant="subtitle1" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                {item.title}
              </Typography>
            }
          />
        )}
        {collapse && (collapseOpen ? <ExpandLess color={isSelected ? iconSelectedColor : 'secondary'} fontSize='small' /> : <ExpandMore color={isSelected ? iconSelectedColor : 'secondary'} fontSize='small' />)}
      </ListItemButton>
      {collapse && (
        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          {/* Render nested items here if necessary */}
        </Collapse>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  collapse: PropTypes.bool,
  handleActiveItem: PropTypes.func.isRequired,
  activeNav: PropTypes.bool
};