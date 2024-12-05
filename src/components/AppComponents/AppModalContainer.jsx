import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Stack,
  Typography
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme, width, height, align, fullWidth }) => ({
  height: height || "auto",
  padding: "1%",
  alignContent: align,
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[6],
  [theme.breakpoints.up("xs")]: {
    width: fullWidth ? width : "75%",
  },
  [theme.breakpoints.up("sm")]: {
    width: fullWidth ? width : "75%",
  },
  [theme.breakpoints.up("md")]: {
    width: fullWidth ? width : "50%",
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
  fullWidth = false,
}) => {
  return (
    <StyledPaper fullWidth={fullWidth} width={width} height={height} align={align}>
      {enableCard ? (
        <StyledFlexCard elevation={0}>
          {title && !header && (
            <>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={onClose} disableTouchRipple variant="text" size="small" color="secondary" >Close</Button>
              </Box>
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
                sx={{ p: "0px 16px 16px" }}
              />
            </>
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
