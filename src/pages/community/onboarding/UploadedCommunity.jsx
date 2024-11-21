import { Box, Button, Typography } from "@mui/material";
import CheckIcon from "assets/images/icons/CommunityIcons/CheckIcon";

const UploadedCommunity = (props) => {
  const { handleClose } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <CheckIcon />
      <Typography variant="h2">
        {"10"} Communities are successfully added.
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="info"
        sx={{ pl: 10, pr: 10, pt: 2, pb: 2 }}
        onClick={handleClose}
      >
        Ok
      </Button>
    </Box>
  );
};

export default UploadedCommunity;
