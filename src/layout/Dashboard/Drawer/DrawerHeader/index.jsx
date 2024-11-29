import PropTypes from "prop-types";

// project import
import { MenuFoldOutlined } from "@ant-design/icons";
import { Box, IconButton } from "@mui/material";
import { handlerDrawerOpen, useGetMenuMaster } from "api/menu";
import Logo from "components/logo";
import DrawerHeaderStyled from "./DrawerHeaderStyled";

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  return (
    <DrawerHeaderStyled open={!!open}>
      <Box display={"flex"} gap={1}>
        <Logo isIcon={!open} sx={{ width: open ? "auto" : 35, height: 35 }} />
        {drawerOpen ? (
          <IconButton onClick={() => handlerDrawerOpen(!drawerOpen)}>
            <MenuFoldOutlined />
          </IconButton>
        ) : null}
      </Box>
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
