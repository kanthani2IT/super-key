import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VectorIcon from "assets/images/icons/CommunityIcons/VectorIcon";
import AppPagination from "./AppPagination";
import AppRowBox from "./AppRowBox";
import { StyledTableCell, StyledTableRow } from "./StyledComponent";

const CustomUploadTable = ({
  cols,
  tableData,
  pageSize,
  currentPage,
  totalItems,
}) => {
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
                <Typography variant="body1" color="#8F8F8F" noWrap>
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
                    <StyledTableCell component="th" scope="row">
                      {col?.renderActionComponent ? (
                        col.renderActionComponent(rows, rowsIndex)
                      ) : (
                        <></>
                      )}
                    </StyledTableCell>
                  );
                } else {
                  return (
                    <StyledTableCell component="th" scope="row">
                      {col?.renderComponent
                        ? col.renderComponent(rows, rowsIndex)
                        : rows[col.field]}
                    </StyledTableCell>
                  );
                }
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <AppRowBox justifyContent="start">
        <VectorIcon />
        <Typography variant="subtitle1">
          Note: To Upload the documents please save the communities and then you
          can upload the documents in document repository section.
        </Typography>
      </AppRowBox>
      <AppPagination
        pageSize={pageSize || 6}
        currentPage={currentPage || 1}
        totalItems={totalItems || 10}
      />
    </TableContainer>
  );
};
export default CustomUploadTable;
