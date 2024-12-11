import { MoreVert, RadioButtonChecked, RadioButtonUnchecked, SwapVert } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import ConfirmationModal from "components/AppComponents/AppConfirmationModal";
import AppMenu from "components/AppComponents/AppMenu";
import AppTable from "components/AppComponents/AppTable";
import AppTableSearch from "components/AppComponents/AppTableSearch";
import { getStatus } from "components/AppComponents/CustomField";
import { communityStyles, StyledMenuItem } from "components/StyledComponents";
import { formatAsDollar } from "pages/community/onboarding/utils";
import { useState } from "react";

const options = [
  { value: "ACTIVE", label: "Status: Active" },
  { value: "INACTIVE", label: "Status: Inactive" },
  { value: "highToLow", label: "Insured Value: High to Low" },
  { value: "lowToHigh", label: "Insured value: Low to High" },
];

const tableData = [{
  communityId: 1,
  name: "Community 1",
  communityManagerName: "John Doe",
  propertyManagerName: "Jane Doe",
  insuredCoverage: 100000,
  status: "ACTIVE",
},
{
  communityId: 2,
  name: "Community 1",
  communityManagerName: "John Doe",
  propertyManagerName: "Jane Doe",
  insuredCoverage: 100000,
  status: "ACTIVE",
},{
  communityId: 3,
  name: "Community 1",
  communityManagerName: "John Doe",
  propertyManagerName: "Jane Doe",
  insuredCoverage: 100000,
  status: "ACTIVE",
}]
export default function UserTable({
  isLoading,
  height = 400,
  onSelectionChange,
  communityList,
  openPopup,
  handleOffBoard,
  communityInfo,
  setCommunityInfo,
  filters,
  handleChangeRadio,
  handleSearch,
  handleChangePage,
  page,
  setPage,
  selectedRows
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false)

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
      headerName: "Community Name",
      flex: 1,
    },
    {
      field: `communityManagerName`,
      headerName: "Community Manager",
    },
    {
      field: "propertyManagerName",
      headerName: "Property Manager",
    },
    //Future use
    // {
    //   field: "claims",
    //   headerName: "Claims",
    //   renderCell: (row) => {
    //     return <Typography color="success">{row?.claims}</Typography>;
    //   },
    // },
    {
      field: "insuredCoverage",
      headerName: "Insured",
      renderCell: (row) => {
        return <Typography>{formatAsDollar(row?.insuredCoverage) ?? "-"}</Typography>;
      },
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
              <FiberManualRecordIcon fontSize="12px" />
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
            onClick={(e) => {
              e.stopPropagation();
              onSelectionChange([])
              setMenuAnchorEl(e.currentTarget);
              setCommunityInfo(row);
            }}
            color="secondary"
          />
        </IconButton>
      ),
    },
  ];

  const filteredRows = communityList?.content?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Flatten the rows
  const flatRows = filteredRows?.map((row) => ({
    ...row,
    communityManagerName: row.communityManager?.username || "",
    propertyManagerName: row.propertyManager?.username || "",
  }));

  const handleSort = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAnchorClose = () => {
    setMenuAnchorEl(null);
  };
  const handleModal = () => {
    setModal(!modal);
  };


  const renderSortComponent = () => {
    return (
      <FormControl >

        {options?.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Checkbox
              icon={<RadioButtonUnchecked />}
              checkedIcon={<RadioButtonChecked />}
              checked={filters?.sort == value}
              onChange={() => handleChangeRadio(value)}
            />}
            label={label}
            sx={{
              borderRadius: "10px",
              px: 1,
              m: 1,
              width: "90%",
              backgroundColor:
                filters?.sort === value
                  ? theme.palette.blue[100]
                  : "transparent",
            }}
          />
        ))}
      </FormControl>
    );
  };
  const handleDrawer = () => {
    handleMenuAnchorClose();
    openPopup(communityInfo);
  };
  const renderMenuComponent = () => {
    return (
      <>
        <StyledMenuItem onClick={handleDrawer}>View details</StyledMenuItem>
        <StyledMenuItem onClick={handleModal}>
          Off-board Community
        </StyledMenuItem>
      </>
    );
  };

  return (
    <Box sx={communityStyles.container(height)}>
      <>
        <AppTableSearch
          placeholder="Search Documents"
          searchTerm={filters.search}
          onSearchChange={handleSearch}
          icons={[
            {
              component: <SwapVert />,
              onClick: (e) => handleSort(e),
            },
          ]}
        />

        <AppTable
          rowKey="communityId"
          isLoading={isLoading}
          columns={columns}
          rows={tableData || []}
          getStatus={getStatus}
          onSelectionChange={onSelectionChange}
          currentPage={page}
          totalItems={communityList?.totalElements}
          pageSize={pageSize}
          onPageChange={handleChangePage}
          selected={selectedRows}
        />
      </>

      <AppMenu
        anchorEl={menuAnchorEl}
        handleClose={handleMenuAnchorClose}
        renderComponent={renderMenuComponent()}
      />
      <AppMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        renderComponent={renderSortComponent()}
      />

      <ConfirmationModal
        open={modal}
        onClose={handleModal}
        message={
          "Do you want to off-board the community?"

        }
        confirmLabel={"Yes"}
        cancelLabel={"No"}
        onConfirm={handleModal}
        onCancel={handleModal}
      />
    </Box>
  );
}
