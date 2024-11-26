import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "components/Loader";
import { StyledButton } from "./StyledComponent";

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderCell: (data) => <b>{data?.row?.id ?? data?.row?.Id}</b>,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    renderCell: (data) => <b>{data?.row?.name ?? data?.row?.Name}</b>,
  },
  {
    field: "email",
    headerName: "Email ID",
    flex: 1,
    renderCell: (data) => <b>{data?.row?.email ?? data?.row?.Email}</b>,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 0.4,
    headerAlign: "center",
    sortable: false,
    renderCell: (params) => (
      <StyledButton
        variant="contained"
        color="primary"
        size="small"
        fullWidth
        onClick={() => handleView(params.row)}
      >
        View
      </StyledButton>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UserTable({ tableData, isLoading, height = 400 }) {
  return (
    <Paper sx={{ height, width: "100%", overflow: "auto" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={tableData || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          getRowId={(row) => row?.Id ?? row?.id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
}
