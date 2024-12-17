import { StyledMenu } from "components/StyledComponents";

const AppMenu = ({
  anchorEl,
  handleClose,
  renderComponent,
  borderRadius = "4px",
  width = "auto",
}) => {
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
      width={width}
    >
      {renderComponent && renderComponent}
    </StyledMenu>
  );
};

export default AppMenu;
