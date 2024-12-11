import {
  Menu,
  MenuItem,
  Step,
  StepConnector,
  Stepper,
  styled,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

export const StyledMenu = styled(Menu)(({ theme }) => ({
  borderRadius: "0.625rem",
  boxShadow: "#00000045 0px 7px 29px 0px",
}));
export const Customstepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepConnector-root": {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
  },
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
    width: "70px",
    maxWidth: "70px",
    "@media (min-width: 500px) and (max-width: 700px)": {
      width: "50px",
    },
  },
  "&.Mui-active, &.Mui-completed": {
    "& .MuiStepConnector-line": {
      backgroundColor: theme.palette.success.dark,
    },
  },
}));

export const StyledTableCell = styled(TableCell)({
  borderColor: "#94AAF4 !important",
  borderBottom: "5px solid rgba(253, 253, 253, 1)",
  padding: "15px",
  fontSize: "0.875rem",
  lineHeight: 1.57,
});

export const StyledTableRow = styled(TableRow)({
  backgroundColor: "#EDEFF6",

  "& > :first-of-type": {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    borderLeft: "1px solid #94AAF4",
    borderTop: "1px solid #94AAF4",
  },
  "& > :last-of-type": {
    backgroundColor: "#ffffff",
  },
  "& > :nth-last-of-type(2)": {
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    borderRight: "1px solid #94AAF4",
  },
  "& > td, & > th": {
    borderTop: "1px solid #94AAF4 !important",
    borderBottom: "1px solid #94AAF4",
  },
  "&:not(:first-of-type) > td, &:not(:first-of-type) > th": {
    borderTop: "1px solid #94AAF4",
  },
  "& > td:last-child, & > th:last-child": {
    borderTop: "none !important",
    borderBottom: "none !important",
  },
});

export const StyledBulkTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    backgroundColor: theme.palette.background.default,
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
}));
