import { Menu, MenuItem, Step, StepConnector, styled } from "@mui/material";

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

export const CustomStep = styled(Step)(({ theme }) => ({
  "&:not(:last-of-type)": {
    marginRight: "2px",
  },
}));

export const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    height: 9,
    border: 0,
    borderRadius: 10,
    backgroundColor: "#B0B0B0",
    width: "5vw",
  },
  "&.Mui-active, &.Mui-completed": {
    "& .MuiStepConnector-line": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));
