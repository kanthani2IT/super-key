import { StyledMenu } from "components/StyledComponents";

const AppMenu = ({ anchorEl, handleClose, renderComponent, borderRadius }) => {
  const open = Boolean(anchorEl);
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      borderRadius={borderRadius}
    >
      {renderComponent && renderComponent}
    </StyledMenu>
  );
};

export default AppMenu;
