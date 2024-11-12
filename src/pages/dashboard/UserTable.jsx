import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetUsers } from 'hooks/useOnboard';
import Button from 'themes/overrides/Button';
import { StyledButton } from './TaskTable';
import { Typography } from '@mui/material';
import Loader from 'components/Loader';

const columns = [
  { field: 'Id', headerName: 'ID', width: 250, renderCell:(data)=>
    <b>{data.row.Id}</b>
  },
  { field: 'Name', headerName: 'Name', width: 300,renderCell:(data)=>
    <b>{data.row.Name}</b> },
  { field: 'Email', headerName: 'Email ID', width: 300,renderCell:(data)=>
    <b>{data.row.Email}</b> },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    headerAlign:"center",
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

export default function UserTable() {
    const {data, isLoading}=useGetUsers()
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
    {isLoading?<Loader/>:
      <DataGrid
        rows={data.data.records||[]}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(row) => row.Id}
        sx={{ border: 0 }}
      />}
    </Paper>
  );
}
