import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.grey,
}));
