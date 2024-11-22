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
  width: width || "auto",
  height: height || "auto",
  padding: "2%",
  alignContent: align,
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper, // Use theme color
  boxShadow: theme.shadows[6], // Default box shadow
}));

const StyledFlexCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));
// borderBottom: `0.5px solid ${theme.palette.divider}`
const StyledFlexCardContent = styled(CardContent)(
  ({ theme, padding, footer }) => ({
    paddingLeft: padding,
    paddingRight: padding,
    flex: footer ? "1 0 70%" : "auto",
    overflowY: "auto",
    marginTop: 2,
    marginBottom: 2,
    borderRadius: "8px",
  })
);

const AppModalContainer = ({
  children,
  height = "80vh",
  width = "700px",
  padding = "2%",
  enableCard = false,
  title,
  footer,
  header,
  stepper,
  align,
}) => {
  return (
    <StyledPaper width={width} height={height} align={align}>
      {enableCard ? (
        <StyledFlexCard elevation={0}>
          {!header && title ? (
            <CardHeader
              title={
                <Stack alignItems={"center"} gap={1}>
                  <Typography variant="h2">{title}</Typography>

                  {stepper && stepper()}
                </Stack>
              }
            />
          ) : (
            header
          )}

          {header && <Divider />}
          <StyledFlexCardContent padding={padding} footer={footer}>
            {children}
          </StyledFlexCardContent>

          {footer && <Divider />}
          {footer && <CardActions>{footer}</CardActions>}
        </StyledFlexCard>
      ) : (
        children
      )}
    </StyledPaper>
  );
};

export default AppModalContainer;
