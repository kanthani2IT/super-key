import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PreviewIcon from "assets/images/icons/CommunityIcons/PreviewIcon";
import { StyledTableCell, StyledTableRow } from "./StyledComponent";

const CustomUploadTable = ({ cols, tableData }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {cols.map((item, idx) => (
              <TableCell
                key={idx + 1}
                sx={{
                  textTransform: "unset",
                  position: "unset !important",
                  borderColor: "#ffffff !important",
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>
                  {item.title}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((rows, rowsIndex) => (
            <StyledTableRow key={rowsIndex}>
              {cols.map((col) => {
                if (col.fieldName === "action") {
                  return (
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ cursor: "pointer" }}
                    >
                      <PreviewIcon />
                    </StyledTableCell>
                  );
                } else {
                  return (
                    <StyledTableCell component="th" scope="row">
                      {rows[col.fieldName]}
                    </StyledTableCell>
                  );
                }
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CustomUploadTable;
