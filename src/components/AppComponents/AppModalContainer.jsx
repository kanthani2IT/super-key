import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme, width, height, align }) => ({
  height: height || "auto",
  padding: "1%",
  alignContent: align,
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[6],
  [theme.breakpoints.up("xs")]: {
    width: "75%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "75%",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  [theme.breakpoints.up("lg")]: {
    width: width,
  },
}));

const StyledFlexCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const StyledFlexCardContent = styled(CardContent)(
  ({ height, theme, padding, footer }) => ({
    paddingLeft: padding,
    paddingRight: padding,
    flex: footer ? `1 0 ${height}` : height,
    marginTop: 5,
    marginBottom: 2,
    borderRadius: "8px",
    overflow: "auto ",
  })
);

const AppModalContainer = ({
  children,
  cardHeight = "70%",
  height = "auto",
  width = "40%",
  padding = "3%",
  enableCard = false,
  title,
  footer,
  header,
  stepper,
  align,
  onClose,
}) => {
  return (
    <StyledPaper width={width} height={height} align={align}>
      {enableCard ? (
        <StyledFlexCard elevation={0}>
          {title && !header && (
            <CardHeader
              title={
                <Stack
                  textAlign={"center"}
                  justifyContent={"center"}
                  alignItems="center"
                  gap={0.5}
                >
                  <Typography variant="h2">{title}</Typography>
                  {stepper && stepper()}
                </Stack>
              }
              action={
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
          )}
          {header && !title && header}
          {header && <Divider />}

          <StyledFlexCardContent
            height={cardHeight}
            padding={padding}
            footer={footer}
          >
            {children}
          </StyledFlexCardContent>

          {footer && <CardActions>{footer}</CardActions>}
        </StyledFlexCard>
      ) : (
        children
      )}
    </StyledPaper>
  );
};

export default AppModalContainer;
