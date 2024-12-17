import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Collapse, List, Tooltip } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useGetMenuMaster } from 'api/menu';
import styled from '@emotion/styled';
import AppToolTip from 'components/AppComponents/AppToolTip';

export default function NavItem({ subMenu = false, navUrl, item, level, collapse = false, handleActiveItem, activeNav }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const { disable } = item
  const [collapseOpen, setCollapseOpen] = useState(false);
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { pathname } = useLocation();

  const itemTarget = item.target ? '_blank' : '_self';
  const listItemProps = !collapse
    ? { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={navUrl} target={itemTarget} />) }
    : {};

  const isSelected = collapse ? activeNav.includes(navUrl) : activeNav == navUrl;
  const textColor = theme.palette.common.black;
  const iconSelectedColor = theme.palette.text.success;
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


  const StyledListItemButton = styled(ListItemButton)(({ theme, drawerOpen, level }) => ({
    margin: subMenu ? '2%' : '5%',
    gap: 2,
    zIndex: 1201,
    paddingLeft: drawerOpen ? `${level * 28}px` : theme.spacing(1.5),
    paddingY: !drawerOpen && level === 1 ? theme.spacing(1.25) : theme.spacing(1),
    // ...(drawerOpen && {
    borderRadius: '0.625rem',
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.success.light,
      // color: theme.palette.primary.main,
      '&:hover': {
        // color: theme.palette.primary.main,
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
    margin: '5%',
    gap: theme.spacing(0.5),
    borderRadius: '10px',
    backgroundColor: theme.palette.grey[100],
  }));
  useEffect(() => {
    if (collapseOpen && !isSelected) {
      setCollapseOpen(false)
    } else if (!collapseOpen && isSelected) {
      setCollapseOpen(true)

    }
  }, [isSelected])
  return (
    <AppToolTip placement='right' title={disable ? 'Coming Soon' : ""}>
      <StyledListItemButton
        {...listItemProps}
        disabled={disable}
        onClick={() => handleMenuClick(item.url)}
        selected={isSelected}
        subItem

      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: '15%',
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
            sx={{
              minWidth: '5%',
              flexShrink: 0, // Prevent the icon from shrinking
            }}
            primary={
              <Typography variant="subtitle1" color={isSelected ? 'success' : 'secondary'}>
                {item.title}
              </Typography>
            }
          />
        )}
        <ListItemIcon sx={{
          minWidth: '5%',
        }}>
          {((drawerOpen || (!drawerOpen && level !== 1)) && collapse) && (collapseOpen ? <ExpandLess color={isSelected ? 'success' : 'secondary'} fontSize='small' /> : <ExpandMore color={isSelected ? 'success' : 'secondary'} fontSize='small' />)}

        </ListItemIcon>
      </StyledListItemButton >
      {collapse && (
        <StyledCollapse in={collapseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item?.children?.map((subItem, index) => (
              <NavItem subMenu navUrl={item.url + subItem.url} key={item.subItem} item={subItem} handleActiveItem={
                () => handleSubmenuClick(item.url + subItem.url)
              }
                activeNav={activeNav}
              />

            ))}
          </List>
        </StyledCollapse>
      )
      }

    </AppToolTip>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  collapse: PropTypes.bool,
  handleActiveItem: PropTypes.func.isRequired,
  activeNav: PropTypes.bool
};