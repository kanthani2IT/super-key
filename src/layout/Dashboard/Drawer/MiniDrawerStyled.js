// material-ui
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";

// project import
import { drawerWidth } from "config";

const openedMixin = (theme) => ({
  width: drawerWidth,
  // borderRight: '1px solid',
  // borderRightColor: theme.palette.success,
  backgroundColor: theme.palette.success.lighter,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  overflowX: "hidden",
  boxShadow: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.success.lighter,

  overflowX: "hidden",
  width: 0,
  borderRight: "none",
  boxShadow: theme.customShadows.z1,
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default MiniDrawerStyled;
