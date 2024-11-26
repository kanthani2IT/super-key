import { Card, styled } from "@mui/material";

export const StyledDashboardCard = styled(Card)(({ theme }) => ({
  "&.MuiPaper-root": { boxShadow: "0 0 !important" },
}));
