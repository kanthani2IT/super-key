import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

// material-ui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project import
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

export default function NavItem({ item, level }) {
  const theme = useTheme();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const openItem = menuMaster.openedItem;

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const textColor = theme.palette.common.black;
  const iconSelectedColor = theme.palette.text.success;
  const { pathname } = useLocation();
  const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon fill={isSelected ? iconSelectedColor : textColor
  } /> : false;

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) handlerActiveItem(item.id);
    // eslint-disable-next-line
  }, [pathname]);


  return (

    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => handlerActiveItem(item.id)}
      selected={isSelected}
      sx={{
        margin: "5%",
        gap: 2,
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          '&:hover': {
            bgcolor: 'success.light'
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
          '&:hover': {
            bgcolor: 'transparent'
          },
          '&.Mui-selected': {
            '&:hover': {
              bgcolor: 'transparent'
            },
            bgcolor: 'transparent'
          }
        })
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            // color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              // alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'secondary.lighter'
              }
            }),
            ...(!drawerOpen &&
              isSelected && {
              bgcolor: 'primary.lighter',
              '&:hover': {
                bgcolor: 'primary.lighter'
              }
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



    </ListItemButton>
  );
}

NavItem.propTypes = { item: PropTypes.object, level: PropTypes.number };
