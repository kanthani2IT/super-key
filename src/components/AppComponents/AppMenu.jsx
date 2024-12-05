import { StyledMenu } from "components/StyledComponents";

const AppMenu = ({ anchorEl, handleClose, renderComponent }) => {
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
    >
      {renderComponent && renderComponent}
    </StyledMenu>
  );
};

export default AppMenu;
