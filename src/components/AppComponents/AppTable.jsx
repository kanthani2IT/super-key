import React, { useState } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BoldTypographyHeader } from 'components/StyledComponents';

const AppTable = ({ columns, rows, rowKey = 'id', getStatus, customStyles = {}, onSelectionChange }) => {
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
      <Table aria-label="common table">
        <TableHead>
          <TableRow>
          <TableCell sx={{position: "unset !important"}}>
          <Checkbox
            color="#1A9A5C"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all rows',
            }}
            padding='0px'
            sx={{
              padding:'0px',
              '&.Mui-checked': {
                color: '#1A9A5C',
                padding:'0px'
              },
            }}
          />
        </TableCell>
            {columns.map((col) => (
              <TableCell key={col.field} sx={{position: "unset !important",textTransform: 'none'}}>
                <BoldTypographyHeader>{col.headerName}</BoldTypographyHeader>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => {
            const isSelected = selected.indexOf(row[rowKey]) !== -1;
            return (
              <TableRow
                key={row[rowKey]}
                hover
                role="checkbox"
                aria-checked={isSelected}
                selected={isSelected}
                onClick={() => handleRowClick(row[rowKey])}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    padding='0px'
                    checked={isSelected}
                    sx={{
                      padding:'0px',
                      '&.Mui-checked': {  
                        color: '#1A9A5C',
                      },
                    }}
                    inputProps={{
                      'aria-labelledby': `checkbox-${row[rowKey]}`,
                    }}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.field} sx={customStyles[col.field]}>
                     {col.renderCell
                      ? col.renderCell(row) 
                      : col.field === 'status' && getStatus
                      ? getStatus(row)
                      : row[col.field] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppTable;
