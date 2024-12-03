import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import AppRowBox from "./AppRowBox";

const AppCard = ({ onClose, children, title, footer }) => {
  const Header = () => {
    return (
      <AppRowBox>
        <Typography variant="h4">{title}</Typography>

        <Button onClick={onClose} disableTouchRipple variant="text" size="small" color="secondary">Close</Button>
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
      <CardContent sx={{ height: "87vh", overflowY: "auto" }}>
        {children}
      </CardContent>
      <CardActions sx={{ height: "5vh" }}>
        {footer}
      </CardActions>
    </Card>
  );
};

export default AppCard;
