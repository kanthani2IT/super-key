import { Box, Chip, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "assets/images/icons/CommunityIcons/DeleteIcon";
import PreviewIcon from "assets/images/icons/CommunityIcons/PreviewIcon";
import AppAutoComplete from "components/AppComponents/AppAutoComplete";
import AppDialogBox from "components/AppComponents/AppDialogBox";
import AppCustomButton from "components/AppComponents/Button";
import CustomUploadTable from "components/AppComponents/CustomUploadTable";
import { StyledBulkTextField } from "components/AppComponents/StyledComponent";
import {
  useCommunityManagersQuery,
  usePropertyManagersQuery,
} from "hooks/useDropDown";
import { useMemo, useState } from "react";

const pageSize = 5;
const UploadCommunityList = ({
  bulkUploadValues,
  setBulkUploadFieldValue,
  handleBulkUploadBlur,
  handleBulkUploadChange,
  handleBulkUploadSubmit,
  bulkUploadError,
  bulkUploadTouched,
  isBulkUploadValid,
  setBulkUploadValues,
  handleApplyAutoValidation,
  bulkUploadFormSubmit,
}) => {
  const theme = useTheme();
  const {
    fileData,
    editedList,
    draftData,
    fileCount,
    isPagination,
    errorResponse,
  } = bulkUploadValues ?? {};
  const { draftDataCount, uploadDataCount } = fileCount ?? {};
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const { data: communityManagerList } = useCommunityManagersQuery();
  const { data: propertyManagerList } = usePropertyManagersQuery();

  const paginatedData = useMemo(() => {
    if (!isPagination) {
      // if is false
      return fileData;
    } else {
      return fileData?.slice((page - 1) * pageSize, page * pageSize);
    }
  }, [page, pageSize, fileData, isPagination]);

  const columns = [
    {
      field: "communityName",
      headerName: "Community Name",
      flex: 1,
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              variant="outlined"
              value={editedList?.[row?.index]?.communityName}
              name={`editedList[${row.index}].communityName`}
              onChange={handleBulkUploadChange}
              onBlur={handleBulkUploadBlur}
              error={
                Boolean(
                  bulkUploadError?.editedList?.[row?.index]?.communityName
                ) && bulkUploadTouched?.editedList?.[row?.index]?.communityName
              }
              helperText={
                bulkUploadTouched?.editedList?.[row?.index]?.communityName &&
                bulkUploadError?.editedList?.[row?.index]?.communityName
              }
            />
          );
        } else {
          return (
            <Typography fontWeight={600} color="black">
              {row?.communityName}
            </Typography>
          );
        }
      },
    },
    {
      field: "communityEmail",
      headerName: "Community Email",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              variant="outlined"
              value={editedList?.[row?.index]?.communityEmail}
              name={`editedList[${row.index}].communityEmail`}
              onChange={handleBulkUploadChange}
              onBlur={handleBulkUploadBlur}
              error={
                Boolean(
                  bulkUploadError?.editedList?.[row?.index]?.communityEmail
                ) && bulkUploadTouched?.editedList?.[row?.index]?.communityEmail
              }
              helperText={
                bulkUploadTouched?.editedList?.[row?.index]?.communityEmail &&
                bulkUploadError?.editedList?.[row?.index]?.communityEmail
              }
            />
          );
        } else {
          return <Typography>{row?.communityEmail}</Typography>;
        }
      },
    },
    {
      field: "communityManagerName",
      headerName: "Community Manager Name",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <AppAutoComplete
              name={`editedList[${row.index}].communityManagerName`}
              freeSolo={false}
              error={
                bulkUploadTouched?.editedList?.[row?.index]
                  ?.communityManagerName &&
                bulkUploadError?.editedList?.[row?.index]?.communityManagerName
              }
              onChange={handleChangeDropDown}
              nameParam="username"
              valueParam="managerId"
              searchKey="communityManager"
              value={editedList?.[row?.index]?.communityManagerName || ""}
              options={communityManagerList?.data}
              onBlur={handleBulkUploadBlur}
              placeholder="Select Manager"
              size="medium"
            />
          );
        } else {
          return <Typography>{row?.communityManagerName?.username}</Typography>;
        }
      },
    },

    {
      field: "propertyManagerName",
      headerName: "Property Manager Name",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <AppAutoComplete
              name={`editedList[${row.index}].propertyManagerName`}
              freeSolo={false}
              onChange={handleChangeDropDown}
              nameParam="username"
              valueParam="managerId"
              searchKey="propertyManager"
              value={editedList?.[row?.index]?.propertyManagerName || ""}
              options={propertyManagerList?.data}
              placeholder="Select Manager"
              onBlur={handleBulkUploadBlur}
              error={
                bulkUploadTouched?.editedList?.[row?.index]
                  ?.propertyManagerName &&
                bulkUploadError?.editedList?.[row?.index]?.propertyManagerName
              }
              size="medium"
            />
          );
        } else {
          return <Typography>{row?.propertyManagerName?.username}</Typography>;
        }
      },
    },
    {
      field: "address",
      headerName: "Address (Address,City,StateCode, ZipCode, Country)",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              variant="outlined"
              value={editedList?.[row?.index]?.address}
              name={`editedList[${row.index}].address`}
              onChange={handleBulkUploadChange}
              onBlur={handleBulkUploadBlur}
              error={
                Boolean(bulkUploadError?.editedList?.[row?.index]?.address) &&
                bulkUploadTouched?.editedList?.[row?.index]?.address
              }
              helperText={
                bulkUploadTouched?.editedList?.[row?.index]?.address &&
                bulkUploadError?.editedList?.[row?.index]?.address
              }
            />
          );
        } else {
          return <Typography>{row?.address}</Typography>;
        }
      },
    },
    {
      field: "action",
      headerName: "",
      renderActionComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <AppCustomButton
                variant="contained"
                onClick={() => handleSave(row, index)} // SAVE ROW LOGIC
              >
                Save
              </AppCustomButton>
              {isPagination ? (
                <AppCustomButton
                  variant="outlined"
                  onClick={() => handleCancel(row, index)} // CANCEL ROW LOGIC
                >
                  Cancel
                </AppCustomButton>
              ) : null}
            </Box>
          );
        } else {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => handleEdit(row, index)}>
                <PreviewIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(row, index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        }
      },
    },
  ];

  const handleChangeDropDown = (event) => {
    const { value, name } = event.target;
    setBulkUploadFieldValue(name, value);
  };

  const handleEdit = (row) => {
    const mapEditData = [...editedList, row]; // TO SET EDIT LIST DATA
    const mapTableData = fileData?.map((item, idx) => {
      // TO SET TABLE DATA
      if (row?.documentId === item?.documentId) {
        return {
          ...item,
          isEdit: true,
          index: mapEditData?.findIndex(
            (el) => el.documentId === item?.documentId
          ),
        };
      } else return item;
    });
    setBulkUploadFieldValue("editedList", mapEditData);
    setBulkUploadFieldValue("fileData", mapTableData);
  };

  const handleDelete = (row) => {
    // DELETE CURRENT ROW
    setCurrentRow(row);
    setOpen(true);
  };

  const handleSave = async (row) => {
    const findEditData = editedList?.find(
      (el) => el?.documentId === row?.documentId
    );
    const valid = checkManualValidation(findEditData); // CHECK MANUAL VALIDATION
    if (isBulkUploadValid || valid) {
      const filterEditedList = editedList?.filter(
        (el) => el?.documentId !== row?.documentId
      );
      const mapTableData = fileData?.map((item, idx) => {
        if (row?.documentId === item?.documentId) {
          return {
            ...item,
            communityName: findEditData?.communityName,
            communityEmail: findEditData?.communityEmail,
            communityManagerName: findEditData?.communityManagerName,
            propertyManagerName: findEditData?.propertyManagerName,
            address: findEditData?.address,
            isEdit: false,
            index: null,
          };
        } else
          return {
            ...item,
            index: filterEditedList?.findIndex(
              (el) => el.documentId === item?.documentId
            ),
          };
      });
      setBulkUploadFieldValue("editedList", filterEditedList);
      setBulkUploadFieldValue("fileData", mapTableData);
    }
  };

  const checkManualValidation = (value) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const newTest = regex.test(value?.communityEmail);
    if (!newTest) return newTest;
    if (
      value?.communityName === null ||
      value?.communityEmail === null ||
      value?.address === null ||
      value?.communityName?.trim()?.length === 0 ||
      value?.communityEmail?.trim()?.length === 0 ||
      value?.communityManagerName === null ||
      value?.propertyManagerName === null ||
      value?.address?.trim()?.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleCancel = (row) => {
    const mapTableData = fileData?.map((item, idx) => {
      if (row?.documentId === item?.documentId) {
        return {
          ...item,
          isEdit: false,
          index: null,
        };
      } else return item;
    });
    const filterEditData = editedList?.filter(
      (el) => el?.documentId !== row?.documentId
    );
    setBulkUploadFieldValue("editedList", filterEditData);
    setBulkUploadFieldValue("fileData", mapTableData);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleCancelPopup = () => {
    setCurrentRow(null);
    setOpen(false);
  };

  const handleDeletePopup = () => {
    const filterRow = fileData?.filter(
      (el) => el?.documentId !== currentRow?.documentId
    );
    if (filterRow.length === 0 && draftData.length > 0) {
      const mapFileData = handleApplyAutoValidation(draftData);
      setBulkUploadValues((prev) => ({
        ...prev,
        fileData: mapFileData,
        editedList: draftData,
        draftData: [],
        isPagination: false,
        fileCount: { draftDataCount: mapFileData?.length, uploadDataCount: 0 },
      }));
    } else {
      setBulkUploadFieldValue("fileData", filterRow);
      if (!isPagination) {
        // TO SET THE FILE COUNT FOR UPLOAD AND DRAFT
        setBulkUploadFieldValue("fileCount", {
          ...fileCount,
          draftDataCount: filterRow?.length,
        });
      } else {
        setBulkUploadFieldValue("fileCount", {
          ...fileCount,
          uploadDataCount: filterRow?.length,
        });
      }
    }
    setOpen(false);
  };

  return (
    <>
      {errorResponse?.length > 0 ? ( // for showing api response message
        <>
          {errorResponse?.map((item) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                p: 1,
                m: 1,
              }}
            >
              <Typography variant="h6">
                <b>Community Name :</b> {item?.communityName}
              </Typography>
              <Typography variant="h6">
                <b>Message :</b> {item?.message}
              </Typography>
              <Chip
                variant="filled"
                color={item?.created ? "success" : "error"}
                label={item?.created ? "True" : "False"}
              />
            </Box>
          ))}
        </>
      ) : (
        //FILE UPLOADED DATA'S
        <>
          <Typography variant="h5" color={theme.palette.text.grey}>
            Uploaded Communities{" "}
            {`(${uploadDataCount}: Uploaded, ${draftDataCount}: Draft)`}
          </Typography>

          {fileData.length > 0 && (
            <CustomUploadTable
              cols={columns} // custom columns
              tableData={paginatedData} // paginated data
              currentPage={page}
              pageSize={pageSize}
              totalItems={fileData?.length}
              handlePageChange={handlePageChange}
              pageDisable={editedList?.length > 0 ? true : false}
              isPagination={isPagination}
            />
          )}
          <AppDialogBox // For deleting record
            open={open}
            handleCancel={handleCancelPopup}
            handleDelete={handleDeletePopup}
          />
        </>
      )}
    </>
  );
};

export default UploadCommunityList;
