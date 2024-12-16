import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppSkeleton from "components/AppComponents/AppSkeleton";

const columns = [
  { field: "S.No", headerName: "S.No" },
  { field: "Task Name", headerName: "Task Name" },
  { field: "Type", headerName: "Type" },
  { field: "Assign to", headerName: "Assign to" },
  { field: "Due Date", headerName: "Due Date" },
  { field: "Priority", headerName: "Priority" },
  { field: "Action", headerName: "Action" },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "red";
    case "MEDIUM":
      return "orange";
    case "LOW":
      return "green";
    default:
      return "black";
  }
};
const cellStyle = {
  backgroundColor: "#EDF0F3",
  padding: "10px",
  color: "#323C4D",
};

const boldTextStyle = {
  fontWeight: 700,
  color: "#323C4D",
};

const firstCellStyle = {
  ...cellStyle,
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
};

const lastCellStyle = {
  ...cellStyle,
  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",
};
const truncateText = (text, limit = 50) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};
const TaskTableDashBoard = ({ tableData = [], loading = false }) => {
  console.log("tableData", tableData);
  return (
    <Box>
      <TableContainer>
        {loading ? (
          <AppSkeleton
            row={3}
            variant={"custom"}
            width={"100%"}
            height={"60px"}
          />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.field}>{col.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <TableRow key={row.id || index} sx={cellStyle}>
                    <TableCell sx={firstCellStyle}>{index + 1}</TableCell>
                    <TableCell>{truncateText(row.description, 70)}</TableCell>
                    <TableCell sx={boldTextStyle}>{row.type}</TableCell>
                    <TableCell sx={boldTextStyle}>{row.assignedTo}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell
                      style={{ color: getPriorityColor(row.priority) }}
                    >
                      {row.priority}
                    </TableCell>
                    <TableCell sx={lastCellStyle}>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No tasks available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {tableData.length > 4 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={() => console.log("See all tasks clicked")}
          >
            See all tasks
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TaskTableDashBoard;
