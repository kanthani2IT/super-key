import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CopyContentIcon from "assets/images/icons/CopyContent";
import OfficeIcon from "assets/images/icons/OfficeIcon";
import PhoneIcon from "assets/images/icons/PhoneIcon";
import avatar1 from "assets/images/users/avatar-1.png";
import { useState } from "react";
import AppCard from "./AppCard";
import AppGrid from "./AppGrid";

const AppTaskCard = ({ roleName, role, type, number }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const email = "example@example.com";
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
    });
  };

  const Footer = () => {
    return (
      <>
        <Button
          startIcon={<MailIcon />}
          size="large"
          color="info"
          variant="contained"
          fullWidth
        >
          {" "}
          Send Mail
        </Button>
        <Tooltip title={isCopied ? "Email Copied!" : "Copy Email"}>
          <IconButton onClick={handleCopy}>{<CopyContentIcon />}</IconButton>
        </Tooltip>
      </>
    );
  };
  return (
    <AppCard height={"auto"} footer={<Footer />} width="400px" custom>
      <AppGrid container direction={"column"}>
        <AppGrid>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar
              alt="profile user"
              src={avatar1}
              sx={{ width: 32, height: 32 }}
            />
            <Stack>
              <Typography variant="subtitle2">{roleName}</Typography>
              <Typography variant="body1" color="text.secondary">
                {role}
              </Typography>
            </Stack>
          </Stack>
        </AppGrid>
        <AppGrid>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar
              alt="profile user"
              sx={{ width: 32, height: 32, backgroundColor: "white" }}
            >
              <OfficeIcon />
            </Avatar>

            <Stack>
              <Typography variant="subtitle2">{type}</Typography>
            </Stack>
          </Stack>
        </AppGrid>
        <AppGrid>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar
              alt="profile user"
              sx={{ width: 32, height: 32, backgroundColor: "white" }}
            >
              <PhoneIcon />
            </Avatar>
            <Stack flexDirection={"row"} gap={"20px"}>
              <Typography variant="subtitle2">{number}</Typography>
              <CopyContentIcon />
            </Stack>
          </Stack>
        </AppGrid>
      </AppGrid>
    </AppCard>
  );
};

export default AppTaskCard;
