import { Box, Button, Dialog, Typography } from "@mui/material";
import AppGrid from "./AppGrid";

const AppDialogBox = ({ open, handleDelete, handleCancel }) => {
  return (
    <Dialog open={open}>
      <AppGrid container spacing={3} sx={{ p: 5 }}>
        <AppGrid item size={{ sm: 12 }}>
          <Typography textAlign={"center"} variant="h3">
            Are you sure that you want <br></br> to delete the Community?
          </Typography>
        </AppGrid>
        <AppGrid item size={{ sm: 12 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="outlined" onClick={handleDelete}>
              Yes,Delete
            </Button>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </AppGrid>
      </AppGrid>
    </Dialog>
  );
};
export default AppDialogBox;
