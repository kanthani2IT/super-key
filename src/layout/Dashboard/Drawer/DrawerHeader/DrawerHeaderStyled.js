// material-ui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  paddingLeft: theme.spacing(open ? 3 : 0),
  borderBottom: "1px solid #E9EBF0",
  minHeight: "61px",
}));

export default DrawerHeaderStyled;
