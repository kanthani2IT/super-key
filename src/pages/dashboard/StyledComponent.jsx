import { Button, Card, styled } from "@mui/material";

export const StyledDashboardCard = styled(Card)(({ theme }) => ({
  "&.MuiPaper-root": { boxShadow: "0 0 !important" },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.625rem", // Setting border radius
  border: `0.5px solid ${theme.palette.primary.main}`, // Border style
  background: " #FFF", // Background color
  color: theme.palette.primary.main, // Optional: text color based on theme
  padding: "8px 16px", // Optional: padding for the button
  "&:hover": {
    border: "0.5px solid #ffffff",
    color: " #FFF",
    background: theme.palette.primary.main, // Optional: change background on hover
  },
}));

export const RadiusStyledButton = styled(Button)(({ theme, color, height, width, textColor, borderRadius }) => ({
  width: width || '200px',
  height: height || '50px',
  borderRadius: borderRadius || '32px',
  padding: '15px 29px',
  gap: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color || "#288B5B",
  color: textColor || '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: color ? color : theme.palette.success.main,
  },
}));