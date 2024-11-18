import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useGetMenuMaster } from 'api/menu';
import styled from '@emotion/styled';

export default function NavItem({ subItem = false, item, level, collapse = false, handleActiveItem, activeNav }) {
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
  const isSelected = collapse ? activeNav.includes(item.url) : activeNav == item.url;
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon fill={isSelected ? iconSelectedColor : textColor} /> : null;
  const handleCollapseMenu = (open) => {
    setCollapseOpen(open)
    if (!open && !pathname.includes(item.url)) {
      handleActiveItem(pathname)
    }
  }
  const handleMenuClick = (url) => {

    if (collapse) { handleCollapseMenu(!collapseOpen); } else {
      handleActiveItem(url);
    }
  };
  const handleSubmenuClick = (url) => {
    handleActiveItem(url);
  }


  const StyledListItemButton = styled(ListItemButton)(({ theme, drawerOpen, level, subItem }) => ({
    margin: '5%',
    gap: 2,
    zIndex: 1201,
    paddingLeft: drawerOpen ? `${level * 28}px` : theme.spacing(1.5),
    paddingY: !drawerOpen && level === 1 ? theme.spacing(1.25) : theme.spacing(1),
    // ...(drawerOpen && {
    '&:hover': {
      backgroundColor: theme.palette.success.light,
      borderRadius: '0.625rem',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.success.light,
      borderRadius: '0.625rem',
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.success.light,
      },
    },
    // }),
    // ...(!drawerOpen && {
    //   '&:hover': { backgroundColor: 'transparent' },
    //   '&.Mui-selected': {
    //     '&:hover': { backgroundColor: 'transparent' },
    //     backgroundColor: 'transparent',
    //   },
    // }),
  }));

  const StyledCollapse = styled(Collapse)(({ theme }) => ({
    margin: '4%',
    gap: theme.spacing(0.5),
    // paddingLeft: theme.spacing(1.5),
    borderRadius: '10px',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.success.main}`,
  }));
  return (
    <>
      <StyledListItemButton
        {...listItemProps}
        disabled={item.disabled}
        onClick={() => handleMenuClick(item.url)}
        selected={isSelected}
        subItem

      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: '17%',
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
        {((drawerOpen || (!drawerOpen && level !== 1)) && collapse) && (collapseOpen ? <ExpandLess color={isSelected ? 'success' : 'secondary'} fontSize='small' /> : <ExpandMore color={isSelected ? 'success' : 'secondary'} fontSize='small' />)}
      </StyledListItemButton>
      {collapse && (
        <StyledCollapse in={collapseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item?.subMenu?.map((subItem, index) => (
              <NavItem subItem={true} key={item.subItem} item={subItem} handleActiveItem={
                () => handleSubmenuClick(subItem.url)
              }
                activeNav={activeNav}
              />

            ))}
          </List>
        </StyledCollapse>
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