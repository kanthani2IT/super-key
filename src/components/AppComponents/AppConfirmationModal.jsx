import { Card, CardActions, CardContent, Typography } from "@mui/material";

import { RadiusStyledButton } from "components/StyledComponents";
import AppModal from "./AppModal";

const ConfirmationModal = ({
  open,
  onClose,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  height = "30vh",
  align = "center",
}) => {
  return (
    <AppModal open={open} onClose={onClose} height={height} align={align}>
      <Card sx={{ boxShadow: "none" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5">{message}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
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
        </CardActions>
      </Card>
    </AppModal>
  );
};

export default ConfirmationModal;
