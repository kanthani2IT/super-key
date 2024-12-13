import { ExpandMore, MoreVert, SwapVert } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import AppMenu from "components/AppComponents/AppMenu";
import AppTable from "components/AppComponents/AppTable";
import AppTableSearch from "components/AppComponents/AppTableSearch";
import { getStatus } from "components/AppComponents/CustomField";
import { communityStyles, StyledMenuItem } from "components/StyledComponents";
import { useState } from "react";

const options = [
  { value: "ACTIVE", label: "Status: Active" },
  { value: "INACTIVE", label: "Status: Inactive" },
  { value: "highToLow", label: "Insured Value: High to Low" },
  { value: "lowToHigh", label: "Insured value: Low to High" },
];

export default function TaskTable({
  isLoading,
  height = 400,
  onSelectionChange,
  taskList = [],
  filters,
  handleSearch,
  handleChangePage,
  page = 1,
  selectedRows = [],
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);

  const pageSize = 10;

  const columns = [
    {
      field: "index",
      headerName: "S.No",
      headerClassName: "bold-header",
      renderCell: (row, indx) => {
        return <Typography>{(page - 1) * pageSize + indx + 1}</Typography>;
      },
    },
    {
      field: "name",
      headerName: "Task Name",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "assignedTo",
      headerName: "Assigned to",
      flex: 1,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },

    // {
    //   field: "status",
    //   headerName: "Status",
    //   align: "center",
    //   renderCell: (row) => {
    //     if (row?.status != null && row?.status != "null") {
    //       return (
    //         <Typography
    //           color={row?.status === "ACTIVE" ? "success" : "error"}
    //           display={"flex"}
    //           alignItems={"center"}
    //           justifyContent={"center"}
    //           gap={0.5}
    //         >
    //           <FiberManualRecordIcon fontSize="12px" />
    //           {row?.status === "ACTIVE" ? "Active" : "Inactive"}
    //         </Typography>
    //       );
    //     } else {
    //       return "-";
    //     }
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      renderCell: (row) => (
        <IconButton>
          <MoreVert
            // onClick={(e) => {
            //   e.stopPropagation();
            //   onSelectionChange([]);
            //   setMenuAnchorEl(e.currentTarget);
            // }}
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchorEl(e.currentTarget);
            }}
            color="secondary"
          />
        </IconButton>
      ),
    },
  ];

  const filteredRows = taskList?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleMenuAnchorClose = () => {
    setMenuAnchorEl(null);
  };

  const renderMenuComponent = () => {
    return (
      <>
        <StyledMenuItem onClick={() => console.log("task")}>
          View details
        </StyledMenuItem>
      </>
    );
  };

  const PriorityFilter = () => {
    return (
      <Button
        onClick={(e) => {
          //   e.stopPropagation();
          //   setMenuAnchorEl(e.currentTarget);
        }}
        endIcon={<ExpandMore />}
        variant="outlined"
        size="small"
        color="secondary"
      >
        {" "}
        Priority
      </Button>
    );
  };

  const renderPriorityComponent = () => {
    return (
      <>
        <StyledMenuItem onClick={() => console.log("task")}>
          View details
        </StyledMenuItem>
        <StyledMenuItem onClick={() => console.log("task")}>
          Send EMail
        </StyledMenuItem>
        <StyledMenuItem onClick={() => console.log("task")}>
          Mark as completed
        </StyledMenuItem>
      </>
    );
  };

  return (
    <Box sx={communityStyles.container(height)}>
      <>
        <AppTableSearch
          placeholder="Search Task"
          searchTerm={filters?.search}
          onSearchChange={handleSearch}
          icons={[
            {
              component: <PriorityFilter />,
              // onClick: (e) => handleSort(e),
            },
            {
              component: <SwapVert />,
              onClick: (e) => handleSort(e),
            },
          ]}
        />

        <AppTable
          rowKey="taskId"
          isLoading={isLoading}
          columns={columns}
          rows={filteredRows || []}
          getStatus={getStatus}
          onSelectionChange={onSelectionChange}
          currentPage={page}
          totalItems={taskList?.totalElements || 0}
          pageSize={pageSize}
          onPageChange={handleChangePage}
          selected={selectedRows}
          noDataText="No Task Found"
        />
      </>

      {/* <AppMenu
                anchorEl={menuAnchorEl}
                handleClose={handleMenuAnchorClose}
                renderComponent={renderMenuComponent()}
            /> */}
      <AppMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuAnchorClose}
        renderComponent={renderPriorityComponent()}
      />
    </Box>
  );
}
