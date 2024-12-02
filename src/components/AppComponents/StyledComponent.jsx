import { Menu, MenuItem, styled } from "@mui/material";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  borderRadius: "0.625rem",
  boxShadow: "#00000045 0px 7px 29px 0px",
}));
export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#E9F3FF",
    borderRadius: "0.625rem",
    color: "black",
  },
  margin: "0px 10px 0px 10px",

  padding: "10px",
  color: "#656565",
}));
