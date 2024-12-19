import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EmailModal from "components/AppComponents/AppEmailModal";
import AppMenu from "components/AppComponents/AppMenu";
import AppSkeleton from "components/AppComponents/AppSkeleton";
import AppTaskCard from "components/AppComponents/AppTaskCard";
import { StyledMenuItem } from "components/StyledComponents";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { dateText, truncateText } from "utils/helpers";

const columns = [
  { field: "S.No", headerName: "S.No" },
  { field: "taskName", headerName: "Task Name" },
  { field: "Type", headerName: "Type" },
  { field: "Assign to", headerName: "Assign to" },
  { field: "Due Date", headerName: "Due Date" },
  { field: "Priority", headerName: "Priority" },
  { field: "Action", headerName: "Action" },
];

export const getPriorityColor = (priority) => {
  let color;
  switch (priority) {
    case "High":
      color = "red";
      break;
    case "Normal":
      color = "orange";
      break;
    case "Low":
      color = "green";
      break;
    default:
      color = "black";
  }

  return {
    color,
    fontWeight: "bold",
  };
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

const TaskTableDashBoard = ({
  tableData = [],
  loading = false,
  selectedTab,
  payload,
}) => {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuRowData, setMenuRowData] = useState(null);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const handleSendEmail = () => {
    setOpenEmailModal(true);
    setModal(null);
    setMenuAnchorEl(null);
  };
  const renderPriorityComponent = (row, onClose) => {
    const handleOptionClick = (option) => {
      if (option === "Mark as completed") {
        const taskPayload = {
          taskId: menuRowData?.taskId,
          description: menuRowData?.taskName,
          status: "COMPLETED",
          priority: menuRowData?.priority?.toUpperCase(),
          assignedTo: menuRowData?.assignee?.id,
        };
        console.log("!@#$%^&*:", payload);
        payload(taskPayload);
      }
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
          View details
        </StyledMenuItem>

        <StyledMenuItem onClick={handleSendEmail}>Send Email</StyledMenuItem>
        {selectedTab == "active" && (
          <StyledMenuItem
            onClick={() => handleOptionClick("Mark as completed")}
          >
            Mark as completed
          </StyledMenuItem>
        )}
      </>
    );
  };

  const [showAll, setShowAll] = useState(false);
  const handleMenuOpen = (event, row) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setMenuRowData(row);
  };
  const sliceTableData = Array.isArray(tableData) ? tableData : [];
  const displayedTasks = showAll ? sliceTableData : sliceTableData.slice(0, 4);
  const handleMenuAnchorClose = () => {
    setMenuAnchorEl(null);
    setMenuRowData(null);
  };
  const onclose = () => {};

  const handleRouteViewTasks = () => {
    navigate("/tasks");
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
                  <TableRow style={cellStyle} key={row.id || index}>
                    <TableCell sx={firstCellStyle}>{index + 1}</TableCell>
                    <TableCell>{truncateText(row.taskName, 20)}</TableCell>
                    <TableCell sx={boldTextStyle}>{row.type}</TableCell>
                    <TableCell>
                      {truncateText(row?.assignee?.name ?? "-")}
                    </TableCell>
                    <TableCell>{dateText(row.dueDate)}</TableCell>
                    <TableCell sx={getPriorityColor(row.priority)}>
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
            roleName={viewDetails?.assignee?.name}
            role="Property Manager Name"
            type="GRT"
            number="+1 432 567 987"
            handleSendEmail={handleSendEmail}
            onClose={() => setModal(null)}
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
          <Button variant="text" color="primary" onClick={handleRouteViewTasks}>
            See all Tasks
          </Button>
        </Box>
      )}
      <EmailModal open={openEmailModal} setOpen={setOpenEmailModal} />
    </Box>
  );
};

export default TaskTableDashBoard;
