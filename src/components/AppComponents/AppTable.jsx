import React, { useState } from 'react';
import { Box, Checkbox, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { BoldTypographyHeader, communityStyles } from 'components/StyledComponents';
import CircularLoader from 'components/CircularLoader';
import AppSkeleton from './AppSkeleton';
import AppPagination from './AppPagination';

const AppTable = ({ isLoading, columns, rows, rowKey = 'id', getStatus, customStyles = {}, onSelectionChange, noDataText = 'No Data Found', currentPage, totalItems, pageSize, onPageChange }) => {
  const [selected, setSelected] = useState([]);


  const rowCount = rows.length;
  const numSelected = selected.length;


  const onSelectAllClick = (event) => {
    const newSelected = event.target.checked ? rows.map((row) => row[rowKey]) : [];
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleRowClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };
  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox
                color="success"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}

              />
            </TableCell>
            {columns.map((col, index) => (
              <TableCell key={col.field} align={index > 1 ? 'center' : 'left'} >
                <BoldTypographyHeader>{col.headerName}</BoldTypographyHeader>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell colSpan={columns?.length + 1}>
                  <AppSkeleton
                    variant="rounded"
                    height={30}
                    animation="wave"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : rows.length > 0 ? (
            rows.map((row, index) => {
              const isSelected = selected.indexOf(row[rowKey]) !== -1;
              return (
                <TableRow
                  key={row[rowKey]}
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="success"
                      padding="0px"
                      checked={isSelected}
                      onClick={() => handleRowClick(row[rowKey])}


                    />
                  </TableCell>
                  {columns.map((col, idx) => (
                    <TableCell key={col.field} sx={customStyles[col.field]} align={idx > 1 ? 'center' : 'left'}>
                      {col.renderCell
                        ? col.renderCell(row)
                        : col.field === "index"
                          ? index + 1
                          : col.field === "status" && col.getStatus
                            ? col.getStatus(row)
                            : row[col.field] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                <Box sx={{ py: 2 }}>
                  <Typography variant="body1" color="textSecondary">
                    {noDataText}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {totalItems && <AppPagination pageSize={pageSize} currentPage={currentPage} totalItems={totalItems} onPageChange={onPageChange} />}
    </TableContainer>
  );
};

export default AppTable;
