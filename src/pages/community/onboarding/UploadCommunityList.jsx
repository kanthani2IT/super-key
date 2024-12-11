import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "assets/images/icons/CommunityIcons/DeleteIcon";
import PreviewIcon from "assets/images/icons/CommunityIcons/PreviewIcon";
import CustomUploadTable from "components/AppComponents/CustomUploadTable";
import { StyledBulkTextField } from "components/AppComponents/StyledComponent";

const pageSize = 5;
const UploadCommunityList = ({ bulkUploadValues, setBulkUploadFieldValue }) => {
  const theme = useTheme();
  const { fileData, editedList } = bulkUploadValues ?? {};
  // const [page, setPage] = useState(0);

  // const paginatedData = useMemo(() => {
  //   const startIndex = page * pageSize;
  //   return fileData?.slice(startIndex, startIndex + pageSize);
  // }, [page, pageSize]);

  // console.log(paginatedData);

  const columns = [
    {
      field: "CommunityName",
      headerName: "Community Name",
      flex: 1,
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.CommunityName}
              name={`editedList[${row.index}].CommunityName`}
              onChange={(e) =>
                handleChange(e.target.value, "CommunityName", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return (
            <Typography fontWeight={600} color="black">
              {row?.CommunityName}
            </Typography>
          );
        }
      },
    },
    {
      field: "CommunityEmail",
      headerName: "Community Email",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.CommunityEmail}
              name={`editedList[${row.index}].CommunityEmail`}
              onChange={(e) =>
                handleChange(e.target.value, "CommunityEmail", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return <Typography>{row?.CommunityEmail}</Typography>;
        }
      },
    },
    {
      field: "ContactNo",
      headerName: "Contact No",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.ContactNo}
              name={`editedList[${row.index}].ContactNo`}
              onChange={(e) =>
                handleChange(e.target.value, "ContactNo", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return <Typography>{row?.ContactNo}</Typography>;
        }
      },
    },

    {
      field: "InsurancrStatus",
      headerName: "Insurance Status",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.InsurancrStatus}
              name={`editedList[${row.index}].InsurancrStatus`}
              onChange={(e) =>
                handleChange(e.target.value, "InsurancrStatus", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return <Typography>{row?.InsurancrStatus}</Typography>;
        }
      },
    },
    {
      field: "CommunityManager",
      headerName: "Community Manager",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.CommunityManager}
              name={`editedList[${row.index}].CommunityManager`}
              onChange={(e) =>
                handleChange(e.target.value, "CommunityManager", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return <Typography>{row?.CommunityManager}</Typography>;
        }
      },
    },
    {
      field: "PropertyMangerNo",
      headerName: "PropertyManager No",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.PropertyMangerNo}
              name={`editedList[${row.index}].PropertyMangerNo`}
              onChange={(e) =>
                handleChange(e.target.value, "PropertyMangerNo", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return <Typography>{row?.PropertyMangerNo}</Typography>;
        }
      },
    },
    {
      field: "Address",
      headerName: "Address",
      renderComponent: (row, index) => {
        if (row?.isEdit) {
          return (
            <StyledBulkTextField
              value={editedList?.[row?.index]?.Address}
              name={`editedList[${row.index}].Address`}
              onChange={(e) =>
                handleChange(e.target.value, "Address", row?.index)
              }
              variant="outlined"
            />
          );
        } else {
          return <Typography>{row?.Address}</Typography>;
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
              <Button
                variant="contained"
                onClick={() => handleSave(row, index)}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCancel(row, index)}
              >
                Cancel
              </Button>
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

  const handleEdit = (row, index) => {
    const mapEditData = [...editedList, { id: index, ...row }];
    const mapTableData = fileData?.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          isEdit: true,
          index: mapEditData?.findIndex((el) => el.id === idx),
        };
      } else return item;
    });
    setBulkUploadFieldValue("editedList", mapEditData);
    setBulkUploadFieldValue("fileData", mapTableData);
  };

  const handleDelete = (row, index) => {};

  const handleSave = (row, index) => {
    const filterEditedList = editedList?.filter((el) => el.id !== index);
    const findEditData = editedList?.find((el) => el?.id === index);
    const mapTableData = fileData?.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          CommunityName: findEditData?.CommunityName,
          CommunityEmail: findEditData?.CommunityEmail,
          ContactNo: findEditData?.ContactNo,
          InsurancrStatus: findEditData?.InsurancrStatus,
          CommunityManager: findEditData?.CommunityManager,
          PropertyMangerNo: findEditData?.PropertyMangerNo,
          Address: findEditData?.Address,
          isEdit: false,
          index: null,
        };
      } else return item;
    });
    setBulkUploadFieldValue("editedList", filterEditedList);
    setBulkUploadFieldValue("fileData", mapTableData);
  };

  const handleCancel = (row, index) => {
    const mapTableData = fileData?.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          isEdit: false,
          index: null,
        };
      } else return item;
    });
    const filterEditData = editedList?.filter((el) => el?.id !== index);
    setBulkUploadFieldValue("editedList", filterEditData);
    setBulkUploadFieldValue("fileData", mapTableData);
  };

  const handleChange = (value, field, index) => {
    setBulkUploadFieldValue(`editedList[${index}].${field}`, value);
  };

  console.log({ editedList });

  return (
    <>
      <Typography variant="h5" color={theme.palette.text.grey}>
        Uploaded Communities
      </Typography>

      {fileData.length > 0 && (
        <CustomUploadTable cols={columns} tableData={fileData} />
      )}
    </>
  );
};

export default UploadCommunityList;
