import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { StyledButton } from "pages/community/StyledComponents";

const AppCard = ({ onClose, children, title, footer }) => {
  const Header = () => {
    return (
      <>
        <Typography variant="h4">{title}</Typography>

        <StyledButton onClick={onClose}>Close</StyledButton>
      </>
    );
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "5vh",
          alignItems: "center",
        }}
      >
        <Header />
      </CardContent>
      <Divider />
      <CardContent sx={{ height: "85vh", overflowY: "auto" }}>
        {children}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        {footer}
      </CardActions>
    </Card>
  );
};

export default AppCard;
