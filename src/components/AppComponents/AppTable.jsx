import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import noData from "assets/images/icons/noData.svg";
import { BoldTypographyHeader, Image } from "components/StyledComponents";
import AppPagination from "./AppPagination";
import AppSkeleton from "./AppSkeleton";
const AppTable = ({
  isLoading,
  columns,
  rows,
  rowKey = "id",
  getStatus,
  customStyles = {},
  onSelectionChange,
  noDataText = "No Data Found",
  currentPage = 1,
  totalItems,
  pageSize,
  onPageChange,
  selected = [],
  rowSecondKey = "id",
  selectedData = null,
  offboardData,
}) => {
  const rowCount = rows.length;
  const numSelected = selected.length;

  const onSelectAllClick = (event) => {
    console.log(event, "event target");
    const newSelected = event.target.checked
      ? rows.map((row) => row[rowKey])
      : [];

    onSelectionChange?.(newSelected);

    if (event.target.checked) {
      // Extract the result based on matching communityId and mapping the managerId
      const result = newSelected
        ?.map((communityId) => {
          const community = rows.find(
            (item) => item.communityId === communityId
          );
          if (community && community?.communityManager?.managerId) {
            return {
              cmcId:
                community?.communityManager?.managerId || "001bn00001CitW2AAJ",
              communityId: communityId,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      selectedData([...offboardData, ...result]);
    } else {
      const currentPageData = rows.map((row) => row[rowKey]);
      const filteredData = offboardData.filter(
        (item) => !currentPageData.includes(item.communityId)
      );
      selectedData([]);
      console.log(
        filteredData,
        offboardData,
        currentPageData,
        "first method correction"
      );
    }
    console.log(newSelected, "$$$ newSelected");
  };

  const handleRowClick = (id, secondId) => {
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

    onSelectionChange?.(newSelected);
    if (selectedData) {
      let isAlreadySelectedData = offboardData.find(
        (item) => item.communityId == id
      );
      if (isAlreadySelectedData) {
        const filteredData = offboardData.filter(
          (item) => item.communityId !== id
        );
        selectedData(filteredData);
        console.log(offboardData, selectedIndex, "$$$ data");
      } else {
        let data = {
          cmcId: secondId,
          communityId: id,
        };
        selectedData([...offboardData, data]);
      }
    }
  };

  return (
    <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="success"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
            {columns.map((col, index) => (
              <TableCell key={col.field} align={index > 1 ? "center" : "left"}>
                <BoldTypographyHeader>{col.headerName}</BoldTypographyHeader>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns?.length + 1}>
                <AppSkeleton
                  variant="rounded"
                  height={50}
                  animation="wave"
                  row={6}
                  gap={2}
                />
              </TableCell>
            </TableRow>
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
                      onClick={() =>
                        handleRowClick(
                          row[rowKey],
                          row[`communityManager`][`managerId`]
                        )
                      }
                    />
                  </TableCell>
                  {columns.map((col, idx) => (
                    <TableCell
                      key={col.field}
                      sx={customStyles[col.field]}
                      align={idx > 1 ? "center" : "left"}
                    >
                      {col.renderCell
                        ? col.renderCell(row, index)
                        : col.field === "index"
                          ? index + 1
                          : col.field === "status" && col.getStatus
                            ? col.getStatus(row)
                            : !row?.[col.field] || row?.[col.field] == "null"
                              ? "-"
                              : row?.[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                <Box sx={{ py: 2 }}>
                  <Image width={"40%"} height={"10%"} src={noData} />
                </Box>
                <Typography variant="body1" color="textSecondary">
                  {noDataText}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {totalItems ? (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="right">
                <AppPagination
                  pageSize={pageSize}
                  currentPage={currentPage}
                  totalItems={totalItems}
                  onPageChange={onPageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default AppTable;
