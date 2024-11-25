import styled from "@emotion/styled";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme, width, height, align }) => ({
  // width: width || "auto",
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
    width: "40%"
  },
}));

const StyledFlexCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const StyledFlexCardContent = styled(CardContent)(({ height, theme, padding, footer }) => ({
  paddingLeft: padding,
  paddingRight: padding,
  flex: footer ? `1 0 ${height}` : height,
  marginTop: 3,
  marginBottom: 2,
  borderRadius: "8px",
}));

const AppModalContainer = ({
  children,
  cardHeight = '70%',
  height = 'auto',
  width = "40vw",
  padding = '3%',
  enableCard = false,
  title,
  footer,
  header,
  stepper,
  align
}) => {
  return (
    <StyledPaper width={width} height={height} align={align}>
      {enableCard ? (
        <StyledFlexCard elevation={0}>
          {title && !header && (
            <CardHeader
              title={
                <Stack textAlign={'center'} justifyContent={'center'} alignItems="center" gap={1} mb='2px' >
                  <Typography variant="h2">{title}
                  </Typography>
                  {stepper && stepper()}
                </Stack>
              }
            />
          )}
          {header && !title && header}
          {header && <Divider />}

          <StyledFlexCardContent height={cardHeight} padding={padding} footer={footer}>
            {children}
          </StyledFlexCardContent>

          {footer && (
            <CardActions>
              {footer}
            </CardActions>
          )}
        </StyledFlexCard>
      ) : (
        children
      )}
    </StyledPaper>
  );
};

export default AppModalContainer;
