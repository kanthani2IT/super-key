import { Box } from '@mui/system';
import Loader from 'components/Loader';
import {communityStyles } from 'components/StyledComponents';
import React, { useState } from 'react';
import { getStatus } from 'components/AppComponents/CustomField';
import AppTable from 'components/AppComponents/AppTable';
import { MoreVert, SwapVert } from '@mui/icons-material';
import AppPagination from 'components/AppComponents/AppPagination';
import AppTableSearch from 'components/AppComponents/AppTableSearch';

const columns = [
  {
    field: 'id', headerName: 'S.No',headerClassName:'bold-header'
  },
  {
    field: 'name', headerName: 'Community Name', flex: 1
  },
  {
    field: 'propertyManager', headerName: 'Community/Property Manager'
  },
  {
    field: 'claims', headerName: 'Claims', flex: 1
  },
  {
    field: 'insured', headerName: 'Insured', flex: 1
  },
  {
    field: 'status',
    headerName: 'Status'
  },
   {
    field: 'action',
    headerName: 'Action',
    renderCell: (row) => (
      <div
        style={{
          display: 'flex',
          paddingLeft: '10px',
          height: '100%', 
        }}
      >
        <MoreVert
          onClick={(e) => {
            e.stopPropagation(); 
            console.log('Edit clicked for row:', row);
          }}
          sx={{
            cursor: 'pointer',
            color: '#858585',
          }}
        />
      </div>
    ),
  },
];

const rows = [
  { id: 1, name: 'Desert Springs', propertyManager: 'Sarah Johnson', claims: 3,insured:'$200,000',status: 1 },
  { id: 2, name: 'Rose Dale', propertyManager: 'Micheal lee', claims: 2,insured:'$200,000',status: 0 },
  { id: 3, name: 'Prestige', propertyManager: 'Emily Davis', claims: 1,insured:'$200,000',status: 1 },
  { id: 4, name: 'Oak Ridge Estates', propertyManager: 'David Kim', claims: 2,insured:'$200,000',status: 0 },
  { id: 5, name: 'Mountain Vista', propertyManager: '', claims: 3,insured:'$200,000',status: 1 },
  { id: 6, name: 'Willow Creek', propertyManager: 'Christopher Allen', claims: 1,insured:'$200,000',status: 1 },
  { id: 7, name: 'Uptown Plazza', propertyManager: 'Ashley Tailor', claims: 1,insured:'$200,000',status: 0 },
  { id: 8, name: 'Farmland Estates', propertyManager: 'Ethen Carter', claims: 2,insured:'$200,000',status: 0 },
  { id: 9, name: 'Rv Park', propertyManager: 'Olivia Harris', claims: 2,insured:'$200,000',status: 1 },
  { id: 10, name: 'Tech Campus Housing', propertyManager: 'Samuel Wilson', claims: 2,insured:'$200,000',status: 1 },
];


export default function UserTable({ isLoading, height = 400, onSelectionChange }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 10;

  const handleChangePage = (event, newPage) => setPage(newPage);


  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const paginatedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Box sx={communityStyles.container(height)}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
               <AppTableSearch
            placeholder="Search Documents"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            icons={[
              {
                component: <SwapVert />,
                onClick: () => console.log('Sort clicked'),
              },
            ]}
          />
          {paginatedRows.length === 0 ? (
            <Box sx={communityStyles.noData}>No Communities Found</Box>
          ) : (
            <>
             <AppTable
              columns={columns}
              rows={paginatedRows}
              getStatus={getStatus}
              customStyles={{ claims: communityStyles.claims }}
              onSelectionChange={onSelectionChange}

            />
<AppPagination
                currentPage={page}
                totalItems={filteredRows.length}
                pageSize={pageSize}
                onPageChange={handleChangePage}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
}