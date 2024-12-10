import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomUploadTable from "components/AppComponents/CustomUploadTable";

const UploadCommunityList = ({ bulkUploadValues }) => {
  const theme = useTheme();
  const { fileData } = bulkUploadValues ?? {};

  const columns = [
    {
      field: "CommunityName",
      headerName: "Community Name",
      flex: 1,
    },
    {
      field: "CommunityEmail",
      headerName: "Community Email",
    },
    {
      field: "ContactNo",
      headerName: "Contact No",
    },

    {
      field: "InsurancrStatus",
      headerName: "Insurance Status",
    },
    {
      field: "CommunityManager",
      headerName: "Community Manager",
    },
    {
      field: "PropertyMangerNo",
      headerName: "PropertyManager No",
    },
    {
      field: "Address",
      headerName: "Address",
    },
    {
      field: "action",
      headerName: "",
    },
  ];

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
