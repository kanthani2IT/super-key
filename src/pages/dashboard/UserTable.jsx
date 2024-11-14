import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetUsers } from 'hooks/useOnboard';
import Button from 'themes/overrides/Button';
import { StyledButton } from './TaskTable';
import { Typography } from '@mui/material';
import Loader from 'components/Loader';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 250, renderCell: (data) =>
      <b>{data.row.id}</b>
  },
  {
    field: 'name', headerName: 'Name', width: 300, renderCell: (data) =>
      <b>{data.row.name}</b>
  },
  {
    field: 'email', headerName: 'Email ID', width: 300, renderCell: (data) =>
      <b>{data.row.email}</b>
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
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

export default function UserTable({ tableData, isLoading }) {
  console.log(isLoading)
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      {isLoading ? <Loader /> :
        <DataGrid
          rows={tableData || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />}
    </Paper>
  );
}
