import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { StyledButton } from "pages/community/StyledComponents";
import AppRowBox from "./AppRowBox";

const AppCard = ({ onClose, children, title, footer }) => {
  const Header = () => {
    return (
      <AppRowBox>
        <Typography variant="h4">{title}</Typography>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </AppRowBox>
    );
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
    >
      <CardHeader
        title={<Header />}
        sx={{
          height: "5vh",
        }}
      />

      <Divider />
      <CardContent sx={{ height: "85vh", overflowY: "auto" }}>
        {children}
      </CardContent>

      <CardActions sx={{ height: "10vh" }}>{footer}</CardActions>
    </Card>
  );
};

export default AppCard;
