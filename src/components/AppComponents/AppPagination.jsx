import React from 'react';
import { Box, Pagination } from '@mui/material';
import { communityStyles } from 'components/StyledComponents';

const AppPagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  showCount = true
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <Box sx={communityStyles.paginationContainer}>
      {showCount && (
        <span style={communityStyles.text}>
          Showing {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
        </span>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        shape="rounded"
        variant='outlined'
        color='success'
        sx={communityStyles.pagination}
      />
    </Box>
  );
};

export default AppPagination;
