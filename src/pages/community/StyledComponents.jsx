import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.grey,
}));
export const OnBoardButton = styled(Button)(({ theme }) => ({
  color: "red",
  border: "1px solid red",
}));
