import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "assets/images/icons/CommunityIcons/DeleteIcon";
import PreviewIcon from "assets/images/icons/CommunityIcons/PreviewIcon";
import { StyledTableCell, StyledTableRow } from "./StyledComponent";

const CustomUploadTable = ({ cols, tableData }) => {
  return (
    <TableContainer>
      <Table
        aria-label="simple table"
        sx={{ borderSpacing: "0 10px", borderCollapse: "separate" }}
      >
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
                <Typography variant="body1" color="#8F8F8F">
                  {item.headerName}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((rows, rowsIndex) => (
            <StyledTableRow key={rowsIndex}>
              {cols.map((col) => {
                if (col.field === "action") {
                  return (
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ cursor: "pointer" }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <PreviewIcon />
                        <DeleteIcon />
                      </div>
                    </StyledTableCell>
                  );
                } else {
                  return (
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{
                        color:
                          col.field === "CommunityName" ? "black" : "#8F8F8F",
                        fontWeight: col.field === "CommunityName" ? 600 : "",
                      }}
                    >
                      {rows[col.field]}
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
