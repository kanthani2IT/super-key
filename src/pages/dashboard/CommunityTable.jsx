import { MoreVert, SwapVert } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import AppMenu from "components/AppComponents/AppMenu";
import AppTable from "components/AppComponents/AppTable";
import AppTableSearch from "components/AppComponents/AppTableSearch";
import { getStatus } from "components/AppComponents/CustomField";
import { StyledMenuItem } from "components/AppComponents/StyledComponent";
import { communityStyles } from "components/StyledComponents";
import { useState } from "react";

const options = [
  { value: "active", label: "Status:Active" },
  { value: "inActive", label: "Status:Inactive" },
  { value: "highToLow", label: "Insured Value:High to Low" },
  { value: "lowToHigh", label: "Insured value:Low to High" },
];

const rows = [
  {
    id: 1,
    name: "Desert Springs",
    propertyManager: "Sarah Johnson",
    claims: 3,
    insured: "$200,000",
    status: 1,
  },
  {
    id: 2,
    name: "Rose Dale",
    propertyManager: "Micheal lee",
    claims: 2,
    insured: "$200,000",
    status: 0,
  },
  {
    id: 3,
    name: "Prestige",
    propertyManager: "Emily Davis",
    claims: 1,
    insured: "$200,000",
    status: 1,
  },
  {
    id: 4,
    name: "Oak Ridge Estates",
    propertyManager: "David Kim",
    claims: 2,
    insured: "$200,000",
    status: 0,
  },
  {
    id: 5,
    name: "Mountain Vista",
    propertyManager: "",
    claims: 3,
    insured: "$200,000",
    status: 1,
  },
  {
    id: 6,
    name: "Willow Creek",
    propertyManager: "Christopher Allen",
    claims: 1,
    insured: "$200,000",
    status: 1,
  },
  {
    id: 7,
    name: "Uptown Plazza",
    propertyManager: "Ashley Tailor",
    claims: 1,
    insured: "$200,000",
    status: 0,
  },
  {
    id: 8,
    name: "Farmland Estates",
    propertyManager: "Ethen Carter",
    claims: 2,
    insured: "$200,000",
    status: 0,
  },
  {
    id: 9,
    name: "Rv Park",
    propertyManager: "Olivia Harris",
    claims: 2,
    insured: "$200,000",
    status: 1,
  },
  {
    id: 10,
    name: "Tech Campus Housing",
    propertyManager: "Samuel Wilson",
    claims: 2,
    insured: "$200,000",
    status: 1,
  },
];

export default function UserTable({
  isLoading,
  height = 400,
  onSelectionChange,
  communityList,
  openPopup,
  handleOffBoard,
  Id,
  setId,
}) {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;
  const [selectedValue, setSelectedValue] = useState("");
  // const [communittyId, setCommunityId] = useState("");

  const columns = [
    {
      field: "index",
      headerName: "S.No",
      headerClassName: "bold-header",
    },
    {
      field: "name",
      headerName: "Community Name",
      flex: 1,
    },
    {
      field: "communityManager",
      headerName: "Community Manager",
    },
    {
      field: "propertyManager",
      headerName: "Property Manager",
    },
    {
      field: "insured",
      headerName: "Insured",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
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
              setMenuAnchorEl(e.currentTarget);
              setId(row?.communityId);
            }}
            color="secondary"
          />
        </IconButton>
      ),
    },
  ];

  const handleChangePage = (event, newPage) => setPage(newPage);
  const filteredRows = communityList?.content?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  console.log(filteredRows);
  // const paginatedRows = filteredRows.slice(
  //   (page - 1) * pageSize,
  //   page * pageSize
  // );

  const handleSort = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAnchorClose = () => {
    setMenuAnchorEl(null);
  };

  const handleChangeRadio = (e) => {
    setSelectedValue(e.target.value);
  };

  const renderSortComponent = () => {
    return (
      <FormControl sx={{ m: 1 }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          name="radio-buttons-group"
          value={selectedValue}
          onChange={handleChangeRadio}
        >
          {options.map(({ value, label }) => (
            // <StyledMenuItem sx={{ padding: "0", margin: "0" }}>
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={label}
              sx={{
                borderRadius: "10px",
                pl: 1,
                pr: 1,
                m: 1,
                width: "90%",
                backgroundColor:
                  selectedValue === value
                    ? theme.palette.blue[100]
                    : "transparent",
              }}
            />
            // </StyledMenuItem>
          ))}
        </RadioGroup>
      </FormControl>
    );
  };
  const handleDrawer = () => {
    handleMenuAnchorClose();
    openPopup(Id);
  };
  const renderMenuComponent = () => {
    return (
      <>
        <StyledMenuItem onClick={handleDrawer}>View details</StyledMenuItem>
        <StyledMenuItem onClick={handleOffBoard}>
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
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
          rows={filteredRows || []}
          getStatus={getStatus}
          customStyles={{ claims: communityStyles.claims }}
          onSelectionChange={onSelectionChange}
          currentPage={page}
          totalItems={filteredRows?.length}
          pageSize={pageSize}
          onPageChange={handleChangePage}
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
    </Box>
  );
}
