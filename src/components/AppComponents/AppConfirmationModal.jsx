import { Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";

import { RadiusStyledButton } from "components/StyledComponents";
import AppModal from "./AppModal";
import AppRowBox from "./AppRowBox";

const ConfirmationModal = ({
  open,
  onClose,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  height = "25vh",
  align = "center",
}) => {
  return (
    <AppModal width="35vw" open={open} onClose={onClose} height={height} align={align}>
      <Card sx={{ boxShadow: "none" }}>
        <CardHeader title={<Typography variant="h4">{message}</Typography>} />
        <CardContent>
          <AppRowBox justifyContent="center" >
            <RadiusStyledButton
              onClick={onConfirm}
              color="info"
              variant="contained"
              width="115px"
              height="50px"
              borderRadius="10px"
            >
              {confirmLabel}
            </RadiusStyledButton>
            <RadiusStyledButton
              onClick={onCancel}
              color="secondary"
              variant="outlined"
              width="125px"
              height="50px"
              textColor="#8c8c8c"
              borderRadius="10px"
            >
              {cancelLabel}
            </RadiusStyledButton>
          </AppRowBox>
        </CardContent>
      </Card>
    </AppModal>
  );
};

export default ConfirmationModal;
