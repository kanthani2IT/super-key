import React, { useRef, useState } from "react";
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
import { StyledMenuItem } from "components/StyledComponents";
import AppMenu from "components/AppComponents/AppMenu";
import AppTaskCard from "components/AppComponents/AppTaskCard";

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
  const anchorRef = useRef(null);
  const [modal, setModal] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const renderPriorityComponent = (row, onClose) => {
    const handleOptionClick = (option) => {
      console.log(`${option} clicked:`, row);
      onClose();
    };

    return (
      <>
        <StyledMenuItem
          onClick={(e) => {
            console.log(e.currentTarget, "currentTarget");
            setModal(e.currentTarget);
            setViewDetails(row);
          }}
          ref={anchorRef}
        >
          View Details
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("Send Email")}>
          Send Email
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOptionClick("Mark as Completed")}>
          Mark as Completed
        </StyledMenuItem>
      </>
    );
  };
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuRowData, setMenuRowData] = useState(null);

  const [showAll, setShowAll] = useState(false);
  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setMenuRowData(row);
  };
  const displayedTasks = showAll ? tableData : tableData.slice(0, 4);
  console.log("tableData", tableData);
  const handleMenuAnchorClose = () => {
    setMenuAnchorEl(null);
    setMenuRowData(null);
  };
  return (
    <Box>
      <TableContainer>
        {loading ? (
          <AppSkeleton
            row={3}
            gap={1}
            variant={"custom"}
            width={"100%"}
            height={"60px"}
          />
        ) : (
          <Table
            sx={{
              borderSpacing: "0 10px",
              borderCollapse: "separate",
            }}
          >
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.field}
                    sx={{ backgroundColor: "#F7F9FB" }}
                  >
                    {col.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedTasks.length > 0 ? (
                displayedTasks.map((row, index) => (
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
                      <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                        <MoreVertIcon color="secondary" />
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
      <AppMenu
        anchorEl={modal}
        handleClose={() => setModal(null)}
        renderComponent={
          <AppTaskCard
            roleName={viewDetails?.assignTo}
            role="Property Manager Name"
            type="GRT"
            number="+1 432 567 987"
          />
        }
        borderRadius={"20px"}
      />

      <AppMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuAnchorClose}
        renderComponent={
          menuRowData &&
          renderPriorityComponent(menuRowData, handleMenuAnchorClose)
        }
      />
      {tableData.length > 4 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="text"
            color="primary"
            onClick={() => console.log("!@#$%")}
          >
            See all tasks
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TaskTableDashBoard;
