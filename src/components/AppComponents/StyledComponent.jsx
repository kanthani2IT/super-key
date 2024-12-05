import {
  Menu,
  MenuItem,
  Step,
  StepConnector,
  TableCell,
  TableRow,
  styled,
} from "@mui/material";

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

export const StyledTableCell = styled(TableCell)({
  borderColor: "#ffffff !important",
  borderBottom: "5px solid rgba(253, 253, 253, 1)",
  padding: "15px",
});

export const StyledTableRow = styled(TableRow)({
  backgroundColor: "#EDEFF6",
  "& > :first-of-type": {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  },
  "& > :last-of-type": {
    backgroundColor: "#ffffff",
  },

  "& > :nth-last-of-type(2)": {
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
  },
});
