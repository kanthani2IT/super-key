import styled from "@emotion/styled";
import { TableCell, TableRow } from "@mui/material";

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
