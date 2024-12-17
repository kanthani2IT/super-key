import { MoreVert, SwapVert } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Button, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import CopyContentIcon from "assets/images/icons/CopyContent";
import OfficeIcon from "assets/images/icons/OfficeIcon";
import PhoneIcon from "assets/images/icons/PhoneIcon";
import avatar1 from "assets/images/users/avatar-1.png";
import AppCard from "components/AppComponents/AppCard";
import AppGrid from "components/AppComponents/AppGrid";
import AppMenu from "components/AppComponents/AppMenu";
import AppTable from "components/AppComponents/AppTable";
import AppTableSearch from "components/AppComponents/AppTableSearch";
import { getStatus } from "components/AppComponents/CustomField";
import FilterDrawer from "components/CustomPopup";
import { communityStyles, StyledMenuItem } from "components/StyledComponents";
import { useRef, useState } from "react";
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
  page,
  selectedRows = [],
}) {
  const anchorRef = useRef(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(null);

  const [selectedPriority, setSelectedPriority] = useState([
    { name: "High", color: "#E81616" },
    { name: "Medium", color: "#EB6C0B" },
    { name: "Low", color: "#DEC013" },
  ]);
  const [selectedProperty, setSelectedProperties] = useState([
    { id: 1, data: "Desert Springs", selected: false },
    { id: 2, data: "Rose Dale", selected: false },
    { id: 3, data: "Rose Dal", selected: false },
    { id: 4, data: "Oak Ridge Estates", selected: false },
    { id: 5, data: "Mountain Vista", selected: false },
  ]);
  const toggleFilter = (id) => {
    setSelectedProperties((prev) =>
      prev.map((filter) =>
        filter.id === id ? { ...filter, selected: !filter.selected } : filter
      )
    );
  };
  const pageSize = 10;
  console.log(page, "page");
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
      field: "dueDateString",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      align: "center",
      renderCell: (row) => {
        if (row?.status != null && row?.status != "null") {
          return (
            <Typography
              color={row?.status === "ACTIVE" ? "success" : "error"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={0.5}
            >
              {/* <FiberManualRecordIcon fontSize="12px" /> */}
              {row?.status === "ACTIVE" ? "Active" : "Inactive"}
            </Typography>
          );
        } else {
          return "-";
        }
      },
    },
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

  const filteredRows = taskList?.content?.filter((row) =>
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

  const renderPriorityComponent = (e) => {
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
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const Footer = () => {
    return (
      <>
        <Button
          startIcon={<MailIcon />}
          size="large"
          color="info"
          variant="contained"
          fullWidth
        >
          {" "}
          Send Mail
        </Button>
        <CopyContentIcon />
      </>
    );
  };
  const singleViewComponent = () => {
    return (
      <AppCard height={"auto"} footer={<Footer />} width="400px" custom>
        <AppGrid container direction={"column"}>
          <AppGrid>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar
                alt="profile user"
                src={avatar1}
                sx={{ width: 32, height: 32 }}
              />
              <Stack>
                <Typography variant="subtitle2">Richard</Typography>
                <Typography variant="body1" color="text.secondary">
                  Property Manager Name
                </Typography>
              </Stack>
            </Stack>
          </AppGrid>
          <AppGrid>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar
                alt="profile user"
                sx={{ width: 32, height: 32, backgroundColor: "white" }}
              >
                <OfficeIcon />
              </Avatar>

              <Stack>
                <Typography variant="subtitle2">GRT</Typography>
              </Stack>
            </Stack>
          </AppGrid>
          <AppGrid>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar
                alt="profile user"
                sx={{ width: 32, height: 32, backgroundColor: "white" }}
              >
                <PhoneIcon />
              </Avatar>
              <Stack flexDirection={"row"} gap={"20px"}>
                <Typography variant="subtitle2"> +1 432 567 987</Typography>
                <CopyContentIcon />
              </Stack>
            </Stack>
          </AppGrid>
        </AppGrid>
      </AppCard>
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
              onClick: (e) => handleClick(e),
              IconButton: true,
            },
            {
              component: <SwapVert />,
              onClick: (e) => handleSort(e),
            },
          ]}
        />
        <Button
          onClick={(e) => {
            console.log(e.currentTarget, "currentTarget");
            setModal(e.currentTarget);
          }}
          ref={anchorRef}
        >
          View Details
        </Button>
        <FilterDrawer
          selectedProperty={selectedProperty}
          selectedPriority={selectedPriority}
          toggleFilter={toggleFilter}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        <AppTable
          rowKey="taskId"
          isLoading={isLoading}
          columns={columns}
          rows={filteredRows || []}
          getStatus={getStatus}
          onSelectionChange={onSelectionChange}
          currentPage={page}
          totalItems={taskList?.totalElements}
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
        renderComponent={singleViewComponent()}
        borderRadius={"20px"}
      />

      <AppMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuAnchorClose}
        renderComponent={renderPriorityComponent()}
      />
    </Box>
  );
}
