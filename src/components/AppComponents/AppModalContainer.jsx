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
  Typography,
} from "@mui/material";
import { useState } from "react";
import ConfirmationModal from "./AppConfirmationModal";

const StyledPaper = styled(Paper)(
  ({ theme, width, height, align, fullWidth }) => ({
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
  })
);

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
  confirmModal = false,
  flexTitle=false,
}) => {
  const [closeModal, setCloseModal] = useState(false);
  const handleClose = () => {
    setCloseModal(false);
    onClose?.();
  };
  const handleCloseModal = () => {
    if (confirmModal) {
      setCloseModal(true);
    } else {
      onClose?.();
    }
  };
  return (
    <StyledPaper
      fullWidth={fullWidth}
      width={width}
      height={height}
      align={align}
    >
      {enableCard ? (
        <StyledFlexCard elevation={0}>
          {title && !header &&!flexTitle && (
            <>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button
                  onClick={handleCloseModal}
                  disableTouchRipple
                  variant="text"
                  size="small"
                  color="secondary"
                >
                  Close
                </Button>
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
          {flexTitle&&(
            <>
            
              <Box sx={{ display: "flex", justifyContent: "space-between", padding:"0rem 1rem" }}>
              <Typography variant="h4">{title}</Typography>
                <Button
                  onClick={handleCloseModal}
                  disableTouchRipple
                  variant="text"
                  size="small"
                  color="secondary"
                >
                  Close
                </Button>
              </Box>
              
            </>
          )}
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
      {/* Close Modal */}

      <ConfirmationModal
        open={closeModal}
        message={"Are you sure that you want to Close?"}
        confirmLabel={"Yes"}
        cancelLabel={"Continue"}
        onConfirm={handleClose}
        onCancel={() => setCloseModal(false)}
      />
    </StyledPaper>
  );
};

export default AppModalContainer;
