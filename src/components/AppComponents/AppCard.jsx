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

const AppCard = ({
  onClose,
  children,
  title,
  footer,
  height,
  width,
  custom,
}) => {
  const Header = () => {
    return (
      <AppRowBox>
        <Typography variant="h4">{title}</Typography>

        <Button
          onClick={onClose}
          disableTouchRipple
          variant="text"
          size="small"
          color="secondary"
        >
          Close
        </Button>
      </AppRowBox>
    );
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        width: width ? width : "auto",
      }}
    >
      <CardHeader
        title={<Header />}
        sx={{
          height: custom ? "1vh" : "5vh",
          padding: custom ? "5px" : "20px",
          marginTop: custom ? "5px" : "",
        }}
      />

      {!custom && <Divider />}
      <CardContent
        sx={{
          height: height ? height : "85vh",
          overflowY: "auto",
          paddingTop: custom ? "2px" : "",
        }}
      >
        {children}
      </CardContent>

      <CardActions sx={{ height: "10vh" }}>{footer}</CardActions>
    </Card>
  );
};

export default AppCard;
