import React from 'react';
import { Box } from '@mui/system';
import Loader from 'components/Loader';
import AppTable from 'components/AppComponents/AppTable';
import AppPagination from 'components/AppComponents/AppPagination';
import AppTableSearch from 'components/AppComponents/AppTableSearch';
import { communityStyles } from 'components/StyledComponents';

const AppTableLayout = ({
  isLoading = false,
  height = 400,
  searchEnabled = true,
  paginationEnabled = true,
  placeholder = 'Search...',
  searchTerm = '',
  onSearchChange = () => {},
  icons = [],
  columns = [],
  rows = [],
  page = 1,
  pageSize = 10,
  onPageChange = () => {},
  customStyles = {},
  getStatus = () => {},
  noDataMessage = 'No Data Found',
}) => {
  const filteredRows = searchEnabled
    ? rows.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : rows;

  const paginatedRows = paginationEnabled
    ? filteredRows.slice((page - 1) * pageSize, page * pageSize)
    : filteredRows;

  return (
    <Box sx={communityStyles.container || { height: `${height}px` }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchEnabled && (
            <AppTableSearch
              placeholder={placeholder}
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              icons={icons}
            />
          )}
          {paginatedRows.length === 0 ? (
            <Box sx={communityStyles.noData || { textAlign: 'center', marginTop: '20px' }}>{noDataMessage}</Box>
          ) : (
            <>
              <AppTable columns={columns} rows={paginatedRows} getStatus={getStatus} customStyles={customStyles} />
              {paginationEnabled && (
                <AppPagination
                  currentPage={page}
                  totalItems={filteredRows.length}
                  pageSize={pageSize}
                  onPageChange={onPageChange}
                  styles={communityStyles.pagination || {}}
                />
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default AppTableLayout;
