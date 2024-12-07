import { Typography } from "@mui/material";
import CustomUploadTable from "components/AppComponents/CustomUploadTable";
import { useState } from "react";
import * as XLSX from "xlsx";

const UploadCommunityList = () => {
  const [tableData, setTableData] = useState([]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);

        if (json.length > 0) {
          setTableData(json);
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  console.log(tableData, "tableData");
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
    <div>
      {/* <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} /> */}
      <Typography variant="h5" color="#5B738B">
        Uploaded Communities
      </Typography>

      {tableData.length > 0 && (
        <CustomUploadTable cols={columns} tableData={tableData} />
      )}
    </div>
  );
};

export default UploadCommunityList;
