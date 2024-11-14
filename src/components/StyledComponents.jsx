import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.grey,
}));

export const Image = styled('img')`
  height: 20vh;
  width: 100%;
`;