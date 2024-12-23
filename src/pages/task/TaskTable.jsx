import { MoreVert } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import EmailModal from "components/AppComponents/AppEmailModal";
import AppMenu from "components/AppComponents/AppMenu";
import AppTable from "components/AppComponents/AppTable";
import AppTableSearch from "components/AppComponents/AppTableSearch";
import AppTaskCard from "components/AppComponents/AppTaskCard";
import { getStatus } from "components/AppComponents/CustomField";
import FilterDrawer from "components/CustomPopup";
import { communityStyles, StyledMenuItem } from "components/StyledComponents";
import { useMarkTaskAsCompleted } from "hooks/useDropDown";
import { getPriorityColor } from "pages/dashboard/TaskTableDashBoard";
import { useRef, useState } from "react";
import { dateText, truncateText } from "utils/helpers";

export default function TaskTable({
  isLoading,
  height = 400,
  onSelectionChange,
  taskList = [],
  filters,
  handleSearch,
  handleChangePage,
  page,
  selectedRows = [],
  setFilterData,
  filterColumns,
  selectedTab,
  setSelectedTab,
  filterData,
  fetchTaskData,
  status,
  searchTerm,
  setSearchTerm,
}) {
  const anchorRef = useRef(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const [modal, setModal] = useState(null);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [row, setRow] = useState({});
  const successHandler = () => {
    fetchTaskData();
  };
  const { mutate: updateTaskComplete, isLoading: isCompleting } =
    useMarkTaskAsCompleted(successHandler);

  const pageSize = 10;
  const boldTextStyle = {
    fontWeight: 700,
    color: "#323C4D",
  };

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
      field: "taskName",
      headerName: "Task Name",
      flex: 1,
      renderCell: (row, indx) => {
        return <Typography>{truncateText(row?.taskName)}</Typography>;
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      align: "left",
      renderCell: (row, indx) => {
        return (
          <Typography sx={boldTextStyle}>{truncateText(row?.type)}</Typography>
        );
      },
    },
    {
      field: "assignee",
      headerName: "Assigned to",
      flex: 1,
      align: "left",
      renderCell: (row) => {
        return <Typography>{truncateText(row?.assignee?.name)}</Typography>;
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
      align: "left",
      renderCell: (row) => {
        return <Typography>{dateText(row?.dueDate)}</Typography>;
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      align: "left",
      renderCell: (row, indx) => {
        return (
          <Typography sx={{ color: getPriorityColor(row.priority) }}>
            {row?.priority}
          </Typography>
        );
      },
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
    //           {/* <FiberManualRecordIcon fontSize="12px" /> */}
    //           {row?.status}
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
              setRow(row);
            }}
            color="secondary"
          />
        </IconButton>
      ),
    },
  ];

  const filteredRows = taskList?.content?.length
    ? taskList?.content?.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];
  const flatRows = filteredRows?.map((row) => ({
    ...row,
  }));
  const paginatedRows =
    flatRows && flatRows?.slice((page - 1) * pageSize, page * pageSize);

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
      <>
        <Button
          variant="outlined"
          color="black"
          endIcon={<FilterAltIcon sx={{ width: "22px", height: "24px" }} />}
          sx={{
            height: "42px",
            borderRadius: "10px",
            borderWidth: "0.5px",
            borderColor: "#000",
            fontSize: "16px",
            fontWeight: "500",
            "&:hover": { backgroundColor: "#E9F3FF" },
          }}
        >
          {" "}
          {"Filter"}{" "}
        </Button>
      </>
    );
  };

  const onHandleComplete = () => {
    updateTaskComplete({
      id: row?.taskId,
    });
  };
  const renderPriorityComponent = (e, row) => {
    return (
      <>
        <StyledMenuItem
          onClick={(e) => {
            setModal(e.currentTarget);
            // setMenuAnchorEl(null);
          }}
          ref={anchorRef}
        >
          View details
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => {
            setMenuAnchorEl(null);
            setOpenEmailModal(true);
          }}
        >
          Send EMail
        </StyledMenuItem>
        {status == "active" && (
          <StyledMenuItem onClick={onHandleComplete}>
            Mark as completed
          </StyledMenuItem>
        )}
      </>
    );
  };
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const onClose = () => {
    setModal(null);
    setOpenEmailModal(true);
  };
  return (
    <Box sx={communityStyles.container(height)}>
      <>
        <AppTableSearch
          placeholder="Search Task"
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          icons={[
            {
              component: <PriorityFilter />,
              onClick: (e) => handleClick(e),
              IconButton: true,
            },
            // {
            //   component: <SwapVert />,
            //   onClick: (e) => handleSort(e),
            // },
          ]}
        />

        <FilterDrawer
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          filterColumns={filterColumns}
          setFilterData={setFilterData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          filterData={filterData}
        />
        <AppTable
          hasCheckBox={false}
          rowKey="taskId"
          isLoading={isLoading}
          columns={columns}
          rows={paginatedRows || []}
          getStatus={getStatus}
          onSelectionChange={onSelectionChange}
          currentPage={page}
          totalItems={flatRows?.length}
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
        anchorEl={modal}
        handleClose={() => setModal(null)}
        renderComponent={
          <AppTaskCard
            roleName={row?.assignee?.name}
            role="Property Manager Name"
            type={row?.community?.name}
            number= {row?.assignee?.phone || "1234567890"}
            onClose={() => setModal(null)}
            handleSendEmail={onClose}
            thisEmail={row?.assignee?.email || "example@example.com"}
          />
        }
        borderRadius={"20px"}
        // width={"20vw"}
      />

      <EmailModal open={openEmailModal} setOpen={setOpenEmailModal} />
      <AppMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuAnchorClose}
        renderComponent={renderPriorityComponent()}
      />
    </Box>
  );
}
