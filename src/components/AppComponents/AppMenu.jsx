import { StyledMenu } from "./StyledComponent";

const AppMenu = ({ anchorEl, handleClose, renderComponent }) => {
  const open = Boolean(anchorEl);
  return (
    <StyledMenu
      id="basic-menu"
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
    >
      {renderComponent && renderComponent}
    </StyledMenu>
  );
};

export default AppMenu;
