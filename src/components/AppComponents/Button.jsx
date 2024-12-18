import { Button } from "@mui/material";
import { ButtonLoader } from "./StyledComponent";

const AppCustomButton = ({ children, loading = false, ...props }) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading && <ButtonLoader color="inherit" />}
      {children}
    </Button>
  );
};

export default AppCustomButton;
